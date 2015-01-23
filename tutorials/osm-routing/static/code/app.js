var geoserverUrl = '/geoserver';
var center = ol.proj.transform([-70.26, 43.67], 'EPSG:4326', 'EPSG:3857');
var zoom = 12;
var pointerDown = false;
var currentMarker = null;
var changed = false;
var routeLayer;
var routeSource;
var travelTime;
var travelDist;

// elements in HTML document
var info = document.getElementById('info');
var popup = document.getElementById('popup');

// format a single place name
function formatPlace(name) {
  if (name == null || name == '') {
    return 'unnamed street';
  } else {
    return name;
  }
}

// format the list of place names, which may be single roads or intersections
function formatPlaces(list) {
  var text;
  if (!list) {
    return formatPlace(null);
  }
  var names = list.split(',');
  if (names.length == 0) {
    return formatPlace(null);
  } else if (names.length == 1) {
    return formatPlace(names[0]);
  } else if (names.length == 2) {
    text = formatPlace(names[0]) + ' and ' + formatPlace(names[1]);
  } else {
    text = ' and ' + formatPlace(names.pop());
    names.forEach(function(name) {
      text = name + ', ' + text;
    });
  }

  return 'the intersection of ' + text;
}

// format times for display
function formatTime(time) {
  var mins = Math.round(time * 60);
  if (mins == 0) {
    return 'less than a minute';
  } else if (mins == 1) {
    return '1 minute';
  } else {
    return mins + ' minutes';
  }
}

// format distances for display
function formatDist(dist) {
  var units;
  dist = dist.toPrecision(2);
  if (dist < 1) {
    dist = dist * 1000;
    units = 'm';
  } else {
    units = 'km';
  }

  // make sure distances like 5.0 appear as just 5
  dist = dist.toString().replace(/\.0$/, '');
  return dist + units;
}

function createMarker(point, colour) {
  var marker = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.transform(point, 'EPSG:4326', 'EPSG:3857'))
  });

  marker.setStyle(
    [new ol.style.Style({
      image: new ol.style.Circle({
        radius: 6,
        fill: new ol.style.Fill({
          color: 'rgba(' + colour.join(',') + ', 1)'
        })
      })
    })]
  );
  marker.on('change', changeHandler);

  return marker;
}

var sourceMarker = createMarker([-70.26013, 43.66515], [0, 255, 0]);
var targetMarker = createMarker([-70.24667, 43.66996], [255, 0, 0]);

// create overlay to display the markers
var markerOverlay = new ol.FeatureOverlay({
  features: [sourceMarker, targetMarker],
});

// record when we move one of the source/target markers on the map
function changeHandler(e) {
  if (pointerDown) {
    changed = true;
    currentMarker = e.target;
  }
}

var moveMarker = new ol.interaction.Modify({
  features: markerOverlay.getFeatures(),
  tolerance: 20
});

// create overlay to show the popup box
var popupOverlay = new ol.Overlay({
  element: popup
});

// style routes differently when clicked
var selectSegment = new ol.interaction.Select({
  condition: ol.events.condition.click,
  style: new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: 'rgba(255, 0, 128, 1)',
        width: 8
    })
  })
});

// set the starting view
var view = new ol.View({
  center: center,
  zoom: zoom
});

// create the map with OSM data
var map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    })
  ],
  view: view,
  overlays: [popupOverlay, markerOverlay]
});
map.addInteraction(moveMarker);
map.addInteraction(selectSegment);

// show pop up box when clicking on part of route
var getFeatureInfo = function(coordinate) {
  var pixel = map.getPixelFromCoordinate(coordinate);
  var feature = map.forEachFeatureAtPixel(pixel, function(feature, layer) {
    if (layer == routeLayer) {
      return feature;
    }
  });

  var text = null;
  if (feature) { 
    text = '<strong>' + formatPlace(feature.get('name')) + '</strong><br/>';
    text += '<p>Distance: <code>' + formatDist(feature.get('distance')) + '</code></p>';
    text += '<p>Estimated travel time: <code>' + formatTime(feature.get('time')) + '</code></p>';
    text = text.replace(/ /g, '&nbsp;');
  }
  return text;
};

// display the popup when user clicks on a route segment
map.on('click', function(evt) {
  var coordinate = evt.coordinate;
  var text = getFeatureInfo(coordinate);
  if (text) {
    popupOverlay.setPosition(coordinate);
    popup.innerHTML = text;
    popup.style.display = 'block';
  }
});

// record start of click
map.on('pointerdown', function(evt) {
  pointerDown = true;
  popup.style.display = 'none';
});

// record end of click
map.on('pointerup', function(evt) {
  pointerDown = false;

  // if we were dragging a marker, recalculate the route
  if (currentMarker) {
    getVertex(currentMarker);
    getRoute();
    currentMarker = null;
 }
});

// timer to update the route when dragging
window.setInterval(function(){
  if (currentMarker && changed) {
    getVertex(currentMarker);
    getRoute();
    changed = false;
  }
}, 250);

// WFS to get the closest vertex to a point on the map
function getVertex(marker) {
  var coordinates = marker.getGeometry().getCoordinates();
  var url = geoserverUrl + '/wfs?service=WFS&version=1.0.0&' +
      'request=GetFeature&typeName=tutorial:nearest_vertex&' +
      'outputformat=application/json&' +
      'viewparams=x:' + coordinates[0] + ';y:' + coordinates[1];

  $.ajax({
     url: url,
     async: false,
     dataType: 'json',
     success: function(json) {
       loadVertex(json, marker == sourceMarker);
     }
  });
}

// load the response to the nearest_vertex layer
function loadVertex(response, isSource) {
  var geojson = new ol.format.GeoJSON();
  var features = geojson.readFeatures(response);
  if (isSource) {
    if (features.length == 0) {
      map.removeLayer(routeLayer);
      source = null;
      return;
    }
    source = features[0];
  } else {
    if (features.length == 0) {
      map.removeLayer(routeLayer);
      target = null;
      return;
    }
    target = features[0];
  }
}

// WFS to get the route using the source/target vertices
function getRoute() {
  // set up the source and target vertex numbers to pass as parameters
  var viewParams = [
    'source:' + source.getId().split('.')[1],
    'target:' + target.getId().split('.')[1],
    'cost:time'
  ];

  var url = geoserverUrl + '/wfs?service=WFS&version=1.0.0&' +
      'request=GetFeature&typeName=tutorial:shortest_path&' +
      'outputformat=application/json&' +
      '&viewparams=' + viewParams.join(';');

  // create a new source for our layer
  routeSource = new ol.source.ServerVector({
    format: new ol.format.GeoJSON(),
    strategy: ol.loadingstrategy.all,
    loader: function(extent, resolution) {
      $.ajax({
        url: url,
        dataType: 'json',
        success: loadRoute,
        async: false
      });
    },
  });

  // remove the previous layer and create a new one
  map.removeLayer(routeLayer);
  routeLayer = new ol.layer.Vector({
    source: routeSource,
    style: new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: 'rgba(0, 0, 255, 0.5)',
        width: 8
      })
    })
  });

  // add the new layer to the map
  map.addLayer(routeLayer);
}

// handle the response to shortest_path
var loadRoute = function(response) {
  selectSegment.getFeatures().clear();
  routeSource.clear();
  var features = routeSource.readFeatures(response)
  if (features.length == 0) {
    info.innerHTML = '';
    return;
  }

  routeSource.addFeatures(features);
  var time = 0;
  var dist = 0;
  features.forEach(function(feature) {
    time += feature.get('time');
    dist += feature.get('distance');
  });
  if (!pointerDown) {
    // set the route text
    var text = 'Travelling from <strong>' + formatPlaces(source.get('name')) + '</strong> to <strong>' + formatPlaces(target.get('name')) + '</strong>. ';
    text += 'Total distance ' + formatDist(dist) + '. ';
    text += 'Estimated travel time: ' + formatTime(time) + '.';
    info.innerHTML = text;

    // snap the markers to the exact route source/target
    markerOverlay.getFeatures().clear();
    sourceMarker.setGeometry(source.getGeometry());
    targetMarker.setGeometry(target.getGeometry());
    markerOverlay.getFeatures().push(sourceMarker);
    markerOverlay.getFeatures().push(targetMarker);
  }
}

getVertex(sourceMarker);
getVertex(targetMarker);
getRoute();
