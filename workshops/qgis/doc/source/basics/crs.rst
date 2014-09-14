Coordinate reference systems
============================

Before we continue with adding more data, we will want to see how to standardise the CRSs that our layers and our project are using. We will be using a CRS named **US National Atlas Equal Area** (known by the code EPSG:2163) for this workshop.

.. figure:: images/epsg2163.png

   **US National Atlas Equal Area**

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

#. From the list of CRSs, select **EPSG:2163**.

   .. note:: You can use the filter box to quickly find the CRS that you are looking for.

#. Set the new file name to ``qgis\data\ant14hh.shp``.

   .. note:: We will keep all the correctly projected data in the ``qgis\data`` directory.

#. Click :guilabel:`OK` to save the new file.

#. Repeat this process for the **surfgeol_500k** layer.

#. Remove each of the current layers in the project by right clicking them and selecting :guilabel:`Remove`.

#. Add the new layers from the ``qgis\data`` directory to the project.

#. Drag and drop the layers in the list so that the **ant14hh** layer is first. You should now see that the two layers line up on the map.

   .. figure:: images/reprojected_layers.png

      Aligning layers in the project

#. Right click on the layer in the list select :menuselection:`Set Project CRS from Layer`. From now on our project will be using the **US National Atlas Equal Area** spatial reference system, but whenever we add any new data to our project, we will still need to convert the data is in the **EPSG:2163** CRS before we run any processes.

   .. note:: You may now use the :guilabel:`Project CRS` option when saving files.

             .. figure:: images/project_crs.png

                Using the project's CRS
