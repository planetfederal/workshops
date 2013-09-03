.. _geowebcache.publishing:

Caching On-Demand
=================

GeoWebCache is integrated into GeoServer and activated by default. This means that just by using GeoServer, requesting map tiles through WMS, those tiles are stored via the integrated GeoWebCache and are available for future requests.

In the GeoServer web admin, if you click :guilabel:`Caching Defaults` under :guilabel:`Tile Caching`, you will see the entries for global caching.

For the purposes of this exercise, uncheck the four :guilabel:`Provided Services` (WMS, WMS-C, TMS, WMTS). This will turn off automatic caching and allow us to see the difference in performance between cached map tiles and uncached map tiles.

.. figure:: img/gscaching.png

   Integrated caching settings in GeoServer

In this section we'll configure a GeoExplorer map to use cached images from GeoWebCache over top of our local WMS, and then compare cached delivery times with full WMS requests.

Adding a GWC Server
-------------------

To publish a cached map, let's return to GeoExplorer. 

#. Make sure you're logged in and working with a :guilabel:`new` map

#. Click the :guilabel:`Add Layers` button in the layers window pane. 

#. In the :guilabel:`Available Layers` panel, click the :guilabel:`Add a New Server` button.

    .. figure:: img/gwc_publish-01.png

       Adding a new WMS server

#. In the :guilabel:`URL` field, enter the URL of our cached layers::

    http://localhost:8080/geoserver/gwc/service/wms

#. Click :guilabel:`Add Server`, to connect to the GeoWebCache server.

    .. figure:: img/gwc_publish-02.png

       Our WMS server endpoint

#. A familiar list of layers will display. The layers in GeoWebCache are the configured GeoServer layers currently being served by GeoServer. This list of layers is identical to both the GeoWebCache configuration page and the GeoServer WMS layer list.

#. Highlight the layers we added previously from the pure WMS, click :guilabel:`Add Layers` and then :guilabel:`Done`.

    .. figure:: img/gwc_publish-03.png

       Our layers in the GeoExplorer Available Layers dialog

#. Right-click on the :guilabel:`earthgroup`, and select :guilabel:`Zoom to Layer Extent`.

    .. figure:: img/gwc_publish-04.png

       Layer context menu
    
#. You should see a happy map of the world. 
    
    .. figure:: img/gwc_publish-05.png

       Map with layers added
        
#. Click the :guilabel:`Export Map` icon.

#. Select your toolbar items, and then click :guilabel:`Next` to view HTML block used to embed your map in a web page.

    .. figure:: img/gwc_publish-06.png

       Export map dialog

#. Copy the ``<iframe>`` HTML. We will be pasting this text (or something very similar) into our **GNN** page: 

    .. code-block:: html

       <iframe
          style="border: none;" height="400" width="600"
          src="http://localhost:8080/geoexplorer/viewer#maps/2">
       </iframe>
       
#. Return to your text editor and scroll down to about line 32. **Above** the previous ``iframe`` paste the latest HTML code. You should now have two maps in your GNN page: the first served by GeoWebCache, the second served by GeoServer.

    .. figure:: img/gwc_publish-07.png

       HTML source code with two <iframes>

#. Save your **GNN** page and refresh your browser. 

    .. figure:: img/gwc_publish-08.png

       A happier web page

#. Get your two maps to roughly the same extent. Zoom and pan the first map, and then zoom and pan the second map. You might notice a rendering delay the first time you request a new area on the map that uses caching, but that delay won't happen if you return to the same area. That is not the case with the original map, where rendering times remain consistently slower.
   
   .. figure:: img/gwc_publish-09.png
   
      Two maps, but only one is accelerated

