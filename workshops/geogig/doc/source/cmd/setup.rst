.. _cmd.setup:

Setting up a QIGS project
=========================

In this workshop, we will be taking on the role of a city planner, tasked with updating the bike lane master plan of the city of Portland, Oregon.

The City of Portland `maintains a site where this information can be downloaded <https://www.portlandoregon.gov/bts/article/268487>`_ in shapefile format. While we will not be working with this exact download, we will be working with a modified version of same. Our goal will be to update the data we have been given, with the directive that when we are done, we have a similar content that could be placed on this site for download by the general public.

.. note::

   If you're interested, here are links to the original, direct downloads:

   * `Bicycle network SHP <ftp://ftp02.portlandoregon.gov/CivicApps/Bicycle_Network_pdx.zip>`_
   * `SHP metadata <https://www.portlandonline.com/cgis/metadata/viewer/display_rl.cfm?Meta_layer_id=53123&Db_type=sde>`_  

   These downloads are not necessary for completion of this workshop.

We will load our data from a shapefile and work with the data in QGIS. And of course, we will make and store snapshots of our data using GeoGig.

.. note::

   The data has been modified from the original source, and many columns removed. Students may wish to download the original shapefile and note that many of the columns refer to an internal record-keeping method to show who made what changes and when.

   Specifically, the columns ``modifiedby`` (a name) and ``modifiedon`` (a date) would be completely unecessary when used with a version control system such as GeoGig, as that information would already be encoded in the repository history.

Data details
------------

The following is a description of the attributes contained in the data file:

.. list-table::
   :widths: 25 25 50
   :header-rows: 1

   * - Attribute
     - Type
     - Description
   * - ``id``
     - Integer
     - Identifier
   * - ``segmentname``
     - String
     - Name of the area where the feature exists (Example: ``SW MAIN ST``)
   * - ``status``
     - String
     - Whether the bike lane exists or not. One of ``ACTIVE``, ``RECOMM`` or ``PLANNED``
   * - ``facility``
     - String
     - Short code for the type of bike lane. One of ``MTRAIL`` (multi-use trail), ``BLVD`` (bike boulevard), ``LANE`` (bike lane) or ``SCONN`` (signed connection)
   * - ``yearbuilt``
     - Integer
     - Year the bike lane was put into service
   * - ``comments``
     - String
     - Description of the feature, if any

View data
---------

We will be viewing the data using QGIS.

#. Open QGIS.

   .. figure:: img/setup_qgis.png

      QGIS

#. Go to :menuselection:`Layer --> Add Layer --> Add Vector Layer...`.

   .. figure:: img/setup_addveclink.png

      Select this option to add a layer to QGIS

#. This will bring up the :guilabel:`Add vector layer` dialog.

   .. figure:: img/setup_addvecmenu.png

      :guilabel:`Add vector layer` dialog

#. Click :guilabel:`Browse`, find :file:`bikepdx.shp` in the ``data`` directory and click :guilabel:`Open`.

#. You will see the layer displayed in the main window of QGIS.

   .. figure:: img/setup_unstyledlayer.png

Style layer
-----------

To improve the display and make working with our data easier, we will apply a style to our layer.

The style will show different routes based on two different criteria (attributes):

* The type of route:

  * A "multi-use trail" (``facility == 'MTRAIL'``)
  * A "bike boulevard" (``facility == 'BLVD'``)
  * A regular "bike lane" (``facility == 'LANE'``)

* The status of the route:

  * An active route (``status == 'ACTIVE'``)
  * A non-active route (``status <> 'ACTIVE'``)

With these criteria, we can generate six distinct rules for styling the different lines in the layer.

#. In the Layers panel, right-click on the layer entry (:guilabel:`bikepdx`) and select :guilabel:`Properties`.

   .. figure:: img/setup_propertieslink.png

      Layer properties link

#. This will bring up the layer properties dialog. Click :guilabel:`Style` to bring up the style parameters if it isn't already selected.

   .. figure:: img/setup_stylemenu.png

      Default QGIS style menu

#. At the bottom of the dialog, click the :guilabel:`Load Style` button and select :guilabel:`Load from file`.

   .. figure:: img/setup_loadstylelink.png

      Loading a new style from file

#. In the dialog, select the :file:`bikepdx.sld` file and click :guilabel:`Open`. This file is located in the workshop :file:`data` directory.

   .. note:: By default, only ``.qml`` files are shown in the file listing, so you may need to adjust the file list to show :guilabel:`SLD File (*.sld)` or type the filename in manually.

#. You will see the details of the style displayed in the dialog.

   .. figure:: img/setup_styledetails.png

      Details of the layer style

#. Click :guilabel:`Apply` to apply the style to the layer.

#. Click :guilabel:`OK`. The map window will be updated, showing the new style. Note how the non-active routes are dashed, while the more "important" routes are thicker/darker.

   .. figure:: img/setup_styledlayer.png
 
      Styled layer

With our layer styled, our data is now ready to be versioned. Feel free to explore the layer by zooming and panning around the map window.

.. note:: Now is a good time to **save your project**. You should save your project periodically to prevent loss. A good name for the file would be :file:`bikepdx.qgs`.

(Optional) Add a background layer
---------------------------------

To give this layer context, you may wish to add a background layer. **These steps are entirely optional** and can be skipped without loss of comprehension.

We can use the OpenLayers QGIS plugin to pull in any number of standard web map layers, such as Google or Bing. The OpenLayers QGIS plugin is typically not installed in advance, so we'll install it here.

#. Navigate to :menuselection:`Plugins --> Manage and Install Plugins`.

   .. figure:: img/setup_pluginsmenu.png

      Plugins menu

#. This will bring up the Plugin Manager.

   .. figure:: img/setup_pluginsall.png

      List of all plugins

#. Click :guilabel:`Not Installed` and select the :guilabel:`OpenLayers Plugin`.

   .. figure:: img/setup_olplugin.png

      OpenLayers plugin

#. Click :guilabel:`Close` to close the Plugin Manager.

#. Clicking the :guilabel:`Web` menu shows an entry: :guilabel:`OpenLayers Plugin`.

   .. figure:: img/setup_olmenu.png

      OpenLayers Plugin menu

#. Select a suitable basemap. For example, the :guilabel:`Google Physical` map provides a nice contrast.

#. The layer will be loaded. In the :guilabel:`Layers` panel on the left, drag the entry for :guilabel:`bikepdx` so that it is on top of the background layer and is not obscured.

   .. figure:: img/setup_basemap.png

      Basemap loaded
