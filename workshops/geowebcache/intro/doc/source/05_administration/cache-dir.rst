Cache directory
===============

GeoWebCache stores all the cached tiles in a central directory that is further divided into subdirectories. The exact location of the cache directory will depend on a number of factors, including operating system and certain user-configurable settings.

For the embedded GeoWebCache that ships with OpenGeo Suite, you will find a ``gwc`` directory in the GeoServer data directory.

.. note::

   In OpenGeo Suite, the data directory is located in the following locations:
 
   * Linux: ``/var/lib/opengeo/geoserver``
   * OS X: ``~/Library/Containers/com.boundlessgeo.geoserver/Data/Library/Application\ Support/GeoServer/data_dir``
   * Windows: ``C:\ProgramData\Boundless\OpenGeo\geoserver``

As soon as tiles are generated for any cached layers in GeoServer, files will be added to a directory with the name composed of the workspace and layer name; tiles for the layer **opengeo:countries**, for example, will be placed in the ``gwc/opengeo_countries`` directory.

Inside each cached layer directory, there will be individual directories for each zoom level of each gridsubset. If we have requested tiles from both of the default **EPSG:4326** and **EPSG:900913** subgridsets, we might find the following directories in ``gwc/opengeo_countries/``: ``EPSG_4326_00``, ``EPSG_4326_00``, ``EPSG_4326_01``, ``EPSG_4326_02``, ``EPSG_900913_00`` and ``EPSG_900913_01``. The exact contents will depend on which zoom levels were visited.

These directories are further subdivided by GeoWebCache to enable fast file access.

Styles and filters
------------------

We have seen that filters on styles and other parameters can cause GeoWebCache to create multiple caches for a single gridsubset. For example, we may tell GeoWebCache to create two separate caches, each based on a different styling of a single layer. GeoWebCache will use a special directory naming mechanism to avoid collision between tiles cached for the different styles.

Changing the cache directory
----------------------------

If the default ``gwc/`` directory is not a desirable location, this can be changed by editing the GeoServer ``web.xml`` file and adding the following excerpt:

.. code-block:: xml

   <context-param>
     <param-name>GEOWEBCACHE_CACHE_DIR</param-name>
     <param-value>/var/cache/geowebcache</param-value>
   </context-param>

.. admonition:: Exercise

   Earlier we changed the cached zoom levels for the layer ``opengeo:countries``. We can check that only some of the zoom levels are being cached by looking in the cache directory.

   #. Click :guilabel:`Tile Layers`.
  
   #. Click :guilabel:`Empty` for ``opengeo:countries`` and confirm. The :guilabel:`Disk Used` numbers will reset to ``0.0 B``.
  
   #. Select ``EPSG:4326/png`` from the :guilabel:`Preview` selection for the layer.
  
   #. Zoom from the smallest through to the largest scale available in the preview application.
  
   #. Return to the GeoServer web interface and click :guilabel:`Tile Layers` again. When the page loads, the :guilabel:`Disk Used` value should be several megabytes in size.
  
   #. In a terminal, open ``gwc/opengeo_countries`` inside the data directory.

      .. code-block:: console

         cd /var/lib/opengeo/geoserver/gwc/opengeo_countries

   #. There should be directories for zoom levels 1-4, but no cache directories for other the zoom levels.

      .. code-block:: console

         $ ls -l

      .. code-block:: console

         drwxr-xr-x 4 tomcat6 tomcat6 4096 Jul 23 15:26 EPSG_4326_01
         drwxr-xr-x 4 tomcat6 tomcat6 4096 Jul 23 15:26 EPSG_4326_02
         drwxr-xr-x 6 tomcat6 tomcat6 4096 Jul 23 15:27 EPSG_4326_03
         drwxr-xr-x 6 tomcat6 tomcat6 4096 Jul 23 15:27 EPSG_4326_04

      .. note:: If you check the amount of disk space used by these directories (on Linux :kbd:`du -h`), the value should match the disk usage indicated in the GeoServer web interface.
