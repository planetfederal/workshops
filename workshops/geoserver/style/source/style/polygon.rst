.. _style.polygon:

Polygons
========

Next we look at how CSS styling can be used to represent polygons.

.. figure:: img/PolygonSymbology.svg
   
   Polygon Geometry

Review of polygon symbology:

* Polygons offer a direct representation of physical extent or the output of analysis.

* The visual appearance of polygons reflects the current scale.

* Polygons are recording as a LinearRing describing the polygon boundary. Further LinearRings can be used to describe any holes in the polygon if present. The Simple Feature for SQL Geometry model represents these areas a Polygons, the ISO 19107 geometry model represents these areas as Surfaces.

* SLD uses a **PolygonSymbolizer** record how the shape of a polygon is drawn. The primary characteristic documented is the **Fill** used to shade the polygon interior. The use of a **Stroke** to describe the polygon boundary is optional.

* Labeling of is anchored to the centroid of the polygon. GeoServer provides a vendor-option to allow labels to line wrap to remain within the polygon boundaries.

For our Polygon exercises we will try and limit our CSS documents to a single rule, in order to showcase the properties used for rendering.

Reference:

* :manual:`Polygon Symbology <extensions/css/properties.html#polygon-symbology>` (User Manual | CSS Property Listing)
* :manual:`Polygons <extensions/css/cookbook/polygon.html>` (User Manual | CSS Cookbook)
* :manual:`Polygons <extensions/css/cookbook_polygon.html>` (User Manual | SLD Reference )

This exercise makes use of the ``ne:states_provinces_shp`` layer.

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

#. Click on the tab :guilabel`Map` to preview.

   .. image:: img/polygon_04_preview.png

Stroke and Fill
---------------

The **key property** for polygon data is **fill**.

.. figure:: img/PolygonFill.svg
   
   Basic Stroke and Fill Properties

The **fill** property is used to provide the color, or pattern, used to draw the interior of a polygon.


#. Replace the contents of `polygon_example` with the following **fill** example:

   .. code-block:: css
   
      * {
         fill: gray;
      }

#. The :guilabel:`Map` tab can be used preview the change:

   .. image:: img/polygon_fill_1.png

#. To draw the boundary of the polygon the **stroke** property is used:

   The **stroke** property is used to provide the color, or pattern, for the polygon boundary. It is effected by the same parameters (and vendor specific parameters) as shown for LineStrings. 
   
   .. code-block:: css
   
      * {
         fill: gray;
         stroke: black;
         stroke-width: 2;
      }
   
   .. note:: Technically the boundary of a polygon is a specific case of a LineString where the first and last vertex are the same forming a closed LinearRing.

#. The effect of adding **stroke** is shown in the map preview:
   
   .. image:: img/polygon_fill_2.png

#. An interesting technique when styling polygons in conjunction with background information is to control the fill opacity.

   The **fill-opacity** property is used to adjust transparency (provided as range from 0.0 to 1.0). Use of **fill-opacity** to render polygons works well in conjunction with a raster base map. This approach allows details of the base map to shown through.

   The **stroke-opacity** property is used in a similar fashion, as a range from 0.0 to 1.0.

   .. code-block:: css

      * {
         fill: white;
         fill-opacity: 50%;
         stroke: light-gray;
         stroke-width: 0.25;
         stroke-opacity: 50%;
      }

#. You can see this effect using a layer group, where the transparent polygons allow a raster base map to be seen.

   .. image:: img/polygon_fill_3.png
   
.. only:: instructor
     
   .. admonition:: Instructor Notes 
    
      In this example we want to ensure readers know the key property for polygon data.
    
      It is also our first example of using opacity.

Pattern
-------

In addition to color, the **fill** property can also be used to provide a pattern. 

.. figure:: img/PolygonPattern.svg

   Fill Graphic

The fill pattern is defined by repeating one of the built-in symbols, or making use of an external image.

#. We have two options for configuring a **fill** with a repeating graphic:
   
   Using **url** to reference to an external graphic. Used in conjunction with **fill-mime** property.

   Use of **symbol** to access a predefined shape. SLD provides several well-known shapes (circle, square, triangle, arrow, cross, star, and x). GeoServer provides additional shapes specifically for use as fill patterns.

   Update `polygon_example` with the following built-in symbol as a repeating fill pattern:

   .. code-block:: css

      * {
         fill: symbol(square);
      }

#. The map preview (and legend) will show the result:
   
   .. image:: img/polygon_pattern_1.png

#. Additional fill properties allow control over the orientation and size of the symbol.

   The **fill-size** property is used to adjust the size of the symbol prior to use.
   
   The **fill-rotation** property is used to adjust the orientation of the symbol.
   
   Adjust the size and rotation as shown:

   .. code:: css

      * {
         fill: symbol(square);
         fill-size: 22px;
         fill-rotation: 45;
      }
      
#. The size of each symbol is increased, and each symbol rotated by 45 degrees.

   .. image:: img/polygon_pattern_2.png
   
   .. note:: Does the above look correct? There is an open request :geot:`4642` to rotate the entire pattern, rather than each individual symbol.
   
   .. only:: instructor
    
      .. admonition:: Instructor Notes   
      
         Prior to GeoServer 2.5 a **toRadians** call was required as described in `GEOT-4641 <https://jira.codehaus.org/browse/GEOT-4641>`_.
      
         .. code:: css

            * {
               fill: symbol(square);
               fill-size: 22px;
               fill-rotation: [toRadians(45)];
            }

#. The size and rotation properties just effect the size and placement of the symbol, but do not alter the symbols design. In order to control the color we need to make use of a **pseudo-selector**. We have two options for referencing to our symbol above:

   **:symbol** provides styling for all the symbols in the CSS document. 
   
   **:fill** provides styling for all the fill symbols in the CSS document.
   
   Since we only have one this pseduo-selector this approach will be fine:

   .. code-block:: css

      * {
         fill: symbol(square);
      }
      :fill {
         fill: green;
         stroke: darkgreen;
      }

#. This change adjusts the appearance of our grid of squares.
   
   .. image:: img/polygon_pattern_3.png

#. If you have more than one symbol:
   
   **:nth-symbol(1)** is used to specify which symbol in the document we wish to modify.
     
   **:nth-fill(1)** provides styling for the indicated fill symbol

   To rewrite our example to use this approach:

   .. code-block:: css

      * {
         fill: symbol(square);
      }
      :nth-fill(1) {
         fill: green;
         stroke: darkgreen;
      }

#. Since we only have one fill in our CSS document the map preview looks identical.

   .. image:: img/polygon_pattern_3.png

#. The well-known symbols are more suited for marking individual points. Now that we understand how a pattern can be controlled it is time to look at the patterns GeoServer provides.
  
   ================= =======================================
   shape://horizline horizontal hashing
   shape://vertline  vertical hashing
   shape://backslash right hashing pattern
   shape://slash     left hashing pattern
   shape://plus      vertical and horizontal hashing pattern
   shape://times     cross hash pattern
   ================= =======================================

   Update the example to use **shape://slash** for a pattern of left hatching. 

   .. code-block:: css

      * {
         fill: symbol('shape://slash');
         stroke: black;
      }
      :fill {
        stroke: gray;
      }

#. This approach is well suited to printed output or low color devices.
   
   .. image:: img/polygon_pattern_4.png

#. To control the size of the symbol produced use the **fill-size** property.
  
   .. code-block:: css

      * {
         fill: symbol('shape://slash');
         fill-size: 8;
         stroke: black;
      }
      :fill {
         stroke: green;
      }

#. This results in a tighter pattern shown:

   .. image:: img/polygon_pattern_5.png
   
#. Another approach (producing the same result is to use the **size** property on the appropriate pseudo-selector.

   .. code-block:: css

      * {
         fill: symbol('shape://slash');
         stroke: black;
      }
      :fill {
         stroke: green;
         size: 8;
      }

#. This produces the same visual result:

    .. image:: img/polygon_pattern_5.png

#. Multiple fills can be combined by supplying more than one fill as part of the same rule.
   
   Note the use of a comma to separate fill-size values (including the first fill-size value which is empty). This was the same approach used when combining strokes.
   
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

#. The resulting image has a solid fill, with a pattern drawn overtop.

   .. image:: img/polygon_pattern_6.png

Label
-----

Labeling polygons follows the same approach used for LineStrings. 

.. image:: img/PolygonLabel.svg

The key properties **fill** and **label** are used to enable Polygon label generation.

#. Try out **label** and **fill** together by replacing our `polygon_example` with the following:

   .. code-block:: css

      * {
        stroke: blue;
        fill: #7EB5D3;
        label: [name];
        font-fill: black;
      }

#. These default settings draw labels starting at the centroid of each polygon.
   
   .. image:: img/LabelSymbology.svg
   
#. As shown below:
   
   .. image:: img/polygon_label_1.png

#. Rather than use the default centroid we can adjust the position where the label is drawn.

   .. image:: img/LabelAnchorPoint.svg
  
   The property **label-anchor** provides two numbers expressing how a label is aligned with respect to the starting label position. Using values between 0.0 and 1.0 as shown in the following table.

   +----------+---------+---------+---------+
   |          | Left    | Center  | Right   |
   +----------+---------+---------+---------+
   | Top      | 0.0 1.0 | 0.5 1.0 | 1.0 1.0 |
   +----------+---------+---------+---------+
   | Middle   | 0.0 0.5 | 0.5 0.5 | 1.0 0.5 |
   +----------+---------+---------+---------+
   | Bottom   | 0.0 0.0 | 0.5 0.0 | 1.0 0.0 |
   +----------+---------+---------+---------+ 
   
   Adjusting the **label-anchor** is the recommended approach to positioning your labels.

#. Using the **label-anchor** property we can center our labels with respect to their starting position.
   
   To align the center of our label we select 50% horizontally and 50% vertically, by filling in  0.5 and 0.5 below:
   
   .. code-block:: css

      * {  stroke: blue;
           fill: #7EB5D3;
           label: [name];
           font-fill: black;
           label-anchor: 0.5 0.5;
         }
         
#. Note the labeling position remains the same, we are adjusting which part of the label we are "snapping" into this position.

   .. image:: img/polygon_label_2.png
   
#. The property **label-offset** can be used to provide an initial displacement using and x and y offset.

   .. image:: img/LabelDisplacement.svg
   
   This offset is used to adjust the label position provided by the geometry resulting in the starting label position.

#. These two settings can be used together. The rendering engine starts by determining the label position generated from the geometry centroid and the **label-offset** displacement. The bounding box of the label is used with the **label-anchor** setting to how to snap the label to this location.
   
   **Step 1**: starting label position = centroid + displacement
   
   **Step 2**: snap the label anchor to the starting label position

#. GeoServer provides extensive vendor parameters for controlling the label process. Most of these parameters focus on controlling conflict resolution. Conflict resolution is used when two labels would otherwise overlap.
   
   **-gt-label-max-displacement** indicates the maximum distance GeoServer should displace a label during conflict resolution.
   
   **-gt-label-auto-wrap** allows any labels extending past the provided width with be wrapped into multiple lines.

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

#. These two vendor options are commonly used together.
   
   .. image:: img/polygon_label_3.png

#. Labels can be difficult to make out against a busy or dark background, use of a halo to outline labels is recommended. In this case we will make use of the fill color, to provide some space around our labels. 

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

#. By making use of opacity we we still allow stroke information to show through, but prevent the stroke information from making the text hard to read.

   .. image:: img/polygon_label_4.png

#. You can also take manual control of conflict resolution using the **-gt-label-priority**. This property takes an expression which is used in the event of a conflict. The label with the highest priority "wins".

Explore
-------

Putting these ideas together we are going to explore the topic of producing a thematic map. A thematic map (rather than focusing on representing the shape of the world) uses elements of style to illustrate differences in the data under study.

This section is a little more advanced and we will take the time to look at the generated SLD file.

.. only:: instructor
  
   .. admonition:: Instructor Notes   

      This instruction section follows our pattern with LineString. Building on the examples and exploring how selectors can be used.
 
      * For LineString we explored the use of @scale, in this section we are going to look at theming by attribute.
 
      * We also unpack how cascading occurs, and what the result looks like in the generated XML.
 
      * care is being taken to introduce the symbology encoding functions as an option for theming, ( placing equal importance on their use)
     
      Checklist:
 
      * filter vs function for theming
      * Cascading
   
#. We can use a site like `ColorBrewer <http://www.colorbrewer2.com>`_ to explore the use of color theming for polygon symbology. In this approach the the fill color of the polygon is determined by the value of the attribute under study.

   .. image:: img/polygon_06_brewer.png

   This presentation of a dataset is known as "theming" by an attribute.

#. For our ``ne:states_provinces_shp`` dataset, a **mapcolor9** attribute has been provided for this purpose. Theming by **mapcolor9** results in a map where neighbouring countries are visually distinct.

   +-----------------------------+
   |  Qualatative 9-class Set3   |
   +---------+---------+---------+
   | #8dd3c7 | #fb8072 | #b3de69 |
   +---------+---------+---------+
   | #ffffb3 | #80b1d3 | #fccde5 |
   +---------+---------+---------+
   | #bebada | #fdb462 | #d9d9d9 |
   +---------+---------+---------+
   
   If you are unfamiliar with theming you may wish to visit http://colorbrewer2.org/js/ to learn more. The **i** icons provide an adequate background on theming approaches for qualitative, sequential and diverging datasets.
     
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

#. Reviewing the generated SLD shows us this representation:

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

Challenge
---------

As a challenge use the Symbology Encoding functions in the following exercises.

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

#. A powerful tool is theming using multiple attributes. Combine the **mapcolor9** and **datarank** examples to reproduce the following map.

   .. image:: img/polygon_multitheme.png

   .. only:: instructor
  
      .. admonition:: Instructor Notes   

         Theming on more that one attribute - while the advantages are not discussed in detail it is an important concept map readers to perform "integration by eyeball" (detecting correlations between attribute values information)

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

