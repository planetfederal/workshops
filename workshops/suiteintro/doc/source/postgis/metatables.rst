.. _postgis.metatables:

PostGIS metatables
==================

When our new PostGIS database was created via the ``template_postgis`` database, it received all all 700+ PostGIS functions, as well as two tables: ``geometry_columns`` and ``spatial_ref_sys``.

.. figure:: img/pg_metatable_relations.png
   :align: center

   *PostGIS metatable relations*


spatial_ref_sys
---------------

The ``spatial_ref_sys`` table defines the spatial reference systems known to the database.  They are known by an ID number, such as 4326 (for WGS 84 Lat/Lon).

.. figure:: img/pg_metatable_spatialrefsys.png
   :align: center

   *spatial_ref_sys table contents*

geometry_columns
----------------

The ``geometry_columns`` table defines the dimension, geometry, and spatial reference system for each spatial table in the PostGIS database.

.. figure:: img/pg_metatable_geometrycolumns.png
   :align: center

   *geometry_columns table contents*

Bonus
-----

* Expand the ``Functions`` tree in our new database's objects, and look at the contents.
* Which of the three tenets of a spatial database was not created from the template database?  Why not?