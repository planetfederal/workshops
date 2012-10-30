.. _geoserver.importdb:

Importing data from PostGIS
===========================

In this section we're going load several PostGIS tables simultaneously into GeoServer. 

We could easily just follow the same steps we used to load our GeoTIFF, for each table in our PostGIS store; however, that would get a little repetitive. 

The OpenGeo Suite version of GeoServer ships with a **Layer Importer** that streamlines the workflow down to a few steps for multiple tables in a database.

.. note:: The Layer Importer works for databases table and directories of shapefiles.

Essentially, once pointed at its target, the Layer Importer creates a single, common store for the features in that target, pulls them in as individual layers, assigns their properties (Name, SRID, etc) where possible from metadata, and generates a unique style for each layer.

Import From PostGIS store
-------------------------

#. From the GeoServer Admin page, click on the :guilabel:`Import Data` link on the left-hand side, under :guilabel:`Data`.

   .. figure:: img/gs_link_importer.png
      :align: center

      *Click this link to go to the Import page*

#. Click on :guilabel:`PostGIS` to select *spatial tables from PostGIS* as your data type. 

   .. figure:: img/gs_link_importpostgis.png
      :align: center

      *Import from data source*

#. Fill out the following form. Many fields will be left as the default, but make sure that the database name is ``SuiteWorkshop``:

   .. figure:: img/gs_importerparams.png
      :align: center
      
      *PostGIS data store import parameters.*

#. Click :guilabel:`Next` when ready.

#. This screen asks you to select the layers to import from a list of all of the resources that exist in the store. 

   .. figure:: img/gs_importerlayers.png
      :align: center
      
      *Select resources to import from the store.*

#. Ensure that **all** checkboxes are checked, and click :guilabel:`Import Data`.

#. A progress monitor marks the status of the import. 

#. When the process is complete, you are redirected to the ``Import Results`` page.

   .. figure:: img/gs_importresults.png
      :align: center
      
      *Import results*

#. If the SRS is not populated automatically, check all of the relevant layers and click :guilabel:`Declare SRS`.  The next screen allows you to select the coordinate system that applies to your data.

   .. figure:: img/gs_importsrs.png
      :align: center
      
      *Declare SRS*

   It's a long list, but we can narrow the results down using the :guilabel:`Search` field. Enter :guilabel:`4326`, and press **Enter**.  The search results are narrowed to a single result: The coordinate system '(Geographic) WGS84' that describes our data.

That's about it! In a consolidated number of steps, you have declared a store, and imported and published a handful of layers in GeoServer. This is the recommended approach when importing many layers from PostGIS or a directory of Shapefiles.

.. note:: The top line of the ``Import Results`` page includes a small link to :guilabel:`Undo import`.

Layer Preview
-------------

As a final step to our bulk data load, let's preview some of what we've done.

#. From the list of layers in the ``Import Results`` screen, find the ``countries`` layer.

   .. figure:: img/gs_importpreview.png
      :align: center

      *Layer Preview page*

#. Click the :guilabel:`OpenLayers` link to the right of the ``countries`` entry.

#. A new tab will open up in your browser, showing your layer inside an OpenLayers application. 

   .. figure:: img/gs_previewol.png
      :align: center

      *Viewing the published layer in OpenLayers*

.. note:: If you're wondering where the style/color is coming from, this will be discussed in the :ref:`geoserver.styling` section.

#. Play around with this window. You can use your mouse to zoom and pan, and can also click on the layer features to display attribute information.

Congratulations, your PostGIS data has been successfully published in GeoServer!  You now have spatial data on the web!