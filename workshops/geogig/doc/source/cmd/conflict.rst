.. _cmd.conflict:

Managing conflicts
==================

When we merged branches, we merged a single commit from one branch to another. There is no possibility of problems with such a scenario.

However, that is an oversimplified case. In the course of working with multiple branches, it is very easy to have a scenario where merging one branch onto another will create a :term:`conflict`. A conflict happens when the repository exists in a contradictory state. An example of this is two commits specifying two different values for the same attribute. Another example is a commit modifying a feature with another commit deleting that feature.

When a conflict occurs, the merge is halted mid-way, and the conflict will have to be resolved before the merge can continue. Should the conflict be indicative of a larger problem, the merge itself can be aborted.

Ours or theirs
--------------

Recall that commits on branches are pulled in when a merge occurs. Thinking spatially, the source branch is over "there" while the target is over "here".

.. todo:: Add figure

Conflicts are termed in a similar way in GeoGig. The value of the conflict from the source branch is named **"theirs"** while the value currently on the target is named **"ours"**. These terms are important in that you, as manager, get to choose how to manage the conflict:

* Choose "ours"
* Choose "theirs"
* Change to something different from either "ours" or "theirs"

Creating a conflict
-------------------

Conflicts usually don't need to be created; they will happen naturally. Nonetheless, we will create a true conflict and resolve it manually.

#. Create a new branch called ``conflicting`` and switch to it.

   .. code-block:: console

      geogig branch -c conflicting

   ::

      Created branch refs/heads/conflicting

   .. note:: Verify that the above command switched to the new branch by running ``geogit branch``

#. Back in QGIS, open the attribute table for the layer (:menuselection:`Layer --> Open Attribute Table`) and find a row that corresponds to a feature. Make a note of the feature ID so you can find it again later.

   .. figure:: img/conflict_tablebefore.png

      Attribute table with highlighted feature to be modifed

   .. figure:: img/conflict_feature.png

      Feature to be modified
 
#. Click the pencil on the top left of the dialog to :guilabel:`Toggle Editing`.

#. Change the value of ``segmentnam`` for that feature in some way:

   .. figure:: img/conflict_tablechange1.png

      Modifying an attribute value

#. Click the pencil again to turn off editing. When prompted, click :guilabel:`Save`.

#. Close the attribute table dialog.

#. Import, add, and commit this change. See the :ref:`cmd.commit` section for details on these commands:

   .. code-block:: console

      geogig pg import --database geogig -t bikepdx --host localhost --port 5432 --user postgres
      geogig add bikepdx
      geogig commit -m "Renamed Mt St Helens Ave to Volcano Road"

#. Now switch back to the ``master`` branch:

   .. code-block:: console

      geogig checkout master

#. Export the master branch back to PostGIS to keep the repository and QGIS in sync:

   .. code-block:: console

      geogig pg export -o --host localhost --port 5432 --user postgres --database geogig bikepdx bikepdx

   ::

      Exporting bikepdx...
      100%
      bikepdx exported successfully to bikepdx

#. Open the attribute table for the layer, and verify that the change you made has reverted.

   .. todo:: FYI, during testing, QGIS stopped refreshing properly, and I had to restart it.

#. Click the pencil to :guilabel:`Toggle Editing` again.

#. Find the feature that was edited above. Change the ``segmentnam`` value to **something different from what you changed it to above**.

   .. figure:: img/conflict_tablechange2.png

      Modifying an attribute value to something else

#. Turn off editing and click :guilabel:`Save`.

#. Import, add, and commit this change to the GeoGig repository:

   .. code-block:: console

      geogig pg import --database geogig -t bikepdx --host localhost --port 5432 --user postgres
      geogig add bikepdx
      geogig commit -m "Renamed Mt St Helens Ave to 1980 Eruption Road"

#. With the two changes made on the two different branches, we are now ready to see what happens when we attempt a merge. Merge the ``conflicting`` branch onto the ``master`` branch.

   .. code-block:: console

      geogig merge conflicting

#. You will see the following error:

   ::

      An unhandled error occurred: CONFLICT: Merge conflict in bikepdx/6767
      Automatic merge failed. Fix conflicts and then commit the result.

Resolving the conflict
----------------------

The merge cannot continue until the conflict is resolved.

#. Get more information about existing conflicts with the ``conflicts`` command:

   .. code-block:: console

      geogig conflicts

#. The output of the above command shows much more than we care about. We can filter this output to just the differences by adding the ``--diff`` option:

   .. code-block:: console

      geogig conflicts --diff

   ::

      ---bikepdx/6767---
      Ours
      segmentnam: NE Mt. St. Helens Ave -> NE 1980 Eruption Road

      Theirs
      segmentnam: NE Mt. St. Helens Ave -> NE Volcano Road

   Here we see the problem: the attribute value is different for both "ours" (the ``master`` branch) and "theirs" (the ``conflicting`` branch.)

#. A different way to view this is through the ``status`` command:

   .. code-block:: console

      geogig status

   ::

      # On branch master
      # Unmerged paths:
      #   (use "geogig add/rm <path/to/fid>..." as appropriate to mark resolution
      #
      #      unmerged  bikepdx/6767
      # 1 total.

#. Because this situation is a simple one, we can just choose which commit we wish to use via the ``checkout`` command. We have seen this command earlier from switching between branches, but it can also be used to switch attributes from different branches, via the ``-p <feature>`` option coupled with either ``--ours`` or ``--theirs``. Since we want to pull in the value from the ``conflicting`` branch, the command is as follows:

   .. code-block:: console

      geogig checkout -p bikepdx/6767 --theirs

   ::

      Objects in the working tree were updated to the specifed version.

#. Running ``geogig status`` shows that there is a way forward out of the conflict:

   .. code-block:: console

      geogig status

   ::

      # On branch master
      # Unmerged paths:
      #   (use "geogig add/rm <path/to/fid>..." as appropriate to mark resolution
      #
      #      unmerged  bikepdx/6767
      # 1 total.
      # Changes not staged for commit:
      #   (use "geogig add <path/to/fid>..." to update what will be committed
      #   (use "geogig checkout -- <path/to/fid>..." to discard changes in working directory
      #
      #      modified  bikepdx
      #      modified  bikepdx/6767
      # 2 total.
  
#. We now need to add the feature as if it were a normal commit:

   .. code-block:: console

      geogig add bikepdx

   ::

      Counting unstaged elements...2
      Staging changes...
      100%
      1 features and 1 trees staged for commit
      0 features and 0 trees not staged for commit

#. And now we can commit the change. Since we're committing manually, we'll have to manually add the commit message in.

   .. todo:: Is this true? Is there a better way to do this?

   .. code-block:: console

      geogig commit -m "Renamed Mt St Helens Ave to Volcano Road"

   ::

      100%
      [4b6771d45949ce83530e0ff035c2f4713a8da6e3] Renamed Mt St Helens Ave to Volcano Road
      Committed, counting objects...0 features added, 1 changed, 0 deleted.

#. The conflict has now been resolved. Delete the ``conflicting`` branch.

   .. code-block:: console

      geogig branch -d conflicting

   ::

      Deleted branch 'conflicting'.
