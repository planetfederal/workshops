/**
 * Add all your dependencies here.
 *
 * @require Popup.js
 * @require LayersControl.js
 */

// TUTORIAL CHANGE #1
// ========= config section ================================================
var url = '/geoserver/ows?';
var featurePrefix = 'county';
var featureType = 'taxlots';
var featureNS = 'http://county.us';
var srsName = 'EPSG:3857';
var geometryName = 'geom';
var geometryType = 'MultiPolygon';
var fields = ['ADDRESS1', 'CITY'];
var layerTitle = 'Tax Lots';
var infoFormat = 'application/vnd.ogc.gml/3.1.1'; // can also be 'text/html'
var center = [-13678000, 5210000];
var zoom = 15;
// =========================================================================
// !TUTORIAL CHANGE #1

// override the axis orientation for WMS GetFeatureInfo
var proj = new ol.proj.Projection({
  code: 'http://www.opengis.net/gml/srs/epsg.xml#4326',
  axis: 'enu'
});
ol.proj.addEquivalentProjections([ol.proj.get('EPSG:4326'), proj]);

// create a GML format to read WMS GetFeatureInfo response
var format = new ol.format.GML({featureNS: featureNS, featureType: featureType});

// create a new popup with a close box
// the popup will draw itself in the popup div container
// autoPan means the popup will pan the map if it's not visible (at the edges of the map).
var popup = new app.Popup({
  element: document.getElementById('popup'),
  closeBox: true,
  autoPan: true
});

// the tiled WMS source for our local GeoServer layer
var wmsSource = new ol.source.TileWMS({
  url: url,
  params: {'LAYERS': featurePrefix + ':' + featureType, 'TILED': true},
  serverType: 'geoserver'
});

// create a vector layer to contain the feature to be highlighted
var highlight = new ol.layer.Vector({
  style: new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: '#00FFFF',
      width: 3
    })
  }),
  source: new ol.source.Vector()
});

// when the popup is closed, clear the highlight
$(popup).on('close', function() {
  highlight.getSource().clear();
});

// create the OpenLayers Map object
// we add a layer switcher to the map with two groups:
// 1. background, which will use radio buttons
// 2. default (overlays), which will use checkboxes
var map = new ol.Map({
  controls: ol.control.defaults().extend([
    new app.LayersControl({
      groups: {
        background: {
          title: "Base Layers",
          exclusive: true
        },
        'default': {
          title: "Overlays"
        }
      }
    })
  ]),
  // add the popup as a map overlay
  overlays: [popup],
  // render the map in the 'map' div
  target: document.getElementById('map'),
  // use the Canvas renderer
  renderer: 'canvas',
  layers: [
    // MapQuest streets
    new ol.layer.Tile({
      title: 'Street Map',
      group: "background",
      source: new ol.source.MapQuest({layer: 'osm'})
    }),
    // MapQuest imagery
    new ol.layer.Tile({
      title: 'Aerial Imagery',
      group: "background",
      visible: false,
      source: new ol.source.MapQuest({layer: 'sat'})
    }),
    // MapQuest hybrid (uses a layer group)
    new ol.layer.Group({
      title: 'Imagery with Streets',
      group: "background",
      visible: false,
      layers: [
        new ol.layer.Tile({
          source: new ol.source.MapQuest({layer: 'sat'})
        }),
        new ol.layer.Tile({
          source: new ol.source.MapQuest({layer: 'hyb'})
        })
      ]
    }),
    // TUTORIAL CHANGE #10
    new ol.layer.Tile({
      title: layerTitle,
      source: wmsSource,
      opacity: 0.6
    }),
    // !TUTORIAL CHANGE #10
    highlight
  ],
  // initial center and zoom of the map's view
  view: new ol.View({
    center: center,
    zoom: zoom
  })
});

// register a single click listener on the map and show a popup
// based on WMS GetFeatureInfo
map.on('singleclick', function(evt) {
  var viewResolution = map.getView().getResolution();
  var url = wmsSource.getGetFeatureInfoUrl(
      evt.coordinate, viewResolution, map.getView().getProjection(),
      {'INFO_FORMAT': infoFormat});
  if (url) {
    if (infoFormat == 'text/html') {
      popup.setPosition(evt.coordinate);
      popup.setContent('<iframe seamless frameborder="0" src="' + url + '"></iframe>');
      popup.show();
    } else {
      $.ajax({
        url: url,
        success: function(data) {
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
            popup.hide();
          }
        }
      });
    }
  } else {
    popup.hide();
  }
});

// TUTORIAL CHANGE #5
$( "#address" ).autocomplete({

  // How many charaters before we fire the 'source' function?
  minLength: 1, 

  // Given a request string, do something to figure out what
  // a good set of options would be, and call the reponse function
  // with those options as an argument.
  // source: function( requestStr, responseFunc ) {},
  source: addressSource,
  
  // Given a selection event, do something with the 
  // ui element that was clicked on.
  // select: function( event, ui ) {}
  select: addressSelect

});
// !TUTORIAL CHANGE #5


// TUTORIAL CHANGE #6
// Given a key/value object, reformat into a 
// string like that desired by GeoServer SQL views
// for the viewparams entry.
function viewparamsToStr(obj) {
  var str = '';
  $.each(obj, function(k,v) {
    str.length && (str += ';');
    str += k + ':' + v;
  });
  return str;
};
// !TUTORIAL CHANGE #6


// TUTORIAL CHANGE #7
// Accept a string from the address form and call the WFS
// service to get a list of candidate matches. Takes in strings
// like "100 main" and call the responseFunc with an array of 
// possible match objects.
function addressSource( requestString, responseFunc ) {

  // Strip crazy (non-alpha) characters from the input string.
  var querystr = requestString.term.replace(/[^0-9a-zA-Z ]/g, "");

  // If there's nothing left after stripping, just return null.
  if ( querystr.length == 0 ) {
    response([]);
    return;
  }

  // Form the input parameters into a standard viewparams
  // object string.
  var viewParamsStr = viewparamsToStr({
    query: querystr
  });

  // Set up the parameters for our WFS call to the address_autocomplete
  // web service.
  var wfsParams = {
    service: 'WFS',
    version: '2.0.0',
    request: 'GetFeature',
    typeName: 'county:address_autocomplete',
    outputFormat: 'application/json',
    srsname: 'EPSG:3857',
    viewparams: viewParamsStr
  };

  // Call the WFS web service, and call the response on completion
  $.ajax({
    url: url,
    data: wfsParams,
    type: "GET",
    dataType: "json",

    // What to do once the HTTL call is complete?
    success: function(data, status, xhr) {

      // Parse the GeoJSON payload into a OL3 feature collection
      var geojson = new ol.source.GeoJSON({
          object: data
      });

      // Turn the feature collection into an array expected
      // by the autocomplete widget. Autocomplete expects an 
      // array of objects with at least a "label" and "value"
      // entry, and any other entries you feel like adding. 
      // We add the feature itself, so we have the option of
      // doing cool things with it in the "select" action of
      // the autocomplete widget.
      var arr = [];
      geojson.forEachFeature(function(feat) {
        arr.push({
          label: feat.get("address"),
          value: feat.get("address"),
          feature: feat
        });
      })

      // Call-back to the autocomplete widget now that
      // we have data to display.
      responseFunc( arr );
    }

  });

};
// !TUTORIAL CHANGE #7


// TUTORIAL CHANGE #8
// A point marker style using a flag image as the icon.
var flagStyle = new ol.style.Style({
  image: new ol.style.Icon({
    anchor: [0.2, 0.9],
    opacity: 0.75,
    scale: 0.25,
    src: 'flag.png'
  })
});
// !TUTORIAL CHANGE #8


// TUTORIAL CHANGE #9
// On a selection event, get the selected feature, center
// the map on that feature, and zoom close enough to see it.
// Clear the highlight layer of the previous selection, and 
// add the current selection.
function addressSelect( event, ui ) {
  
  // Zoom to the address point, at a "close enough" zoom
  var view = map.getView();
  var feat = ui.item.feature;
  var geom = feat.getGeometry();
  view.setCenter(geom.getFirstCoordinate());
  view.setZoom(18);

  // Over-ride the old polygon-based highlight style with a 
  // point marker style using a flag image as the icon.
  highlight.setStyle(flagStyle);

  // Add a flag marker to the map at the location of the selection
  var markerSource = highlight.getSource();
  markerSource.clear();
  markerSource.addFeature(feat);

}
// !TUTORIAL CHANGE #9




