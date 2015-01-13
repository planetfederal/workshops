Introduction
------------

At Boundless we champion open standards as well as open source. The great thing about using open standards is that technology outside of OpenGeo Suite snaps into place when we need it. One piece of functionality that hasn’t existed in Suite is routing, which allows us to calculate the fastest, cheapest or shortest path between two points.

The tool in this case is `pgRouting <http://pgrouting.org/>`_, which is an extension to PostgreSQL and PostGIS that can generate such paths. With the right data set, this allows us to easily create a routing application with OpenGeo Suite to help our users find the optimal route based on their criteria.

.. image:: ./img/route1.png
   :width: 95%

Understanding shortest-path routing
-----------------------------------

The first thing to understand about shortest-path routing is that there is nothing fundamentally spatial about it, but it does integrate very well with spatial applications. As an analogy, compare the early London Tube maps which `situate stations geographically <http://homepage.ntlworld.com/clivebillson/tube/tube.html#1932>`_ with the familiar `schematic-style maps <http://homepage.ntlworld.com/clivebillson/tube/tube.html#1933>`_ that replaced them in the 1930s. 

pgRouting needs a 'routing network' loaded into a PostgreSQL database that shows the relative position of other stations rather than their actual spatial positions. When the networks *do* contain spatial data, however, we can build accurate routing applications that show the shortest route through the network and what route it translates into spatially.

Requirements
------------

We will need the following software during our tutorial:

* OpenGeo Suite 4.5 (including GeoServer, PostGIS, GDAL/OGR and Suite SDK)
* pgRouting 2

.. note::

   There are many ways to install pgRouting, depending on your system's operating system and architecture. The following steps can be used to install pgRouting on 64-bit Ubuntu 14.04 alongside OpenGeo Suite 4.5:

   .. code-block:: bash

      sudo add-apt-repository ppa:georepublic/pgrouting
      sudo apt-get update
      sudo apt-get install postgresql-9.3-pgrouting

Follow Boundless’s documentation on installing OpenGeo Suite and make sure that PostgreSQL is configured for use with GeoServer as described in `our documentation <http://suite.opengeo.org/docs/latest/installation/index.html>`_.

You should be familiar with the following topics before starting this tutorial:

* publishing data in GeoServer
* creating SQL Views
* basic SQL syntax
* basic JavaScript

Preparing data
--------------

The `OpenStreetMap <http://openstreetmap.org>`_ project is the natural place to turn when looking for free, high-quality spatial data; we’ll make use of it to build a mapping application for the city of Portland, Maine (but any other location should work equally well). 

There are some `programs <http://wiki.openstreetmap.org/wiki/Osm2pgsql>`_ that can be used to generate a routing network from OpenStreetMap data, but we’ll just stick to the tools that ship with OpenGeo Suite to do our data preparation.

Our first stop will be to download the city-specific OpenStreetMap data for our target location; MapZen provides `excerpts for many world cities <https://mapzen.com/metro-extracts/>`_ in ShapeFile format, but we could just have easily used `osm2pgsql <http://wiki.openstreetmap.org/wiki/Osm2pgsql>`_ to get data for anywhere else in the world. 

Download the `OSM2PGSQL SHP for Portland Me <http://wiki.openstreetmap.org/wiki/Osm2pgsql>`_ and extract the files::

  wget https://s3.amazonaws.com/metro-extracts.mapzen.com/portland_maine.osm2pgsql-shapefiles.zip
  unzip portland_maine.osm2pgsql-shapefiles.zip

We next need to create a new `routing` database in PostgreSQL into which we will be importing our data. We also need to enable the spatial PostGIS functions::

  createdb routing;
  psql -c "CREATE EXTENSION postgis;" routing

The OSM data we are using stores all features in three ShapeFiles, one each for points, lines and polygons. Road data is stored in the `portland-me.osm-line.shp` file, but it also contains other features that we are not interested in. If we look at the data, we’ll notice that roads and other ways always have a value for the attribute `highway` and non-road features have an empty value for this attribute. 

Our first goals for importing will be to only take lines which are actually roads into our database. Our second goal will be to eliminate the unnecessary attributes that come with the OSM data. Of the 57 attributes in the original ShapeFile, only the following are of interest to us: ``highway``, ``name``, ``oneway``, ``ref`` and ``surface``. Finally, we’ll convert the data from EPSG:4326 to EPSG:3857, which is better suited for viewing city-level data.

We can use OGR, to load the data into the database accomplish all of the goals we set ourselves above:

* `-where "highway <> ''"`: only take lines whose `highway` attribute is not empty
* `-select 'name,highway,oneway,ref,surface'`: take the desired attributes only
* `-f PostgreSQL PG:"dbname=routing user=postgres"`: load the data into Postgres
* `-lco GEOMETRY_NAME=the_geom:` store the geometry in an attribute named `the_geom`
* `-lco FID=id`: store the feature identifying numbers in an attribute named `id`
* `-nln edges`: store the data in a table called `edges`
* `-t_srs EPSG:3857`: convert the data to Google Mercator

Putting these all together we get the following command::

  ogr2ogr \ 
    -where "highway <> ''" \
    -select 'name,highway,oneway,surface' \
    -lco GEOMETRY_NAME=the_geom \
    -lco FID=id \
    -t_srs EPSG:3857 \
    -f PostgreSQL PG:"dbname=routing user=postgres" \
    -nln edges portland_maine.osm-line.shp

Building a network
------------------

As we discussed earlier, pgRouting needs a network of vertices (the stations in our metro analogy) and edges (which connect two stations) to calculate routes rather than the spatial data that we just loaded. Our next step will be to use functions that are included in pgRouting to generate the network from our spatial data.

We start by launching the PostgreSQL shell and then loading the pgRouting extension::

  psql -U postgres routing

When the ``psql`` prompt appears, enter the following command::

  CREATE EXTENSION pgrouting;

The function that we will be using, `pgr_createTopology`, will create a new table which contains all the starting and ending points of all lines in the edges table (without duplicating shared point).

For example, if we imagine this very simple metro network, the function will identify the four stations marked **A**, **B**, **C** and **D**.

.. image:: ./img/topology1.png
   :width: 50%

Finally, the function will add the source and target stations to each of the segments, such that **1** has a source of **A** and a target of **B**, and so on for edges **2** and **3**.

To accommodate `pgr_createTopology`, we need to add `source` and `target` columns to our `edges` table and then execute the command. Note that we have to indicate the name of the table (`'edges'`) and the tolerance for considering two vertices the same in the network.

.. code-block:: sql

  ALTER TABLE edges ADD source INT4;
  ALTER TABLE edges ADD target INT4;
  SELECT pgr_createTopology('edges', 1);

We can now check to see if the `source` and `target` columns in our `edges` table have been filled in. There should also be a new `edges_vertices_pgr` table which enumerates all the vertices in the network that pgRouting has detected.

We haven’t quite solved the network problem yet, however. `pgr_createTopology` does a good job of finding vertices when they are shared between two edges, but what about when a road terminates in the middle of another road?

.. image:: ./img/topology2.png
   :width: 50%

In the example above, we will again have four vertices, but there is no path between point **A** and point **D** since point **C** is not shared between the two line segments.

To handle these cases, pgRouting has an additional function, `pgr_nodeNetwork`, which will split segment **1** into two new edges **3** and **4**, so that point **C** can serve as a shared "transfer point".

.. image:: ./img/topology3.png
   :width: 50%

The new `edges_noded` table that is created by `pgr_nodeNetwork` contains an attribute named `old_id` to indicate which original edge each new edge derived from. From the example above, edges **3** and **4** would both have an `old_id` set to **1**. 

.. code-block:: sql

  SELECT pgr_nodeNetwork('edges', 1);

Our new edges_noded table can now be used in a call to pgr_createTopology to add the new source and target values.

.. code-block:: sql

  SELECT pgr_createTopology('edges_noded', 1);

Because `pgr_nodeNetwork` does not copy all the attribute information from the original table to the new noded table, so we have to move the name, `highway` (which we will rename `type` to better reflect the meaning), `oneway` and `surface` columns over ourselves.

First add the new columns.

.. code-block:: sql

  ALTER TABLE edges_noded 
    ADD COLUMN name VARCHAR, 
    ADD COLUMN type VARCHAR, 
    ADD COLUMN oneway VARCHAR, 
    ADD COLUMN surface VARCHAR;

Then copy the data from the original table. When copying we'll use the Interstate names (from the column ``ref``) in the cases where the data set does not record a name.

.. code-block:: sql

  UPDATE edges_noded AS new
  SET
    name = CASE WHEN old.name IS NULL THEN old.ref ELSE old.name END,
    type = old.highway, 
    oneway = old.oneway, 
    surface = old.surface 
  FROM edges AS old 
  WHERE new.old_id = old.id;

Determining cost
----------------

In addition to having a network that shows connections, pgRouting also needs to know the ‘cost’ of travelling over any of the edges. What cost means depends on the application: it could be an actual cost (such as your metro fare); the total distance travelled; time; or any other metric when moving from point to point.

In our application, we will support both a distance and a time cost. To improve performance, we will pre-calculate the time to travel by car on all of our entries in the `edges_noded` table. Time will be calculated based on the type of road (cars travel faster on primary roads than secondary for example); a query in our database shows us the different types of edges encoded in our database.

.. code-block:: sql

  SELECT DISTINCT(type) from edges_noded;

      type     
  ----------------
   motorway
   motorway_link
   steps
   secondary
   tertiary
   trunk
   secondary_link
   path
   unclassified
   proposed
   cycleway
   trunk_link
   primary
   track
   tertiary_link
   raceway
   residential
   construction
   primary_link
   service
   footway

A number of these (steps, path, footway, cycleway, proposed and construction) are clearly not suitable for vehicle so for these we will provide a cost of `-1` (pgRouting interprets negative numbers as impassable edges). For the remainder, we will need to assign an average speed and use this to populate a new `time` column in our table. We will additionally add a `distance` column to save on calculating the length of our edges on each request.

.. code-block:: sql

  ALTER TABLE edges_noded ADD distance FLOAT8;
  ALTER TABLE edges_noded ADD time FLOAT8;
  UPDATE edges_noded SET distance = ST_Length(ST_Transform(the_geom, 4326)::geography) / 1000;

Based on the distance, type and surface we can now estimate the amount of time needed to traverse each edge. Because the type and surface information is only stored in the original `edges` table, we will need to refer to it in our update. The OpenStreetMap website gives us some indication as to the `relative speed <http://wiki.openstreetmap.org/wiki/Routing>`_ for various road types.

.. code-block:: sql

  UPDATE edges_noded SET
    time = 
    CASE type
      WHEN 'steps' THEN -1
      WHEN 'path' THEN -1
      WHEN 'footway' THEN -1
      WHEN 'cycleway' THEN -1
      WHEN 'proposed' THEN -1
      WHEN 'construction' THEN -1 
      WHEN 'raceway' THEN distance / 100
      WHEN 'motorway' THEN distance / 70
      WHEN 'motorway_link' THEN distance / 70
      WHEN 'trunk' THEN distance / 60
      WHEN 'trunk_link' THEN distance / 60
      WHEN 'primary' THEN distance / 55
      WHEN 'primary_link' THEN distance / 55
      WHEN 'secondary' THEN distance / 45
      WHEN 'secondary_link' THEN distance / 45
      WHEN 'tertiary' THEN distance / 45
      WHEN 'tertiary_link' THEN distance / 40
      WHEN 'unclassified' THEN distance / 35
      WHEN 'residential' THEN distance / 30
      WHEN 'living_street' THEN distance / 30
      WHEN 'service' THEN distance / 30
      WHEN 'track' THEN distance / 20
      ELSE distance / 20
    END;

Dividing the distance by our speed estimates for each road type gives us the number of hours required to travel along that segment. Let's also set the distance to the special value of ``-1`` for the types of edges that we don't want vehicles to travel along.

.. code-block:: sql

  UPDATE edges_noded SET
    distance = 
    CASE type
      WHEN 'steps' THEN -1
      WHEN 'path' THEN -1
      WHEN 'footway' THEN -1
      WHEN 'cycleway' THEN -1
      WHEN 'proposed' THEN -1
      WHEN 'construction' THEN -1 
      ELSE distance
    END;

There is one more data point we could have used to help fine tune how long it takes to travel along road segments.

.. code-block:: sql

  SELECT DISTINCT(surface) from edges_noded;
  
   surface 
  ---------
   
   unpaved
   paved
   gravel
   asphalt
   sand

Testing
-------

We can test that the routing works by using the `pgr_dijkstra` function (which implements `Dijkstra's algorithm <http://en.wikipedia.org/wiki/Dijkstra's_algorithm>`_) to find the shortest path between any two vertices in the network. Vertices are identified by the `id` column in the automatically-generated `edges_noded_vertices_pgr` table. Select any two `id` numbers from the table (here, vertices 1000 and 757) and run the following query.

.. code-block:: sql

  SELECT 
    id1 AS vertex, 
    id2 AS edge, 
    cost 
  FROM pgr_dijkstra('SELECT id, source::INT4, target::INT4, time AS cost FROM edges_noded', 1000, 757, false, false) 
  ORDER BY seq;

   vertex | edge  |        cost         
  --------+-------+---------------------
     1000 |   873 | 0.00862449481177354
     1001 | 11469 |  0.0946329838309096
    11548 | 11468 |  0.0411391925170661
    11510 | 11418 |  0.0130258077805629
    11511 | 11452 |   0.010555359038939
    11536 | 11453 |  0.0500946880163133
    11537 | 11454 |  0.0128158392635584
    11538 | 11455 |   0.225115465905455
      757 |    -1 |                   0

Note how we pass a sub-query as an argument to `pgr_dijkstra`. This is us telling pgRouting what network to use when looking for the route, and because it is regular SQL we can fine tune what kind of route to look for. We could, for example, tell pgRouting to ignore all motorways when looking for a route by adding the following where clause: `WHERE type <> 'motorway'`. Best of all, this can be done dynamically, so we can change the routing parameters with every request.

For our purposes, we should note that if we replace `time` with `distance` in the sub-query, this will tell pgRouting to find the shortest route between the two points rather than the fastest route (remember that we travel slower on certain types of roads).

Thus far we haven’t taken one-way roads into account. The same `pgr_dijktra` algorithm can handle one-way roads if we add a `reverse_cost` column. As before, we need to set the cost to `-1` when we don't want to allow an edge to be used; therefore we will use `-1` as the `reverse_cost` when the `oneway` attribute is `yes`. If the road is not one-way, we use the same cost in the forward and reverse direction.

.. code-block:: sql

  SELECT 
    id1 AS vertex, 
    id2 AS edge, 
    cost 
  FROM pgr_dijkstra('SELECT id, source::INT4, target::INT4, time AS cost, CASE oneway WHEN ''yes'' THEN -1 ELSE time END AS reverse_cost FROM edges_noded', 1000, 757, true, true) 
  ORDER BY seq;

By joining the results of the query with the `edges_noded` table, we can get the complete information about the route that will be taken rather than just the edge and vertex numbers.

.. code-block:: sql

  SELECT 
    e.old_id, 
    e.name, 
    e.type, 
    e.oneway, 
    e.time AS time, 
    e.distance AS distance 
  FROM 
    pgr_dijkstra('SELECT id, source::INT4, target::INT4, time AS cost, CASE oneway WHEN ''yes'' THEN -1 ELSE time END AS reverse_cost FROM edges_noded', 753, 756, true, true) AS r,
    edges_noded AS e 
  WHERE r.id2 = e.id;

   old_id |        name         |    type     | oneway |  time   | distance
  --------+---------------------+-------------+--------+--------------------+
      203 | Bunker Hill Terrace | residential |        | 0.00170 | 0.05180
      203 | Bunker Hill Terrace | residential |        | 0.00592 | 0.17788
      203 | Bunker Hill Terrace | residential |        | 0.00024 | 0.00744
      210 | Two Rod Road        | residential |        | 0.00537 | 0.16137
      225 | Heritage Lane       | residential |        | 0.00021 | 0.00652
      225 | Heritage Lane       | residential |        | 0.00126 | 0.03788
      225 | Heritage Lane       | residential |        | 0.00239 | 0.07196
      225 | Heritage Lane       | residential |        | 0.00134 | 0.04047
      225 | Heritage Lane       | residential |        | 0.00034 | 0.01040
      225 | Heritage Lane       | residential |        | 0.00087 | 0.02629
      225 | Heritage Lane       | residential |        | 0.00180 | 0.05421
      225 | Heritage Lane       | residential |        | 0.00305 | 0.09156
      224 | Plymouth Drive      | residential |        | 0.00230 | 0.06914
      201 | Colonial Drive      | residential |        | 0.00096 | 0.02895
      201 | Colonial Drive      | residential |        | 0.00697 | 0.20934

Remember that we took the original lines from OpenStreetMap and split them into multiple parts using the `pgr_nodeNetwork` function. Edges created with this function will have identical `old_id`, `name`, `type` and `oneway` attributes if they came from the same original line. We will use this fact to recombine the segments in the table above using an SQL `GROUP BY` clause in conjunction with the aggregate function `sum` to calculate the total time and distance.

.. code-block:: sql

  SELECT 
    e.old_id AS id, 
    e.name, e.type, 
    e.oneway, 
    sum(e.time) AS time, 
    sum(e.distance) AS distance 
  FROM 
    pgr_dijkstra('SELECT id, source::INT4, target::INT4, time AS cost, CASE oneway WHEN ''yes'' THEN -1 ELSE time END AS reverse_cost FROM edges_noded', 753, 756, true, true) AS r,
    edges_noded AS e 
  WHERE r.id2 = e.id 
  GROUP BY e.old_id, e.name, e.type, e.oneway;
  
   id  |        name         |    type     | oneway |  time   | distance      
  -----+---------------------+-------------+--------+--------------------+
   203 | Bunker Hill Terrace | residential |        | 0.00790 | 0.23713
   210 | Two Rod Road        | residential |        | 0.00537 | 0.16137
   225 | Heritage Lane       | residential |        | 0.01131 | 0.33932
   224 | Plymouth Drive      | residential |        | 0.00230 | 0.06914
   201 | Colonial Drive      | residential |        | 0.00794 | 0.23829

Publishing in GeoServer
-----------------------

Our database work is now complete and we can publish our routing functionality as dynamic layers in GeoServer. First create a new workspace named ``tutorial`` and a new PostGIS store that connects to your database.

.. image:: ./img/stores.png
   :width: 95%

SQL View
^^^^^^^^

We will be creating two layers in GeoServer: ``shortest_path``, which finds the route between two vertices in our routing network and returns a list of features representing that route; ``nearest_vertex``, which finds the nearest vertext to any point in our dataset. Our application will let the user select a point on the map and will translate it into a vertex which can be used as the source or target in our route generation layer.

Configure a new SQL View named ``shortest_path`` with the following SQL query:

.. code-block:: sql

  SELECT
    min(r.seq) AS seq,
    e.old_id AS id, 
    e.name,
    e.type, 
    e.oneway, 
    sum(e.time) AS time, 
    sum(e.distance) AS distance,
    ST_Collect(e.the_geom) AS geom
  FROM 
    pgr_dijkstra(
     'SELECT 
      id, 
      source::INT4, 
      target::INT4, 
      %cost% AS cost, 
      CASE oneway 
        WHEN ''yes'' THEN -1 
        ELSE %cost% 
      END AS reverse_cost 
    FROM edges_noded', %source%, %target%, true, true) AS r, 
    edges_noded AS e 
  WHERE 
    r.id2 = e.id
  GROUP BY 
    e.old_id, e.name, e.type, e.oneway

The SQL View has three parameters: `source`, `target` and `cost`. The first two will be the vertex identification number and we will set `cost` to either `distance` or `time` depending on which metric we wish to use to calculate the route.

Note also the `ST_Collect` call will combine the individual `lineString` segments into a single `multiLineString` geometry in the same way that we use `sum` to calculate the total time and distance costs.

For security purposes, when we are creating the SQL View, we should change the regular expression validation for `source` and `target` so that only digits are allowed `(^[\\d]+$)` and cost such that the words "time" and "distance" are allowed `(^[\\w]+$)`.

.. image:: ./img/route_view_params.png
   :width: 95%

Finally, ensure that we specify which attribute will uniquely identify each feature in the route (we will use seq since pgRouting gives each segment in the route a sequence number) and the geometry type (**MultiLineString**) and SRID (**3857**).

.. image:: ./img/route_view_attributes.png
   :width: 95%

This is all that we need to configure in GeoServer to provide routes between two vertices, but our client will still need to know the vertex identification numbers, so we will also publish the automatically-created `edges_noded_vertices_pgr` table. This brings us to our second SQL View, which will find the nearest vertex to a point on the map as a way of selecting the start or end of our route.

Using the layer name `nearest_vertex`, publish the following SQL query:

.. code-block:: sql

  SELECT 
    v.id, 
    v.the_geom, 
    string_agg(distinct(e.name),',') AS name 
  FROM 
    edges_noded_vertices_pgr AS v, 
    edges_noded AS e 
  WHERE 
    v.id = (SELECT 
              id 
            FROM edges_noded_vertices_pgr 
            ORDER BY the_geom <-> ST_SetSRID(ST_MakePoint(%x%, %y%), 3857) LIMIT 1) 
    AND (e.source = v.id OR e.target = v.id) 
  GROUP BY v.id, v.the_geom

Because coordinates may contain negative numbers or decimals, make sure to change the validation regular expressions to only include digits and both of the required symbols: `^[\\d.-]+$`.

.. image:: ./img/vertex_view.png
   :width: 95%

The subquery uses a trick `we have discussed elsewhere <http://workshops.boundlessgeo.com/postgis-intro/knn.html#index-based-knn>`_ to quickly find the closest point to the `x` and `y` parameters. In addition to returning the geometry of this point, we will also create a list of all roads which meet at the vertex for use in identifying it to the user. As an example, the query will return the following record, which we can also see in the original OpenStreetMap data::

  10973 | Congress Street,Free Street,High Street

.. image:: ./img/intersection.png
   :width: 95%

Finally, if we publish the `edges_noded_vertices_pgr` and the `edges_noded` tables themselves, we can preview our routing network in GeoServer. This is not required for our application but it helps visualise the data we will be working with.

.. image:: ./img/network.png
   :width: 95%

OpenLayers client
-----------------

To interact with our routing algorithm we will need a client which can make standard OGR requests to GeoServer for our nearest_vertex and shortest_path layers. We will be implementing a very simple client with this tutorial that will let the user drag markers for the route’s start and destination and then will update the map with a line indicating the shortest route between the two points. The client will be written in OpenLayers 3 with a small amount of JQuery.

.. image:: ./img/route2.png
   :width: 95%

OpenGeo Suite SDK
^^^^^^^^^^^^^^^^^

We will be using the `Suite SDK <http://suite.opengeo.org/opengeo-docs/webapps/index.html>`_ to create a template for building our application. On the command line run the following.

.. code-block:: bash

   suite-sdk create routing ol3view

We will now have a ``routing`` directory with a basic application for viewing layers; there are several files in this new directory, but we will only confern ourselves with ``index.html`` and ``src/app/app.js``.

HTML document
^^^^^^^^^^^^^

We will first need to edit the basic HTML file named ``index.html`` that loads the OpenLayers and JQuery libraries, to add an extra box where we can display information about the route. Find the line that has ``<div id="map">`` and add the following line *before* it: ``<div id="info"></div>``. This part of the file should now look like this:

.. code-block:: html

      </div><!--/.navbar-collapse -->
    </div>
    <div id="info"></div>
    <div id="map">
      <div id="popup" class="ol-popup">
      </div>
    </div>

Script
^^^^^^

We can now build our JavaScript application step-by-step, but unlike ``index.html`` we will remove the existing ``app.js`` and write a new one from scratch. Make sure to place your new ``app.js`` in the ``src/app`` directory.

.. note::

  If you want to skip the instructions on building the application, simply `download the completed app.js <_static/code/app.js>`_. 

We will start by declaring some variables, which will include the starting point and zoom level for our map.

.. code-block:: javascript

   var geoserverUrl = '/geoserver';
   var center = ol.proj.transform([-70.26, 43.67], 'EPSG:4326', 'EPSG:3857');
   var zoom = 12;
   var pointerDown = false;
   var currentMarker = null;
   var changed = false;
   var routeLayer;
   var routeSource;
   var travelTime;
   var travelDist;

We will need to update the text in two elements in the ``index.html`` document as our route changes.

.. code-block:: javascript

   // elements in HTML document
   var info = document.getElementById('info');
   var popup = document.getElementById('popup');

When we print information about our route, we will need to format the data for display. For example, the time it takes to travel along a route is measured in hours, so we will take the number ``0.25`` and format it to display ``15 minutes``. We will do some formatting on distances, the names of roads and intersections.

.. code-block:: javascript

   // format a single place name
   function formatPlace(name) {
     if (name == null || name == '') {
       return 'unnamed street';
     } else {
       return name;
     }
   }
   
   // format the list of place names, which may be single roads or intersections
   function formatPlaces(list) {
     var text;
     if (!list) {
       return formatPlace(null);
     }
     var names = list.split(',');
     if (names.length == 0) {
       return formatPlace(null);
     } else if (names.length == 1) {
       return formatPlace(names[0]);
     } else if (names.length == 2) {
       text = formatPlace(names[0]) + ' and ' + formatPlace(names[1]);
     } else {
       text = ' and ' + formatPlace(names.pop());
       names.forEach(function(name) {
         text = name + ', ' + text;
       });
     }
   
     return 'the intersection of ' + text;
   }
   
   // format times for display
   function formatTime(time) {
     var mins = Math.round(time * 60);
     if (mins == 0) {
       return 'less than a minute';
     } else if (mins < 1.5) {
       return '1 minute';
     } else {
       return Math.round(mins) + ' minutes';
     }
   }
   
   // format distances for display
   function formatDist(dist) {
     var units;
     dist = dist.toPrecision(2);
     if (dist < 1) {
       dist = dist * 1000;
       units = 'm';
     } else {
       units = 'km';
     }
   
     // make sure distances like 5.0 appear as just 5
     dist = dist.toString().replace(/[.]0$/, '');
     return dist + units;
   }

Our map will have two markers which user can drag into new positions to indicate the start and end of the route. 

.. image:: ./img/markers.png
   :width: 95%

We will add these to an overlay and add a callback function named `changeHandler` which will be triggered whenever one of these markers is moved.     

.. code-block:: javascript

    // create source feature
    var sourceMarker = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.transform([-70.26013, 43.66515], 'EPSG:4326', 'EPSG:3857'))
    });
    
    // create style (green point)
    sourceMarker.setStyle(
      [new ol.style.Style({
        image: new ol.style.Circle({
          radius: 6,
          fill: new ol.style.Fill({
            color: 'rgba(0, 255, 0, 1)'
          })
        })
      })]
    );
    sourceMarker.on('change', changeHandler);
    
    // create target feature
    var targetMarker = new ol.Feature({
      geometry: new ol.geom.Point(
          ol.proj.transform([-70.24667, 43.66996], 'EPSG:4326', 'EPSG:3857'))
    });
    
    // create style (red point)
    targetMarker.setStyle(
      [new ol.style.Style({
        image: new ol.style.Circle({
          radius: 6,
          fill: new ol.style.Fill({
            color: 'rgba(255, 0, 0, 1)'
          })
        })
      })]
    );
    targetMarker.on('change', changeHandler);
    
    // create overlay to display the markers
    var markerOverlay = new ol.FeatureOverlay({
      features: [sourceMarker, targetMarker],
    });

The change handler for a marker movement is very simple: we will keep a record of the marker that moved and indicate that our route has changed.

.. code-block:: javascript

    // record when we move one of the source/target markers on the map
    function changeHandler(e) {
      if (pointerDown) {
        changed = true;
        currentMarker = e.target;
      }
    }
   
Now that the markers have been created, we can tell OpenLayers that they can be modified (that is to say, moved) by user interaction:

.. code-block:: javascript

    var moveMarker = new ol.interaction.Modify({
      features: markerOverlay.getFeatures(),
      tolerance: 20
    });

We will create a second overlay which will be used to display a popup box when the user clicks on route segments, and we will highlight these selected segments with a different style.

.. code-block:: javascript

   // create overlay to show the popup box
   var popupOverlay = new ol.Overlay({
     element: popup
   });
   
   // style routes differently when clicked
   var selectSegment = new ol.interaction.Select({
     condition: ol.events.condition.click,
     style: new ol.style.Style({
         stroke: new ol.style.Stroke({
           color: 'rgba(255, 0, 128, 1)',
           width: 8
       })
     })
   });

The base map for our application will be OpenStreetMap tiles, which OpenLayers 3 supports as a layer type. The map will be created with support for the markers and different interactions we created above.

.. code-block:: javascript

   // set the starting view
   var view = new ol.View({
     center: center,
     zoom: zoom
   });
   
   // create the map with OSM data
   var map = new ol.Map({
     target: 'map',
     layers: [
       new ol.layer.Tile({
         source: new ol.source.OSM()
       })
     ],
     view: view,
     overlays: [popupOverlay, markerOverlay]
   });
   map.addInteraction(moveMarker);
   map.addInteraction(selectSegment);

We will display the pop-up box whenever the user clicks on a route segment, showing the name of the road, the distance and the time to traverse it.

.. code-block:: javascript

   // show pop up box when clicking on part of route
   var getFeatureInfo = function(coordinate) {
     var pixel = map.getPixelFromCoordinate(coordinate);
     var feature = map.forEachFeatureAtPixel(pixel, function(feature, layer) {
       if (layer == routeLayer) {
         return feature;
       }
     });
   
     var text = null;
     if (feature) { 
       text = '<strong>' + formatPlace(feature.get('name')) + '</strong><br/>';
       text += '<p>Distance: <code>' + formatDist(feature.get('distance')) + '</code></p>';
       text += '<p>Estimated travel time: <code>' + formatTime(feature.get('time')) + '</code></p>';
       text = text.replace(/ /g, '&nbsp;');
     }
     return text;
   };
   
   // display the popup when user clicks on a route segment
   map.on('click', function(evt) {
     var coordinate = evt.coordinate;
     var text = getFeatureInfo(coordinate);
     if (text) {
       popupOverlay.setPosition(coordinate);
       popup.innerHTML = text;
       popup.style.display = 'block';
     }
   });

We need to register when the user has started or stopped dragging a marker so that we know when to recalculate our route. We do this by registering the mouse button down and mouse button up events.

.. code-block:: javascript

   // record start of click
   map.on('pointerdown', function(evt) {
     pointerDown = true;
     popup.style.display = 'none';
   });
   
   // record end of click
   map.on('pointerup', function(evt) {
     pointerDown = false;
   
     // if we were dragging a marker, recalculate the route
     if (currentMarker) {
       getVertex(currentMarker);
       getRoute();
       currentMarker = null;
    }
   });

The last step before working on the client's communications with GeoServer is to create a timer that will trigger every quarter of a second, which allows us to update the route periodically while moving a marker to a new location.

.. note::

  Depending on your server speed you may wish to increase or decrease the ``250`` milisecond refresh rate.

.. code-block:: javascript 

   // timer to update the route when dragging
   window.setInterval(function(){
     if (currentMarker && changed) {
       getVertex(currentMarker);
       getRoute();
       changed = false;
     }
   }, 250);

In the code above, we can see calls to two key functions: `getVertex` and `getRoute`. These both initiate WFS calls to GeoServer to get feature information. `getVertex` retrieves the closest vertex in the network to the current marker's position while `getRoute` calculates the shortest path between the two markers.

`getVertex` uses the current coordinates of a marker and passes them as `x` and `y` parameters to the `nearest_vertex` SQL View we created in GeoServer. The WFS GetFeature request will be captured as JSON and passed to the `loadVertex` function for processing.

.. code-block:: javascript 

   // WFS to get the closest vertex to a point on the map
   function getVertex(marker) {
     var coordinates = marker.getGeometry().getCoordinates();
     var url = geoserverUrl + '/wfs?service=WFS&version=1.0.0&' +
         'request=GetFeature&typeName=tutorial:nearest_vertex&' +
         'outputformat=application/json&' +
         'viewparams=x:' + coordinates[0] + ';y:' + coordinates[1];
   
     $.ajax({
        url: url,
        async: false,
        dataType: 'json',
        success: function(json) {
          loadVertex(json, marker == sourceMarker);
        }
     });
   }

`loadVertex` parses GeoServer's response and stores the nearest vertex as the start or end point of our route. We'll need the vertex `id` later to request the route from pgRouting.

.. code-block:: javascript 
  
   // load the response to the nearest_vertex layer
   function loadVertex(response, isSource) {
     var geojson = new ol.format.GeoJSON();
     var features = geojson.readFeatures(response);
     if (isSource) {
       if (features.length == 0) {
         map.removeLayer(routeLayer);
         source = null;
         return;
       }
       source = features[0];
     } else {
       if (features.length == 0) {
         map.removeLayer(routeLayer);
         target = null;
         return;
       }
       target = features[0];
     }
   }

Everything we have done so far has been building up to the final WFS GetFeature call which will actually request and display the route. The `shortest_path` SQL View has three parameters, the `source` vertex, the `target` vertex and the `cost` (either distance or time).

.. code-block:: javascript 

   function getRoute() {
     // set up the source and target vertex numbers to pass as parameters
     var viewParams = [
       'source:' + source.getId().split('.')[1],
       'target:' + target.getId().split('.')[1],
       'cost:time'
     ];
   
     var url = geoserverUrl + '/wfs?service=WFS&version=1.0.0&' +
         'request=GetFeature&typeName=tutorial:shortest_path&' +
         'outputformat=application/json&' +
         '&viewparams=' + viewParams.join(';');
   
     // create a new source for our layer
     routeSource = new ol.source.ServerVector({
       format: new ol.format.GeoJSON(),
       strategy: ol.loadingstrategy.all,
       loader: function(extent, resolution) {
         $.ajax({
           url: url,
           dataType: 'json',
           success: loadRoute,
           async: false
         });
       },
     });
  
     // remove the previous layer and create a new one
     map.removeLayer(routeLayer);
     routeLayer = new ol.layer.Vector({
       source: routeSource,
       style: new ol.style.Style({
         stroke: new ol.style.Stroke({
           color: 'rgba(0, 0, 255, 0.5)',
           width: 8
         })
       })
     });
   
     // add the new layer to the map
     map.addLayer(routeLayer);
   }
   
The newly-retrieved route will be used to create a new layer to replace the previous route and to update the info box with the details of the route, including the start and end locations, the distance and the time to travel.

.. code-block:: javascript

   // handle the response to shortest_path
   var loadRoute = function(response) {
     selectSegment.getFeatures().clear();
     routeSource.clear();
     var features = routeSource.readFeatures(response)
     if (features.length == 0) {
       info.innerHTML = '';
       return;
     }
   
     routeSource.addFeatures(features);
     var time = 0;
     var dist = 0;
     features.forEach(function(feature) {
       time += feature.get('time');
       dist += feature.get('distance');
     });
     if (!pointerDown) {
       // set the route text
       var text = 'Travelling from <strong>' + formatPlaces(source.get('name')) + '</strong> to <strong>' + formatPlaces(target.get('name')) + '</strong>. ';
       text += 'Total distance ' + formatDist(dist) + '. ';
       text += 'Estimated travel time: ' + formatTime(time) + '.';
       info.innerHTML = text;
   
       // snap the markers to the exact route source/target
       markerOverlay.getFeatures().clear();
       sourceMarker.setGeometry(source.getGeometry());
       targetMarker.setGeometry(target.getGeometry());
       markerOverlay.getFeatures().push(sourceMarker);
       markerOverlay.getFeatures().push(targetMarker);
     }
   }

We will finish off the script by forcing the application to calculate the first route between the two markers' initial positions.

.. code-block:: javascript

  getVertex(sourceMarker);
  getVertex(targetMarker);
  getRoute();

Our application is now complete! You can test it out by running the SDK in debugging mode:

.. code-block:: bash

   suite-sdk debug routing

Now open http://localhost:9080 in your browser to try out your application.

.. figure:: ./img/application.png

   Finished routing application
  
Ideas for improvement
---------------------

The accuracy of the routing is good.

.. image:: ./img/route3.png
   :width: 95%

But it's not perfect.

.. image:: ./img/route4.png
   :width: 95%

Improper routes like these occur when the original OpenStreetMap data has two vertices which should have actually been a single point, such as in the example below where there is no path between **A** and **D** because vertex **B** and vertex **C** were incorrectly recorded as two different positions rather than being a single point.

.. image:: ./img/topology4.png
   :width: 50%

Unfortunately, there's not much we can do but wait for OpenStreetMap to receive an update to fix these broken intersections (or you can `fix them yourself! <http://wiki.openstreetmap.org/wiki/Getting_Involved>`_).

In the meantime, here are a few ideas on how we could easily improve the application:

Shortest versus fastest
^^^^^^^^^^^^^^^^^^^^^^^

Since we can easily calculate either the shortest or the fastest route, we should add an option so the user can switch between the two.

Ferry routes
^^^^^^^^^^^^

The OpenStreetMap data provides data on ferry routes between Portland and the off-shore islands. We could add those to our network.

Walking map
^^^^^^^^^^^

We could create a new SQL View which accepts all edge types, including steps, path, footway and cycleway, which we intentionally excluded earlier. Unlike the car routes, we wouldn't use a reverse cost because pedestrians are not restricted on one-way streets!

Directions
^^^^^^^^^^

The GetFeature data that the client retrieves from GeoServer includes detailed information on the route, including street names, distance and the travel time. This entire list could all be displayed to the user along with the visualised route.

Speed calculations
^^^^^^^^^^^^^^^^^^

We didn't incorporate the surface attribute, which can be paved, dirt, sand and so on, to fine-tune the time required to traverse an edge.

Conclusion
----------

This tutorial has demonstrated how build a routing application using OpenGeo Suite and pgRouting. In it we have learnt how to:

* import OpenStreetMap data using OGR
* build a routing network using `pgr_createTopology` and `pgr_nodeNetwork`
* estimate the time needed to travel along roads in SQL
* use `pgr_dijkstra` to do shortest-path queries
* create SQL Views in GeoServer to publish a routing service
* use the Boundless SDK to create an application
* write a client that can make parameterised SQL queries
