.. _gui.setup:

Setting up a new project
========================

We have now seen the GeoGig command line interface, and have performed basic management of a geospatial repository with it.

There is also a GeoGig plugin for QGIS, that accomplishes most of the same things, but in a graphical form.

Our goal now is show the exact same workflows we saw in the :ref:`cmd` section, but using the GeoGig plugin for QGIS. As a data administrator, you will then have a choice to use whichever tool makes the most sense for your team.

.. todo:: How do people get this plugin?

.. todo:: Has the plugin already been installed? Or installed an not activated? Need to figure this out.

.. warning:: This plugin is considered **beta software** and should not be used in production systems at the moment.  

Rolling back changes
--------------------

The goal of the rest of this workshop is to show how to do the same functions with the plugin as we did on the command line. While most of the concepts are the same, many of the procedures and terminology are different.

To see this most clearly, we will roll back our repository to something approximating the beginning: we will roll back the ``master`` branch to the initial commit using the command line. Once that is done, we will switch exclusively to the plugin.

At this point our repo has a single branch named ``master`` with a few commits. Let's create a branch to store these commits (just to be safe), and then perform a hard reset on ``master``.

#. On a terminal in the ``repo`` directory, create a branch named ``backup``:

   .. note:: Don't switch to it.

   .. code-block:: console

      geogig branch backup

   ::

      Created branch refs/heads/backup

#. Now find the commit ID of the first commit:

   .. code-block:: console

      geogig log --oneline

   The commit ID will be at the bottom of the list.

#. Perform a hard reset on the ``master`` branch, using the commit ID of the first commit:

   .. code-block:: console

      geogig reset --hard cfdbd50

   .. note:: Your commit ID will be different than the above.

#. Verify that the history for this branch is gone except for the single commit:

   .. code-block:: console

      geogig log --oneline

   ::

      cfdbd50c415a0d71b9a876eb51f90d5752e8f23b Initial commit of complete bikepdx layer

#. Export the state of this repository back to PostGIS:

   .. code-block:: console

      geogig pg export -o --host localhost --port 5432 --user postgres --database geogig bikepdx bikepdx

#. Go back to QGIS and verify that the layer (specifically the database) is in its initial state now (and that any of the modifications made are now gone).

Running the GeoGig gateway
--------------------------

We need to start the "GeoGig gateway" before we can use the plugin. The GeoGig gateway is a server designed to listen to changes that affect GeoGig repositories, much like how PostgreSQL has a running process listening for action performed on its databases.

The GeoGig gateway is a command that exists in the same directory as the ``geogit`` command. As we already have this directory on the path it is simple to start the gateway.

#. Open a second terminal window and start the gateway:

   .. code-block:: console

      geogig-gateway

   ::

      GeoGig server correctly started and waiting for conections at port 25333

   .. note:: The reason for the second terminal window is to let this process run in the background. You may find it useful to refer to this window when performing operations with the plugin, as the underlying commands will be shown here in the background.

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

#. Click :guilabel:`Add repo`.

   .. figure:: img/setup_repolistblank.png

      GeoGig repository list

#. In the section titled :guilabel:`Create new repository`, enter a path to the new repository. To keep from getting confused with the one used in previous sections, use ``repo_gui`` as the repository name.

   .. note:: You may need to craete this directory.

   .. figure:: img/setup_newrepo.png

      Path to a new repository

#. Click :guilabel:`Create + Import`.

#. The current project will be loaded into the new GeoGig repository. When finished, you will see a dialog showing the layer and a box to input a commit message. Enter :kbd:`Initial commit of complete bikepdx layer` and click :guilabel:`Import`.

   .. figure:: img/setup_firstcommit.png

      First commit in the repository

#. You will then be asked to enter credentials to connect to the underlying PostGIS layer. The repo itself doesn't know about PostGIS yet, but since the PostGIS layer is open in QGIS, it knows that is the layer that will be populated into the new repo. Enter your database credentials as set previously, and click :guilabel:`OK`. 

   .. warning:: Even if you have no password set, enter any text in the field. Don't leave the password field blank. 

   .. figure:: img/setup_creds.png

      Credentials for GeoGig to connect to PostGIS

   .. todo:

#. You will be given a warning about a missing ``geogigid`` field. This field is used by the plugin in order to better track changes. Click :guilabel:`Yes` to create this column in the database table.

   .. figure:: img/setup_idwarning.png

      Warning about adding a geogigid field

   .. todo:: Say more about the reasons to create this field.

#. The repo will be created, and the data imported.

   .. figure:: img/setup_importing.png

      Importing

#. The repo will then be listed in the dialog. Click :guilabel:`Open repository` to return to QGIS.

   .. figure:: img/setup_repolist.png

      Repository list showing new repository

#. The GeoGig dialog will display on the right side. If you're running out of screen real estate, the dialog can be undocked by clicking the window icon at the top right of the panel.

   .. figure:: img/setup_explorer.png

      GeoGit explorer

It is in this dialog that we will be performing all of the operations on the GeoGig repository, taking the place of the command line tool.

.. note:: If you ever close this window and want to get it back again, navigate to :menuselection:`GeoGig --> GeoGig client`, select the repository, and click :guilabel:`Open repository`.