Glossary
========

.. glossary::
  :sorted:

  gridset
    Defines a spatial reference system, bounding box (extent), a list of zoom levels (resolutions or scale denominators), and tile dimensions.

  gridsubset
    A gridset associated with a layer which has zoom levels and a bounding box that are subsets of the original gridset.

  tile
    An image that can be combined in a grid with other images to form a single map image.

  tile matrix
    A single zoom level defined by a pixel size or scale.
  
  tile matrix set
    A list of zoom levels containing ever increasing amounts of tiles. 

  tile layer
    See "cached layer".

  OGC
    Open Geospatial Consortium.

  WMS
    Web Map Service, a standard developed by the Open Geospatial Consortium (OGC).

  standalone GeoWebCache
    A GeoWebCache instance that is an Java servlet running independently of any GeoServer instance.

  embedded GeoWebCache
    A GeoWebCache instance that runs as an extension to GeoServer.

  seed
    Generate tiles that do not exist in the cache.

  reseed
    Generate tiles that do not exist in the cache and update tiles that already exist in the cache.

  truncate
    Delete tiles that exist in the cache.

  REST
    REpresentional State Transfer, a method of interacting programmatically with a server.

  gutter
    Extra buffer that is rendered around the edge of a tile or metatile.
    
  metatile
    Group of individual tiles that are requested from the WMS server as a single image.

  cached layer
    A GeoServer layer that has been configured to be cached by the embedded GeoWebCache.