Set Up
======

  .. todo:: should we have them delete the old repo's to start clean?

For this workflow we will use the **repo_gui** repository from the earlier QGIS example. This time we will it act as a 'remote' repository by using the GeoGig Server.

#. Open QGIS, and the GeoGig Naviagtor if it is not already open.

#. In QGIS select **repo_gui** fomr the repository list and the most recent commit under the master branch (highest), right click it, and select :menuselection:`Create new branch at this version`.

#. Create two branches named **updates** and **review**, as we did for our previous workflow.

#. Now to start the GeoGig server. Open up a terminal and change directories to our repo_gui location, then start the GeoGig server.

   .. code-block:: console

      cd ~/geogig/repos/repogui
      geogig serve

#. Back in QGIS, create three new repositories called **betty**, **joe**, and **qa_gui**

#. To configure our repositories to use the remote server, right click **betty** and select :menuselection:`Open Sync dialog for this repository` option. 

   .. figure:: img/gui_opensync.png

      The Sync menu option

#. You'll see that we have no choices under `Sync with remote:`, click :menuselection:`Manage Remotes` to add a connection to our server.

   .. figure:: img/gui_sync.png

      Sync dialog 

# This will open our remote manager which is currently empty. Click :menuselection:`Add remote` to add a remote. We will call it **origin** as it is the source of this repositories data. The address will be  ``http://localhost:8182/repos/repo_gui``.

    .. figure:: img/gui_addremote.png

        Add remote dialog

# Our remote is now ready to use, click the ``Sync: pull and push`` button to synchronize with the remote repository. You can also use the ``pull`` button since we just want to retrieve data from our server. The master branch of **betty** is now an identical copy of the **rep_gui** master branch.

#. Create Betty's **review** branch from the latest commit under the **master** branch.

#. Repeat these steps for the **joe** repository, but create an **updates** branch instead of **review**.

#. Repeat these steps one more time for our **qa_gui** repository, this time create both the **review** and the **updates** branches.

#. Now that we have our repositories setup and synchronized with our server, we can set the owners of our repositories. We'll do this the same way as in the command line workflow. 

.. code-block:: console

      cd alice
      geogig config user.name "Betty"
      geogig config user.email "betty@example.com"
      cd ..
      cd bob
      geogig config user.name "Joe"
      geogig config user.email "joe@example.com"

.. note:: The QGIS plugin sets the default owner when we create our first repository in QGIS. It works on the assumption of one user per machine. For this workshop we are simulating multiple users, which in reality would likely each have their own machine. This why we have to set repository specific owners via the command line. 

