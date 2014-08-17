Zonal statistics
================

Now that we have a baseline to work with, we can calculate statistics on the geology types in each of the antelope ranges so that statistical analysis can be done to determine whether there is a correlation between the two variables.

#. Run the **Frequency Analysis** process again, using **Seasonal ranges** and **RANGE** as the vector inputs and **Surficial geology** and band ``1`` as the raster inputs.

#. The attribute table for the new **Frequency_analysis_table** will show the geological breakdown for each range. This is useful data, but since we are looking for correlations between ranges geology, we actually want to use an aggregation of geological types for all areas with the same **RANGE** value. In other words, we want to see, for example, if all the yearlong ranges are characterised by a particular geological type.

#. Delete the two layers created by our first attempt above.

#. Open the **Singleparts to multipart** process to combine all features that share the same value for the **RANGE** attribute. The new features will be multipolygon geometries after this process has run.

#. Set the :guilabel:`Input layer` to **Seasonal ranges** and :guilabel:`Unique ID field` to **RANGE**.

#. Run the **Singleparts to multipart** process.

#. Now run the **Frequency Analysis** process again, but this time using the vector input as the new **Output layer**. Set the table output to be ``workshop/results/surficial_geology_ranges.csv``.

#. Rename the output layer and table to **Seasonal ranges geology type** and move them both to the results group. These two layers provide a data analyst with detailed information required to determine whether there is a corrolation between geology types and how antelope use the land during different seasons. Some initial observations are that only the ``CRUWIN`` range is characterised by a geology type other than ``8`` (``ri``), although we can also see that antelope tend not to populate areas with type ``3`` (``Ri``). It is entirely possible that a statistical analysis will not find coorelation between geology and antelope ranges!

#. Delete the layer that was the output of the **Singleparts to multiparts** process.
