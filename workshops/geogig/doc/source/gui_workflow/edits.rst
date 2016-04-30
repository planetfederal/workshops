Sharing local edits
===================

Alice
-----

 Again we'll first assume the persona of Alice, our GIS analyst from before. Parrelleling our previous workflow, Alice has been tasked with reviewing recommended bike paths. For routes that are to be built, she will change the ``RECOMM`` to ``PLANNED`` and for routes which she decides are not to be built, she will delete the features from the map.

#. First we will move to Alice's repository and make sure she is on her personal branch. Right click the *review* branch and :menuselection:`Make this branch the current branch`

   .. figure:: img/gui_reviewbranch.png

      Repository history showing the review branch


   We should see that Alice is using the **review** branch, which is at the same position as **master**.

#. Our current branch should now be the **review** branch. This time instead of exporting the shapefile from the command line, all we have to do is click :guilabel:`Open repository in QGIS`. The plugin will export the file our repo's directory, and add the layer to our project.

   .. figure:: img/gui_openrepo.png

      Current branch and Open Repository button


#. Now edit the bikepdx layer and delete some of the recommended routes. When done save your edits and click the pencil icon to stop editing.

#. The plugin will take care of importing and adding our layer to the repository. Right click the *bikepdx* layer, go to :menuselection:`GeoGig` and select :menuselection:`Update repository with this version`.

   .. figure:: img/gui_updaterepo.png

      Update repository with this layer.

#. A dialog box will prompt you for the commit message. Enter an appropriate message for your changes. This commit should appear right below *review* in our :guilabel:`Repository History`

   .. figure: img/gui_commitmsg.png

      Descriptive commit message

#. Edit some recommended routes in QGIS and change them to planned.

#. Update the repository with this layer and enter your commit the commit message.

#. Check the branches to see what the current state of each is. Our *review* branch should have our last two commits listed.

   .. figure:: img/gui_branchstatus.png

      Latest commits in Review branch

#. At this point, Alice has decided that she wants to make her changes available to the data manager responsible the quality assurance. Right click the *alice* repo under our :guilabel:`Local Repositories` and open the Sync dialog. Click :guilabel:`Push` button to send our changes to our main repo.

   .. figure:: img/gui_push.png

      Confirmation of successful push.

#. Select the *repo_gui* repository and view the *review* branch in the :guilabel:`Repository History`. Alice's commits should be present.

Bob
---

Bob has been tasked with updating the data set when bike route construction has been completed, changing the ``PLANNED`` status to ``ACTIVE``. He also is in charge of updating other, such as setting the **yearbuilt** attribute or any others that change over time (including the geometry).

#. As with Alice, we will move to Bob's repository and make sure he is on his personal branch.

   .. figure:: img/gui_bobbranch.png

      Bob on his **updates** branch.

#. Open the **updates** repository in QGIS, notice that another *bikepdx* layer has been added to our project. If you hover over the layer you can see that the plugin has exported a new bikepdx.shp into Bob's repo directory. Add the style to this layer if you'd like.

#. Remove or uncheck Alice's *bikepdx* layer to ensure we are working on Bob's layer. Change some planned routes to active and set the current year for the **yearbuilt** attribute.

#. Update the repository with your changes.

#. Fix some incorrectly named paths.

#. Import, add and commit the changes with the message *"Fix path names."*

#. Check the branches to see what the current state of each is.

   .. figure:: img/gui_bobstatus.png

      Bob's recent commits 
   
#. Bob has also decided that his current tasks are complete and wants to share his work with his supervisor. He opens the Sync dialog, and uses the :guilabel:`Sync: Pull and Push` button. 

   .. figure:: img/gui_syncbutton.png

      Sync button

   Sync pushed our changes and pulled in any changes from our remote. Bob's **master** branch is unchanged since QA has not yet merged Bob and Alice's changes.
