Quality assurance
=================

It is now your job to review and approve the work that has been done by the analyst team and then merge those changes into the master branch.

#. Make sure you are in the data manager's repository.

   .. code-block:: console

      cd qa

#. Although the server knows about Alice and Bob's changes, we won't until we download them from the server.

   .. code-block:: console

      geogig pull

   ::

       Request sent. Waiting for response...
       Processing response...
       Processed 3 objects.
       Inserted: 3.
       Existing: 0.
       Time to process: 8.070 ms.
       Compressed size: 19,601 bytes.
       Uncompressed size: 34,548 bytes.
       From http://localhost:8182
          ba63233..ba63233     alice -> refs/remotes/origin/alice
          ba63233..1a3b19a     bob   -> refs/remotes/origin/bob
          master already up to date.

   The response tells us that the **alice** and **bob** branches have both seen updates, so we know that we have work to do on both of these!

#. Let's start with Bob's branch and get the changes.
 
   .. code-block:: console

      geogig checkout bob
      geogig pull

#. Check what Bob has changed.

   .. code-block:: console

      geogig diff master bob
      
   This should be enough to tell if the changes are acceptable since Bob hasn't changed any geometries.

#. In this instance, we're happy with Bob's work, so we'll go and review Alice's work.

   .. code-block:: console

      geogig checkout alice
      geogig pull

#. Check what Alice has changed.

   .. code-block:: console

      geogig diff master alice
      
#. You want to be a little more careful about Alice's work since she has been approving and rejecting proposals. The best way to review is to look at what has changed between **master** and Alice's branch. GeoGig has the ability to export only the changes between two points in time so we can view them in QGIS or another tool.

   .. code-block:: console

      geogig shp export-diff alice master bikepdx diff.shp

#. Open ``diff.shp`` in QGIS and review the removed and changed routes.
   
#. Let's assume we are also happy with Alice's work. We can now merge both Alice's and Bob's changes into **master**.

   .. code-block:: console

      geogig checkout master
      geogig merge bob
      geogig merge alice

   .. note:: It doesn't matter that we merged Bob's changes before Alice's, even though Alice's came first in time. If Alice and Bob both changed the same feature, then we have to chose which of the two changes we want to keep.

#. If we check the log, we will see that GeoGig has automatically added a note about the merger of the **alice** branch (which was the last we merged).

   .. code-block:: console

      geogig log --oneline -n 1

   ::

      0a7f572c325916e28631356208b3c1be2eb117ee Merge branch refs/heads/alice

#. Push the changes to the server.

   .. code-block:: console

      geogig push
