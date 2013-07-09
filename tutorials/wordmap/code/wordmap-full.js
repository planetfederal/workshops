// Ext.BLANK_IMAGE_URL = "http://cdn.sencha.com/ext/gpl/3.4.1.1/resources/images/default/s.gif";
// OpenLayers.ImgPath = "http://dev.openlayers.org/releases/OpenLayers-2.13/img/";

Ext.onReady(function () {

  var osmLayer = new OpenLayers.Layer.OSM();
  
  var wmsLayer = new OpenLayers.Layer.WMS("WMS", "http://localhost:8080/geoserver/wms", {
    format: "image/png",
    transparent: true,
    layers: "opengeo:geonames,opengeo:geonames",
    styles: "point,heatmap"
  }, {
    opacity: 0.6,
    singleTile: true,
  });

  var geographicProj = new OpenLayers.Projection("EPSG:4326");
  var mercatorProj = new OpenLayers.Projection("EPSG:900913");
  var mapCenter = new OpenLayers.LonLat(-110,45).transform(geographicProj, mercatorProj);

  olMap = new OpenLayers.Map({
    projection: mercatorProj,
    displayProjection: geographicProj,
    units: "m",
    layers: [wmsLayer, osmLayer],
    center: mapCenter,
    zoom: 7
  });

  var wordField = new Ext.form.TextField({
    emptyText: "Enter a word",
    padding: 5,
    width: 182,
    listeners: {
      specialkey: function(field, e) {
        // Only update the word map when user hits 'enter' 
        if (e.getKey() == e.ENTER) {
          wmsLayer.mergeNewParams({viewparams: "word:"+field.getValue()});
        }
      }
    }
  });

  // wordStore consumes this kind of JSON:
  // [
  //   {"word":"Navajo"},
  //   {"word":"New York"}
  // ]  
  var wordStore = new Ext.data.JsonStore({
      url: "wordmap-list.json",
      fields: ["word"]
  });
  // Read the JSON file
  wordStore.load();

  var listView = new Ext.list.ListView({
      store: wordStore,
      width: 182,
      hideHeaders: true,
      emptyText: 'No words available',
      columns: [{
          dataIndex: 'word'
      }],
      listeners: {
        click: function(field, node) {
          // Click returns the index of the clicked record.
          // Get the record, then read the word from it.
          var word = wordStore.getAt(node).get('word');
          // Update our WMS URL to map the new word
          wmsLayer.mergeNewParams({viewparams: "word:"+word});
          // Update the text field to display the clicked word
          wordField.setValue(word);
        }
      }
  });

  // Panel to hold the text field and list of suggested words
  var sidePanel = new Ext.Panel({
    region: "west",
    layout: "vbox",
    width: 200,
    title: "Enter a word...",
    padding: 6,
    items: [wordField, listView]
  });
  
  // Panel to hold the map
  var mapPanel = new GeoExt.MapPanel({
    region: "center",
    title: "OpenGeo Word Map",
    height: "auto",
    map: olMap
  });
  
  // Viewport takes up the whole browser window
  var mainPanel = new Ext.Viewport({
    layout: "border",
    items: [mapPanel, sidePanel]
  });

  // Start with no word in the field
  updateWord("");

});


