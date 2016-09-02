.. _gui.branch:

Working with branches
=====================

Mirroring our work on the :ref:`command line <cmd.branch>`, we will now extend our scope to include branches. Specifically, we will create a new branch, perform work on it, and then merge that work into our master branch.

Create a new branch
-------------------

By default, all work happens on the ``master`` branch. We can see that the current branch is ``master`` in the Repository Explorer, on the left side (or top, if docked).

.. figure:: img/branch_explorer.png

   Repository Explorer showing master branch

#. Select the latest commit and :menuselection:`Create new branch at this version`.

   .. figure:: img/branch_create.png

      Creating a branch from version

   .. note:: While we haven't talked about "tags" here, you can think of them as a special type of snapshot. A tag can be created from any branch, but one does not "work on" the tag; it remains fixed. Tags are most often used to manage data product releases, where an exact snapshot needs to be referred to in a human-readable way.

#. There is also an option in this dialog to create a new branch. Click :guilabel:`Create branch`, and in the box below, enter ``sandbox``.

   .. figure:: img/branch_createnewbranch.png

      Creating a new branch called sandbox

#. Click :guilabel:`OK` to create the new branch. The new branch is gray (and available as a backup) while we continue to work on master. 

   .. figure:: img/branch_history.png

      Branch history

#. Select the sandbox branch and :menuselection:`Make this branch the current branch`.

   .. figure:: img/branch_change.png

      Branch change
  
#. You will see in the GeoGig Navigator that the new branch is being used.

   .. figure:: img/branch_explorersandbox.png

      New sandbox branch

#. All commits created now will be placed on the ``sandbox`` branch, until or unless we switch to another branch.

Making a commit on a branch
---------------------------

Let's add a new feature and then make a commit on this new branch.

#. Add a new feature in QGIS. Refer to previous sections if necessary:

   .. figure:: ../cmd/img/branch_newfeature.png

      New bike lane added (diagonal)

   .. note::

      In the figure above, the following attribute values were used:

      * ``id``: ``6774``
      * ``segmentnam``: ``DURHAM AVE``
      * ``status``: ``RECOMM``
      * ``facility``: ``MTRAIL``
      * ``facilityde``: ``Multi-use Trail``

#. After you are happy with your changes click :guilabel:`Toggle Editing` to save your changes. Now commit them to the repository by right clicking the layer and select :menuselection:`Geogig --> Update repository with this version`. In the commit dialgo enter the following message: "New [name] bike lane added", where [name] is the name of the lane as given in the attribute.

   .. figure:: img/branch_newlanemessage.png

      Commit message

#. The commit will proceed, and in the repository history under the sandbox branch the new commit will appear.

   .. figure:: img/branch_sandboxcommits.png

      Three total commits on the sandbox branch

#. The commit is only on the ``sandbox`` branch, though. 

#. Select the ``master`` branch, right click it, and click :guilabel:`Make this branch the current branch`.

   .. figure:: img/branch_switchtomaster.png

      Switching to the master branch

#. Notice that the most recent commit is not there.

Merging branches
----------------

If we merge the ``sandbox`` branch with the ``master`` branch, that one commit that we made will become part of the ``master`` branch. Let's do that.

#. At the very top of the Repository history, you will see the sandbox branch. Right click and :menuselection:`Merge this branch into the current one`.

   .. figure:: img/branch_repobuttons.png

      Merge sandbox into master branch

#. You will see that the commit from the ``sandbox`` branch is now on the ``master`` branch.

   .. figure:: img/branch_commitsonmaster.png

      A successful merge

#. Now that our changes are on the ``master`` branch we no longer need the ``sandbox`` branch. We can delete the ``sandbox`` branch by right clicking the branch and :menuselection:`Delete this branch`.
