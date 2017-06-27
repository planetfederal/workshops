.. _geometries_exercises:

Geometry Exercises
==================

Here's a reminder of all the functions we have seen so far. They should be useful for the exercises!

* :command:`sum(expression)` aggregate to return a sum for a set of records
* :command:`count(expression)` aggregate to return the size of a set of records
* :command:`ST_GeometryType(geometry)` returns the type of the geometry
* :command:`ST_NDims(geometry)` returns the number of dimensions of the geometry
* :command:`ST_SRID(geometry)` returns the spatial reference identifier number of the geometry
* :command:`ST_X(point)` returns the X ordinate
* :command:`ST_Y(point)` returns the Y ordinate
* :command:`ST_Length(linestring)` returns the length of the linestring
* :command:`ST_StartPoint(geometry)` returns the first coordinate as a point
* :command:`ST_EndPoint(geometry)` returns the last coordinate as a point
* :command:`ST_NPoints(geometry)` returns the number of coordinates in the linestring
* :command:`ST_Area(geometry)` returns the area of the polygons
* :command:`ST_NRings(geometry)` returns the number of rings (usually 1, more if there are holes)
* :command:`ST_ExteriorRing(polygon)` returns the outer ring as a linestring
* :command:`ST_InteriorRingN(polygon, integer)` returns a specified interior ring as a linestring
* :command:`ST_Perimeter(geometry)` returns the length of all the rings
* :command:`ST_NumGeometries(multi/geomcollection)` returns the number of parts in the collection
* :command:`ST_GeometryN(geometry, integer)` returns the specified part of the collection
* :command:`ST_GeomFromText(text)` returns ``geometry``
* :command:`ST_AsText(geometry)` returns WKT ``text``
* :command:`ST_AsEWKT(geometry)` returns EWKT ``text``
* :command:`ST_GeomFromWKB(bytea)` returns ``geometry``
* :command:`ST_AsBinary(geometry)` returns WKB ``bytea``
* :command:`ST_AsEWKB(geometry)` returns EWKB ``bytea``
* :command:`ST_GeomFromGML(text)` returns ``geometry``
* :command:`ST_AsGML(geometry)` returns GML ``text``
* :command:`ST_GeomFromKML(text)` returns ``geometry``
* :command:`ST_AsKML(geometry)` returns KML ``text``
* :command:`ST_AsGeoJSON(geometry)` returns JSON ``text``
* :command:`ST_AsSVG(geometry)` returns SVG ``text``

Also remember the tables we have available:

* ``nyc_census_blocks``

  * blkid, popn_total, boroname, geom

* ``nyc_streets``

  * name, type, geom

* ``nyc_subway_stations``

  * name, geom

* ``nyc_neighborhoods``

  * name, boroname, geom

Exercises
---------

* **"What is the area of the 'West Village' neighborhood?"**

* **"What is the area of Manhattan in acres?"** (Hint: both ``nyc_census_blocks`` and ``nyc_neighborhoods`` have a ``boroname`` in them.)

* **"How many census blocks in New York City have a hole in them?"**

* **"What is the total length of streets (in kilometers) in New York City?"** (Hint: The units of measurement of the spatial data are meters, there are 1000 meters in a kilometer.)

* **"How long is 'Columbus Cir' (Columbus Circle)?**

* **"What is the JSON representation of the boundary of the 'West Village'?"**

* **"How many polygons are in the 'West Village' multipolygon?"**

* **"What is the length of streets in New York City, summarized by type?"**
