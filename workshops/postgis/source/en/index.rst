.. Introduction to PostGIS master file.

Introduction to PostGIS
=======================

Getting Started
---------------

* This workshop uses a `data bundle <http://training-files.boundlessgeo.com/postgis/postgis-workshop.zip>`_. Download and extract this data bundle to a convenient location.
  
* This workshop uses the following software:
  
  * :command:`PostgreSQL` database, along with :command:`PgAdmin` application, and command line tool :command:`psql`.
  * :command:`PostGIS` extension, along with :command:`pgShapeLoader` application.
  
  The boundless distributions of **Boundless Server** and **Boundless Desktop** include the software required above. You can download the latest distribution through `Boundless Connect <http://connect.boundlessgeo.com>`_. Boundless Server and Boundless Desktop are available in the `Downloads <http://connect.boundlessgeo.com/Downloads>`_ area.
  
  For alternate distributions please see the `PostGIS Installation <http://postgis.net/install/>`__ page.

Workshop Materials
------------------

Inside the data bundle, you will find:

**workshop/**
  a directory containing this HTML workshop

**data/**
  a directory containing the shapefiles we will be loading

All the data in the package is public domain and freely redistributable. All the software in the package is open source, and freely redistributable. This workshop is licensed as Creative Commons "`share alike with attribution <http://creativecommons.org/licenses/by-sa/3.0/us/>`_", and is freely redistributable under the terms of that license.

Workshop Modules
----------------

.. toctree::
   :maxdepth: 1
   :numbered:

   welcome
   introduction
   creating_db
   loading_data
   about_data
   simple_sql
   simple_sql_exercises
   simple_sql_exercise_answers
   geometries
   geometries_exercises
   geometries_exercise_answers
   spatial_relationships
   spatial_relationships_exercises
   spatial_relationships_exercise_answers
   joins
   joins_exercises
   joins_exercise_answers
   indexing
   projection
   projection_exercises
   projection_exercise_answers
   geography
   geometry_returning
   joins_advanced
   validity
   equality
   linear_referencing
   de9im
   clusterindex
   3d
   knn
   history_tracking
   advanced_geometry_construction
   tuning
   security
   schemas
   backup
   upgrades

   postgis-functions
   glossary
   license


Links to have on hand
---------------------

* PostGIS - http://postgis.net/

  - Docs - http://postgis.net/docs/

* PostgreSQL - http://www.postgresql.org/

  - Docs - http://www.postgresql.org/docs/
  - Downloads - http://www.postgresql.org/download/
  - JDBC Driver - http://jdbc.postgresql.org/
  - .Net Driver - http://npgsql.projects.postgresql.org/
  - Python Driver - http://www.pygresql.org/
  - C/C++ Driver - http://www.postgresql.org/docs/10/static/libpq.html

* PgAdmin III - http://www.pgadmin.org/

* Open Source Desktop Clients

  - QGIS - http://qgis.org/
  - OpenJUMP - http://openjump.org/
  - uDig - http://udig.refractions.net/
