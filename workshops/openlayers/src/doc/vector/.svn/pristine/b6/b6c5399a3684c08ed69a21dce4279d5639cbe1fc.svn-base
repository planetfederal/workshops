.. _openlayers.vector.style-intro:

Understanding Style
===================

When styling HTML elements, you might use CSS like the following:

.. code-block:: html

    .someClass {
        background-color: blue;
        border-width: 1px;
        border-color: olive;
    }

The ``.someClass`` text is a selector (in this case it selects all elements that include the class name ``"someClass"``) and the block that follows is a group of named properties and values, otherwise known as style declarations.

OpenLayers.Filter
-----------------

When styling features in OpenLayers, your selectors are ``OpenLayers.Filter`` objects.  Assuming you want to apply a style to all features that have an  attribute named ``class`` with a value of ``"someClass"``, you would start with a filter like the following:

.. code-block:: javascript

    new OpenLayers.Filter.Comparison({
        type: OpenLayers.Filter.Comparison.EQUAL_TO,
        property: "class",
        value: "someClass"
    })

Symbolizers
-----------

The equivalent of a declaration block in CSS is a `symbolizer` in OpenLayers (these are typically object literals). To paint features with a blue background and a 1 pixel wide olive stroke, you would use a symbolizer like the following:

.. code-block:: javascript

    {
        fillColor: "blue",
        strokeWidth: 1,
        strokeColor: "olive"
    }

OpenLayers.Rule
---------------

To combine a filter with a symbolizer, we use an ``OpenLayers.Rule`` object. As such, a rule that says `"paint all features with class equal to 'someClass' using a 1px olive stroke and blue fill"` would be created as follows:

.. code-block:: javascript

    new OpenLayers.Rule({
        filter: new OpenLayers.Filter.Comparison({
            type: OpenLayers.Filter.Comparison.EQUAL_TO,
            property: "class",
            value: "someClass"
        }),
        symbolizer: {
            fillColor: "blue",
            strokeWidth: 1,
            strokeColor: "olive"
        }
    })

OpenLayers.Style
----------------

As in CSS page, where you may have many rules-- selectors and associated declaration blocks--you are likely to have more than one rule for styling the features of a given map layer. You group ``OpenLayers.Rule`` objects together in an ``OpenLayers.Style`` object. A style object is typically constructed with a base symbolizer. When a feature is rendered, the base symbolizer is extended with symbolizers from all rules that apply to the feature.

So, if you want all features to be colored red except for those that have a ``class`` attribute with the value of ``"someClass"`` (and you want those features colored blue with an 1px olive stroke), you would create a style that looked like the following:

.. code-block:: javascript

    var myStyle = new OpenLayers.Style({
        // this is the base symbolizer
        fillColor: "red"
    }, {
        rules: [
            new OpenLayers.Rule({
                filter: new OpenLayers.Filter.Comparison({
                    type: OpenLayers.Filter.Comparison.EQUAL_TO,
                    property: "class",
                    value: "someClass"
                }),
                symbolizer: {
                    fillColor: "blue",
                    strokeWidth: 1,
                    strokeColor: "olive"
                }
            }),
            new OpenLayers.Rule({elseFilter: true})
        ]
    });

.. note ::

    If you don't include any rules in a style, `all` of the features in a layer will be rendered with the base symbolizer (first argument to the ``OpenLayers.Style`` constructor). If you include `any` rules in your style, only features that pass at least one of the rule constraints will be rendered. The ``elseFilter`` property of a rule let's you provide a rule that applies to all features that haven't met any of the constraints of your other rules.

OpenLayers.StyleMap
-------------------

CSS allows for pseudo-classes on selectors. These basically limit the application of style declarations based on contexts such as mouse position, neighboring elements, or browser history, that are not easily represented in the selector. In OpenLayers, a somewhat similar concept is one of "render intent." Without defining the full set of render intents that you can use, the library allows for sets of rules to apply only under specific contexts.

So, the ``active`` pseudo-class in CSS limits the selector to the currently selected element (e.g. ``a:active``). In the same way, the ``"select"`` render intent applies to currently selected features. The mapping of render intents to groups of rules is called an ``OpenLayers.StyleMap``.

Following on with the above examples, if you wanted all features to be painted fuchsia when selected, and otherwise you wanted the ``myStyle`` defined above to be applied, you would create an ``OpenLayers.StyleMap`` like the following:

.. code-block:: javascript

    var styleMap = new OpenLayers.StyleMap({
        "default": myStyle,
        "select": new OpenLayers.Style({
            fillColor: "fuchsia"
        })
    });

To determine how features in a vector layer are styled, you need to construct the layer with an ``OpenLayers.StyleMap``. 

With the basics of styling under your belt, it's time to move on to :ref:`styling vector layers <openlayers.style>`.
