.. _geoserver.styling.ysld:

YSLD
====

SLD has been the standard method of styling in GeoServer since its inception. However, it is not difficult to see that there are some disadvantages to SLD that can make it a challenging development environment.

There have been a few advances designed to mitigate these challenges. One of these is the development of YSLD, a re-imagining of the SLD syntax with `YAML <yaml.org>`_ syntax.


Benefits of YSLD over SLD
-------------------------

There are a number of advantages of YSLD over SLD:

Easier to read
~~~~~~~~~~~~~~

Compare the following style directives, both of which specify the fill color of a feature to be red.

SLD:

.. code-block:: xml

   <CssParameter name="fill">#FF0000</CssParameter>

YSLD:

.. code-block:: yaml

   fill-color: '#FF0000'

In SLD, the XML-based nature of the content obscures the important aspects of the directive in the middle of the line. With YSLD, the attribute and the value are clearly marked and associated with no extraneous information, making comprehension easier.

More compact
~~~~~~~~~~~~

Individual style files of a sufficient complexity can easily grow to dozens of rules. Therefore the length of each individual rule can drastically affect the length of the entire style.

Compare the following style rules, which both specify the a point layer to be styled as a red circle with 8-pixel diameter and a 2-pixel black stroke:

SLD:

.. code-block:: xml
   :linenos:

     <Rule>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FF0000</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">2</CssParameter>
             </Stroke>
           </Mark>
           <Size>8</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>

YSLD:

.. code-block:: yaml
   :linenos:

   rules:
   - symbolizers:
     - point:
         size: 8
         symbols:
         - mark:
             shape: circle
             fill-color: '#FF0000'
             stroke-color: '#000000'
             stroke-width: 2

While the SLD comes in at 300 characters, the YSLD equivalent comes in at about half that. Also, by not using an XML-based markup language, the removal of open and close tags make the document look much simpler and be much more compact. 

In addition, SLD is a formally structured document designed to configure a set of WMS layers. This produces a document with additional XML that is not required when styling a single layer in isolation.

The following are the headers in a typical SLD:

.. code-block:: xml

   <?xml version="1.0" encoding="ISO-8859-1"?>
   <StyledLayerDescriptor version="1.0.0" 
       xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" 
       xmlns="http://www.opengis.net/sld" 
       xmlns:ogc="http://www.opengis.net/ogc" 
       xmlns:xlink="http://www.w3.org/1999/xlink" 
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
     <NamedLayer>
       <Name>Default Point</Name>
       <UserStyle>
         <Title>A boring default style</Title>
         <Abstract>A sample style that just prints out a purple square</Abstract>
   ...

All of the above are unnecessary with YSLD.

More flexible syntax
~~~~~~~~~~~~~~~~~~~~

SLD, being an XML-based markup language, has a schema to which any style file needs to adhere. This means that not only are certain tags required, but the order of those tags are significant. This can cause confusion when the correct directives happen to be in the wrong order.

For example, take the following fill and stroke directives for a symbolizer. In SLD, this is valid:

.. code-block:: xml

   <Fill>
     <CssParameter name="fill">#ff0000</CssParameter>
   </Fill>
   <Stroke>
     <CssParameter name="stroke">#000000</CssParameter>
   </Stroke>                

while this is invalid:

.. code-block:: xml

   <Stroke>
     <CssParameter name="stroke">#000000</CssParameter>
   </Stroke>                
   <Fill>
     <CssParameter name="fill">#ff0000</CssParameter>
   </Fill>

YSLD, by contrast, does not require any of the directives to be ordered, so long as they are contained in the proper block.

For example, the following are both equally valid:

.. code-block:: yaml

   fill-color: '#FF0000'
   stroke-color: '#000000'

and:

.. code-block:: yaml

   stroke-color: '#000000'
   fill-color: '#FF0000'

Contains variables for reusable code
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In SLD, if you have content that needs to be reused from rule to rule, you must manually generate the directives for each rule over and over. YSLD eliminates the need for redundant directives by introducing the ability to create variables that can take the place of the same content.

For example, all the directives that occur multiple times can be replaced with a variable:

.. code-block:: yaml

   define: &variable
     shape: circle
     fill-color: '#FF0000'
     stroke-color: '#000000'

   rules:
   - name: rule1
     scale: [35000,max]
     symbolizers:
     - point:
         size: 6
         symbols:
         - mark:
             <<: *variable
             stroke-width: 2
   - name: rule2
     scale: [min,35000]
     symbolizers:
     - point:
         size: 8
         symbols:
         - mark:
             <<: *variable
             stroke-width: 3

Note the definition of ``variable`` at the top, and the variable substitution in the line ``<<: *variable``.

Direct match with SLD
~~~~~~~~~~~~~~~~~~~~~

In addition to all of these advantages, YSLD directly aligns with SLD concepts. This allows existing SLD files to be converted into YSLD representation and back again.

.. note::

   While YSLD and SLD share the core concepts, several YSLD features are modified during use.

   * Comments are removed
   * Zoom parameters are converted to scale parameters
   * Variables are evaluated

.. note::

   Some may be familiar with a CSS extension for GeoServer, which attempts to mimic CSS-style syntax.

   While CSS syntax is familiar to many, there are some disadvantages when used with GeoServer. The CSS code needs to be converted to SLD internally, and the painter's model for CSS differs significantly from SLD, making it challenging to mimic the desired effects exactly. Also, CSS styles can be converted to SLD, but the reverse is not true, due to inherent differences in the way the styles are drawn.

   YSLD does not suffer from any of these limitations.

YSLD syntax
-----------

The following are the equivalent styles from the previous section on :ref:`geoserver.styling.sld`, but converted to YSLD. Please refer back to that section for comparisons if necessary.

Simple YSLD
~~~~~~~~~~~

The following example draws a simple 6-pixel red circle for each feature in a given layer.

.. code-block:: yaml
   :linenos:

   title: Simple Point
   feature-styles:
   - rules:
     - scale: [min, max]
       symbolizers:
       - point:
           size: 6
           symbols:
           - mark:
               shape: circle
               fill-color: '#FF0000'

* There is one feature-style (akin to ``<FeatureTypeStyle>``) which starts on **line 2**.
* There is one rule which starts on **line 3**.
* The symbolizer section (**line 5**) contains a single point symbolizer, starting at **line 6**.
* The size of the point is given on **line 7**.
* The symbol (mark) is set to be a red circle on **lines 8-11**.

.. figure:: img/sld_simplestyle.png

   Simple style applied to a layer

Another YSLD
~~~~~~~~~~~~

Here is an example of a YSLD file that includes attribute-based styling. As before, here are the criteria:

.. list-table::
   :header-rows: 1

   * - Rule name
     - Population ("pop")
     - Size (pixels)
   * - SmallPop
     - Less than 50,000
     - 8
   * - MediumPop
     - 50,000 to 100,000
     - 12
   * - LargePop
     - Greater than 100,000
     - 16

.. code-block:: yaml
   :linenos:

    title: Attribute-based point
    feature-styles:
    - rules:
      - name: SmallPop
        title: 1 to 50000
        filter: ${pop < '50000'}
        scale: [min, max]
        symbolizers:
        - point:
            size: 8
            symbols:
            - mark:
                shape: circle
                fill-color: '#0033CC'
      - name: MediumPop
        title: 50000 to 100000
        filter: ${pop >= '50000' AND pop < '100000'}
        scale: [min, max]
        symbolizers:
        - point:
            size: 12
            symbols:
            - mark:
                shape: circle
                fill-color: '#0033CC'
      - name: LargePop
        title: Greater than 100000
        filter: ${pop >= '100000'}
        scale: [min, max]
        symbolizers:
        - point:
            size: 16
            symbols:
            - mark:
                shape: circle
                fill-color: '#0033CC'

* The first rule is contained on **lines 4-14**.
* The first rule contains a filter for the ``pop`` attribute on **line 6**.
* The point symbolizer for the first rule is on **lines 9-14**, containing the point size, shape, and color information.
* The second rule is on **lines 15-25** and the third rule is on **lines 26-36**. The only differences between them are the filter and the point size.

.. figure:: img/sld_intermediatestyle.png

   The result of the above style

And just like SLD has the ability to simplify based on functions, so does YSLD, making the resulting style even more compact:

.. code-block:: yaml
   :linenos:

   title: Attribute-based point
   feature-styles:
   - name: name
     rules:
     - name: Population
       title: Population with three categories
       scale: [min, max]
       symbolizers:
       - point:
           size: ${Categorize(pop,'8','50000','16','100000','20')}
           symbols:
           - mark:
               shape: circle
               fill-color: '#0033CC'

* There is a single rule on **lines 5-14**.
* The Categorize function is contained on **line 10**.

As before, the result of this YSLD yields the exact same output as the example with the three separate rules, but with less than half the number of lines.

More styles
-----------

More complex styles for certain layers in this workshop have been created in advance. Please see the :file:`styles` folder in the workshop materials for examples. They will be utilized in the next section.

