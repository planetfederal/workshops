.. _geoserver.webadmin.quickload:

Loading your first data set 
===========================

.. todo:: NEED DATA AND IMAGES

There are many ways to load data, and even more configuration options once this data is loaded. Oftentimes, though, all that you want to do is to load a simple shapefile and display it. In this section we will go from data to map in the fewest possible steps.

GeoServer with the Layer Importer extension allows for uploading of ZIP files that contain geospatial information. The extension will perform all the necessary configuration for publishing the data, including generating a unique style for the layer.

.. note:: The Layer Importer is currently only available as part of the OpenGeo Suite.

#. In the :file:`data/` directory, you will see a file called SOMETHING. It is a shapefile contained inside an archive (ZIP file). If you double click on the archive, you'll see that it contains the following files:

   * .SHP
   * .SHX
   * .DBF
   * .PRJ

#. Navigate to the Layer Importer. This is accessible in the :ref:`geoserver.webadmin` by clicking on the :guilabel:`Import Data` link on the left side of the page.

   .. figure:: img/quickload_importerlink.png

      Click this link to load the Layer Importer

#. In the box title :guilabel:`Configure the data source`, click :guilabel:`Browse...` and navigate to the location of the archive.

   .. todo:: IMAGE

#. Click :guilabel:`Next`. Leave all other fields as they are for now.

   .. todo:: IMAGE

#. On the next page, click :guilabel:`Import`.

   .. todo:: IMAGE

#. After some processing, you should see a note that says :guilabel:`Import completed successfully`. Next to the box that says :guilabel:`Layer Preview`, click :guilabel:`Go`.

   .. todo:: IMAGE

#. View the resulting map. Use the pan and zoom tools to study the map further. Click on map features to get attribute information.

   .. todo:: IMAGE

You have now loaded data and published a map. In the next few sections, we'll slow down and take a look at all of the steps that were hidden from us during this process.
