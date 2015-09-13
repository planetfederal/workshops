<?xml version="1.0" encoding="UTF-8"?>
<sld:StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:sld="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml" version="1.0.0">
  <sld:UserLayer>
    <sld:UserStyle>
      <sld:Name>road_dynamic</sld:Name>
      <sld:Title/>
      <sld:FeatureTypeStyle>
        <sld:Name>simplified</sld:Name>
        <sld:FeatureTypeName>Feature</sld:FeatureTypeName>
        <sld:Rule>
          <sld:Name>simplified</sld:Name>
          <sld:MinScaleDenominator>9000000.0</sld:MinScaleDenominator>
          <sld:LineSymbolizer>
            <sld:Geometry><ogc:PropertyName>geom</ogc:PropertyName></sld:Geometry>
            <sld:Stroke>
              <sld:CssParameter name="stroke">#666666</sld:CssParameter>
            </sld:Stroke>
          </sld:LineSymbolizer>
        </sld:Rule>
        <sld:Rule>
          <sld:Name>origional</sld:Name>
          <sld:MaxScaleDenominator>9000000.0</sld:MaxScaleDenominator>
          <sld:LineSymbolizer>
            <sld:Geometry><ogc:PropertyName>geom</ogc:PropertyName></sld:Geometry>
            <sld:Stroke>
              <sld:CssParameter name="stroke">#222222</sld:CssParameter>
            </sld:Stroke>
          </sld:LineSymbolizer>
        </sld:Rule>
      </sld:FeatureTypeStyle>
    </sld:UserStyle>
  </sld:UserLayer>
</sld:StyledLayerDescriptor>