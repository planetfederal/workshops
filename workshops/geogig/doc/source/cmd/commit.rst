.. _cmd.commit:

Working with commits
====================

With setup complete, we can now perform the basic task of a versioned repository: a commit.

.. todo:: Mention logs / troubleshooting.

Initial commit
--------------

We can now import data into our repository and make our first commit (snapshot). This will be the baseline from which we will work:

#. From the :file:`repo` directory created in the previous section, import the data from the database into the repository:

   .. code-block:: console

      geogig pg import --database geogig -t bikepdx --host localhost --port 5432 --user postgres

   ::

      Importing from database geogig

      Importing bikepdx          (1/1)...
      93%
      6760 distinct features inserted in 6.243 s

      Building final tree...

      6772 features tree built in 1.206 s
      100%
      Import successful.

#. The data from the PostGIS table will be imported into GeoGig, ready for versioning. Verify this:

   .. code-block:: console

      geogig status

   ::

      # On branch master
      # Changes not staged for commit:
      #   (use "geogit add <path/to/fid>..." to update what will be committed
      #   (use "geogit checkout -- <path/to/fid>..." to discard changes in working directory
      #
      #      added  bikepdx
      #      added  bikepdx/6526
      #      added  bikepdx/6527
      #      added  bikepdx/6524
      #      added  bikepdx/6525
      ...
      # 6773 total.

   On most terminals, the features that have been added are colored red.

Now that our repository is aware of our spatial data, we can add all the features to the repository so that we can commit them all.

#. Add all features to the repository:

   .. code-block:: console

      geogig add bikepdx

   ::

      Counting unstaged elements...6773
      Staging changes...
      100%
      6772 features and 1 trees staged for commit
      0 features and 0 trees not staged for commit

#. Run ``geogig status`` to see how the output has changed

   ::

      # On branch master
      # Changes to be committed:
      #   (use "geogit reset HEAD <path/to/fid>..." to unstage)
      #
      #      added  bikepdx
      #      added  bikepdx/6526
      #      added  bikepdx/6527
      #      added  bikepdx/6524
      #      added  bikepdx/6525
      #      added  bikepdx/6522
      #      added  bikepdx/6523
      #      added  bikepdx/6520
      #      added  bikepdx/6521
      ...
      # 6773 total.

   On most terminals, the features that have been added are colored green.

Now we are ready to make our first commit! A commit will include anything that's been added It requires only a message to describe the commit. This is a useful text string as the history for a project grows, so it important to make the message clear.

For example, the following commit messages are good, as they are a clear indication of what the commit entails:

* "Added new attribute field OWNER"
* "Removed Main St. feature"
* "Renamed First Ave to First Avenue"

On the other hand, the following commit messages are not-so-good:

* "Made changes"
* "Added stuff"

#. Commit our changes. Use the message "Initial commit of complete data layer" via the ``-m`` option:

   .. code-block:: console

      geogig commit -m "Initial commit of complete data layer"

   ::

      100%
      [3c52000828bbcaf7ec706dc98b336437cd53f51b] Initial commit of complete data layer
      Committed, counting objects...6772 features added, 0 changed, 0 deleted.

We have made our first commit!

Making an attribute change
--------------------------

Now it's time to do some editing.

There are gaps in the bicycling system in Portland. One of the most famous is the "Sellwood Gap", a one-mile long break in the Springwater Corridor, which is a 20 mile long rail-trail that stretches from the Willamette River to the very edge of the metropolitan area.

Zoom in to this area. To find the Sellwood Gap, find the multi-use trail (styled in drak green) that parallels the river on the east side. Follow it south to the point where it curves away from the river, and you will see that a section of it becomes dashed (so not an active path).

.. todo:: Figure

Let's say that all parties have gotten together and agreed to build this missing section of trail. At this point, you, in charge of updating the city's GIS data, would change that feature to an active section.

Specifically, this would involve us making a single change: the attribute ``status`` for that feature should be changed from ``RECOMM`` to ``ACTIVE``.

#. In QGIS, zoom to the area that contains this feature.

#. Select :menuselection:`Layer --> Open Attribute Table` to see the attributes.

#. Click the pencil icon on the top left to :guilabel:`Toggle Editing`.

#. Scroll down to the feature in question. The ``gid`` for this feature is ``6703``. You may wish to click on the ``gid`` column to sort numerically if it is not already.

#. Double-click in the value of the ``status`` column. Change the value to :kbd:`ACTIVE` and press :kbd:`Enter`.

#. Click the pencil icon again to save changes.

We have made a very small change to our dataset and the map view changes accordingly. Now we will want to commit this change.

The process for adding a change to GeoGig is **Import, Add, Commit**. We will perform all of those steps now.

#. On a terminal in the repository, type the following command:

   .. code-block:: console

      geogig pg import --database geogig -t bikepdx --host localhost --port 5432 --user postgres

   This is the same import command as above. It makes the GeoGig repository aware that content has changed.

   ::

      Importing from database geogig

      Importing bikepdx          (1/1)...
      87%
      6760 distinct features inserted in 4.697 s

      Building final tree...

      6772 features tree built in 709.9 ms
      100%
      Import successful.

   .. todo:: Mention the inefficiency of this step? (Mitigated by the plugin?) Or mention later?

#. Now add the changes. If you want to add everything, type:

   .. code-block:: console

      geogig add bikepdx

   ::

      Counting unstaged elements...2
      Staging changes...
      50%
      1 features and 1 trees staged for commit
      0 features and 0 trees not staged for commit

   .. todo:: But if you want to add a specific feature, type...

#. Notice that the output says that only a single feeature is staged for commit. This makes sense; even though we have imported the entire table, GeoGig processes the import against the existing repository, and will only highlight the features that have changed.

#. Run ``geogig status`` to see this single feature:

   ::

      # On branch master
      # Changes to be committed:
      #   (use "geogit reset HEAD <path/to/fid>..." to unstage)
      #
      #      modified  bikepdx/6703
      # 2 total.

   .. todo:: Why 2 total?

#. Finally, we are ready to commit this change:

   .. code-block:: console

      geogig commit -m "The Sellwood Gap is now open"

   ::

      100%
      [576af055303bccba2c0f7257bc92d3edcd10322e] The Sellwood Gap is now open
      Committed, counting objects...0 features added, 1 changed, 0 deleted.

#. Your change has been made.

Making a geometry change
------------------------

The city's bicycle plan is still incomplete. Luckily, you get to play master planner, and see if you can fix some of the other gaps left behind by the system as it stands today.

Specifically, your next task is to add a new bike lane. You can draw it anywhere you want.

#. Select :menuselection:`Layer --> Toggle Editing` to start the editing process.

#. On the :guilabel:`Digitizing` toolbar, click the button for :guilabel:`Add feature`. (Select :menuselection:`View --> Toolbars --> Digitizing` if this toolbar isn't visible.)

#. Click on the map to start the feature creation. Click to create each feature vertex.

#. Right-click when done. An attribute table dialog will display. Enter the following information, leaving all other fields as the default:

   * ``gid``: ``6773``
   * ``segmentnam``: [street name, if known]
   * ``status``: ``RECOMM``
   * ``facility``: ``LANE``
   * ``facilityde``: ``Bike Lane``

#. Click :guilabel:`OK` when done.

#. Select :menuselection:`Layer --> Toggle Editing` to stop the editing process. Click :guilabel:`Save` when prompted.

With your new feature added, we can now add the feature to our repository via another commit.

#. On a terminal in the repository, type the following command:

   .. code-block:: console

      geogig pg import --database geogig -t bikepdx --host localhost --port 5432 --user postgres

   Once again, this import command lets GeoGig be aware that content has changed.

   ::

      Importing from database geogig

      Importing bikepdx          (1/1)...
      0%
      2 distinct features inserted in 3.260 s

      Building final tree...

      6773 features tree built in 285.1 ms
      100%
      Import successful.

#. Now add the changes:

   .. code-block:: console

      geogig add bikepdx

   ::

      Counting unstaged elements...2
      Staging changes...
      50%
      1 features and 1 trees staged for commit
      0 features and 0 trees not staged for commit

#. Finally, we are ready to commit this change:

   .. code-block:: console

      geogig commit -m "New [name] bikeway added"

   ::

      100%
      [c94fd44319a9307dce56a49bc47e3ca415278902] New 1024 St bikeway added
      Committed, counting objects...1 features added, 0 changed, 0 deleted.

#. Your change has been made.
 
Rolling back a change
---------------------

Perhaps adding in that new bikelane was a bit premature. Let's remove it.

Now, we could remove it in one of two ways:

* Remove the feature and make a new commit showing the removal. This would preserve the history of both commits.
* Roll back to the previous commit. This would eliminate the commit from the timeline, as if it never happened.

.. note:: This process is only for removing the most recent commit(s). It is not trivial to remove a commit in between other commits that you wish to keep.

We will opt for the second option here: to roll back.

First, let's look at the :term:`log`. This is the list of commits that we have supplied so far.

#. In a terminal, type the following command:

   .. code-block:: console

      geogig log

   This will show the list of commits.

   ::

      Commit:  c94fd44319a9307dce56a49bc47e3ca41527890
      Author:  Author <author@example.com>
      Date:    (1 minutes ago) 2014-08-01 17:39:15 -06
      Subject: New 1024 St bikeway added

      Commit:  576af055303bccba2c0f7257bc92d3edcd10322
      Author:  Author <author@example.com>
      Date:    (19 minutes ago) 2014-08-01 17:21:23 -0
      Subject: The Sellwood Gap is now open

      Commit:  3c52000828bbcaf7ec706dc98b336437cd53f51
      Author:  Author <author@example.com>
      Date:    (29 minutes ago) 2014-08-01 17:10:30 -0
      Subject: Initial commit of complete data layer

#. If the full list is too much information, you can reduce the amount of information to one line:
   
   .. code-block:: console

      geogig log --oneline

   ::

      c94fd44319a9307dce56a49bc47e3ca415278902 New 1024 St bikeway added
      576af055303bccba2c0f7257bc92d3edcd10322e The Sellwood Gap is now open
      3c52000828bbcaf7ec706dc98b336437cd53f51b Initial commit of complete data layer

   .. note:: There are lots of ways to filter this list, including by date and by author. Type ``geogig help log`` for a full list of options.

.. todo:: Discuss commit IDs

.. todo:: Perform the actual rollback

With that, the commit has been removed from the history, and we are back to only two commits.

