.. _data:

Preparing the Census Data  
*************************

Our application is going to make use of US census data and color it thematically based on census variables. That means we are going to need two pieces of data loaded into our database:

* A spatial layer we can use to draw shapes from, and
* An attribute layer that provides the statistics we will be theming on.


Getting the Data
----------------

In order to keep things simple, we will use a geographic unit that is large enough to be visible on a country-wide map, but small enough to provide a granular view of the data: **a county**. There are about 3000 counties in the USA, enough to provide a detailed view at the national level, but not so many as to slow down our mapping engine.


Spatial Data
~~~~~~~~~~~~

To map counties, we'll need a geographic file of counties. Geographic data can be very detailed, which is good for local level mapping It can also be coarse, which is good for regional and national mapping. We're going to be providing relatively coarse nation-wide views of data so we want a small, coarse data file.

Many of the results from a `Google search for county shape files <http://www.google.com/search?q=counties+shapefile>`_ are quite detailed and large, but there are some smaller options, one of which we have linked here:

* Download `UScounties.zip <_static/data/UScounties.zip>`_ and unzip it.


Tabular Data
~~~~~~~~~~~~

The census "`QuickFacts <http://quickfacts.census.gov/qfd/download_data.html>`_" web site provides access to a complete set of census variables organized by county. In particular, we want:

* `DataSet.txt`_ -- 3195 rows, one for the U.S., one for each state, one for each county, but no column headings. Each row is identified by a 5-digit combined state and county code, the "FIPS code". Data are comma-delimited.
* `DataDict.txt`_ -- One row for each column in `DataSet.txt`_. Each row has a column name, full human-readable column title, number of decimals, min, max, and total values.


Loading the Data
----------------

.. note::

  The next steps will involve some database work.

  * If you haven't already installed the OpenGeo Suite, follow the :ref:`installation instructions <installation>`.


Create a Database
~~~~~~~~~~~~~~~~~

#. Open the PgAdmin program, and connect to the database (any password will be accepted).

#. Right-click on the **Databases** folder and select **New Database...**

   .. image:: ./img/createdb_1.png

#. Enter ``census`` as the database name and click **OK**.

   .. image:: ./img/createdb_2.png

#. Click on the new ``census`` database entry to open it. Then click the **SQL** button at the top of the interface to open the SQL command window.

   .. image:: ./img/createdb_3.png

#. Enter the SQL command ``CREATE EXTENSION postgis`` and press the *green triangle* button to run it. This will spatially enable the ``census`` database.

   .. image:: ./img/createdb_4.png



Load Tabular Data
~~~~~~~~~~~~~~~~~

The raw data is going to be loaded into the PostgreSQL database:

* `DataSet.txt` is going to be loaded into a table named `census`
* `UScounties.shp` is going to be loaded into a spatial table named `counties`
* The `census` and `counties` tables will have a common key, the **fips** code.

  .. image:: ./img/er-census.png

We will use the PostgreSQL `COPY command <http://www.postgresql.org/docs/current/static/sql-copy.html>`_, which supports reading table data directly from delimited text files, to import the `DataSet.txt`_ file. 

First, we need a table that has exactly the same number and type of columns as the `DataSet.txt`_ file. Fortunately, the `DataDict.txt`_ file includes a complete listing of all the column names and types. A little quick editing in a text editor yields a table definition:

.. code-block:: sql
   :emphasize-lines: 2

   CREATE TABLE census ( 
     fips VARCHAR PRIMARY KEY,
     PST045212 REAL,
     PST040210 REAL,
     PST120212 REAL,
     POP010210 REAL,
     AGE135212 REAL,
     AGE295212 REAL,
     AGE775212 REAL,
     SEX255212 REAL,
     RHI125212 REAL,
     RHI225212 REAL,
     RHI325212 REAL,
     RHI425212 REAL,
     RHI525212 REAL,
     RHI625212 REAL,
     RHI725212 REAL,
     RHI825212 REAL,
     POP715211 REAL,
     POP645211 REAL,
     POP815211 REAL,
     EDU635211 REAL,
     EDU685211 REAL,
     VET605211 REAL,
     LFE305211 REAL,
     HSG010211 REAL,
     HSG445211 REAL,
     HSG096211 REAL,
     HSG495211 REAL,
     HSD410211 REAL,
     HSD310211 REAL,
     INC910211 REAL,
     INC110211 REAL,
     PVY020211 REAL,
     BZA010211 REAL,
     BZA110211 REAL,
     BZA115211 REAL,
     NES010211 REAL,
     SBO001207 REAL,
     SBO315207 REAL,
     SBO115207 REAL,
     SBO215207 REAL,
     SBO515207 REAL,
     SBO415207 REAL,
     SBO015207 REAL,
     MAN450207 REAL,
     WTN220207 REAL,
     RTN130207 REAL,
     RTN131207 REAL,
     AFN120207 REAL,
     BPS030212 REAL,
     LND110210 REAL,
     POP060210 REAL
   );

Copy this table definition into the SQL command window and press the *green triangle* button to run it.

Once we have a blank table, we can load the file. In order to read the file, it must be in a location that is accessible by the database. I usually use the `/tmp` directory in UNIX or OSX and the `C:\\Temp` directory on Windows.

.. code-block:: sql

   COPY census FROM '/tmp/DataSet.txt' WITH (
      FORMAT csv, 
      HEADER true
      );

We aren't quite finished with the census table, yet. The description on the web page notes "3195 rows, one for the U.S., **one for each state**, one for each county". We only want rows for each county, otherwise things like county average calculations will get messed up. 

The key to getting rid of the state entries is the **fips code**. A valid county **fips code** is made up of:

* two digits of state code; and,
* three non-zero digits of county code.

So we can get rid of the non-county entries by **deleting all the rows that have zeroes in the last three digits**:

.. code-block:: sql

   DELETE FROM census WHERE fips LIKE '%000';

Which deletes the aggregate records for the 50 states and 2 territories from the table.

Load Spatial Data
~~~~~~~~~~~~~~~~~

Loading the `UScounties.shp` file is pretty easy, either using the command line or the shape loader GUI. Just remember that our target table name is `counties`. Here's the command-line::

   shp2pgsql -D -I -s 4326 UScounties.shp counties | psql census

And this is what the GUI looks like:

.. image:: ./img/shploader.png

Note that, like the `census` table, the `counties` table also contains a **fips** code, so we have a common key to join the attributes to the spatial shapes for mapping

.. code-block:: text
   :emphasize-lines: 9

           Table "public.counties"
      Column   |            Type             
   ------------+-----------------------------
    gid        | integer                     
    name       | character varying(32)       
    state_name | character varying(25)       
    state_fips | character varying(2)        
    cnty_fips  | character varying(3)        
    fips       | character varying(5)        
    geom       | geometry(MultiPolygon,4326) 
   Indexes:
     "counties_pkey" PRIMARY KEY, btree (gid)
     "counties_geom_gist" gist (geom)

To make the joins faster, add an index on the **fips** column in the `counties` table for good measure.

.. code-block:: sql

   CREATE INDEX counties_fips_idx ON counties (fips);



.. _DataDict.txt: _static/data/DataDict.txt
.. _DataSet.txt: _static/data/DataSet.txt
