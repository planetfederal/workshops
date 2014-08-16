Frequency statistics
====================

Our goal is to search for a correlation between the **Surficial geology** and the antelope **Seasonal ranges**, so we will be calculating statistics about the most common geological types for each of the different ranges in our data set. To gather a baseline to compare against, however, let's start by collecting some overall statistics about Wyoming's geological makeup in our area of interest.

Baseline
--------

We will be using a new process named **Frequency Analysis** to calculate the breakdown of each raster value in a polygon overlay. For the baseline, the polygon layer will be our entire **Area of interest**, since this will give us a snapshot of the entire **Surficial geology** data set. The **Frequency Analysis** process therefore takes a vector layer and a raster layer as inputs and outputs a new copy of the vector layer with some additional attributes that provide information on the most-common and least-common raster values, noted as **MAJ** for "majority" and **MIN** for "minority" respectively. It will also create a table output which gives a detailed breakdown of all the different raster values for each feature.

#. Open the **Frequency Analysis** dialog from the :menuselection:`Scripts --> Raster --> Frequency Analysis` entry in the processing toolbox.

#. Set the :guilabel:`vector` to **Area of interest**.

#. Set the :guilabel:`raster` to **Surficial geology**. Since this layer only has a single band, we do not need to change the :guilabel:`band` setting.

#. Keep the default outputs and execute the script.

   .. figure:: images/frequency_analysis_aoi.png

      Overall frequency of geology types
      
#. 

