Raster data
===========

#. We can add some raster data by clicking the |raster| icon next to the layer list.

#. Select the ``dem_90m.zip`` file in the ``qgis/downloads`` directory.

#. Save the file as ``dem_90m.tif`` in the ``qgis/data`` directory with the correct **EPSG:2163** CRS and a resolution of ``300`` by ``300``.

   .. figure:: images/raster_save.png

      Saving a raster

#. Remove the old file and add the new GeoTIFF to the project.

   .. figure:: images/dem.png

      Digital elevation model

   .. note:: If the image does not appear, right click on the file in the layer list and select :menuselection:`Set Layer CRS` and make sure that **EPSG:2163** is selected.

#. Repeat the conversion process with ``gaplandcov_WY.img`` but leave the resolution as the default.

#. Ensure the new file is added to the project.

#. Copy the style from the original to the reprojected land cover layer.

   .. figure:: images/landcover.png

      Land cover layer

#. Remove the old file from the project.

.. |raster| image:: images/raster.png
            :class: inline
