.. _app_extra:

Extra Features
**************

We already saw that OpenLayers can interact with the HTTP service to retrieve attribute data. That attribute data is displayed in the info popup when the user clicks on the map.

To get a bit more familiar with OpenLayers, we will add another interactive feature: highlighting of county boundaries on hover. We will implement this for the ol3view template only, although the same could be achieved with the gxp template as well.

Working with Vector Data on the Client
--------------------------------------

The map tiles and feature attribute information we got from GeoServer was provided through the WMS service. For getting features with their geometries, we will be using the WFS service that GeoServer provides. OpenLayers has built-in support for WFS.

To get the interactive behaviour we want, we will have to do two things:

#. Configure a WFS loader and load all features of the census layer
#. Implement a listener to pointer events that highlights the features at the pointer position.

The SDK ships with a WFS loader, so the first thing to do is to include the loader in our application. This is achieved by adding it as a dependency at the top of the `censusapp/src/app/app.js` file:

.. code-block:: javascript
    :emphasize-lines: 6

    /**
     * Add all your dependencies here.
     *
     * @require Popup.js
     * @require LayersControl.js
     * @require WFSBBOXLoader.js
     */

Now we can use the loader to load all features of our census layer. Just add the code below to the very end of `censusapp/src/app/app.js`:

.. code-block:: javascript

    // Create a vector source with all features
    var source = new ol.source.Vector({
      projection: srsName
    });
    new app.WFSBBOXLoader({
      url: url,
      featurePrefix: featurePrefix,
      featureType: featureType,
      srsName: srsName,
      callback: function(data) {
        source.addFeatures(new ol.format.GeoJSON().readFeatures(data));
      }
    }).load(ol.proj.get(srsName).getExtent());

The vector source has a spatial index, and can efficiently be queried by coordinates. The final task is to hook up this functionality to a pointermove listener:

.. code-block:: javascript

    // Highlight the features at the pointer position
    var features = new ol.FeatureOverlay({
      map: map
    }).getFeatures();
    map.on('pointermove', function(evt) {
      features.clear();
      features.extend(source.getFeaturesAtCoordinate(evt.coordinate));
    });

Voila! We now have instant feedback when hovering over the map, showing us the boundaries of the county underneath the mouse cursor.
