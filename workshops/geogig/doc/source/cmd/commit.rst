.. _cmd.commit:

Working with commits
====================

With setup complete, we can now perform the basic task of a versioned repository: making commits.

.. todo:: Mention logs / troubleshooting.

Initial commit
--------------

Our repository is empty, so we will need to make an initial :term:`commit`.

Importing data
~~~~~~~~~~~~~~

We must :term:`import` data into our repository for our first commit. This will be the baseline from which we will work.

#. From the :file:`city_data` directory created in the previous section, use the ``geogig shp import`` command to import the data from the file into the repository:

   .. code-block:: console

      geogig shp import --fid-attrib ID ~/data/cmd/bikepdx.shp

   ::

      Importing from shapefile /home/qgis-user/data/cmd/bikepdx.shp

      Importing bikepdx          (1/1)...
      93%
      6744 distinct features inserted in 6.243 s

      Building final tree...

      6744 features tree built in 1.206 s
      100%
      /home/qgis-user/data/cmd/bikepdx.shp imported successfully.

   .. note:: Adjust the file path as necessary: ``geogig shp import ..\data\bikepdx.shp`` would be used on Windows, for example.

   .. important:: What is ``--fid-attrib``? GeoGig needs to know how to uniquely identify each feature in the data set. The ``bikepdx`` layer has an attribute named ``id`` that does exactly this, so we'll inform GeoGig of it during the import. Note that GeoGig can also work with other data providers, like PostGIS, and it can automatically detect the unique identifier (the primary key) if it exists.

#. The data will be imported into GeoGig, ready for versioning. Verify this:

   .. code-block:: console

      geogig status

   ::

      # On branch master
      # Changes not staged for commit:
      #   (use "geogig add <path/to/fid>..." to update what will be committed
      #   (use "geogig checkout -- <path/to/fid>..." to discard changes in working directory
      #
      #      added  bikepdx
      #      added  bikepdx/6526
      #      added  bikepdx/6527
      #      added  bikepdx/6524
      #      added  bikepdx/6525
      ...
      # 6748 total.

   On most terminals, the features that have been added are colored **red**.

Adding data
~~~~~~~~~~~

Now that our repository is aware of our spatial data, we can add all the features to the repository so that we can commit them all.

#. Add all features to the repository:

   .. code-block:: console

      geogig add bikepdx

   .. note:: If we wanted to add only some features to the repository, we could run ``geogig add bikepdx/[id]`` where ``[id]`` is one of the feature IDs.

   ::

      Counting unstaged elements...6748
      Staging changes...
      100%
      6747 features and 1 trees staged for commit
      0 features and 0 trees not staged for commit

#. Run ``geogig status`` to see how the output has changed

   ::

      # On branch master
      # Changes to be committed:
      #   (use "geogig reset HEAD <path/to/fid>..." to unstage)
      #
      #      added  bikepdx
      #      added  bikepdx/6526
      #      added  bikepdx/6527
      #      added  bikepdx/6524
      #      added  bikepdx/6525
      ...
      # 6745 total.

   On most terminals, the features that have been added are colored **green**.

Committing data
~~~~~~~~~~~~~~~

Now we are ready to make our first commit. A commit will include anything that's been added. It requires only a message to describe the commit. This is a useful text string as the history for a project grows, so it is important to make the message clear.

For example, the following commit messages are good, as they are a clear indication of what the commit entails:

* "Added new attribute field OWNER"
* "Removed Main St. feature"
* "Renamed First Ave to First Avenue"

On the other hand, the following commit messages are not as good:

* "Made changes"
* "Added stuff"
* "Commit"

#. Commit our changes. Use the message "Initial commit of complete bikepdx layer" via the ``-m`` option:

   .. code-block:: console

      geogig commit -m "Initial commit of complete bikepdx layer"

   ::

      100%
      [cfdbd50c415a0d71b9a876eb51f90d5752e8f23b] Initial commit of complete data layer
      Committed, counting objects...6744 features added, 0 changed, 0 deleted.

You have now made your first commit!

Making an attribute change
--------------------------

With a baseline created, it's time to do some editing.

Editing a feature
~~~~~~~~~~~~~~~~~

There are gaps in the bicycling system in Portland. One of the most famous is the "Sellwood Gap", a one-mile long break in the Springwater Corridor, which is a 20 mile long rail-trail that stretches from the Willamette River to the very edge of the metropolitan area.

Zoom in to this area. To find the Sellwood Gap, find the multi-use trail (styled in dark green) that parallels the river on the east side. Follow it south to the point where it curves away from the river, and you will see that a section of it becomes dashed (meaning that it is not an active path).

.. figure:: img/commit_sellwoodgap.png

   The "Sellwood Gap"

.. note:: If you skipped the optional step on adding a background layer, your view will look different.

Let's say that all interested parties have gotten together and agreed to build this missing section of trail. After construction, you, in charge of updating the city's GIS data, would change that feature to be an active section.

Specifically, this would involve us making a single change: the attribute ``status`` for that feature should be changed from ``RECOMM`` to ``ACTIVE``.

#. If you haven't already, zoom to the area that contains this feature.

#. Click the :guilabel:`bikepdx` entry in the :guilabel:`Layers` list to ensure it is selected and not any other layer.

#. Select :menuselection:`Layer --> Open Attribute Table`.

   .. figure:: img/commit_attributetablelink.png

      Open Attribute Table link

#. This will bring up the attribute table for the layer.

   .. figure:: img/commit_attributetable.png

      Attribute table

#. In the attribute table, click the pencil icon on the top left to :guilabel:`Toggle Editing`.

   .. figure:: img/commit_toggleediting.png

      Toggle Editing

#. Scroll down to the feature in question. The ``id`` for this feature is ``6703``. You may wish to click on the ``id`` column to sort numerically if it is not already.

   .. figure:: img/commit_attributetablefeature.png

      Feature selected

#. Double-click the value of the ``status`` column. Change the value to :kbd:`ACTIVE` and press :kbd:`Enter`.

   .. figure:: img/commit_featureedited.png

      Feature edited

#. Click the pencil icon again to save changes.

#. Close the attribute table dialog. We have made a very small change to our dataset and the map view changes accordingly.

   .. figure:: img/commit_sellwoodgapclosed.png

      Sellwood Gap fixed

Committing the change
~~~~~~~~~~~~~~~~~~~~~

Now we will want to commit this change. While the change was made in the file, **GeoGig is not yet aware of the change.** The process for making a change with GeoGig is: **Import, Add, Commit**. We will perform all of those steps now.

#. On a terminal in the repository, type the following command:

   .. code-block:: console

      geogig shp import --fid-attrib ID ~/data/bikepdx.shp

   This is the same import command as above. It makes the GeoGig repository aware that content has changed.

   ::

      Importing from shapefile bikepdx.shp

      Importing bikepdx          (1/1)... 
      0%
      2 distinct features inserted in 485.2 ms

      Building final tree...

      6747 features tree built in 65.96 ms
      100%

#. Now add the changes. If you want to add everything, type:

   .. code-block:: console

      geogig add

   .. note:: Any unchanged features will be ignored.

   ::

      Counting unstaged elements...2
      Staging changes...
      50%
      1 features and 1 trees staged for commit
      0 features and 0 trees not staged for commit

#. Notice that the output says that only a single feature is staged for commit. This makes sense; even though we have imported the entire table, GeoGig processes the import against the existing repository, and will only highlight the features that have changed.

#. Run ``geogig status`` to see this single feature:

   ::

      # On branch master
      # Changes to be committed:
      #   (use "geogig reset HEAD <path/to/fid>..." to unstage)
      #
      #      modified  bikepdx
      #      modified  bikepdx/6703
      # 2 total.

   .. note:: If you're wondering why there are two changes to be committed when we have only changed a single feature, it is referring to the feature and its parent tree (the layer itself).

#. Finally, we are ready to commit this change:

   .. code-block:: console

      geogig commit -m "The Sellwood Gap has now been fixed"

   ::

      100%
      [603d4bf0069203a42ac513f635f49f725c2a4f2a] The Sellwood Gap has now been fixed
      Committed, counting objects...0 features added, 1 changed, 0 deleted.

Your change has been made.


Showing differences between commits
-----------------------------------

Our first commit entered every single feature into the repository. Our second commit changed a single attribute of a single feature.

You can see specific differences between two commits by using the :term:`diff` command. 

.. note:: The two commits need not be adjacent. If two commits referenced in the ``diff`` command have commits in between them, the sum total of differences (including all of those additional commits) will be displayed.

In order to do this, we first need to learn about the commit log and commit IDs.

Commit log
~~~~~~~~~~

The commit :term:`log` is a list of commits that are entered into the repository. It is a "history" of the repository.

#. In a terminal, type the following command:

   .. code-block:: console

      geogig log

   This will show the list of commits.

   ::

      Commit:  603d4bf0069203a42ac513f635f49f725c2a4f2a
      Author:  Author <author@example.com>
      Date:    (9 minutes ago) 2014-08-01 17:21:23 -0
      Subject: The Sellwood Gap has now been fixed

      Commit:  cfdbd50c415a0d71b9a876eb51f90d5752e8f23b
      Author:  Author <author@example.com>
      Date:    (19 minutes ago) 2014-08-01 17:10:30 -0
      Subject: Initial commit of complete bikepdx layer

#. If the full list is too much information, you can reduce the amount of information to one line:
   
   .. code-block:: console

      geogig log --oneline

   ::

      b862ee8ced960965f7f17033a6e68f604e62fae6 The Sellwood Gap has now been fixed
      2b7629e284cbd5ed8cec023ab00763ebd700143f Initial commit of complete bikepdx layer

   .. note:: There are lots of ways to filter this commit list, including by date and by author. Type ``geogig help log`` for a full list of options.

Commit IDs
~~~~~~~~~~

The first line of each commit is the **commit ID**. Commit IDs are long alphanumeric strings that uniquely determine the commit. When referencing a commit, you can use this string. Thankfully though, you don't need to reference the entire string; **you only need enough of the beginning of the string to uniquely identify the commit**. 

In this case, since we only have three commits, we don't need much of the string to be unique. Usually 7 characters is much more than you would ever need to uniquely identify the commit.

.. note:: If you're interested: the chances of the first seven characters of two different commit IDs being identical is 1 in 16^7, about 270 million! If you like living on the edge, you could use 5 characters (about 1 in 1 million), and GeoGig will always warn you if there's any ambiguity.

So if we wanted details about a specific commit, we would use the :term:`show` command:

#. Get details about the most recent commit. Make sure to replace the commit ID with the one specific to your instance.

   .. code-block:: console

      geogig show b862ee8c

   ::

      Commit:        b862ee8ced960965f7f17033a6e68f604e62fae6
      Author:        Author <author@example.com>
      Committer:     Author <author@example.com>
      Author date:   (2 minutes ago) Fri Oct 23 00:48:26 PDT 2015
      Committer date:(2 minutes ago) Fri Oct 23 00:48:26 PDT 2015
      Subject:       The Sellwood Gap has now been fixed

Running a diff
~~~~~~~~~~~~~~

With this, we have enough information to be able to see the difference ("run a diff") between two commits.

#. Enter the following command:

   .. code-block:: console

      geogig diff 2b7629e28 b862ee8ced9

   ::

      f15dd3... f15dd3... 9bf8e5... b06301...   M  bikepdx/1
      SHAPE_LEN: 871.638132806348 -> 871.6381328063

      f15dd3... f15dd3... 7c943c... e153fa...   M  bikepdx/6703
      STATUS: RECOMM -> ACTIVE
      SHAPE_LEN: 4862.01831066843 -> 4862.0183106684

Here we see that the specific feature (``bikepdx/6703``) is listed as having been modified (``M``), and with the precise change detailed: (that the ``status`` attribute has changed from ``RECOMM`` to ``ACTIVE``,

.. note:: The order of the commit IDs is significant, being of the form ``before after``. Reversing the order in this case would show that the attribute was changed in the opposite way, from ``ACTIVE`` to ``RECOMM``.


Making a geometry change
------------------------

The city's bicycle plan is still incomplete. In addition to lanes that are only planned and not built, there are also gaps in the plan itself. Luckily, in this workshop, you get to play master planner, and see if you can fix some of the other gaps left behind by the system as it stands today.

Specifically, your next task is to add a new bike lane. You can draw it anywhere you want. (The specifics of the position of the feature is not important for this workshop.)

Draw a new feature
~~~~~~~~~~~~~~~~~~

#. Select :menuselection:`Layer --> Toggle Editing` to start the editing process.

   .. figure:: img/commit_toggleediting.png

      Toggle editing

#. The display will change, with a red "X" displaying over each vertex of every feature.

   .. figure:: img/commit_editx.png

      Map window in Edit mode

#. Zoom into an area of the map where you would like to place the new feature.

   .. figure:: img/commit_addbefore.png

      A zoomed in area of the map

#. Now add a feature by selecting :menuselection:`Edit --> Add Feature`.

   .. figure:: img/commit_addfeature.png

      Add feature menu option

#. Click on the map to place the initial vertex of the feature. Continue clicking to create each feature vertex.

   .. figure:: img/commit_addduring.png

      Drawing a new feature

#. Right-click when done. An attribute table dialog will display. Fill out the form, specifically entering in the following values:

   * ``id``: ``6773``
   * ``segmentnam``: [approximate street name, if known]
   * ``status``: ``RECOMM``
   * ``facility``: ``MTRAIL``

   .. figure:: img/commit_addattributes.png

      Setting attributes for the new feature

#. Click :guilabel:`OK` when done.

#. Your feature will be displayed and styled with a dashed line (because ``status`` is not ``ACTIVE``):

   .. figure:: img/commit_addafter.png

      New feature added

#. Select :menuselection:`Layer --> Toggle Editing` to complete the editing process. Click :guilabel:`Save` when prompted.

Commit the new feature
~~~~~~~~~~~~~~~~~~~~~~

With the new feature added, we can now add it to our repository via another commit.

.. note:: Remember: "Import, Add, Commit"

#. On a terminal in the repository, type the following command:

   .. code-block:: console

      geogig shp import --fid-attrib ID ../data/bikepdx.shp

   As before, this import command lets the GeoGig repository be aware that content has changed.

   ::

      Importing from shapefile ../data/bikepdx.shp

      Importing bikepdx          (1/1)...
      0%
      2 distinct features inserted in 3.260 s

      Building final tree...

      6773 features tree built in 285.1 ms
      100%
      ../data/bikepdx.shp imported successfully.

#. Now add the changes:

   .. code-block:: console

      geogig add bikepdx

   ::

      Counting unstaged elements...2
      Staging changes...
      100%
      1 features and 1 trees staged for commit
      0 features and 0 trees not staged for commit

   .. note:: To see details about what is staged for commit, remember that you can run ``geogig status``.

#. Finally, we are ready to commit this change, substituting the specific details about your new route:

   .. code-block:: console

      geogig commit -m "New recommended trail at Columbia and Argyle"

   ::

      100%
      [0dda0de72d5ff4a15a6f8067bcfe1a6ef4f974d5] New recommended trail at Columbia and Argyle
      Committed, counting objects...1 features added, 0 changed, 0 deleted.

Your change has been made.
