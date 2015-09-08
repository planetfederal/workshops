Response headers
================

When GeoWebCache responds to a tile request, it also returns some additional metadata to the standard GeoServer response headers.

The following examples show the headers returned from a WMS and WMS-C requests.

.. note::

   The examples below will use the cross-platform `cURL <http://curl.haxx.se>`_ utility to make requests using HTTP and other protocols. If you are not familiar with cURL, the following command-line arguments may be helpful to know:

   * ``-s``: Suppresses the data transfer statistics
   * ``-v``: Prints the response headers received with the data

Headers
-------

Here is an example of the standard header returned with a GeoServer request.

.. code-block:: bash

   $ curl -sv "http://localhost:8080/geoserver/wms?LAYERS=opengeo:countries&FORMAT=image/png&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&STYLES=&SRS=EPSG:4326&BBOX=0,0,45,45&WIDTH=256&HEIGHT=256" > /dev/null

.. code-block:: none

   HTTP/1.1 200 OK
   Server: Apache-Coyote/1.1
   Content-Disposition: inline; filename=opengeo-countries.png
   Content-Type: image/png
   Transfer-Encoding: chunked
   Date: Fri, 11 Jul 2014 23:35:21 GMT

.. code-block:: bash

   C:> curl -sv "http://localhost:8080/geoserver/wms?LAYERS=opengeo:countries&FORMAT=image/png&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&STYLES=&SRS=EPSG:4326&BBOX=0,0,45,45&WIDTH=256&HEIGHT=256" > NUL
     

If we change the request to use the GeoWebCache endpoint (``/geoserver/gwc/service/wms``), extra headers concerning the cached status of the tile are returned:

.. code-block:: bash

   $ curl -sv "http://localhost:8080/geoserver/gwc/service/wms?LAYERS=opengeo:countries&FORMAT=image/png&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&STYLES=&SRS=EPSG:4326&BBOX=0,0,45,45&WIDTH=256&HEIGHT=256" > /dev/null

.. code-block:: none

   HTTP/1.1 200 OK
   Server: Apache-Coyote/1.1
   geowebcache-tile-index: [4, 2, 2]
   geowebcache-cache-result: MISS
   geowebcache-tile-bounds: 0.0,0.0,45.0,45.0
   geowebcache-gridset: EPSG:4326
   geowebcache-crs: EPSG:4326
   Last-Modified: Sat, 12 Oct 2013 19:05:57 GMT
   Content-Disposition: inline; filename=geoserver-dispatch.image
   Content-Type: image/png
   Content-Length: 40808
   Date: Sat, 12 Jul 2014 19:05:57 GMT

Of particular interest are the headers that begin with the ``geowebcache-`` keyword. These reveal details on the gridsubset and tile that was used to fulfill the request.

.. code-block:: none

   geowebcache-tile-index: [4, 2, 2]
   geowebcache-cache-result: MISS
   geowebcache-tile-bounds: 0.0,0.0,45.0,45.0
   geowebcache-gridset: EPSG:4326
   geowebcache-crs: EPSG:4326

The exact tile that was used is indicated by ``geowebcache-tile-index`` in ``x``, ``y``, ``z`` order.

The ``geowebcache-cache-result`` header will indicate whether a cached tile was used (``HIT``) or whether the request was passed to the backing WMS server (``MISS``). Also possible are ``WMS``, which means that the request type could not be handled by GeoWebCache (such as ``GetFeatureInfo`` request), and ``OTHER`` indicates an error or other unexpected result.

When the requested tile does not align to the gridset, the GeoServer-integrated GeoWebCache returns both a ``MISS`` and a ``geowebcache-miss-reason`` header, which will contain a message such as ``request does not align to grid(s) 'EPSG:4326'``. Other reasons may indicate that there is no applicable parameter filter, or that caching has not been configured for the requested layer.

Client-side caching
-------------------

In an earlier section we mentioned that using tiles also allows for client-side caching of the tiles. GeoWebCache aids the client in determining whether it needs to update its local copy by providing a ``Last-Modified`` header in its responses. 

The client may then ask the server if a more recent version of this particular tile is available by passing in the date as part of the request header. If the client already has the most recent version, a ``304 Not Modified`` response—but no data—will be returned by GeoWebCache.

.. code-block:: bash

   $ curl --header "If-Modified-Since: Sat, 12 Oct 2013 19:05:57 GMT" -sv "http://localhost:8080/geoserver/gwc/service/wms?LAYERS=opengeo:countries&FORMAT=image/png&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&STYLES=&SRS=EPSG:4326&BBOX=0,0,45,45&WIDTH=256&HEIGHT=256" > /dev/null

.. code-block:: none

   HTTP/1.1 304 Not Modified

.. admonition:: Exercise

   We can now use cURL to make our requests and examine the response headers that GeoWebCache is sending back with the image data.

   #. Click :guilabel:`Tile Layers`.
  
   #. Select :kbd:`EPSG:4326 / png` for the ``opengeo:countries`` layer. The preview application will open in a new tab or window.
  
   #. Right-click the bottom left part of the image and select :guilabel:`Copy Image Location` (Firefox) or :guilabel:`Copy  Image URL` (Chrome).
  
   #. Open a command line interface and ensure cURL is on the path.
  
   #. Execute :kbd:`curl -sv "IMAGE_URL" > /dev/null` (replace ``IMAGE_URL`` with the URL that was copied above in step 3). Note the tile index ``[0, 0, 1]``.
  
.. note::

   The z-index of ``1`` from ``[0, 0, 1]`` is due to the fact that we have set our gridsubset for EPSG:4326 to begin at zoom level 1 rather than the default of 0. The x and y indices show that the WMS-C standard starts counting tiles in the bottom left of the gridsubset bounds. If we had copied the URL of the top right tile, the index would be ``[3, 1, 1]`` since the number of tiles is 4×2 at zoom level 1.

.. admonition:: Explore

   Try other zoom levels with the same data and observe how the tile index changes.

.. admonition:: Challenge

   Return to the section on TMS and try to craft a URL that will get a tile from the same layer. Compare it with the tile index indicated in the response header. Does this match what you expect?

   .. only:: instructor

      .. admonition:: Instructor Notes

         TMS uses ``z``, ``x``, ``y``. The response header is ``[x, y, z]``.
