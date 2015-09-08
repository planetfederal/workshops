Gridsubset preview
==================

We can now configure the layer so that it only uses the **EPSG:4326_western_hemisphere** gridset that we configured earlier. We will also see how GeoWebCache and integrated GeoWebCache handle requests for tiles outside the gridset bounds differently.

.. admonition:: Exercise

   #. Click :guilabel:`Tile Layers` to open the list of cached layers.
  
   #. Click :guilabel:`opengeo:countries`.
  
   #. Click the red minus symbol for the default **EPSG:4326** and **My_EPSG:4326** gridsets. There should now only be **EPSG:4326_western_hemisphere** and **EPSG:900913** listed as available gridsets; delete any others that may be left over.
  
      .. figure:: images/exercise1_gridsets.png

         Two remaining gridsets

   #. Click :guilabel:`Save`.
  
   #. Back on the :guilabel:`Tile Layers` page, select :kbd:`EPSG:4326_western_hemisphere` from the preview options for ``opengeo:countries`` (either PNG or JPEG is fine). The preview application should show only the western hemisphere. Note that the application does not request tiles for areas outside the gridset's bounds.

      .. figure:: images/exercise1_preview.png

         Western hemisphere only
  
   #. Zoom out as far as possible if not already done.
  
   #. Click the map at a point where an eastern hemisphere landmass would be. The application will display the feature information. This is because since GeoWebCache passes ``GetFeatureInfo`` requests through to the WMS server.
  
   #. Right-click the map and select :guilabel:`View Image` (Firefox) or :guilabel:`Open Image in New Tab` (Chrome). The western hemisphere image should load in your browser.
  
   #. Change the ``BBOX`` parameter in the URL from ``-180,-90,0,90`` to ``0,-90,180,90`` (eastern hemisphere) and reload the request. GeoWebCache will serve a blank tile.
  
   #. Change the endpoint in the URL from ``/geoserver/gwc/service/wms`` to ``/geoserver/wms`` so that GeoWebCache will be bypassed. GeoServer will serve an eastern hemisphere image.
 
      .. figure:: images/exercise1_eastern.png

         Eastern hemisphere
 
   #. Add ``TILED=true`` to the URL so that WMS integration will be used to satisfy the request. Note that unlike the GeoWebCache endpoint, GeoServer will still serve an eastern hemisphere image.

   .. only:: instructor

      .. admonition:: Instructor Notes

         Final URL::

           http://localhost:8080/geoserver/wms?LAYERS=opengeo%3Acountries&FORMAT=image%2Fpng&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&STYLES=&SRS=EPSG%3A4326&BBOX=0,-90,180,90&WIDTH=512&HEIGHT=512&TILED=true

   .. note:: Depending on your browser you may also notice that GeoWebCache's images are transparent while GeoServer's use a white background. This is due to GeoWebCache forcing a default ``BGCOLOR`` parameter for requests.
