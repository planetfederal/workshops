Managing Conflicts
===================

So far we've avoided conflicting versions between Alice's **review** branch and Bob's **updates** branch.  The QGIS GeoGig plugin will automatically detect conflicts when you attempt to merge conflicting branches, and halt the merge. The plugin provides the choice of aborting the merge or resolving those conflicts within QGIS. 

We're going to demonstrate what happens when two branchs attempt to change the same geometry or attribute of a feature. We'll intentionally create an attribute conflict between our **review** and **updates** branches.  We will not cover the resolution of geometry conflicts as it is not well supported by the plugin yet. But the resolution process is similar in either case.

.. note:: Conflict resolution with the GeoGig Plugin is still under development

Ours or theirs
--------------

Recall from our command line example that we can think of the source branch as over "there", while the target of the merge is over "here". The value of the conflict from the source branch is "theirs" and the value of the current  branch is "ours". Resolving a conflict requires choosing "ours", "theirs", or a new value.

Creating an Attribute Conflict
------------------------------

During her review Alice notices the Sellwood Bridge has the wrong year and sets it to ``1960``. Meanwhile Bob notices the same thing, but sets the year to ``1955``.

#. Start with the Alices **review** branch, select Alice's repository and set the current branch to **review**. Click :guilabel:`Open repository in QGIS` to ensure we have the correct layer loaded.

   .. figure:: img/conflict_review.png

      Current branch set to **review**

#. Select the the Sellwood Bridge (ID ``21``) and open the attribute table :menuselection:`Layer --> Open Attribute Table`. 

   .. figure:: img/conflict_bridge.png

      Sellwod Bridge selected in attribute table

#. Change the value of ``YEARBUILT`` to ``1960``

   .. figure:: img/conflict_1960.png

      Alice modifies year built to 1960

#. Click the pencil to turn off editing, :guilabel:`Save` when prompted, and close the attribute dialog.

#. Add this change to the repository using :menuselection:`GeoGig --> Update repository with this layer`

   .. figure:: img/gui_updaterepo.png

      Update the repository.

#. Enter an appropriate commit message.

#. Switch to Bob's repository and make sure the current branch is **updates**.

   .. figure:: img/conflict_updates.png

      Current branch set to **updates**

#. Hide or remove the previous **bikepdx** layer (Alice's), and add Bob's layer with :guilabel:`Open repository in QGIS`. 

#. Again select the the Sellwood Bridge (ID ``21``) and open the attribute table :menuselection:`Layer --> Open Attribute Table`. Set the ``YEARBUILT`` to ``1955``. 

   .. figure:: img/conflict_1955.png

      Bob modifies year built to 1955 

#. Click the pencil to turn off editing, :guilabel:`Save` when prompted, and close the attribute dialog.

#. Add this change to the repository using :menuselection:`GeoGig --> Update repository with this layer`

   .. figure:: img/gui_updaterepo.png

      Update the repository.

#. Enter an appropriate commit message.

#. Now push Bob's **updates** branch and Alice's **review** branch to the server.

   .. figure:: img/gui_opensync.png

      Synchronize with the server.

#. Now the data manager pulls the new changes from the server into the **qa** repository. Make the current branch **updates** and sync with the server. Do the same for the **review** branch.

#. Let's assume he doesn't notice the conflicting years and attempts to merge the two branches into the **master** branch. Make the **master** branch the current branch and merge the **updates** branch.

   .. figure:: img/conflict_merge.png

      Merge the updates branch into **master**

#. Still on the **master** branch, now merge the **review** branch. A warning will popup that some of the edits in the current branch are conflicting with edits in the branch you tried to merge. 

   .. figure:: img/conflict_msg.png

      Conflict warning dialog

#. The GeoGig plugin will provide two options :guilabel:`Solve Conflicts` and :guilabel:`Abort merge` just below the repository history. 

   .. figure:: img/conflict_resolve.png

      Conflict options

#. Click :guilabel:`Solve conflicts` to attempt to resolve the conflicts. A dialog box will open showing the layer and features that conflict. There should be a single feature under the **bikepdx** layer on the left, it is identified by it's GeoGig ID. 

   .. figure:: img/conflict_solve.png

      Conflict resolution dialog

#. Click the feature under the **bikepdx** layer and the attributes of the *Local* and *To merge* versions will be displayed in the top right of the dialog. Scroll down to find the ``YEARBUILT`` attribute, it will be highlighted in yellow to show that there is a conflict between the versions. 

   .. figure:: img/conflict_attrib.png

      Conflicting YEARBUILT attributes

#. Resolving the conflict requires choosing the *Local* or *To Merge* value from the attribute table. The bottom left of the dialog window has two buttons :guilabel:`To merge` and :guilabel:`Local`, clicking one of these buttons will resolve the conflict with the ``Local`` or the ``To merge`` values for all attributes.

   .. figure:: img/conflict_resolveAll.png

      Resolve all conflict buttons

#. Alternately you can choose specific values to use for the merge. Clicking one of the values will set that as the value to be used, that value will appear under the *Merged* column. Once a value is selected, the yellow highlight will disappear. Then click :guilabel:`solve` to resolve the conflicts.

   .. figure:: img/conflict_solved.png

      Solved conflict attributes to be used in the final *Merged* version

#. A commit will be added to the history showing the merged branch.






