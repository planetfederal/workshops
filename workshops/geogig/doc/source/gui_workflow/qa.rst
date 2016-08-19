Quality assurance
=================

Now it's time to review and approve the work that has been done by the analyst team and then merge those changes into the master branch. For the purposes of this section we'll pretend we can't see the

#. Open a new terminal, so we can leave the GeoGig server running. We will be using the ``qa_repos`` directory to review and merge the anaylsts changes.

   .. code-block:: console

      cd ~/geogig/qa_repos

#. Although the server knows about Alice and Bob's changes, we won't until we download them from the server. Let's start by using the clone command to retrieve their repositories to see the changes.

   .. code-block:: console

      geogig clone http://localhost:8182/repos/bob bob
      geogig clone http://localhost:8182/repos/alice alice

#. To view the changes in QGIS we will add the ``sample_repo`` repository as a remote to the **bob** and **alice**. This will allow us to synchronize the repositories. We'll start with Alice's repository:

   .. code-block:: console

      cd alice
      geogig remote add upstream http://localhost:8182/repos/sample_repo
      geogig checkout review
      geogig push upstream

#. We'll do the same for Bob's repository:

   .. code-block:: console

      cd ../bob
      geogig remote add upstream http://localhost:8182/repos/sample_repo
      geogig checkout updates
      geogig push upstream

#. Now back in QGIS we can view Bob and Alice's changes in the ``sample_repo`` repository.

   .. figure:: img/qa_branches.png

      The main repository

#. Review Bob's changes by selecting the ``sample_repo`` repository, and expand the **updates** branch by left clicking it in the :guilabel:`Repository History`. right clicking and selecting :menuselection:`Show changes introduced by this version` This should be enough to tell if the changes are acceptable.

   .. figure:: img/qa_diff.png

      Difference between commits

#. In this instance, we're happy with Bob's work, so we'll merge his changes into the **master** branch. Right-click the **updates** branch and :guilabel:`Merge this branch into` and select the **master** branch.

   .. figure:: img/qa_bobmerge.png
   
      Merging the **updates** branch into the **master** branch.

#. Once the merge is complete, you can check the **master** branch and see that the Bob's changes are now applied in the **master** branch.

   .. figure:: img/qa_mergemsg.png
   
      QGIS message declaring successful merge.

#. Now we'll review Alice's work. Expand the **review** branch to see the changes Alice made. Let's see what Alice removed, right click the commit  that removed routes and select :menuselection:`Show changes introduced by this version`

   .. figure:: img/qa_diff2.png

      Changes caused by the removal commit.

#. Let's assume we are also happy with Alice's work. We can now merge Alice's changes into the **master** branch as we did for Bob. Right-click the **review** branch and :guilabel:`Merge this branch into` the **master** branch.

   .. figure:: img/qa_alicemerge.png
   
      Merging the **review** branch into the **master** branch

#. In QGIS we can check the history of **master**, we will see that GeoGig has automatically added a note about the merger of our branch.

   .. figure:: img/qa_postmerge.png

      Master branch after the merge
