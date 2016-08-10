.. _css:

CSS
===

In the last section, we saw how the OGC defines style using XML documents (called SLD files).

We will now explore GeoServer styling in greater detail using a tool to generate our SLD files. The **Cascading Style Sheet (CSS)** GeoServer extension is used to generate SLD files using a syntax more familiar to web developers.

Using the CSS extension to define styles results in shorter examples that are easier to understand. At any point we will be able to review the generated SLD file.

Reference:

* :manual:`CSS Styling <extensions/css/index.html>` (User Manual)

Syntax
------

This section provides a quick introduction to CSS syntax for mapping professionals who may not be familiar with web design.

Key properties
^^^^^^^^^^^^^^

As we work through CSS styling examples you will note the use of **key properties**. These properties are required to trigger the creation of an appropriate symbolizer in SLD.

=========== ====================================================
stroke      Color (or graphic) for LineString or Polygon border
fill        Color (or graphic) for Polygon Fill
mark        Well-known Mark or graphic used for Point
label       Text expression labeling
halo-radius Size of halo used to outline label
=========== ====================================================

Using just these key properties and the selector :kbd:`*`, you will be able to visualize vector data.

For example, here is the key property **stroke** providing a gray representation for line or polygon data:

.. code-block:: css
   
   * {
      stroke: gray;
   }

Here is the key property **fill** providing a blue fill for polygon data:

.. code-block:: css
   
   * {
      fill: #2020ED;
   }

Here is the key property **mark** showing the use of the well-known symbol :kbd:`square`:

.. code-block:: css
   
   * {
      mark: symbol(square);
   }
   
Here is the key property **label** generating labels using the :kbd:`CITY_NAME` feature attribute:

.. code-block:: css
   
   * {
      label: [CITY_NAME];
   }
   
Here is the key property **halo-radius** providing an outline around generated label:

.. code-block:: css
   
   * {
      label: [NAME];
      halo-radius: 1;
   }

Reference:

* :manual:`CSS Cookbook <extensions/css/cookbook.html>` (User Manual)
* :manual:`CSS Examples <extensions/css/examples.html>` (User Manual)

Rules
^^^^^

We have already seen a CSS style composed of a single rule:

.. code-block:: css
   
   * {
     mark: symbol(circle);
   }

We can also make a rule that only applies to a specific FeatureType:

.. code-block:: css
   
   populated_places {
     mark: symbol(triangle);
   }
   
We can make a style consisting of more than one rule, carefully choosing the selector for each rule. In this case we are using a selector to style capital cities with a star, and non-capital with a circle:

.. code-block:: css
   
   [ FEATURECLA = 'Admin-0 capital' ] {
     mark: symbol(star);
     mark-size: 6px;
   }
   
   [ FEATURECLA <> 'Admin-0 capital' ] {
     mark: symbol(circle);
     mark-size: 6px;
   }

The feature attribute test performed above uses **Constraint Query Language (CQL)**. This syntax can be used to define filters to select content, similar to how the SQL WHERE statement is used. It can also be used to define expressions to access attribute values allowing their use when defining style properties.

Rule selectors can also be triggered based on the state of the rendering engine. In this example we are only applying labels when zoomed in:

.. code-block:: css

   [@scale < 20000000] {
      label: [ NAME ];
   }

In the above example the label is defined using the CQL Expression :kbd:`NAME`. This results in a dynamic style that generates each label on a case-by-case basis, filling in the label with the feature attribute :kbd:`NAME`.

Reference:

* :manual:`Filter Syntax <extensions/css/filters.html>` (User Manual)
* :manual:`ECQL Reference <filter/ecql_reference.html>` (User Guide)

Cascading
^^^^^^^^^

In the above example feature attribute selection we repeated information. An alternate approach is to make use of CSS **Cascading** and factor out common properties into a general rule:

.. code-block:: css
   
   [ FEATURECLA = 'Admin-0 capital' ] {
     mark: symbol(star);
   }
   
   [ FEATURECLA <> 'Admin-0 capital' ] {
     mark: symbol(circle);
   }
   
   * {
     mark-size: 6px;
   }

Pseudo-selector
^^^^^^^^^^^^^^^

Up to this point we have been styling individual features, documenting how each shape is represented.

When a shape is represented using a symbol, we have a second challenge: documenting the colors and appearance of the symbol. The CSS extension provides a **pseudo-selector** allowing further properties to be applied to a symbol.

Example of using a pseudo-selector:

.. code-block:: css
   
   * {
     mark: symbol(circle);
   }
   
   :mark {
     fill: black;
     stroke: white;
   }

In this example the :kbd:`:mark` pseudo-selector is used select the circle mark, and provides a fill and stroke for use when rendering.

=============== ====================================
Pseudo-selector Use of symbol
=============== ====================================
:mark           point markers
:stroke         stroke patterns
:fill           fill patterns
:shield         label shield
:symbol         any use
=============== ====================================

The above pseudo-selectors apply to all symbols, but to be specific the syntax :kbd:`nth-symbol(1)` can be used:

.. code-block:: css
   
   * {
     mark: symbol(circle);
   }
   
   :nth-mark(1) {
     fill: black;
     stroke: white;
   }

Reference:

* :manual:`Styled Marks <extensions/css/styled-marks.html>` (User Guide)

Compare CSS to SLD
------------------
   
The CSS extension is built with the same GeoServer rendering engine in mind, providing access to all the functionality of SLD (along with vendor options for fine control of labeling). The two approaches use slightly different terminology: SLD uses terms familiar to mapping professionals, CSS uses ideas familiar to web developers.

SLD Style
^^^^^^^^^

**SLD** makes use of a series of **Rules** to select content for display. Content is selected using filters that support attribute, spatial and temporal queries.

Once selected, **content is transformed into a shape and drawn using symbolizers**. Symbolizers are configured using CSS Properties to document settings such as "fill" and "opacity".

Content can be drawn by more than one rule, allowing for a range of effects.

Here is an example :download:`SLD file </files/airports2.sld>` for reference: 

.. literalinclude:: /files/airports2.sld
   :language: xml

CSS Style
^^^^^^^^^

**CSS** also makes use of rules, each rule making use of **selectors** to shortlist content for display. Each selector uses a CQL filter that suports attribute, spatial and temporal queries. Once selected, CSS Properties are used to describe how content is rendered.

Content is not drawn by more than one rule. When content satisfies the conditions of more than one rule the resulting properties are combined using a process called inheritance. This technique of having a generic rule that is refined for specific cases is where the **Cascading** in Cascading Style Sheet comes from.
  
Here is an example using CSS:

.. code-block:: css
   
   * {
     mark: url(airport.svg);
     mark-mime: "image/svg";
   }

In this rule the **selector** :kbd:`*` is used to match **all content**. The rule defines **properties** indicating how this content is to be styled. The property :kbd:`mark` is used to indicate we want this content drawn as a **Point**. The value :kbd:`url(airport.svg)` is a URL reference to the image file used to represent each point. The :kbd:`mark-mime` property indicates the expected format of this image file.

Tour
----

To confirm everything works, let's reproduce the airports style above.

.. note:: In preparing for FOSS4G we missed adding the airports layer. Please excuse the following review of GeoServer publication.

#. Start up GeoServer and open http://localhost:8080/geoserver in your Browser.

#. Login to web administration using:

   .. list-table:: 
      :widths: 30 70
      :stub-columns: 1

      * - User:
        - :kbd:`admin`
      * - Password:
        - :kbd:`geoserver`

   .. image:: /style/img/layer_01_login.png
   
#. We missed adding the airport layer to the FOSS4G vm, so let's do so now.

   Navigate to :menuselection:`Data --> Layers` to open the :guilabel:`Layers` page.
   
   .. image:: /style/img/layer_02_menu.png

#. From the :guilabel:`Layers` page click :guilabel:`Add a new resource`

   .. image:: /style/img/layer_03_add.png

#. From the :guilabel:`New Layer` screen select:

   .. list-table:: 
      :widths: 30 70
      :stub-columns: 1

      * - Add layer from:
        - :kbd:`ne:cultural`
   
   ..image:: img/layer_04_new.png

#. From the list of available layers locate ``ne_10m_airports`` and click :guilabel:`Publish`

   .. image:: /style/img/layer_05_publish.png
   
#. From the ``Edit Layer`` page find the section for ``Basic Resource Info`` and fill in following.

   .. list-table:: 
      :widths: 30 70
      :stub-columns: 1

      * - Name:
        - :kbd:`airports`
      * - Title:
        - :kbd:`Airports`

   .. image:: /style/img/layer_06_basic.png

#. Find the ``Coordinate Reference System`` and confirm the following details.
   
   .. list-table:: 
      :widths: 30 70
      :stub-columns: 1

      * - Native SRS:
        - :kbd:`EPSG:4326`
      * - Declared SRS:
        - :kbd:`EPSG:4326`

   .. image:: /style/img/layer_07_crs.png
   
   This information is determined using the :file:`prj` file (and requires the file contain an **authority** element).
   
#. Find the ``Bounding Boxes`` section click :guilabel:`Compute from data` followed by :guilabel:`Compute from native bounds`.
   
   This step is required for publication (calculating the bounds from the shape file header).

   .. image:: /style/img/layer_08_bbox.png

#. Scroll down and click :guilabel:`Save` to publish the `ne:airports` layer.

   .. image:: /style/img/layer_09_save.png
   
#. Navigate to the **CSS Styles** page. This page works with two selections (style being edited and data used for preview) and provides a number of actions for style management.
   
   .. figure:: /style/img/css_01_actions.png

      CSS Styles page

#. Change our preview data to `training:airports`. This dataset will be used as a reference as we define our style.

   Click :guilabel:`Choose a different layer` and select :kbd:`training:airports` from the list.

   .. figure:: /style/img/css_02_choose_data.png

      Choosing the airports layer

#. Each time we edit a CSS style, the contents of the associated SLD file are replaced. Rather then disrupt any of our existing styles we will create a new style.

   Click :guilabel:`Create a new style` and choose the following:

   .. list-table:: 
      :widths: 30 70
      :stub-columns: 1

      * - Workspace for new layer:
        - :kbd:`No workspace`
      * - New style name:
        - :kbd:`airport2`
     
   .. figure:: /style/img/css_03_new_style.png

      New style
   
#. The initial style sheet is:

   .. code-block:: css
   
      * { fill: lightgrey; }
   
   Replace this definition with our airport CSS example:

   .. code-block:: css

      * {
        mark: url(airport.svg);
        mark-mime: "image/svg";
      }

#. Click :guilabel:`Submit` and then the :guilabel:`Map` tab for an initial preview.
   
   You can use this tab to follow along as the style is edited, it will refresh each time :guilabel:`Submit` is pressed.

   .. figure:: /style/img/css_04_edit.png

      Editing the CSS example

#. The :guilabel:`Generated SLD` shows the SLD file produced.

   .. figure:: /style/img/css_05_generated.png

      Generated SLD

#. Click :guilabel:`Map` to preview using the selected data. You can use the mouse buttons to pan and scroll wheel to change scale.

   .. figure:: /style/img/css_06_preview.png

      Layer preview

#. Click :guilabel:`Data` for a summary of the selected data.

   .. figure:: /style/img/css_07_data.png

      Layer attributes

#. Finally the :guilabel:`CSS Reference` tab embeds the :manual:`CSS Styling <extensions/css/index.html>` section of the user manual.

Bonus
-----

Finished early? For now please help your neighbour so we can proceed with the workshop.

If you are really stuck please consider the following challenge rather than skipping ahead.

.. admonition:: Explore

   #. Return to the :guilabel:`Data` tab and use the :guilabel:`Compute` link to determine the minimum and maximum for the **scalerank** attribute.
   
      .. only:: instructor
    
         .. admonition:: Instructor Notes

            Should be 2 and 9 respectively.

.. admonition:: Challenge Compare SLD Generation

   #. Compare the generated SLD differ from the hand generated :download:`SLD file </files/airports2.sld>` used as an example?
   
   #. **Challenge:** What differences can you spot?
      
      .. only:: instructor
       
         .. admonition:: Instructor Notes      
 
            Generated SLD does not include name or title information; this can be added by students using an annotation. Encourage students to look this up in the reference material provided.
         
            The second difference is with the use of a fallback Mark when defining a PointSymbolizer. The CSS extension does not bother with a fallback as it knows the capabilities of the GeoServer rendering engine (and is not trying to create a reusable style).

