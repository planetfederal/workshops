
// Base map
var osmLayer = new OpenLayers.Layer.OSM();

// Heat map + point map
var wmsLayer = new OpenLayers.Layer.WMS("WMS", 
  "http://apps.opengeo.org/geoserver/wms", 
  {
    format: "image/png8",
    transparent: true,
    layers: "opengeo:normalized"
  }, {
    opacity: 0.6,
  }
);

// Map with projection into (required when mixing base map with WMS)
olMap = new OpenLayers.Map({
  projection: "EPSG:900913",
  units: "m",
  layers: [wmsLayer, osmLayer]
});


var columnInfo = new Ext.data.JsonStore({
  url: "DataDict.json",
  fields: ["name", "desc", "unit", "dec", "total", "min", "max", "source"]
});
// Read the JSON file
columnInfo.load();

var censusField = new Ext.form.ComboBox({
  store: columnInfo,
  displayField: "desc",
  mode: "local",
  width: 400,
  triggerAction: "all",
  emptyText:"Choose a column...",
  listeners: {
    select: function(combo, rec, idx) {
      var vp = { viewparams: "column:"+rec.get("name") };
      wmsLayer.mergeNewParams(vp);
      // control.vendorParams = vp;
    }
  } 
});



// control = new OpenLayers.Control.WMSGetFeatureInfo({
//     autoActivate: true,
//     infoFormat: "application/vnd.ogc.gml",
//     maxFeatures: 3,
//     eventListeners: {
//         "getfeatureinfo": function(e) {
//             var items = [];
//             Ext.each(e.features, function(feature) {
//                 items.push({
//                     xtype: "propertygrid",
//                     title: feature.fid,
//                     source: feature.attributes
//                 });
//             });
//             new GeoExt.Popup({
//                 title: "Feature Info",
//                 width: 250,
//                 height: 350,
//                 layout: "accordion",
//                 map: viewPort.mappanel,
//                 location: e.xy,
//                 items: items
//             }).show();
//         }
//     }
// });
// 
// olMap.addControl(control);

// Viewport wraps map panel in full-screen handler
var viewPort = new Ext.Viewport({
  layout: "fit",
  items: [{
    xtype: "gx_mappanel",
    ref: "mappanel",
    title: "Census Variables by County",
    tbar: [
      "Select a column to map: ", 
      censusField, 
      "->", 
      "Below Average",
      {
        xtype: "box",
        html: "<img src='colors.png'/>"
      },
      "Above Average"],
    map: olMap
  }]
});

olMap.setCenter([-10764594.0, 4523072.0],5);

// Fire off the ExtJS 
Ext.onReady(function () {
  viewPort.show();
});


