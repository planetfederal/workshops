Managing Conflicts
===================

So far we've avoided conflicting versions between Alice's **review** branch and Bob's **updates** branch.  The QGIS GeoGig plugin will automatically detect conflicts when you attempt to merge conflicting branches, and halt the merge. The plugin provides the choice of aborting the merge or resolving those conflicts within QGIS. 

We're going to demonstrate two types of conflict. First we'll look at conflicts within the same branch caused by contradictory commits after a revert. Then we'll look at a merge conflict, which happens when two branchs attempt to change the same geometry or attribute of a feature.

We'll intentionally create an attribute conflict between our **review** and **updates** branches.  We will not cover the resolution of geometry conflicts as it is not well supported by the plugin yet. But the resolution process is similar in either case.

.. note:: Merging and conflict resolution using the GeoGig Plugin is still under development.

Ours or theirs
--------------

Recall from our command line example that we can think of the source branch as over "there", while the target of the merge is over "here". The value of the conflict from the source branch is "theirs" and the value of the current  branch is "ours". Resolving a conflict requires choosing "ours", "theirs", or a new value.

Creating and Resolving an Attribute Conflict
--------------------------------------------

During her review Alice notices the Sellwood Bridge has the wrong year and sets it to ``1960``. Meanwhile Bob notices the same thing, but sets the year to ``1948``. For the purposes of this example we will assume Alice and Bob are both working on the ``repo_gui`` repository. 

#. We'll start by creating a new branch off the most recent commit on **master**, and call it ``conflict``. Ensure we're using the ``repo_gui`` repository by using the :menuselection:`Add to QGIS` button the the repository list.

   .. figure:: img/conflict_branch.png

      Activating the desired layer from branch.

#. Select the the Sellwood Bridge (ID ``21``) and open the attribute table :menuselection:`Layer --> Open Attribute Table`. 

   .. figure:: img/conflict_bridge.png

      Sellwod Bridge selected in attribute table

#. Change the value of ``YEARBUILT`` to ``1960``

   .. figure:: img/conflict_1960.png

      Alice modifies year built to 1960

#. Click the pencil to turn off editing, :guilabel:`Save` when prompted, and close the attribute dialog.

#. Add this change to the repository using :menuselection:`Sync layer with repository branch...` and enter an appropriate commit message.

   .. figure:: img/conflict_commit.png

      Committing our first change to the conflict branch.

#. Now we'll make a similar change on the ``master`` branch. Select the master branch, right click the top commit and select :menuselection:`Change bikepdx layer to this version`.

#. Select the Sellwood Brdige again and edit the ``YEARBUILT`` attribute of the bridge, setting it to ``1948``.

   .. figure:: img/conflict_1948.png

      Yearbuilt attribute set to 1948 for the Sellwood Bridge

#. Rather than committing this to the ``master`` branch, we will attempt to commit it to the ``conflict`` branch. GeoGig will detect a conflict and ask us if we want to fix them, click :guilabel:`Yes`. 

   .. figure:: img/conflict_warning.png

      Geogig conflict warning

#. A merge conflicts dialog will be opened that provides a comparison of the conflicting commits. Expand the bikepdx layer and select the feature. The conflicting attributes will be highlighted in yellow. In this case we can see the original year of 1950, the *local* year of 1948 (master branch), and the *remote* year of 1960 (the conflict branch).

   .. figure:: img/conflicts_merge.png

      The merge conflicts dialog.

#. We have several ways to solve the merge conflict from this dialog. If we had multiple conflicts we could choose to :guilabel:`Resolve all conflicts with` *local* or *remote*. We can select a single feature and resolve with *local* or *remote* . Or we can use the table to select the attributes to use in the merged result. Click the *local* YEARBUILT cell to select 1948 to use in the merged version, click :guilabel:`Solve with merged feature` to accept the resolution.

   .. figure:: img/conflict_postmerge.png

      Repository history showing the completed merge

Creating and Resolving a Geometry Conflict
------------------------------------------

To demonstrate a geometry conflict both Alice and Bob will be changing the geometry of the Sellwood Gap trail. For the purposes of this example we will assume Alice and Bob are both working on the ``repo_gui`` repository. 

#. We'll start by creating a new branch off the most recent commit on **master**, and call it ``geom_conflict``. Ensure we're using the ``repo_gui`` repository by using the :menuselection:`Add to QGIS` button the the repository list.

   .. figure:: img/conflict_branch2.png

      Activating the desired layer from branch.

   .. note:: You may need to remove the styling from the layer in order to modify the geometry. 

#. Click the pencil icon to begin editting, we'll use the :guilabel:`Node Tool` to adjust the path of the Sellwood Gap trail. Click and drag the vertices (red X's) to reshape the trail. You can double click between vertices to create a new vertex. When satisfied with the changes, click the pencil icon and save.

   .. figure:: img/conflict_sellwood1.png

      First version of the modified Sellwood Trail

#. Commit this change to the ``geom_conflict`` branch.

   .. figure:: img/conflict_branch1.png

      The first geometry change committed to the *geom_conflict* branch.

#. Now expand the ``master`` branch, right click the most recent commit, and select :menuselection:`Change 'bikepdx' layer to this version`. The our view will update and the Sellwood Gap will be in it's original state. 

   .. figure:: img/conflict_master.png

      The master branch version before editting.

#. Enter editing mode and use the ``Node Tool`` to change the route of the Sellwood trail.

   .. figure:: img/conflict_sellwood2.png

      The second version of the Sellwood Trail

#. Commit this change to the ``geom_conflict`` branch. Geogig will detect the conflict and ask us to fix it, click yes.

   .. figure:: img/conflict_warning.png

      Geogig conflict warning

#. In the :guilabel:`Merge Conflicts` dialog expand the **bikepdx** layer and select the conflicting feature. This time the lower part of the window shows the two different geometries we are trying to merge. the **remote** is the green line and the **local** is the blue line. 

   .. figure:: img/conflict_merge2.png

      Resolving a geometery conflict.

#. As in the attribute resolution we can resolve this conflict in several ways. This time we will assume the **remote** version is the correct one. Click the :guilabel:`Solve with remote feature` button to choose our remote version and complete the merge.

   .. figure:: img/conflict_postmerge2.png

      The *geom_conflict* branch history showing our merged commits.
