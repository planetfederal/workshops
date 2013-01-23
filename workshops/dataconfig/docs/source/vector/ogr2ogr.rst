.. _vector.ogr2ogr:

Data preparation with ``ogr2ogr``
=================================

We can modify vector layers with the ``ogr2ogr`` tool, part of the `FWTools kit <http://fwtools.maptools.org/>`_. This tool allows you to convert vector files into a number of formats, and also includes some options for modifying the data. The output data can be filtered, modified, or both.

We will be using a shapefile as our input data source and generating another shapefile as the output creating, modifying the data in the process.

Of course, if your data is not in shapefile format, you can still use ``ogr2ogr`` to convert your data to a shapefile, if your original format does not provide the level of performance as the shapefile format. To convert our sample GML file into a shapefile, run the following command in a console window.

.. code-block:: console

   ogr2ogr -f -a_srs EPSG:4326 "ESRI Shapefile" extremadura_highway.shp extremadura_highway.gml

The first stage in data preparation involves cleaning the data to remove unnecessary fields. To clean a vector layer use the ``ogr2ogr`` tool with the ``-select`` modifier and the list of fields that should be retained in the output file.

To generate a report of the shapefile contents, use the ``ogrinfo`` tool, part of the FWTools kit.

.. code-block:: console

   ogrinfo extremadura_highway.shp extremadura_highway -so

::

   INFO: Open of `extremadura_highway.shp'
    using driver `ESRI Shapefile' successful.

   Layer name: extremadura_highway
   Geometry: Line String
   Feature Count: 32391
   Extent: (-7.612608, 37.849637) - (-4.547236, 40.585243)
   Layer SRS WKT:
   GEOGCS["WGS 84",
       DATUM["WGS_1984",
           SPHEROID["WGS 84",6378137,298.257223563,
               AUTHORITY["EPSG","7030"]],
           TOWGS84[0,0,0,0,0,0,0],
           AUTHORITY["EPSG","6326"]],
       PRIMEM["Greenwich",0,
           AUTHORITY["EPSG","8901"]],
       UNIT["degree",0.01745329251994328,
           AUTHORITY["EPSG","9122"]],
       AUTHORITY["EPSG","4326"]]
   TYPE: String (17.0)
   NAME: String (99.0)
   ONEWAY: String (4.0)
   LANES: Real (11.0) 

If we assume only the first two fields (``TYPE, NAME``) are relevant for our application, we can remove remove all the other fields with the following:

.. code-block:: console

   ogr2ogr -select TYPE,NAME extremadura_highway_cleaned.shp extremadura_highway.shp

If we now inspect the fields in the output layer, we should see the following:

.. code-block:: console

   ogrinfo extremadura_highway_cleaned.shp extremadura_highway_cleaned -so

::

   INFO: Open of `extremadura_highway.shp'
    using driver `ESRI Shapefile' successful.

   Layer name: extremadura_highway_cleaned
   Geometry: Line String
   Feature Count: 32391
   Extent: (-7.612608, 37.849637) - (-4.547236, 40.585243)
   Layer SRS WKT:
   GEOGCS["WGS 84",
       DATUM["WGS_1984",
           SPHEROID["WGS 84",6378137,298.257223563,
               AUTHORITY["EPSG","7030"]],
           TOWGS84[0,0,0,0,0,0,0],
           AUTHORITY["EPSG","6326"]],
       PRIMEM["Greenwich",0,
           AUTHORITY["EPSG","8901"]],
       UNIT["degree",0.01745329251994328,
           AUTHORITY["EPSG","9122"]],
       AUTHORITY["EPSG","4326"]]
   TYPE: String (17.0)
   NAME: String (99.0) 


The shapefile ``.dbf`` file is now just 3.7MB, compared to 4.2MB in the original shapefile. That's not a significant difference in size as there weren't many unused columns in the original attributes table, but for your data this could make a real difference. Notice the 
 ``shp`` file size remains the same—the spatial data remains unaltered by this process.

The second data preparation technique we can try is simplification. For this we will use 
``ogr2ogr`` with the ``-simplify`` modifier. This will simplify the geometries in the input shapefile by a user-defined tolerance and allow us to generate a simplified (generalized) version of the shapefile for optimal large scale rendering. Reducing the number of points will produce an output file with less detail, but that loss of detail is imperceptible in the rendered image, as we previously demonstrated.

The ``-simplify`` modifier requires a distance tolerance value. By using several values, we can create a set of shapefiles covering the most commonly used scales, comparable to the different levels of a raster pyramid. The following example generates a simplified output shapefile with a distance tolerance of 0.01. As spatial reference of the layer is EPSG:4326, distance is expressed in decimal degrees.

.. code-block:: console

   ogr2ogr -simplify 0.01 extremadura_highway_simplified_001.shp extremadura_highway.shp

When supporting varying display scales, it is not just beneficial to have generalized versions of the data but you should also consider that in some cases, some features should not be represented at certain scales. For example, it often make sense to render only motorways at small scales, and rendering other road categories at larger display scales. This can be accomplished in a number of ways, including:

* Configuring styling rules to filter features based on a given field (in our example, the type of road)
* Splitting the source data in several files, in effect prefiltering the data, and then rendering each file at the appropriate scale.

The first solution is more practical and generally preferable, but it may result in a degradation of performance in certain cases. We have already mentioned that shapefiles do not support non-spatial attribute indexing, so basing a filter on an attribute that isn't indexed is inefficient. This is one example where storing the data in a database would be preferable but that option may not always be available. 

If you have to use shapefiles, you can still implement better indexing capabilities. §
For this we will use the ``ogr2ogr`` tool with the ``-sql`` modifier, to output the results of a SQL query into a new file. Type the following line into your console window.

.. code-block:: console

   ogr2ogr -sql "SELECT * FROM extremadura_highway_cleaned WHERE TYPE='motorway' " motorways.shp extremadura_highway_cleaned.shp
  
Now we have two shapefiles, each one optimized for rendering at different scale. The ``MaxScaleDenominator`` and ``MinScaleDenominator`` SLD elements may be used to configure the scale dependency when it comes to styling each layer in GeoServer. No additional filtering will be required at rendering time.

.. note:: Styling rules may improve performance in a number of ways not covered in this workshop, except where some particular styling is necessary to illustrate a particular data optimization technique.

In addition to splitting the source data into into two files, you can also apply some pregeneralization as well. Since the shapefile containing only the highways features, used for small scale rendering, is likely to contain too much detail for larger scale rendering, it can also be simplified. Replace the command line above with the following to split and generalize the shapefile data in a single operation.

.. code-block:: console

   ogr2ogr -simplify 0.01 -sql "SELECT * FROM extremadura_highway_cleaned WHERE TYPE='motorway' " motorways.shp extremadura_highway_cleaned.shp

The last option we have with with ``ogr2ogr`` for optimizing a shapefile is the ``-t_srs`` modifier, which will reproject the data into a user-defined spatial reference. If the source shapefile has a different coordinate system to the one used for a request, the data has to be reprojected. As this is both time and resource consuming, it's better to store the data in the most frequently requested coordinate system.

The following command line will convert our vector data from its current EPSG:4326 coordinate system into EPSG:23030, a coordinate system that we might expect to be used more frequently for this area.

.. code-block:: console

   ogr2ogr -t_srs EPSG:23030 extremadura_highway_23030 extremadura_highway.shp

