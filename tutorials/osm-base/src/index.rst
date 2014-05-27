.. note::

  Check out the `demonstration map <_static/osm-full.html>`_ and play!

Introduction
------------

`OpenStreetMap`_ (OSM) contains a wealth of data, kept up to date by a world-wide community of mappers. It is to map data what open source is to software: a unique and collaborative way to build shared knowledge.

Building a map using OSM data can be daunting: you have to extract data from the central server, or find a download package; choose and use tools convert it into the working database; choose and use a rendering chain to produce a cartographic product; and, choose and use a tool to publish that product.

This tutorial will explore building a cartographic output using a small set of easy-to-install tools:

* `GeoGit`_, for pulling data from OSM and transforming it into a database ready for rendering, and
* `OpenGeo Suite`_, for rendering the data and publishing it to the world.


Installation
------------

* Follow the `Suite installation instructions`_ to install OpenGeo Suite.
* Follow the `GeoGit installation instructions`_ to install GeoGit.


Download the Data into GeoGit
-----------------------------

We are going to download OSM data directly using the `Overpass API`_ and GeoGit. First, set up the GeoGit environment::

  # Make sure your GeoGit is set up
  geogit config --global user.name 'Your Name'
  geogit config --global user.email your@email.com
  
  # Create a working GeoGit directory
  mkdir osm
  cd osm
  geogit init .

Now we will download a small piece of OSM data to work with. For this workshop, we'll download data for Victoria, BC::

  geogit osm download --bbox 48.388178 -123.462982 48.717243 -123.251495
  
You should see output something like this (the number of features will differ, as changes will have been added since this document was published)::  

  Connecting to http://overpass-api.de/api/interpreter...

  Importing into GeoGit repo...
  294,020
  294,022 entities processed in 217.0 s

  Building trees for [node, way]

  Trees built in 2.055 s
  0%
  Staging features...
  100%

  Committing features...
  199
  Processed entities: 294,022.
   Nodes: 254,425.
   Ways: 39,597
  
GeoGit is reading features for the area selected and building a history of the area. All the data is stored in a special GeoGit respository (in the .geogit directory inside the working directory). For us to use it, we need to "export" it to a working format.


Export the Data to PostGIS
--------------------------

We will use PostGIS to store the working copy of our data. 

The OSM data model is a very simple one: 

* nodes (points)
* open ways (linestrings)
* closed ways (polygons)

Each geometric type can have an arbitrary number of tags, and particular combinations of tags represent particular features we might all a "layer" in a more conventional GIS data model. If we export the data without any processing, we'll get just three tables in our database: one for points, one for lines, and one for polygons. 

In order to apply our "layer oriented" style rules to the OSM data, we want to convert it from a three-table scheme to one with a table for each "logical" collection of features. A table for roads, a table for water features, a table for buildings, and so on.

`GeoGit data mapping`_ allows us to transform OSM data during the export process, using particular combinations of tags to place features into particular output tables. GeoGit mapping files are written in `JSON`_ and look like this:

.. code-block:: json

  {"rules":[

    {
      "name":"buildings",
      "filter":{
        "geom":["closed"],
        "building":[],
        "aeroway":["terminal"],
        "amenity":["place_of_worship"]
      },
      "fields":{
        "geom":{"name":"way","type":"POLYGON"},
        "building":{"name":"building", "type":"STRING"},
        "aeroway":{"name":"aeroway", "type":"STRING"},
        "amenity":{"name":"amenity", "type":"STRING"}
      }
    }

  ]}

The `GeoGit data mapping`_ file is a list of "rules". Each "rule" has a "name" that determines the table it will write to. The "filter" restricts what features get written to the table. In this case, only closed lines (polygons), that have a "building" tag of some sort, or an "aeroway = terminal" tag or "amenity = place_of_worship" tag. The tags are then mapped to "fields" (columns) in the new table.

For our OSM map, we are going to create a number of specific tables in our mapping:

* admin_01234
* admin_5678
* admin_other
* buildings_lz
* buildings
* glaciers_text
* highway_area_casing
* highway_area_fill
* landcover_line
* landcover
* landuse_overlay
* minor_roads_casing
* minor_roads_fill
* placenames_capital
* placenames_large
* placenames_medium
* placenames_small
* polygon_barrier
* roads_text_name
* roads_text_ref_low_zoom
* roads_text_ref
* roads
* sports_grounds
* water_areas_overlay
* water_areas
* water_lines_casing
* water_lines_low_zoom
* water_lines

For each table, we will need to rule in our `GeoGit data mapping`_ file that extracts the features we are interested in. This makes the rule file pretty large, so rather than show it inline, we provide a link to it here.

* `OSM mapping to rendering tables <_static/code/osm_mapping_render_tables.json>`_




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


for sldfile in *.sld; do

  # strip the extension from the filename to use for layer/style names
  layername=`basename $sldfile .sld`

  curl -v -u admin:geoserver -XDELETE \
    http://localhost:8080/geoserver/rest/layers/$layername?recurse=true

  curl -v -u admin:geoserver -XDELETE \
    http://localhost:8080/geoserver/rest/workspaces/osm/styles/$layername

done



Load Data
=========

From: https://mapzen.com/metro-extracts
This: https://s3.amazonaws.com/metro-extracts.mapzen.com/victoria.osm2pgsql-shapefiles.zip
      https://s3.amazonaws.com/metro-extracts.mapzen.com/denver-boulder.osm2pgsql-shapefiles.zip
      
:: 

  shp2pgsql -S -g way -D -s 4326 -I -i victoria.osm-line.shp planet_osm_line | psql osm2
  shp2pgsql -S -g way -D -s 4326 -I -i victoria.osm-point.shp planet_osm_point | psql osm2
  shp2pgsql -g way -D -s 4326 -I -i victoria.osm-polygon.shp planet_osm_polygon | psql osm2

From: http://openstreetmapdata.com/data/coastlines
This: http://data.openstreetmapdata.com/coastlines-split-4326.zip

:: 
  shp2pgsql -s 4326 -I -D lines.shp coastlines | psql osm2  

CREATE TABLE polys AS
WITH bounds AS (
 SELECT ST_SetSRID(ST_Extent(way)::geometry,4326) AS geom FROM planet_osm_line
 ),
edges AS (
  SELECT (ST_Dump(ST_Intersection(c.geom, b.geom))).geom AS geom
  FROM coastlines c, bounds b
  WHERE ST_Intersects(b.geom, c.geom)
  UNION
  SELECT (ST_Dump(ST_Difference(ST_ExteriorRing(b.geom), c.geom))).geom AS geom
  FROM coastlines c, bounds b
  WHERE ST_Intersects(ST_ExteriorRing(b.geom), c.geom)
  UNION
  SELECT (ST_Dump(ST_Difference(c.geom, ST_ExteriorRing(b.geom)))).geom AS geom
  FROM coastlines c, bounds b
  WHERE ST_Intersects(ST_ExteriorRing(b.geom), c.geom)
)
SELECT 1::integer, (ST_Dump(ST_Polygonize(geom))).geom::geometry(Polygon,4326) AS geom
FROM edges;


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

.. _OpenLayers Map: http://dev.openlayers.org/docs/files/OpenLayers/Map-js.html
.. _OpenStreetMap: http://openstreetmap.org

.. _GeoExt: http://www.geoext.org/
.. _ExtJS: http://www.sencha.com/products/extjs

.. _GeoGit data mapping: http://geogit.org/docs/interaction/osm.html#data-mapping

.. _OpenLayers: http://openlayers.org
