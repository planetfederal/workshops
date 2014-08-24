Zonal statistics
================

Now that we have a baseline to work with, we can calculate statistics on the geology types in each of the antelope ranges so that statistical analysis can be done to determine whether there is a correlation between the two variables.

#. Run the **Frequency Analysis** process again, using **Seasonal ranges** and **RANGE** as the vector inputs and **Surficial geology** and band ``1`` as the raster inputs.

#. The attribute table for the new **Frequency_analysis_table** will show the geological breakdown for each range. This is useful data, but since we are looking for correlations between ranges geology, we actually want to use an aggregation of geological types for all areas with the same **RANGE** value. In other words, we want to see, for example, if all the yearlong ranges are characterised by a particular geological type.

#. Let's keep the layer in our results director: right click and save the layer as ``workshop/results/surficial_geology_ranges.shp``. Make sure to check the :guilabel:`Add saved file to map` option to automatically load this layer into our project.

#. Add a new **Surficial geology** sub-group to the **Results** group.

#. Rename the new layer **Majority**.

#. Style the new layer such that a different colour is used for each value of the **MAJ** attribute.

   .. figure:: images/seasonal_range_geology_types.png

      Geology types of each seasonal range

#. Delete the layer and table created by the **Frequency Analysis** process.

#. Open the **Singleparts to multipart** process to combine all features that share the same value for the **RANGE** attribute. The new features will be multipolygon geometries after this process has run.

#. Set the :guilabel:`Input layer` to **Seasonal ranges** and :guilabel:`Unique ID field` to **RANGE**.

#. Run the **Singleparts to multipart** process.

#. Now run the **Frequency Analysis** process again, but this time using the vector input as the new **Output layer**. Set the table output to be ``workshop/results/surficial_geology_ranges.csv``.

#. Rename the output table to **Aggregate**. This layer provides a data analyst with detailed information required to determine whether there is a corrolation between geology types and how antelope use the land during different seasons. Some initial observations are that only the ``CRUWIN`` range is characterised by a geology type other than ``8`` (``ri``), although we can also see that antelope tend not to populate areas with type ``3`` (``Ri``). It is entirely possible that a statistical analysis will not find any coorelation between geology and antelope ranges!

#. Delete the layer that was the output of the **Singleparts to multiparts** process (**Output layer**) since it is no longer needed.

#. Move the two new layers we created in this exercise to the **Surficial geology** group.
