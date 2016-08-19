Sharing local edits
===================

Alice
-----

Let's first assume the persona of Alice, our first GIS analyst. Let's say that Alice has been tasked with reviewing recommended bike paths and determining whether they should be built or not. For routes that are to be built, she will change the ``RECOMM`` to ``PLANNED`` and for routes which she decides are not to be built, she will delete the features from the map.

#. First we will move to Alice's repository and make sure she is on her personal "review" branch.

   .. code-block:: console

      cd alice
      geogig checkout review
      geogig branch -v

   We should see that Alice is using the **review** branch, which is at the same position as **master**.

#. Export the **review** branch to a new shapefile so we can edit the data in QGIS.

   .. code-block:: console

      geogig shp export -o bikepdx bikepdx.shp

#. Open the new file and delete some of the recommended routes in QGIS.

#. Import, add and commit the data to the repository.

   .. code-block:: console

      geogig shp import --fid-attrib ID bikepdx.shp
      geogig add bikepdx
      geogig commit -m "Rejected proposals."

#. Edit some recommended routes in QGIS and change them to planned.

#. Import, add and commit the data to the repository.

   .. code-block:: console

      geogig shp import --fid-attrib ID bikepdx.shp
      geogig add bikepdx
      geogig commit -m "Accepted proposals."

#. Check the branches to see what the current state of each is.

   .. code-block:: console

      geogig branch -v

   ::

        master  cf894ee Added loop around Powell Butte
      * review  ba63233 Accepted proposals.
        updates cf894ee Added loop around Powell Butte

#. At this point, Alice has decided that she wants to make her changes available to the data manager responsible the quality assurance.

   .. code-block:: console

      geogig push

   When this command has run, the server will have received the changes.

Bob
---

Bob has been tasked with updating the data set when bike route construction has been completed, changing the ``PLANNED`` status to ``ACTIVE``. He also is in charge of updating other, such as setting the **yearbuilt** attribute or any others that change over time (including the geometry).

#. As with Alice, we will move to Bob's repository and make sure he is on his personal "updates" branch.

   .. code-block:: console

      cd bob
      geogig checkout updates
      geogig branch -v

#. Export the **bob** branch so we can edit the data in QGIS.

   .. code-block:: console

      geogig shp export -o bikepdx bikepdx.shp

#. Change some planned routes to active and set the current year for the **yearbuilt** attribute.

#. Import, add and commit the changes.

   .. code-block:: console

      geogig shp import --fid-attrib ID bikepdx.shp
      geogig add bikepdx
      geogig commit -m "Update newly-activated paths"

#. Fix some incorrectly named paths.

#. Import, add and commit the changes with the message *"Fix path names."*

#. Check the branches to see what the current state of each is.

   .. code-block:: console

      geogig branch -v

   ::
   
        master  cf894ee Added loop around Powell Butte
        review  cf894ee Added loop around Powell Butte
      * updates 1a3b19a Fix path names.

   .. note:: Alice's branch is still the same as **master** even though we know she has made some changes! This is because Bob hasn't checked the server to see if there are any new updates.

#. Bob has also decided that his current tasks are complete and wants to share his work with his supervisor.

   .. code-block:: console

      geogig push
