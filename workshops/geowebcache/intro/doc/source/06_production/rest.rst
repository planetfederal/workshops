REST API
========

Like GeoServer, GeoWebCache has a :term:`REST` API that can be used to retrieve information a GeoWebCache instance as well as programmatically manipulate a GeoWebCache instance without using the web interface.

The REST endpoint for the embedded GeoWebCache is ``http://localhost:8080/geoserver/gwc/rest``.

.. note:: The `GeoWebCache documentation <http://geowebcache.org/docs/current/rest>`_ has a comprehensive section on using the REST API.

.. note:: We will again be using cURL to make requests. REST requests, however, require authentication on the server, so we will be adding the additional parameter ``-u admin:geoserver``, where ``admin`` is the user name and ``geoserver`` is the password. Should your user name and password be different, please substitute them in the requests below

List of cached layers
---------------------

A list of all cached layers may be retrieved in XML format by retrieving the following document: ``http://localhost:8080/geoserver/gwc/rest/layers.xml``:

.. code-block:: bash

   $ curl -u admin:geoserver "http://localhost:8080/geoserver/gwc/rest/layers.xml"

.. code-block:: xml

   <layers>
     <layer>
       <name>ne:states_provinces_shp</name>
       <atom:link xmlns:atom="http://www.w3.org/2005/Atom" rel="alternate" href="http://localhost:8080/geoserver/gwc/rest/layers/ne%3Astates_provinces_shp.xml" type="text/xml"/>
     </layer>
     <layer>
       <name>ne:populated_places</name>
       <atom:link xmlns:atom="http://www.w3.org/2005/Atom" rel="alternate" href="http://localhost:8080/geoserver/gwc/rest/layers/ne%3Apopulated_places.xml" type="text/xml"/>
   </layer>
   ...

Cached layer details
--------------------

Using the URLs provided in the :file:`layers.xml` document, detailed information may be retrieved for each layer:

.. code-block:: bash

   $ curl -u admin:geoserver "http://localhost:8080/geoserver/gwc/rest/layers/opengeo%3Acountries.xml"

.. code-block:: xml

  <GeoServerLayer>
    <id>LayerInfoImpl--3a33e7d0:1400d3d823c:-7fdf</id>
    <enabled>true</enabled>
    <name>opengeo:countries</name>
    <mimeFormats>
      <string>image/png</string>
      <string>image/jpeg</string>
    </mimeFormats>
    <gridSubsets>
      <gridSubset>
        <gridSetName>EPSG:900913</gridSetName>
        <extent>
          <coords>
            <double>-2.003750834E7</double>
            <double>-2.003750834E7</double>
            <double>2.003750834E7</double>
            <double>1.8394384316255733E7</double>
          </coords>
        </extent>
      </gridSubset>
      <gridSubset>
        <gridSetName>EPSG:4326</gridSetName>
        <extent>
          <coords>
            <double>-180.0</double>
            <double>-89.99892578124998</double>
            <double>180.0</double>
            <double>83.59960937500006</double>
          </coords>
        </extent>
        <minCachedLevel>2</minCachedLevel>
        <maxCachedLevel>5</maxCachedLevel>
      </gridSubset>
    </gridSubsets>
    <metaWidthHeight>
      <int>4</int>
      <int>4</int>
    </metaWidthHeight>
    <parameterFilters/>
    <gutter>0</gutter>
  </GeoServerLayer>

.. admonition:: Exercise

   #. Use your web browser to look at a layer configuration using the ``http://localhost:8080/geoserver/gwc/rest/layers.xml`` endpoint.

      .. figure:: images/rest_layers.png

         REST response for a list of GeoWebCache layers

.. admonition:: Explore

   Execute ``curl -u admin:geoserver "http://localhost:8080/geoserver/gwc/rest/layers.xml"`` to see your locally-configured cached layers.
