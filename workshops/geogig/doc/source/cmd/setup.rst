.. _cmd.setup:

Setting up a new project
========================

In this workshop, we will be taking on the role of a city planner, tasked with updating the bike lane master plan of the city of Portland, Oregon.

The City of Portland `maintains a site where this information can be downloaded <https://www.portlandoregon.gov/bts/article/268487>`_ in shapefile format. While we will not be working with this exact download, we will be working with a modified version of same. Our goal will be to update the data we have been given, with the directive that when we are done, we have a similar content that could be placed on this site for download by the general public.

.. note::

   If you're interested, here are links to the original, direct downloads:

   * `Bicycle network SHP <ftp://ftp02.portlandoregon.gov/CivicApps/Bicycle_Network_pdx.zip>`_
   * `SHP metadata <https://www.portlandonline.com/cgis/metadata/viewer/display_rl.cfm?Meta_layer_id=53123&Db_type=sde>`_  

   These downloads are not necessary for completion of this workshop.

We will store our data in PostGIS and work with the data in QGIS. And of course, we will make and store snapshots of our data using GeoGig.

.. note::

   The data has been modified from the original source, and many columns removed. Students may wish to download the original shapefile and note that many of the columns refer to an internal record-keeping method to show who made what changes and when.

   Specifically, the columns ``modifiedby`` (a name) and ``modifiedon`` (a date) would be completely unecessary when used with a version control system such as GeoGig, as that information would already be encoded in the repository history.

Data details
------------

The following is a description of the attributes contained in the data file:

.. list-table::
   :widths: 25 25 50
   :header-rows: 1

   * - Attribute
     - Type
     - Description
   * - ``id``
     - Integer
     - Identifier (primary key)
   * - ``segmentname``
     - String
     - Name of the area where the feature exists (Example: ``SW MAIN ST``)
   * - ``status``
     - String
     - Whether the bike lane exists or not. One of ``ACTIVE``, ``RECOMM``, or ``PLANNED``.
   * - ``facility``
     - String
     - Short code for the type of bike lane. One of ``MTRAIL``, ``BLVD``, ``LANE``, ``SCONN``.
   * - ``facilityde``
     - String
     - Human readable equivalent of ``facility`` attribute. One of ``Multi-use Trail``, ``Bike Boulevard``, ``Bike Lane``, ``Signed Connection``.
   * - ``yearbuilt``
     - Integer
     - Year the bike lane was put into service
   * - ``comments``
     - String
     - Description of the feature, if any
   * - ``shape_len``
     - Float
     - Length of the feature (in feet)

Load data
---------

Our data is stored as a SQL dump. This will need to be loaded into a PostGIS database.

We will use the command line applications ``createdb`` and ``psql`` to perform this input.

#. On a terminal, create a database named ``geogig``:

   .. code-block:: console

      createdb -U postgres geogig

   .. note::

      These commands assume that the user name is ``postgres`` and that the host and port are stored. If you encounter errors, you may need to modify the commands to include extra information. For example:

      .. code-block:: console
    
         createdb -U pgowner -h example.com -p 54321 geogig

#. Next, add the PostGIS extension to the database:

   .. code-block:: console

      psql -U postgres -d geogig -c "create extension postgis;"

   ::

      CREATE EXTENSION

#. Now load the SQL dump file, ``bikepdx.sql``. This file is in the workshop ``data`` directory.

   .. code-block:: console

      psql -U postgres -d geogig -f bikepdx.sql

   ::

      SET
      SET
      SET
      SET
      SET
      SET
      SET
      SET
      SET
      CREATE TABLE
      ALTER TABLE
      ALTER TABLE

#. Verify that the table has been created properly by counting the number of rows in the table:

   .. code-block:: console

      psql -U postgres -d geogig -c "SELECT Count(*) FROM bikepdx"

   ::

       count
      -------
        6772
      (1 row)

View data
---------

We will be viewing the data using QGIS.

#. Open QGIS.

   .. figure:: img/setup_qgis.png

      QGIS

#. Go to :menuselection:`Layer --> Add PostGIS layers`.

   .. figure:: img/setup_addpglink.png

      Select this option to add a PostGIS layer to QGIS

#. This will bring up the :guilabel:`Add PostGIS Table(s)` menu.

   .. figure:: img/setup_addpgmenu.png

      Add PostGIS Table(s) menu

#. Click :guilabel:`New` to create a new PostGIS connection.

#. Enter the following information:

   * :guilabel:`Name`: ``OpenGeo Suite``
   * :guilabel:`Host`: ``localhost``
   * :guilabel:`Port`: ``5432``
   * :guilabel:`User name`: ``postgres``
   * :guilabel:`Password`: ``[blank]``
   * :guilabel:`Database`: ``geogig``
   * :guilabel:`Save User name`: [checked]
   * :guilabel:`Save Password`: [checked]

   .. note:: Modify connection parameters as necessary.

   .. figure:: img/setup_newpgconnection.png

      PostGIS connection parameters

#. Click :guilabel:`Test connection` to ensure that the details were entered correctly. You should see the following dialog:

   .. figure:: img/setup_connectionsuccess.png

      A successful connection

#. Click :guilabel:`OK`  twice to close both dialogs.

#. You will get a warning about saving a password. While ordinarily you wouldn't want to do this, for the purpose of this workshop, this is okay.

#. You will now see an entry in the list named :guilabel:`Connections` named :guilabel:`OpenGeo Suite`. 

   .. figure:: img/setup_postgismenu.png

      PostGIS menu with a connection

#. Click :guilabel:`Connect`. This will populate the rest of the dialog.

#. Click to expand the :guilabel:`Public` schema. You will see one entry for our ``bikepdx`` layer.

   .. figure:: img/setup_postgismenuentry.png

      PostGIS menu with table listing

#. Click to select the entry named :guilabel:`bikepdx` and click :guilabel:`Add`.

#. You will see the layer displayed in the main window of QGIS.

   .. figure:: img/setup_unstyledlayer.png

Style layer
-----------

To improve the display and make working with our data easier, we will apply a style to our layer.

The style will show different routes based on two different criteria (attributes):

* The type of route:

  * A "multi-use trail" (``FACILITY == 'MTRAIL'``)
  * A "bike boulevard" (``FACILITY == 'BLVD'``)
  * A regular "bike lane" (``FACILITY == 'LANE'``)

* The status of the route:

  * An active route (``STATUS == 'ACTIVE'``)
  * A non-active route (``STATUS <> 'ACTIVE'``)

With these criteria, we can generate six distinct rules for styling the different lines in the layer.

#. In the Layers panel, right-click on the layer entry (:guilabel:`bikepdx`) and select :guilabel:`Properties`.

   .. figure:: img/setup_propertieslink.png

      Layer properties link

#. This will bring up the layer properties dialog. Click :guilabel:`Style` to bring up the style parameters if it isn't already selected.

   .. figure:: img/setup_stylemenu.png

      Default QGIS style menu

#. At the bottom of the dialog, click the :guilabel:`Load Style` button and select :guilabel:`Load from file`.

   .. figure:: img/setup_loadstylelink.png

      Loading a new style from file

#. In the dialog, select the :file:`bikepdx.sld` file and click :guilabel:`Open`. This file is located in the workshop :file:`data` directory.

   .. note:: By default, only ``.qml`` files are shown in the file listing, so you may need to adjust the file list to show :guilabel:`SLD File (*.sld)` or type the filename in manually.

#. You will see the details of the style displayed in the dialog.

   .. figure:: img/setup_styledetails.png

      Details of the layer style

#. Click :guilabel:`Apply` to apply the style to the layer.

#. Click :guilabel:`OK`. The map window will be updated, showing the new style. Note how the non-active routes are dashed, while the more "important" routes are thicker/darker.

   .. figure:: img/setup_styledlayer.png
 
      Styled layer

With our layer styled, our data is now ready to be versioned. Feel free to explore the layer by zooming and panning around the map window.

.. note:: Now is a good time to **save your project**. You should save your project periodically to prevent loss. A good name for the file would be :file:`geogig.qgs`.

(Optional) Add a background layer
---------------------------------

To give this layer context, you may wish to add a background layer. **These steps are entirely optional** and can be skipped without loss of comprehension.

We can use the OpenLayers QGIS plugin to pull in any number of standard web map layers, such as Google or Bing. The OpenLayers QGIS plugin is typically not installed in advance, so we'll install it here.

#. Navigate to :menuselection:`Plugins --> Manage and Install Plugins`.

   .. figure:: img/setup_pluginsmenu.png

      Plugins menu

#. This will bring up the Plugin Manager.

   .. figure:: img/setup_pluginsall.png

      List of all plugins

#. Click :guilabel:`Not Installed` and select the :guilabel:`OpenLayers Plugin`.

   .. figure:: img/setup_olplugin.png

      OpenLayers plugin

#. Click :guilabel:`Install plugin`. When finished you will see a confirmation dialog. 

   .. figure:: img/setup_pluginsuccess.png

      Plugin was successfully installed

#. Click :guilabel:`Close` to close the Plugin Manager.

#. Clicking the :guilabel:`Plugins` menu now shows a new entry: :guilabel:`OpenLayers Plugin`.

   .. figure:: img/setup_olmenu.png

      OpenLayers Plugin menu

#. Select a suitable basemap. For example, the :guilabel:`Google Physical` map provides a nice contrast.

#. The layer will be loaded. In the :guilabel:`Layers` panel on the left, drag the entry for :guilabel:`bikepdx` so that it is on top of the background layer and is not obscured.

   .. figure:: img/setup_basemap.png

      Basemap loaded

GeoGig setup
------------

Before we can use GeoGig, we will need to configure the tool. Specifically we will want to enter information about the user that will be doing the commit. The information we enter here will be contained in all commits performed by this user, associating changes with its author.

User information can be set globally, for all repositories managed by GeoGig, or on a per-repository basis. We will set this information globally.

#. In a terminal, enter the following two commands, substituting your own information for what is in quotes:

   .. code-block:: console

      geogig config --global user.name "Author"

   .. code-block:: console

      geogig config --global user.email "author@example.com"

.. note:: If you encounter any errors with the ``geogig`` command line interface, please see the :ref:`cmd.troubleshoot` section.

Create a GeoGig repository
--------------------------

#. Create a new directory and call it :file:`repo`. This directory will house the GeoGig repo.

   .. code-block:: console

      mkdir repo

   .. note:: As mentioned before, no spatial data will be contained in this directory. In fact, no files at all will be contained in this directory, save for the :file:`.geogig` subdirectory which will contain technical details about the repository.

#. Switch to this directory.

   .. code-block:: console

      cd repo

#. Create a new GeoGig repository in this directory:

   .. code-block:: console

      geogig init .

#. View a directory listing that shows all files and verify that the :file:`.geogig` directory has been created.

More about the ``geogig`` command
---------------------------------

All working commands with GeoGig are in the following form:

.. code-block:: console

   geogig [command] [options]

These commands must be run from in the directory where the repository was created.

To see a full list of commands, type:

.. code-block:: console

   geogig --help

To see a list of the parameters associated with a given command, type ``help`` followed by the command. For example, to see the parameters associated with the ``show`` command, type:

.. code-block:: console

   geogig help show

::

   Displays information about a commit, feature or feature type
   Usage: show [options] <reference>
     Options:
           --raw
          Produce machine-readable output
          Default: false

