Modifying a model
=================

Our first model did not create a baseline table that shows the overall breakdown of values, something which can be useful for determining if results are significant. We created the baseline table for our **Surficial geology** layer by using a layer with a single feature that covered the entire area in which we are interested in.

Without changing the inputs to our model, we can accomplish this same task by adding additional processes that generate the extra output we'd like.

#. Open the existing model in the editor.

#. Add a **Dissolve** process that takes **Zones** as an input and does not use an attribute, but rather dissolves all borders. This will create our areas of interest layer to measure against.

   .. note:: We could have provided another input that would allow us to use our existing **Area of interest**, but calculating it dynamically allows this model to be reused even when we have not already pre-calculated the **Area of interest**.

#. Create a new **Frequency Analysis** process that takes the output of the **Dissolve** process as the ``vector`` input parameter, and use the ``Class`` input parameter as the ``id_field``. 
   
#. Set the ``raster`` input to be the ``Image`` input parameter. Set the table output to :kbd:`zonal baseline`.

   .. figure:: images/raster_model_4.png

      Adding a baseline calculation

#. Run the model, but save the three outputs to files in the ``qgis\results`` directory just as we did for the analysis of the **Surficial geometries** layer. 
   
#. Move the new additions into a new **Landcover** sub-group in our **Results** list.
