Disk usage
==========

Caching is effectively trading disk space for performance. We will be examining some techniques for dealing with a cache that has grown too large, but there are some simple strategies that we can use to prevent it from growing in the first place.

Duplicate caches
----------------

The most important step is reducing the number of gridsets, image formats, and styles that will be cached for each layer. The total number of separate caches that are maintained for each layer is the product of these: 2 gridsets, 3 image formats and 2 styles results in 12 separate caches.

.. note:: GeoWebCache can additionally create caches based on other parameters, which can again increase the total number of caches per layer. These should be used with caution.

PNG format
----------

An additional strategy is only caching vector layers using the PNG8 image format and raster layers using the JPEG format.

PNG8, or 8-bit PNG, has less color depth than regular 24-bit PNGs (256 colors versus 16.7 million) but can result in a considerable savings on disk. In most cases, the color reduction is not noticeable.

For raster layers, JPEG provides adequate compression.

Selective caching
-----------------

Another approach to restricting disk usage is to restrict what the cache will contain, either by geographic area or by zoom level.

A combination of the two selective caching strategies is often key to managing the trade-off between performance and disk usage.

Geographic area
^^^^^^^^^^^^^^^

To limit caching by geographic area, we may use the GeoWebCache seeding interface to generate tiles ina specific bounding box. To create space in the cache, we can also truncate tiles in the unwanted areas.

.. note::

   It is not possible to configure gridsubsets with a restricted bounding box using the GeoServer web interface; this is possible using the standalone GeoWebCache's configuration files, however.

Seeding and truncating tiles may also be scripted by using the GeoWebCache REST API and made part of a periodic job that manages the cache.

Zoom levels
^^^^^^^^^^^

As we have seen in an earlier section, gridsubsets may be configured to only cache tiles between specific zoom levels. This is a common strategy to manage disk usage.

Typically, smaller scales will be cached since there will be fewer of these tiles and generally these will take longer to render (although proper styling strategies can affect this). 
