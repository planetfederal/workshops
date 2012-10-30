/**
 * Provide a custom editing panel for editing a multi-poly layer.
 * Not meant to be general purpose.
 */
var EditingPanel = OpenLayers.Class(OpenLayers.Control.Panel, {

    initialize: function(layer) {

        OpenLayers.Control.Panel.prototype.initialize.apply(this, [{}]);

        var navigate = new OpenLayers.Control.Navigation({
            title: "Pan Map"
        });
        
        var draw = new OpenLayers.Control.DrawFeature(
            layer, OpenLayers.Handler.Polygon, {
                title: "Draw Feature",
                handlerOptions: {multi: true}
            }
        );
        
        var edit = new OpenLayers.Control.ModifyFeature(layer, {
            title: "Modify Feature"
        });
        
        var del = new DeleteFeature(layer, {title: "Delete Feature"});
        
        var save = new OpenLayers.Control.Button({
            title: "Save Changes",
            trigger: function() {
                if(edit.feature) {
                    edit.selectControl.unselectAll();
                }
                // fails if no save strategy
                var strat = OpenLayers.Array.filter(
                    layer.strategies, 
                    function(s) {
                        return s instanceof OpenLayers.Strategy.Save;
                    }
                )[0];
                strat.save();
            },
            displayClass: "olControlSaveFeatures"
        });
        
        this.defaultControl = navigate;
        this.addControls([save, del, edit, draw, navigate]);

    },
    
    CLASS_NAME: "EditingPanel"    
});
