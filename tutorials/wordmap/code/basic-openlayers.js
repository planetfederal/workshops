function initMap() {
  
    var map = new OpenLayers.Map("map");
    
    var wms = new OpenLayers.Layer.WMS("GeoServer WMS", 
      "http://localhost:8080/geoserver/wms", 
      {
        layers: "usa:states,opengeo:geonames"
      });
      
    wms.mergeNewParams({viewparams: "word:Navajo"});
    map.addLayer(wms);
    map.setCenter(new OpenLayers.LonLat(-100, 38), 5);

}
