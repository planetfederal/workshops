Optimizing working with vector layers in GeoServer
===================================================


Introduction
--------------

In this tutorial we are going to see how to optimize vector data to improve performance of GeoServer when serving it.

The tutorial will focus around the following ideas:

- Data preparation. Differences between formats and containers.
- Strategies for data structuring.
- Optimal configuration of the corresponding datastores.

The two first ideas take place in the data itself, and are not exclusive of Geoserver, but general concepts and methods that will improve performance in any system or software using that data. The last idea is exclusive of GeoServer and the way it works with data.

Let’s start with an example. Download this zip file and extract it. It contains two files, both of them with the same data (a road network), but in two different formats: GML and shapefile. We are going to work with them in GeoServer and see how the differences between these file formats affect the GeoServer performance. Based on that, we will analyze solutions and give recommendations for the different scenarios that might appears, in terms of data.

Import both vector layers into GeoServer, using the corresponding data store. Now go to the Layers Preview and open an Open Layers-based preview of the first layer (the GML one).

We will be using Google chrome to check the response times of some requests. If you are using another browser, just look for the corresponding plugin to get this information. Press Ctrl - Shift - I (Command - Option - I if you are using Mac) to show the Chrome Developer Tools window. Select the Network tab. You should see something like this:

.. image:: imgs/chrometools.jpg

As you start making requests, you will see in the lower part of the window, in the Timeline column, the time it has taken to respond them. Do some zomming and panning and have a look at the response times. You might notice that the performance is not very good, and it usually takes sometime to render the data when you change the zoom level or you pan.

Open now another layer preview, this time for the shapefile layer. Response times are better in this case, specially when zooming in, and the experience is much better.

Zoom to the full extent of the layer and add this to the URL:

::

	&cql_filter=TYPE='motorway'

This will filter and render just the motorways instead of all roads in the layer. Although the number of roads rendered will be much smaller, you might notice that the response time is more or less the same. Applying the filter has not a significant effect on performance.

Now let's put the shapefile into PostGIS and connect it t GeoServer. Open a layer preview and browse the layer, checking the response times once again. You will notice the response times are similar to those of the shapefile-based layer, but this time applying the filter has some effect on the response time.

Here is an explanation of these differences that can be found between the three stores, and that will help us move forward and understand how to optimize Geoserver for a particular dataset.

- The GML format is text based, which makes the input file much larger and has a large overhead. Also, it just contains the data itself, with no indexing of any kind.
- The Shapefile format is a binary format (that here means faster reading and smaller size), and includes a ``.shx`` file, which contains an spatial index. That optimizes access to a given area within the full extent of the layer, resulting in a better performance.
- PostGIS not only has a spatial index, but also indexes the non-spatial fields, which improves performance when applying non-spatial filters, such as the one we used.

Selecting the right file format (or data container)
------------------------------------------------------

As a rule of thumb, databases can be considered better than file-based solutions, but a good performance can be obtained as well with file-based solutions. In the following section, we will cover data preparation for both cases.

If not using a database, choosing the right file format is critic, as there are important differences between them. Some of the factors that affect performance are the following:

- Text-based vs binary. Text based formats are always a bad ideas, since the volume of data is larger and they usually involve time-consuming parsing. Using a GML file or a DXF one will significantly degrade the performance of GeoServer. Also, text formats do not have indexes, so extracting a subset of the information they contain is far from efficient.
- Spatial indexing. A close zoom into a given area makes it unnecessary to use the data from those features not into the zoomed area. Finding out which features are within a given extent is faster when we can use a spatial index, something that ost file formats do not support.

The shapefile format is usually the best option, since it is binary based, has spatial indexing, and is well supported by GeoServer. Examples in the following sections will be based on data in shapefile format.


Preparing and structuring vector data
--------------------------------------

Selecting a given format/container does not guarantee that our data is optimized and that it will be accessed minimizing the amount of memory, processing and disk reading needed. Optimizing techniques not based on the data format itself can be applied to increase performance, specially in the case of layers used at multiple scales.

We will see two examples of these techniques, which are based on the following ideas:

- Some parts of the non-spatial data might not be relevant for the service we are running, so they can be discarded.
- When a layer is rendered at a small scale, the amount of data is excessive for the rendering, and a large amount of time is spent unnecessarily. A simplified version of the data for those scales would increase performance.

The first one is basically a cleaning of the layer, so as to cut down all data that is not going to be used but causes some overhead. The second case is similar to the pyramids used for raster layers, in which several copies of a same layer are kept, but at different resolutions.

To perform this optimizations, we will be using some external tools, in particular ``ogr2ogr`` and a GeoTools module for creating generalized versions of a layer. Later we will see how to perform the same optimization within a PostGIS database.


Preparation using ``ogr2ogr``
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

We can modify vector layer using the ``ogr2ogr`` tools. It is part of FWTools and that is the recommended way of installing it. It allows to convert vector files between a large number of formats, but also includes some additional elements to alter the data, so the exported data can be filtered or modified. We will be working with a shapefile and generating another one, but we will apply some modifications in the way.

Of course, if your data is not a shapefile, you can just use ``ogr2ogr`` to convert from your format to a shapefile, in case the original format is not a good one in terms of performance. To convert our GML file into a shapefile, just run the following command in a console.

::

	$ogr2ogr  -f "ESRI Shapefile" extremadura_highway.shp extremadura_highway.gml

Assuming we already have a shapefile, let's prepare to be more efficient and provide a better performance. First, let's clean our shapefile and remove unneeded fields. Cleaning a vector layer can be done using the ``-select`` modifier, and after that the list of fields that should be kept in the resulting file.

Here is the table structure of our shapefile, obtained by using ``ogrinfo``, a very practical tool also included in FWTools

::

	$ogrinfo extremadura_highway.shp extremadura_highway -so

	INFO: Open of `extremadura_highway.shp'
	 using driver `ESRI Shapefile' successful.

	Layer name: extremadura_highway
	Geometry: Line String
	Feature Count: 32391
	Extent: (-7.612608, 37.849637) - (-4.547236, 40.585243)
	Layer SRS WKT:
	GEOGCS["WGS 84",
	    DATUM["WGS_1984",
	        SPHEROID["WGS 84",6378137,298.257223563,
	            AUTHORITY["EPSG","7030"]],
	        TOWGS84[0,0,0,0,0,0,0],
	        AUTHORITY["EPSG","6326"]],
	    PRIMEM["Greenwich",0,
	        AUTHORITY["EPSG","8901"]],
	    UNIT["degree",0.01745329251994328,
	        AUTHORITY["EPSG","9122"]],
	    AUTHORITY["EPSG","4326"]]
	TYPE: String (17.0)
	NAME: String (99.0)
	ONEWAY: String (4.0)
	LANES: Real (11.0)

Asumming that only the first 2 fields (``TYPE, NAME``) are relevant in our case, let's remove all the other ones by running the following command.

::

	$ogr2ogr -select TYPE,NAME extremadura_highway_cleaned.shp extremadura_highway.shp


If we now have a look at the fields in the created layer, we will see this:

::

	$ogrinfo extremadura_highway_cleaned.shp extremadura_highway_cleaned -so
	INFO: Open of `extremadura_highway.shp'
	 using driver `ESRI Shapefile' successful.

	Layer name: extremadura_highway_cleaned
	Geometry: Line String
	Feature Count: 32391
	Extent: (-7.612608, 37.849637) - (-4.547236, 40.585243)
	Layer SRS WKT:
	GEOGCS["WGS 84",
	    DATUM["WGS_1984",
	        SPHEROID["WGS 84",6378137,298.257223563,
	            AUTHORITY["EPSG","7030"]],
	        TOWGS84[0,0,0,0,0,0,0],
	        AUTHORITY["EPSG","6326"]],
	    PRIMEM["Greenwich",0,
	        AUTHORITY["EPSG","8901"]],
	    UNIT["degree",0.01745329251994328,
	        AUTHORITY["EPSG","9122"]],
	    AUTHORITY["EPSG","4326"]]
	TYPE: String (17.0)
	NAME: String (99.0)


The size of the ``dbf`` file is now just 3.7MB, compared to 4.2MB of the original one. It is not a big change, because there were not many unused columns in the attributes table, but in other cases deleting unused columns might mean a really big difference. Notice that the ``shp`` file has the same size. Since this command affects only the attributes and not the geometries, the ``shp`` remains the same.

The second way we can use ``ogr2ogr`` is with the ``-simplify`` modifier, which will cause the geometries in the input layer to be simplified according to a given tolerance. This gives us a good way of generating simplified (generalized) versions of the layer that we can use along with them for rendering at larger scales. The advantage of that is easy to understand if we think that, at those scales, the amount of points in the geometry imply a level of detail much larger than what can be rendered. Reducing the number of points will yield a layer with less detail, but that loss of detail will not be perceived in the rendered image, since the detail that is loss is beyond the limitations of the rendering scale.

The ``-simplify`` modifier requires a distance tolerance to be specified. By using several values, we can create a set of layer covering the most usual scales, just like the different levels of a raster pyramid. Here is an example command line that we can use to simplify our example shapefile.

::

	$ogr2ogr -simplify 0.01 extremadura_highway_simplified_001.shp extremadura_highway.shp

0.01 is the distance tolerance. Since the layer is in EPSG:4326, distance is expressed in this case in decimal degrees.

When dealing with multiple scales, it is not only interesting to have generalized versions, but also to consider that some features within a layer should not be represented at certain scales. For instance, it make sense to render only motorways at small scales, and leave the rendering of other types of roads for larger scales. This can be done in several ways.

- By setting styling rules that filter based on a given field (in our case, the type of road)
- By splitting the layer in several files, so that it acts as a prefiltering, and then having different scales of rendering for each of them.

The first solution is more practical and generally better, but might degrade performance in certain cases. We have already mentioned that shapefiles do not allow indexing of attributes, so filtering based on them is not an efficient operation. Using a database is crearly better in this case, but if for some reason you should use shapefiles, a bit of data preparation can replace the more efficient indexing capabilities of the database. Once again, we will use ``ogr2ogr`` to do it. The ``-sql`` modifier allows to get the result of an SQL query into a new file, so it can be used for this task.

Type the next line into your console.

::
	
	$ogr2ogr -sql "SELECT * FROM extremadura_highway_cleaned WHERE TYPE='motorway' " motorways.shp extremadura_highway_cleaned.shp
	
Now we have two layers, each one meant to be rendered at a different scale. The ``MaxScaleDenominator`` and ``MinScaleDenominator`` SLD elements can be used to set that scale dependency in the styling of each layer. No additional filtering will be needed at rendering time, since we have already prefiltered the layer to create a new one.

	Note: Styling rules can be used for improving performance in many different ways, but we will not cover those optimizations here, except for the simple cases where some particular styling is necessary to use a given data optimization technique.

Splitting in two layers can be combined with pregeneralization as well. Since the layer containing only highways is going to be used only at small scales, is likely to have too much detail, so it can be simplified. The above command line can be replaced with the one below to incorporate generalization in one single step.

::

	$ogr2ogr -simplify 0.01 -sql "SELECT * FROM extremadura_highway_cleaned WHERE TYPE='motorway' " motorways.shp extremadura_highway_cleaned.shp


The last modifier that we can use with ``ogr2ogr`` for optimizing a shapefile is ``-t_srs``, which will reproject the layer into a given SRS. If the layer has a coordinate system different to the one used for a request, it has to be reprojected, which is a time-consuming operation. For this reason, it is recommended to have layers in the coordinate system that is most usually requested.

Here is the command line to use to convert our vector data from its current EPSG:4326 coordinate system into EPSG:23030 a coordinate system that we might expect to be used more frequently for this area.

::

	$ogr2ogr -t_srs EPSG:23030 extremadura_highway_23030 extremadura_highway.shp

Preparation using the GeoTools Pregeneralized module
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

GeoServer has a plugin (not included in the Suite, so it has to be manually installed), that makes it easier to use pregeneralized vector layers. Although it can be used with shapefiles such as the ones we created using , it is particularly interesting when working with databases, as it integrates better and makes use of database capabilities not found in shapefiles.

To install this plugin, download it from here. Shutdown GeoServer, extract the content of the zip file that you have downloaded into the GeoServer ``WEB-INF/lib`` folder, and restart GeoServer. If you now try to add a new data store, you will see a new option available, named *Generalizing data store*.

.. image:: imgs/GeneralizingStoreEntry.jpg

This store is similar to the ImagePyramid for raster layer, allowing to have pregeneralized versions for a single layer, and seamlessly managing which one of them to use in each case. The pregeneralized version can be created as we have already seen, but in this case, as we are working with a shapefile, it is also possible to use a complementary GeoTools tool that provides a better integration. 

In your GeoServer ``WEB-INF/lib`` folder you should have a jar file named ``gt-feature-pregeneralized-<version>.jar``. This contains the tool to use to generalize a shapefile.


In your geoserver data folder (usually in ``[your_user_folder]/.opengeo/data_dir/data``), create a folder named ``extremadura_highway`` to keep our data. Under it, create a folder named ``0`` and copy the base shapefile there. In this case, by *base shapefile* we mean the reprojected one. You can leave the other modifications out for this example, but is important to have the layer to generalize in a projected CRS to follow the examples below, since are we will be using distances in meters to set tolerances for the generalization process. 

Now open a console in the data folder and type the following:

::

	$java -jar "[GeoServer-path]/WEB-INF/lib/gt-feature-pregeneralized-<version>.jar" generalize 0/extremadura_highway_23030.shp . 5,10,20,50

The list of numbers at the end represent the generaliation distances to use. This will create new shapefiles, each of them in its corresponding folder, named after the generalization distance.

To setup a Generalizing Store based on those files, we have to create an XML file describing their structure. In the ``extremadura_highway`` folder, create a new file named ``geninfo_shapefile.xml`` with the following content:

::

	<?xml version="1.0" encoding="UTF-8"?>
	<GeneralizationInfos version="1.0">
      	<GeneralizationInfo dataSourceName="file:data/extremadura_highway/0/extremadura_highway_23030.shp"  featureName="extremadura_highway_gen" baseFeatureName="extremadura_highway" geomPropertyName="geom">
              <Generalization dataSourceName="file:data/extremadura_highway/5.0/extremadura_highway_23030.shp"  distance="5" featureName="extremadura_highway" geomPropertyName="geom"/>
              <Generalization dataSourceName="file:data/extremadura_highway/10.0/extremadura_highway_23030.shp"  distance="10" featureName="extremadura_highway" geomPropertyName="geom"/>
              <Generalization dataSourceName="file:data/extremadura_highway/20.0/extremadura_highway_23030.shp"  distance="20" featureName="extremadura_highway" geomPropertyName="geom"/>
              <Generalization dataSourceName="file:data/extremadura_highway/50.0/extremadura_highway_23030.shp"  distance="50" featureName="extremadura_highway" geomPropertyName="geom"/>
      </GeneralizationInfo>
	</GeneralizationInfos>  

Now we can setup the Generalizing Store, pointing it to this file. 

These are the default parameter values that you will find to configure this datastore:

.. image:: imgs/GeneralizingStoreDefault.jpg

And you should change them to these ones:

.. image:: imgs/GeneralizingStoreSetting.jpg

As you see, the ``GeneralizationInfosProviderParam`` parameter points to the XML file, and we have changed the ``geotools`` package names to ``geoserver``.

Publish your layer. 

You should also have a datastore named *extremadura_highway* (that is why, in our XMl file we have ``baseFeatureName="extremadura_highway"``), created with the base layer.

If you already have it, you can open a preview of the generalized datastore and it should be using the different shapefiles, depending on the rendering scale. You can check the GeoServer log to be sure of that. You will find something like this:

XXXXXXXXXXXXXXXXX

The Generalizing Store can work without the need of multiple copies of the whole layer, provided that the format used supports multiple geometries associated to one feature. In the case of shapefiles, it is not possible, since each feature can only have one geometry, so we have a lot of redundat data. All the attributes of each feature are copied in each shapefile. The ``dbf`` files of each of them are, in fact, identical. However, if we are working on a database, there is no problem having more than one geometry, so we can have a much better structure and save space. In the next section we will see how to optimize our data when it resides in a PostGIS database, including how to create pregeneralized version within PostGIS and using them with the Generalizing Store.


Preparation using PostGIS 
^^^^^^^^^^^^^^^^^^^^^^^^^^^

The *stacked* structure with several shapefiles that we have used can be replaced by one in which all the geometries (the original one and the generalized ones) are part of the attributes of the feature. This can be done using PostGIS commands, and the result stored as well in PostGIS and accesed from GeoServer using the Generalizing Store.

Let's import our original shapefile into PostGIS. The table structure is the following one.

::

	 Column  |              Type               |
	---------+---------------------------------+
	 gid     | integer                         |
	 type    | character varying(17)           |
	 name    | character varying(99)           |
	 oneway  | character varying(4)            |
	 lanes   | double precision                |
	 geom    | geometry(MultiLineString,23030) |


We are going to expand it to have more columns with additional simplified versions of the main geometries associated to each feature. Particularly, we want 4 more columns, to have 4 levels of generalization, as we had in the case of using shapefiles.

The first thing to do is to add those columns. We will use the PostGIS ``AddGeometryColumn`` function.

::

	SELECT AddGeometryColumn('','extremadura_highway','geom5','23030','MULTILINESTRING',2);
	SELECT AddGeometryColumn('','extremadura_highway','geom10','23030','MULTILINESTRING',2);
	SELECT AddGeometryColumn('','extremadura_highway','geom20','23030','MULTILINESTRING',2);
	SELECT AddGeometryColumn('','extremadura_highway','geom50','23030','MULTILINESTRING',2);

The same geometry type as the original geometry has to be used.

Now the table structure is as follows

::

	Column   |              Type               |
	---------+---------------------------------+
	 gid     | integer                         |
	 type    | character varying(17)           |
	 name    | character varying(99)           |
	 oneway  | character varying(4)            |
	 lanes   | double precision                |
	 geom    | geometry(MultiLineString,23030) |
	 geom5   | geometry(MultiLineString,23030) |
	 geom10  | geometry(MultiLineString,23030) |
	 geom20  | geometry(MultiLineString,23030) |
	 geom50  | geometry(MultiLineString,23030) |

Now we populate those columns with the generalized geometries. These are calculated using the PostGIS ``ST_SimplifyPreserveTopology`` function. Apart from the geometry to be simplified, it takes the distance tolerance as argument). Here is the SQL to run for this task.

::

	UPDATE extremadura_highway SET geom5 = ST_Multi(ST_SimplifyPreserveTopology(geom,5));
	UPDATE extremadura_highway SET geom10 = ST_Multi(ST_SimplifyPreserveTopology(geom,10));
	UPDATE extremadura_highway SET geom20 = ST_Multi(ST_SimplifyPreserveTopology(geom,20));
	UPDATE extremadura_highway SET geom50 = ST_Multi(ST_SimplifyPreserveTopology(geom,50));

We use ``ST_Multi()`` to get multi-geometries, since ST_SimplifyPreserveTopology returns simple geometries.

Finally, and to increase performance, we create spatial indices for each one of the new columns with the following SQL code.

::

	CREATE INDEX polygon_index_extremadura_highway_5 ON extremadura_highway USING GIST (geom5);
	CREATE INDEX polygon_index_extremadura_highway_10 ON extremadura_highway USING GIST (geom10);
	CREATE INDEX polygon_index_extremadura_highway_20 ON extremadura_highway USING GIST (geom20);
	CREATE INDEX polygon_index_extremadura_highway_50 ON extremadura_highway USING GIST (geom50);

If we expect to have filters and queries using a certain attribute, indexing it is a good strategy for increasing performance.

	CREATE INDEX type_idx ON extremadura_highway USING BTREE (name)

And finally we run VACUUM ANALYZE just for this table.

::

	VACUUM ANALYZE extremadura_highway;

So now the database contains all the data we need, and correctly structured. Before moving back to GeoServer and configuring a datastore to connect to this extended table we have just created, we can check that the simplified geometries contain less points than the original ones by running the following query (only the first 10 features are checked, by using ``LIMIT 10``):

::

	SELECT ST_NPoints(geom) as geom, ST_NPoints(geom5) as geom5, ST_NPoints(geom10) as geom10, ST_NPoints(geom20) as geom20, ST_NPoints(geom50) as geom50  from extremadura_highway LIMIT 10;

The result looks like this.

::

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


An XML file is needed to configure the Generalizing Store, but in this case, since it is going to be based on a different structure, the file is slightly different.

Create a file in your GeoServer data directory named ``geninfo_postgis.xml`` with the following content.

::

 <?xml version="1.0" encoding="UTF-8"?>
    <GeneralizationInfos version="1.0">
        <GeneralizationInfo dataSourceNameSpace="extremadura" dataSourceName="postgis_extremadura"  featureName="extremadura_highway" baseFeatureName="extremadura_highway" geomPropertyName="geom">
            <Generalization dataSourceNameSpace="extremadura" dataSourceName="postgis_extremadura"  distance="5" featureName="extremadura_highway" geomPropertyName="geom5"/>
            <Generalization dataSourceNameSpace="extremadura" dataSourceName="postgis_extremadura"  distance="10" featureName="extremadura_highway" geomPropertyName="geom10"/>
            <Generalization dataSourceNameSpace="extremadura" dataSourceName="postgis_extremadura"  distance="20" featureName="extremadura_highway" geomPropertyName="geom20"/>
            <Generalization dataSourceNameSpace="extremadura" dataSourceName="postgis_extremadura"  distance="50" featureName="extremadura_highway" geomPropertyName="geom50"/>
        </GeneralizationInfo>            
    </GeneralizationInfos>    

Now you can create a Generalizing Datastore based on it, as we have already seen.    


Fine tuning a datastore in GeoServer
-------------------------------------

We will see in this section the particular parameters that we can set for each datastore in GeoServer. Also, we will see how to fine tune the datastore source itself, in the case of using a database one.

Fine tuning a shapefile datastore in Geoserver
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The parameters available when defining a shapefile datastore should be correctly set to get optimal performance. Here are some recommendations about them.

- Although the shapefile format includes a file with a spatial index, GeoServer can create its own index, usually with better results. To let GeoServer do this, remove the ``.qix`` file that accompanies your ``.shp`` file and check the *Create spatial index if missing/outdated* check box.

-The *Use memory mapped buffers* and *Cache and reuse memory maps* can improve performance when set to true. However, do it only if you are running Linux. If you are running windows, it will have just the opposite effect.


Fine tuning a PostGIS datastore in Geoserver
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To fine tune a PostGIS datastore, adjustments should be done mostly on the PostGIS side, optimizing how the software runs, so as to get better performance.

In this case, and since PostGIS is based on Postgres, adjustments than improve Postgres performance will result in a better performance of GeoServer when connected to a PostGIS database. 

Default values for Postgres settings are rather conservative, since they are meant to work fine in all configurations and machines, and to avoid problems. Changing them will give you a better performance. The configuration file can be found in your data folder, and it can be edited with a text editor. Better than that, you can run pgAdmin and then go to *file->Open postgresql.conf...*. You will have to enter the path to the configuration file, and it will be opened in a separate window where it is easier to change configuration parameters.

There are many parameters to configure. Here are some ideas about the main ones that can be adjusted to get a better performance.

- ``max connections``. Set it accordingly with the number applications connecting to the database.
- ``work_mem``. Rather low by default, defines the memory available for sorting operations. It is related to ``max_connections``, since each connection requires its own memory ofr its operations.
- ``effective_cache_size``. Recommended values are between 1/2 and 3/4 of available memory.

More detailed information about tuning PostGIS can be found at http://workshops.opengeo.org/postgis-intro/tuning.html.

Other possible adjustments that can help improve performance are related to database maintainance operations. The following ones are the most important ones.

- *Vacumming*. Outdated rows are not deleted from the database. Vacumming reclaims space used by this dead rows, reducing the volume of data in the data base. The ``VACUUM`` command is used for that. Using ``VACUUM ANALYZE`` will also collect statistics about the content of the vacuumed table, which helps deciding the best way of executing queries and, thus, increases performance

- *Clustering*. Running ``CLUSTER`` reorders rows according to a given index. That puts together rows that might match a given query, reducing the time to execute that query. 

Finally, the following parameters used to define the PostGIS datastore can influence the its performance:

- *Loose BBOX*. When this options is enabled, only the bounding box of a geometry is used. This can result in a significant performance gain, but at the expense of total accuracy; some geometries may be considered inside of a bounding box when they are technically not. If primarily connecting to this data via WMS, this flag can be set safely since a loss of some accuracy is usually acceptable. However, if using WFS and especially if making use of BBOX filtering capabilities, this flag should not be set.
- *Prepared statements*. Enabling prepared statements can degrade performance. Do not set this option to true.

The following three parameters related to connection pooling are available for every datastore that is backed up by a database, not just for the case of a PostGIS datastore. A connection pool keeps a certain number of connections open, so there is no need to open a new one whenever it is needed, eliminating the overhead of opening and closing a new connection.

- *Max connections*. The maximum number of connections the connection pool can hold. When the maximum number of connections is exceeded, additional requests that require a database connection will be halted until a connection from the pool becomes available. The maximum number of connections limits the number of concurrent requests that can be made against the database.
- *Min connections*. The minimum number of connections the pool will hold. This number of connections is held even when there are no active requests. When this number of connections is exceeded due to serving requests additional connections are opened until the pool reaches its maximum size (described above).
- *Validate connections*. Flag indicating whether connections from the pool should be validated before they are used. A connection in the pool can become invalid for a number of reasons including network breakdown, database server timeout, etc.. The benefit of setting this flag is that an invalid connection will never be used which can prevent client errors. The downside of setting the flag is that a performance penalty is paid in order to validate connections.


JNDI
^^^^^^^^^^^^^^^^^^^^^^

¿?¿?



