.. _mapping:

Drawing a Map
*************

Our challenge now is to set up a rendering system that can easily render any of our 51 columns of census data as a map.

We could define **51 layers in GeoServer**, and set up 51 separate styles to provide attractive renderings of each variable. But that would be a lot of work, and we're **much too lazy** to do that. What we want is a **single layer** that can be re-used to render any column of interest. 

One Layer to Rule them All
--------------------------

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
--------------------------

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

.. code-block:: xml

   <?xml version="1.0" encoding="ISO-8859-1"?>
   <StyledLayerDescriptor version="1.0.0"
     xmlns="http://www.opengis.net/sld" 
     xmlns:ogc="http://www.opengis.net/ogc"
     xmlns:xlink="http://www.w3.org/1999/xlink" 
     xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
     xmlns:gml="http://www.opengis.net/gml"
     xsi:schemaLocation="http://www.opengis.net/sld 
     http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd">
     
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
                   <!-- CssParameters allowed are fill and fill-opacity -->
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
                 <!-- CssParameters allowed are fill and fill-opacity -->
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
                 <!-- CssParameters allowed are fill and fill-opacity -->
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
                 <!-- CssParameters allowed are fill and fill-opacity -->
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
                 <!-- CssParameters allowed are fill and fill-opacity -->
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
                   <!-- CssParameters allowed are fill and fill-opacity -->
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
------------------~

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



.. _stddev.xml: _static/data/stddev.xml
