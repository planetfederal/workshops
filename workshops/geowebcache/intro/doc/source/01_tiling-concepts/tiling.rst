Tile caching
============

Tiling works by splitting an image into smaller, regular-sized tiles and then having the client request these rather than the single composite image. These individual tiles are then combined on the client side to create the single larger image for display purposes. 

The following images show the previous two image requests broken into tiles. All 12 tiles surrounded by the red box are identical in each case and would not need to be rendered a second time if we have a properly-configured GeoWebCache available. 

.. figure:: images/world-borders_01_grid.png

   Bounding box: 0,0,60,60

.. figure:: images/world-borders_02_grid.png

   Bounding box: 10,0,70,60

.. note:: While tiling is useful for server-side caching, it can also benefit client-side caches (such as those in web browsers) which can cache the remote tiles in local storage and eliminate the need for a network request altogether.
