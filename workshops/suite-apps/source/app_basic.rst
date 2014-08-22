.. _app_basic:

Building the App
****************

Finding the Metadata
--------------------

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
---------------

We already saw our map visualized in a bare `OpenLayers`_ map frame in the *Layer Preview* section of GeoServer. 

We want an application that provides a user interface component that manipulates the source WMS URL, altering the URL `viewparams <http://docs.geoserver.org/stable/en/user/data/database/sqlview.html#using-a-parametric-sql-view>`_ parameter.

We will build a map frame using the `OpenGeo Suite SDK <http://suite.opengeo.org/opengeo-docs/webapps/index.html#webapps>`_ to provide a basic application template.

.. note::

   * OSX, you may need to add ``/usr/local/opengeo/sdk/bin`` to your ``PATH`` environment variable.
   * Windows, TODO
   * Linux, check that the ``suite-sdk`` program is on your ``PATH``

Creating the Template
---------------------
   
There are three templates that come with the Suite SDK:

* ``gxp`` a `ExtJS <http://www.sencha.com/products/extjs/>`_ and OpenLayers 2 viewing template
* ``ol3view`` a `Bootstrap <http://getbootstrap.com>`_ and OpenLayers 3 viewing template
* ``ol3edit`` a Bootstrap and OpenLayers 3 editing template

We will start our application from the OpenLayers 3 viewing template:

.. code-block:: text
   :emphasize-lines: 1

   # suite-sdk create censusapp/ ol3view

   Creating application ...
   Buildfile: /usr/local/opengeo/sdk/build.xml

   checkpath:

   create:
   Created dir: /Users/pramsey/censusapp
   Copying 65 files to /Users/pramsey/censusapp
   Created application: /Users/pramsey/censusapp

   BUILD SUCCESSFUL
   Total time: 0 seconds
        
This creates a `censusapp` directory and fills it with the template contents:

.. code-block:: text
   :emphasize-lines: 2,3

   buildjs.cfg	
   index.html	
   src/app
   src/bootstrap
   src/font-awesome
   src/ol3
   src/bootbox
   src/css
   src/jquery

Tne files we will working with primarily are

* `index.html` which holds the document elements of the page our map will appear in, and
* `src/app/app.js` which holds the custom code for our application.

The rest of the contents of the `src` directory are support files, providing the utility libraries and styles the app template depends on.

Now that the template is created, we can test it by running the SDK in "debug" mode:

.. code-block:: text
   :emphasize-lines: 1

   # suite-sdk debug censusapp/

   Starting debug server for application (use CTRL+C to stop)
   Buildfile: /usr/local/opengeo/sdk/build.xml

   checkpath:

   debug:
   0    [main] INFO  org.eclipse.jetty.server.Server  - jetty-7.6.13.v20130916
   50   [main] INFO  org.eclipse.jetty.server.handler.ContextHandler  - started o.e.j.s.ServletContextHandler{/,null}
   52   [main] WARN  org.eclipse.jetty.server.handler.RequestLogHandler  - !RequestLog
   67   [main] INFO  org.eclipse.jetty.server.AbstractConnector  - Started SelectChannelConnector@0.0.0.0:9080
   68   [main] INFO  ringo.httpserver  - Server on http://localhost:9080 started.  

Now you can open up the template by pointing your web browser at the port where the application debug session is running:

* http://localhost:9080

**TODO** add in a screen shot of the unaltered template here


Working with the Template
-------------------------

The template is close to what we want: it has a base map and an overlay layer. However, we want to change the overlay layer to by our special census data layer, so 

#. Get a text editor you like.
#. Open the `src/app/app.js` file and edit the configuration section, replacing the highlighted lines as follows:

   .. code-block:: text
      :emphasize-lines: 3,4,5,7,9,10,13

       // ========= config section ================================================
       var url = '/geoserver/ows?';
       var featurePrefix = 'opengeo';
       var featureType = 'normalized';
       var featureNS = 'http://opengeo.org';
       var srsName = 'EPSG:900913';
       var geometryName = 'geom';
       var geometryType = 'MultiPolygon';
       var fields = ['fips', 'name', 'data'];
       var layerTitle = 'Census';
       var infoFormat = 'application/vnd.ogc.gml/3.1.1'; // can also be 'text/html'
       var center = [-10764594.758211, 4523072.3184791];
       var zoom = 4;
       // =========================================================================

#. Reload http://localhost:9080 in your web browser, you should see the same template, with the census layer in place of the states layer.





.. _DataDict.txt: _static/data/DataDict.txt
.. _OpenLayers: http://openlayers.org