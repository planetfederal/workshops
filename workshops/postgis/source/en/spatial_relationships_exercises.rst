.. _spatial_relationships_exercises:

Spatial Relationships Exercises
===============================

Here's a reminder of the functions we saw in the last section. They should be useful for the exercises!

* :command:`sum(expression)` aggregate to return a sum for a set of records
* :command:`count(expression)` aggregate to return the size of a set of records
* :command:`ST_Contains(geometry A, geometry B)` returns true if geometry A contains geometry B
* :command:`ST_Crosses(geometry A, geometry B)` returns true if geometry A crosses geometry B
* :command:`ST_Disjoint(geometry A , geometry B)` returns true if the geometries do not "spatially intersect"
* :command:`ST_Distance(geometry A, geometry B)` returns the minimum distance between geometry A and geometry B
* :command:`ST_DWithin(geometry A, geometry B, radius)` returns true if geometry A is radius distance or less from geometry B
* :command:`ST_Equals(geometry A, geometry B)` returns true if geometry A is the same as geometry B
* :command:`ST_Intersects(geometry A, geometry B)` returns true if geometry A intersects geometry B
* :command:`ST_Overlaps(geometry A, geometry B)` returns true if geometry A and geometry B share space, but are not completely contained by each other.
* :command:`ST_Touches(geometry A, geometry B)` returns true if the boundary of geometry A touches geometry B
* :command:`ST_Within(geometry A, geometry B)` returns true if geometry A is within geometry B

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

* **"What is the geometry value for the street named 'Atlantic Commons'?"**

* **"What neighborhood and borough is Atlantic Commons in?"**

* **"What streets does Atlantic Commons join with?"**

* **"Approximately how many people live on (within 50 meters of) Atlantic Commons?"**
