Set up
======

To set up this example, we will start with our familiar Portland bike lanes repository and start the GeoGig server:

#. Open a new terminal and switch to the repository directory.

#. Create three new branches, one for each of our analysts:

   .. code-block:: console

      geogig branch review
      geogig branch updates

#. Start the GeoGig server:

   .. code-block:: console

      geogig serve

   ::

      Starting server on port 8182, use CTRL+C to exit.

#. The repository is now served at ``http://localhost:8182``.

#. Now create three repositories that will mimic what Alice, Bob and the data manager would have on their personal computers.

   .. code-block:: console

      geogig clone http://localhost:8182/repos/city_data alice
      geogig clone http://localhost:8182/repos/city_data bob
      geogig clone http://localhost:8182/repos/city_data qa

   .. note:: We have named the repositories with the same names as our three users so we can tell them apart, but this is not a requirement! In fact, Alice and Bob would probably use a descriptive name like **bikepdx** so they know what the directory is for.

#. We will create different repository owners for the **alice** and **bob** clones so that commits to these repositories will appear in their names.

   .. code-block:: console

      cd alice
      geogig config user.name "Alice"
      geogig config user.email "alice@portland.gov"
      cd ..
      cd bob
      geogig config user.name "Bob"
      geogig config user.email "bob@portland.gov"

Now, whenever we commit anything to **alice**, it will be done in Alice's name and likewise for the **bob** repository.

.. note:: You may wish to open several terminal windows, one each for the server, Alice, Bob and the data manager so you don't have to keep switching between the repositories.
