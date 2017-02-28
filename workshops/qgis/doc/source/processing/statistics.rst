Frequency statistics
====================

Our goal is to search for a correlation between the **Surficial geology** and the antelope **Seasonal ranges**, so we will be calculating statistics about the most common geological types for each of the different ranges in our data set. To gather a baseline to compare against, let's start by collecting some overall statistics about Wyoming's geological makeup in our area of interest.

Baseline
--------

We will be using a new process called **Frequency Analysis** to calculate the breakdown of each raster value in a polygon overlay. For the baseline the polygon layer will be our **Area of interest**, since this will give us a snapshot of the entire **Surficial geology** data set. The **Frequency Analysis** process takes a vector and a raster layer as inputs, and outputs a new copy of the vector layer with some additional attributes. These attributes provide information on the most-common and least-common raster values, noted as **MAJ** for "majority" and **MIN** for "minority" respectively. It will also create a table output which provides a detailed breakdown of all the different raster values for each feature.

#. Open the **Frequency Analysis** dialog from the :menuselection:`Scripts --> Raster --> Frequency Analysis` entry in the processing toolbox.

#. Set the :guilabel:`vector` to **Area of interest**.

#. The :guilabel:`id field` can be left as its default.

   .. note:: When there are many features, the :guilabel:`id field` sets which of the vector layer's fields to use as an identifier in the results. Since there **Area of interest** layer only has a single feature, we do not need to distinguish it from other features.

#. Set the :guilabel:`raster` to **Surficial geology**. Since this layer only has a single band, we do not need to change the :guilabel:`band` setting.

#. Set the :guilabel:`Frequency analysis table` output to be ``qgis/results/surficial_geology_baseline.csv``.

   .. figure:: images/frequency_analysis_aoi.png

      Overall frequency of geology types
      
#. Click :guilabel:`Run`.

#. A new layer named **Frequency_analysis_layer** with a single feature will appear in the layer list.

#. Click on the feature using the **Identify Tool**. The results will show that approximately 34% of the land is covered by geology type ``9``, which can be cross-referenced in our automatically-generated **Surficial geology (reference)** table and identified as type ``ri`` (defined as "residuum mixed with alluvium, eolian, slopewash, grus, and/or bedrock outcrops").

   .. note:: It is possible that when you run the script, the ``ri`` geology type will be encoded with a different number instead of ``9``.

#. Open the attribute table for **Frequency analysis table**. Here we can see the complete breakdown of the geology into the various types; of note are: ``1`` (``sci``) at 20%; ``3`` (``Ri``) at 12%; and ``6`` (``ai``) at 8%.

   .. note:: QGIS also provides a visual representation of this breakdown if you open the :guilabel:`Histogram` tab on the properties dialog for the **Surficial geology** raster. However, this histogram will be for the *entire* layer, not just the parts we are interested in.

      .. figure:: images/histogram.png

         Histogram for the **Surficial geology** raster

#. Delete the **Frequency_analysis_layer** from our project.

#. Rename the **Frequency_analysis_table** to **Surficial geology (baseline)**.
