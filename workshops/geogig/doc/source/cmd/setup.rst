.. _cmd.setup:

Setting up a new project
========================

In this workshop, we will be taking on the role of a city planner, tasked with updating the bike lane master plan of the city of Portland, Oregon.

The City of Portland `maintains a site where this information can be downloaded <https://www.portlandoregon.gov/bts/article/268487>`_ in shapefile format. While we will not be working with this exact download, we will be working with a modified version of same. Our goal will be to update the data we have been given, with the directive that when we are done, we have a similar content that could be placed on this site for download by the general public.

.. note::

   Here are links to the direct downloads:

   * `Bicycle network SHP <ftp://ftp02.portlandoregon.gov/CivicApps/Bicycle_Network_pdx.zip>`_
   * `SHP metadata <https://www.portlandonline.com/cgis/metadata/viewer/display_rl.cfm?Meta_layer_id=53123&Db_type=sde>`_  

We will store our data in PostGIS and work with the data in QGIS. And of course, we will make and store snapshots of our data along the way using GeoGig.

.. note:: The data has been modified from the original source, and many columns removed. Students may wish to download the original shapefile and note that many of the columns refer to an internal record-keeping method to show who made what changes and when. Specifically, the columns ``modifiedby`` (a name) and ``modifiedon`` (a date) would be completely unecessary when used with a version control system such as GeoGig, as that information would already be encoded in the repository history.

Data details
------------

The following is a metadata description of the data file:

.. list-table::
   :header-rows: 1

   * - Attribute
     - Type
     - Description
   * - ``gid``
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

   .. note:: These commands assume that the user name is ``postgres`` and that the host and port are stored. If you encounter errors, you may need to modify the commands to include extra information. For example:

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

.. todo:: Add figures.

#. Open QGIS.

#. Go to :menuselection:`Layer --> Add PostGIS layers`.

#. Click :guilabel:`New` to create a new PostGIS connection.

#. Enter the following information:

   * Name: ``OpenGeo Suite``
   * Host: ``localhost``
   * Port: ``8080``
   * User name: ``postgres``
   * Password: ``[blank]``
   * Database: ``geogig``

   .. note:: Modify connection parameters if necessary.

#. Check :guilabel:`Save Username` and :guilabel:`Save Password`.

#. Click :guilabel:`Test connection` to ensure that the details were entered correctly.

#. Click :guilabel:`OK` to close the dialog.

#. Click :guilabel:`Connect`.

#. Select the entry named :guilabel:`bikepdx` and click :guilabel:`Add`.

Style layer
-----------

The data will be displayed in the main QGIS window. To improve the display, we will apply a style to the layer.

#. In the Layers panel, right-click on the layer entry (:guilabel:`bikepdx`) and select :guilabel:`Properties`.

#. Click :guilabel:`Style` to bring up the style parameters.

#. Click the :guilabel:`Load Style` button and select :guilabel:`Load from file`.

#. In the dialog, select the :file:`bikepdx.sld` file in the workshop :file:`data` directory and click :guilabel:`Open`.

   .. note:: By default, only ``.qml`` files are shown in the file listing, so you may need to adjust the file list or type the filename in manually.

#. Click :guilabel:`Apply` to apply the style to the layer.

#. Click :guilabel:`OK`. The map window will be updated, showing the new style.

.. todo:: Add a background layer. Use OpenLayers plugin and OSM?

Our data is now ready to be versioned.

GeoGig setup
------------

Before we can use GeoGig, we will need to configure the tool. Specifically we will want to enter information about the user that will be doing the commit. This is important as the information will be contained in all commits performed by this user, allowing commits to have an author.

User information can be set either globally, for all repositories managed by GeoGig, or on a per-repository basis. We will set this information globally.

#. Enter the following information, replacing the information in quotes with your name and email:

   .. code-block:: console

      geogig config --global user.name "Author"
      geogig config --global user.email "author@example.com"

.. note:: If you encounter any errors with the geogig command line interface, please see the :ref:`cmd.troubleshoot` section.

Create a GeoGig repository
--------------------------

#. Open a terminal window.

#. Create a new directory and call it :file:`repo`. This directory will house the GeoGig repo.

   .. code-block:: console

      mkdir repo

   .. note:: As mentioned before, no spatial data will be contained in this directory. In fact, no files at all will be contained in this directory, save for the :file:`.geogig` subdirectory which wil contain non-human-readable details about the repository.

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

