Sharing local edits
===================

Alice
-----

We'll first assume the persona of Alice, our GIS analyst from before. Parrelleling our previous workflow, Alice has been tasked with reviewing recommended bike paths. For routes that are to be built, she will change the ``RECOMM`` to ``PLANNED`` and for routes which she decides are not to be built, she will delete the features from the map.

#. Since we stopped the server, we will need to refresh our list of repositories. Click :guilabel:`Repositories` to active the :guilabel:`Refresh` button and click it to refresh the list.

#. First we will make sure we are working on the **review** branch of Alice's repository. In the repository list click on Alice's repository, expand the **review** branch and click :menuselection:`Add to QGIS`. 

   .. figure:: img/gui_reviewadd.png

      Repository list showing the review branch


   We should see a new layer added to the :guilabel:`Layers Panel`, but we need to apply our style to it as we did earlier. To avoid confusion ensure only Alice's layer is present by removing any other **bikepdx** layers. 

   .. note:: Remember you can hover over a layer to see it's source.

#. Now edit the bikepdx layer and delete some of the recommended routes. When done save your edits and click the pencil icon to stop editing.

#. The plugin will take care of importing and adding steps to updated our layer in the repository. Right click the *bikepdx* layer, go to :menuselection:`GeoGig` and select :menuselection:`Sync layer with repository branch...`.

   .. figure:: img/gui_updaterepo.png

      Synchronize layer with a repository branch.

#. A dialog box will prompt you for the commit message. For branch select the **review** branch, and enter an appropriate message for your changes. This commit should appear right below *review* in our :guilabel:`Repository History`

   .. figure: img/gui_commitmsg.png

      Descriptive commit message

#. Edit some recommended routes in QGIS and change them to planned.

#. Update the **review** branch with this layer and enter your commit message.

#. Check the branches to see what the current state of each is. Our *review* branch should have our last two commits listed.

   .. figure:: img/gui_branchstatus.png

      Latest commits in Review branch

#. At this point, Alice has decided that her changes are ready for review and notifies the quality assurance manager

Bob
---

Bob has been tasked with updating the data set when bike route construction has been completed, changing the ``PLANNED`` status to ``ACTIVE``. He also is in charge of updating other attributes, such as setting the **yearbuilt** attribute or any others that change over time (including the geometry).

#. As with Alice, we will move to Bob's repository and make sure he is on his **updates** branch. In the repository list click on Bob's repository and expand the **updates** branch and click :menuselection:`Add to QGIS`.

   .. figure:: img/gui_bobbranch.png

      Bob on his **updates** branch.

#. Bob's version of the **bikepdx** layer will be added to the :guilabel:`Layers Panel`, it will not have any of Alice's changes. Add the style to this layer if you'd like.

#. Remove or hide Alice's *bikepdx* layer to ensure we are working on Bob's layer (you can hover over the layer to see it's source location).

#. Change some planned routes to active and set the current year for the **yearbuilt** attribute.

#. Update the repository with your changes, make sure to select the **updates** branch in the commit dialog.

#. Fix some incorrectly named paths.

#. Commit the changes to the **updates** branch with the message *"Fixed trail names."*

#. Check the branches to see what the current state of each is.

   .. figure:: img/gui_bobstatus.png

      Bob's recent commits 
   
#. Bob has also decided that his current tasks are complete and notifies the QA manager. 
