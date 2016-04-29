.. _geoserver.webadmin.quickload:

Loading your first data set 
===========================

There are many ways to load data, and even more configuration options once this data is loaded. Often, though, all that you want to do is to load a simple shapefile and display it. In this section we will go from data to map in the fewest possible steps.

GeoServer with the Layer Importer extension allows for uploading of ZIP files that contain geospatial information. The extension will perform all the necessary configuration for publishing the data, including generating a unique style for the layer.

.. note:: The Layer Importer is available as an extension in GeoServer, but is included by default in OpenGeo Suite.

#. In the :file:`data` directory of the workshop bundle, you will see a file called :file:`meteors.zip`. It is a shapefile contained inside an archive (ZIP file). If you open the archive, you'll see that it contains the following files:

   * :file:`meteors.shp`
   * :file:`meteors.shx`
   * :file:`meteors.dbf`
   * :file:`meteors.prj`

#. Navigate to the Layer Importer. This is accessible in the :ref:`geoserver.webadmin` by clicking the :guilabel:`Import Data` link on the left side of the page.

   .. figure:: img/quickload_importerlink.png

      Click this link to load the Layer Importer

#. In the box titled :guilabel:`Configure the data source`, click :guilabel:`Browse...` and navigate to the location of the archive.

   .. figure:: img/quickload_importerpage.png

      Layer Importer

#. Click the :file:`meteors.zip` file to select it.

   .. figure:: img/quickload_fileselect.png

      Selecting the meteors.zip file

#.  Leave all other fields as they are for now and click :guilabel:`Next`.

#. On the next page, click the checkbox next the :guilabel:`meteors` layer and then click :guilabel:`Import`.

   .. figure:: img/quickload_importerpage2.png

      Importer ready to operate

#. The import process will proceed.

   .. figure:: img/quickload_importing.png

      Import in progress

#. After some processing, you should see a note that says :guilabel:`Import successful`. Click :guilabel:`Go`, next to the box that says :guilabel:`Layer Preview`.

   .. figure:: img/quickload_importerdone.png

      Import successful

#. View the resulting layer. Use the pan and zoom tools to study the layer further. Click map features to get attribute information.

   .. figure:: img/quickload_layerpreview.png

      Viewing the loaded layer

   .. figure:: img/quickload_layerpreviewdetail.png

      Detail of loaded layer, including attribute details

You have now loaded data and published a layer. In the next few sections, we'll slow down and take a look at all of the steps that were glossed over during this process.
