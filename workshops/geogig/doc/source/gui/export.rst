.. _gui.export:

Exporting data
==============

In the command-line version of GeoGig, we needed to export the current state of the repository to the data source (overwriting what was there) every time we wanted update our view. 

In QGIS we can export our layer to a number of formats supported by QGIS.

#. We can choose any version of the ``bikepdx`` layer from our available branches. Right click any commit from one of our branches in the :guilabel:`Repository History`, and select :menuselection:`Change 'bikepdx' layer to this version`.

  .. figure:: img/export_layer.png

     Changing the active layer to this version

#. Now in the :guilabel:`Layers Panel` right click the ``bikepdx`` layer and select :menuselection:`Save As..`.

#. Select the desired output format in the dialog box and click :menuselection:`Ok`.
