.. _projection_exercises:

Projection Exercises
====================

Here's a reminder of some of the functions we have seen.  Hint: they should be useful for the exercises!

* :command:`sum(expression)` aggregate to return a sum for a set of records
* :command:`ST_Length(linestring)` returns the length of the linestring
* :command:`ST_SRID(geometry, srid)` returns the SRID of the geometry
* :command:`ST_Transform(geometry, srid)` converts geometries into different spatial reference systems
* :command:`ST_GeomFromText(text)` returns ``geometry``
* :command:`ST_AsText(geometry)` returns WKT ``text``
* :command:`ST_AsGML(geometry)` returns GML ``text``

Remember the online resources that are available to you:

* http://spatialreference.org
* http://prj2epsg.org

Also remember the tables we have available:

* ``nyc_census_blocks``

  * name, popn_total, boroname, geom

* ``nyc_streets``

  * name, type, geom

* ``nyc_subway_stations``

  * name, geom

* ``nyc_neighborhoods``

  * name, boroname, geom

Exercises
---------

* **"What is the length of all streets in New York, as measured in UTM 18?"**

* **"What is the WKT definition of SRID 2831?"**

* **"What is the length of all streets in New York, as measured in SRID 2831?"**

* **"What is the KML representation of the point at 'Broad St' subway station?"**
