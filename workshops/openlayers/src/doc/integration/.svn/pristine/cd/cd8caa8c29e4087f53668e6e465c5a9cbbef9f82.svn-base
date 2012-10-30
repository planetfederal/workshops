.. _openlayers.integration.ext-slider:

The Ext JS Slider
=================

As with the jQuery sliders, an Ext slider provides a widget for collecting a
user supplied value within some range. This exercise will duplicate the
functionality put together in the :ref:`jQuery UI slider
<openlayers.integration.jqui-slider>` section above.

The configuration for Ext widgets is extremely flexible. One way to create a
slider widget is to start with a DOM element that will serve as the slider
container.

.. code-block:: html

    <div id="slider"></div>

Given the above, the following code creates a functioning Ext slider.

.. code-block:: javascript

    var slider = new Ext.Slider({renderTo: "slider"});

We'll use the above technique to create a slider for controlling layer opacity.

Using a Slider to Control Layer Opacity
---------------------------------------

We'll start with a working example that displays one :abbr:`WMS (OGC Web Map
Service)` layer and one vector layer with features from a :abbr:`WFS (OGC Web
Feature Service)`.

.. rubric:: Tasks

#.  Open your text editor and paste in the code used at the `start` of the
    :ref:`previous slider example <openlayers.integration.jqui-slider.example>`.
    Save this as ``map.html`` in the root of your workshop directory.

#.  Next we need to pull in the Ext resources that our widget will require.
    Add the following markup to the ``<head>`` of your ``map.html`` document:
    
    .. code-block:: html

        <link rel="stylesheet" href="ext/resources/css/ext-all.css" type="text/css">
        <script src="ext/adapter/ext/ext-base.js"></script>	
        <script src="ext/ext-all.js"></script>


#.  Now we'll create some markup that will create a container for the slider
    widget. In the ``<body>`` of your ``map.html`` file, just after the map
    viewport, insert the following:
    
    .. code-block:: html
    
        <div id="slider-id"></div>    

#.  One bit of preparation before finalizing the code is to style the slider container. 
    In this case, we'll make it as
    wide as the map and give it some margin. Insert the following style
    declarations into the ``<style>`` element within the ``<head>`` of your
    document:
    
    .. code-block:: html
    
        #slider-id {
            width: 492px;
            margin: 10px;
        }

#.  Somewhere in your map initialization code, add the following to create a
    slider in the container element and set up the slider listener to change
    layer opacity:
    
    .. code-block:: javascript
    
        var slider = new Ext.Slider({
            renderTo: "slider-id",
            value: 100,
            listeners: {
                change: function(el, val) {
                    base.setOpacity(val / 100);
                }
            }
        });

#.  Save your changes to ``map.html`` and open the page in your browser:
    @workshop_url@/map.html

    .. figure:: ext-slider1.png
   
      A map with a slider widget to control layer opacity.

.. rubric:: Bonus Task

#.  Find the Slider widget in the Ext JS documentation.  Locate the
    configuration option that allows you to specify a set of intervals for
    setting the slider value. Experiment with adding a set of intervals to the
    slider. Configure the slider to restrict the range of opacity values that
    can be set.

With a functioning layer opacity slider in your application, you're ready to
move on to :ref:`working with windows <openlayers.integration.ext-window>`.
