.. _cmd.branch:

Working with branches
=====================

We have so far been working on a single branch, the "master" branch. A branch is a single linear timeline of events, which in many cases can be sufficient, but not always.

In this section we will create a new branch and add commits to both the master branch and the new branch. We will then merge the branches back to a single path.

Create a new branch
-------------------

A new branch shares the same timline and history as its parent does, up until the point at which the branch was crated at which point the history diverges. Commits that happen on one branch are isolated from the other.

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

      * master 0000000

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

   All commits created now will be placed on that branch, until or unless we switch back to the master branch.

Making a commit on a branch
---------------------------

Now that we are working on a new branch, there should be nothing different about our workflow: we make changes to our data and commit as necessary. The only differences happen when we want to merge with the master (or any other) branch.

#. Add a new feature (bike lane) to the layer. Refer to the previous section on :ref:`cmd.commit` for instructions if necessary.

#. Commit this new feature using the steps outlined in the previous section. Use the commit message "new bike lane [name]", when [name] is the name of the lane as given in the attribute.

#. Now let's look at our commit log.

   .. code-block:: console

      geogig log

   Notice how it includes our most recent commit.

#. Now let's view the log on the master branch:

   .. code-block:: console

      geogig log master

   Notice how it is missing the most recent commit.

#. If we switch over to the master branch, the commit will not have happened.

   .. todo:: Is this true?

   That said, until we do an export of this current state back to PostGIS, our data will not "know" that we have switched branches. This is yet another difference between GeoGig and other distributed version control systems like Git.

#. Let's see how this works. Switch back to the main branch:

   .. code-block:: console

      geogig checkout master

#. Now export the current state of the repo back to PostGIS.

   .. todo:: Unsure of any of this.

#. You will see that the feature that was created on the ``sandbox`` branch is no longer there. 

Merging branches
----------------

Development can continue on multiple branches separately for any amount of time. Eventually, a branch, especially if it is a "feature branch" (that is, a feature worked on independently from the rest of development) will want to be merged with the main branch.

.. todo:: Many ways to do merges. Talk about rebasing?

.. todo:: Say more about where the commits occur in the timeline

We are already on the master branch. Merges are operated on the target, so that you should switch to the branch where the merge is going to end up, not where the merge is coming from.

#. Type the following command:

   .. code-block:: console

      geogig merge sandbox

   .. note:: You can add a commit message by appending ``-m [message]`` just like a regular commit.

   .. todo:: Need to know if merging deletes the branch or not.

#. View the log on the master branch to verify that the commit transferred successfully.

   .. code-block:: console

      geogig log

#. Export the changes back to PostGIS so that we visualize them in QGIS.
