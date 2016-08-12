.. _gsadv.processing.rt:

Rendering transformations
=========================

A rendering transformation allows processing to be carried out on data within the GeoServer rendering pipeline. This means that the process gets applied *dynamically*, between when it is accessed by GeoServer and it gets rendered as an image and shipped to your browser.

A rendering transformation isn't any different from a process or chain of processes. The difference is that a process (through WPS) is executed at a given time and returns any number of outputs. A rendering transformation is a process that is executed in during rendering a WMS image. 

Theoretically, any WPS process can be executed as a rendering transformation.

.. todo:: A diagram would be good here.

Types of rendering transformations
----------------------------------

The types of rendering transforms available in GeoServer include:

* Raster-to-Vector
* Vector-to-Raster
* Vector-to-Vector

Examples:

* Contour returning contour vectors from a DEM raster
* Heatmap computing a raster from weighted data points
* PointStacker aggregating dense point data into point clusters

Invoking rendering transformations
----------------------------------

Rendering transformations are invoked on a layer *within an SLD*. Parameters may be supplied to the transformation to control the appearance of the output. Once transformed, the rendered output for the layer is produced by applying the styling rules and symbolizers in the SLD to the result of transformation.

This is similar to the use of filters in SLD, except that the filter is a stored process.

Rendering transformations without WPS
-------------------------------------

Because rendering transformations are invoked as WPS processes, you will need to have the WPS extension installed to run them.

.. note:: While the WPS service needs to be installed to use rendering transformations, it does not need to be *enabled*. To avoid unwanted consumption of server resources, it may even be desirable to disable the WPS service if it is not being used directly. To disable WPS, navigate to the WPS configuration (:guilabel:`WPS` under :guilabel:`Services`) and deselect :guilabel:`Enable WPS`.

Usage
-----

The following is a snippet of SLD that contains the fictitious process called "gs:ProcessName"::

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

Let's create a heatmap of our ``earth:cities`` layer, showing the density of cities and their populations.

To show how WPS is connected to rendering transformations, we'll perform the heatmap creation first as a static WPS and then after as a rendering transformation. 

Static WPS example
~~~~~~~~~~~~~~~~~~

The `heatmap process <http://suite.boundlessgeo.com/docs/latest/cartography/rt/heatmap.html>`_ is called ``vec:Heatmap``. It take as input a vector layer and outputs a raster.

Here are the parameters for this process:

.. list-table::
   :header-rows: 1
   :widths: 20 10 70

   * - Name
     - Required?
     - Description
   * - ``data``
     - Yes
     - Input FeatureCollection containing the features to transform
   * - ``radiusPixels``
     - Yes
     - Radius of the density kernel (in pixels)
   * - ``weightAttr``
     - No
     - Name of the weight attribute (Default = 1)
   * - ``pixelsPerCell``
     - No
     - Resolution of the computed grid (Default = 1). Larger values improve performance, but may degrade appearance if too large.
   * - ``outputBBOX``
     - Yes
     - Georeferenced bounding box of the output
   * - ``outputWidth``
     - Yes
     - Output image width
   * - ``outputHeight``
     - Yes
     - Output image height


#. In GeoServer, click :guilabel:`Demos` and then :guilabel:`WPS Request Builder`

#. Under :guilabel:`Choose process`, select :guilabel:`vec:Heatmap`.

#. Fill out the form:

   .. list-table::
      :header-rows: 1

      * - :guilabel:`data`
        - :guilabel:`VECTOR_LAYER` :guilabel:`earth:cities`
      * - :guilabel:`radiusPixels`
        - :kbd:`25`
      * - :guilabel:`weightAttr`
        - :kbd:`pop_min`
      * - :guilabel:`pixelsPerCell`
        - :kbd:`5`
      * - :guilabel:`outputBBOX`
        - :kbd:`-180` :kbd:`-90` :kbd:`180` :kbd:`90`
      * - :guilabel:`Coordinate Reference System`
        - :kbd:`EPSG:4326`
      * - :guilabel:`outputWidth`
        - :kbd:`800`
      * - :guilabel:`outputHeight`
        - :kbd:`400`
      * - :guilabel:`result`
        - :guilabel:`Generate image/tiff`

   .. figure:: img/rt_heatmapwpsbuilder.png

     WPS Request Builder showing heatmap

#. Click :guilabel:`Execute process`.

#. You will be asked to download a file. This is the GeoTIFF that was generated through the WPS process execution.

   .. figure:: img/rt_heatmapwpsresult.png

      Result of WPS process

We could load this file into GeoServer and then style it, but instead we can do this automatically through the rendering pipeline.

.. note:: You can load data into GeoServer via the ``gs:Import`` and the ``gs:StoreCoverage`` processes for vector and raster data, respectively. Using chained processes, you can chain the output of some process to one of the above to ingest the output into GeoServer in a single step.

Rendering transformation example
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Now let's run the same heatmap process dynamically.

The process is run as a rendering transformation, which is indicated in a style. We will show examples of YSLD and its equivalent SLD.

#. First, we'll create an equivalent to our static example. In GeoServer, click :guilabel:`Styles`, then :guilabel:`Add a new style`.

#. For the name, type :kbd:`heatmap`.

#. For the format, select :guilabel:`YSLD`.

   .. note:: Learn more about `YSLD <http://suite.boundlessgeo.com/docs/latest/cartography/ysld/>`_ and its `advantages over SLD <http://suite.boundlessgeo.com/docs/latest/cartography/ysld/why.html>`_. We're using YSLD here because it's much more compact.

#. Enter the following content::

      title: Heatmap
      feature-styles:
      - transform:
          name: vec:Heatmap
          params:
            weightAttr: pop_min
            radiusPixels: 25
            pixelsPerCell: 5
        rules:
        - symbolizers:
          - raster:
              opacity: 1
              color-map:
                type: ramp
                entries:
                - ['#000000',1,0,black]
                - ['#FFFFFF',1,1,white]

   Notice the ``transform`` section, which calls the heatmap process and supplies all necessary parameters. Other parameters like bounding box and CRS aren't necessary because they are implied by the WMS request.

   .. figure:: img/rt_heatmapstyle.png

      Heatmap style

#. Click :guilabel:`Submit`.

#. Preview the layer. Zoom and pan around the map and see how the heatmap is calculated dynamically based on the data available in the canvas:

   .. figure:: img/rt_heatmappreview.png

      Heatmap preview

#. Since we have access to the rendering pipeline, we can create more complex styles. Here we will add some color to the heatmap.

#. Click :guilabel:`Styles` and then click :guilabel:`heatmap`.

#. Replace the content with the following::

      title: Heatmap
      feature-styles:
      - transform:
          name: vec:Heatmap
          params:
            weightAttr: pop_min
            radiusPixels: 25
            pixelsPerCell: 5
        rules:
        - symbolizers:
          - raster:
              opacity: 1
              color-map:
                type: ramp
                entries:
                - ['#FFFFFF',1,0,white]
                - ['#0000FF',1,0.33,blue]
                - ['#FFCC00',1,0.66,yellow]
                - ['#FF0000',1,1.0,red]

   Note that the only difference here is in the color map ramp. Before the colors went from black to white with increasing density, but now the colors go from white through blue and yellow before maxing out at red.

#. Click :guilabel:`Submit`.

#. Preview the layer again. Note the differences.

   .. figure:: img/rt_heatmappreviewcolor.png

      Heatmap preview with color

.. note:: The following SLD is identical to the YSLD that was used above:

   .. code-block:: xml

      <?xml version="1.0" encoding="UTF-8"?>
      <sld:StyledLayerDescriptor
       xmlns="http://www.opengis.net/sld"
       xmlns:sld="http://www.opengis.net/sld"
       xmlns:ogc="http://www.opengis.net/ogc"
       xmlns:gml="http://www.opengis.net/gml"
       version="1.0.0">
          <sld:NamedLayer>
              <sld:Name>earth:cities</sld:Name>
              <sld:UserStyle>
                  <sld:Name>heatmap</sld:Name>
                  <sld:Title>Heatmap</sld:Title>
                  <sld:IsDefault>1</sld:IsDefault>
                  <sld:FeatureTypeStyle>
                      <sld:Transformation>
                          <ogc:Function name="vec:Heatmap">
                              <ogc:Function name="parameter">
                                  <ogc:Literal>weightAttr</ogc:Literal>
                                  <ogc:Literal>pop_min</ogc:Literal>
                              </ogc:Function>
                              <ogc:Function name="parameter">
                                  <ogc:Literal>radiusPixels</ogc:Literal>
                                  <ogc:Literal>25</ogc:Literal>
                              </ogc:Function>
                              <ogc:Function name="parameter">
                                  <ogc:Literal>pixelsPerCell</ogc:Literal>
                                  <ogc:Literal>5</ogc:Literal>
                              </ogc:Function>
                              <ogc:Function name="parameter">
                                  <ogc:Literal>data</ogc:Literal>
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
                      </sld:Transformation>
                      <sld:Rule>
                          <sld:RasterSymbolizer>
                              <sld:ColorMap>
                                  <sld:ColorMapEntry color="#FFFFFF" opacity="1" quantity="0" label="white"/>
                                  <sld:ColorMapEntry color="#0000FF" opacity="1" quantity="0.33" label="blue"/>
                                  <sld:ColorMapEntry color="#FFCC00" opacity="1" quantity="0.66" label="yellow"/>
                                  <sld:ColorMapEntry color="#FF0000" opacity="1" quantity="1.0" label="red"/>
                              </sld:ColorMap>
                              <sld:ContrastEnhancement/>
                          </sld:RasterSymbolizer>
                      </sld:Rule>
                  </sld:FeatureTypeStyle>
              </sld:UserStyle>
          </sld:NamedLayer>
      </sld:StyledLayerDescriptor>

