.. _loading_data:

Section 4: Loading spatial data
===============================

Supported by a wide variety of libraries and applications, PostGIS provides many options for loading data.  This section will focus on the basics -- loading shapefiles using the PostGIS shapefile loading tool.  

#. First, return to the Dashboard, and click on the **Import shapefiles** link in the PostGIS section. The GUI shapefile importer pgShapeLoader will launch.

   .. image:: ./screenshots/pgshapeloader_01.png

#. Next, open the *Shape File* browser and navigate to the data directory, file:`\\postgis-workshop\\data`. Select the :file:`nyc_census_blocks.shp` file. 

#. Fill in the details for the *PostGIS Connection* section and click on the **Test Connection...** button.

   .. list-table::

      * - **Username**
        - ``postgres``
      * - **Password**
        - ``postgres``
      * - **Server Host**
        - ``localhost`` ``54321``
      * - **Database**
        - ``nyc``

  .. note:: 
  
     Setting the port number to **54321** is very important! The OpenGeo PostGIS runs on port 54321, not the default PostgreSQL port of 5432.

#. Fill in the details for the *Configuration* section.

   .. list-table::

      * - **Destination Schema**
        - ``public``
      * - **SRID**
        - ``26918``
      * - **Destination Table**
        - ``nyc_census_blocks``
      * - **Geometry Column**
        - ``geom``

#. Click the **Options** button and select "Load data using COPY rather than INSERT." This will make the data load process a little faster.

   .. image:: ./screenshots/pgshapeloader_02.png

#. Finally, click the **Import** button and watch the import process. It may take a few minutes to load, but this is the largest file in our test set.

#. Repeat the import process for the remaining shapefiles in the data directory. Except for the input file and output table name, all the other fields in pgShapeLoader should remain the same:

   * ``nyc_streets.shp``
   * ``nyc_neighborhoods.shp``
   * ``nyc_subway_stations.shp``
 
#. When all the files are loaded, click the "Refresh" button in pgAdmin to update the tree view. You should see your four tables show up in the **Tables** section of the tree.

   .. image:: ./screenshots/refresh.png
 
 
Shapefiles? What's that?
------------------------

You may be asking yourself -- "What's this shapefile thing?"  A "shapefile" commonly refers to a collection of files with ``.shp``, ``.shx``, ``.dbf``, and other extensions on a common prefix name (e.g., nyc_census_blocks). The actual shapefile relates specifically to files with the ``.shp`` extension. However, the ``.shp`` file alone is incomplete for distribution without the required supporting files.

Mandatory files:

  * ``.shp`` — shape format; the feature geometry itself
  * ``.shx`` — shape index format; a positional index of the feature geometry 
  * ``.dbf`` — attribute format; columnar attributes for each shape, in dBase III
    
Optional files include:

  * ``.prj`` — projection format; the coordinate system and projection information, a plain text file describing the projection using well-known text format

In order to analyze a shapefile in PostGIS, you need to convert a shapefile into a series SQL commands.  By running pgShapeLoader, a shapefile converts into a table that PostgreSQL can understand. 


SRID 26918? What's with that?
-----------------------------

Most of the import process is self-explanatory, but even experienced GIS professionals can trip over an **SRID**.

An "SRID" stands for "Spatial Reference IDentifier." It defines all the parameters of our data's geographic coordinate system and projection. An SRID is convenient because it packs all the information about a map projection (which can be quite complex) into a single number.

You can see the definition of our workshop map projection by looking it up either in an online database,

  http://spatialreference.org/ref/epsg/26918/

or directly inside PostGIS with a query to the ``spatial_ref_sys`` table.

.. code-block:: sql

  SELECT srtext FROM spatial_ref_sys WHERE srid = 26918;
  
.. note::

   The PostGIS ``spatial_ref_sys`` table is an OGC-standard table that defines all the spatial reference systems known to the database. The data shipped with PostGIS, lists over 3000 known spatial reference systems and details needed to transform/re-project between them.  
   
In both cases, you see a textual representation of the **26918** spatial reference system (pretty-printed here for clarity):

::

  PROJCS["NAD83 / UTM zone 18N",
    GEOGCS["NAD83",
      DATUM["North_American_Datum_1983",
        SPHEROID["GRS 1980",6378137,298.257222101,AUTHORITY["EPSG","7019"]],
        AUTHORITY["EPSG","6269"]],
      PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],
      UNIT["degree",0.01745329251994328,AUTHORITY["EPSG","9122"]],
      AUTHORITY["EPSG","4269"]],
    UNIT["metre",1,AUTHORITY["EPSG","9001"]],
    PROJECTION["Transverse_Mercator"],
    PARAMETER["latitude_of_origin",0],
    PARAMETER["central_meridian",-75],
    PARAMETER["scale_factor",0.9996],
    PARAMETER["false_easting",500000],
    PARAMETER["false_northing",0],
    AUTHORITY["EPSG","26918"],
    AXIS["Easting",EAST],
    AXIS["Northing",NORTH]]

If you open up the ``nyc_neighborhoods.prj`` file from the data directory, you'll see the same projection definition. 

A common problem for people getting started with PostGIS is figuring out what SRID number to use for their data. All they have is a ``.prj`` file. But how do humans translate a ``.prj`` file into the correct SRID number?

The easy answer is to use a computer.  Plug the contents of the ``.prj`` file into http://prj2epsg.org. This will give you the number (or a list of numbers) that most closely match your projection definition. There aren't numbers for *every* map projection in the world, but most common ones are contained within the prj2epsg database of standard numbers.

.. image:: ./screenshots/prj2epsg_01.png

Data you receive from local agencies -- such as New York City -- will usually be in a local projection noted by "state plane" or "UTM".  Our projection is "Universal Transverse Mercator (UTM) Zone 18 North" or EPSG:26918.  


Things to Try: Spatially Enable an Existing Database
----------------------------------------------------

You have already seen how to create a database using the ``postgis_template`` in pgAdmin. However when installing from source or adding PostGIS functionality to an existing database, it is not always appropriate to create a fresh database from the PostGIS template.

Your task in this section is to create a database and add PostGIS types and functions after the fact.  The SQL scripts needed -- :file:`postgis.sql` and :file:`spatial_ref_sys.sql` -- can be found in the :file:`contrib` directory of your PostgreSQL install.  For guidance, refer to the PostGIS documentation on installing from source [#PostGIS_Install]_.

.. note::

   Remember to include your username and port number when creating a database from the command line.
    
Things to Try: View data using uDig
-----------------------------------

`uDig <http://udig.refractions.org>`_, (User-friendly Desktop Internet GIS), is a desktop GIS viewer/editor for quickly looking at data. You can view a number of data formats including flat shapefiles and a PostGIS database. Its graphical interface allows for easy exploration of your data, as well as simple testing and fast styling. 

Try using this software to connect your PostGIS database.  The application can be downloaded from http://udig.refractions.net/download

.. rubric:: Footnotes

.. [#PostGIS_Install] "Chapter 2.5. Installation" PostGIS Documentation. May 2010 <http://postgis.org/documentation/manual-1.5/ch02.html#id2786223>

