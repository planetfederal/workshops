
.. note:: 

  Check out the `full demonstration application <_static/code/censusmap.html>`_ and play!


Introduction
------------

Every ten years, the `US census <http://www.census.gov/2010census/>`_ collects a staggering array of information about the population, collates it, and then releases it in raw form. It is a truly majestic compendium of data, but browsing it can be hard: 

* there are so many scales of data, and so many potential columns to view, it's hard to build a general purpose mapping app that isn't hopelessly complicated; and,
* the data itself is so voluminous and complicated that building your own app can seem impossible.

This tutorial builds a very simple application that uses a single thematic style to visualize several dozen census variables collated to the county level.

.. image:: ./img/census_hispanic.png 
   :width: 95%

For this adventure in map building, we use the following tools, which if you are following along you will want to install now:

* OpenGeo Suite 4 (available for Linux, Mac OSX and Windows, follow the `Suite installation instructions`_)

The basic structure of the application will be

* A spatial table of counties in PostGIS, that will join with
* An attribute table with many census variables of interest, themed by
* A thematic style in GeoServer, browsed with
* A simple pane-based application in OpenLayers, allowing the user to choose the census variable of interest.

This application exercises all the tiers of the OpenGeo Suite!


Getting the Data
----------------

In order to keep things simple, we will use a geographic unit that is large enough to be visible on a country-wide map, but small enough to provide a granular view of the data: **a county**. There are about 3000 counties in the USA, enough to provide a detailed view at the national level, but not so many as to slow down our mapping engine.

Map Data
~~~~~~~~

To map counties, we'll need a geographic file of counties, so let's check the Google:

* http://www.google.com/search?q=counties+shapefile

The most authoritative source would be the county layer from the US census, but unfortunately the file is about 50M in size! Great for detail mapping, but overkill for a country-wide thematic map.

The top entry is a `discussion on an Esri forum <http://forums.arcgis.com/threads/26330-Where-can-I-find-a-shapefile-with-all-US-counties-and-FIPS-code-for-each>`_ about county boundaries, and includes a file of just about the right size, so we will work with that one.

* Download `UScounties.zip <_static/data/UScounties.zip>`_

Census Data
~~~~~~~~~~~

The census "`QuickFacts <http://quickfacts.census.gov/qfd/download_data.html>`_" web site provides access to a complete set of census variables organized by county. In particular, we want:

* `DataSet.txt`_ -- 3195 rows, one for the U.S., one for each state, one for each county, but no column headings. Each row is identified by a 5-digit combined state and county code, the "FIPS code". Data are comma-delimited.
* `DataDict.txt`_ -- One row for each column in `DataSet.txt`_. Each row has a column name, full human-readable column title, number of decimals, min, max, and total values.


Loading the Data
----------------

.. note::

  The next steps will involve some database work.

  * If you haven't already installed the OpenGeo Suite, follow the `Suite installation instructions`_.
  * `Create a spatial database`_ named `census` to load data into.

The raw data is going to be loaded into the PostgreSQL database:

* `DataSet.txt` is going to be loaded into a table named `census`
* `UScounties.shp` is going to be loaded into a spatial table named `counties`
* The `census` and `counties` tables will have a common key, the **fips** code.

  .. image:: ./img/er-census.png

Loading Census Data
~~~~~~~~~~~~~~~~~~~

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

Loading Census Shapes
~~~~~~~~~~~~~~~~~~~~~

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


Drawing the Map
---------------

Our challenge now is to set up a rendering system that can easily render any of our 51 columns of census data as a map.

We could define **51 layers in GeoServer**, and set up 51 separate styles to provide attractive renderings of each variable. But that would be a lot of work, and we're **much too lazy** to do that. What we want is a **single layer** that can be re-used to render any column of interest. 

One Layer to Rule them All
~~~~~~~~~~~~~~~~~~~~~~~~~~

Using a `parametric SQL view <http://docs.geoserver.org/stable/en/user/data/database/sqlview.html#using-a-parametric-sql-view>`_ we can define a SQL-based layer definition that allows us to change the column of interest by substituting a variable when making a WMS map rendering call.

For example, this SQL definition will allow us to substitute any column we want into the map rendering chain:

.. code-block:: sql

   SELECT 
     census.fips, 
     counties.geom,
     %column% AS data
   FROM census JOIN counties USING (fips)

The query joins the `census` table data to the `counties` spatial table, and includes a `data` column, that is dynamically filled in by the `%column%` variable.

One Style to Rule them All
~~~~~~~~~~~~~~~~~~~~~~~~~~

Viewing our data via a parametric SQL view doesn't quite get us over the goal line though, because we still need to create a thematic style for the data, and the data in our **51 columns** have vastly different ranges and distributions:

* some are percentages
* some are absolute population counts
* some are medians or averages of absolutes

We need to somehow get all this different data onto one scale, preferably one that provides for easy visual comparisons between variables.

The answer is to **use the average and standard deviation of the data to normalize it** to a standard scale.

.. image:: ./img/stddev.png

For example:

* For data set **D**, suppose the **avg(D)** is **10** and the **stddev(D)** is **5**.
* What will the average and standard deviation of **(D - 10) / 5** be?
* The average will be **0** and the standard deviation will be **1**.

Let's try it on our own census data.

.. code-block:: sql

   SELECT Avg(pst045212), Stddev(pst045212) FROM census;
   
   --
   --        avg        |     stddev      
   -- ------------------+-----------------
   --  99877.2001272669 | 319578.62862369

   SELECT Avg((pst045212 - 99877.2001272669) / 319578.62862369),
          Stddev((pst045212 - 99877.2001272669) / 319578.62862369) 
   FROM census;
   
   --     avg    | stddev 
   -- -----------+--------
   --      0     |      1

So we can easily convert any of our data into a scale that centers on 0 and where one standard deviation equals one unit just by normalizing the data with the average and standard deviation!

Our new parametric SQL view will look like this:

.. code-block:: sql

   -- Precompute the Avg and StdDev,
   -- then join the tables and normalize
   WITH stats AS (
     SELECT Avg(%column%) AS avg, 
            Stddev(%column%) AS stddev 
     FROM census
   )
   SELECT 
     census.fips, 
     counties.geom,
     %column% as data
     (%column% - avg)/stddev AS normalized_data
   FROM stats, 
     census JOIN counties USING (fips)

The query first calculates the overall statistics for the column, then applies those stats to the data in the join query, serving up a normalized view of the data.

With our data normalized, we are ready to create one style to rule them all!

* Our style will have two colors, one to indicate counties "above average" and the other for "below average"
* Within those two colors it will have 3 shades, for a total of 6 bins in all
* In order to divide up the population more or less evenly, the bins will be

  * (#c51b7d) -1.0 and down (very below average) 
  * (#e9a3c9) -1.0 to -0.5 (below average) 
  * (#fde0ef) -0.5 to 0.0  (a little below average) 
  * (#e6f5d0)  0.0 to 0.5  (a little above average) 
  * (#a1d76a)  0.5 to 1.0  (above average) 
  * (#4d9221)  1.0 and up  (very above average) 

* The colors above weren't chosen randomly! I always use the `ColorBrewer <http://colorbrewer2.org/>`_ site when building themes, because ColorBrewer provides palettes that have been tested for maximum readability and to some extent aesthetic quality. Here's the palette I chose:

  .. image:: ./img/colorbrewer.png
     :width: 95%

* Configure a new style in GeoServer by going to the *Styles* section, and selecting **Add a new style**.
* Set the style name to *stddev*
* Set the style workspace to *opengeo*
* Paste in the style definition (below) for `stddev.xml`_ and hit the *Save* button at the bottom

.. literalinclude:: ../static/code/stddev.xml
   :language: xml



Now we have a style, we just need to create a layer that uses it!

Creating a SQL View
~~~~~~~~~~~~~~~~~~~

First, we need a PostGIS store that connects to our database

* Go to the *Stores* section of GeoServer and *Add a new store*
* Select a *PostGIS* store
* Set the workspace to *opengeo*
* Set the datasource name to *census*
* Set the database to *census*
* Set the user to *postgres*
* Set the password to *postgres*
* Save the store

You'll be taken immediately to the *New Layer* panel (how handy) where you should:

* Click on *Configure new SQL view...*
* Set the view name to *normalized*
* Set the SQL statement to 

  .. code-block:: sql

      WITH stats AS (
        SELECT avg(%column%) AS avg, 
               stddev(%column%) AS stddev 
        FROM census
      )
      SELECT 
        census.fips, 
        counties.geom,
        counties.name || ' County' AS name,
        '%column%'::text AS variable,
        %column%::real AS data,
        (%column% - avg)/stddev AS normalized_data
      FROM stats, 
        census JOIN counties USING (fips)

* Click the *Guess parameters from SQL* link in the "SQL view parameters" section
* Set the default value of the "column" parameter to *pst045212*
* Check the "Guess geometry type and srid" box
* Click the *Refresh* link in the "Attributes" section
* Select the *fips* column as the "Identifier"
* Click *Save*

You'll be taken immediately to the *Edit Layer* panel (how handy) where you should:

* In the *Data* tab

  * Under "Bounding Boxes" click *Compute from data*
  * Under "Bounding Boxes" click *Compute from native bounds*

* In the *Publishing* tab

  * Set the *Default Style* to *stddev*

* In the *Tile Caching* tab

  * *Uncheck* the "Create a cached layer for this layer" entry
  * Hit the *Save* button
 
That's it, the layer is ready!

* Go to the *Layer Preview* section
* For the "opengeo:normalized" layer, click *Go*

.. image:: ./img/preview.png

We can change the column we're viewing by altering the *column* view parameter in the WMS request URL.

* Here is the default column: 
  http://apps.boundlessgeo.com/geoserver/opengeo/wms/reflect?layers=opengeo:normalized
* Here is the **edu685211** column:
  http://apps.boundlessgeo.com/geoserver/opengeo/wms/reflect?layers=opengeo:normalized&viewparams=column:edu685211
* Here is the **rhi425212** column:
  http://apps.boundlessgeo.com/geoserver/opengeo/wms/reflect?layers=opengeo:normalized&viewparams=column:rhi425212

The column names that the census uses are **pretty opaque** aren't they? What we need is a web app that lets us see nice human readable column information, and also lets us change the column we're viewing on the fly.

Building the App
----------------

Preparing the Metadata
~~~~~~~~~~~~~~~~~~~~~~

The first thing we need for our app is a data file that maps the short, meaningless column names in our *census* table to human readable information. Fortunately, the `DataDict.txt`_ file we downloaded earlier has all the information we need. Here's a couple example lines::

   POP010210 Resident population (April 1 - complete count) 2010                                                      ABS    0      308745538          82   308745538  CENSUS
   AGE135212 Resident population under 5 years, percent, 2012                                                         PCT    1            6.4         0.0        13.3  CENSUS

Each line has the column name, a human readable description, and some other metadata about the column. Fortunately the information is all aligned in the text file, so the same field starts at the same text position in each line:

+------------------+----------------+--------+
| Column           | Start Position | Length |
+==================+================+========+
| Name             | 1              | 10     |
+------------------+----------------+--------+
| Description      | 11             | 105    |
+------------------+----------------+--------+
| Units            | 116            | 4      |
+------------------+----------------+--------+
| # Decimal Places | 120            | 7      |
+------------------+----------------+--------+
| Total            | 127            | 12     |
+------------------+----------------+--------+
| Min              | 139            | 12     |
+------------------+----------------+--------+
| Max              | 151            | 12     |
+------------------+----------------+--------+
| Source           | 163            | 8      |
+------------------+----------------+--------+

We're going to consume the first two columns of this information in a JavaScript web application. The text file can easily be read in and split into lines. So with start position and length of Name and Description it will be easy to extract these and to populate a topics dropdown.


Framing the Map
~~~~~~~~~~~~~~~

We already saw our map visualized in a bare `OpenLayers`_ map frame in the *Layer Preview* section of GeoServer. 

We want an application that provides a user interface component that manipulates the source WMS URL, altering the URL `viewparams <http://docs.geoserver.org/stable/en/user/data/database/sqlview.html#using-a-parametric-sql-view>`_ parameter.

We'll build the app using `Bootstrap`_ for a straightforward layout with CSS, and `OpenLayers`_ as the map component.

The base HTML page, `censusmap_basic.html`_, contains script and stylesheet includes bringing in our various libraries. A custom stylesheet gives us a fullscreen map with a legend overlay. Bootstrap css classes are used to style the navigation bar. Containers for the map and a header navigation bar with the aforementioned topics dropdown are also included, and an image element with the legend image from a WMS *GetLegendGraphic* request is put inside the map container.

.. literalinclude:: ../static/code/censusmap_basic.html
   :language: html

The real code is in the `censusmap.js`_ file. We start by creating an `OpenStreetMap`_ base layer, and adding our parameterized census layer on top as an image layer with a `WMS Layer source`_.

.. literalinclude:: ../static/code/censusmap.js
   :language: js
   :start-after: TUTORIAL #1
   :end-before: !TUTORIAL #1

We configure an `OpenLayers Map`_, assign the layers, and give it a map view with a center and zoom level. Now the map will load.

The *select* element with the id *topics* will be our drop-down list of available columns. We load the `DataDict.txt`_ file, and fill the *select* element with its contents. This is done by adding an *option* child for each line.

.. literalinclude:: ../static/code/censusmap.js
   :language: js
   :start-after: TUTORIAL #2
   :end-before: !TUTORIAL #2

Finally, we add an *onchange* event handler for the dropdown, which updates the layer with WMS parameters for the selected variable when a new topic/layer is selected.

.. literalinclude:: ../static/code/censusmap.js
   :language: js
   :start-after: TUTORIAL #3
   :end-before: !TUTORIAL #3

Look at the the `censusmap.js`_ file to see the whole application in one page.

When we open the `censusmap_basic.html`_ file, we see the application in action.

.. image:: ./img/census_hispanic.png 
   :width: 95%


Clickability
~~~~~~~~~~~~

With some additional markup and css plus a few more lines of JavaScript code, we can even handle map clicks: When clicking on the map, we send a WMS GetFeatureInfo request, and display the result in a popup.

Most of the following markup, css and JavaScript code comes directly from the `OpenLayers Popup Example`_. The only difference is that we use ``ol.Map#getFeatureInfo()`` instead of just displaying the clicked coordinates.

First we need some markup for the popup, which we add to our HTML page, inside the map div. With popup added, the map div looks like this:

.. literalinclude:: ../static/code/censusmap.html
   :language: html
   :start-after: TUTORIAL #4
   :end-before: !TUTORIAL #4

To style the popup, we need some additional css in the existing ``<style>`` block on our HTML page:

.. literalinclude:: ../static/code/censusmap.html
   :language: css
   :start-after: TUTORIAL #5
   :end-before: !TUTORIAL #5


Finally, we need some JavaScript to add behaviour to the popup's close button, to create an ``ol.Overlay`` so the popup is anchored to the map, and to trigger a GetFeatureInfo request when the map is clicked:

.. literalinclude:: ../static/code/censusmap.js
   :language: js
   :start-after: TUTORIAL #6
   :end-before: !TUTORIAL #6


Conclusion
----------

We've built an application for browsing 51 different census variables, using less than 51 lines of JavaScript application code, and demonstrating:

* SQL views provide a powerful means of manipulating data on the fly.
* Standard deviations make for attractive visualization breaks.
* Professionally generated color palettes are better than programmer generated ones.
* Simple OpenLayers applications are easy to build.
* Census data can be really, really interesting!
* The application is easy to extend. With 20 more lines of code we can handle clicks and display feature information.





.. _WMS Layer source: http://ol3js.org/en/master/apidoc/ol.source.ImageWMS.html
.. _OpenLayers Map: http://ol3js.org/en/master/apidoc/ol.Map.html
.. _OpenLayers Popup Example: http://ol3js.org/en/master/examples/popup.html
.. _OpenStreetMap: http://openstreetmap.org
.. _Suite installation instructions: http://suite.opengeo.org/opengeo-docs/installation/index.html
.. _OpenLayers: http://ol3js.org
.. _Bootstrap: http://getbootstrap.com
.. _censusmap.js: _static/code/censusmap.js
.. _censusmap.html: _static/code/censusmap.html
.. _censusmap_basic.html: _static/code/censusmap_basic.html
.. _DataDict.txt: _static/data/DataDict.txt
.. _DataSet.txt: _static/data/DataSet.txt
.. _stddev.xml: _static/data/stddev.xml
.. _Create a spatial database: http://suite.opengeo.org/opengeo-docs/dataadmin/pgGettingStarted/createdb.html

