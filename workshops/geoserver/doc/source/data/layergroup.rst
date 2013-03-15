.. _geoserver.data.layergroup:

Creating a layer group
======================

A layer group, as its name suggests, is a group of layers that acts as a single layer. This is useful when creating a "basemap", or other situations when more than one separate layer needs to be requested simultaneously or frequently. Since layers typically contain only a single type of geometry, using a layer group also allows you to combine data types in one single WMS request. 

.. note:: Take care not to get confused between a workspace, which is a notional grouping of layers (think "container"), and a layer group, which is a group of layers for WMS requests (think "image group").

In the previous sections, we loaded a few layers. Now we'll use a layer group to combine them.

#. Click the :guilabel:`Layer Groups` link, under :guilabel:`Data` on the left side of the page.

   .. figure:: img/layergroup_link.png

      Click to go to the Layer Groups page

#. Click :guilabel:`Add new layer group` at the top of the page.

   .. figure:: img/layergroup_page.png

      Layer Groups page

#. Fill out the following form:

   #. In the :guilabel:`Name` field, enter :guilabel:`earthmap`.

   #. In the :guilabel:`Workspace` field, enter :guilabel:`earth`.

   #. Skip the :guilabel:`Bounds` section for now.

   #. Now we will add layers to our layer group. Click the :guilabel:`Add Layer...` link.
 
   #. Select each of the following layers so that they appear in this order:

      * :guilabel:`earth:shadedrelief`
      * :guilabel:`earth:ocean`
      * :guilabel:`earth:countries`
      * :guilabel:`earth:cities`

      .. note:: It will be much easier to use the search box to narrow down the list.

      Layer order is important. The **top layer in the list will be drawn first, the bottom last**. Make sure to match the order of the above list. Reorder the layers if necessary by clicking on the :guilabel:`Position` arrows for each layer.

      .. figure:: img/layergroup_layerchooser.png

         Choosing the layers to include in the layer group

   #. Check the :guilabel:`Default style` box for every layer.

   #. Now go back to the :guilabel:`Bounds` section and click the :guilabel:`Generate Bounds` button. This will determine the bounding box for the entire layer group. This is why we waited to do this until all layers were added to the layer group.

   #. Leave all other areas as their defaults for now. The form should look like this:

      .. figure:: img/layergroup_new.png

         New layer group configuration

#. Scroll down to the bottom of the page and click :guilabel:`Save`.

#. Preview the layer by going to the :guilabel:`Layer Preview`.

   .. figure:: img/layergroup_openlayers.png

      Previewing the layer group

Even though the Layer Importer generated unique styles for each layer, this layer group doesn't look very nice. The following section will discuss the next important step of making maps: **styling**.
