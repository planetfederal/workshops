.. _apps.introduction:

Introducing OpenLayers and GeoExt
=================================

OpenGeo Suite includes some JavaScript libraries for building custom web map applications. These include OpenLayers and GeoExt

OpenLayers
----------

`OpenLayers <http://openlayers.org>`_ is a JavaScript library for building mapping applications in a browser. Mapping applications consist of map layers (raster- or vector-based, integrated from a variety of sources), and controls for operating on those layers.

.. figure:: img/ol_screen_sample.png

Ext JS
------

Ext JS is a JavaScript library offering a range of user interface widgets such as grids, trees, menus, and panels.

.. figure:: img/ext_screen_sample.png

GeoExt
------

GeoExt combines the geospatial controls of OpenLayers with the user interface components of Ext JS into a framework that allows you to build rich desktop-style GIS applications for the browser.

.. figure:: img/geoext_screen_sample.png

Previous examples
-----------------

We've seen both OpenLayers and GeoExt applications in the preceding sections.

* The GeoServer/GeoWebCache layer preview tools are built using OpenLayers
* Our published map application (and GeoExplorer itself) are built with GeoExt

In our evolving diagram of the OpenGeo Suite architecture, applications built using OpenLayers and/or GeoExt sit right at the top consuming layers, with/without GeoWebCache, from our local GeoServer.

.. todo:: Update figure.

.. figure:: ../suite/img/stack_geoext.png

   OpenLayers/GeoExt web-mapping applications in the OpenGeo Suite stack