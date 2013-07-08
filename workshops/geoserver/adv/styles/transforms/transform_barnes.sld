<?xml version="1.0" encoding="ISO-8859-1"?>
<StyledLayerDescriptor version="1.0.0"
xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd"
xmlns="http://www.opengis.net/sld"
xmlns:ogc="http://www.opengis.net/ogc"
xmlns:xlink="http://www.w3.org/1999/xlink"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
 <NamedLayer>
   <Name>Barnes surface</Name>
   <UserStyle>
     <Title>Barnes Surface</Title>
     <Abstract>A style that produces a Barnes surface using a rendering transformation</Abstract>
     <FeatureTypeStyle>
       <Transformation>
         <ogc:Function name="gs:BarnesSurface">
           <ogc:Function name="parameter">
             <ogc:Literal>data</ogc:Literal>
           </ogc:Function>
           <ogc:Function name="parameter">
             <ogc:Literal>valueAttr</ogc:Literal>
             <ogc:Literal>value</ogc:Literal>
           </ogc:Function>
           <ogc:Function name="parameter">
             <ogc:Literal>scale</ogc:Literal>
             <ogc:Literal>15.0</ogc:Literal>
           </ogc:Function>
           <ogc:Function name="parameter">
             <ogc:Literal>convergence</ogc:Literal>
             <ogc:Literal>0.2</ogc:Literal>
           </ogc:Function>
           <ogc:Function name="parameter">
             <ogc:Literal>passes</ogc:Literal>
             <ogc:Literal>3</ogc:Literal>
           </ogc:Function>
           <ogc:Function name="parameter">
             <ogc:Literal>minObservations</ogc:Literal>
             <ogc:Literal>1</ogc:Literal>
           </ogc:Function>
           <ogc:Function name="parameter">
             <ogc:Literal>maxObservationDistance</ogc:Literal>
             <ogc:Literal>10</ogc:Literal>
           </ogc:Function>
           <ogc:Function name="parameter">
             <ogc:Literal>pixelsPerCell</ogc:Literal>
             <ogc:Literal>10</ogc:Literal>
           </ogc:Function>
           <ogc:Function name="parameter">
             <ogc:Literal>queryBuffer</ogc:Literal>
             <ogc:Literal>40</ogc:Literal>
           </ogc:Function>
           <ogc:Function name="parameter">
             <ogc:Literal>outputBBOX</ogc:Literal>
             <ogc:Function name="env">
               <ogc:Literal>wms_bbox</ogc:Literal>
             </ogc:Function>
           </ogc:Function>
           <ogc:Function name="parameter">
             <ogc:Literal>outputWidth</ogc:Literal>
             <ogc:Function name="env">
               <ogc:Literal>wms_width</ogc:Literal>
             </ogc:Function>
           </ogc:Function>
           <ogc:Function name="parameter">
             <ogc:Literal>outputHeight</ogc:Literal>
             <ogc:Function name="env">
               <ogc:Literal>wms_height</ogc:Literal>
             </ogc:Function>
           </ogc:Function>
         </ogc:Function>
       </Transformation>
       <Rule>
         <RasterSymbolizer>
           <!-- specify geometry attribute of input to pass validation -->
           <Geometry><ogc:PropertyName>point</ogc:PropertyName></Geometry>
           <Opacity>0.8</Opacity>
           <ColorMap type="ramp" >
             <ColorMapEntry color="#FFFFFF" quantity="-990" label="nodata" opacity="0"/>
             <ColorMapEntry color="#2E4AC9" quantity="-9" label="nodata"/>
             <ColorMapEntry color="#41A0FC" quantity="-6" label="values" />
             <ColorMapEntry color="#58CCFB" quantity="-3" label="values" />
             <ColorMapEntry color="#76F9FC" quantity="0" label="values" />
             <ColorMapEntry color="#6AC597" quantity="3" label="values" />
             <ColorMapEntry color="#479364" quantity="6" label="values" />
             <ColorMapEntry color="#2E6000" quantity="9" label="values" />
             <ColorMapEntry color="#579102" quantity="12" label="values" />
             <ColorMapEntry color="#9AF20C" quantity="15" label="values" />
             <ColorMapEntry color="#B7F318" quantity="18" label="values" />
             <ColorMapEntry color="#DBF525" quantity="21" label="values" />
             <ColorMapEntry color="#FAF833" quantity="24" label="values" />
             <ColorMapEntry color="#F9C933" quantity="27" label="values" />
             <ColorMapEntry color="#F19C33" quantity="30" label="values" />
             <ColorMapEntry color="#ED7233" quantity="33" label="values" />
             <ColorMapEntry color="#EA3F33" quantity="36" label="values" />
             <ColorMapEntry color="#BB3026" quantity="999" label="values" />
           </ColorMap>
         </RasterSymbolizer>
        </Rule>
     </FeatureTypeStyle>
   </UserStyle>
 </NamedLayer>
</StyledLayerDescriptor>