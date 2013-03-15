.. _geoserver.data.geotiff:

Publishing a GeoTIFF
====================

In the previous section, we published a shapefile. Shapefiles contain vector information, that is to day points, lines, or polygons. GeoServer can also publish **raster** imagery. This could be simple georeferenced-images (such as Blue Marble imagery) all the way to multi-band DEM (digital elevation model) data. In this section, we will load a simple GeoTIFF containing a shaded relief of land area. The layer contains standard tri-band RGB values (0-255).

Adding a store
--------------

The procedure for adding a store for a GeoTIFF is very similar to that of a shapefile. A GeoTIFF, like a shapefile, is a store that contains a single layer.

#. From the :ref:`geoserver.webadmin` page, click on the :guilabel:`Stores` link on the left side, under :guilabel:`Data`.

   .. figure:: img/shp_storeslink.png

      Click this link to go to the Stores page

#. Click on :guilabel:`Add new store`. 

   .. figure:: img/shp_storespage.png

      Stores page

#. Select :guilabel:`GeoTIFF` under :guilabel:`Raster Data Sources`.

   .. figure:: img/tif_newtifstore.png

      Adding a GeoTIFF store

#. Fill out the following form:

   .. list-table::
      :widths: 30 30 40

      * - :guilabel:`Workspace`
        - ``earth`` 
        - Should be already the default
      * - :guilabel:`Data Source Name`
        - ``shadedrelief`` 
        - Can be anything, but a good idea to match this with the name of the shapefile
      * - :guilabel:`Enabled`
        - *Checked*
        - Ensures the layer is published. Unchecking will save configuration information only.
      * - :guilabel:`Description`
        - "Shaded relief of the world"
        - Layer metadata is recommended but not required

#. In the box marked :guilabel:`URL`, type in the full path to the shapefile if known, or click the :guilabel:`Browse` button to navigate to the file. The file path may be something like::

      C:\Users\<username>\Desktop\geoserver_workshop\data\shadedrelief.tif

   .. note:: Be sure to replace ``<username>`` with your user name.

   .. figure:: img/tif_filebrowser.png

      Using the file browser to select a file

#. When finished, click :guilabel:`Save`.

   .. figure:: img/tif_newtifpage.png

      Configuring a GeoTIFF store


Publishing a layer
------------------

As with the shapefile, now that store is loaded, we now need to configure and publish the layer itself.

#. On the next screen, a list of layers in the store is displayed. Since we are working with a GeoTIFF, there is only a single layer. Click the :guilabel:`Publish` link to configure the layer.

   .. figure:: img/tif_newlayerpublish.png

      Selecting a layer to publish

#. This is the layer configuration page. There are many settings on this page, most of which we don't need to work with just now. We will return to some of these settings later. Fill out the form with the following info:
   
   #. In the :guilabel:`Coordinate Reference System` section, set the :guilabel:`Declared SRS` to ``EPSG:4326`` and set the :guilabel:`SRS handling` to :guilabel:`Force declared`. This will ensure that the layer is known to be in latitude/longitude coordinates.

   #. In the :guilabel:`Bounding Boxes` section, click the :guilabel:`Compute from data` and :guilabel:`Compute from native bounds` links to set the bounding box of the layer.

   .. figure:: img/tif_newlayerconfig1.png

      Configuring a layer to publish (Part 1)

   .. figure:: img/tif_newlayerconfig2.png

      Configuring a layer to publish (Part 2)

#. When finished, click :guilabel:`Save`.

#. Your GeoTIFF is now published in GeoServer. You can now view the layer using the :ref:`geoserver.webadmin.layerpreview` as in previous sections. Clicking on the map will display the RGB values for that particular point.

   .. note:: Remember that lists in GeoServer are paged at 25 items at a time. Alternately, type "earth" in the search box at the top to narrow the list.


   .. figure:: img/tif_openlayers.png

      Viewing the published layer in OpenLayers
