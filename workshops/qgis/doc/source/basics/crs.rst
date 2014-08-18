Coordinate reference systems
============================

Before we continue with adding more data, we will want to see how to standardise the CRSs that our layers and our project are using.

#. To see what CRS any particular layer is in, right click a layer name and select :guilabel:`Set Layer CRS`. Open the CRS settings for the **ant14hh** layer.

   .. figure:: images/layer_crs.png

      Layer CRS

#. In the dialog, the highlighted line is the CRS that QGIS detected for this layer. In this case, it is a user-defined CRS that is not in QGIS's database, which is why it has the **USER:100000** code in this screenshot:

   .. figure:: images/crs_list.png

      Viewing CRSs

#. Close the dialog when finished.

#. To alter the data so that it is using a new CRS, we will need to save it into a new file. Once again, right click the layer and select :guilabel:`Save As`.

#. Change the CRS setting to :guilabel:`Selected CRS`.

#. Click :guilabel:`Browse`.

#. From the list of CRSs, select **EPSG:4267**.

   .. note:: You can use the filter box to quickly find the CRS that you are looking for.

#. Set the new file name to ``workshop\data\ant14hh.shp``.

   .. note:: We will keep all the correctly projected data in the ``workshop\data`` directory.

#. Click :guilabel:`OK` to save the new file.

#. Repeat this process for the **surfgeol_500k** layer if necessary.

   .. note:: If the layer is already in the **EPSG:4267** CRS, then you can simply copy all the ``surfgeol_500k`` files to the same ``workshop\data`` directory.

#. Remove each of the current layers in the project by right clicking them and selecting :guilabel:`Remove`.

#. Add the new layers from the ``workshop\data`` directory to the project.

#. Drag and drop the layers in the list so that the **ant14hh** layer is first. You should now see that the two layers line up on the map.

   .. figure:: images/reprojected_layers.png

      Aligning layers in the project

From now on, whenever we add any new data to our project, we will need to ensure that the data is in the **EPSG:4267** CRS.
