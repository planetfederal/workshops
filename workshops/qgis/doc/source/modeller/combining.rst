Combining models
================

We have an additional vector layer that contains soil data that we can also use to do another analysis; unfortunately, our current model requires a raster input. Since models are effectively processes themselves, we can create a new model which performs a rasterisation step before calling the **Zone analysis** model.

#. Prepare the **soil500k.shp** data by reprojecting it to the **EPSG:2163** CRS and adding it to our ``qgis/data`` directory and including it in the **Data** list.

#. Style the new **Soil** layer using the **SMU** attribute.

#. Create a new model with the name :kbd:`Zone analysis (vector)` and the group :kbd:`workshop`.

#. The inputs to the new model will be similar to our **Zone analysis** model in that it needs a ``Zones`` input polygon layer and a ``Class`` field from ``Zones``. However, instead of a raster input layer, we will need to provide another vector layer that we will rasterize and the particular attribute to use during the rasterization.

   .. figure:: images/vector_model_1.png

      **Zone analysis (vector)** inputs

#. If we recall, before converting our vector into a raster, we had to ensure that the attribute we will use to create the raster is numerical rather than, say, a textual label. For this we used the **Create equivalent numerical field** script and we will need it in our new model as well with the inputs ``Vector`` and ``Attribute field``.

#. Set the output table to be :kbd:`Reference`, since this will be the reference table that we'll use to relate the raster values to the original attribute.

   .. figure:: images/vector_model_2.png

#. Add a new **Rasterize** process which takes the output of the previous process for the vector input. We also need a field from this layer and we know ahead of time that it will be ``NUM_FIELD``, since this is what the **Create equivalent numerical field** process adds to the output layer. Leave the output blank since we will feed it into the next process.

   .. figure:: images/rasterize.png

      Adding a **Rasterize** process to the model

#. Add a new **Zone analysis** process (which is actually the model we created earlier!). The ``Image`` input will be the output of our **Rasterize** process. You will also need to set the output names of the model: ``zonal baseline``, ``zonal majority`` and ``zonal statistics``.

   .. figure:: images/vector_model_3.png

      Complete **Zone analysis (vector)**

#. Save the model.

#. Run the **Zone analysis (vector)** model using the **Soils** layer as the vector input and **SMU** as the attribute to rasterize with. We will again use :kbd:`Soils (reference)`, :kbd:`Soils (majority)`, :kbd:`Soils (stats)` and :kbd:`Soils (baseline)` as outputs to match our previous analyses.

#. Move the results to the correct groups and add appropriate styling.
