.. _gui.setup:

Setting up a new project
========================

We have now seen the GeoGig command line interface, and have performed basic management of a geospatial repository with it.

There is also a GeoGig plugin for QGIS, that accomplishes most of the same things, but in a graphical form.

Our goal now is show the exact same workflows we saw in the :ref:`cmd` section, but using the GeoGig plugin for QGIS. As a data administrator, you will then have a choice to use whichever tool makes the most sense for your team.

.. todo:: How do people get this plugin?

.. todo:: Has the plugin already been installed? Or installed an not activated? Need to figure this out.

.. warning:: This plugin is considered **beta software** and should not be used in production systems at the moment.  

.. note:: Since this workshop was written the QGIS GeoGig plugin has been further streamlined taking care of setting new repositories and running a GeoGig gateway as required.
   
   The GeoGig gateway is a server designed to listen to changes that affect GeoGig repositories, much like how PostgreSQL has a running process listening for action performed on its databases.
   The ``geogig-gateway`` is often left running in a terminal window or as background process, allowing applications to make changes.
   
   The qgis-geogig-plugin will take care of running ``geogig-gateway`` as required to communicate with your repository.

Now we are ready to explore the plugin.

Exploring the plugin
--------------------

The plugin is first accessed through the ``GeoGig`` menu, which contains three options:

* :guilabel:`GeoGig client`: Repository manager
* :guilabel:`GeoGig client settings`: Configures GeoGig
* :guilabel:`GeoGig feature info tool`: Feature info tool specific to GeoGig.

.. todo:: More about the featureinfo tool?

.. figure:: img/setup_geogigmenu.png

   GeoGig menu

Creating a new repo
-------------------

In order to show the full lifecycle of working with repos with the plugin, we will not be using the repository stored in the ``repo`` directory, but will instead create a new one.

#. Navigate to :menuselection:`GeoGig --> GeoGig client`.

#. Click :guilabel:`New Repository`.

   .. figure:: img/setup_repolistblank.png

      GeoGig repository list

#. In the section titled :guilabel:`Enter the new repository name` use ``repo_gui`` as the repository name.

   .. figure:: img/setup_newrepo.png

      Name of new repository
      
#. Click :guilabel:`OK`.

#. Select the ``bikepdx`` layer and :menuselection:`GeoGig --> Add layer to Repository`.

#. You will then be asked which repository and for an initial commit message. 
   
   .. figure:: img/setup_add_to_repo.png
      
      Add bikepdx to repository
      
   .. figure:: img/setup_firstcommit.png

      First commit in the repository

   .. note:: When adding a new shapefile to geogig fir the first time you will be given a warning about a missing ``geogigid`` field. This field is used by the plugin in order to better track changes. Click :guilabel:`Yes` to create this column in the database table.

   .. figure:: img/setup_idwarning.png

      Warning about adding a geogigid field

   .. todo:: Say more about the reasons to create this field.

#. The repo will be created, and the data imported.

   .. figure:: img/setup_importing.png

      Importing

#. The repo will then be listed in the ``GeoGig Navigator``.

   .. figure:: img/setup_repolist.png

      Repository list showing new repository

#. The GeoGig Navigator provides both a repository summary and history on the right hand side.

   .. figure:: img/setup_explorer.png

      Selected repository showing history

   It is in this dialog that we will be performing many of the operations on the GeoGig repository, taking the place of the command line tool.

.. note:: When you close this dialog and want to get it back again, navigate to :menuselection:`GeoGig --> GeoGig Navigator`.