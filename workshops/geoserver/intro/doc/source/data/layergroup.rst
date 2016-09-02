.. _geoserver.data.layergroup:

Creating a layer group
======================

A layer group, as its name suggests, is a group of layers that acts as a single layer. This is useful when creating a "base map", or other situations when more than one separate layer needs to be requested simultaneously or frequently. Since layers typically contain only a single type of geometry, using a layer group also allows you to combine data types in one single WMS request. 

.. note:: Take care not to get confused between a :term:`workspace`, which is a notional grouping of layers (think "container"), and a :term:`layer group`, which is a group of layers for WMS requests (think "image group"). Refer to the :ref:`geoserver.overview.concepts` section for more information.

In the previous sections, we loaded and published a few layers. Now we'll use a layer group to combine them.

#. Click the :guilabel:`Layer Groups` link, under :guilabel:`Data` on the left side of the page.

   .. figure:: img/layergroup_link.png

      Click to go to the Layer Groups page

#. Click :guilabel:`Add new layer group` at the top of the page.

   .. figure:: img/layergroup_page.png

      Layer Groups page

#. We will fill out the following form. In the :guilabel:`Name` field, enter :guilabel:`earthmap`.

#. In the :guilabel:`Workspace` field, enter :guilabel:`earth`.

#. Skip the :guilabel:`Bounds` and :guilabel:`Coordinate Reference System` sections for now.

#. Now we will add layers to our layer group. Click the :guilabel:`Add Layer...` link.
 
#. Select each of the following layers so that they appear in this order:

   * :guilabel:`earth:shadedrelief`
   * :guilabel:`earth:ocean`
   * :guilabel:`earth:countries`
   * :guilabel:`earth:cities`

   .. figure:: img/layergroup_layerchooser.png

      Choosing the layers to include in the layer group

   .. warning:: There are two layers named ``countries``, but only one is in the ``earth`` workspace. Make sure you pick the correct one!

   Layer order is important. The **top layer in the list will be drawn first**. Make sure to match the order of the above list. Reorder the layers if necessary by clicking the :guilabel:`Position` arrows for each layer. Use the search box to narrow down the list if necessary.

   .. note:: This order is the opposite of the way that mapping applications respect drawing order. In most mapping applications, the top layer is drawn last so that it is "on top".

#. Check the :guilabel:`Default style` box for every layer.

#. Now go back to the :guilabel:`Bounds` section and click the :guilabel:`Generate Bounds` button. This will determine the bounding box for the entire layer group. This is why we waited to do this until all layers were added to the layer group.

#. Leave all other areas as their defaults for now. The form should look like this:

   .. figure:: img/layergroup_new1.png

      New layer group configuration (Part 1)

   .. figure:: img/layergroup_new2.png

      New layer group configuration (Part 2)

#. Scroll down to the bottom of the page and click :guilabel:`Save`.

#. Preview the layer by going to the :guilabel:`Layer Preview`.

   .. figure:: img/layergroup_openlayers.png

      Previewing the layer group

Even though the Layer Importer generated unique styles for each layer, this layer group doesn't look very nice. The following section will discuss the next important step of making maps: **styling**.
