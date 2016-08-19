Set Up
======

  .. todo:: should we have them delete the old repo's to start clean?

For this workflow we will use the **sample_repo** repository from the earlier QGIS example. This time we will it act as a 'remote' repository by using the GeoGig Server. There are some features which have yet to be implented in the current version of the plugin. We will address these by using the command line to complete certain actions.

#. Open QGIS, and the GeoGig Navigator if it is not already open. Start the GeoGig server if it is not running.

#. In QGIS select **sample_repo** from the repository list and the most recent commit under the master branch (highest), right click it, and select :menuselection:`Create new branch at this version`.

#. Create two branches named **updates** and **review**, as we did for our previous workflow.

#. Back in the terminal running our server, stop the server with ``Ctrl+C``. We'll create two new copies of our **sample_repo**, called **alice** and **bob**, by using the ``clone`` command. 

   .. code-block:: console

       geogig clone sample_repo alice

#. Repeat the clone command to create Bob's repository.

#. Start the GeoGig server again.

    .. code-block:: console

     geogig serve -m 

#. Back in QGIS we need to refresh our list of repositories to pick up the repositories we just created.

   .. figure:: img/gui_refreshed.png

      Repository list after refresh.

#. Now that we have our repositories setup, we can set the owners of our repositories. We'll do this the same way as in the command line workflow. Open a new terminal (so we don't have to stop the server) and navigate to the ``repos`` directory. 

   .. code-block:: console

        cd alice
        geogig config user.name "Alice"
        geogig config user.email "alice@example.com"
        cd ..
        cd bob
        geogig config user.name "Bob"
        geogig config user.email "bob@example.com"

.. note:: The QGIS plugin sets the default owner when we create our first repository in QGIS. It works on the assumption of one user per machine. For this workshop we are simulating multiple users, which in reality would likely each have their own machine. This why we have to set repository specific owners via the command line. 

