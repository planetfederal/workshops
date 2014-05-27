.. note::

  Check out the `demonstration map <_static/osm-full.html>`_ and play!

Introduction
============

`OpenStreetMap`_ (OSM) contains a wealth of data, kept up to date by a world-wide community of mappers. It is to map data what open source is to software: a unique and collaborative way to build shared knowledge.

Building a map using OSM data can be daunting: you have to extract data from the central server, or find a download package; choose and use tools convert it into the working database; choose and use a rendering chain to produce a cartographic product; and, choose and use a tool to publish that product.

This tutorial will explore deploying a cartographic product using a small set of easy-to-install tools:

* `OpenGeo Suite`_, for rendering the data and publishing it to the world.


Installation
============

* Follow the `Suite installation instructions`_ to install OpenGeo Suite.
* Start up the Suite and
 
  * `Connect to the database`_ server.
  * `Create a spatial database`_ named ``osm`` to hold the data.
  


Download the Data
=================

OSM City Data
-------------

We will be building a street map of a single city. To keep data volumes small, we will be working with Victoria, British Columbia for this example.

Extracts of OpenStreetMap data for individiual cities are available from `Mapzen metro extracts <https://mapzen.com/metro-extracts>`_. We will be using the extract for `Victoria, BC <https://s3.amazonaws.com/metro-extracts.mapzen.com/victoria.osm2pgsql-shapefiles.zip>`_, download it and unzip.

Inside the extra are a point file, a line file and a polygon file. In order to line the table names up with our processing downstream, we will name them ``planet_osm_point``, ``planet_osm_line`` and ``planet_osm_polygon`` during import. If you import with the `pgShapeLoader`_ GUI, remember to

* set the SRID of the data to 4326 (longitude/latitude)
* set the table names appropriately as above
* set the geometry column name to ``way``

Or, you can use the commandline ``shp2pgsql`` utility and do the uploads this way::

  shp2pgsql -g way -s 4326 -I -D -i -S victoria.osm-point.shp planet_osm_point | psql osm
  shp2pgsql -g way -s 4326 -I -D -i -S victoria.osm-line.shp planet_osm_line | psql osm
  shp2pgsql -g way -s 4326 -I -D -i victoria.osm-polygon.shp planet_osm_polygon | psql osm

Note that we're "piping" (using the "|" character) the output of the conversion directly to the ``psql`` utility. You might need to add some connection flags there to connect to your local database. There are a lot of loader flags in play here, so it's worth listing what they all do:

* "-g" controls the column name to use for geometries, we use "way"
* "-s" controls the SRID to apply to the data, we use "4326" for "WGS84 lon/lat"
* "-I" adds a spatial index to the table after loading
* "-D" uses "dump" mode for a faster loading process
* "-i" ensures that all integer types use 32-bit integers
* "-S" ensures that geometry column types are "simple" not "aggregate" (eg, "linestring", not "multilinestring")






Load Data
=========

From: 
This: 
      
:: 

  shp2pgsql -S -g way -D -s 4326 -I -i victoria.osm-line.shp planet_osm_line | psql osm2
  shp2pgsql -S -g way -D -s 4326 -I -i victoria.osm-point.shp planet_osm_point | psql osm2
  shp2pgsql -g way -D -s 4326 -I -i victoria.osm-polygon.shp planet_osm_polygon | psql osm2

From: http://openstreetmapdata.com/data/water-polygons
This: http://data.openstreetmapdata.com/water-polygons-split-4326.zip

:: 
  shp2pgsql -s 4326 -I -D water_polygons.shp ocean_all | psql osm2  

CREATE TABLE ocean AS
WITH bounds AS (
 SELECT ST_SetSRID(ST_Extent(way)::geometry,4326) AS geom FROM planet_osm_line
 )
SELECT 1 AS id, ST_Intersection(b.geom, o.geom) AS geom
FROM bounds b, ocean_all o
WHERE ST_Intersects(b.geom, o.geom);









curl -v -u admin:geoserver -XPOST -d@layergroup.xml -H "Content-type: text/xml" \
  http://localhost:8080/geoserver/rest/workspaces/osm/layergroups

curl -v -u admin:geoserver -XDELETE \
  http://localhost:8080/geoserver/rest/workspaces/osm/layergroups/osm


#
# add layer/style information for every SLD file in our collection
#
for sldfile in *.sld; do

  # strip the extension from the filename to use for layer/style names
  layername=`basename $sldfile .sld`
  
  # create a new featuretype in the store, assuming the table 
  # already exists and is named $layername
  # this automatically creates a layer of the same name
  curl -v -u admin:geoserver -XPOST -H "Content-type: text/xml" \
    -d "<featureType><name>$layername</name></featureType>" \
    http://localhost:8080/geoserver/rest/workspaces/osm/datastores/openstreetmap/featuretypes?recalculate=nativebbox,latlonbbox

  # create an empty style object in the workspace, using the same name
  curl -v -u admin:geoserver -XPOST -H "Content-type: text/xml" \
    -d "<style><name>$layername</name><filename>$sldfile</filename></style>" \
    http://localhost:8080/geoserver/rest/workspaces/osm/styles

  # upload the SLD definition to the style
  curl -v -u admin:geoserver -XPUT -H "Content-type: application/vnd.ogc.sld+xml" \
    -d @$sldfile http://localhost:8080/geoserver/rest/workspaces/osm/styles/$layername

  # associate the style with the layer as the default style
  curl -v -u admin:geoserver -XPUT -H "Content-type: text/xml" \
    -d "<layer><defaultStyle><name>$layername</name><workspace>osm</workspace></defaultStyle></layer>" \
    http://localhost:8080/geoserver/rest/layers/osm:$layername

done

# Update SLDs
for sldfile in *.sld; do
  layername=`basename $sldfile .sld`
  # upload the SLD definition to the style
  curl -v -u admin:geoserver -XPUT -H "Content-type: application/vnd.ogc.sld+xml" \
    -d @$sldfile http://localhost:8080/geoserver/rest/workspaces/osm/styles/$layername
done

for sldfile in *.sld; do

  # strip the extension from the filename to use for layer/style names
  layername=`basename $sldfile .sld`

  curl -v -u admin:geoserver -XDELETE \
    http://localhost:8080/geoserver/rest/layers/$layername?recurse=true

  curl -v -u admin:geoserver -XDELETE \
    http://localhost:8080/geoserver/rest/workspaces/osm/styles/$layername

done



Conclusion
----------

The possibilities are endless!



.. _OpenStreetMap: http://openstreetmap.org/
.. _OpenGeo Suite: http://boundlessgeo.com/solutions/opengeo-suite/
.. _OpenStreetMap: http://geogit.org/
.. _GeoGit installation instructions: http://geogit.org/docs/start/installation.html
.. _Suite installation instructions: http://suite.opengeo.org/opengeo-docs/installation/index.html
.. _Create a spatial database: http://suite.opengeo.org/opengeo-docs/dataadmin/pgGettingStarted/createdb.html
.. _Connect to the database: http://suite.opengeo.org/opengeo-docs/dataadmin/pgGettingStarted/pgadmin.html
.. _Overpass API: http://wiki.openstreetmap.org/wiki/Overpass_API
.. _JSON: http://www.json.org
.. _pgShapeLoader: http://suite.opengeo.org/opengeo-docs/dataadmin/pgGettingStarted/pgshapeloader.html

.. _OpenLayers Map: http://dev.openlayers.org/docs/files/OpenLayers/Map-js.html
.. _OpenStreetMap: http://openstreetmap.org

.. _GeoExt: http://www.geoext.org/
.. _ExtJS: http://www.sencha.com/products/extjs

.. _GeoGit data mapping: http://geogit.org/docs/interaction/osm.html#data-mapping

.. _OpenLayers: http://openlayers.org
