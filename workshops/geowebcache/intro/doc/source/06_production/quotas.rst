Disk quotas
===========

By default, the number of tiles increases geometrically by zoom level (though custom gridset definitions can have a slower progression), so disk usage quickly become a limiting factor on performance. Consequently, GeoWebCache has a built-in disk quota system to ensure that usage does not exceed a certain limit. Should the space allocated to the cache reach this threshold, existing tiles will be removed to make way for new ones as necessary.

Policies
--------

GeoWebCache can decide which tiles to delete based on two different policies: **Least Frequently Used** (LFU) and **Least Recently Used** (LRU). The choice of which policy to use will depend on specific use cases.

.. figure:: images/quota.png

   Tile caching quota settings
