Updating branches
=================

As in the previous workflow, both Alice and Bob's edits have been accepted after passing through the quality assurance process and have been merged into **master**. Alice and Bob stilll don't know the changes that the other analyst has made. Our analysts will now "sync" with **master** and ensure they are using the lastest version of the data.

#. Move to the **master** branch in Alice's repository.

   .. figure:: img/bu_preAmerge.png

      Alice's **master** branch before the sync.

#. Get the latest changes, the master branch will now contain Alice's accepted and rejected proposals.

   .. figure:: img/bu_postAmerge.png

      Alice's **master** branch after the sync.

#. Finally, move to Alice's personal branch and merge in the changes.

   .. figure:: img/bu_reviewmerge.png

      Alice's updated **review** branch

#. Bob, in his repo, will do the same thing.

    .. figure:: img/bu_updatesmerge.png

        Bob's updated **updates** branch
 
Now both Alice and Bob will are in sync with the **master** branch again. In practice, Alice and Bob will probably not synchronise at the same time (they have different work schedules), but GeoGig is smart enough to keep their histories in line even when they are not working in parallel.
