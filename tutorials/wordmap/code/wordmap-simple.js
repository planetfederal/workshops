Ext.util.CSS.swapStyleSheet('opengeo-theme', 'resources/css/xtheme-opengeo.css');

// Use this word on startup
var startWord = "ocean";

// Base map
var osmLayer = new OpenLayers.Layer.OSM();

// Heat map + point map
var wmsLayer = new OpenLayers.Layer.WMS("WMS", 
  // Uncomment below to use your local server
  // "http://localhost:8080/geoserver/wms", 
  "http://apps.opengeo.org/geoserver/wms", 
  {
    format: "image/png8",
    transparent: true,
    layers: "opengeo:geonames,opengeo:geonames",
    styles: "point,heatmap"
  }, {
    opacity: 0.6,
    singleTile: true,
  });

// Start with map of startWord
wmsLayer.mergeNewParams({viewparams: "word:"+startWord});

// Map with projection into (required when mixing base map with WMS)
olMap = new OpenLayers.Map({
  projection: "EPSG:900913",
  units: "m",
  layers: [wmsLayer, osmLayer],
  center: [-10764594.0, 4523072.0],
  zoom: 4
});

// Take in user input, fire an event when complete
var textField = new Ext.form.TextField({
  value: startWord,
  listeners: {
    specialkey: function(fld, e) {
      // Only update the word map when user hits 'enter' 
      if (e.getKey() == e.ENTER) {
        wmsLayer.mergeNewParams({viewparams: "word:"+fld.getValue()});
      }
    }
  }
});

// Map panel, with text field embedded in top toolbar
var mapPanel = new GeoExt.MapPanel({
  title: "OpenGeo Geonames Heat Map",
  tbar: ["Enter a word to map:", textField],
  map: olMap
});

// Viewport wraps map panel in full-screen handler
var viewPort = new Ext.Viewport({
  layout: "fit",
  items: [mapPanel]
});

// Start the app!
Ext.onReady(function () {
  viewPort.show();
});


