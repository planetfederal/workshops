Caching and styles
==================

GeoWebCache can be configured to create a separate tile cache for different styles associated with a layer. 

When receiving a map request, GeoWebCache will check the request for a ``STYLE`` parameter. If the cached layer has been configured to accept the value of that parameter, the requested style will not be changed. 

However, if the requested style is not in the list of acceptable styles, then GeoWebCache will change the ``STYLE`` parameter to the default style.

Note that a cached layer does not necessarily have the same default style or alternate styles as the layer it was based on.

.. admonition:: Exercise

   #. Navigate to the :guilabel:`Layers` page.
  
   #. Click :guilabel:`countries`.
  
   #. Click the :guilabel:`Publishing` tab. The default style for this layer is **countries**.
  
   #. Add **polygon** as an additional style if it is not already present.
  
      .. figure:: images/layer_styles.png
     
         Setting styles for a layer
  
   #. Click :guilabel:`Save`.
  
   #. Click :guilabel:`countries` again.
  
   #. Click the :guilabel:`Tile Caching` tab. Note that :guilabel:`ALL STYLES` is selected in the :guilabel:`Alternate styles` area. This means that GeoWebCache will accept (and cache) any style that is requested in a separate cache directory.
  
   #. Change the default style to **polygon** and uncheck :guilabel:`ALL STYLES`.

      .. figure:: images/styles_default.png

         Changing the default style for cached layers

   Now GeoWebCache will use the ``polygon`` style for every request that it receives, regardless of what the original ``STYLE`` parameter was set to.

   .. only:: instructor

      .. admonition:: Instructor Notes

         N.B. Mike added the "...and uncheck :guilabel:`ALL STYLES`" part because the step didn't seem to make sense otherwise. If this is in error, apologies.

   .. note:: In OpenGeo Suite 3.1 and earlier, the web interface only offered the option of creating a separate cache for each style. With this option disabled, therefore, all tile requests would be made to the default style.

   Now that our ``opengeo:countries`` layer has a different style from its associated cached layer, we can see the effect that this has when making tiled and non-tiled requests.

   #. Click :guilabel:`Layer Preview`.
  
   #. Click :guilabel:`Go` for the **opengeo:countries** layer. A new window or tab will open with the OpenLayers-based preview application. By default, the request is not tiled, and a single image has been requested from the WMS endpoint.
  
   #. Click on the settings icon in the top left corner of the map. The settings will appear above the map.
  
      .. figure:: images/opengeo-countries-wms-untiled.png
       
         Untiled
  
   #. Change the :guilabel:`Tiling` settings from ``Single tile`` to ``Tiled``. The tiles will load and be styled using the **polygon** style. Note that the portions of the map less than -180° or greater than 180° longitude are still styled with the original **countries** style because they fall outside the gridset bounds and are therefore not handled by GeoWebCache.
  
      .. figure:: images/opengeo-countries-wms-tiled.png
     
         Tiled

   .. only:: instructor

      .. admonition:: Instructor Notes

         This didn't work when tested.