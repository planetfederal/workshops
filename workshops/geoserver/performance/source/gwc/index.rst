.. gwc:

***********
GeoWebCache
***********

From a performance perspective GeoWebCache is making use of Tile Server protocols allowing a map to be served up as small tiles which clients can request in a consistent fashion.

These protocols have different performance concerns:

* Tile servers break the direct relationship between GeoServer and clients, trading disk storage for speed
* Tile servers takes advantage of the HTTP protocol to allow tiles to hosted downstream (on content delivery networks, caching proxies or even directly in the browser cache).

We are still interested in the rendering and encoding performance of GeoServer as these factors control how much computing resources are required to support a Tile Server.

.. note::
   
   GeoWebCache is the subject of a seperate workshop.