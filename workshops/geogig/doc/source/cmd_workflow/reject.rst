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

This is most likely to be the fastest option for simple mistakes. Say Alice accidentally changed the **status** from recommended to active instead of planned. During QA, the data manager notices the problem::

  a45f1c... a45f1c... 8ed023... 5b32c6...   M  bikepdx/188
  status: RECOMM -> ACTIVE

The easiest solution is to edit the data and add a new commit that changes ``ACTIVE`` to ``PLANNED`` as it should have been. The GeoGig log file will look something like this::

 Commit:  490c775ab4dfb1fd27a6722e3a24a7043fd96b14
 Author:  Benjamin Trigona-Harany <bosth@boundlessgeo.com>
 Date:    (1 hours ago) 2014-02-06 16:05:12 -0600
 Subject: Fixing status of path 188.

 Commit:  78b4d361171cd97989ad4dcc8565ab6da7d705a9
 Author:  Alice <alice@portland.gov>
 Date:    (1 day ago) 2014-02-05 12:31:35 -0600
 Subject: Accepting proposal for path 188.

Now that the data manager is happy that the commits are correct, he can merge the changes into **master**. However, there is one further thing that must be done: we must notify the server that we have changed Alice's branch.

.. code-block:: console

   geogig checkout master
   geogig merge alice
   geogig push

The next time Alice checks the server for updates, she'll get the data manager's changes in her local repository.

Throw out a bad commit
----------------------

If QA determines that a commit is bad enough that it needs to be tossed completely, we can use GeoGig's ``revert`` command to create a new commit that backs out of the original changes. For example, Bob mistakenly thinks that the year a particular path was built was wrong, so he changes the date and submits the changes for approval. When the data manager realises the mistake, he decides that the entire commit must be reversed since it has changed good data into bad data.

For example, let's assume that this is the current log::

  58b309150ca10b6de004b3ab9eac45bb4f73e45d Change name from Fernwood Street to Fernwood Road.
  c5ba997cecc9730ec814bdb53a79289fbc3a9aa2 Change Galloping Goose built year to 2000.
  9360ce3084bd899238c9bbd8c8873a3f4ae9bc5d Change route from Cedar Hill to McKenzie Avenue.

While reviewing commit ``c5ba99``, the data manager notices that Bob set the date to 2000.

.. code-block:: console

   geogig diff 9360ce c5ba99

::

   a45f1c... a45f1c... 8b1fec... 1ce613...   M  bikepdx/205
   builtyear: 1987 -> 2000

The data manager decides to revert this change immediately instead of editing the data and manually creating a new commit.

.. code-block:: console

   geogig revert c5ba99
   geogig log --oneline

::

  ba63233cff3e6a56a777973d5a85fb2160e461f0 Revert 'Change Galloping Goose built year to 2000.'
  58b309150ca10b6de004b3ab9eac45bb4f73e45d Change name from Fernwood Street to Fernwood Road.
  c5ba997cecc9730ec814bdb53a79289fbc3a9aa2 Change Galloping Goose built year to 2000.
  9360ce3084bd899238c9bbd8c8873a3f4ae9bc5d Change route from Cedar Hill to McKenzie Avenue.

The new commit will automatically be created with a proper message. Once again, the data manager can now merge the work from Bob's branch into **master** *and* push the changes to **bob**'s branch back to the server.

Reassign to the analyst
-----------------------

If the changes required are more invasive than the examples above, the data manager will likely reassign the work back to the analyst and wait for some further updates to the branch. In this case, the analyst will simply continue working on his or her branch and will issue a ``geogig push`` command again when he or she is satisfied that the problems have been corrected.

The data manager can then perform a ``geogig pull`` command as usual.
