.. _geoserver.layergroup:

Creating a layer group
======================

A layer group, as its name suggests, is a group of layers. Grouping is useful when creating a "basemap", or other situations when many single layers are requested simultaneously and frequently from a WMS. Layer groups also let you combine data with different geometries and content.

In the previous sections, we loaded multiple layers from PostGIS. Now we'll use a layer group to combine them into a single virtual layer.

#. From the :ref:`geoserver.webadmin` page, click the :guilabel:`Layer Groups` link, under :guilabel:`Data` on the left side of the page.

   .. figure:: img/layergroup_link.png

      Click to go to the Layer Groups page

#. Click :guilabel:`Add new layer group` at the top of the page.

   .. figure:: img/layergroup_page.png

      Layer Groups page

#. Enter ``earthmap`` in the :guilabel:`Name` field. Don't click :guilabel:`Save` yet.

   .. figure:: img/layergroup_new.png

      Creating a new layer group

   .. note::  Skip the Bounds and other form fields for now.

#. Now we will add layers to our layer group. Scroll down click the :guilabel:`Add Layer` link.

   .. figure:: img/layergroup_addlayerlink.png

      Addding layers to the layergroup

#. Select each of the following layers so that they appear in this order:

   * :guilabel:`earth:shadedrelief`
   * :guilabel:`earth:ocean`
   * :guilabel:`earth:countries`
   * :guilabel:`earth:citybuffers`
   * :guilabel:`earth:cities`

   .. figure:: img/layergroup_add.png

      Adding a layer to the layer group

   .. note:: To make it easier to find the appropriate layers, type in ``earth`` in the search box to narrow the listing.

   Layer order in the group definition is important. The **top layer in the list will be drawn first, the bottom last**. Make sure to match the order of the above list.
   
#. Reorder the layers if necessary by clicking on the :guilabel:`Position` arrows for each layer.

#. Check the :guilabel:`Default Style` box for all four layers.

#. Now, click the :guilabel:`Generate Bounds` button to determine the bounding box for the entire layer group. This button will also determine the projection of the layer group, equal to the top layer's projection by default. If the projection is not found automatically, enter :guilabel:`EPSG:4326`.

   .. figure:: img/layergroup_complete.png

      Completed layer group

#. Click :guilabel:`Save` when done.

#. Preview the layer by going to the :guilabel:`Layer Preview`.

   .. figure:: img/gs_layergroup.png

      Previewing the layer group
