Discrete and continuous data
============================

When performing an analysis on our land cover raster or converted vector data, but we also have the **Digital elevation model** raster that we would like to analyze. Elevation data sets are continuous, so our **Frequency analysis** process, which counts unique raster values, will not be suitable for this particular task. However, QGIS also comes with another algorithm that is intended for use with continuous data; this algorithm provides minimum, maximum, average and median values, all of which are added to the original vector data set. There is no tabular output equivalent to the statistics tables we have been generating, since all this data can be encoded directly into the vector tables.

.. note:: The graphical modeller does not come with the ability to add conditionals, so we will be creating a copy of our current model and modify it to use a different algorithm.

#. Create a new model named **Zone analysis (continuous)** in the **workshops** group.

#. As with our previous model, we will use the **Image**, **Zones** and **Class** inputs.

#. Add a **Zonal statistics** process that uses **Image** and **Zones** to calculate a new **zonal averages** output.

#. Add a **Dissolve** process to create the single area of interest.

#. Add a **Zonal statistics** process that uses **Image** and the output of the **Dissolve** process to calcualte the **zonal baseline** output.

#. Add a **Dissolve** process that uses **Zones** and **Class** as input (make sure to set :guilabel:`Dissolve all` to :kbd:`No`).

#. Add a **Zonal statistics** process that uses **Image** and the output of the second **Dissolve** process to calculate the **zonal statistics** output.

   .. figure:: images/continuous_model_1.png

      Using **Zonal Statistics**

#. Save the model.

#. Run the new model using **Digital elevation model** as the raster input. As usual save the output files to appropriate locations, rename them and move them to a **Digital elevation model** results group.

   .. figure:: images/layer_list.png

      Digital elevation models in layer list

#. When styling a continuous data set like our averages layer, we no longer want to assign a random colour to each different value. To accomplish this, rather than using :kbd:`Categorized`, we will use :kbd:`Graduated` with the column ``_mean``.

   .. figure:: images/graduated_style.png

      A graduated style 

#. Save the style and preview the new layer showing the average elevation for each of the different antelope ranges.

   .. figure:: images/dem_averages.png

      Elevation averages
