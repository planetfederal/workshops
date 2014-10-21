<?xml version="1.0" encoding="ISO-8859-1"?>
<StyledLayerDescriptor version="1.0.0" 
    xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" 
    xmlns="http://www.opengis.net/sld" 
    xmlns:ogc="http://www.opengis.net/ogc" 
    xmlns:xlink="http://www.w3.org/1999/xlink" 
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <!-- a named layer is the basic building block of an sld document -->
  <NamedLayer>
    <Name>Taxlots</Name>
    <UserStyle>
        <!-- they have names, titles and abstracts -->
      
      <Title>County Tax Lots</Title>
      <Abstract></Abstract>
      <!-- FeatureTypeStyles describe how to render different features -->
      <!-- a feature type for lines -->

      <FeatureTypeStyle>
        <!--FeatureTypeName>Feature</FeatureTypeName-->
        <Rule>
          <Name>Unnown</Name>
          <Title>Unknown</Title>
          <Abstract>Unknown year built</Abstract>
           <ogc:Filter>
             <ogc:PropertyIsBetween>
               <ogc:PropertyName>yearblt</ogc:PropertyName>
               <ogc:LowerBoundary>
                 <ogc:Literal>-10</ogc:Literal>
                </ogc:LowerBoundary>
               <ogc:UpperBoundary>
                 <ogc:Literal>1839</ogc:Literal>
                </ogc:UpperBoundary>
             </ogc:PropertyIsBetween>
           </ogc:Filter>
           <PolygonSymbolizer>
             <Fill>
               <CssParameter name="fill">#dddddd</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#FFFFFF</CssParameter>
               <CssParameter name="stroke-width">0.1</CssParameter>
             </Stroke>
           </PolygonSymbolizer>
         </Rule>
         
        <Rule>
          <Name>Pre-WW2</Name>
          <Title>Pre-WW2</Title>
           <ogc:Filter>
             <ogc:PropertyIsBetween>
               <ogc:PropertyName>yearblt</ogc:PropertyName>
               <ogc:LowerBoundary>
                 <ogc:Literal>1840</ogc:Literal>
                </ogc:LowerBoundary>
               <ogc:UpperBoundary>
                 <ogc:Literal>1939</ogc:Literal>
                </ogc:UpperBoundary>
             </ogc:PropertyIsBetween>
           </ogc:Filter>
           <PolygonSymbolizer>
             <Fill>
               <CssParameter name="fill">#aaaadd</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#FFFFFF</CssParameter>
               <CssParameter name="stroke-width">0.1</CssParameter>
             </Stroke>
           </PolygonSymbolizer>
         </Rule>          
          
        <Rule>
          <Name>1940's</Name>
          <Title>1940's</Title>
           <ogc:Filter>
             <ogc:PropertyIsBetween>
               <ogc:PropertyName>yearblt</ogc:PropertyName>
               <ogc:LowerBoundary>
                 <ogc:Literal>1940</ogc:Literal>
                </ogc:LowerBoundary>
               <ogc:UpperBoundary>
                 <ogc:Literal>1949</ogc:Literal>
                </ogc:UpperBoundary>
             </ogc:PropertyIsBetween>
           </ogc:Filter>
           <PolygonSymbolizer>
             <Fill>
               <CssParameter name="fill">#ffffe5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#FFFFFF</CssParameter>
               <CssParameter name="stroke-width">0.1</CssParameter>
             </Stroke>
           </PolygonSymbolizer>
         </Rule>          

        <Rule>
          <Name>1950's</Name>
          <Title>1950's</Title>
           <ogc:Filter>
             <ogc:PropertyIsBetween>
               <ogc:PropertyName>yearblt</ogc:PropertyName>
               <ogc:LowerBoundary>
                 <ogc:Literal>1950</ogc:Literal>
                </ogc:LowerBoundary>
               <ogc:UpperBoundary>
                 <ogc:Literal>1959</ogc:Literal>
                </ogc:UpperBoundary>
             </ogc:PropertyIsBetween>
           </ogc:Filter>
           <PolygonSymbolizer>
             <Fill>
               <CssParameter name="fill">#fff7bc</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#FFFFFF</CssParameter>
               <CssParameter name="stroke-width">0.1</CssParameter>
             </Stroke>
           </PolygonSymbolizer>
         </Rule>          

        <Rule>
          <Name>1960's</Name>
          <Title>1960's</Title>
           <ogc:Filter>
             <ogc:PropertyIsBetween>
               <ogc:PropertyName>yearblt</ogc:PropertyName>
               <ogc:LowerBoundary>
                 <ogc:Literal>1960</ogc:Literal>
                </ogc:LowerBoundary>
               <ogc:UpperBoundary>
                 <ogc:Literal>1969</ogc:Literal>
                </ogc:UpperBoundary>
             </ogc:PropertyIsBetween>
           </ogc:Filter>
           <PolygonSymbolizer>
             <Fill>
               <CssParameter name="fill">#fee391</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#FFFFFF</CssParameter>
               <CssParameter name="stroke-width">0.1</CssParameter>
             </Stroke>
           </PolygonSymbolizer>
         </Rule>          

        <Rule>
          <Name>1970's</Name>
          <Title>1970's</Title>
           <ogc:Filter>
             <ogc:PropertyIsBetween>
               <ogc:PropertyName>yearblt</ogc:PropertyName>
               <ogc:LowerBoundary>
                 <ogc:Literal>1970</ogc:Literal>
                </ogc:LowerBoundary>
               <ogc:UpperBoundary>
                 <ogc:Literal>1979</ogc:Literal>
                </ogc:UpperBoundary>
             </ogc:PropertyIsBetween>
           </ogc:Filter>
           <PolygonSymbolizer>
             <Fill>
               <CssParameter name="fill">#fec44f</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#FFFFFF</CssParameter>
               <CssParameter name="stroke-width">0.1</CssParameter>
             </Stroke>
           </PolygonSymbolizer>
         </Rule>          

        <Rule>
          <Name>1980's</Name>
          <Title>1980's</Title>
           <ogc:Filter>
             <ogc:PropertyIsBetween>
               <ogc:PropertyName>yearblt</ogc:PropertyName>
               <ogc:LowerBoundary>
                 <ogc:Literal>1980</ogc:Literal>
                </ogc:LowerBoundary>
               <ogc:UpperBoundary>
                 <ogc:Literal>1989</ogc:Literal>
                </ogc:UpperBoundary>
             </ogc:PropertyIsBetween>
           </ogc:Filter>
           <PolygonSymbolizer>
             <Fill>
               <CssParameter name="fill">#fe9929</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#FFFFFF</CssParameter>
               <CssParameter name="stroke-width">0.1</CssParameter>
             </Stroke>
           </PolygonSymbolizer>
         </Rule>          

        <Rule>
          <Name>1990's</Name>
          <Title>1990's</Title>
           <ogc:Filter>
             <ogc:PropertyIsBetween>
               <ogc:PropertyName>yearblt</ogc:PropertyName>
               <ogc:LowerBoundary>
                 <ogc:Literal>1990</ogc:Literal>
                </ogc:LowerBoundary>
               <ogc:UpperBoundary>
                 <ogc:Literal>1999</ogc:Literal>
                </ogc:UpperBoundary>
             </ogc:PropertyIsBetween>
           </ogc:Filter>
           <PolygonSymbolizer>
             <Fill>
               <CssParameter name="fill">#ec7014</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#FFFFFF</CssParameter>
               <CssParameter name="stroke-width">0.1</CssParameter>
             </Stroke>
           </PolygonSymbolizer>
         </Rule>          

        <Rule>
          <Name>2000's</Name>
          <Title>2000's</Title>
           <ogc:Filter>
             <ogc:PropertyIsBetween>
               <ogc:PropertyName>yearblt</ogc:PropertyName>
               <ogc:LowerBoundary>
                 <ogc:Literal>2000</ogc:Literal>
                </ogc:LowerBoundary>
               <ogc:UpperBoundary>
                 <ogc:Literal>2009</ogc:Literal>
                </ogc:UpperBoundary>
             </ogc:PropertyIsBetween>
           </ogc:Filter>
           <PolygonSymbolizer>
             <Fill>
               <CssParameter name="fill">#cc4c02</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#FFFFFF</CssParameter>
               <CssParameter name="stroke-width">0.1</CssParameter>
             </Stroke>
           </PolygonSymbolizer>
         </Rule>          

        <Rule>
          <Name>2010's</Name>
          <Title>2010's</Title>
           <ogc:Filter>
             <ogc:PropertyIsBetween>
               <ogc:PropertyName>yearblt</ogc:PropertyName>
               <ogc:LowerBoundary>
                 <ogc:Literal>2010</ogc:Literal>
                </ogc:LowerBoundary>
               <ogc:UpperBoundary>
                 <ogc:Literal>2019</ogc:Literal>
                </ogc:UpperBoundary>
             </ogc:PropertyIsBetween>
           </ogc:Filter>
           <PolygonSymbolizer>
             <Fill>
               <CssParameter name="fill">#993404</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#FFFFFF</CssParameter>
               <CssParameter name="stroke-width">0.1</CssParameter>
             </Stroke>
           </PolygonSymbolizer>
         </Rule>         
         
        </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>