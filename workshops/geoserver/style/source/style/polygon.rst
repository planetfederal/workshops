.. _style.polygon:

Polygons
========

Next we look at how CSS styling can be used to represent polygons.

Review of polygon symbology:

* Polygons offer a direct representation of physical extent or the output of analysis.

* The visual appearance of polygons reflects the current scale.

* Polygons are recording as a LinearRing describing the polygon boundary. Further LinearRings can be used to describe any holes in the polygon if present. The Simple Feature for SQL Geometry model represents these areas a Polygons, the ISO 19107 geometry model represents these areas as Surfaces.

* SLD uses a **PolygonSymbolizer** record how the shape of a polygon is drawn. The primary characteristic documented is the **Fill** used to shade the polygon interior. The use of a **Stroke** to describe the polygon boundary is optional.

* Labeling of is anchored to the centroid of the polygon. GeoServer provides a vendor-option to allow labels to line wrap to remain within the polygon boundaries.

Examples
--------

Polygon examples are provided as simple CSS documents, often with a single rule, in order to showcase the properties used for rendering.

.. image:: img/PolygonSymbology.svg

The previews included in this section were created using the ``ne:states_provinces_shp`` layer.

Reference:

* :manual:`Polygon Symbology <extensions/css/properties.html#polygon-symbology>` (User Manual | CSS Property Listing)
* :manual:`Lines <extensions/css/cookbook_line.html>` (User Manual | CSS Cookbook)
* :manual:`Polygons <extensions/css/cookbook_polygon.html>` (User Manual | SLD Reference )

Stroke and Fill
^^^^^^^^^^^^^^^

The **key property** for polygon data is **fill**:

* The **fill** property is used to provide the color, or pattern, used to draw the interior of a polygon.

.. code-block:: css
   
   * {
      fill: gray;
   }

.. image:: img/polygon_fill_1.png

To draw the boundary of the polygon the **stroke** property is used:

* The **stroke** property is used to provide the color, or pattern, for the polygon boundary. It is effected by the same parameters (and vendor specific parameters) as shown for LineStrings. Technically the boundary of a polygon is a specific case of a LineString where the first and last vertex are the same forming a closed LinearRing.

.. code-block:: css
   
   * {
      fill: gray;
      stroke: black;
      stroke-width: 2;
   }

.. image:: img/polygon_fill_2.png

An interesting technique when styling polygons in conjunction with other information is to control the fill opacity:

* The **fill-opacity** property is used to adjust transparency (provided as range from 0.0 to 1.0). Use of **fill-opacity** to render polygons works well in conjunction with a raster base map. This approach allows details of the base map to shown through.

* The **stroke-opacity** property is used in a similar fashion, as a range from 0.0 to 1.0.

.. code-block:: css

   * {
      fill: white;
      fill-opacity: 50%;
      stroke: light-gray;
      stroke-width: 0.25;
      stroke-opacity: 50%;
   }

.. image:: img/polygon_fill_3.png

.. only:: instructor
     
   .. admonition:: Instructor Notes 
    
      In this example we want to ensure readers know the key property for polygon data.
    
      It is also our first example of using opacity.

Pattern
^^^^^^^

The second way to specify a fill is by providing a graphic. Graphics in GeoServer are defined using:

* The **fill** property can also be used to provide a pattern. The fill pattern is defined by repeating one of the built-in symbols, or making use of an external image

  * **url**: Reference to an external graphic. Used in conjunction with **fill-mime** property.

  * **symbol**: use of a predefined shape. SLD provides several well-known shapes (which we will cover in :doc:`point`). GeoServer provides additional shapes specifically for use as fill patterns.

Use of a built-in symbol as a repeating fill pattern:

.. code-block:: css

   * {
      fill: symbol(square);
   }

.. image:: img/polygon_pattern_1.png

Additional fill properties allow control over the orientation and size of the symbol:

* The **fill-size** property is used to adjust the size of the symbol prior to use.
* The **fill-rotation** property is used to adjust the orientation of the symbol.

.. code:: css

   * {
      fill: symbol(square);
      fill-size: 22px;
      fill-rotation: [toRadians(45)];
   }

.. image:: img/polygon_pattern_2.png

.. only:: instructor
    
   .. admonition:: Instructor Notes   
  
      The **toRadians** call is a result of `GEOT-4641 <https://jira.codehaus.org/browse/GEOT-4641>`_ when this issue is addressed the code example can be replaced with:
    
      .. code:: css

         * {
            fill: symbol(square);
            fill-size: 22px;
            fill-rotation: 45;
         }

The size and rotation properties just effect the size and placement of the symbol, but do not alter the symbols design. In order to control the color we need to make use of a **pseudo-selector**. We have two options for referencing to our symbol above:

* **:symbol** - provides styling for all the symbols in the CSS document. Since we only have one this pseduo-selector will fine.
* **:nth-symbol(1)** - if needed we could specify which symbol in the document we wish to modify.
* **:fill** - provides styling for all the fill symbols in the CSS document.
* **:nth-fill(1)** - provides styling for the first fill symbol in the CSS document.

The choice of how to specify which symbol we wish to style is up to you. For this example we have chosen to use **:fill** for readability (it is easier to tell how we are using the symbol). Since we only have one symbol in our document three is no reason to specify a number indicating which one to style.

.. code-block:: css

   * {
      fill: symbol(square);
   }
   :fill {
      fill: green;
      stroke: darkgreen;
   }

.. image:: img/polygon_pattern_3.png

The well-known symbols are more suited for marking individual points. Now that we understand how a pattern can be controlled it is time to look at the patterns GeoServer provides.
  
================= =======================================
shape://horizline horizontal hashing
shape://vertline  vertical hashing
shape://backslash right hashing pattern
shape://slash     left hashing pattern
shape://plus      vertical and horizontal hashing pattern
shape://times     cross hash pattern
================= =======================================

Here is an example using **shape://slash** to produce a pattern of left hatching. This approach is well suited to printed output or low color devices.

.. code-block:: css

   * {
      fill: symbol('shape://slash');
      stroke: black;
   }
   :fill {
     stroke: gray;
   }

.. image:: img/polygon_pattern_4.png

There are two ways to control the size of the symbol produced (both producing the same result):

* Using a **fill-size** property.
  
  .. code-block:: css

     * {
        fill: symbol('shape://slash');
        fill-size: 8;
        stroke: black;
     }
     :fill {
        stroke: green;
     }
  
  .. image:: img/polygon_pattern_5.png
   
* Using a **size** property on the appropriate pseudo-selector.

  .. code-block:: css

     * {
        fill: symbol('shape://slash');
        stroke: black;
     }
     :fill {
        stroke: green;
        size: 8;
     }

  .. image:: img/polygon_pattern_5.png

Multiple fills can be combined, just as we combined strokes, by supplying more than one fill as part of the same rule. Note the use of a comma to separate fill-size values (including the first fill-size value which is empty).

.. code-block:: css

   * {
      fill: #DDDDFF, symbol('shape://slash');
      fill-size: ,8;
      stroke: black;
   }
   :fill {
      stroke: black;
      stroke-width: 0.5;
   }

.. image:: img/polygon_pattern_6.png

Label
^^^^^

Labeling polygons follows the same approach used for LineStrings. The key properties **fill** and **label** are used to enable Polygon label generation.

.. code-block:: css

   * {
     stroke: blue;
     fill: #7EB5D3;
     label: [name];
     font-fill: black;
   }

.. image:: img/polygon_label_1.png

In our initial example labels are drawn starting at the centroid of each polygon. SLD provides several high level controls for label placement:

* **Anchor (recommended)**
  
  The property **label-anchor** provides two values expressing how a label is aligned with respect to the starting label position.

* **Displacement**
  
  The property **label-offset** can be used to provide an initial displacement using and x and y offset. This offset is used to adjust the label position provided by the geometry resulting in the starting label position.

The **label-anchor** property positions the label anchor in the bounding box formed by the label. The rendering engine does its best to align the label anchor to the label position generated from the geometry and displacement offset.

.. image:: img/LabelSymbology.svg

Using the recommended **label-anchor** property we can center our labels with respect to their starting position. Note the labeling position remains the same, we are adjusting which part of the label we are "snapping" into this position.

.. code-block:: css

   * {  stroke: blue;
        fill: #7EB5D3;
        label: [name];
        font-fill: black;
        label-anchor: 0.5 0.5;
      }

.. image:: img/polygon_label_2.png

.. only:: ignore

   +----------+---------+---------+---------+
   |          | Left    | Center  | Right   |
   +----------+---------+---------+---------+
   | Top      | 0.0 1.0 | 0.5 1.0 | 1.0 1.0 |
   +----------+---------+---------+---------+
   | Middle   | 0.0 0.5 | 0.5 0.5 | 1.0 0.5 |
   +----------+---------+---------+---------+
   | Bottom   | 0.0 0.0 | 0.5 0.0 | 1.0 0.0 |
   +----------+---------+---------+---------+ 

GeoServer provides extensive vendor parameters for controlling the label process. Most of these parameters focus on controlling conflict resolution. Conflict resolution is used when two labels would otherwise overlap.

We will limit our introduction to commonly used parameters:

* **-gt-label-max-displacement** - indicates the maximum distance GeoServer should displace a label when resol
* **-gt-label-auto-wrap** - any labels extending past the provided width with be wrapped into multiple lines.

Using these together we can make a small improvement in our example:

.. code-block:: css

   * {  stroke: blue;
        fill: #7EB5D3;
        label: [name];
        font-fill: black;
        label-anchor: 0.5 0.5;
        
        -gt-label-max-displacement: 40;
        -gt-label-auto-wrap: 70;
      }

.. image:: img/polygon_label_3.png

You can also take manual control of conflict resolution using the **-gt-label-priority**. This property takes an expression which is used in the event of a conflict. The label with the highest priority "wins".

Labels can be difficult to make out against a busy or dark background, use of a halo to outline labels is recommended. In this case we will make use of the fill color, to provide some space around our labels. By making use of opacity we we still allow stroke information to show through, but prevent the stroke information from making the text hard to read.

.. code-block:: css

   * {  stroke: blue;
        fill: #7EB5D3;
        label: [name];
        label-anchor: 0.5 0.5;
        font-fill: black;
        font-family: "Arial";
        font-size: 14;
        halo-radius: 2;
        halo-color: #7EB5D3;
        halo-opacity:0.8;
        
        -gt-label-max-displacement: 40;
        -gt-label-auto-wrap: 70;
      }

.. image:: img/polygon_label_4.png

.. admonition:: Exercise
   
   .. only:: instructor
     
      .. admonition:: Instructor Notes   
 
         This instruction section follows our pattern with LineString. Building on the examples and exploring how selectors can be used.
    
         * For LineString we explored the use of @scale, in this section we are going to look at theming by attribute.
    
         * We also unpack how cascading occurs, and what the result looks like in the generated XML.
    
         * care is being taken to introduce the symbology encoding functions as an option for theming, ( placing equal importance on their use)
        
         Checklist:
    
         * filter vs function for theming
         * Cascading

   #. Navigate to :menuselection:`CSS Styles`.

   #. Set ``ne:states_provinces_shp`` as the preview layer.
   
      .. image:: img/polygon_01_preview.png

   #. Create a new CSS style :kbd:`polygon_example`.
   
      .. list-table:: 
         :widths: 30 70
         :stub-columns: 1

         * - Workspace for new layer:
           - :kbd:`No workspace`
         * - New style name:
           - :kbd:`polygon_example`
        
      .. image:: img/polygon_02_create.png

   #. An initial style is provided:
   
      .. code-block:: css
      
         * { fill: lightgrey; }
   
      .. image:: img/polygon_03_initial.png
   
   #. Click on the tab :guilabel`Map` to preview.

      .. image:: img/polygon_04_preview.png
   
   #. Add a thin gray **stroke** so we can see the individual polygons:
   
      .. code-block:: css
   
         * {
           fill: lightgrey;
           stroke: gray;
           stroke-width: 0.5;
         }

   #. Click on the tab :guilabel:`Map` to preview.
   
      .. image:: img/polygon_05_gray.png
   
   #. We can use a site like `ColorBrewer <http://www.colorbrewer2.com>`_ to explore the use of color theming for polygon symbology. In this approach the the fill color of the polygon is determined by the value of the attribute under study. This presentation of a dataset is known as "theming" by an attribute.

      .. image:: img/polygon_06_brewer.png
   
      For our ``ne:states_provinces_shp`` dataset, a **mapcolor9** attribute has been provided for this purpose. Theming by **mapcolor9** results in a map where neighbouring countries are visually distinct.
   
      +-----------------------------+
      |  Qualatative 9-class Set3   |
      +---------+---------+---------+
      | #8dd3c7 | #fb8072 | #b3de69 |
      +---------+---------+---------+
      | #ffffb3 | #80b1d3 | #fccde5 |
      +---------+---------+---------+
      | #bebada | #fdb462 | #d9d9d9 |
      +---------+---------+---------+
      
      .. only:: instructor
       
         .. admonition:: Instructor Notes 
        
            If the reader has not taken SU_01 we are in a bit of trouble here. If needed here is a quick link to Color Brewer. The **i** icons provide an adequate background on qualitative, sequential and diverging.
        
            * http://colorbrewer2.org/js/
        
   #. The first approach we will take is to directly select content based on **colormap**, providing a color based on the **9-class Set3** palette above:

      .. code-block:: css

         [mapcolor9=1] {
            fill: #8dd3c7;
         }
         [mapcolor9=2] {
            fill: #ffffb3;
         }
         [mapcolor9=3] {
            fill: #bebada;
         }
         [mapcolor9=4] {
            fill: #fb8072;
         }
         [mapcolor9=5] {
            fill: #80b1d3;
         }
         [mapcolor9=6] {
            fill: #fdb462;
         }
         [mapcolor9=7] {
            fill: #b3de69;
         }
         [mapcolor9=8] {
            fill: #fccde5;
         }
         [mapcolor9=9] {
            fill: #d9d9d9;
         }
         * {
           stroke: gray;
           stroke-width: 0.5;
         }

   #. The :guilabel:`Map` tab can be used to preview this result.
   
      .. image:: img/polygon_09_selector_theme.png
   
   #. This CSS makes use of cascading to avoid repeating the **stroke** and **stroke-width** information multiple times.
   
      As an example the :kbd:`mapcolor9=2` rule, combined with the :kbd:`*` rule results in the following collection of properties:
   
      .. code-block:: css

         [mapcolor9=2] {
           fill: #ffffb3;
           stroke: gray;
           stroke-width: 0.5;
         }
   
      Reviewing the generated SLD shows us this representation:
   
      .. code-block:: xml

         <sld:Rule>
            <ogc:Filter>
               <ogc:PropertyIsEqualTo>
                  <ogc:PropertyName>mapcolor9</ogc:PropertyName>
                  <ogc:Literal>2</ogc:Literal>
               </ogc:PropertyIsEqualTo>
            </ogc:Filter>
            <sld:PolygonSymbolizer>
               <sld:Fill>
                  <sld:CssParameter name="fill">#ffffb3</sld:CssParameter>
               </sld:Fill>
            </sld:PolygonSymbolizer>
            <sld:LineSymbolizer>
               <sld:Stroke>
                  <sld:CssParameter name="stroke">#808080</sld:CssParameter>
                  <sld:CssParameter name="stroke-width">0.5</sld:CssParameter>
               </sld:Stroke>
            </sld:LineSymbolizer>
         </sld:Rule>
   
   #. There are three important functions, defined by the Symbology Encoding specification, that are often easier to use and more powerful then theming using rules.
   
      * **Recode**: Used the theme qualitative data. Attribute values are directly mapped to styling property such as **fill** or **stroke-width**.
   
      * **Categorize**: Used the theme quantitative data. Categories are defined using min and max ranges, and values are sorted into the appropriate category.
   
      * **Interpolate**: Used to smoothly theme quantitative data by calculating a styling property based on an attribute value.
   
      Theming is an activity, producing a visual result allow map readers to learn more about how an attribute is distributed spatially. We are free to produce this visual in the most efficient way possible.
   
   #. Swap our **mapcolor9** theme to use the **Recode** function:
   
      .. code-block:: css
   
         * {
           fill:[
             recode(mapcolor9,
               1,'#8dd3c7', 2,'#ffffb3', 3,'#bebada',
               4,'#fb8072', 5,'#80b1d3', 6,'#fdb462',
               7,'#b3de69', 8,'#fccde5', 9,'#d9d9d9')
           ]; 
           stroke: gray;
           stroke-width: 0.5;
         }

   #. The :guilabel:`Map` tab provides the same preview.
   
      .. image:: img/polygon_10_recode_theme.png
   
   #. The :guilabel:`Generated SLD` tab shows where things get interesting. Our generated style now consists of a single **Rule**:
   
      .. code-block:: xml
   
         <sld:Rule>
            <sld:PolygonSymbolizer>
               <sld:Fill>
                  <sld:CssParameter name="fill">
                     <ogc:Function name="Recode">
                        <ogc:PropertyName>mapcolor9</ogc:PropertyName>
                        <ogc:Literal>1</ogc:Literal>
                           <ogc:Literal>#8dd3c7</ogc:Literal>
                        <ogc:Literal>2</ogc:Literal>
                           <ogc:Literal>#ffffb3</ogc:Literal>
                        <ogc:Literal>3</ogc:Literal>
                           <ogc:Literal>#bebada</ogc:Literal>
                        <ogc:Literal>4</ogc:Literal>
                           <ogc:Literal>#fb8072</ogc:Literal>
                        <ogc:Literal>5</ogc:Literal>
                           <ogc:Literal>#80b1d3</ogc:Literal>
                        <ogc:Literal>6</ogc:Literal>
                           <ogc:Literal>#fdb462</ogc:Literal>
                        <ogc:Literal>7</ogc:Literal>
                           <ogc:Literal>#b3de69</ogc:Literal>
                        <ogc:Literal>8</ogc:Literal>
                           <ogc:Literal>#fccde5</ogc:Literal>
                        <ogc:Literal>9</ogc:Literal>
                           <ogc:Literal>#d9d9d9</ogc:Literal>
                  </ogc:Function>
                  </sld:CssParameter>
               </sld:Fill>
            </sld:PolygonSymbolizer>
            <sld:LineSymbolizer>
               <sld:Stroke>
                  <sld:CssParameter name="stroke">#808080</sld:CssParameter>
                  <sld:CssParameter name="stroke-width">0.5</sld:CssParameter>
               </sld:Stroke>
            </sld:LineSymbolizer>
         </sld:Rule>

.. admonition:: Explore
   
   .. only:: instructor
     
      .. admonition:: Instructor Notes   
 
         This section reviews the SE functions using recode for something else other than color, and inviting readers to try out Interpolate.
    
         While Recode offers an alternative for selectors (matching discrete values) Interpolate brings something new to the table - gradual color (or value) progression. The best of example of this is controlling width using the ``ne:rivers`` data layer (which is not yet available).
    
         Goal is to have readers reach for SE Functions as often as selectors when styling.
         
         Additional exercise ideas:
         
         * Control size using Interpolate

   #. The **Categorize** function can be used to generate property values based on quantitative information. Here is an example using Categorize to color states according to size.
   
      .. code-block:: css
   
         * {
            fill: [
               Categorize(Shape_Area,
                  '#08519c', 0.5,
                  '#3182bd', 1,
                  '#6baed6', 5,
                  '#9ecae1', 60,
                  '#c6dbef', 80,
                  '#eff3ff')
            ];
         }
   
      .. image:: img/polygon_area.png
   
      An exciting use of the GeoServer **shape** symbols is the theming by changing the **fill-size** used for pattern density.
   
      Use the **Categorize** function to theme by **datarank**.

      .. image:: img/polygon_categorize.png
   
      .. only:: instructor
       
         .. admonition:: Instructor Notes
       
            Example:
       
            .. code-block:: css
 
               * {
                 fill: symbol('shape://slash');
                 fill-size: [
                    Categorize(datarank,
                     4, 4,
                     5, 6,
                     8, 10,
                    10)
                 ];
                 stroke: black;
               }
               :fill {
                 stroke: darkgray;
               }

   #. One of the subjects we touched on during labeling was the conflict resolution GeoServer performs to ensure labels do not overlap.
   
      You can experiment with different values in addition to max displacement you can experiment with different values for "goodness of fit". These settings control how far GeoServer is willing to move a label to avoid conflict, and under what terms it simply gives up::
      
         -gt-label-fit-goodness: 0.3;
         -gt-label-max-displacement: 130;
   
      You can also experiment with turning off this facility completely::
      
         -gt-label-conflict-resolution: false;
   
   #. Our halo example used the fill color and opacity for a muted halo, while this improved readability it did not bring attention to our labels.

      A common design choice for emphasis is to outline the text in a contrast color (a white halo for black text). Produce a map that experiments with this idea.
   
      .. only:: instructor
       
         .. admonition:: Instructor Notes      
 
            Here is an example:
       
            .. code-block:: css

               * {  stroke: gray;
                    fill: #7EB5D3;
                    label: [name];
                    label-anchor: 0.5 0.5;
                    font-fill: black;
                    font-family: "Arial";
                    font-size: 14;
                    halo-radius: 1;
                    halo-color: white;
                  }

.. admonition:: Challenge

   .. only:: instructor
     
      .. admonition:: Instructor Notes   
 
         Theming on more that one attribute - while the advantages are not discussed in detail it is an important concept map readers to perform "integration by eyeball" (detecting correlations between attribute values information)

   #. A powerful tool is theming using multiple attributes. Combine the **mapcolor9** and **datarank** examples to reproduce the following map.
   
      .. image:: img/polygon_multitheme.png
   
      .. only:: instructor
      
         .. admonition:: Instructor Notes     
 
            This should be a cut and paste using the information already provided.
       
            .. code-block:: css
      
                * {
                   fill: [
                    recode(mapcolor9,
                      1,'#8dd3c7', 2,'#ffffb3', 3,'#bebada',
                      4,'#fb8072', 5,'#80b1d3', 6,'#fdb462',
                      7,'#b3de69', 8,'#fccde5', 9,'#d9d9d9')
                   ], symbol('shape://slash');
           
                   fill-size: ,[
                      Categorize(datarank,
                       6, 4,
                       8, 6,
                      10, 10,
                      12)
                   ];
                   stroke: black;
                }
                :fill {
                   stroke: black;
                }

   #. Use what you know of LineString Z Order to reproduce the following map:
      
      .. image:: img/polygon_zorder.png
            
      .. only:: instructor
     
         .. admonition:: Instructor Notes     
 
            This is a tricky challenge. While it is easy enough to introduce z-index to control stroke what is not immediately obvious is that z-order also controls fill order. Most students will introduce stroke correctly by cutting and pasting, in order to untangle fill and stroke z-order dummy stroke definitions need to be introduced using empty commas.
     
            .. code-block:: css
     
              * {
                fill: lightgray, symbol('shape://slash');
                fill-size: 8px;
                stroke: ,,lightgray, black;
                stroke-width: ,,6,1.5;
                z-index: 1,2,3,4;
              }
              :fill {
                stroke: black;
                stroke-width: 0.75;
              }
      
            The included legend should be a large clue about what is going on.
   
   #. When we rendered our initial preview, without a stroke, thin white gaps (or slivers) are visible between our polygons.
   
      .. image:: img/polygon_04_preview.png
   
      This effect is made more pronounced by the rendering engine making use of the Java 2D sub-pixel accuracy. This technique is primarily used to prevent an aliased (stair-stepped) appearance on diagonal lines.
   
      Clients can turn this feature off using a GetMap format option::
      
         format_options=antialiasing=off;
      
      The **LayerPreview** provides access to this setting from the Open Layers **Options Toolbar**:
   
      .. image:: img/polygon_antialias.png
   
      Experiment with **fill** and **stroke** settings to eliminate slivers between polygons.
   
      .. only:: instructor
     
         .. admonition:: Instructor Notes      
 
            The obvious thing works, setting both values to the same color:
   
            .. code-block:: css
       
               * {
                 fill: lightgrey;
                 stroke: lightgrey;
               }
    
            Yes, the intro "without a stroke" was a clue.

