.. _app_extra:

Extra Features
**************

We already saw that OpenLayers can interact with the HTTP service to retrieve attribute data. That attribute data is displayed in the info popup when the user clicks on the map.

To interact a bit more with the HTTP service, we will be using a WMS GetLegendGraphic request to add a legend to our map.

To get a bit more familiar with OpenLayers, we will add another interactive feature: highlighting of county boundaries on hover.

We will implement both extras for the ol3view template only, although the same could be achieved with the gxp template as well.

Adding a Legend
---------------

This task does not require any JavaScript code. It can be accomplished by adding an image element to the markup of our page, and style it with CSS. Both changes are made in `censusapp/index.html`.

Let's add the image element as a child of our map div first:

.. code-block:: html
   :emphasize-lines: 2

    <div id="map">
      <img class="legend img-rounded" src="/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.3.0&FORMAT=image/png&WIDTH=26&HEIGHT=18&STRICT=false&LAYER=opengeo:normalized&LEGEND_OPTIONS=fontName:sans-serif;fontSize:11;fontAntiAliasing:true;fontStyle:bold;fontColor:0xFFFFFF;bgColor:0x000000">
      <div id="popup" class="ol-popup">
      </div>
    </div>

The `src` of the image is a GetLegendGraphic WMS request, with some extended style options specific to GeoServer.

To position the legend correctly, we add some css to the style section of our page:

.. code-block:: html
   :emphasize-lines: 2-8

    <style>
      .legend {
        position: absolute;
        z-index: 1;
        left: 10px;
        bottom: 35px;
        opacity: 0.7;
      }
      .layers-control {

While we're at it, we will also adjust the opacity of the census layer so it does not entirely cover the background map. The css above sets the legend's opacity to 0.7, so we'll be using the same value for the layer to match the legend. This is a one-line change in `censusapp/src/app/app.js`:

.. code-block:: javascript
   :emphasize-lines: 4

    new ol.layer.Tile({
      title: layerTitle,
      source: wmsSource,
      opacity: 0.7
    }),


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
