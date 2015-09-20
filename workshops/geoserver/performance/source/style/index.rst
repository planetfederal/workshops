.. style:

*******
Style
*******

After JVM tuning the next quick fix is reviewing the styles used for rendering.

For this discussion keep in mind the following rendering pipeline.

Use Filters
===========

The roads data set we using contains a `scale hint` parameter - specifically to help us short list content to be displayed at different zoom levels.

.. admonition:: Exercise
   
   #. Benchmark the roads_na layer.
   
   #. Use rules and filters to reduce the amount of geometry shown when zoomed out.

      .. literalinclude:: /files/roads_filter.sld
         :language: xml
   
   #. Run the benchmark again for a dramatic difference in performance.
      
      If you experiment carefully with this technique you should be able get the same visual with much better performance.

Avoid Expensive Styles
======================

The amount of control provided by the Style Layer Descriptor format is staggering allowing you to accomplish many amazing effects. Some of these styling options are more expensive in performance terms than others.

* Transparency: Working with any transparency at all will basically double your rendering time.

  Make sure that each symbolizer you use has opacity set to 1.

  If you are only looking to “lighten” your colors; rather than see through filled shapes to see other layers consider changing the saturation on a feature by feature basis.

  If you are looking to see line work or outlines of polygons under the current one – consider drawing just the outlines using one Rule, and the various Fill symbolizers in another.

* Labels are Really Expensive: Generating labels is a really expensive proposition; GeoServer has to collect all the possible labels and then shuffle them into position (depending on the priorities you set).

  There is no real alternative to text – so we will need to focus on minimizing the time it takes to shuffle labels into position. If possible try and use the Rule techniques to limit the number of features you generate labels for; and make use of label priority settings to assist in the selection process.

* Halo is Very Expensive: Rendering these labels is even more expensive if you add a Halo.

