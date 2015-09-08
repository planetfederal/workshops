Zoom levels
===========

Map tiles are not just cached at a single resolution, but instead at more than one scale so that users can zoom in and out of tile levels without the need for image resampling.

.. figure:: images/tiling-zoom-levels.png
   
   Tiles and zoom levels
   
By default, **each zoom level increase has four times as many tiles as the previous zoom level**, although this is configurable. So if the top zoom level contains two tiles (as in a standard Mercator projection), the next zoom level would contain eight tiles, followed by 32 tiles, and so on. 
