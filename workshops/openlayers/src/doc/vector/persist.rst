.. _openlayers.vector.persist:

Persisting Features
===================

Persistence of vector feature data is the job of an ``OpenLayers.Protocol``. The :abbr:`WFS (OGC Web Feature Service)` specification defines a protocol for reading and writing feature data. In this section, we'll look at an example that uses an ``OpenLayers.Protocol.WFS`` instance with a vector layer.

A full-fledged editing application involves more user interaction (and GUI elements) than is practical to demonstrate in a short example. However, we can add an ``OpenLayers.Control.Panel`` to a map that accomplishes a few of the basic editing tasks.

.. rubric:: Tasks

#.  Open your text editor and paste in the text from the start of the  :ref:`previous section <openlayers.vector.draw.example>`.  Save this as ``map.html``.

#.  OpenLayers doesn't provide controls for deleting or saving features.  The ``extras`` folder in this workshop includes code for those controls bundled together in a control panel. These controls are specific to editing a vector layer with multipolygon geometries, so they will work with our buildings example. In the ``<head>`` of your ``map.html`` document, **after** the OpenLayers script tag, insert the following to pull in the required code and stylesheet for the controls:
    
    .. code-block:: html
    
        <link rel="stylesheet" href="extras/editing-panel.css" type="text/css">
        <script src="extras/DeleteFeature.js"></script>
        <script src="extras/EditingPanel.js"></script>

#.  Now we'll give the ``buildings`` layer an ``OpenLayers.Strategy.Save``.  This strategy is designed to trigger commits on the protocol and deal with the results.  The ``buildings`` layer currently has a single strategy.  Modify the layer creation code to include another:
    
    .. code-block:: javascript
    
        var buildings = new OpenLayers.Layer.Vector("Buildings", {
            strategies: [
                new OpenLayers.Strategy.BBOX(),
                new OpenLayers.Strategy.Save()
            ],
            protocol: new OpenLayers.Protocol.WFS({
                version: "1.1.0",
                url: "/geoserver/wfs",
                featureType: "buildings",
                featureNS: "http://medford.opengeo.org",
                srsName: "EPSG:2270"
            })
        });

#.  Finally, we'll create the editing panel and add it to the map.  Somewhere in your map initialization code after creating the ``buildings`` layer, insert the following:

    .. code-block:: javascript
    
        var panel = new EditingPanel(buildings);
        map.addControl(panel);

#.  Now save your changes and load ``map.html`` in your browser: @workshop_url@/map.html
    

    .. figure:: persist1.png

        Modifying a building footprint.
