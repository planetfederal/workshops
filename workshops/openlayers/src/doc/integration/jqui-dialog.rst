.. _openlayers.integration.jqui-dialog:

The jQuery UI Dialog
====================

If you are adding a map to a larger website, and you are already using jQuery UI for interface components, it makes good sense to create "popups" for your map that will be integrated with the style of the rest of your site. The jQuery UI ``dialog`` function provides a flexible way to produce themeable dialogs that serve a variety of purposes.

The :ref:`previous example <openlayers.integration.jqui-slider.example` started with existing markup and used the ``jQuery`` function to select and modify DOM elements. The ``jQuery`` function can also be used to create elements given a string of HTML.

The code below creates a ``<div>`` element and turns it into a modeless dialog:

.. code-block:: javascript

    jQuery("<div>Hello!</div>").dialog();

This technique is used in the tasks below to create dialogs populated with information from a feature's attribute values.


Displaying Feature Information in a Dialog
------------------------------------------

.. rubric:: Tasks

#.  At the end of the :ref:`previous section <openlayers.integration.jqui-slider>`, you should have something like the code below in your ``map.html`` file. Open this file in your text editor and confirm the contents are similar to the following:
    
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
                    #slider-id {
                        width: 492px;
                        margin: 10px;
                    }
                </style>
                <script src="openlayers/lib/OpenLayers.js"></script>
                <link rel="stylesheet" href="jquery-ui/css/smoothness/jquery-ui-1.8.14.custom.css" type="text/css">
                <script src="jquery-ui/js/jquery-1.5.1.min.js"></script>
                <script src="jquery-ui/js/jquery-ui-1.8.14.custom.min.js"></script>    </head>
            <body>
                <h1>My Map</h1>
                <div id="map-id"></div>
                <div id="slider-id"><div class="ui-slider-handle"></div>
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
                    $("#slider-id").slider({
                        value: 100,
                        slide: function(e, ui) {
                            base.setOpacity(ui.value / 100);
                        }
                    }); 

                </script>
            </body>
        </html>


#.  To this example, we'll be adding an ``OpenLayers.Control.SelectFeature`` control so that the user can select a feature. In your map initialization code, add the following `after` the creation of your ``buildings`` layer:
    
    .. code-block:: javascript
    
        var select = new OpenLayers.Control.SelectFeature([buildings]);
        map.addControl(select);
        select.activate();  

#.  Next we need to create a listener for the ``featureselected`` event on our ``buildings`` layer.  We'll create a dialog that populates with feature information, when the user selects a feature by clicking on it with the mouse.  In addition, we want to remove the dialog when a feature is unselected.  We can do this by listening for the ``featureunselected`` event.  Insert the following in your map initialization code somewhere `after` the creation of the ``buildings`` layer:
    
    .. code-block:: javascript

        var dialog;
        buildings.events.on({
            featureselected: function(event) {
                var feature = event.feature;
                var area = feature.geometry.getArea();
                var id = feature.attributes.key;
                var output = "Building: " + id + " Area: " + area.toFixed(2);
                dialog = $("<div title='Feature Info'>" + output + "</div>").dialog();
            },
            featureunselected: function() {
                dialog.dialog("destroy").remove();
            }
        });

#.  Save your changes to ``map.html`` and open the page in your browser: @workshop_url@/map.html


    .. figure:: jqui-dialog1.png
   
        A map that displays feature information in a dialog.


.. rubric:: Bonus Tasks

#.  Find the appropriate documentation to determine how to make the feature dialog with modal behavior.  Create a modal dialog for displaying feature information so a user will need to close it before interacting with anything else in the application.
    
#.  Experiment with editing the style declarations in the head of the page in order to change the look of the displayed information. You can use the jQuery ``addClass`` function to add a class name to an element before calling ``dialog()``.

