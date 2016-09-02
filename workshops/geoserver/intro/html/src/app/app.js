if (!window.app) {
  window.app = {};
}
var app = window.app;

/**
 * @class
 * A popup that can be used to show information about a feature.
 * The map is the core component of OpenLayers. In its minimal configuration it
 * needs an element (a div that is normally a child of the map div):
 *
 *     var popup = new app.Popup({
 *       element: document.getElementById('popup')
 *     });
 *
 * A more complete configuration would be:
 *
 *     var popup = new app.Popup({
 *       element: document.getElementById('popup'),
 *       closeBox: true,
 *       offsetY: -25,
 *       autoPan: true
 *     });
 *
 * `closeBox` will determine whether or not an x will be shown which on click
 * close the popup.
 * `offsetX` and `offsetY` are offsets to be applied to the positioning of the
 * popup overlay.
 * `autoPan` will determine if the map will automatically be panned if the
 * popup is not completely visible.
 * The popup is added to the map by using the `overlays` configuration option
 * of the map.
 *
 * @constructor
 * @extends {ol.Overlay}
 * @param {Object} options Options.
 */
app.Popup = function(options) {
  this.autoPan = options.autoPan !== undefined ? options.autoPan : false;
  this.margin = options.margin !== undefined ? options.margin : 10;
  ol.Overlay.call(this, options);
  var me = this;
  if (options.closeBox === true) {
    $('<a href="#" id="popup-closer" class="ol-popup-closer"></a>').click(
      this.getElement(), function(evt) {
        $(me).trigger('close');
        evt.data.style.display = 'none';
        evt.target.blur();
        return false;
      }).appendTo($(this.getElement()));
  }
  $('<div id="popup-content"></div>').appendTo($(this.getElement()));
};

ol.inherits(app.Popup, ol.Overlay);

/**
 * Set the content to be shown in the popup.
 * @param {string} content The content to be shown.
 */
app.Popup.prototype.setContent = function(content) {
  document.getElementById('popup-content').innerHTML = content;
};

/**
 * Show this popup.
 */
app.Popup.prototype.show = function() {
  $(this.getElement()).show();
};

/**
 * Hide this popup.
 */
app.Popup.prototype.hide = function() {
  $(this.getElement()).hide();
};

/**
 * Set the position for this overlay.
 * @param {ol.Coordinate|undefined} position Position.
 */
app.Popup.prototype.setPosition = function(position) {
  ol.Overlay.prototype.setPosition.call(this, position);
  if (this.autoPan === true) {
    var map = this.getMap();
    var el = this.getElement();
    var margin = this.margin;
    window.setTimeout(function() {
      var resolution = map.getView().getResolution();
      var center = map.getView().getCenter();
      var popupOffset = $(el).offset();
      var mapOffset = $(map.getTarget()).offset();
      var offsetY = popupOffset.top - mapOffset.top;
      var mapSize = map.getSize();
      var offsetX = (mapOffset.left + mapSize[0])-(popupOffset.left+$(el).outerWidth(true));
      if (offsetY < 0 || offsetX < 0) {
        var dx = 0, dy = 0;
        if (offsetX < 0) {
          dx = (margin-offsetX)*resolution;
        }
        if (offsetY < 0) {
          dy = (margin-offsetY)*resolution;
        }
       map.getView().setCenter([center[0]+dx, center[1]+dy]);
      }
    }, 0);
  }
};

//Initialization

// create a new popup with a close box
// the popup will draw itself in the popup div container
// autoPan means the popup will pan the map if it's not visible (at the edges of the map).
var popup = new app.Popup({
  element: document.getElementById('popup'),
  closeBox: true,
  autoPan: true
});

var highlight = {};
var getHighlightLayer = function() {
  // create a vector layer to contain the feature to be highlighted
  highlight = new ol.layer.Vector({
    style: new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: '#00FFFF',
        width: 3
      })
    }),
    meta: true,
    source: new ol.source.Vector()
  });

  // when the popup is closed, clear the highlight
  $(popup).on('close', function() {
    highlight.getSource().clear();
  });
  return highlight;
};
var showPopup = true;

var setShowPopup = function(state) {
  showPopup = state;
}


var registerPopup = function(map) {
  // register a single click listener on the map and show a popup
  // based on WMS GetFeatureInfo
  map.on('singleclick', function(evt) {
    if (!showPopup) {
      return;
    }

    var viewResolution = map.getView().getResolution();

    //Iterate through layers, do a getFeature against each
    var layers = map.getLayers().getArray();
    var urls = [];
    for (var i = 0; i < layers.length; i++) {
      if (layers[i].group != "background" && layers[i].getVisible()) {
        var source = layers[i].getSource();
        if (source.getGetFeatureInfoUrl) {
          var url = {wfsUrl:source.getGetFeatureInfoUrl(
            evt.coordinate, viewResolution, map.getView().getProjection(),
            {'INFO_FORMAT': infoFormat}), layer: layers[i]};
          if (url.wfsUrl) {
            urls.push(url);
          }
        }
      }
    }
    //Grab topmost layer
    if (urls.length > 0) {
      if (infoFormat == 'text/html') {
        popup.setPosition(evt.coordinate);
        popup.setContent('<iframe seamless frameborder="0" src="' + urls[urls.length-1].wfsUrl + '"></iframe>');
        popup.show();
      } else {
        var showFeatures = function(urls, index) {
          $.ajax({
            url: urls[index].wfsUrl,
            success: function(data) {
              var name = urls[index].layer.get('name').split(':');
              var xml = $($.parseXML(data));
              var ns = $(xml[0].childNodes[0]).attr('xmlns:'+name[0]);
              var format = new ol.format.GML({featureNS: ns, featureType: name[1]});
              var features = format.readFeatures(data);
              
              highlight.getSource().clear();
              if (features && features.length >= 1 && features[0]) {
                var feature = features[0];
                var html = '<table class="table table-striped table-bordered table-condensed">';
                var values = feature.getProperties();
                var hasContent = false;
                for (var key in values) {
                  if (key !== 'the_geom' && key !== 'boundedBy') {
                    html += '<tr><td>' + key + '</td><td>' + values[key] + '</td></tr>';
                    hasContent = true;
                  }
                }
                if (hasContent === true) {
                  popup.setPosition(evt.coordinate);
                  popup.setContent(html);
                  popup.show();
                }
                feature.getGeometry().transform('EPSG:4326', 'EPSG:3857');
                highlight.getSource().addFeature(feature);
              } else {
                if (index > 0) {
                  showFeatures(urls, index-1);
                }
                popup.hide();
              }
            }
          });
        };
        showFeatures(urls, urls.length-1);
        
      }
    } else {
      popup.hide();
    }
  });
};

/**
 * Options for app.WFSBBOXLoader.
 * @typedef {Object} WFSBBOXLoaderOptions
 * @property {string} url - The OnlineResource of the WFS.
 * @property {string} featurePrefix - The prefix for the featureNS.
 * @property {string} featureType - The name of the feature type to use.
 * @property {string} srsName - The srsName to use, normally the view's
 * projection.
 * @property {string} outputFormat - The output format to use. Defaults to
 * 'application/json'.
 * @property {function} callback - The callback to call when done.
 */

/**
 * @class
 * The WFSBBOXLoader is a helper function for having a BBOX strategy with a
 * WFS protocol.
 *
 * @constructor
 * @param {WFSBBOXLoaderOptions} options Options.
 */
app.WFSBBOXLoader = function(options) {
  this.url_ = options.url;
  this.featurePrefix_ = options.featurePrefix;
  this.featureType_ = options.featureType;
  this.srsName_ = options.srsName;
  this.outputFormat_ = 'application/json';
  this.callback_ = options.callback;
};

/**
 * Load features from the WFS in a certain extent.
 * @param {ol.Extent} extent The extent to query for.
 */
app.WFSBBOXLoader.prototype.load = function(extent) {
  var wfs = this.url_;
  var featureType = this.featurePrefix_ + ':' + this.featureType_;
  var outputFormat = this.outputFormat_;
  var url = wfs + 'service=WFS&' +
    'version=1.1.0&request=GetFeature&typename=' + featureType + '&' +
    'outputFormat=' + outputFormat + '&srsname=' + this.srsName_ + '&bbox=' +
    extent.join(',') + ',' + this.srsName_;
  var me = this;
  $.ajax({
    url: url,
    context: extent
  }).then(function(response) {
    me.callback_.call(this, response);
  });
};

/*
 * Map creation and utilities
 */



// create the OpenLayers Map object given a list of layers
// we add a layer switcher to the map with two groups:
// 1. background, which will use radio buttons
// 2. default (overlays), which will use checkboxes
var map = {};
var createMap = function (layers, controls, overlays, registrationFunctions) {
  if (map && map.getView) {
    center = map.getView().getCenter();
    zoom = map.getView().getZoom();
  } 
  if (map.getViewport && map.getViewport()) {
    map.getViewport().remove();
  }
  map = new ol.Map({
    controls: ol.control.defaults().extend(controls),
    // add the popup as a map overlay
    overlays: overlays,
    // render the map in the 'map' div
    target: document.getElementById('map'),
    // use the Canvas renderer
    renderer: 'canvas',
    layers: layers,
    // initial center and zoom of the map's view
    view: new ol.View({
      center: center,
      zoom: zoom
    })
  });

  for (var i = 0; i < registrationFunctions.length; i++) {
    registrationFunctions[i](map);
  }

  return map;
}

/**
 * S301 S5.4
 *
 * @require Popup.js
 * @require WFSBBOXLoader.js
 * @require Map.js
 */

// ========= config section ================================================
var url = 'http://localhost:8080/geoserver/ows?';
var srsName = 'EPSG:900913';
var center = [-10764594.758211, 4523072.3184791];
var zoom = 3;
var infoFormat = 'application/vnd.ogc.gml/3.1.1'; // can also be 'text/html'

var layerNames = ['earth:earthmap'];
var layers = [];
layerNames.forEach(function(layerName) {
  layers.push(new ol.layer.Tile({
    title: 'Layer',
    name: layerName,
    editable: true,
    source: new ol.source.TileWMS({
      url: 'http://localhost:8080/geoserver/ows?',
      params: {'LAYERS': layerName, 'TILED': true},
      serverType: 'geoserver'
    })
  }));
});
layers.push(getHighlightLayer());
var controls = [];
var overlays = [popup];
var registrationFunctions = [registerPopup];


// override the axis orientation for WMS GetFeatureInfo
var proj = new ol.proj.Projection({
  code: 'http://www.opengis.net/gml/srs/epsg.xml#4326',
  axis: 'enu'
});
ol.proj.addEquivalentProjections([ol.proj.get('EPSG:4326'), proj]);
// =========================================================================

//$("span.app-title").html("Features");
createMap(layers, controls, overlays, registrationFunctions);


