.. _cmd.commits:

Working with commits
====================

Initial commit
--------------

With our repository created, we can now import data into it and make our first commit (snapshot). This will be the baseline from which we will work:

#. Import the data from the database into the repository:

   .. code-block:: console

      geogig pg import --database bikenetwork -t bikenetwork --host localhost --port 8080 --user postgres --password

   .. todo:: Verify this.

#. The data from the PostGIS table will be imported into GeoGig, ready for versioning. Verify this:

   .. code-block:: console

      geogig status

   .. todo:: What will this show?

Now that our repository is aware of our spatial data, we can add all the features to the repository so that we can commit them all.

.. todo:: Talk about a situation where you wouldn't want to import everything?

#. Add all features to the repository:

   .. code-block:: console

      geogig add .

   The ``.`` is a wildcard that states that everything should be added to the repository

#. Run ``geogig status`` to see how the output has changed

   .. todo:: How has it changed?

Now we are ready to make our first commit! A commit will include anything that's been "added." It requires only a message to describe the commit. This is a useful text string as the history for a project grows, so it important to make the message clear.

For example, the following commit messages are good, as they are a clear indication of what the commit entails:

* "Added new attribute field OWNER"
* "Removed Main St. feature"
* "Renamed First Ave to First Avenue"

On the other hand, the following commit messages are not-so-good:

* "Made changes"
* "Added stuff"

#. Commit our changes. Use the message "Initial commit of data"

   .. code-block:: console

      geogig commit -m "Initial commit of data"

#. We have made our first commit!

Making an attribute change
--------------------------

We are all set up now, so now it's time to do some work!

There are gaps in the bicycling system in Portland. One of the most famous is the "Sellwood Gap" , a one-mile long break in the Springwater Corridor, a 20 mile long rail-trail that stretches from the Willamette River to the very edge of the metropolitan area.

Zoom in to this area. To find the Sellwood Gap, find the multi-use trail that parallels the river on the east side. Follow it south to the point where it curves away from the river.

.. todo:: Figure

Let's say that all the parties have gotten together and agreed to build this missing section of trail. At this point, you, in charge of updating the city's GIS data, would change that feature to an active section.

Specifically, the attribute is called ``STATUS``, and we will want to change the value of that feature to be ``ACTIVE``.

#. In QGIS, zoom to the area that contains this feature.

#. Select :menuselection:`Layer --> Open Attribute Table` to see the attributes.

#. Click the pencil icon on the top left to :guilabel:`Toggle Editing`.

#. Scroll down to the feature in question. The ``OBJECTID`` for this feature is ``6703``. You may wish to click on the ``OBJECTID`` column to sort in numerically.

#. Double-click in the value of the ``STATUS`` column. Change the value to :kbd:`ACTIVE` and press :kbd:`Enter`.

#. Click the pencil icon again to save changes.

We have made a very small change to our dataset and the map view changes accordingly. Now we wil want to commit this change.

The process for adding a change to GeoGig is "Import, Add, Commit". We will perform all of those steps now.

#. On a terminal in the repository, type the following command:

   .. code-block:: console

      PG IMPORT command

   This import command let GeoGit be aware that content has changed.

#. Now add the changes. If you want to add everything, type:

   .. code-block:: console

      geogig add .

   But if you want to add a specific feature, type:

   .. todo:: No idea

#. Finally, we are ready to commit this change:

   .. code-block:: console

      geogig commit -m "The Sellwood Gap is now open"

#. Your change has been made.


Making a geometry change
------------------------

The city's bicycle plan is still incomplete. Luckily, you get to play master planner, and see if you can fix some of the other gaps left behind by the system as it stands today.

Specifically, your next task is to add a new bike lane. You can draw it anywhere you want.

#. Select :menuselection:`Layer --> Toggle Editing` to start the editing process.

#. On the :guilabel:`Digitizing` toolbar, click the button for :guilabel:`Add feature`. (Select :menuselection:`View --> Toolbars --> Digitizing` if this toolbar isn't shown.)

#. Click on the map to start the feature creation. Click to create each feature vertex.

#. Right-click when done. An attribute table dialog will display. Enter the following information:

   * ``ATTRIBUTE``: [something]
   * ``ATTRIBUTE``: [something]
   * ``ATTRIBUTE``: [something]
   * ``ATTRIBUTE``: [something]
   * ``ATTRIBUTE``: [something]

#. Click :guilabel:`OK` when done.

#Select :menuselection:`Layer --> Toggle Editing` to stop the editing process. Click :guilabel:`Save` when prompted.

With your new feature added, we can now add the feature to our repository via another commit.

#. On a terminal in the repository, type the following command:

   .. code-block:: console

      PG IMPORT command

   This import command let GeoGit be aware that content has changed.

#. Now add the changes. If you want to add everything, type:

   .. code-block:: console

      geogig add .

   But if you want to add a specific feature, type:

   .. todo:: No idea

#. Finally, we are ready to commit this change:

   .. code-block:: console

      geogig commit -m "New [name] bikeway added"

#. Your change has been made.
 
Rolling back a change
---------------------

Perhaps adding in that new bikelane was a bit premature. Let's remove it.

Now, we could remove it in one of two ways.

* We could remove the feature and make a new commit showing the removal. This would preserve the history of both commits
* We could also roll back to the previous commit. This would eliminate the commit from the timeline, as if it never happened.

.. note:: This process is only for removing the most recent commit(s). It is not trivial to remove a commit in between other commits that you wish to keep.

We will opt for the second option here: to roll back.

First, let's look at the :term:`log`. This is the list of commits that we have supplied so far.

#. In a terminal, type the following command:

   .. code-block:: console

      geogig log

   This will show the list of commits. If this is too much information, you can reduce the amount of information to one line:
   
   .. code-block:: console

      geogig log --oneline

   .. note:: There are lots of ways to filter this list, including by date and by author. Type ``geogig help log`` for a full list of options.

.. todo:: Discuss commit IDs

.. todo:: Perform the actual rollback

With that, the commit has been removed from the history, and we are back to only two commits.

