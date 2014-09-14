Updating branches
=================

In our current scenario, both Alice and Bob's edits have been accepted after passing through the quality assurance process and have been merged into **master**. What Alice and Bob don't know, however, are the changes that the other analyst made, and while it is good to work in isolation on a personal branch, an analyst will probably want to "sync" with **mater** occasionally to ensure that they are working on the latest version of the data.

Fortunately, GeoGig is smart enough to take care of all the hard work when merging from **master** (which has the most up-to-date version of the data) into a personal branch. Let's see how Alice and Bob can both get up to speed on eachother's changes before they start work again.

#. Move to the **master** branch in Alice's repository.

   .. code-block:: console

      geogig checkout master

#. Get the latest changes.

   .. code-block:: console

      geogig pull

#. Check the log; you should see that Alice's accepted and rejected proposals are now in **master**!

#. Finally, move to Alice's personal branch and merge in the changes.

   .. code-block:: console

      geogig checkout alice
      geogig merge master

#. Bob, in his repo, will do the same thing.

   .. code-block:: console
 
       geogig checkout master
       geogig pull
       geogig checkout bob
       geogig merge master
 
At the end, both Alice and Bob will be in sync with master again. In practice, Alice and Bob will probably not synchronise at the same time (they have different work schedules), but GeoGig is smart enough to keep their histories in line even when they are not working in parallel.
