.. _geoserver.webmap:

Web map output
--------------

Publishing data and maps in GeoServer is just one part of the finished product. You may also want to create a web map application, one that consumes that content and possibly allows for interactivity.

For our final exercise, we will show embedding web maps in a web page. 

.. note:: Embedding web maps is a workshop unto itself. This section is just designed to show you a little bit of what's possible. For more information, we recommend learning more about `OpenLayers <http://openlayers.org>`_.

We have created a web map that is connected to our finished layer group. 

#. In the workshop :file:`html` directory, open :file:`map.html` in a browser.

   .. warning:: This requires that the layer group in question is named ``earth:earthmap``.

   .. figure:: img/map.png

      GeoServer output in an HTML file

   There isn't much interactivity possible here, but this HTML page is standalone, meaning that all it requires is that it be placed on a web server, with an open connection to the GeoServer WMS.

   .. note:: Technically, this map requires that GeoServer be on the same server, as it uses a relative link to connect. But once GeoServer is on a public URL or IP address, it's not difficult to have the app point there too.

#. Open the developer tools of your browser (often accessed by pressing :kbd:`F12`) and click the :guilabel:`Network` tab. Reload the page and note how the network requests are all WMS requests to GeoServer.

   .. figure:: img/devtools.png

      Browser developer tools showing WMS requests

   .. note:: The ``ows`` endpoint is a generic name for all the OGC web services. It stands for "Open Web Service".

#. This map can be embedded in any web page. To see an overly simple example, In the workshop :file:`html` directory, open :file:`app.html` in a browser.

   .. note:: This example embeds the HTML in an `iframe <http://www.w3schools.com/tags/tag_iframe.asp>`_, but there are other ways of embedding a web map with OpenLayers.

   .. figure:: img/app.png

      Embedded web map
