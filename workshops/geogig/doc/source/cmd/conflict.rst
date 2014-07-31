.. _cmd.conflict:

Managing conflicts
==================

In the previous section, when we merged branches we merged a single commit, with no commits having happened on the target branch. There is no possibility of problems with such a scenario.

However, that is an oversimplified case. In the course of working with multiple branches, it is very easy to have a scenario where merging one branch onto another will create a :term:`conflict`. A conflict happens when the repository exists in a contradictory state. An example of this is two commits specifying two different values for the same attribute. Another example is a commit modifying a feature with another commit deleting that feature.

.. todo:: Not sure if these count as conflicts. Will need to check.

When a conflict occurs, the merge is halted mid-way, and the conflict will have to be resolved before the merge can continue. Should the conflict be indicative of a larger problem, the merge itself can be aborted.

Ours or theirs
--------------

Recall that branches are pulled in when a merge occurs. Thinking spatially, the source branch is over "there" while the target is over "here".

Conflicts are termed in a similar way in GeoGig. The value of the conflict from the source branch is named **"theirs"** while the value currently on the target is named **"ours"**. These terms are important in that you, as manager, get to choose how to manage the conflict:

* Choose "ours"
* Choose "theirs"
* Change to something different from either "ours" or "theirs"

Creating a conflict
-------------------

Conflicts usually don't need to be created; they will happen naturally.

Nonetheless, we will create a true conflict and resolve it manually.

#. Create a new branch called ``conflicting`` and switch to it.

   .. code-block:: console

      geogig branch -c conflicting

   .. todo:: Is there a need for exporting?

#. Open the attribute table for the layer (:menuselection:`Layer --> Open Attribute Table) and find a row that corresponds to a feature. Make a note of the feature ID so you can find it again later.

#. Click the pencil to :guilabel:`Toggle Editing`.

#. Change the value of ``SEGMENTNAM`` for that feature. (It doesn't matter to what.)

#. Click the pencil to turn off editing. When prompted, click :guilabel:`Save`.

#. Import, add, and commit this change.

   .. todo:: Details needed

#. Now switch back to the ``master`` branch.

   .. code-block:: console

      geogig checkout master

#. Export this branch back to PostGIS.

   .. todo:: Details needed

#. Open the attribute table for the layer, and :guilabel:`Toggle Editing` again.

#. Find the feature that was edited above. Change the ``SEGMENTNAM`` value to something different from before.

#. Turn off editing and click :guilabel:`Save`.

#. Import, add, and commit this change.

   .. todo:: Details needed

#. With the two changes made on the two branches, we are now ready to see what happens when we attempt a merge:

   .. code-block:: console

      geogig merge conflicting

#. You will see the following error:

   .. todo:: Details needed.

Resolving the conflict
----------------------

The merge cannot continue until the conflict is resolved.

#. Get more information about existing conflicts:

   .. code-block:: console

      geogig conflicts

#. This shows more than we care about. We can filter this output to just the differences by adding the ``--diff`` option:

   .. code-block:: console

      geogig conflicts --diff

#. Here we see the problem: as expected the attribute value is different for both "ours" and "theirs."

.. todo:: Figure out how to resolve this conflict

The conflict has been resolved and the merge has completed.

 




  

   
