/**
 * Provide a control for deleting features.
 */
var DeleteFeature = OpenLayers.Class(OpenLayers.Control, {

    initialize: function(layer, options) {
        OpenLayers.Control.prototype.initialize.apply(this, [options]);
        this.layer = layer;
        this.handler = new OpenLayers.Handler.Feature(
            this, layer, {click: this.clickFeature}
        );
    },

    clickFeature: function(feature) {
        // if feature doesn't have a fid, destroy it
        if(feature.fid == undefined) {
            this.layer.destroyFeatures([feature]);
        } else {
            feature.state = OpenLayers.State.DELETE;
            this.layer.events.triggerEvent(
                "afterfeaturemodified", {feature: feature}
            );
            this.layer.drawFeature(feature);
        }
    },

    setMap: function(map) {
        this.handler.setMap(map);
        OpenLayers.Control.prototype.setMap.apply(this, arguments);
    },

    CLASS_NAME: "DeleteFeature"
});
