.. _apps.ol.createmap:

Creating a basic OpenLayers map
===============================

In OpenLayers, a map is a collection of data layers and various controls for dealing with user interaction.

A map is generated on a web page by four components:

#. Loading Libraries
#. Markup
#. Style Declarations
#. Map Initialization Code

.. _suite.openlayers.basics.map.example:

Working Example
---------------

Let's create and preview a simple, fully functional example of an OpenLayers map.

In the next section will go into the details of the code.

.. code-block:: html
   :linenos:

   <html>
     <head>
       <title>OpenLayers Map 1</title>
       <script src="http://openlayers.org/api/OpenLayers.js"></script>
       <link rel="stylesheet" href="openlayers/theme/default/style.css" type="text/css">
       <style>
         #map-id {
           width: 512px;
           height: 256px;
         }
       </style>
     </head>
     <body>
       <h1>OpenLayers Map 1</h1>
       <div id="map-id"></div>
       <script>
         var map = new OpenLayers.Map("map-id");
         var world = new OpenLayers.Layer.WMS(
           "Earth",
           "http://localhost:8080/geoserver/wms",
           {layers: "earthmap"}
         );
         map.addLayer(world);
         map.zoomToMaxExtent();
       </script>
     </body>
   </html>

#. Using a basic text editor. Copy the text above into a new file and save it as :file:`<user>\\.opengeo\\data_dir\\www\\map1.html`.

   .. note:: On Windows, we recommend using `Notepad2 <http://www.flos-freeware.ch/notepad2.html>`_ instead of the standard Windows Notepad. `Notepad++ <http://notepad-plus-plus.org/>`_ is also a viable option.

#. Open the working map in your web browser by navigating to: ``http://localhost:8080/geoserver/www/map1.html``

.. figure:: img/ol_screen_map1.png
   :align: center

   *A basic OpenLayers map*