GeoServer WMS
=============

.. warning::

   This section will describe GeoServer's own metatiling functionality since it can sometimes cause confusion with WMS-C requests. The metatiling described here is entirely unrelated to GeoWebCache's metatiling.

As we have seen, when direct WMS integration is enabled, GeoServer will pass regular WMS requests to GeoWebCache if the ``TILED`` parameter is set to ``true``. However, GeoServer also has the facility to handle tiled requests separately from GeoWebCache.

GeoServer metatiling
--------------------

When GeoWebCache's integrated mode is disabled, GeoServer understands the ``TILED=true`` parameter to mean that there will be a number of requests for neighbouring tiles in the near future. GeoServer will therefore create a 3×3 metatile and briefly cache the set of 9 tiles in memory so that it can rapidly serve requests for additional nearby tiles.

In addition to ``TILED=true``, GeoServer also requires that the image size be 256×256 pixels and that the ``TILESORIGIN`` parameter be set to an arbitrary origin that a metatile position can be calculated against. If either of the preceding conditions are not met, then internal metatiling will not be used.

.. note::

   The origin point used is not important so long as it is consistent across requests received by GeoServer.

The advantage of GeoServer's internal metatiling are similar to those of GeoWebCache. First, cross-tile labels and symbols are possible. In addition, response times are faster since only a single image will be generated for every nine (3×3) requests, and the memory-cached tiles can be returned multiple times if requested within a short period before they expire.

GeoServer logs
^^^^^^^^^^^^^^

The GeoServer log file can confirm when the internal metatiler is handling tiled requests::

    DEBUG [org.geoserver.wms] - Tiled request detected, activating on the fly meta tiler
    DEBUG [org.geoserver.wms] - setting up map
    DEBUG [org.geoserver.wms.map] - Looked for meta tile 0, -6in cache: miss
    DEBUG [org.geoserver.wms.map] - Building meta tile 0, -6 of size w=768, h=768 with metatilign factor 3
    DEBUG [org.geoserver.wms.map] - setting up 768x768 image
    DEBUG [org.geoserver.wms.map] - Metatile type 2
    DEBUG [org.geoserver.wms.map] - Metatile split on BufferedImage
