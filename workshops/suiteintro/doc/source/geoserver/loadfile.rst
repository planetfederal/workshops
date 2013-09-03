.. _geoserver.loadfile:

Publishing data from a file
===========================

In this section, we will load a single GeoTIFF from the file-system. This GeoTIFF contains shaded relief for land area, using standard tri-band RGB values (0-255).

Adding a store
--------------

A GeoTIFF is a store that contains a single layer.

#. From the :ref:`geoserver.webadmin` page, click on the :guilabel:`Stores` link on the left side, under :guilabel:`Data`.

   .. figure:: img/storeslink.png

      Click this link to go to the Stores page

#. Click on :guilabel:`Add new store`. 

   .. figure:: img/storespage.png

      Stores page

#. Select :guilabel:`GeoTIFF` under :guilabel:`Raster Data Sources`.

   .. figure:: img/tif_newtifstore.png

      Adding a GeoTIFF store

#. Fill out the form as follows:

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

   <workshop>\data\shadedrelief.tif

   .. figure:: img/tif_newtifpage.png

      Configuring a GeoTIFF store

#. When finished, click :guilabel:`Save`.

Publishing a layer
------------------

After the store is loaded, we need to configure how it is published as a layer.

#. On the next screen, a list of layers in the store is displayed. Since we are working with a GeoTIFF, there is only a single layer. Click the :guilabel:`Publish` link to configure the layer.

   .. figure:: img/tif_newlayerpublish.png

      Selecting a layer to publish

#. This is the layer configuration page. There are many settings on this page, most of which we don't need to work with just now. We will return to some of these settings later.  Fill out the form with the following information:
   
   #. Set the :guilabel:`Declared SRS` to ``EPSG:4326`` if it isn't already.

   #. Set the :guilabel:`SRS handling` to :guilabel:`Force declared`, again if not already set.

   #. In the :guilabel:`Bounding Boxes` section, click on the :guilabel:`Compute from data` and :guilabel:`Compute from native bounds` links to set the bounding box of the layer.

   .. figure:: img/tif_newlayerconfig.png

      Configuring a layer to publish

#. When finished, click :guilabel:`Save`. Your GeoTIFF is now published in GeoServer!

Preview your Work
-----------------

#. You can now view the layer using the integrated OpenLayers client (using WMS) via the GeoServer Layer Preview.  Clicking on the map will display the RGB values for that particular point.

   .. figure:: img/tif_openlayers.png

      Viewing the published layer in OpenLayers

Your GeoTIFF has been successfully published in GeoServer!