Gridsubsets
===========

We have previously defined gridsubsets as layer-specific gridsets. By default all the gridsubsets that are configured for a layer in GeoServer are identical to their base gridset (in other words, they have the same zoom levels), but the zoom levels for the cached layer may be restricted to a subset of the gridset's zoom levels.

.. note:: The GeoServer web interface does not allow the gridsubset to have a smaller bounding box than the gridset.

.. admonition:: Exercise

   We will practice configuring new gridsubsets for a layer in GeoServer.

   #. Click :guilabel:`Tile Layers` to open the list of cached layers.
  
   #. Click :guilabel:`opengeo:countries`.
  
   #. Note that there are **EPSG:900913** and **EPSG:4326** gridsets configured for this layer. We have added **My_EPSG:4326** and **EPSG:4326_western_hemisphere** as default gridsets; however, the defaults are only applied to newly created layers and not existing layers.
  
   #. Uncheck :guilabel:`Create a cached layer for this layer`. You will see a warning:

      .. figure:: images/gridsets_removecache.png

         Warning when removing a cache
     
   #. Click :guilabel:`OK` to confirm. The caching options will disappear since the cached layer has been removed.

      .. figure:: images/gridsets_nocache.png

         No caching options for this layer

   #. Click :guilabel:`Save`.
  
   #. The :guilabel:`Tile Layers` list no longer shows **opengeo:countries**.
  
   #. Now navigate to the :guilabel:`Layers` page (in the :guilabel:`Data` menu).
  
   #. Click :guilabel:`countries` in the layer list.
  
   #. Click the :guilabel:`Tile Caching` tab.
  
   #. Click :guilabel:`Create a cached layer for this layer`. The caching options will reappear.

      .. figure:: images/gridsets_newcache.png

         Caching options returned
  
   #. Note that there are now four associated gridsubsets for this layer: **EPSG:900913**, **EPSG:4326**, **My_EPSG:4326** and **EPSG:4326_western_hemisphere**. 

      .. figure:: images/gridsets_available.png

         Available gridsubsets

.. note:: Unchecking the :guilabel:`Enable tile caching for this layer` option will disable caching but will not remove the cached layer. This allows the disabling of caching without losing settings or the contents of a cache.
