.. _cmd.branch:

Working with branches
=====================

We have so far been working on a single :term:`branch`, the "master" branch. A branch is a single linear :term:`timeline` of events, which may not always be suitable for certain workflows.

In this section we will create a new branch and add commits to both the master branch and the new branch. We will then merge the branches back to a single path.

Create a new branch
-------------------

A new branch shares the same timeline and history as its parent does, up until the point at which the branch was crated at which point the history diverges. Commits that happen on one branch are isolated from the other.

.. todo:: A graphic of this.

#. First, let's see what branch we're on:

   .. code-block:: console

      geogig branch

   .. code-block:: console

      * master

   There is only one entry here, but the asterisk will indicate the current branch.

#. We can get a bit more information by adding the ``-v`` option:

   .. code-block:: console

      geogig branch -v

   .. code-block:: console

      * master 603d4bf The Sellwood Gap has now been fixed

   This shows the ID of the most recent commit.

#. Now let's create a branch. Call it "sandbox":

   .. code-block:: console

      geogig branch sandbox

#. This has created the branch, but **does not switch us over to use it**. To switch over, we have to use the :term:`checkout` command:

   .. code-block:: console

      geogig checkout sandbox

   .. note::

      You can create a new branch and switch to it in one step by running:

      .. code-block:: console

         geogig branch -c [name_of_branch]

#. Now when we see a list of branches, it will show that we're "on" the ``sandbox`` branch:

   .. code-block:: console

      geogig branch -v

   ::

        master  603d4bf The Sellwood Gap has now been fixed
      * sandbox 603d4bf The Sellwood Gap has now been fixed

   All commits created now will be placed on that branch, until or unless we switch to another branch.

Making a commit on a branch
---------------------------

Now that we are working on a new branch, there should be nothing different about our workflow; we make changes to our data and commit as necessary. The only differences happen when we want to merge with the master (or any other) branch.

#. Add a new feature (bike lane) to the layer. Refer to the previous section on :ref:`cmd.commit` for instructions if necessary. (For simplicity, you can recreate the same bike lane, or a new one, whatever you wish.)

   .. figure:: img/branch_newfeature.png

      New bike lane added (diagonal)

   .. note::

      In the figure above, the following attribute values were used:

      * ``id``: ``6774``
      * ``segmentnam``: ``DURHAM AVE``
      * ``status``: ``RECOMM``
      * ``facility``: ``MTRAIL``

#. Commit this new feature using the steps outlined in the previous section. Use the commit message "New [name] bike lane added", where [name] is the name of the lane as given in the attribute.

   .. code-block:: console

      geogig shp import --fid-attrib id ../data/bikepdx.shp

   ::

      Importing from shapefile ../data/bikepdx.shp

      Importing bikepdx          (1/1)...
      87%
      1 distinct features inserted in 4.697 s

      Building final tree...

      6744 features tree built in 709.9 ms
      100%
      ../data/bikepdx.shp imported successfully.

   .. code-block:: console

      geogig add bikepdx

   ::

      Counting unstaged elements...2
      Staging changes...
      100%
      1 features and 1 trees staged for commit
      0 features and 0 trees not staged for commit

   .. code-block:: console

      geogig commit -m "New Durham Ave bike lane added"

   ::

      100%
      [2845a74683954168a7c990cd103e22539bb2391c] New Durham Ave bike lane added
      Committed, counting objects...1 features added, 0 changed, 0 deleted.

#. Now let's look at our commit log.

   .. code-block:: console

      geogig log --oneline

   ::

      2845a74683954168a7c990cd103e22539bb2391c New Durham Ave bike lane added
      603d4bf0069203a42ac513f635f49f725c2a4f2a The Sellwood Gap has now been fixed
      cfdbd50c415a0d71b9a876eb51f90d5752e8f23b Initial commit of complete bikepdx layer

   Notice how it includes our most recent commit.

#. Now let's view the log on the master branch. To view the log for a different branch, user ``geogig log [branch]``:

   .. code-block:: console

      geogig log master

   ::

      603d4bf0069203a42ac513f635f49f725c2a4f2a The Sellwood Gap has now been fixed
      cfdbd50c415a0d71b9a876eb51f90d5752e8f23b Initial commit of complete bikepdx layer

   Notice how it is missing the most recent commit.

So if we were to switch over to the master branch, the commit will "not have happened." That said, until we do an export of this current state back to the shapefile, our data will not "know" that we have switched branches. This is yet another difference between GeoGig and other distributed version control systems like Git.

Merging branches
----------------

Development can continue on multiple branches simultaneously for any amount of time. Eventually, there will come a time when you will want to :term:`merge` a branch with another branch.

We will now merge the ``sandbox`` branch onto the ``master`` branch.

#. Merges are operated on the target, so that you should switch to the branch where the merge is going to end up, not where the merge is coming from. So if you haven't already, switch to the master branch.

   .. code-block:: console

      geogig checkout master

#. Type the following command:

   .. code-block:: console

      geogig merge sandbox

   .. note:: You can add a commit message by appending ``-m [message]`` just like a regular commit. If you omit this option, GeoGig will add a generic message for you.

   ::

      100%
      [2845a74683954168a7c990cd103e22539bb2391c] New Durham Ave bike lane added
      Committed, counting objects...1 features added, 0 changed, 0 deleted.

#. View the log on the master branch to verify that the commit transferred successfully.

   .. code-block:: console

      geogig log master --oneline

   ::

      2845a74683954168a7c990cd103e22539bb2391c New Durham Ave bike lane added
      603d4bf0069203a42ac513f635f49f725c2a4f2a The Sellwood Gap is now been fixed
      cfdbd50c415a0d71b9a876eb51f90d5752e8f23b Initial commit of complete bikepdx layer

#. You have now merged branches. The commits on the ``sandbox`` branch are now available on the ``master`` branch.

   .. todo:: Talk about rebasing?

#. The merge doesn't delete the branch. But since we are done with the branch, delete it now (with the ``-d`` option):

   .. code-block:: console

      geogig branch -d sandbox

   ::

      Deleted branch 'sandbox'.

#. To verify the branch is no longer there, run ``geogig branch -v``:

   ::

      * master 2845a74 New Durham Ave bike lane added
