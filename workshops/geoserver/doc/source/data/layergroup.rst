.. _geoserver.data.layergroup:

Creating a layer group
======================

A layer group, as its name suggests, is a group of layers that acts as a single layer.  This is useful when creating a "basemap", or other situations when more than one separate layer needs to be requested simultaneously or frequently.  Since layers typically contain only a single type of geometry, using a layer group also allows you to combine data types in one single WMS request.  

.. note:: Take care not to get confused between a workspace, which is a notional grouping of layers (think "container"), and a layer group, which is a group of layers for WMS requests (think "image group").

In the previous section, we loaded a few layers.  Now we'll use a layer group to combine them.

#. From the :ref:`geoserver.webadmin` page, click on the :guilabel:`Layer Groups` link, under :guilabel:`Data` on the left side of the page.

   .. figure:: img/layergroup_link.png
      :align: center

      *Click to go to the Layer Groups page*

#. Click on :guilabel:`Add new layer group` at the top of the page.

   .. figure:: img/layergroup_page.png
      :align: center

      *Layer Groups page*

#. Enter ``earthmap`` in the :guilabel:`Name` field.  Don't click :guilabel`Save` yet.

   .. figure:: img/layergroup_new.png
      :align: center

      *Creating a new layer group*

#. Now we will add layers to our layer group (skipping over the Bounds and other form fields for now).  Click on the :guilabel:`Add Layer` link.

#. Select each of the following layers so that they appear in this order:

   * :guilabel:`earth:shadedrelief`
   * :guilabel:`earth:ocean`
   * :guilabel:`earth:countries`
   * :guilabel:`earth:cities`

   .. figure:: img/layergroup_add.png
      :align: center

      *Adding a layer to the layer group*

   .. note:: To make it easier to find the appropriate layers, type in ``earth`` in the search box to narrow the listing.

   Layer order is important.  The **top layer in the list will be drawn first, the bottom last**.  Make sure to match the order of the above list.  Reorder the layers if necessary by clicking on the :guilabel:`Position` arrows for each layer.

#. Check the :guilabel:`Default Style` box for all four layers.

#. Now click the :guilabel:`Generate Bounds` button to determine the bounding box for the entire layer group.  This button will also determine the projection of the layer group, equal to the top layer's projection by default.  If the projection is not found automatically, enter :guilabel:`EPSG:4326`.

   .. figure:: img/layergroup_complete.png
      :align: center

      *Completed layer group*

#. Click :guilabel:`Save` when done.

#. Preview the layer by going to the :guilabel:`Layer Preview`.

   .. note:: Lists in GeoServer are paged at 25 items at a time.  If you can't find the layer, you may need to click the :guilabel:`[2]` or :guilabel:`[>]` buttons.

   .. figure:: img/layergroup_openlayers.png
      :align: center

      *Previewing the layer group*

Even though the Layer Importer generated unique styles for each layer, this layer group doesn't look very nice.  The following section will discuss the next important step of making maps: **styling**.