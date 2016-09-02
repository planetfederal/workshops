.. _gui.export:

Exporting data
==============

In the command-line version of GeoGig, we needed to export the current state of the repository to the data source (overwriting what was there) every time we wanted update our view. 

In QGIS, this step is accomplished by selecting a repository branch and clicking the button `Open repository in QGIS`. This will export a shapefile to the source directory, such as ``/home/boundless/data/gui/bikepdx.shp``, and overwrite the existing file.

.. todo:: check if/when it exports to the repo directory
