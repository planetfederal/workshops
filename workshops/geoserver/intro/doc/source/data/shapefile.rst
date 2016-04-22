.. _geoserver.data.shapefile:

Publishing a shapefile
======================

Adding a single shapefile to GeoServer is one of the simplest data loading tasks. We encountered this task in the :ref:`geoserver.webadmin.quickload` section, but here we will slow down and work through the process manually. To start our discussion of data loading, we will load a shapefile showing the locations and borders of all the world's countries.

.. note:: All data for this workshop was provided by `<http://naturalearthdata.com>`_. See the readme file in the data directory of the workshop bundle for details.

Adding a store
--------------

First, we need to load a shapefile :term:`store`. In GeoServer terminology, a shapefile is a store that contains a single :term:`layer`. (Refer to the :ref:`geoserver.overview.concepts` section if necessary.) We must first add the store to GeoServer before we can publish the layer that the store contains.

#. Click the :guilabel:`Stores` link on the left side, under :guilabel:`Data`.

   .. figure:: img/shp_storeslink.png

      Click this link to go to the Stores page

#. Click :guilabel:`Add new store`. 

   .. figure:: img/shp_storespage.png

      Stores page

#. Click :guilabel:`Shapefile` under :guilabel:`Vector Data Sources`.

   .. figure:: img/shp_newshplink.png

      Adding a shapefile store

#. A form will display. Fill out the form with the following information:

   .. list-table::
      :header-rows: 1

      * - Field
        - Value
        - Notes
      * - :guilabel:`Workspace`
        - ``earth`` 
        - Should be already the default
      * - :guilabel:`Data Source Name`
        - ``countries`` 
        - Can be anything, but a good idea to match this with the name of the shapefile
      * - :guilabel:`Enabled`
        - *Checked*
        - Ensures the layer is published. Unchecking will save configuration information only.
      * - :guilabel:`Description`
        - "The countries of the world"
        - Layer metadata is recommended but not required

#. In the box marked :guilabel:`URL`, type the full path to the shapefile if known, or click the :guilabel:`Browse...` button to navigate to the file. The file path may be something like::

      C:\Users\<username>\Desktop\geoserver_workshop\data\countries.shp

   .. note:: Be sure to replace ``<username>`` with your current user name.

   .. figure:: img/shp_filebrowser.png

      Using the file browser to select a file

#. Leave all other fields as their default values.

   .. figure:: img/shp_newshppage.png

      Configuring a shapefile store

#. When finished, click :guilabel:`Save`.

Publishing a layer
------------------

We have loaded the shapefile store, but our layer has yet to be published. We'll do that now.

#. On the next screen, a list of layers in the store is displayed. Since we are working with a shapefile, there is only a single layer. Click the :guilabel:`Publish` link to configure the layer.

   .. figure:: img/shp_newlayerpublish.png

      Selecting a layer to publish

#. This is the layer configuration page. There are many settings on this page, most of which we don't need to work with now. We will return to some of these settings later. Fill out the form with the following info:
   
   #. In the :guilabel:`Coordinate Reference System` section, set the :guilabel:`Declared SRS` to ``EPSG:4326`` and set the :guilabel:`SRS handling` to :guilabel:`Force declared`. This will ensure that the layer is known to be in latitude/longitude coordinates.

   #. In the :guilabel:`Bounding Boxes` section, click the :guilabel:`Compute from data` and :guilabel:`Compute from native bounds` links to set the bounding box of the layer.

   .. figure:: img/shp_layerconfig1.png

      Configuring a new layer (Part 1)

   .. figure:: img/shp_layerconfig2.png

      Configuring a new layer (Part 2)

#. When finished, click :guilabel:`Save`.

#. Your shapefile is now published. You can now view the layer using the :ref:`geoserver.webadmin.layerpreview`. Click the :guilabel:`Layer Preview` link.

   .. figure:: ../webadmin/img/tour_layerpreviewlink.png

      Click to go to the Layer Preview page

#. A list of published layers is displayed. Find the layer in the list, and click the :guilabel:`OpenLayers` libk next to the layer.

   .. figure:: img/shp_layerpreviewpage.png

      Layer Preview page

   .. note:: While not specifically relevant here, lists in GeoServer are paged at 25 items at a time. If you ever can't find the layer, you can either page the list, or use the search box to narrow down the results.

#. A new tab in your browser will open up, showing your layer inside an OpenLayers application. You can use your mouse to zoom and pan, and can also click the features in the window to display attribute information.

   .. figure:: img/shp_openlayers.png

      Viewing the published layer

.. note:: If you're wondering where the style/color of the layer is coming from, this will be discussed in the upcoming :ref:`geoserver.styling` section.

