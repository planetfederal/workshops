Set Up
======

For this workflow we will use the **repo_gui** repository from the earlier QGIS example. Again it will act as a 'remote' repository by using the GeoGig Server.

#. Open QGIS, and the GeoGig Navigator if it is not already open.

#. In QGIS select **repo_gui** from the repository list and the most recent commit under the master branch (highest), right click it, and select :menuselection:`Create new branch at this version`.

#. Create a branch named **working**, this will be the branch Betty will use to collect new data.

#. Now to start the GeoGig server. Open up a terminal and change directories to our repo_gui location, then start the GeoGig server.

   .. code-block:: console

      cd ~/geogig/repos/repogui
      geogig serve

#. Back in QGIS, create a new repository called **betty**.

#. Configure the repository to use the remote server. Right click **betty** and select :menuselection:`Open Sync dialog for this repository` option. 

   .. figure:: img/gui_opensync.png

      The Sync menu option

#. You'll see that we have no choices under `Sync with remote`, click :menuselection:`Manage Remotes` to add a connection to our server.

   .. figure:: img/gui_sync.png
      :figwidth: 50%
      :align: center

      Sync dialog 

#. This will open our remote manager which is currently empty. Click :menuselection:`Add remote` to add a remote. We will call it **origin** as it is the source of this repository's data. The address will be  ``http://localhost:8182/repos/repo_gui``.

   .. figure:: img/gui_addremote.png
        :figwidth: 50 %

        Add remote dialog

#. Our remote is now ready to use, click the ``Sync: pull and push`` button to synchronize with the remote repository. You can also just use the ``pull`` button, since we just want to retrieve data from our server. The master branch of **betty** is now an identical copy of the **repo_gui** master branch.

#. Create Betty's **working** branch from the latest commit under the **master** branch.

#. Now that we have our repositories setup and synchronized with our server, we can set the owner of our repositories. We'll do this the same way as in the command line workflow. 

   .. code-block:: console

        cd betty
        geogig config user.name "Betty"
        geogig config user.email "betty@example.com"

