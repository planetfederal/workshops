"""
Modified version of InaSAFE Disaster risk assessment tool developed by AusAid: Zonal Stats

.. note:: This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

"""


##Frequency Analysis=name
##Raster=group
##vector=vector polygon
##raster=raster
##band=number 1
##Frequency_analysis_table=output table
##Frequency_analysis_layer=output vector

import numpy
from osgeo import gdal, ogr, osr

from PyQt4.QtCore import QCoreApplication, QVariant
from qgis.core import (
    QgsRectangle,
    QgsFeatureRequest,
    QgsGeometry,
    QgsMapLayer,
    QgsPoint,
    QGis,
    QgsFeature,
    QgsField)
from processing.tools.vector import createUniqueFieldName
from processing.core.TableWriter import TableWriter
from processing.core.VectorWriter import VectorWriter
from processing.tools.raster import mapToPixel
from processing.core.GeoAlgorithmExecutionException import *
 

def tr(text):
    """We define a tr() alias here since the utilities implementation.

The code below is not a class and does not inherit from QObject.

.. note:: see http://tinyurl.com/pyqt-differences

:param text: String to be translated
:type text: str

:returns: Translated version of the given string if available,
otherwise the original string.
"""
    # noinspection PyCallByClass,PyTypeChecker,PyArgumentList
    return QCoreApplication.translate('frequency_analysis', text)


def calculate_zonal_stats(raster_layer, polygon_layer, band):
    """Performe frequency analysis given two layers.

:param raster_layer: A QGIS raster layer.
:type raster_layer: QgsRasterLayer, QgsMapLayer

:param polygon_layer: A QGIS vector layer containing polygons.
:type polygon_layer: QgsVectorLayer, QgsMapLayer

:param band: The raster band to use
:type band: int

:returns: A data structure containing count, frequency of values
count of raster values for each polygonal area.
:rtype: dict


Note:
* InvalidParameterError if incorrect inputs are received.
* InvalidGeometryError if none geometry is found during calculations.
* Any other exceptions are propagated.

.. note:: Currently no projection checks are made to ensure that both
layers are in the same CRS - we assume they are.

"""

    results = {}
    raster_source = raster_layer.source()
    feature_id = gdal.Open(raster_source, gdal.GA_ReadOnly)
    geo_transform = feature_id.GetGeoTransform()
    columns = feature_id.RasterXSize
    rows = feature_id.RasterYSize
    band = feature_id.GetRasterBand(band)
    no_data = band.GetNoDataValue()
    cell_size_x = geo_transform[1]
    if cell_size_x < 0:
        cell_size_x = -cell_size_x
    cell_size_y = geo_transform[5]
    if cell_size_y < 0:
        cell_size_y = -cell_size_y
    raster_box = QgsRectangle(
        geo_transform[0],
        geo_transform[3] - (cell_size_y * rows),
        geo_transform[0] + (cell_size_x * columns),
        geo_transform[3])

    raster_geometry = QgsGeometry.fromRect(raster_box)

    # Get vector layer
    provider = polygon_layer.dataProvider()
    if provider is None:
        message = tr(
            'Could not obtain data provider from layer "%s"') % (
                polygon_layer.source())
        raise GeoAlgorithmExecutionException(message)

    
    crs = osr.SpatialReference()
    crs.ImportFromProj4(str(polygon_layer.crs().toProj4()))

    feats = processing.features(polygon_layer)
    nFeats = len(feats)
    progress.setText(tr("Computing statistics..."))
    for count, myFeature in enumerate(feats):
        progress.setPercentage(int(100 * count/ nFeats))
        geometry = myFeature.geometry()
        if geometry is None:
            raise GeoAlgorithmExecutionException(
                'Feature %d has no geometry or geometry is invalid') % (
                    myFeature.id())            

        intersected_geometry = raster_geometry.intersection(geometry)
        
        if intersected_geometry.type() != QGis.Polygon:
            geomcollection = intersected_geometry.asGeometryCollection()
            intersected_geometry = geomcollection.pop()
            for g in geomcollection:
                if g.type() == QGis.Polygon:
                    if intersected_geometry:
                        intersected_geometry.combine(g)
                    else:
                        intersected_geometry = g
        
        count, freq = numpy_stats(
            band,
            intersected_geometry,
            geo_transform,
            no_data,
            crs)

        results[myFeature.id()] = {
            'count': count,
            'freq': freq }

    # noinspection PyUnusedLocal
    feature_id = None
    return results

    """
:param a: A list of values.
:type a: numpy.ndarray

:returns: The values and frequency of each.
:rtype: list
"""
def unique_count(a):
    u = numpy.unique(a)
    b = u.searchsorted(a)
    return zip(u, numpy.bincount(b))

def numpy_stats(band, geometry, geo_transform, no_data, crs):
    """
:param band: A valid band from a raster layer.
:type band: GDALRasterBand

:param geometry: A polygon geometry used to calculate statistics.
:type geometry: QgsGeometry

:param geo_transform: Geo-referencing transform from raster metadata.
:type geo_transform: list (six floats)

:param no_data: Value for no data in the raster.
:type no_data: int, float

:param crs: Coordinate reference system of the vector layer.
:type crs: OGRSpatialReference

:returns: Count, Freq - total number of pixels that intersect with the geometry
and the frequency distribution of these pixel values.
:rtype: (int, dict)
"""

    mem_drv = ogr.GetDriverByName('Memory')
    driver = gdal.GetDriverByName('MEM')

    geom = ogr.CreateGeometryFromWkt(str(geometry.exportToWkt()))

    bbox = geometry.boundingBox()

    x_min = bbox.xMinimum()
    x_max = bbox.xMaximum()
    y_min = bbox.yMinimum()
    y_max = bbox.yMaximum()

    start_column, start_row = mapToPixel(x_min, y_max, geo_transform)
    end_column, end_row = mapToPixel(x_max, y_min, geo_transform)

    width = end_column - start_column
    height = end_row - start_row

    if width == 0 or height == 0:
        return 0, None

    src_offset = (start_column, start_row, width, height)

    src_array = band.ReadAsArray(*src_offset)

    new_geo_transform = (
        (geo_transform[0] + (src_offset[0] * geo_transform[1])),
        geo_transform[1],
        0.0,
        (geo_transform[3] + (src_offset[1] * geo_transform[5])),
        0.0,
        geo_transform[5]
    )

    # Create a temporary vector layer in memory
    mem_ds = mem_drv.CreateDataSource('out')
    mem_layer = mem_ds.CreateLayer('poly', crs, ogr.wkbPolygon)

    feat = ogr.Feature(mem_layer.GetLayerDefn())
    feat.SetGeometry(geom)
    mem_layer.CreateFeature(feat)
    feat.Destroy()

    # Rasterize it
    rasterized_ds = driver.Create('', src_offset[2], src_offset[3], 1,
                                  gdal.GDT_Byte)
    rasterized_ds.SetGeoTransform(new_geo_transform)
    gdal.RasterizeLayer(rasterized_ds, [1], mem_layer, burn_values=[1])
    rv_array = rasterized_ds.ReadAsArray()

    # Mask the source data array with our current feature
    # we take the logical_not to flip 0<->1 to get the correct mask effect
    # we also mask out no data values explicitly
    src_array = numpy.nan_to_num(src_array)
    masked = numpy.ma.MaskedArray(
        src_array,
        mask=numpy.logical_or(
            src_array == no_data,
            numpy.logical_not(rv_array)
        )
    )

    # get sorted frequency counts
    unmasked = masked.compressed() 
    count = unmasked.size
    freq = sorted(unique_count(unmasked), key=lambda l:l[1], reverse=True)

    return count, freq
  
polygon_layer = processing.getObject(vector)
raster_layer = processing.getObject(raster)
frequency_analysis = calculate_zonal_stats(raster_layer, polygon_layer, band)

progress.setText(tr("Writing data ..."))

# extend the attributes with the statistics
provider = polygon_layer.dataProvider()
fields = provider.fields()
fields.append(QgsField(createUniqueFieldName('MAJ', fields), QVariant.Int))
fields.append(QgsField(createUniqueFieldName('MAJ_P', fields), QVariant.Double))
fields.append(QgsField(createUniqueFieldName('MIN', fields), QVariant.Int))
fields.append(QgsField(createUniqueFieldName('MIN_P', fields), QVariant.Double))

outFeat = QgsFeature()
features = processing.features(polygon_layer)
n = len(features)

# get all unique raster values
values = []
for stats in frequency_analysis.itervalues():
    freq = stats['freq']
    values = values + [ v for [v, f] in freq]
values = list(set(values))

layer_writer = VectorWriter(Frequency_analysis_layer, None, fields, provider.geometryType(), polygon_layer.crs())
table_writer = TableWriter(Frequency_analysis_table, None, ['fid', 'majority'] + ['value: %d' % v for v in values])

for i, feat in enumerate(features):
    progress.setPercentage(int(100 * i / n))
    fid = feat.id()
    stats = frequency_analysis[fid]
    count = stats['count']
    freq = stats['freq']
    
    if count == 0:
        majority = 0
        minority = 0
        majority_p = 0
        minority_p = 0
    else:
        majority = int(freq[0][0])
        minority = int(freq[-1][0])
        majority_p = float(freq[0][1]) / count
        minority_p = float(freq[-1][1]) / count
        
    # write to layer
    outFeat.setGeometry(feat.geometry())
    attrs = feat.attributes() + [majority, majority_p, minority, minority_p]
    outFeat.setAttributes(attrs)
    layer_writer.addFeature(outFeat)   
    
    # write to table
    row = [fid, majority]
    d = {f[0] : f[1] for f in freq}
    for v in values:
      if v in d:
        row.append(float(d[v]) / count)
      else:
        row.append(0)    
    table_writer.addRecord(row)

progress.setPercentage(100)
del table_writer
del layer_writer
