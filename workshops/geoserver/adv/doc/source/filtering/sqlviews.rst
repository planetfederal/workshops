.. _gsadv.filtering.sqlviews:

SQL views
=========

This next section discusses SQL views. Not to be confused with CQL filters, SQL views allow custom SQL queries to be saved as layers in GeoServer.

SQL views in GeoServer
----------------------

A traditional way to access database data is to configure layers against either tables or database views. There may be some data preparation into tables, and database views will often include joins across tables and functions to change a data's state, but as far as GeoServer is concerned these results as somewhat static. 

SQL views change this. In GeoServer, layers can be defined by SQL code. This allows for execution of custom SQL queries each time GeoServer requests the layer, so data access need not be static at all.

This is similar to CQL/OGC filters, they comprise only the WHERE portion of a SQL expression, can only apply to one layer at a time, and are somewhat limited in their set of functions / predicates. SQL views don't suffer from any of these limitations.

One other benefit to SQL views is that execution of the query is always done natively at the database level, and never in memory. This contrasts with CQL/OGC filters, which may or may not be executed at the database level dependent on whether the specific function is found. If such a function is not found, the request is executed in memory, which is a much less efficient process.

Perhaps most usefully, as well as being arbitrary SQL executed in the database using native database functions, SQL views can be parameterized via string substitution.

In short, SQL views have tremendous power and flexibility. They are always executed in the database so performance is optimized. You also have access to all database functions, stored procedures, and even joins across tables.

Examples
--------

Here are some examples of SQL views. Each one of these can be used to generate a GeoServer layer::

  SELECT * FROM cities

::

  SELECT * FROM cities WHERE name='%param_name%'

::

  SELECT geom, name, %param_valfield% AS values FROM cities WHERE country='%param_country%'

Regarding the use of parameters in SQL views:

* Parameter values can be supplied in both WMS and WFS requests
* Default values can be supplied for parameters
* Input values can be validated by regular expressions to eliminate the risk of SQL injection attacks

.. note:: SQL Views are read-only, and so cannot be updated by WFS transactions.

Creating a SQL view as a new layer
----------------------------------

We will start by setting up a basic SQL view. At first, we will create one with no parameters in the SQL statement, so it will behave like a standard layer at first. We will then create other views with parameters to make the queries more expressive.

SQL views are built against a database, so our first task is to set up a SQL view layer against our "earth" database.

To create a SQL view:

#. From the web admin interface, click :guilabel:`Layers` then click :guilabel:`Add a new resource`

#. Select :guilabel:`earth:earth` from the box.

   .. figure:: img/sqlviews_newviewlink.png

      Click to configure a new SQL view

A list of the published and unpublished layers in the database will be displayed. In addition, a few new options will be shown above the table. Click the link that says :guilabel:`Configure new SQL view...`.

#. In the :guilabel:`View Name` field, enter :guilabel:`cities_thin`.

#. For the :guilabel:`SQL statement`, enter ``SELECT name, geom FROM cities``.

   .. note:: There is no semi-colon after the end of the SQL expression.

#. Check the box for :guilabel:`Guess geometry type and srid` and click the :guilabel:`Refresh` link.

   .. figure:: img/sqlviews_thinsql.png

      SQL definition of the cities_thin layer

#. Click :guilabel:`Save` to continue.

#. You will be taken to the standard layer configuration page. Set the bounding box and CRS (if necessary).

#. Click the :guilabel:`Publishing` tab and select the :guilabel:`cities` style in :guilabel:`Default style` in order to associate that style with this layer.

#. Click :guilabel:`Save`.

#. Preview the layer. Click on a point to see the attribute table. Notice that the only fields available are the name and the feature id::

     http://localhost:8080/geoserver/wms/reflect?layers=earth:cities_thin&format=application/openlayers

   .. figure:: img/sqlviews_thinpreview.png

      Preview of cities_thin layer

Parameterized SQL view
----------------------

Now we'll create a SQL view that takes a variable string parameter and applies it to an attribute comparator. Specifically, we'll query the first letter of the city.

#. Create a new SQL view layer as above.

#. In the :guilabel:`View Name` field, enter :guilabel:`cities_like`.

#. For the :guilabel:`SQL statement`, enter ``SELECT geom, name FROM cities WHERE name ILIKE '%param1%%'``.

#. Click :guilabel:`Guess parameters from SQL`. A field titled "param1" should appear. In the :guilabel:`Default value` box, enter just the letter ``t``.

#. Check the box for :guilabel:`Guess geometry type and srid` and click the :guilabel:`Refresh` link.

   .. figure:: img/sqlviews_likesql.png

      SQL definition of the cities_like layer

#. Click :guilabel:`Save` to continue.

#. You will be taken to the standard layer configuration page. Set the bounding box and CRS (if necessary).

#. Click the :guilabel:`Publishing` tab and select the :guilabel:`cities` style in :guilabel:`Default style` in order to associate that style with this layer.

#. Click :guilabel:`Save`.

#. Preview this layer. Note that the only cities that display start with the letter T::

     http://localhost:8080/geoserver/wms/reflect?layers=earth:cities_like&format=application/openlayers

   .. figure:: img/sqlviews_likepreview.png

      Preview of cities_like layer

#. Now specify the parameter value by appending the request with ``&viewparams=param1:s``. This will display only those cities that begin with S::

     http://localhost:8080/geoserver/wms/reflect?layers=cities_like&format=application/openlayers&viewparams=param1:s

   .. figure:: img/sqlviews_likepreview2.png

      Preview of cities_like layer with param1=s

#. Now try ``&viewparams=param1:san`` to narrow down the list of cities even further::

     http://localhost:8080/geoserver/wms/reflect?layers=cities_like&format=application/openlayers&viewparams=param1:san

   .. figure:: img/sqlviews_likepreview3.png

      Preview of cities_like layer with param1=san

Spatial function SQL view
-------------------------

In this example, we'll create a SQL view that incorporates spatial functions.

#. Create a new SQL view layer as above.

#. In the :guilabel:`View Name` field, enter :guilabel:`cities_buffer`.

#. For the :guilabel:`SQL statement`, enter ``SELECT name, ST_Buffer(geom, %param2%) FROM cities WHERE name ILIKE '%param1%%'``.

#. Click :guilabel:`Guess parameters from SQL`. Two fields, ``param1`` and ``param2`` should appear. In the :guilabel:`Default value` box, enter the letter ``t`` and the number ``1``, respectively.

#. Check the box for :guilabel:`Guess geometry type and srid` and click the :guilabel:`Refresh` link.

   .. figure:: img/sqlviews_buffersql.png

      SQL definition of the cities_buffer layer

#. Click :guilabel:`Save` to continue.

#. You will be taken to the standard layer configuration page. Set the bounding box and CRS (if necessary) and click :guilabel:`Save`. (Don't worry about associating the :guilabel:`cities` layer since this view will generate polygons not points.)

#. Preview the layer::

     http://localhost:8080/geoserver/wms/reflect?layers=cities_buffer&format=application/openlayers

   .. figure:: img/sqlviews_bufferpreview.png

      Preview of cities_buffer layer

#. Now add some parameter values. ``param1`` refers to the first string to match to the first characters of the city name. ``param2`` refers to the buffer size. Here are some other requests::

     http://localhost:8080/geoserver/wms/reflect?layers=cities_buffer&format=application/openlayers&viewparams=param1:s

::

     http://localhost:8080/geoserver/wms/reflect?layers=cities_buffer&format=application/openlayers&viewparams=param1:s;param2:4

::

     http://localhost:8080/geoserver/wms/reflect?layers=cities_buffer&format=application/openlayers&viewparams=param1:s;param2:8

Cross layer SQL view
--------------------

This next example uses spatial joins. Because we can do cross-table joins in the database, we can do cross-layer analyses with SQL views.

#. Create a new SQL view layer as above.

#. In the :guilabel:`View Name` field, enter :guilabel:`cities_within`.

#. For the :guilabel:`SQL statement`, enter ``SELECT c.name, c.geom FROM cities AS c INNER JOIN (SELECT geom FROM rivers WHERE name = '%param1%') AS r ON st_dwithin(c.geom, r.geom, %param2%)``.

#. Click :guilabel:`Guess parameters from SQL`. Two fields, ``param1`` and ``param2`` should appear. In the :guilabel:`Default value` box, enter ``Seine`` and ``1``, respectively.

#. Check the box for :guilabel:`Guess geometry type and srid` and click the :guilabel:`Refresh` link.

   .. figure:: img/sqlviews_withinsql.png

      SQL definition of the cities_within layer

#. Click :guilabel:`Save` to continue.

#. You will be taken to the standard layer configuration page. Set the bounding box and CRS (if necessary).

#. Click the :guilabel:`Publishing` tab and select the :guilabel:`cities` style in :guilabel:`Default style` in order to associate that style with this layer.

#. Click :guilabel:`Save`.

#. Preview the layer. Note the only city that is returned::

     http://localhost:8080/geoserver/wms/reflect?format=application/openlayers&layers=shadedrelief,earth:rivers,earth:cities_within

   .. figure:: img/sqlviews_withinpreview.png

      Preview of cities_within layer

#. Now try some other parameter values. ``param1`` refers to the name of the city, while ``param2`` refers to the distance to check for cities (in units of the source layer, in this case degrees)::

     http://localhost:8080/geoserver/wms/reflect?&format=application/openlayers&layers=shadedrelief,earth:rivers,earth:cities_within&viewparams=param1:Thames

     http://localhost:8080/geoserver/wms/reflect?&format=application/openlayers&layers=shadedrelief,earth:rivers,earth:cities_within&viewparams=param1:Danube

     http://localhost:8080/geoserver/wms/reflect?&format=application/openlayers&layers=shadedrelief,earth:rivers,earth:cities_within&viewparams=param1:Danube;param2:5


.. todo::

     This application, from NRK, utilizes a cross layer SQL view::

       http://dl.dropbox.com/u/2306934/nrk.geo/examples/ut/map.html

