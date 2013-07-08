.. _gsadv.processing.rt:

Rendering transformations
=========================

A rendering transformation allows processing to be carried out on data within the GeoServer rendering pipeline. This means that *the process gets applied dynamically*, between when it is accessed by GeoServer and it gets rendered as an image and shipped to your browser.

A rendering transformation isn't any different from a process or chain of processes. The difference is that a process (through WPS) is executed at a given time and returns any number of outputs. A rendering transformation is a process that is executed in the process of rendering a WMS image. 

Theoretically, any WPS process can be executed as a rendering transformation.

.. todo:: A diagram would be good here.

Types of rendering transformations
----------------------------------

The types of rendering transforms available in GeoServer include:

* Raster-to-Vector
* Vector-to-Raster
* Vector-to-Vector

Examples:

* Contour returns contour vectors from a DEM raster
* Heatmap computes a raster from weighted data points.
* PointStacker aggregates dense point data into point clusters.

Invoking rendering transformations
----------------------------------

Rendering transformations are invoked on a layer *within an SLD*. Parameters may be supplied to the transformation to control the appearance of the output. Once transformed, the rendered output for the layer is produced by applying the styling rules and symbolizers in the SLD to the result of transformation.

This is similar to the use of filters in SLD, except that the filter is a stored process.

Rendering transformations without WPS
-------------------------------------

Because Rendering transformations are invoked as WPS processes, you will need to have the WPS extension installed to run them.

While the WPS service needs to be installed to use rendering transformations, it does not need to be *enabled*. To avoid unwanted consumption of server resources, it may even be desirable to disable the WPS service if it is not being used directly. To disable WPS, navigate to the WPS configuration (:guilabel:`WPS` under :guilabel:`Services`) and deselect :guilabel:`Enable WPS`.

Usage
-----

The following is a snippet of SLD that contains the fictitious process called "gs:ProcessName".

.. code-block:: xml

   <StyledLayerDescriptor ...>
     ...    
       <FeatureTypeStyle>
         <Transformation>
           <ogc:Function name="gs:ProcessName">
             <ogc:Function name="parameter">
               <ogc:Literal>paramName</ogc:Literal>
               <ogc:Literal>paramValue</ogc:Literal>
             </ogc:Function name="parameter">
             ... (other parameters) ...
         </Transformation>
             ... ( rest of SLD) ...
       </FeatureTypeStyle>
     ...
   </StyledLayerDescriptor>

Rendering Transformations are invoked by adding the ``<Transformation>`` element to a ``<FeatureTypeStyle>`` element in an SLD document. The <Transformation> element syntax leverages the OGC Filter function syntax. The content of the element is a <ogc:Function> with the name of the rendering transformation process. This element specifies the name of the transformation process, along with the parameter values controlling the operation of the transformation. Parameters are supplied as name/value pairs.

The first argument to this function is an <ogc:Literal> containing the name of the parameter. The optional following arguments provide the value for the parameter (if any).

Some parameters accept only a single value, while others may accept a list of values. Values may be supplied in several ways:

* As a literal value
* As a computed expression
* As an SLD environment variable (which allows obtaining values for the current request such as output image width and height)

The order of the supplied parameters does not matter.

Most rendering transformations take the dataset to be transformed as an input. This is supplied via a special parameter (named ``data``) which does not need to have a value specified. The name of the parameter is determined by the particular transformation being used.

When the transformation is executed, the input dataset is passed to it via this parameter.

The rest of the content inside the FeatureTypeStyle is the symbolizer. As this SLD is styling the *result* of the rendering transformation, the symbolizer should match the geometry of the output, not the input. Thus, for a vector-to-raster transformation, the symbolizer should be a ``<RasterSymbolizer>``. For a raster-to-vector transformation, the symbolizer can be any of ``<PointSymbolizer>``, ``<LineSymbolizer>``, ``<PolygonSymbolizer>``, and ``<TextSymbolizer>``.

Some notes:

* It is possible to display the original data along side the transformed output by using a separate ``<FeatureTypeStyle>``
* Rendering transformations may not work correctly in a tiled renderer, unless they have been specifically written to accommodate it.
* In vector-to-raster rendering transformations in order to pass validation the SLD needs to mention the geometry attribute of the input dataset even though it is not used. This is done by specifying the attribute name in the symbolizer <Geometry>element.

Example
-------

There are a number of rendering transformations that are included in the base data of the OpenGeo Suite. Let's investigate one of them.

Preview the layer called ``world:urbanareas1_1``::

  http://localhost:8080/geoserver/wms/reflect?layers=world:urbanareas1_1&format=application/openlayers

.. figure:: img/rt_heatmappreview.png

   Heatmap preview

.. note::

    If you want to see this against some other layers for context, you can easily add them in::

      http://localhost:8080/geoserver/wms/reflect?layers=shadedrelief,world:urbanareas1_1,world:cities&format=application/openlayers

This layer is a *heatmap*. It shows a colored raster based on intensity of a given attribute.
 
Now let's investigate how this layer was created. Open the ``heatmap`` SLD in a text editor:

.. figure:: img/rt_heatmapsld.png

   Heatmap SLD

As this SLD is quite long, it's best to break it up into sections. Lines 14-53 define the rendering transformation.

.. code-block:: xml

           <Transformation>
             <ogc:Function name="gs:Heatmap">
               <ogc:Function name="parameter">
                 <ogc:Literal>data</ogc:Literal>
               </ogc:Function>
               <ogc:Function name="parameter">
                 <ogc:Literal>weightAttr</ogc:Literal>
                 <ogc:Literal>pop2000</ogc:Literal>
               </ogc:Function>
               <ogc:Function name="parameter">
                 <ogc:Literal>radiusPixels</ogc:Literal>
                 <ogc:Function name="env">
                   <ogc:Literal>radius</ogc:Literal>
                   <ogc:Literal>100</ogc:Literal>
                 </ogc:Function>
               </ogc:Function>
               <ogc:Function name="parameter">
                 <ogc:Literal>pixelsPerCell</ogc:Literal>
                 <ogc:Literal>10</ogc:Literal>
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

This code block shows the inputs to the ``gs:Heatmap``, with the following parameters:

.. list-table::
   :header-rows: 1

   * - Parameter
     - Value
   * - ``weightAttr``
     - ``pop2000``
   * - ``radius``
     - ``100``
   * - ``pixelsPerCell``
     - ``10``
   * - ``outputBBOX``
     - ``wms_bbox`` (meaning the bbox of the requested image)
   * - ``outputWidth``
     - ``wms_width`` (meaning the width of the requested image)
   * - ``outputHeight``
     - ``wms_height`` (meaning the height of the requested image)

Lines 54-67 control the actual output symbolization:

.. code-block:: xml

           <Rule>
             <RasterSymbolizer>
             <!-- specify geometry attribute of input to pass validation -->
               <Geometry><ogc:PropertyName>the_geom</ogc:PropertyName></Geometry>
               <Opacity>0.6</Opacity>
               <ColorMap type="ramp" >
                 <ColorMapEntry color="#FFFFFF" quantity="0" label="nodata" opacity="0"/>
                 <ColorMapEntry color="#FFFFFF" quantity="0.02" label="nodata" opacity="0"/>
                 <ColorMapEntry color="#4444FF" quantity=".1" label="nodata"/>
                 <ColorMapEntry color="#FF0000" quantity=".5" label="values" />
                 <ColorMapEntry color="#FFFF00" quantity="1.0" label="values" />
               </ColorMap>
             </RasterSymbolizer>
           </Rule>

Remember that even though the input layer itself is a vector layer (verify this by appending ``&styles=point`` to the above preview request), the output of the heatmap rendering transformation is a raster layer, so that it what needs to be styled here. What we see is a color ramp for values from 0 to 1, with 0 and 0.02 being styled as nodata (transparent).

Other examples
--------------

Another layer that contains rendering transformations is ``world:volcanoes``, which uses the ``gs:PointCluster`` process to "stack" points on top of each other to minimize the number of features rendered.

.. figure:: img/rt_pointstackpreview.png

   Point stacker preview

