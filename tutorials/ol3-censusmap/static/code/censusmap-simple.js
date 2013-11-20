// Base map
var osmLayer = new ol.layer.Tile({source: new ol.source.OSM()});

// Census map layer
var wmsLayer = new ol.layer.Image({
  source: new ol.source.ImageWMS({
    url: 'http://apps.opengeo.org/geoserver/wms',
    params: {'LAYERS': 'opengeo:normalized'}
  }),
  opacity: 0.6
});

// Map object
olMap = new ol.Map({
  target: 'map',
  renderer: ol.RendererHint.CANVAS,
  layers: [osmLayer, wmsLayer],
  view: new ol.View2D({
    center: [-10764594.0, 4523072.0],
    zoom: 5
  })
});

// Add behaviour to dropdown
var topics = document.getElementById('topics');
topics.onchange = function() {
  wmsLayer.getSource().updateParams({
    'viewparams': 'column:' + topics.options[topics.selectedIndex].value
  });
};

// Load variables into dropdown
var xhr = new XMLHttpRequest();
xhr.open("GET", "../data/DataDict.txt");
xhr.onload = function() {
  var lines = xhr.responseText.split('\n');
  // We start at line 3 - line 1 is column names, line 2 is not a variable
  for (var i = 2, ii = lines.length; i < ii; ++i) {
    var option = document.createElement('option');
    option.value = lines[i].substr(0, 10).trim();
    option.innerHTML = lines[i].substr(10, 105).trim();
    topics.appendChild(option);
  }
};
xhr.send();

// Add behaviour to the popup's close button
var popupContainer = document.getElementById('popup');
document.getElementById('popup-closer').onclick = function() {
  popupContainer.style.display = 'none';
  return false;
};

// Create an ol.Overlay with the popup so it is anchored to the map
var popup = new ol.Overlay({
  element: popupContainer
});
olMap.addOverlay(popup);

// Handle map clicks to send a GetFeatureInfo request and open the popup
olMap.on('singleclick', function(evt) {
  olMap.getFeatureInfo({
    pixel: evt.getPixel(),
    success: function (info) {
      var mapCoordinate = evt.getCoordinate();
      popup.setPosition(mapCoordinate);
      document.getElementById('popup-content').innerHTML = info.join('');
      popupContainer.style.display = 'block';
    }
  });
});
