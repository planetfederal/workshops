Loading data
============

We can now start adding some of our data to the *Antelope range analysis* project.

#. The QGIS user interface shows a list of all layers that have been loaded into our project, and currently, our list is empty.

   .. figure:: images/layer_list.png

      List of layers

#. Click the |vector| icon next to the layer list to add a vector layer.

#. Click the :guilabel:`Browse` button to open a file dialog.

#. Find the ``ant14hh.shp`` file in your `downloads` directory.

#. Click :guilabel:`Open` to load the file into your project.

   .. figure:: images/ant14hh.png

      Antelope herds layer

   .. note:: QGIS will randomly assign a colour to the vector layer so what you see will probably not match the screenshot exactly.

#. Repeat the process for the ``surfgeol_500k.shp`` file. After adding this layer, however, you will not see any new data appear in the main QGIS panel.

#. Right click on the **surfgeol_500k** item in the list of layers and select :guilabel:`Zoom to Layer Extent`. The view should now display this layer.

   .. figure:: images/surfgeol_500k.png

      Surficial geology layer

Although both layers contain data for the state of Wyoming, QGIS has not been able to locate them at the same location on our map. This is because the two layers are using different coordinate reference systems (CRS) to record the data. This is a common problem when working with data from different sources and although QGIS can often render the data correctly, having data sets in multiple CRSs will lead to problems when we begin our processing tasks.

.. |vector| image:: images/vector.png
            :class: inline
