.. _cmd.setup:

Setting up a new project
========================

In this workshop, we will be taking on the role of a city planner, tasked with updating the bike lane master plan of the city of Portland, Oregon.

The City of Portland `maintains a site where this information can be downloaded <https://www.portlandoregon.gov/bts/article/268487>`_ in shapefile format. While we will not be working with this exact download, our goal will be to update the data we have been given, with the directive that when we are done, we have a similar shapefile that could be placed on this site.

.. note::

   Here are links to the direct downloads:

   * `Bicycle network SHP <ftp://ftp02.portlandoregon.gov/CivicApps/Bicycle_Network_pdx.zip>`_
   * `SHP metadata <https://www.portlandonline.com/cgis/metadata/viewer/display_rl.cfm?Meta_layer_id=53123&Db_type=sde>`_  

We will store our data primarily in PostGIS and work with the data in pgAdmin and QGIS. And of course, we will make and store snapshots of our data along the way using GeoGig.

Data details
------------

The following is a metadata description of the data file:

.. todo:: Add this.

Load data
---------

.. todo:: Figures needed.

Our data is stored as a SQL dump. This will need to be loaded into a PostGIS database.

#. Open pgAdmin.

#. Connect to your PostgreSQL instance. Using OpenGeo Suite on Windows, the connection parameters are:

   * Host: ``localhost``
   * Port: ``8080``
   * User name: ``postgres``
   * Password: ``[blank]``

#. Create a new database called :guilabel:`bikenetwork`.

#. Once created, open the SQL Editor and run the script file :file:`SOMEFILE.sql`. This will populate the database with a table that contains the spatial data.

#. Verify that the table has been created by refreshing the view.

View data
---------

We will be viewing the data in QGIS.

.. todo:: Test all this.

#. Open QGIS.

#. Go to :menuselection:`Layer --> Add PostGIS layers`.

#. Click :guilabel:`New` to create a new PostGIS connection.

#. Enter the following information:

   * Name: ``OpenGeo Suite``
   * Host: ``localhost``
   * Port: ``8080``
   * User name: ``postgres``
   * Password: ``[blank]``
   * Database: ``bikenetwork``

#. Check :guilabel:`Save Username` and :guilabel:`Save Password`.

#. Click :guilabel:`Test connection` to ensure that the details were entered correctly.

#. Click :guilabel:`OK` to close the dialog.

#. Click :guilabel:`Connect`.

#. Select the entry named :guilabel:`bikenetwork` and click :guilabel:`OK`.

The data will be displayed in the main QGIS window. To improve the display, we will apply a style to the layer.

.. todo:: How to do this?

.. todo:: Create this style.

Our data is now ready to be versioned.

GeoGig setup
------------

Before we can use GeoGig, we will need to configure the tool. Specifically we will want to enter information about the user that will be doing the commit: the name and email of the user. This is important as the information will be contained in all commits performed by this user, allowing commits to have an author.

User information can be set either globally, for all repositories managed by GeoGit, or on a per-repository basis. We will set this information globally.

#. Enter the following information, replacing the information in quotes with your name and email:

   .. code-block:: console

      geogig config --global user.name "Author"
      geogig config --global user.email "author@example.com"

Create a GeoGit repository
--------------------------

#. Create a new directory and call it :file:`repo`. This directory will house the GeoGig repo.

   .. note:: As mentioned before, no spatial data will be contained in this directory. In fact, no files at all will be contained in this directory, save for the :file:`.geogig` subdirectory which wil contain non-human-readable details about the repository.

#. Open a terminal window and switch to this directory.

#. Create a new GeoGig repository in this directory:

   .. code-block:: console

      geogig init .

#. View a directory listing that shows all files and verify that the :file:`.geogig` directory has been created.

   .. todo:: Is it worth going in and exploring this directory?

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

.. code-block:: console

   Displays information about a commit, feature or feature type
   Usage: show [options] <reference>
     Options:
           --raw
          Produce machine-readable output
          Default: false


