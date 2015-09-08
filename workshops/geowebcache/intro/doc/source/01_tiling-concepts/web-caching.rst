Web caching
===========

In many ways, GeoWebCache performs much the same task as regular "reverse web caches" in that it intercepts requests and returns a cached copy of a requested document whenever possible. 

.. note::

   A reverse proxy sits between the server and the internet handling incoming requests. A forward proxy sits between the client (or a LAN) and the internet, proxying the requests to the outside world.

Examples of popular open-source web caches include `Squid <http://www.squid-cache.org/>`_, `Nginx <http://nginx.org/>`_, and `Varnish <https://www.varnish-cache.org/>`_, all of which determine whether a cached copy can be returned based on the URL of a request. When the URL matches the URL of a previous request, the software knows that it can respond with the cached copy without bothering the web server.

.. only:: instructor

   .. admonition:: Instructor Notes
   
      Nginx is pronounced "engine-x".
 
Limitations of standard web caching
-----------------------------------

The strategy of comparing the requested URL to the URL of previous requests is often not suitable for handling WMS requests. For example, if we compare the following two requests, which differ only by their ``BBOX`` parameter, a generic web cache would consider them unique and no caching could occur::

  http://suite.opengeo.org/geoserver/wms?
    LAYERS=opengeo:countries&
    FORMAT=image/png&
    SERVICE=WMS&
    VERSION=1.1.1&
    REQUEST=GetMap&
    SRS=EPSG:4326&
    WIDTH=256&
    HEIGHT=256&
    BBOX=0,0,60,60

.. figure:: images/world-borders_01.png

   Bounding box: 0,0,60,60

::

  http://suite.opengeo.org/geoserver/wms?
    LAYERS=opengeo:countries&
    FORMAT=image/png&
    SERVICE=WMS&
    VERSION=1.1.1&
    REQUEST=GetMap&
    SRS=EPSG:4326&
    WIDTH=256&
    HEIGHT=256&
    BBOX=10,0,70,60

.. figure:: images/world-borders_02.png

   Bounding box: 10,0,70,60

Benefits of map-specific web caching
------------------------------------

The strategy that underlies GeoWebCache is the realization that while the two images are indeed different, there is considerable overlap in the content between the two maps. By breaking the single image into a number of smaller :term:`tiles <tile>`, GeoWebCache can efficiently cache this image content. These tiles can then be stitched together and used in many different WMS requests.

For caching to work, clients must make specially-crafted requests to ensure that GeoWebCache will respond with cached content. In the diagram below, we refer to these as *map tiles*.

.. figure:: images/cache_workflow.png

   GeoWebCache workflow for handling requests
