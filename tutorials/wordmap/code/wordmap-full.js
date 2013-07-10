// Ext.BLANK_IMAGE_URL = "http://cdn.sencha.com/ext/gpl/3.4.1.1/resources/images/default/s.gif";
// OpenLayers.ImgPath = "http://dev.openlayers.org/releases/OpenLayers-2.13/img/";

function getURLParameter(name) {
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
    );
}

Ext.util.CSS.swapStyleSheet('opengeo-theme', 'resources/css/xtheme-opengeo.css');

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
  var mapCenter = new OpenLayers.LonLat(-100,40).transform(geographicProj, mercatorProj);

  olMap = new OpenLayers.Map({
    projection: mercatorProj,
    displayProjection: geographicProj,
    units: "m",
    layers: [wmsLayer, osmLayer]
  });

  // A panel to hold HTML information about the active word
  var wordDescription = new Ext.Panel({
    html: "",
    border: false,
    height: 200,
    autoScroll:true
  });
  
  // A freeform text field to enter new words
  var wordField = new Ext.form.TextField({
    emptyText: "Enter a word",
    width: 180,
    hideLabel: true,
    listeners: {
      specialkey: function(field, e) {
        // Only update the word map when user hits 'enter' 
        if (e.getKey() == e.ENTER) {
          wmsLayer.mergeNewParams({viewparams: "word:"+field.getValue()});
          wordDescription.update("");
        }
      }
    }
  });

  // wordStore to read a JSON file of predefined words
  // [
  //   {"word":"Navajo", "desc":"A people"},
  //   {"word":"New York", "desc":"A city"}
  // ]  
  var wordStore = new Ext.data.JsonStore({
      url: "wordmap-full-list.json",
      fields: ["word", "desc"]
  });
  // Read the JSON file
  wordStore.load();

  // A list to select the predefined words
  var wordList = new Ext.list.ListView({
      store: wordStore,
      height: 180,
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
          var desc = wordStore.getAt(node).get('desc');
          // Update our WMS URL to map the new word
          wmsLayer.mergeNewParams({viewparams: "word:"+word});
          wordDescription.update(desc);
          // Update the text field to display the clicked word
          wordField.setValue(word);
        }
      }
  });
  
  // Ext.Viewport uses the whole browser window
  var mainPanel = new Ext.Viewport({
    layout: "fit",
    items: [{
      xtype: "panel",
      title: "OpenGeo Word Map",
      region: "center",
      layout: "border",
      items: [{
        xtype: "gx_mappanel",
        region: "center",
        title: false,
        height: "auto",
        map: olMap
      },{
        xtype: "panel",
        region: "west",
        title: false,
        width: 250,
        height: "auto",
        layout: "vbox",
        layoutConfig: {
          align: "stretch",
          padding: "10",
          defaultMargins: "5 5",
          flex: 1
        },
        items: [{
          xtype: "fieldset",
          title: "Enter a word",
          layout: "fit",
          items: [wordField]
        },{
          xtype: "fieldset",
          title: "Select a word",
          layout: "fit",
          height: 200,
          items: [wordList]
        },{
          xtype: "fieldset",
          title: "About this word",
          layout: "fit",
          items: [wordDescription]
        }]  
      }]
    }]
  });
  
  // In case we have external parameters, read them
  var word = getURLParameter("word");
  if ( word.length > 0 ) {    
    wmsLayer.mergeNewParams({viewparams: "word:"+word})
  }
  
  // OpenLayers like to be zoomed/centered near the end of things
  olMap.setCenter(mapCenter, 4);
  
});


