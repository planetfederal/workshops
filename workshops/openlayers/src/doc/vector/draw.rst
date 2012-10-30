.. _openlayers.vector.draw:

Creating New Features
=====================

OpenLayers provides controls for drawing and modifying vector features. The ``OpenLayers.Control.DrawFeature`` control can be used in conjunction with an ``OpenLayers.Handler.Point``, an ``OpenLayers.Handler.Path``, or an ``OpenLayers.Handler.Polygon`` instance to draw points, lines, polygons, and their multi-part counterparts. The ``OpenLayers.Control.ModifyFeature`` control can be used to allow modification of geometries for existing features.

In this section, we'll add a control to the map for drawing new polygon features. As with the other examples in this workshop, this is not supposed to be a complete working application--as it does not allow editing of attributes or saving of changes. We'll take a look at persistence in the :ref:`next section <openlayers.vector.persist>`.

.. rubric:: Tasks

#.  We'll start with a working example that displays building footprints in a vector layer over a base layer.  Open your text editor and save the following as ``map.html`` in the root of your workshop directory:
    
    .. _openlayers.vector.draw.example:
    
    .. code-block:: html
    
        <!DOCTYPE html>
        <html>
            <head>
                <title>My Map</title>
                <link rel="stylesheet" href="openlayers/theme/default/style.css" type="text/css">
                <style>
                    #map-id {
                        width: 512px;
                        height: 256px;
                    }
                    </style>
                <script src="openlayers/lib/OpenLayers.js"></script>
            </head>
            <body>
                <h1>My Map</h1>
                <div id="map-id"></div>
                <script>
                    var medford = new OpenLayers.Bounds(
                        4284890, 253985,
                        4288865, 257980
                    );
                    var map = new OpenLayers.Map("map-id", {
                        projection: new OpenLayers.Projection("EPSG:2270"),
                        units: "ft",
                        maxExtent: medford,
                        restrictedExtent: medford,
                        maxResolution: 2.5,
                        numZoomLevels: 5
                    });

                    var base = new OpenLayers.Layer.WMS(
                        "Medford Streets & Buildings",
                        "/geoserver/wms",
                        {layers: "medford"}
                    );
                    map.addLayer(base);

                    var buildings = new OpenLayers.Layer.Vector("Buildings", {
                        strategies: [new OpenLayers.Strategy.BBOX()],
                        protocol: new OpenLayers.Protocol.WFS({
                            version: "1.1.0",
                            url: "/geoserver/wfs",
                            featureType: "buildings",
                            featureNS: "http://medford.opengeo.org",
                            srsName: "EPSG:2270"
                        })
                    });
                    map.addLayer(buildings);

                    map.zoomToMaxExtent();
                </script>
            </body>
        </html>

#.  Open this ``map.html`` example in your browser to confirm that buildings are displayed over the base layer:  @workshop_url@/map.html

#.  To this example, we'll be adding a control to draw features.  In order that users can also navigate with the mouse, we don't want this control to be active all the time.  We need to add some elements to the page that will allow for control activation and deactivation.  In the ``<body>`` of your document, add the following markup.  (Placing it right after the map viewport element ``<div id="map-id"></div>`` makes sense.):

    .. code-block:: html
    
        <input id="toggle-id" type="checkbox">
        <label for="toggle-id">draw</label>        

#.  Now we'll create an ``OpenLayers.Control.DrawFeature`` control to add features to the buildings layer.  We construct this layer with an ``OpenLayers.Handler.Polygon`` to allow drawing of polygons.  In your map initialization code, add the following somewhere after the creation of the ``buildings`` layer:
    
    .. code-block:: javascript
    
        var draw = new OpenLayers.Control.DrawFeature(
            buildings, OpenLayers.Handler.Polygon
        );
        map.addControl(draw);

#.  Finally, we'll add behavior to the ``<input>`` element in order to activate and deactivate the draw control when the user clicks the checkbox.  We'll also call the ``toggle`` function when the page loads to synchronize the checkbox and control states.  Add the following to your map initialization code:
    
    .. code-block:: javascript

        function toggle() {
            if (document.getElementById("toggle-id").checked) {
                draw.activate();
            } else {
                draw.deactivate();
            }
        }
        document.getElementById("toggle-id").onclick = toggle;
        toggle();            

#.  Save your changes and reload ``map.html`` in your browser: @workshop_url@/map.html


    .. figure:: draw1.png

        A control for adding features to a vector layer.
