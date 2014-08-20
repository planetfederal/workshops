.. _cmd.remote:

Working with remote repositories
================================

We have so far only worked within a single repository. The benefits to working with GeoGig extend far beyond this to allow for multiple/remote repositories, such that multiple players can be working on the "same" content in different places, sharing commits and branches as necessary.

A repository can be "cloned", and the copy is just as "authoritative," at least in a technical sense, as the original. (Your workflow decides which, if any, becomes the "official" version.)

Cloning a repository
--------------------

We created our own repository during this workshop, but it's just as common for the repository to already be created, with you being given instructions to modify it.

Let's say that a colleague is new to this project, and has been tasked with performing some edits to this data. We will :term:`clone` the repository, and the clone will be given to them to work on, while we continue working in the original repository.

The ``geogig clone`` command requires only two arguments: ``[source_directory] [target_directory]``

The cloning process requires only a new directory.

#. On a terminal, move one level up and run the ``geogig clone`` command:

   .. code-block:: console

      cd ..
      geogig clone repo repo_clone

   ::

      Cloning into 'repo_clone'...
      95%
      Done.

The clone is placed in the :file:`repo_clone` directory. If you move into that directory, you will see that it is a complete copy of the original repository, with all history.

#. Verify the history of the clone by going into that directory and running ``geogig log``:

   .. code-block:: console

      cd repo_clone
      geogig log --oneline

   .. todo:: I note that the log output here shows duplicates due to the conflict resolution in the previous section. Perhaps there is a better way.

.. note::

   It is possible to *partially clone* a repository. This is outside the scope of this workshop, but please see the :ref:`GeoGig documentation <moreinfo.resources>` for more information about "shallow" and "sparse" clones.

Adding a remote repository
--------------------------

This cloned repository is linked to the original by way of a :term:`remote`. A remote is a name and path to a remote repository. Commits and branches can be brought in and sent to and from clones of the same repository, allowing multiple users to work separately and yet still collaborate.

#. View the current list of remotes for this repository

   .. code-block:: console

      geogit remote list

   ::

      origin

#. The default source for the repository is usually given the name "origin." To get more information about this remote, add the ``-v`` option:

   .. code-block:: console

      geogit remote list -v

   ::

      origin file:/C:/Users/training/Desktop/repo/ (fetch)
      origin file:/C:/Users/training/Desktop/repo/ (push)

#. This will show the full path to "origin", as well as showing that it is available for two operations: :term:`fetch` and :term:`push`. Fetch (or :term:`pull`) is the process of retrieving information (commits, branches) from the remote repository, while push does the opposite. 

#. The remote relationship is already set up for the clone, but is not for the original repository. While not necessary in this case (as we control both respotiories) let's see up remote tracking on the original repository too. First, switch to the original repository:

   .. code-block:: console

      cd ..
      cd repo

#. Add the clone as a repository, using its full path. To keep us from getting confused, we will call it "clone":

   .. note:: For Windows users: Despite the nonstandard path notation above, you can enter standard Windows paths below and GeoGig will interpret them properly.

   .. code-block:: console

      geogig remote add clone C:\Users\training\Desktop\repo_clone\

#. Verify that the remote was added:

   .. code-block:: console

      geogig remote list -v

   ::

      clone file:/C:/Users/training/Desktop/repo_clone/ (fetch)
      clone file:/C:/Users/training/Desktop/repo_clone/ (push)

Moving work between repositories
--------------------------------

We will work inside the original repository, and then share that information with the clone later.

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

      geogig pg import --database geogig -t bikepdx --host localhost --port 5432 --user postgres
      geogig add bikepdx
      geogig commit -m "Added loop around Powell Butte"

   .. todo:: FYI, when testing there was an extra modified feature that came along for the ride with this commit. Not sure why.

#. With the commit added to the ``send`` branch, we will now send the branch itself over to the clone, via the ``push`` command:

   .. code-block:: console

      geogig push clone send

   .. note:: The command is of the form ``geogig push [remote_name] [branch]``

#. Switch over to the clone and verify that the push was received:

   .. code-block:: console

      cd ..
      cd repo_clone
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

#. Now return to the original repository. Notice that nothing has changed since we pushed the branch:

   .. code-block:: console

      cd ..
      cd repo
      geogig branch -v

   ::

        master 4b6771d Renamed Mt St Helens Ave to Volcano Road
      * send   b20df6a Added loop around Powell Butte

#. At the point, if we pull the master branch in from the cloned repository, we will in effect have merged the ``master`` branch with the ``send`` branch. But we'll need to switch to the target branch first:

   .. code-block:: console

      geogig checkout master

   ::

      Switched to branch 'master'

#. Now perform the pull:

   .. code-block:: console

      geogig pull clone master

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

We have successfully completed the process of sharing a commit between two repositories.
