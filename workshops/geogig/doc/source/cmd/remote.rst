.. _cmd.remote:

Working with remote repositories
================================

We have so far only worked within a single repository. The benefits to working with GeoGig extend far beyond this to allow for multiple/remote repositories, such that multiple players can be working on the "same" content in different places, sharing commits and branches as necessary.

A repository can be "cloned", and the copy is just as "authoritative," at least in a technical sense, as the original. (Your workflow decides which, if any, becomes the "official" version.)

.. warning:: In this section, we will create a clone which will connect to the exact same database table. This won't cause problems for us since we'll be working with only one repository at a time, but to avoid collisions, different repositories will need to connect to different databases or database tables.

.. todo:: Adjust section to use a different table for the clone.

Cloning a repository
--------------------

We created our own repository during this workshop, but it's just as common for the repository to already be created, with you being given instructions to modify it.

Let's say that a colleague is new to this project, and has been tasked with performing some edits to this data. We will :term:`clone` the repository, and the clone will be given to them to work on, while we continue working in the original repository.

.. note::

   It is possible to *partially clone* a repository. This is outside the scope of this workshop, but please see the :ref:`GeoGig documentation <moreinfo.resources>` for more information about "shallow" and "sparse" clones.

Typically, repository clones will exist on different machines. To get a repository from one machine to another, we can use the ``geogig serve`` command. This will create a server that will "publish" the repository. A second machine that has access to this server can connect to it and then clone the repository locally.

In this situation, we only have a single machine, but we can still use the ``serve`` command to create the clone.

#. Open a new terminal, switch to the ``city_data`` repository directory, and create a branch called ``send``.

   .. code-block:: console

      cd ~/geogig/repos/city_data
      geogig branch send

#. Move up to the ``repos`` directory and start the GeoGig server:

   .. code-block:: console

      cd ..
      geogig serve -m

   ::

      Starting server on port 8182, use CTRL+C to exit.

#. The repository is now served at ``http://localhost:8182/repos/<repo name>``. We can connect to this URL to make our clone with the ``geogig clone`` command.

#. Return to the original terminal (leave the one above running).

#. Move up one level, create a new directory called city_clone, and clone the repository:

   .. code-block:: console

      cd ..
      geogig clone http://localhost:8182/repos/city_data city_clone

   ::

      Cloning into '/home/qgis-user/geogig/repos/'...
      Fetching from refs/heads/master
      Request sent. Waiting for response...
      Processing response...
      Processed 6,822 objects.
      Inserted: 6,822.
      Existing: 0.
      Time to process: 16.23 s.
      Compressed size: 753,829 bytes.
      Uncompressed size: 1,867,967 bytes.
      95%
      Done.

#. Verify the history of the clone is identical to the original by going into that directory and running ``geogig log``:

   .. code-block:: console

      cd city_clone
      geogig log --oneline

.. note::

   Another way to do this is to use the ``geogig clone`` command locally. The only difference is that this uses only the local file system to do the copy.

   The ``geogig clone`` command requires only two arguments: ``[source_directory] [target_directory]``. The cloning process requires only a new directory.

   #. Stop the GeoGig Server if it's running.

   #. On a terminal, move one level up, create a new directory, and run the ``geogig clone`` command:

      .. code-block:: console

         cd ..
         mkdir local_clone
         geogig clone city_data local_clone

      ::

         Cloning into 'local_clone'...
         95%
         Done.

      The clone is placed in the :file:`local_clone` directory. If you move into that directory, you will see that it is a complete copy of the original repository, with all history.

Adding a remote repository
--------------------------

This cloned repository is linked to the original by way of a :term:`remote`. A remote is a name and path to a remote repository. Commits and branches can be brought in and sent to and from clones of the same repository, allowing multiple users to work separately and yet still collaborate.

#. View the current list of remotes for this repository

   .. code-block:: console

      geogig remote list

   ::

      origin

#. The default source for the repository is usually given the name "origin." To get more information about this remote, add the ``-v`` option:

   .. code-block:: console

      geogig remote list -v

   ::

      origin http://localhost:8182 (fetch)
      origin http://localhost:8182 (push)

#. This will show the full path to "origin", as well as showing that it is available for two operations: :term:`fetch` and :term:`push`. Fetch (or :term:`pull`) is the process of retrieving information (commits, branches) from the remote repository, while push does the opposite.

The remote relationship is now set up for the clone.

.. note:: To add a remote repository, use the ``geogig remote add <path>`` command.

Moving work between repositories
--------------------------------

We will work inside the cloned repository, and then share that information with the original repository later.

Moreover, to summarize all that we've learned so far in this workshop, we will perform this work in a separate branch, push the branch to the clone, and then merge the branch in the clone.

#. Create a new branch called ``send`` and switch to it.

   .. code-block:: console

      geogig branch -c send

   ::

      Created branch refs/heads/send

#. Back in QGIS, add or edit a feature. For details on how to do this, please see the :ref:`cmd.commit` section.

   .. figure:: img/remote_addfeature.png

      Adding a new feature (in this case, a loop around Powell Butte)

#. Import, add, and commit this change.

   .. code-block:: console

      geogig shp import --fid-attrib ID ~/data/cmd/bikepdx.shp
      geogig add bikepdx
      geogig commit -m "Added loop around Powell Butte"

#. With the commit added to the ``send`` branch, we will now send the branch itself over to the original repository, via the ``push`` command:

   .. code-block:: console

      geogig push origin send

   .. note:: The command is of the form ``geogig push [remote_name] [branch]``. And remember that the name given to the original repository is ``origin``.

#. Stop the GeoGig Server, switch over to the original repository and verify that the push was received:

   .. code-block:: console

      cd ..
      cd city_data
      geogig branch -v

   ::

      * master 4b6771d Renamed Mt St Helens Ave to Volcano Road
        send   b20df6a Added loop around Powell Butte

#. We could continue to work on this branch, pulling and pushing commits back and forth as desired. But for now, let's assume that this branch was meant as a single project which, when approved, would be merged into the final project. So let's perform a merge:

   .. code-block:: console

      geogig merge send

   ::

      100%
      [b20df6af61dac05b29ad459d70fd0ef47b05c8e3] Added loop around Powell Butte
      Committed, counting objects...1 features added, 1 changed, 0 deleted.

#. Delete the branch:

   .. code-block:: console

      geogig branch -d send

   ::

      Deleted branch 'send'.

#. Now start the geogig server again and return to the cloned repository. Notice that nothing has changed since we pushed the branch:

   .. code-block:: console

      cd ..
      geogig serve -m

   ::

      geogig branch -v

   ::

        master 4b6771d Renamed Mt St Helens Ave to Volcano Road
      * send   b20df6a Added loop around Powell Butte

#. At this point, if we pull the master branch in from the original repository, we will in effect have merged the ``master`` branch with the ``send`` branch. But we'll need to switch to the target branch first:

   .. code-block:: console

      geogig checkout master

   ::

      Switched to branch 'master'

#. Now perform the pull:

   .. code-block:: console

      geogig pull origin master

   ::

      80%
      Features Added: 1 Removed: 0 Modified: 1

#. Verify that the commit we made is now on ``master`` here as well.

   .. code-block:: console

      geogig branch -v

   .. note:: You could also use ``geogig log --oneline`` to check this.

   ::

      * master b20df6a Added loop around Powell Butte
        send   b20df6a Added loop around Powell Butte

#. We have successfully completed the process of sharing a commit between two repositories. We can now delete the ``send`` branch, as it is not necessary anymore:

   .. code-block:: console

      geogig branch -d send

   ::

      Deleted branch 'send'.

.. note:: When the server is running, the repository is considered 'locked' and you may not run any operations using ``geogig`` on the command line. 
