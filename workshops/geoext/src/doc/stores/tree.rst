.. _geoext.stores.tree:

Adding a Tree View to Manage the Map Panel's Layers
===================================================

With the `Ext.tree.TreePanel
<http://dev.sencha.com/deploy/dev/docs/docs/?class=Ext.tree.TreePanel>`_ and its
tree nodes, Ext JS provides a powerful tool to work with hierarchical
information. While Ext JS trees cannot be populated from stores, GeoExt
provides a tree loader that can turn information from a layer store into tree
nodes. Configured with checkboxes, these can be used to turn layers on and
off. In addition, thanks to drag & drop support of Ext JS trees, layers can
easily be reordered.

Using a Tree Panel for Layer Management
---------------------------------------

Let's add a tree to the example from the :ref:`previous <geoext.stores.capabilities>`
section. To do so, we create a tree panel with a `GeoExt.tree.LayerContainer
<http://geoext.org/lib/GeoExt/widgets/tree/LayerContainer.html>`_, and add it
as new item to our application's main panel.

.. rubric:: Tasks

#.  If you don't have it open already, open :file:`map.html` from the previous
    example in a text editor. Add the following tree definition at the end of
    our application's script block:
    
    .. _geoext.stores.tree.treepanel:

    .. code-block:: javascript

        items.push({
            xtype: "treepanel",
            ref: "tree",
            region: "west",
            width: 200,
            autoScroll: true,
            enableDD: true,
            root: new GeoExt.tree.LayerContainer({
                expanded: true
            }),
            bbar: [{
                text: "Remove from Map",
                handler: function() {
                    var node = app.tree.getSelectionModel().getSelectedNode();
                    if (node && node.layer instanceof OpenLayers.Layer.WMS) {
                        app.mapPanel.map.removeLayer(node.layer);
                    }
                }
            }]
        });
 
#.  Reload :file:`map.html` in your browser to see the changes.
    On the left-hand side of the map, we have a tree now. Add some layers from
    the grid to the map and watch them also appear in the tree. Use the
    checkboxes to turn layers on and off. Drag and drop layers in the
    tree to change their order on the map. Select a layer by clicking on the
    node text, and remove it by clicking the "Remove from Map" button.

.. figure:: tree.png

    A tree view of the map's layers for convenient layer management

Looking at the New Code More Closely
````````````````````````````````````
First, let's have a look at the :ref:`tree configuration
<geoext.stores.tree.treepanel>` again to see what it consists of.

As we already saw, we can drag and drop tree nodes. This is enabled by
setting ``enableDD: true``. More interesting is the ``root`` property.
    
.. code-block:: javascript

    root: new GeoExt.tree.LayerContainer({
        expanded: true
    }),

Every tree needs to have a root node. GeoExt provides a special layer
container node type. Configured with the map panel's layer store as its
``layerStore`` config option, it will be populated with layer nodes for each of
the map's layers. Note that we omitted the ``layerStore`` config option. The
LayerContainer takes the ``layers`` property from the first MapPanel it finds
in the Ext JS registry in this case.

The nodes the LayerContainer is populated with are `GeoExt.tree.LayerNode
<http://geoext.org/lib/GeoExt/widgets/tree/LayerNode.html>`_ instances.
The container makes sure that the list of layers is always synchronized
with the map, and the node's checkbox controls the layer's visibility.

Surprisingly, adding a root node that has all map layers as children requires
less coding effort than the button to remove layers:

.. code-block:: javascript

    bbar: [{
        text: "Remove from Map",
        handler: function() {
            var node = app.tree.getSelectionModel().getSelectedNode();
            if (node && node.layer instanceof OpenLayers.Layer.WMS) {
                app.mapPanel.map.removeLayer(node.layer);
            }
        }
    }]

We already know the concept of a bottom toolbar from a :ref:`previous exercise
<geoext.stores.capabilities.bbar>`. The flesh of the above snippet is the handler
function that gets executed when the button is clicked. Like the grid, the
tree also has a selection model. The default selection model only supports
selection of one node at a time, and we can get the selected node using its
``getSelectedNode()`` method. All that is left to do is check if there is a
selected node, and if the layer is a WMS layer (we don't want to allow removal
of vector or other layers we might be adding manually), and remove the layer
from the map using the ``removeLayer()`` method of the ``OpenLayers.Map``
object.

Next Steps
----------

Now that we can control the content of the map using a tree, we will want a
:ref:`legend <geoext.stores.legend>` that explains the map content.
