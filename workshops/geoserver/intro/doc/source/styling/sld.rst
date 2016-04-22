.. _geoserver.styling.sld:

Styled Layer Descriptor
=======================

GeoServer uses the Styled Layer Descriptor (SLD) markup language to visualize geospatial data. SLD is an XML-based standard created by the Open Geospatial Consortium (OGC). For more information on the SLD schema, please see the `OGC page on Styled Layer Descriptor <http://www.opengeospatial.org/standards/sld>`_.

Viewing an SLD
--------------

GeoServer saves SLD information as plain text files in its data directory. These styles can be retrieved through the :ref:`geoserver.webadmin`.

#. Click the :guilabel:`Styles` link under :guilabel:`Data` on the left side of the page.

   .. figure:: img/sld_styleslink.png

      Click to go to the Styles page

#. Click the entry in the list called :guilabel:`point`.

   .. figure:: img/sld_point.png

      The "point" style

#. This brings up the Style Editor for this particular style. While we won't be editing this style now, take a look at it and feel free to refer back during the next few sections.

   .. figure:: img/sld_pointedit.png

      Viewing the "point" style

SLD structure
-------------

An SLD file contains the following hierarchical structure:

* Header

  * FeatureTypeStyles

    * Rules

      * Symbolizers

The header of the SLD contains metadata about XML namespaces, and is usually identical among different SLDs.

.. note:: The details of the header are beyond the scope of this workshop.

A **FeatureTypeStyle** is a group of styling rules. (Recall that a :term:`featuretype` is another word for a :term:`layer`.)  Grouping by FeatureTypeStyle affects rendering order; the first FeatureTypeStyle will be rendered first, followed by the second, etc, allowing for precise control of drawing order.

A **Rule** is a single styling directive. It can apply globally to a layer, or it can have logic associated with it so that the rule is conditionally applied. These conditions can be based on the attributes of the data or based on the scale (zoom) level of the data being rendered.

A **Symbolizer** is the actual style instruction. There are five types of symbolizers:

* PointSymbolizer
* LineSymbolizer
* PolygonSymbolizer
* RasterSymbolizer
* TextSymbolizer

There can be one or more FeatureTypeStyles per SLD, one or more Rules per FeatureTypeStyles, and one or more Symbolizers per Rule.

Simple SLD
----------

The following example draws a simple 6-pixel red circle for each feature in a given layer.

.. code-block:: xml
   :linenos:

   <?xml version="1.0" encoding="ISO-8859-1"?>
   <StyledLayerDescriptor version="1.0.0" 
    xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" 
    xmlns="http://www.opengis.net/sld" 
    xmlns:ogc="http://www.opengis.net/ogc" 
    xmlns:xlink="http://www.w3.org/1999/xlink" 
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
     <NamedLayer>
       <Name>Simple Point</Name>
       <UserStyle>
         <Title>Simple Point</Title>
         <FeatureTypeStyle>
           <Rule>
             <PointSymbolizer>
               <Graphic>
                 <Mark>
                   <WellKnownName>circle</WellKnownName>
                   <Fill>
                     <CssParameter name="fill">#FF0000</CssParameter>
                   </Fill>
                 </Mark>
                 <Size>6</Size>
               </Graphic>
             </PointSymbolizer>
           </Rule>
         </FeatureTypeStyle>
       </UserStyle>
     </NamedLayer>
   </StyledLayerDescriptor>

* The first 11 lines are the header, which contain XML namespace information, as well as the Name and Title of the SLD.
* The actual styling happens inside the ``<FeatureTypeStyle>`` tag (**lines 12-26**), of which there is only one in this example.
* The tag contains one ``<Rule>`` (**lines 13-25**)
* That one rule contains one symbolizer, a ``<PointSymbolizer>`` (**lines 14-24**).
* The symbolizer directive creates a graphic mark of a "well known name", in this case a circle (**line 17**).
* This shape has a ``<Fill>`` parameter of #FF0000 (**line 19**), which is an RGB color code for 100% red.
* The shape also has a ``<Size>`` of 6 (**line 22**), which is the diameter of the circle in pixels.

When applied to a hypothetical layer, the result would look like this:

.. figure:: img/sld_simplestyle.png

   Simple style applied to a layer

Another SLD example
-------------------

Here is an example of an SLD style that includes attribute-based styling. The SLD also contains three rules. Each rule has an attribute-based condition, with the outcome determining the size of the shape being rendered. The attribute in question is called "pop", and the three rules are "**less than 50000**", "**50000 to 100000**", and "**greater than 100000**". The result is a blue circle with a size of 8, 12, of 16 pixels, depending on the rule.

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

.. code-block:: xml
   :linenos:

   <?xml version="1.0" encoding="ISO-8859-1"?>
   <StyledLayerDescriptor version="1.0.0" 
    xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" 
    xmlns="http://www.opengis.net/sld" 
    xmlns:ogc="http://www.opengis.net/ogc" 
    xmlns:xlink="http://www.w3.org/1999/xlink" 
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
     <NamedLayer>
       <Name>Attribute-based point</Name>
       <UserStyle>
         <Title>Attribute-based point</Title>
         <FeatureTypeStyle>
           <Rule>
             <Name>SmallPop</Name>
             <Title>1 to 50000</Title>
             <ogc:Filter>
               <ogc:PropertyIsLessThan>
                 <ogc:PropertyName>pop</ogc:PropertyName>
                 <ogc:Literal>50000</ogc:Literal>
               </ogc:PropertyIsLessThan>
             </ogc:Filter>
             <PointSymbolizer>
               <Graphic>
                 <Mark>
                   <WellKnownName>circle</WellKnownName>
                   <Fill>
                     <CssParameter name="fill">#0033CC</CssParameter>
                   </Fill>
                 </Mark>
                 <Size>8</Size>
               </Graphic>
             </PointSymbolizer>
           </Rule>
           <Rule>
             <Name>MediumPop</Name>
             <Title>50000 to 100000</Title>
             <ogc:Filter>
               <ogc:And>
                 <ogc:PropertyIsGreaterThanOrEqualTo>
                   <ogc:PropertyName>pop</ogc:PropertyName>
                   <ogc:Literal>50000</ogc:Literal>
                 </ogc:PropertyIsGreaterThanOrEqualTo>
                 <ogc:PropertyIsLessThan>
                   <ogc:PropertyName>pop</ogc:PropertyName>
                   <ogc:Literal>100000</ogc:Literal>
                 </ogc:PropertyIsLessThan>
               </ogc:And>
             </ogc:Filter>
             <PointSymbolizer>
               <Graphic>
                 <Mark>
                   <WellKnownName>circle</WellKnownName>
                   <Fill>
                     <CssParameter name="fill">#0033CC</CssParameter>
                   </Fill>
                 </Mark>
                 <Size>12</Size>
               </Graphic>
             </PointSymbolizer>
           </Rule>
           <Rule>
             <Name>LargePop</Name>
             <Title>Greater than 100000</Title>
             <ogc:Filter>
               <ogc:PropertyIsGreaterThanOrEqualTo>
                 <ogc:PropertyName>pop</ogc:PropertyName>
                 <ogc:Literal>100000</ogc:Literal>
               </ogc:PropertyIsGreaterThanOrEqualTo>
             </ogc:Filter>
             <PointSymbolizer>
               <Graphic>
                 <Mark>
                   <WellKnownName>circle</WellKnownName>
                   <Fill>
                     <CssParameter name="fill">#0033CC</CssParameter>
                   </Fill>
                 </Mark>
                 <Size>16</Size>
               </Graphic>
             </PointSymbolizer>
           </Rule>
         </FeatureTypeStyle>
       </UserStyle>
     </NamedLayer>
   </StyledLayerDescriptor>

It is helpful to break the SLD down into components when it gets large:

* There are three rules in this style, all of which are contained inside of a single FeatureTypeStyle.
* Looking at the first rule (**lines 13-33**), there is a filter tag (``<ogc:Filter>``).
* This filter specifies that if the attribute value of ``pop`` for a given feature is less than 50000, then the condition is true and the feature is displayed.
* The second rule (**lines 34-60**) has a compound filter that specifies that the attribute value must be both greater than or equal to 50000 and less than 100000 in order for the feature to be rendered.
* Finally, the third rule (**lines 61-77**) has a filter that specifies that the attribute value must be greater that or equal to 100000 in order for the feature to be rendered.

.. figure:: img/sld_intermediatestyle.png

   The result of the above style

The above is a lot of code for not a lot of styling directive. And indeed, there are functions available in SLD that allow you to simplify code in areas where there is repetition. In the above example, the only things that change from rule to rule are the name, property, and the size of the resulting point. This can therefore be reduced to the following:

.. code-block:: xml
   :linenos:

   <?xml version="1.0" encoding="ISO-8859-1"?>
   <StyledLayerDescriptor version="1.0.0" 
    xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" 
    xmlns="http://www.opengis.net/sld" 
    xmlns:ogc="http://www.opengis.net/ogc" 
    xmlns:xlink="http://www.w3.org/1999/xlink" 
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
     <NamedLayer>
       <Name>Attribute-based point</Name>
       <UserStyle>
         <Title>Attribute-based point</Title>
         <FeatureTypeStyle>
           <Rule>
             <Name>Population</Name>
             <Title>Population with three categories</Title>
             <PointSymbolizer>
               <Graphic>
                 <Mark>
                   <WellKnownName>circle</WellKnownName>
                   <Fill>
                     <CssParameter name="fill">#0033CC</CssParameter>
                   </Fill>
                 </Mark>
                 <Size>
                   <ogc:Function name="Categorize">
                     <ogc:PropertyName>pop</ogc:PropertyName>
                     <ogc:Literal>8</ogc:Literal>
                     <ogc:Literal>50000</ogc:Literal>
                     <ogc:Literal>16</ogc:Literal>
                     <ogc:Literal>100000</ogc:Literal>
                     <ogc:Literal>20</ogc:Literal>
                   </ogc:Function>
                 </Size>
               </Graphic>
             </PointSymbolizer>
           </Rule>
         </FeatureTypeStyle>
       </UserStyle>
     </NamedLayer>
   </StyledLayerDescriptor>


This example uses the "Categorize" function, which transforms a continuous-valued attribute into a set of discrete values. Specifically, we want to transform the population value (which can vary) to a set of possible size values for the point.

* There is a single rule (**lines 13-36**) that encompasses all the directives of the three rules in the previous example.
* The Mark (both shape and color) are set on **lines 18-23**.
* The interesting part of this style is contained in the Size tag (**lines 24-33**). Instead of a constant value, there is a Categorize function which dyamically selects a value based on criteria.
* The first value in the Categorize function (**line 26**) determines what attribute to test. In this case, it is the ``pop`` attribute.
* The next values are connected in "size" / "attribute value" pairs. As in: **lines 27-28** state that the size will be set to 8 when the ``pop`` attribute is less than 50,000, and the size will be set to 16 when the ``pop`` attribute is between 50,000 and 100,000.
* The final value in the Categorize function (**line 31**) is the size when the ``pop`` attribute is greater than all the others, so greater than 100,000.  

The result of this SLD yields the exact same output as above, but with less than half the number of lines.

.. note:: Learn more about the transformation functions such as Categorize in the `GeoServer documentation <http://docs.geoserver.org/latest/en/user/styling/sld-tipstricks/transformation-func.html>`_

SLD Cookbook
------------

The GeoServer documentation (available at http://docs.geoserver.org) contains a collection of styles called the SLD Cookbook, designed for those wishing to learn SLD, or those who want a quick reference. The SLD Cookbook is available at `<http://docs.geoserver.org/stable/en/user/styling/sld-cookbook/>`_. Some of the above SLD examples were taken from the SLD Cookbook.
