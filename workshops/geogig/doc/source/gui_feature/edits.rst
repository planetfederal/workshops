Sharing local edits
===================

Betty
-----

We'll assume the persona of Betty, our GIS analyst tasked with digitizing a newly surveyed route. Betty will be adding new data to our *bikepdx* layer, and modifying some of the existing routes.

#. First we will move to Betty's repository and make sure she is on her **working** branch. Right click the *working* branch and :menuselection:`Make this branch the current branch`

#. Our current branch should now be the **working** branch. This time instead of exporting the shapefile from the command line, all we have to do is click :guilabel:`Open repository in QGIS`. The plugin will export the file to our repository directory, and add the layer to our project.

   .. figure:: img/new_openrepo.png
      :figwidth: 50 %

      Current branch and Open Repository button

#. Before we begin adding the new trail. We'll add a tag to the most recent commit in the **working** branch, so we can easily tell what commit we started at. Right click the most recent commit in the **working** branch, and select :menuselection:`Create new tag at this version` 

   .. figure:: img/new_tag.png

      Create new tag menu option

#. A dialog box will prompt you for a name for the tag. This name can be a number or text, in this case the name is set to **original**. In reality you may want to call it version 1.0, or you may have branched from a tag that already existed in the **authoritative** repository.

   .. figure:: img/new_tagged.png

      Base commit tagged as "original"

#. Now we'll begin creating a new trail, as if we were digitizing it. Create a new trail near Powell Butte Nature Park. When your done toggle editting and save your changes. 

   .. figure:: img/new_butte.png
      :figwidth: 50 %

      New trail around Powell Butte

#. Let's assume it's the end of the day, so Betty updates the repository with the new trail.

   .. figure:: img/gui_updaterepo.png

        Update repository with this layer.

#. To be safe she also synchronizes with the remote server, so her work is not lost should something happen to her computer. Right click the **betty** repository and push or sync to send the updates to the server. 

   .. figure:: img/gui_opensync.png

      Synchronizing with the server

#. Resuming work the next day, Betty synchronizes her **master** branch with the server to see if there are any new changes that concern her. Nothing has changed so she resumes her work on the **working** branch, digitizing the new trail. Extend the new trail to the South-East, this time we'll make several edits before committing them.

#. Once a few edits have been made, update the repository with the layer and enter a fitting commit message.

   .. figure:: img/new_commitmsg.png
      :figwidth: 50 %

      Commit describing new feature additions.

#. Our *working* branch should only have two commits listed after the tag. Right click and :menuselection:`View changes introduced by this version` on the most recent commit to confirm it contains the edits we just made.

   .. figure:: img/new_edits.png
      :figwidth: 50 %
      :align: center

      Commit comparison showing the addition of two new features

#. Go back to editting the layer, and add a new segment of trail. This time we'll pretend the status was set incorrectly and fix it later. Set the *status* to ACTIVE and commit the change. 

   .. figure:: img/new_badattrib.png
      :figwidth: 50 %

      New segment with *status* set to ACTVE

#. Let's create another mistake to fix later, add another segment of trail that crosses a river, ridge, or road, and commit the change. 

   .. figure:: img/new_badgeom.png
      :figwidth: 50 %

      Trail with bad geometry, crossing a river where it shouldn't.

#. Let's assume Betty now realizes she has made a couple mistakes and decides to fix them before going any further. As mentioned in previous workflows we can fix our commits by reverting the change, or by adding a new commit that fixes the problem. First we'll revert the commit with the bad geometry, right click the layer underneath our last commit and select :menuselection:`Revert current branch to this version`. 

   .. figure:: img/new_revert.png
      :figwidth: 50 %

      Revert to previous version

   This will create a new commit, undoing the most recent commit. Your view should refresh and the incorrect trail should be gone.

#. Next fix the incorrect attribute by adding a new commit. Enter editting mode and select the the feature we made ACTIVE, change it to PLANNED. Toggle editting mode, save, and update the repository with the correction. 

   .. figure:: img/new_fixedattrib.png
      :figwidth: 50 %

      Commit history showing the fixes.
   
   .. note:: If you get the message "No updates detected.. ", you will need to remove the **bikepdx** layer, add it again with the :menuselection:`Open repository in QGIS`, and redo the fix.

#. With her fixes committed to her **working** branch, Betty continues adding new trails to the repository. Add several more trails, committing each one as you go. If you make any mistakes, fix them with one of the methods above.

   .. figure:: img/new_trail.png
      :figwidth: 50 %

      Completed addition of new trail

#. At this point, Betty has finished digitizing the new trail, after reviewing the changes introduced :menuselection:`View changes introduced by this version` she decides to push the **working** branch to the server for later review and publishing. 

   .. figure:: img/gui_push.png
      :figwidth: 50 %

      Confirmation of successful push.

#. Select the **repo_gui** repository and view the **working** branch in the :guilabel:`Repository History`, Betty's commits should be present. Now the data manager could synchronize with the **qa** and **repo_gui** repositories to review Betty's work, as was shown in the previous workflow. Or the **working** branch could be pushed to a public repository to collect public feedback. Later the work could be reviewed and merged into the **master** branch of our authoritative repository, **repo_gui**.

   .. figure:: img/new_updatemain.png
      :figwidth: 50 %
