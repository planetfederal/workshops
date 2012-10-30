.. _geoserver.data.geotiff:

Publishing a GeoTIFF
====================

In the previous section, we published a shapefile.  Shapefiles contain vector information, that is to day points, lines, or polygons.  GeoServer can also publish **raster** imagery.  This could be simple georeferenced-images (such as blue marble imagery) all the way to multi-band DEM (digital elevation model) data.  In this section, we will load a simple GeoTIFF containing shaded relief for land area.  The layer uses standard tri-band RGB values (0-255).

Adding a store
--------------

The procedure for adding a store for a GeoTIFF is very similar to that of a shapefile.  A GeoTIFF, like a shapefile, is a store that contains a single layer.

#. From the :ref:`geoserver.webadmin` page, click on the :guilabel:`Stores` link on the left side, under :guilabel:`Data`.

   .. figure:: img/storeslink.png
      :align: center

      *Click this link to go to the Stores page*

#. Click on :guilabel:`Add new store`. 

   .. figure:: img/storespage.png
      :align: center

      *Stores page*

#. Select :guilabel:`GeoTIFF` under :guilabel:`Raster Data Sources`.

   .. figure:: img/tif_newtifstore.png
      :align: center

      *Adding a GeoTIFF store*

#. Fill out the following form:

   .. list-table::
      :widths: 30 30 40

      * - :guilabel:`Workspace`
        - ``earth`` 
        - Should be the default.
      * - :guilabel:`Data Source Name`
        - ``shadedrelief`` 
        - This can be anything, but it makes sense to match this with the name of the file.
      * - :guilabel:`Enabled`
        - *Checked*
        - Ensures the layer is published.  Unchecking will save configuration information only.
      * - :guilabel:`Description`
        - Add any layer description.
        - Layer metadata is recommended but not required.

#. In the box marked :guilabel:`URL`, type in the full path to the GeoTIFF, or click the :guilabel:`Browse` button to navigate to the file.  This may be something like::

      C:\Documents and Settings\<username>\Desktop\geoserver_workshop\data\shadedrelief.tif

   .. note:: Be sure to replace ``<username>`` with your username.

   .. figure:: img/tif_newtifpage.png
      :align: center

      *Configuring a GeoTIFF store*

#. When finished, click :guilabel:`Save`.


Publishing a layer
------------------

As with the shapefile, after the store is loaded, we now need to configure the layer itself.

#. On the next screen, a list of layers in the store is displayed.  Since we are working with a GeoTIFF, there is only a single layer.  Click the :guilabel:`Publish` link to configure the layer.

   .. figure:: img/tif_newlayerpublish.png
      :align: center

      *Selecting a layer to publish*

#. This is the layer configuration page.  There are many settings on this page, most of which we don't need to work with just now.  We will return to some of these settings later.  Fill out the form with the following info:
   
   #. Set the :guilabel:`Declared SRS` to ``EPSG:4326`` if not already there.

   #. Set the :guilabel:`SRS handling` to :guilabel:`Force declared` if not already there.

   #. In the :guilabel:`Bounding Boxes` section, click on the :guilabel:`Compute from data` and :guilabel:`Compute from native bounds` links to set the bounding box of the layer.

   .. figure:: img/tif_newlayerconfig.png
      :align: center

      *Configuring a layer to publish*

#. When finished, click :guilabel:`Save`.  Your GeoTIFF is now published in GeoServer!

#. You can now view the layer using the integrated OpenLayers client (using WMS) via the :ref:`geoserver.webadmin.layerpreview` as in previous sections.  Clicking on the map will display the RGB values for that particular point.

   .. figure:: img/tif_openlayers.png
      :align: center

      *Viewing the published layer in OpenLayers*

Your GeoTIFF has been successfully published in GeoServer!