.. _geoserver.data.shapefile:

Publishing a shapefile
======================

Adding a single shapefile to GeoServer is one of the simplest data loading tasks.  To start our discussion of data loading, we will load a shapefile showing the locations and borders of all countries.

.. note:: All data for this workshop was provided by `<http://naturalearthdata.com>`_ .  See the readme file in the data directory of the workshop bundle for details.

Adding a store
--------------

First we need to load a shapefile :term:`store`.  In GeoServer terminology, a shapefile is a store that contains a single :term:`layer`.  We must add the store to GeoServer before we can publish a layer.

#. From the :ref:`geoserver.webadmin` page, click on the :guilabel:`Stores` link on the left side, under :guilabel:`Data`.

   .. figure:: img/storeslink.png
      :align: center

      *Click this link to go to the Stores page*

#. Click on :guilabel:`Add new store`. 

   .. figure:: img/storespage.png
      :align: center

      *Stores page*

#. Select :guilabel:`Shapefile` under :guilabel:`Vector Data Sources`.

   .. figure:: img/shp_newshplink.png
      :align: center

      *Adding a shapefile store*

#. Fill out the following form, leaving all other fields as the default:

   .. list-table::
      :widths: 30 30 40

      * - :guilabel:`Workspace`
        - ``earth`` 
        - Should be the default.
      * - :guilabel:`Data Source Name`
        - ``countries`` 
        - This can be anything, but it makes sense to match this with the name of the shapefile.
      * - :guilabel:`Enabled`
        - *Checked*
        - Ensures the layer is published.  Unchecking will save configuration information only.
      * - :guilabel:`Description`
        - Add any layer description.
        - Layer metadata is recommended but not required.

#. In the box marked :guilabel:`URL`, type in the full path to the shapefile, or click the :guilabel:`Browse` button to navigate to the file.  This may be something like::

      C:\Documents and Settings\<username>\Desktop\geoserver_workshop\data\countries.shp

   .. note:: Be sure to replace ``<username>`` with your current username.

   .. figure:: img/shp_newshppage.png
      :align: center

      *Configuring a shapefile store*

#. When finished, click :guilabel:`Save`.

Publishing a layer
------------------

We have loaded a store, but our layer has yet to be published.  We'll do that now.

#. On the next screen, a list of layers in the store is displayed.  Since we are working with a shapefile, there is only a single layer.  Click the :guilabel:`Publish` link to configure the layer.

   .. figure:: img/shp_newlayerpublish.png
      :align: center

      *Selecting a layer to publish*

#. This is the layer configuration page.  There are many settings on this page, most of which we don't need to work with just now.  We will return to some of these settings later.  Fill out the form with the following info:
   
   #. Set the :guilabel:`Declared SRS` to ``EPSG:4326``.  IF NOT ALREADY DONE

   #. Set the :guilabel:`SRS handling` to :guilabel:`Force declared`.  IF NOT ALREADY DONE

   #. In the :guilabel:`Bounding Boxes` section, click on the :guilabel:`Compute from data` and :guilabel:`Compute from native bounds` links to set the bounding box of the layer.

   .. figure:: img/shp_layerconfig1.png
      :align: center

      *Configuring a new layer (Part 1)*

   .. figure:: img/shp_layerconfig2.png
      :align: center

      *Configuring a new layer (Part 2)*

#. When finished, click :guilabel:`Save`.  Your shapefile is now published in GeoServer!

#. You can now view the layer using the integrated OpenLayers client (using WMS).  Click on the :ref:`geoserver.webadmin.layerpreview` link.

   .. figure:: ../webadmin/img/layerpreviewlink.png
      :align: center

      *Click to go to the Layer Preview page*

#. A list of published layers is displayed.  Find the layer in the list, and click the :guilabel:`OpenLayers` link next to the entry in the list.

   .. figure:: img/shp_layerpreviewpage.png
      :align: center

      *Layer Preview page*

   .. note:: Lists in GeoServer are paged at 25 items at a time.  If you can't find the layer, you may need to click the :guilabel:`[2]` or :guilabel:`[>]` buttons.

#. A new tab in your browser will open up, showing your layer inside an OpenLayers application.  Play around with this window; you can use your mouse to zoom and pan, and can also click on the layer features to display attribute information.

   .. figure:: img/shp_openlayers.png
      :align: center

      *Viewing the published layer in OpenLayers*

.. note:: If you're wondering where the style/color is coming from, this will be discussed in the :ref:`geoserver.styling` section.

Your shapefile has been successfully published in GeoServer!

