Quality assurance
=================

Now it's time to review and approve the work that has been done by the analyst team and then merge those changes into the master branch.

#. Make sure you are in the data manager's repository.

   .. figure: img/qa_repo.png

      Selected **qa** repository

#. Although the server knows about Alice and Bob's changes, we won't until we download them from the server.

   .. figure:: img/qa_beforepull.png

      Alice and Bob's changes aren't in the **qa** repo.

#. Let's start with Bob's **updates** branch and get the changes. Right click the **updates** branch and :menuselection:`Make this branch the current branch`

#. Synchronize the **qa** repository, this will pull in the changes we pushed to **repo_gui** earlier.

   .. figure:: img/qa_updatespull.png

      Our changes to **updates** are now in **qa**

      
#. Review Bob's changes by right clicking and selecting :menuselection:`Show changes introduced by this version` This should be enough to tell if the changes are acceptable.

   .. figure:: img/qa_diff.png

      Difference between commits


#. In this instance, we're happy with Bob's work, so we'll go and review Alice's work. Switch to the **review** branch and synchronize with the remote repo.

   .. figure:: img/qa_reviewpull.png

      QA **review** branch after sync.

#. As we did with Bob, check what Alice has changed.
      
#. You want to be a little more careful about Alice's work since she has been approving and rejecting proposals. You can view the changetype of a feature in the attribute table in the :guilabel:`Comparison View`.
   
#. Let's assume we are also happy with Alice's work. We can now merge both Alice's and Bob's changes into **master**. Make **master** the current branch and right click the **updates** branch and :menuselection:`Merge this branch into the current one`. Do the same for the **review** branch.

   .. figure:: img/qa_merge.png

      Merging branches into 

#. If we check the history of **master**, we will see that GeoGig has automatically added a note about the merger of the **review** branch (which was the last we merged).

   .. figure:: img/qa_postmerge.png

      Master branch after the merge

#. Push the changes to the server.
