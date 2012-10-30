.. _geoserver.data.import:

Loading multiple layers
=======================

So far we have loaded and published two different files in GeoServer.  While the process is not complicated, it isn't very efficient when trying to load many layers.  Fortunately, there are ways to load multiple files into GeoServer.

Directory of shapefiles
-----------------------

In our list of possible data sources (in the :guilabel:`Add new store` page), there is an option for :guilabel:`Directory of spatial files (shapefiles)`.  This allows you to load a directory of shapefiles as a single store, with each individual file inside the directory being a publishable layer.  Using a single store has its advantages, but each layer still needs to be configured manually, so it can still be inefficient for many layers.

REST
----

GeoServer also has a full RESTful API for loading and configuring GeoServer.  With this interface, one can create scripts (via bash, PHP, etc) to batch load any number of files.

The REST interface is beyond the scope of an introductory workshop, but those interested can read the REST section of the GeoServer documentation at http://docs.geoserver.org/stable/en/user/restconfig/index.html .

.. _geoserver.data.importer:

Layer Importer
--------------

.. note:: The Layer Importer is currently only available as part of the OpenGeo Suite.

The OpenGeo Suite includes a custom extension to GeoServer called the **Layer Importer**.  This tool automates the process of uploading and configuring data into GeoServer.  The importer will automatically determine projection information and bounding box, and will generate a unique style for each layer.  The importer works with shapefiles and database tables such as PostGIS, Oracle, and ArcSDE.

In this section, we will load the rest of our workshop data by using the Layer Importer to load and configure all shapefiles in our workshop data directory.

#. Navigate to the Layer Importer.  This is accessible in the :ref:`geoserver.webadmin` by clicking on the :guilabel:`Import Data` link on the left side of the page.

   .. figure:: img/importer_link.png
      :align: center

      *Click this link to load the Layer Importer*

#. On the page titled :guilabel:`Add data source`, select :guilabel:`Shapefiles`.

   .. figure:: img/importer_shp.png
      :align: center

      *Selecting the Shapefiles data source*

#. Fill in the form with the following information:

   .. list-table::
      :widths: 30 30 40

      * - :guilabel:`Workspace`
        - ``earth``
        - This should be the default.
      * - :guilabel:`Name`
        - ``naturalearth``
        - This can be anything, but it usually makes sense to match this with the name or content of the directory of shapefiles.

#. In the box labeled :guilabel:`Directory`, type in the full path to the data, or click the :guilabel:`Browse` button to navigate there.  This may be something like::

      C:\Documents and Settings\<username>\Desktop\geoserver_workshop\data\

   .. note:: Be sure to replace ``<username>`` with your username.

   .. figure:: img/importer_directory.png
      :align: center

      *The list of shapefiles found in the selected directory*

#. Click :guilabel:`Next` to continue.

#. You will see a list of shapefiles contained in that directory.  **Make sure to uncheck the ``countries`` layer!**  Failure to do this will cause GeoServer to try to load a layer with a duplicate name as one already loaded ("``earth:countries``), causing an error.

   .. figure:: img/importer_select.png
      :align: center

      *The list of shapefiles found in the selected directory*

#. Click :guilabel:`Import Data` to create/configure a store with each of these shapefiles as layers.

#. The importer will load and publish each table as a layer.  One the next page, a summary will be given, and any issues described.

   .. figure:: img/importer_results.png
      :align: center

      *Another successful layer import*

#. To preview these layers, click on the :guilabel:`OpenLayers` link next to each layer, or alternately use the standard :ref:`geoserver.webadmin.layerpreview`.  As you view the layers, you'll see that the Layer Importer has generated unique styles for each layer, instead of reusing default GeoServer styles.

All of our layers are now loaded into GeoServer.

Bonus
~~~~~

The OpenGeo Suite comes with a PostGIS database called "medford" that contains a single database table.  Use the Layer Importer to load this layer into GeoServer, using the following credentials:

   .. list-table::
      :widths: 50 50

      * - username
        - ``postgres``
      * - password
        - [None]
      * - port
        - ``54321``