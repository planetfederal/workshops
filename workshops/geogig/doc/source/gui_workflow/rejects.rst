Rejecting edits
===============

So far we've been happy with Alice and Bob's work, but this isn't always going to be the case! In the next scenario, we will focus on strategies for dealing with these kind of situations.

The data manager has three approaches:

* Fix the problem locally before merging into **master**
* Revert the bad commit
* Ask the analyst to fix the problem

Fix it yourself
---------------

.. todo:: should we have the users make the changes and then resolve them? good way to "test/review" what they've learned and eat up some time

This is most likely to be the fastest option for simple mistakes. Say Alice accidentally changed the **status** from recommended to active instead of planned. During QA, the data manager notices the problem:

   .. figure:: img/badcommit.png

        QA see's status has been set incorrectly

The easiest solution is to edit the data and add a new commit that changes ``ACTIVE`` to ``PLANNED`` as it should have been. The GeoGig log file will look something like this:

   .. figure:: img/commitfix.png

        The commmit fixing Alice's bad commit.

Now that the data manager is happy that the commits are correct, he can merge the changes into **master**. However, there is one further thing that must be done: we must notify the server that we have changed Alice's branch by synchronizing.

    .. figure:: img/synced_fix.png

        The fix pushed to the remote repository.

The next time Alice checks the server for updates, she'll get the data manager's changes in her local repository.

Throw out a bad commit
----------------------

If QA determines that a commit is bad enough that it needs to be tossed completely, we can use GeoGig's ``revert`` command to create a new commit that backs out of the original changes. For example, Bob mistakenly commits a trail he was using for testing. When the data manager realises the mistake, he decides that the entire commit must be reversed since it has changed good data into bad data.

For example, let's assume that this is shown in the change comparison:

   .. figure:: img/bob_badcommit.png

      Bob set the year built incorrectly.

The data manager notices this is not a real trail and decides to revert this change immediately to keep the data clean.

   .. figure:: img/bob_revert.png

      Choosing the commit to revert.

The new commit will automatically be created with a proper message. If this was in the data manager's repository they could now merge the work from Bob's branch into **master** and push the changes server.

  .. figure:: img/bob_history.png

      Repository history showing the revert commit.

Reassign to the analyst
-----------------------

If the changes required are more invasive than the examples above, such as multiple geometry changes. The data manager would reassign the work back to the analyst and wait for some further updates to the branch. In this case, the analyst will simply continue working on his or her branch and will issue a ``geogig push`` command again when he or she is satisfied that the problems have been corrected.

The data manager can then perform a ``geogig pull`` command as usual to verify the work.
