.. _openlayers.controls.scaleline:

Displaying a Scale Bar
======================

Another typical widget to display on maps is a scale bar.  OpenLayers provides an ``OpenLayers.Control.ScaleLine`` for just this.  We'll continue building on the :ref:`previous example <openlayers.controls.overview.example>` by adding a scale bar.

Creating a ScaleLine Control
----------------------------

.. rubric:: Tasks

#.  Open the ``map.html`` produced in the :ref:`previous example <openlayers.controls.overview.example>` in your text editor.

#.  Somewhere in the map initialization (below the ``map`` constructor), add the following code to create a new scale line control for your map:
    
    .. code-block:: javascript
    
        var scaleline = new OpenLayers.Control.ScaleLine();
        map.addControl(scaleline);

#.  Save your changes and open ``map.html`` in your browser: @workshop_url@/map.html
    
    .. figure:: scaleline1.png
    
    A default (and very hard to see) scale bar in the bottom left-hand corner
    


Moving the ScaleLine Control
----------------------------

You may find the scale bar a bit hard to read over the Medford imagery. There are a few approaches to take in order to improve scale visibility.  If you want to keep the control inside the map viewport, you can add some style declarations within the CSS of your document. To test this out, you can include a background color and padding to the scale bar with something like the following:


    .. code-block:: html

        .olControlScaleLine {
            background: white;
            padding: 10px;
        }


However, for the sake of this exercise, let's say you think the map viewport is getting unbearably crowded. To avoid such over-crowding, you can display the scale in a different location. To accomplish this, we need to first create an additional element in our markup and then tell the scale control to render itself within this new element.

.. rubric:: Tasks

#.  Remove any scale style declarations, and create a new block level element in the ``<body>`` of your page. To make this element easy to refer to, we'll give it an ``id`` attribute. Insert the following markup somewhere in the ``<body>`` of your ``map.html`` page. (Placing the scale element right after the map viewport element ``<div id="map-id"></div>`` makes sense.):
    
    .. code-block:: html
    
        <div id="scaleline-id"></div>

#.  Now modify the code creating the scale control so that it refers to the ``scaleline-id`` element:
    
    .. code-block:: javascript
    
        var scaleline = new OpenLayers.Control.ScaleLine({
            div: document.getElementById("scaleline-id")
        });

#.  Save your changes and open ``map.html`` in your browser: @workshop_url@/map.html    
    
#.  You may decide that you want to add a bit of style to the widget. To do this, we can use the ``#scaleline-id`` selector in our CSS. Make the font smaller and give the widget some margin, by adding the following style declarations:
    
    .. code-block:: html
    
        #scaleline-id {
            margin: 10px;
            font-size: xx-small;
        }

#.  Now save your changes and view ``map.html`` again in your browser: @workshop_url@/map.html

    .. figure:: scaleline2.png
   
       A custom styled scale bar outside the map viewport.

