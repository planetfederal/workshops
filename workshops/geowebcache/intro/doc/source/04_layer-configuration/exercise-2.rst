Restricting the cached zoom levels
==================================

.. admonition:: Exercise

   We can now configure the gridsubsets so that caching only occurs at certain zoom levels. 

   #. Click :guilabel:`Tile Layers` to open the list of cached layers.
  
   #. Click :guilabel:`opengeo:countries`.
  
   #. Select :kbd:`EPSG:4326` from the :guilabel:`Add grid subset` selection and click the green plus icon. This will add ``EPSG:4326`` back to the list.
  
   #. Change the published zoom levels for EPSG:4326 from ``Min`` and ``Max`` to ``1`` and ``6``. GeoWebCache will now handle requests between these two zoom levels.
  
   #. Change the cached zoom levels for EPSG:4326 from ``Min`` and ``Max`` to ``Min`` and ``4``. GeoWebCache will now only cache tiles between zoom levels ``1`` and ``4``.
  
      .. figure:: images/exercise2_gridsubset.png

         Configured gridsubset

   #. Click :guilabel:`Save`.
  
   #. Click :guilabel:`Empty` for :kbd:`opengeo:countries` and confirm that you will clear all cached tiles.

      .. figure:: images/exercise2_emptycache.png

         Emptying the cache for ``opengeo:countries``
  
   #. Click :guilabel:`Tile Layers`.
  
   #. Select :guilabel:`EPSG:4326 / png` for ``opengeo:countries``. Note that there are now only 6 zoom levels available in the web application. After zoom level ``4``, GeoWebCache will not cache the request.
