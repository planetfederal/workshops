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

.. todo:: Make a change

.. todo:: Delete a feature

.. todo:: Rollback the change

 