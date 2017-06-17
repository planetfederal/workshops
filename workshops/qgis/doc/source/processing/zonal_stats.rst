Zonal statistics
================

Now that we have a baseline to work with, we can calculate statistics on the geology types in each of the antelope ranges so that statistical analysis can be done to determine whether there is a correlation between the two variables.

#. Run the **Frequency Analysis** process again, using **Seasonal ranges**  as the vector input and **RANGE** as the :guilabel:`id field`. Select **Surficial geology** and band ``1`` as the raster inputs. Set the :guilabel:`Frequency analysis layer` to be ``qgis/results/surficial_geology_ranges.shp``.

#. The attribute table for the new **Frequency_analysis_table** will show the geological breakdown for each range. This is useful data, but since we are looking for correlations between ranges and geology, we actually want to use an aggregation of geological types for all areas with the same **RANGE** value. In other words, we want to see, for example, if all the yearlong ranges are characterised by a particular geological type.

#. Rename the new layer **Surficial geology (majority)** and move it to the **Surficial geology** subgroup.

#. Style the new layer such that a different colour is used for each value of the **MAJ** attribute.

   .. figure:: images/seasonal_range_geology_types.png

      Geology types of each seasonal range

#. Delete table created by the **Frequency Analysis** process.

Singleparts to multipart
------------------------

To get aggregate statistics of the geological breakdown for every range type (rather than every range feature), we will combine all the features that share a single common value for the **RANGE** attribute into multipolygons. Because we have nine different range types, the new layer will only have nine different features, one each for each value of **RANGE**.

#. Open the **GDAL Dissolve Polygons** process.

#. Set the :guilabel:`Input layer` to **Seasonal ranges** and :guilabel:`Dissolve field` to **RANGE**.

#. Ensure :guilabel:`Output as multipart geometries` is enabled.

#. Run the **Dissolve Polygons** process.

#. Now run the **Frequency Analysis** process again, but this time using the vector input as the **Seasonal Ranges multipart** layer. Set the table output to be ``qgis/results/surficial_geology_ranges.csv``.

   .. figure:: images/yearlong_stats.png

      Output layer with ``YRL`` feature information

#. Rename the output table to **Surficial geology (stats)**. This layer provides a data analyst with detailed information required to determine whether there is a corelation between geology types and how antelope use the land during different seasons. Some initial observations are that only the ``CRUWIN`` range is characterised by a geology type other than ``8`` (``ri``), although we can also see that antelope tend not to populate areas with type ``3`` (``Ri``). It is entirely possible that a statistical analysis will not find any corelation between geology and antelope ranges!

#. Move **Surficial geology (stats)** to the **Surficial geology** sub-group.

#. Delete the **Frequency_analysis_layer**.

#. Delete the layer that was the output of the **Dissolve polygons** process (**Seasonal ranges multipart**) since it is no longer needed.

#. Delete the **Suficial geology (raster)** layer since our analysis is complete.
