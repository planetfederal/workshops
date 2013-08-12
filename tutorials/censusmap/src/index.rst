
.. note:: 

  Check out the `full demonstration application <_static/code/censusmap-simple.html>`_ and play!


Introduction
------------

Every ten years, the `US census <http://www.census.gov/2010census/>`_ collects a staggering array of information about the population, collates it, and then releases it in raw form. It is a truly majestic compendium of data, but browsing it can be hard: 

* there are so many scales of data, and so many potential columns to view, it's hard to build a general purpose mapping app that isn't hopelessly complicated; and,
* the data itself is so voluminous and complicated that building your own app can seem impossible.

This tutorial builds a very simple application that uses a single thematic style to visualize several dozen census variables collated to the county level.

.. image:: ./img/census_hispanic.png 
   :width: 95%

For this adventure in map building, we use the following tools, which if you are following along you will want to install now:

* OpenGeo Suite (available for Linux, Mac OSX and Windows, follow the `Suite installation instructions`_)
* Perl (installed by default on Linux, MacOSX, use `ActivePerl`_ for Windows)

The basic structure of the application will be

* A spatial table of counties in PostGIS, that will join with
* An attribute table with many census variables of interest, themed by
* A thematic style in GeoServer, browsed with
* A simple pane-based application in GeoExt, allowing the user to choose the census variable of interest.

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

* Download `UScounties.zip <http://forums.arcgis.com/attachment.php?attachmentid=5489&d=1300810899>`_

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

We could define **51 layers in GeoServer**, and set up 51 separate styles to provide attractive renderings of each variable. But that would be a lot of work, and we're ***much too lazy** to do that. What we want is a **single layer** that can be re-used to render any column of interest. 

One Layer to Rule them All
~~~~~~~~~~~~~~~~~~~~~~~~~~

Using a `parametric SQL view <http://docs.geoserver.org/stable/en/user/data/database/sqlview.html#using-a-parametric-sql-view>`_ we can define a SQL-based layer definition that allows us to change the column of interest by substituting a variable when making a WMS map rendering call.

For example, this SQL definition will allow us to substitute any column we want into the map rendering chain:

.. code-block:: sql

   SELECT 
     census.fips, 
     couties.geom,
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
     couties.geom,
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

.. code-block:: xml

   <?xml version="1.0" encoding="ISO-8859-1"?>
   <StyledLayerDescriptor version="1.0.0"
     xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc"
     xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
     xmlns:gml="http://www.opengis.net/gml"
     xsi:schemaLocation="http://www.opengis.net/sld http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd">
     <NamedLayer>
       <Name>opengeo:stddev</Name>
       <UserStyle>

         <Name>Standard Deviation Ranges</Name>

         <FeatureTypeStyle>

           <Rule>
             <Name>StdDev &lt; -1.0</Name>
             <ogc:Filter>
               <ogc:PropertyIsLessThan>
                 <ogc:PropertyName>normalized_data</ogc:PropertyName>
                 <ogc:Literal>-1.0</ogc:Literal>
               </ogc:PropertyIsLessThan>
             </ogc:Filter>
             <PolygonSymbolizer>
                <Fill>
                   <!-- CssParameters allowed are fill (the color) and fill-opacity -->
                   <CssParameter name="fill">#c51b7d</CssParameter>
                </Fill>
             </PolygonSymbolizer>
           </Rule>

           <Rule>
             <Name>-1.0 &lt; StdDev &lt; -0.5</Name>
             <ogc:Filter>
               <ogc:PropertyIsBetween>
                 <ogc:PropertyName>normalized_data</ogc:PropertyName>
                 <ogc:LowerBoundary>
                   <ogc:Literal>-1.0</ogc:Literal>
                 </ogc:LowerBoundary>
                 <ogc:UpperBoundary>
                   <ogc:Literal>-0.5</ogc:Literal>
                 </ogc:UpperBoundary>
               </ogc:PropertyIsBetween>
             </ogc:Filter>
             <PolygonSymbolizer>
               <Fill>
                 <!-- CssParameters allowed are fill (the color) and fill-opacity -->
                 <CssParameter name="fill">#e9a3c9</CssParameter>
               </Fill>
             </PolygonSymbolizer>
           </Rule>

           <Rule>
             <Name>-0.5 &lt; StdDev &lt; 0.0</Name>
             <ogc:Filter>
               <ogc:PropertyIsBetween>
                 <ogc:PropertyName>normalized_data</ogc:PropertyName>
                 <ogc:LowerBoundary>
                   <ogc:Literal>-0.5</ogc:Literal>
                 </ogc:LowerBoundary>
                 <ogc:UpperBoundary>
                   <ogc:Literal>0.0</ogc:Literal>
                 </ogc:UpperBoundary>
               </ogc:PropertyIsBetween>
             </ogc:Filter>
             <PolygonSymbolizer>
               <Fill>
                 <!-- CssParameters allowed are fill (the color) and fill-opacity -->
                 <CssParameter name="fill">#fde0ef</CssParameter>
               </Fill>
             </PolygonSymbolizer>
           </Rule>

           <Rule>
             <Name>0.0 &lt; StdDev &lt; 0.5</Name>
             <ogc:Filter>
               <ogc:PropertyIsBetween>
                 <ogc:PropertyName>normalized_data</ogc:PropertyName>
                 <ogc:LowerBoundary>
                   <ogc:Literal>0.0</ogc:Literal>
                 </ogc:LowerBoundary>
                 <ogc:UpperBoundary>
                   <ogc:Literal>0.5</ogc:Literal>
                 </ogc:UpperBoundary>
               </ogc:PropertyIsBetween>
             </ogc:Filter>
             <PolygonSymbolizer>
               <Fill>
                 <!-- CssParameters allowed are fill (the color) and fill-opacity -->
                 <CssParameter name="fill">#e6f5d0</CssParameter>
               </Fill>
             </PolygonSymbolizer>
           </Rule>

           <Rule>
             <Name>0.5 &lt; StdDev &lt; 1.0</Name>
             <ogc:Filter>
               <ogc:PropertyIsBetween>
                 <ogc:PropertyName>normalized_data</ogc:PropertyName>
                 <ogc:LowerBoundary>
                   <ogc:Literal>0.5</ogc:Literal>
                 </ogc:LowerBoundary>
                 <ogc:UpperBoundary>
                   <ogc:Literal>1.0</ogc:Literal>
                 </ogc:UpperBoundary>
               </ogc:PropertyIsBetween>
             </ogc:Filter>
             <PolygonSymbolizer>
               <Fill>
                 <!-- CssParameters allowed are fill (the color) and fill-opacity -->
                 <CssParameter name="fill">#a1d76a</CssParameter>
               </Fill>
             </PolygonSymbolizer>
           </Rule>

           <Rule>
             <Name>1.0 &lt; StdDev</Name>
             <ogc:Filter>
               <ogc:PropertyIsGreaterThan>
                 <ogc:PropertyName>normalized_data</ogc:PropertyName>
                 <ogc:Literal>1.0</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
             </ogc:Filter>
             <PolygonSymbolizer>
                <Fill>
                   <!-- CssParameters allowed are fill (the color) and fill-opacity -->
                   <CssParameter name="fill">#4d9221</CssParameter>
                </Fill>
             </PolygonSymbolizer>
           </Rule>

        </FeatureTypeStyle>
       </UserStyle>
     </NamedLayer>
   </StyledLayerDescriptor>

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
  http://apps.opengeo.org/geoserver/opengeo/wms/reflect?layers=opengeo:normalized
* Here is the **edu685211** column:
  http://apps.opengeo.org/geoserver/opengeo/wms/reflect?layers=opengeo:normalized&viewparams=column:edu685211
* Here is the **rhi425212** column:
  http://apps.opengeo.org/geoserver/opengeo/wms/reflect?layers=opengeo:normalized&viewparams=column:rhi425212

The column names that the census uses are **pretty opaque** aren't they? What we need is a web app that lets us see nice human readable column information, and also lets us change the column we're viewing on the fly.

Building the App
----------------

Preparing the Metadata
~~~~~~~~~~~~~~~~~~~~~~

The first thing we need for our app is a data file that maps the short, meaningless column names in our `census` table to human readable information. Fortunately, the `DataDict.txt`_ file we downloaded earlier has all the information we need. Here's a couple example lines::

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

We're going to consume this information in a JavaScript web application, so we want to turn the text file into a JSON file. Here's a little `perl <http://perl.org>`_ script that does that:

.. code-block:: perl

   @cols = (1, 11, 116, 120, 127, 139, 151, 163);
   @lens = (10, 105, 4, 7, 12, 12, 12, 8);
   @names = ("name", "desc", "unit", "dec", "total", "min", "max", "source");

   $lineno = 0;

   # json list start
   print "[";

   while(<>) {

     # increment line number
     $lineno++;

     # skip first two lines
     next if $lineno <= 2;

     # comma between each dictionary
     print ",\n" if $lineno > 3;

     # json dictionary start
     print "{\n";
     # read each field
     for ( $i = 0; $i < 8; $i++ ) {
       # clip out the field
       $val = substr($_, $cols[$i]-1, $lens[$i]);
       # strip white space from ends
       $val =~ s/^\s*//g;
       $val =~ s/\s*$//g;
       # print out json dictionary entry
       print ",\n" if $i;
       printf '"%s":"%s"', $names[$i], $val;
     }
     # json dictionary end
     print "\n}";
   }

   # json list end
   print "]\n";

Running the script on the `DataDict.txt`_ file creates a JSON data file that we'll call `DataDict.json`_ .


Framing the Map
~~~~~~~~~~~~~~~

We already saw our map visualized in a bare `OpenLayers`_ map frame in the *Layer Preview* section of GeoServer. 

We want an application that provides a user interface component that manipulates the source WMS URL, altering the URL `viewparams <http://docs.geoserver.org/stable/en/user/data/database/sqlview.html#using-a-parametric-sql-view>`_ parameter.

We'll build the app using the `ExtJS`_ for the basic widgets, `GeoExt`_ to integrate the map into the widget library, and `OpenLayers`_ as the map component.

The base HTML page, `censusmap-simple.html`_, just contains script includes bringing in our various javascript libraries:

.. code-block:: html

   <html>
     <head>
       <title>OpenGeo Census Map</title>

       <!-- ExtJS Scripts and Styles -->
       <script type="text/javascript" src="http://cdn.sencha.com/ext/gpl/3.4.1.1/adapter/ext/ext-base.js"></script>
       <script type="text/javascript" src="http://cdn.sencha.com/ext/gpl/3.4.1.1/ext-all.js"></script>
       <link rel="stylesheet" type="text/css" 
             href="http://cdn.sencha.com/ext/gpl/3.4.1.1/resources/css/ext-all.css" />
       <link rel="stylesheet" type="text/css" 
             href="http://cdn.sencha.com/ext/gpl/3.4.1.1/examples/shared/examples.css" />
       <link rel="stylesheet" id="opengeo-theme" 
             href="resources/css/xtheme-opengeo.css" />
       <!-- OpenLayers Script -->
    
       <script src="http://www.openlayers.org/api/2.12/OpenLayers.js"></script>

       <!-- GeoExt Script -->
       <script type="text/javascript" src="http://api.geoext.org/1.1/script/GeoExt.js"></script>

       <!-- Our Application -->
       <script type="text/javascript" src="censusmap-simple.js"></script>

     </head>
     <body>
     </body>
   </html>

The real code is in the `censusmap-simple.js`_ file. We start by creating an `OpenStreetMap`_ base layer, and adding our parameterized census layer on top as a WMS layer.

.. code-block:: javascript

   // Base map
   var osmLayer = new OpenLayers.Layer.OSM();

   // Census map layer
   var wmsLayer = new OpenLayers.Layer.WMS("WMS", 
     "http://localhost:8080/geoserver/wms", 
     {
       format: "image/png8",
       transparent: true,
       layers: "opengeo:normalized"
     }, {
       opacity: 0.6,
     }
   );

   // Map with projection into (required when mixing base map with WMS)
   olMap = new OpenLayers.Map({
     projection: "EPSG:900913",
     units: "m",
     layers: [wmsLayer, osmLayer]
   });

Next we read the `DataDict.json`_ file into an `Ext.data.JsonStore` and build a `Ext.form.ComboBox` around that store.

.. code-block:: javascript

   var columnInfo = new Ext.data.JsonStore({
     url: "DataDict.json",
     fields: ["name", "desc", "unit", "dec", "total", "min", "max", "source"]
   });
   // Read the JSON file
   columnInfo.load();

   var censusField = new Ext.form.ComboBox({
     store: columnInfo,
     displayField: "desc",
     mode: "local",
     width: 400,
     triggerAction: "all",
     emptyText:"Choose a column...",
     listeners: {
       select: function(combo, rec, idx) {
         var vp = { viewparams: "column:"+rec.get("name") };
         wmsLayer.mergeNewParams(vp);
       }
     } 
   });

The combo box will be our drop-down list of available columns. When it is selected (via the "select" event) it will merge the new column name into the WMS layer parameters.

Now we wrap the map and drop-down into an application frame.

.. code-block:: javascript

   // Viewport wraps map panel in full-screen handler
   var viewPort = new Ext.Viewport({
      layout: "fit",
      items: [{
         xtype: "gx_mappanel",
         ref: "mappanel",
         title: "Census Variables by County",
         tbar: [
            "Select a column to map: ", 
            censusField, 
            "->", 
            "Below Average",
            {
              xtype: "box",
              html: "<img src='colors.png'/>"
            },
            "Above Average"],
         map: olMap
      }]
   });

* The `Ext.Viewport` fills the whole browser window
* The `gx_mappanel` fills the whole viewport
* The toolbar contains the drop down, and a very small legend in the form of a color bar

Finally, we center the map and activate the application.

.. code-block:: javascript

   olMap.setCenter([-10764594.0, 4523072.0],5);

   // Fire off the ExtJS 
   Ext.onReady(function () {
     viewPort.show();
   });

Look at the the `censusmap-simple.js`_ file to see the whole application in one page.

When we open the `censusmap-simple.html`_ file, we see the application in action.

.. image:: ./img/census_hispanic.png 
   :width: 95%

Conclusion
----------

We've built an application for browsing 51 different census variables, using scarcely more than 51 lines of code, and demonstrating:

* SQL views provide a powerful means of manipulating data on the fly
* Standard deviations make for attractive visualization breaks
* Professionally generated color palettes are better than programmer generated ones
* Simple GeoExt applications are easy to build
* Census data can be really, really interesting! 





.. _GeoExt: http://www.geoext.org/
.. _ExtJS: http://www.sencha.com/products/extjs
.. _OpenLayers WMS Layer: http://dev.openlayers.org/docs/files/OpenLayers/Layer/WMS-js.html
.. _OpenLayers Map: http://dev.openlayers.org/docs/files/OpenLayers/Map-js.html
.. _OpenStreetMap: http://openstreetmap.org
.. _Suite installation instructions: http://suite.opengeo.org/opengeo-docs/installation/index.html
.. _OpenLayers: http://openlayers.org
.. _censusmap-simple.js: _static/code/censusmap-simple.js
.. _censusmap-simple.html: _static/code/censusmap-simple.html
.. _DataDict.json: _static/code/DataDict.json
.. _DataDict.txt: _static/code/DataDict.txt
.. _DataSet.txt: _static/code/DataSet.txt
.. _stddev.xml: _static/code/stddev.xml
.. _Create a spatial database: http://suite.opengeo.org/opengeo-docs/dataadmin/pgGettingStarted/createdb.html
.. _ActivePerl: http://www.activestate.com/activeperl


