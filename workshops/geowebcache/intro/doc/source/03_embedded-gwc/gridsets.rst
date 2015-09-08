Gridsets
========

GeoServer's embedded gridset editor allows for the easy creation of gridsets that can be used for any layer in the catalog.

Default gridsets
----------------

By default, GeoServer comes with five internally-defined gridsets:

* ``EPSG:4326``
* ``EPSG:900913``
* ``GlobalCRS84Pixel``
* ``GlobalCRS84Scale``
* ``GoogleCRS84Quad``

.. only:: instructor

   .. admonition:: Instructor Notes

      TODO: Describe these

Of these, only ``EPSG:4326`` and ``EPSG:900913`` are set to be added automatically to new layers.

The internally-defined gridsets may not be modified, but they may be copied so that new gridsets can be based off of them.

Tile matrix set
---------------

As we have seen previously, there are several defining characteristics of a gridset. Most complex is the :guilabel:`Tile Matrix Set` section, where the tile grids will be defined in terms of zoom levels measured in either resolution or scale denominators.

GeoServer automatically calculates the number of tiles required for each zoom level.

Regarding zoom level calculation, the relationship between pixel size and zoom level is based on a number of factors, but the simplest calculation is the width of the gridset bounds divided by the pixel size.

.. admonition:: Exercise

   We will now look at the relationship between pixel size and the number of tiles required to cover the gridset bounds.

   #. Click the :guilabel:`Gridsets` menu item.
  
   #. Open ``EPSG:4326`` gridset.
  
   #. Note the width of the gridset is 360 degrees. You can tell this because the units are in degrees, and the X values run from -180 to 180.

      .. figure:: images/gridsets_4326.png

         EPSG:4326 gridset definition
  
   #. Divide ``360`` by ``0.703125`` (the pixel size). The result is ``512``, meaning that two tiles of 256 pixels in width are needed to cover the entire gridset.
  
      .. note:: ``EPSG:4326`` can not be edited since it is one of the internally-defined gridsets.

   We can also create a new gridset to show how changing the pixel size will change the number of tiles required to cover the gridset bounds.

   #. Click the :guilabel:`Gridsets` menu item.
  
   #. Click :guilabel:`Create a copy` for the EPSG:4326 gridset. A new gridset configuration page will open with the name **My_EPSG:4326**.
  
   #. Change the level ``0`` pixel size from ``0.703125`` to ``1.40625``. The number of tiles required at zoom level ``0`` will change to ``1×1``.

      .. figure:: images/gridsets_my4326.png

         My_EPSG:4326 gridset definition
  
   #. Click :guilabel:`Save` to save this gridset for later use.
  
   .. note::
 
      Two gridsets can contain identical zoom levels such that a single request could be satisfied by more than one gridsest. In our new gridset, only the first zoom level differs from the original.
  
   We can now make the new gridset a default for all newly-created layers.

   #. Click :guilabel:`Caching Defaults`.
  
   #. Choose **My_EPSG:4326** in the :guilabel:`Add default gridset` box and click the green plus icon.
  
      .. figure:: images/my_epsg_4326.png
       
         Default gridsets with **My_EPSG:4326**
  
   #. Click :guilabel:`Submit`.

.. admonition:: Exercise

   Now we will create a new gridset from scratch and add it as a default gridset.

   #. Click the :guilabel:`Gridsets` menu item.
  
   #. Click :guilabel:`Create a new gridset`. 

      .. figure:: images/gridsets_createnew.png

         Creating a new gridset
  
   #. Set the name to :kbd:`EPSG:4326_western_hemisphere`.
  
   #. Set the :guilabel:`Coordinate Reference System` to :kbd:`EPSG:4326`.
  
   #. Set the gridset bounds to ``-180``, ``-90``, ``0`` and ``90``. The size of the bounds is now 180×180 degrees.
  
   #. Set the tile width and height to both be ``512``.

      .. figure:: images/gridsets_newgridset.png

         Configuration of a new gridset
  
   #. Click :guilabel:`Add zoom level`. GeoServer will automatically create a first zoom level with a pixel size of ``0.3515625`` (this is calculated so that a minimal number of tiles will be needed to cover the entire region).

      .. figure:: images/gridsets_firstzoom.png

         First zoom level
  
   #. Click :guilabel:`Add zoom level` two more times. As the scale increases, the number of tiles required to cover the entire gridset bounds increases and the pixel size decreases.

      .. figure:: images/gridsets_zoomlevels.png

         More zoom levels
  
   #. Click :guilabel:`Save`.
  
   #. Click :guilabel:`Caching Defaults`.
  
   #. Select :guilabel:`EPSG:4326_western_hemisphere` from :guilabel:`Add default gridset`.
  
   #. Click the green plus icon.

   #. Note that the entry has been added to the :guilabel:`Default Cached Gridsets` list. 

      .. figure:: images/gridsets_default.png

         New default gridset
  
   #. Click :guilabel:`Submit`.

   .. note::
   
      Because both the bounds and the tiles are square, the number of tiles in the matrix will always be the same horizontally and vertically.

   Our new gridset will now be automatically configured to be used with any new layers that are created in GeoServer. Existing layers, however, will not be configured to use **EPSG:4326_western_hemisphere** unless it is added manually.

.. admonition:: Explore

   * Confirm that **EPSG:4326_western_hemisphere** was not added to any of our existing layers as a default gridset.

   * Publish a new layer from the data in the ``vector`` directory in your data directory. Check to see if the new caching defaults are applied to this layer.

   .. only:: instructor
  
      .. admonition:: Instructor Notes
  
         If this is part of a GeoServer course, then there will be a number of unpublished layers from the ``training:Cultural`` store. Otherwise, individual shapefiles in the ``vector`` directory can be published.
