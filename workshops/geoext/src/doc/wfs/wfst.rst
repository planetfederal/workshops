.. _geoext.wfs.wfst:

Committing Feature Modifications Over WFS-T
===========================================

Until GeoExt also provides writers, we have to rely on OpenLayers for writing
modifications back to the WFS. This is not a big problem though, because WFS-T
support in OpenLayers is solid. But it requires us to take some extra care of
feature states.

Managing Feature States
-----------------------

For keeping track of "create", "update" and "delete" operations, OpenLayers
vector features have a ``state`` property. The WFS protocol relies on this
property to determine which features to commit using an "Insert", "Update" or
"Delete" transaction. So we need to make sure that the ``state`` property gets
set properly:

* ``OpenLayers.State.INSERT`` for features that were just created. We do not
  need to do anything here, because the DrawFeature control handles this for
  us.
* ``OpenLayers.State.UPDATE`` for features with modified attributes, except
  for features that have ``OpenLayers.State.INSERT`` set already. For modified
  geometries, the ModifyFeature control handles this.
* ``OpenLayers.State.DELETE`` for features that the user wants to delete,
  except for features that have ``OpenLayers.State.INSERT`` set, which can be
  removed.

.. rubric:: Tasks

#.  Open :file:`map.html` in your text editor. Find the "Delete" button's
    handler and change it so it properly sets the DELETE feature state and
    re-adds features to the layer so the server knows we want to delete them:
    
    .. code-block:: javascript

        handler: function() {
            app.featureGrid.store.featureFilter = new OpenLayers.Filter({
                evaluate: function(feature) {
                    return feature.state != OpenLayers.State.DELETE;
                }
            });
            app.featureGrid.getSelectionModel().each(function(rec) {
                var feature = rec.getFeature();
                modifyControl.unselectFeature(feature);
                vectorLayer.removeFeatures([feature]);
                if (feature.state != OpenLayers.State.INSERT) {
                    feature.state = OpenLayers.State.DELETE;
                    vectorLayer.addFeatures([feature]);
                }
            });
        }
    
Understanding the Code
``````````````````````
By setting the ``featureFilter`` on the store we prevent the feature from being
re-added to the store. In OpenLayers, features with DELETE state won't be
rendered, but in Ext JS, if we do not want a deleted feature to show up in the
grid, we have to make sure that it is not in the store.

Also note that after removing the deleted feature from the ``vectorLayer``,
we add it again unless it has an INSERT state (but it won't show up because
of OpenLayers state handling and the ``featureFilter``). This is necessary
because the transaction when saving changes needs to submit information about
deleted features, so they can be deleted on the server.


Adding a Save Button
--------------------

Saving feature modifications the OpenLayers way usually requires the vector
layer to be configured with an `OpenLayers.Strategy.Save
<http://dev.openlayers.org/releases/OpenLayers-2.10/doc/apidocs/files/OpenLayers/Strategy/Save-js.html>`_.
But since we have a GeoExt store (and not an OpenLayers layer) configured with
the WFS protocol here, we cannot do that. Instead, we can call the protocol's
``commit()`` method directly to save changes.

.. rubric:: Tasks

#.  Find the definition of the grid toolbar's Delete and Create buttons in your
    :file:`map.html` file and add the "Save" button configuration and handler.
    When done, the whole buttons definition should look like this:
    
    .. code-block:: javascript

        bbar.add([{
            text: "Delete",
            handler: function() {
                app.featureGrid.store.featureFilter = new OpenLayers.Filter({
                    evaluate: function(feature) {
                        return feature.state != OpenLayers.State.DELETE;
                    }
                });
                app.featureGrid.getSelectionModel().each(function(rec) {
                    var feature = rec.getFeature();
                    modifyControl.unselectFeature(feature);
                    vectorLayer.removeFeatures([feature]);
                    if (feature.state != OpenLayers.State.INSERT) {
                        feature.state = OpenLayers.State.DELETE;
                        vectorLayer.addFeatures([feature]);
                    }
                });
            }
        }, new GeoExt.Action({
            control: drawControl,
            text: "Create",
            enableToggle: true
        }), {
            text: "Save",
            handler: function() {
                app.featureGrid.store.proxy.protocol.commit(
                    vectorLayer.features, {
                        callback: function() {
                            var layers = app.mapPanel.map.layers;
                            for (var i=layers.length-1; i>=0; --i) {
                                layers[i].redraw(true);
                            }
                            app.featureGrid.store.reload();
                        }
                });
            }
        }]);
 
#.  Save your file and reload :file:`map.html`. Make some
    changes and hit "Save". Reload the page to see that your changes were
    persisted.

.. figure:: wfst.png

    Application with "Save" button and a persisted feature after reloading.

The Commit Callback Explained
`````````````````````````````
By calling the ``commit()`` method with a callback option, we can perform
actions when the commit operation has completed. In this case, we want to
redraw all layers to reflect the changes in WMS and group layers. And we also
reload the feature store, to reset all feature states and have all features
with their correct feature ids.

.. code-block:: javascript

    callback: function() {
        for (var i=layers.length-1; i>=0; --i) {
            layers[i].redraw(true);
        }
        app.featureGrid.store.reload();
    }

Note that reloading the store is only necessary for GeoServer layers that
use a shapefile as data store, because the WFS Insert doesn't report the
inserted feature ids for those.

Conclusion
----------

You have successfully created a WFS based feature editor. GeoExt makes working
with features easy, thanks to its FeatureStore. Although there is no write
support yet for the FeatureStore in GeoExt, saving changes via WFS-T is easy
because of the solid WFS-T support in OpenLayers and the interoperability
between GeoExt and OpenLayers.
