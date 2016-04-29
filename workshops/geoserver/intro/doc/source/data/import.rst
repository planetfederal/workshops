.. _geoserver.data.import:

Loading multiple layers
=======================

So far we have seen a few different ways to load data into GeoServer. In the :ref:`geoserver.webadmin.quickload` section, we used the Layer Importer to load an archive of a shapefile. The Layer Importer can also be used to load multiple layers as well, saving time and configuration.

In this section, we will load the rest of our workshop data by using the Layer Importer to load and configure all shapefiles in our workshop data directory.

Layer Importer
--------------

#. Navigate to the Layer Importer. This is accessible in the :ref:`geoserver.webadmin` by clicking the :guilabel:`Import Data` link on the left side of the page.

   .. figure:: ../webadmin/img/quickload_importerlink.png

      Click this link to load the Layer Importer

#. On the next page, in the section titled :guilabel:`Choose a data source to import from`, select :guilabel:`Shapefiles` if it isn't already selected.

#. In the section titled :guilabel:`Configure the data source`, type in the full path to the data, or click the :guilabel:`Browse...` button to navigate to the directory. The path may look something like::

      C:\Users\<username>\Desktop\geoserver_workshop\data\

   .. note:: Be sure to replace ``<username>`` with your user name.

   .. figure:: img/importer_filebrowser.png

      Using the file browser to select a directory

#. In the section titled :guilabel:`Specify the target for the import`, select :guilabel:`earth` for the :guilabel:`Workspace` (if it isn't already selected), and select :guilabel:`Create new` for the :guilabel:`Store`.

#. Click :guilabel:`Next` to continue.

   .. figure:: img/importer_directory.png

      Importer directory form filled out

#. You will see a list of shapefiles contained in that directory. Check *only* the ``cities`` and ``ocean`` layers.

   .. warning:: Checking all of the layers will cause some of them to be loaded twice. While this won't cause an error, it may cause confusion later on in the workshop.

   .. figure:: img/importer_select.png

      The list of shapefiles found in the selected directory

#. All layers should say :guilabel:`Ready for import`. Click :guilabel:`Import Data` to create/configure a store with each of these shapefiles as layers.

   .. note:: If there are any issues with the shapefiles such as a lack of projection information, they will be displayed here.

#. The importer will load and publish each table as a layer. All layers should say :guilabel:`Import successful`. 

   .. figure:: img/importer_results.png

      Another successful layer import

#. To preview these layers, select :guilabel:`OpenLayers` in the select box next to a layer and click :guilabel:`Go`. Alternately, you can use the standard :ref:`geoserver.webadmin.layerpreview`. As you view the layers, you'll see that the Layer Importer has generated unique styles for each layer, instead of reusing default GeoServer styles.

All of our layers are now loaded into GeoServer.

Bonus
-----

The Layer Importer also has the ability to take source data, import it into a PostGIS database, and then publish the layers that way, as opposed to publishing the data directly from its source files.

To see this in action. Create a new PostGIS database, add it as a store in GeoServer, and then use the Layer Importer, selecting that store as the target. 


Other ways of loading layers
----------------------------

There are other ways to load data into GeoServer.

* **Directory of shapefiles** - In the list of possible data sources (the :guilabel:`Add new store` page), there is an option for :guilabel:`Directory of spatial files (shapefiles)`. This allows you to load a directory of shapefiles as a single store, with each individual file inside the directory being a publishable layer. Using a single store has its advantages, but each layer still needs to be configured manually, so it can still be inefficient for many layers.
* **REST API** - GeoServer also has a full REST API for loading and configuring GeoServer. With this interface, one can create scripts (via bash, PHP, etc) to batch load and configure any number of files, or just manually load content. The REST interface is beyond the scope of an introductory workshop, but those interested can read the REST section of the GeoServer documentation at http://docs.geoserver.org/stable/en/user/rest/.
