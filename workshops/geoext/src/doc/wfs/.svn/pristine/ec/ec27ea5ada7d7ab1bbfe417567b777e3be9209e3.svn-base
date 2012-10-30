.. _geoext.wfs.editing:

Editing Features and Their Attributes
=====================================

We will now enhance our application by making the layer and its attributes
editable, and using WFS-T to commit changes.

Making Layer and Grid Editable
------------------------------

Let's modify our application to allow for editing feature geometries and
attributes. On the layer side this requires replacing the SelectFeature
control that the FeatureSelectionModel automatically creates with a
ModifyFeature control, and adding a DrawFeature control for creating new
features. On the grid side, we have to replace the GridPanel with an
EditorGridPanel, provide editors for the columns, and avoid multiple feature
selection in the selection model (only one feature can be edited at a time).

.. rubric:: Tasks

#.  Open :file:`map.html` in your text editor. Create controls for modifying
    and drawing features, by appending the following to the application's
    script block:
    
    .. code-block:: javascript

        var modifyControl = new OpenLayers.Control.ModifyFeature(
            vectorLayer, {autoActivate: true}
        );
        var drawControl = new OpenLayers.Control.DrawFeature(
            vectorLayer,
            OpenLayers.Handler.Polygon,
            {handlerOptions: {multi: true}}
        );
        controls.push(modifyControl, drawControl);

#.  Append code to bind the FeatureSelectionModel to the SelectFeature control
    that is auto-created with the ModifyFeature control, and to make sure that
    only one grid row is selected at a time:
    
    .. code-block:: javascript
    
        Ext.onReady(function() {
            var sm = app.featureGrid.getSelectionModel();
            sm.unbind();
            sm.bind(modifyControl.selectControl);
            sm.on("beforerowselect", function() { sm.clearSelections(); });
        });

#.  Append code to add Create and Delete buttons to the feature grid's toolbar:

    .. code-block:: javascript

        Ext.onReady(function() {
            var bbar = app.featureGrid.getBottomToolbar();
            bbar.add([{
                text: "Delete",
                handler: function() {
                    app.featureGrid.getSelectionModel().each(function(rec) {
                        var feature = rec.getFeature();
                        modifyControl.unselectFeature(feature);
                        vectorLayer.removeFeatures([feature]);
                    });
                }
            }, new GeoExt.Action({
                control: drawControl,
                text: "Create",
                enableToggle: true
            })]);
            bbar.doLayout();            
        });

#.  Find the featureGrid definition and change its xtype from "grid" to
    "editorgrid":
    
    .. code-block:: javascript
    
        xtype: "editorgrid",
        ref: "featureGrid",

#.  Find the columns definition for the featureGrid, and add appropriate
    editors. The final columns definition should look like this:
    
    .. code-block:: javascript

        columns: [
            {header: "owner", dataIndex: "owner", editor: {xtype: "textfield"}},
            {header: "agency", dataIndex: "agency", editor: {xtype: "textfield"}},
            {header: "name", dataIndex: "name", editor: {xtype: "textfield"}},
            {header: "usage", dataIndex: "usage", editor: {xtype: "textfield"}},
            {header: "parktype", dataIndex: "parktype", editor: {xtype: "textfield"}},
            {xtype: "numbercolumn", header: "number_fac", dataIndex: "number_fac",
                editor: {xtype: "numberfield"}},
            {xtype: "numbercolumn", header: "area", dataIndex: "area",
                editor: {xtype: "numberfield"}},
            {xtype: "numbercolumn", header: "len", dataIndex: "len",
                editor: {xtype: "numberfield"}}
        ],


#.  After saving your changes, point your browser to
    `<@workshop_url@/map.html>`_. You should see the new Delete and Create
    buttons, and when you select a feature you can modify its vertices.

.. figure:: editing.png

    A synchronized map and grid view of WFS features.

The Changes Explained
`````````````````````
For editing existing and creating new features, we use
`OpenLayers.Control.ModifyFeature
<http://dev.openlayers.org/releases/OpenLayers-2.10/doc/apidocs/files/OpenLayers/Control/ModifyFeature-js.html>`_
and `OpenLayers.Control.DrawFeature
<http://dev.openlayers.org/releases/OpenLayers-2.10/doc/apidocs/files/OpenLayers/Control/DrawFeature-js.html>`_.

Both controls are configured with our ``vectorLayer``. The DrawFeature control
needs to know which sketch handler to use for editing. Since our editing layer
is a polygon layer, we use `OpenLayers.Handler.Polygon
<http://dev.openlayers.org/releases/OpenLayers-2.10/doc/apidocs/files/OpenLayers/Handler/Polygon-js.html>`_
here, and configure it to create MultiPolygon geometries (as required by
GeoServer) by setting the ``multi`` option to true:

.. code-block:: javascript

    var modifyControl = new OpenLayers.Control.ModifyFeature(
        vectorLayer, {autoActivate: true}
    );
    var drawControl = new OpenLayers.Control.DrawFeature(
        vectorLayer,
        OpenLayers.Handler.Polygon,
        {handlerOptions: {multi: true}}
    );

The ``FeatureSelectionModel``, if just used for viewing, is sufficiently
configured with its built-in `OpenLayers.Control.SelectFeature
<http://dev.openlayers.org/releases/OpenLayers-2.10/doc/apidocs/files/OpenLayers/Control/SelectFeature-js.html>`_.
For editing, we need to bind it to the SelectFeature control that is
auto-created by the ModifyFeature control instead:

.. code-block:: javascript

    var sm = app.featureGrid.getSelectionModel();
    sm.unbind();
    sm.bind(modifyControl.selectControl);

Since it does not make sense to select multiple features for editing, we want
to make sure that only one feature is selected at a time:

.. code-block:: javascript

    sm.on("beforerowselect", function() { sm.clearSelections(); });

Instead of using this handler, we also could have configured the
``FeatureSelectionModel`` with the ``singleSelect`` option set to true.

The next change is that we want a bottom toolbar on the grid, with buttons for
deleting and creating features.

The "Delete" button is just a plain Ext.Button. When clicked, it performs the
action defined in its handler.

.. code-block:: javascript

    {
        text: "Delete",
        handler: function() {
            app.featureGrid.getSelectionModel().each(function(rec) {
                var feature = rec.getFeature();
                modifyControl.unselectFeature(feature);
                vectorLayer.removeFeatures([feature]);
            });
        }
    }

Inside the handler, we walk through the grid's current selection. Before
removing a record, we use the modifyControl's ``unselectFeature`` method to
remove the feature's editing vertices and unselect the feature, bringing the
layer to a clean state.

Thanks to our FeatureStore, a feature added to the layer will automatically
also show up in the grid. The "Create" button uses a `GeoExt.Action
<http://geoext.org/lib/GeoExt/widgets/Action.html>`_ to turn an OpenLayers
control into a button. It is important to understand that any OpenLayers
control can be added to a toolbar or menu by wrapping it into such an Action.
The ``enableToggle`` option is inherited from Ext.Action and means that the
button is a toggle, i.e. can be turned on and off:

.. code-block:: javascript

    new GeoExt.Action({
        control: drawControl,
        text: "Create",
        enableToggle: true
    })

After adding the new buttons, we call ``doLayout()`` on the toolbar, to make
sure that the buttons are rendered properly:

.. code-block:: javascript

    bbar.doLayout();            

.. rubric:: Bonus Task

.. Warning::
    This bonus exercise assumes that you have completed the :ref:`bonus
    exercise <geoext.wfs.grid.bonus>` from the previous chapter.

#.  In the ``reconfigure()`` function, configure editors for the grid
    columns: TextField for string types, and NumberField for all others. We
    also need to set the correct sketch handler for the DrawFeature control,
    depending on the ``geometryType`` of the layer we are editing. This is how
    the whole function should look with the changes applied:
    
    .. code-block:: javascript

        function reconfigure(store, url) {
            var fields = [], columns = [], geometryName, geometryType;
            // regular expression to detect the geometry column
            var geomRegex = /gml:(Multi)?(Point|Line|Polygon|Surface|Geometry).*/;
            // mapping of xml schema data types to Ext JS data types
            var types = {
                "xsd:int": "int",
                "xsd:short": "int",
                "xsd:long": "int",
                "xsd:string": "string",
                "xsd:dateTime": "string",
                "xsd:double": "float",
                "xsd:decimal": "float",
                "Line": "Path",
                "Surface": "Polygon"
            };
            store.each(function(rec) {
                var type = rec.get("type");
                var name = rec.get("name");
                var match = geomRegex.exec(type);
                if (match) {
                    // we found the geometry column
                    geometryName = name;
                    // Geometry type for the sketch handler:
                    // match[2] is "Point", "Line", "Polygon", "Surface" or "Geometry"
                    geometryType = types[match[2]] || match[2];
                } else {
                    // we have an attribute column
                    fields.push({
                        name: name,
                        type: types[type]
                    });
                    columns.push({
                        xtype: types[type] == "string" ?
                            "gridcolumn" :
                            "numbercolumn",
                        dataIndex: name,
                        header: name,
                        // textfield editor for strings, numberfield for others
                        editor: {
                            xtype: types[type] == "string" ?
                                "textfield" :
                                "numberfield"
                        }
                    });
                }
            });
            app.featureGrid.reconfigure(new GeoExt.data.FeatureStore({
                autoLoad: true,
                proxy: new GeoExt.data.ProtocolProxy({
                    protocol: new OpenLayers.Protocol.WFS({
                        url: url,
                        version: "1.1.0",
                        featureType: rawAttributeData.featureTypes[0].typeName,
                        featureNS: rawAttributeData.targetNamespace,
                        srsName: "EPSG:4326",
                        geometryName: geometryName,
                        maxFeatures: 250
                    })
                }),
                fields: fields
            }), new Ext.grid.ColumnModel(columns));
            app.featureGrid.store.bind(vectorLayer);
            app.featureGrid.getSelectionModel().bind(vectorLayer);
            
            // Set the correct sketch handler according to the geometryType
            drawControl.handler = new OpenLayers.Handler[geometryType](
                drawControl, drawControl.callbacks, drawControl.handlerOptions
            );
        }


Next Steps
----------

It is nice to be able to create, modify and delete features, but finally we
will need to save our changes. The :ref:`final section <geoext.wfs.wfst>` of
this module will teach you how to use the WFS-T functionality of OpenLayers
to commit changes to the server.
