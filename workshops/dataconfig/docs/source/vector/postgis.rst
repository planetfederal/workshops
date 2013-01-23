.. _vector.postgis:

Data preparation in PostGIS 
===========================

In this section we will see how to optimize our data in a PostGIS database, including how to create pregeneralized versions within PostGIS and using them with the GeoServer :guilabel:`Generalizing data store`.

The *stacked* structure, using several shapefiles, may be replaced by a structure in which all the geometries (both original and generalized) are part of the attributes of the feature. This can be accomplished with PostGIS commands, with the results stored in PostGIS and accessed from GeoServer using the :guilabel:`Generalizing data store`.

Let's import our original shapefile into PostGIS. The table structure is as follows:

.. code-block:: console

   Column  |              Type               
  ---------+---------------------------------+
   gid     | integer                         
   rtype    | character varying(17)           
   name    | character varying(99)           
   oneway  | character varying(4)            
   lanes   | double precision                
   geom    | geometry(MultiLineString,23030) 


We are going to add more columns with additional simplified versions of the main geometries associated with each feature. Specifically, we want four more columns and four levels of generalization, as we had with our shapefile example.

To add those columns, use the PostGIS :command:`AddGeometryColumn` function. Note the same geometry type as the original geometry must be used.

.. code-block:: sql

   SELECT AddGeometryColumn('','extremadura_highway','geom5','23030','MULTILINESTRING',2);
   SELECT AddGeometryColumn('','extremadura_highway','geom10','23030','MULTILINESTRING',2);
   SELECT AddGeometryColumn('','extremadura_highway','geom20','23030','MULTILINESTRING',2);
   SELECT AddGeometryColumn('','extremadura_highway','geom50','23030','MULTILINESTRING',2);


Now the table structure is as follows:

.. code-block:: console

   Column   |              Type               
   ---------+---------------------------------+
    gid     | integer                         
    rtype    | character varying(17)           
    name    | character varying(99)           
    oneway  | character varying(4)            
    lanes   | double precision                
    geom    | geometry(MultiLineString,23030) 
    geom5   | geometry(MultiLineString,23030) 
    geom10  | geometry(MultiLineString,23030) 
    geom20  | geometry(MultiLineString,23030) 
    geom50  | geometry(MultiLineString,23030) 

Next we want to populate those columns with the generalized geometries. These geometries are calculated using the PostGIS :command:`ST_SimplifyPreserveTopology` function. In addition to the geometry to be simplified, the function takes a distance tolerance as an input parameter. The following SQL commands will populate the columns:

.. code-block:: sql

   UPDATE extremadura_highway SET geom5 = ST_Multi(ST_SimplifyPreserveTopology(geom,5));
   UPDATE extremadura_highway SET geom10 = ST_Multi(ST_SimplifyPreserveTopology(geom,10));
   UPDATE extremadura_highway SET geom20 = ST_Multi(ST_SimplifyPreserveTopology(geom,20));
   UPDATE extremadura_highway SET geom50 = ST_Multi(ST_SimplifyPreserveTopology(geom,50));

We use the :command:`ST_Multi()` function to get multi-geometries, since :command:`ST_SimplifyPreserveTopology` returns simple geometries.

Finally, to optimize performance, we create spatial indexes for each one of the new columns with the following SQL code:

.. code-block:: sql

   CREATE INDEX sp_index_extremadura_highway_5 ON extremadura_highway USING GIST (geom5);
   CREATE INDEX sp_index_extremadura_highway_10 ON extremadura_highway USING GIST (geom10);
   CREATE INDEX sp_index_extremadura_highway_20 ON extremadura_highway USING GIST (geom20);
   CREATE INDEX sp_index_extremadura_highway_50 ON extremadura_highway USING GIST (geom50);

Now the database contains all the data we need in the correct structure. Before returning to GeoServer and configuring a data store to connect to this new extended table, we can check that the simplified geometries contain less points than the original geometries by running the following query (only the first 10 features are checked, by using :command:`LIMIT 10`):

.. code-block:: sql

   SELECT ST_NPoints(geom) as geom, ST_NPoints(geom5) as geom5, ST_NPoints(geom10) as geom10, ST_NPoints(geom20) as geom20, ST_NPoints(geom50) as geom50 from extremadura_highway LIMIT 10;

The result is as follows:

.. code-block:: console

    geom | geom5 | geom10 | geom20 | geom50 
   ------+-------+--------+--------+--------
       8 |     3 |      3 |      3 |      2 
      10 |     5 |      3 |      2 |      2 
       2 |     2 |      2 |      2 |      2
       3 |     2 |      2 |      2 |      2 
       3 |     2 |      2 |      2 |      2 
       8 |     6 |      5 |      4 |      2 
       2 |     2 |      2 |      2 |      2 
      20 |    11 |      8 |      5 |      5
       4 |     3 |      2 |      2 |      2 
      27 |    10 |      7 |      6 |      3 

As with the previous example, an XML file is required to configure the :guilabel:`Generalizing data store`, but in this case, as the data store will be based on a different structure, the file is slightly different.

Create a file in your GeoServer data directory named ``geninfo_postgis.xml`` and add the following content:

.. todo:: This code should be revised to ensure it is correct and actually works.

.. code-block:: xml

   <?xml version="1.0" encoding="UTF-8"?>
      <GeneralizationInfos version="1.0">
          <GeneralizationInfo dataSourceNameSpace="extremadura" dataSourceName="postgis_extremadura"  featureName="extremadura_highway" baseFeatureName="extremadura_highway" geomPropertyName="geom">
              <Generalization dataSourceNameSpace="extremadura" dataSourceName="postgis_extremadura"  distance="5" featureName="extremadura_highway" geomPropertyName="geom5"/>
              <Generalization dataSourceNameSpace="extremadura" dataSourceName="postgis_extremadura"  distance="10" featureName="extremadura_highway" geomPropertyName="geom10"/>
              <Generalization dataSourceNameSpace="extremadura" dataSourceName="postgis_extremadura"  distance="20" featureName="extremadura_highway" geomPropertyName="geom20"/>
              <Generalization dataSourceNameSpace="extremadura" dataSourceName="postgis_extremadura"  distance="50" featureName="extremadura_highway" geomPropertyName="geom50"/>
          </GeneralizationInfo>            
      </GeneralizationInfos>    

Now you can create a :guilabel:`Generalizing data store` based on the configuration in this file.    

Indexing non-spatial attributes
-------------------------------

We can take advantage of other PostGIS capabilities to further optimize our data, including indexing non-spatial attributes. If we are going to support filters and queries using certain attributes, adding an index to those attributes is recommended for improving performance. For example, the following command creates an index for the ``type`` attribute.

.. code-block:: sql

   CREATE INDEX type_idx ON extremadura_highway USING BTREE (type);


Materialized views
------------------

Materialized views (database objects that contain the results of a query) may be useful when dealing with complex queries that may otherwise have a negative impact on performance. 
If the view is not materialized, it does not physically exist in the database, and the results are computed at request time. This has many advantages, including reducing disk space requirements, but in terms of performance a view can represent an important bottleneck. Materializing a view involves processing all the costly operations in advance, so they don't have to be computed when a request is made on the view.

PostgreSQL does not support materialized views but other techniques are available that may achieve similar results improvements in performance. The simplest way of creating a materialized view is just to create a new table, in effect a snapshot of the view. For example, a view is defined as follows:

.. code-block:: sql

  SELECT *
  INTO motorways
  FROM highways
  WHERE rtype = 'motorway'

  ALTER TABLE motorways ADD PRIMARY KEY (gid);

  SELECT Populate_Geometry_Columns('motorways'::regclass);

This view can be materialized with the following clause:

.. code-block:: sql

  CREATE INDEX rtype_idx ON highways USING btree (rtype);

  CREATE OR REPLACE VIEW motorways_view AS
   SELECT *
   FROM highways
   WHERE rtype = 'motorway';

  SELECT Populate_Geometry_Columns('motorways_view'::regclass);

This will create a new table, so instead of now querying the view, the table can be queried. It will result in lower response times, and the more complex the view to be materialized is, the better the improvement in performance. However, this approach has several drawbacks, including any changes made to the original table are not reflected in the materialized view. The view must be recomputed whenever the source tables are modified. If your data doesn't change frequently, this is a reasonable solution but if your data is volatile, the view can become out of date quickly.

By implementing a database trigger, a materialized view can be updated automatically when tables or views it represents are updated. This approach to data management is not discussed further in this workshop, but the `PostgreSQL wiki <http://wiki.postgresql.org/wiki/Main_Page>`_ provides further information on this topic.

In general, avoid using complex views in your database. If you can't avoid using complex views, create materialized views to avoid performance issues. The update frequency for your data will determine the most appropriate method of creating the materialized view.


Database maintenance
--------------------

In addition to the various optimization techniques covered already, regular database maintenance can also help improve performance. The most important database operations are:

* *Vacuuming*. Outdated rows are not deleted from the database. The :command:`VACUUM` command reclaims space used by deleted rows, reducing the amount of data in the database.  Using :command:`VACUUM ANALYZE` will also collect statistics about the content of the vacuumed table(s), helping to identify the optimum execution plan for queries, which in turn improves performance. 

The code example below runs ``VACUUM ANALYZE`` on the table we created in the previous simplification example.

.. code-block:: sql

   VACUUM ANALYZE extremadura_highway;

* *Clustering*. Running :command:`CLUSTER` reorders rows according to a given index, placing the rows that are typically queried together beside each other. This will reduce the amount of time it takes to execute the query. If queries are expected to be mostly based on the indexed  ``type`` attribute, the table can be clustered based on that index with the following SQL command:

.. code-block:: sql

   CLUSTER type_idx ON extremadura_highway;

PostgreSQL cannot cluster rows when the index access method does not handle null values, as is the case with GiST (Generalized Search Tree) indexes. To use clustering in this case a "not null" constraint must be added to the table (assuming of course, that you don't need to have NULL values in the geometry column).

.. code-block:: sql

   ALTER TABLE extremadura_highway ALTER COLUMN geom SET not null

Now the table can be clustered based on the ``geom`` column GiST index.
  
.. code-block:: sql

   CLUSTER sp_index_extremadura_highway ON extremadura_highway

