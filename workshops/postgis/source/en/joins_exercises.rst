.. _joins_exercises:

Spatial Joins Exercises
=======================

Here's a reminder of some of the functions we have seen.  Hint: they should be useful for the exercises!

* :command:`sum(expression)`: aggregate to return a sum for a set of records
* :command:`count(expression)`: aggregate to return the size of a set of records
* :command:`ST_Area(geometry)` returns the area of the polygons
* :command:`ST_AsText(geometry)` returns WKT ``text``
* :command:`ST_Contains(geometry A, geometry B)` returns the true if geometry A contains geometry B
* :command:`ST_Distance(geometry A, geometry B)` returns the minimum distance between geometry A and geometry B
* :command:`ST_DWithin(geometry A, geometry B, radius)` returns the true if geometry A is radius distance or less from geometry B
* :command:`ST_GeomFromText(text)` returns ``geometry``
* :command:`ST_Intersects(geometry A, geometry B)` returns the true if geometry A intersects geometry B
* :command:`ST_Length(linestring)` returns the length of the linestring
* :command:`ST_Touches(geometry A, geometry B)` returns the true if the boundary of geometry A touches geometry B
* :command:`ST_Within(geometry A, geometry B)` returns the true if geometry A is within geometry B

Also remember the tables we have available:

* ``nyc_census_blocks``

  * name, popn_total, boroname, geom

* ``nyc_streets``

  * name, type, geom

* ``nyc_subway_stations``

  * name, routes, geom

* ``nyc_neighborhoods``

  * name, boroname, geom

Exercises
---------

* **"What subway station is in 'Little Italy'? What subway route is it on?"**

* **"What are all the neighborhoods served by the 6-train?"** (Hint: The ``routes`` column in the ``nyc_subway_stations`` table has values like 'B,D,6,V' and 'C,6')

* **"After 9/11, the 'Battery Park' neighborhood was off limits for several days. How many people had to be evacuated?"**

* **"What are the population density (people / km^2) of the 'Upper West Side' and 'Upper East Side'?"** (Hint: There are 1000000 m^2 in one km^2.)
