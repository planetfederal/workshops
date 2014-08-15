.. _theory.version:

Why version geospatial data?
============================

Versioning refers to the process of being able to manage not only the data itself, but how it evolves over time. Components of a robust versioning system includes being able to save the timestamp associated with changes, a system of notating who has made these changes, and also the ability to rollback, adjust, and vet such changes.

Geospatial data comes in many forms, whether it's in a "flat" file such as a shapefile, or whether it a component in a spatial database (such as PostGIS). But this data has no inherent versioning built-in to it. If your data is contained in a database, then the database itself may have some kind of versioning, but this is database-specific, not data-specific (and certainly not geospatial data-specific).

We wish to manage the versioning of geospatial data for the same reason why we "track changes" in text documents:

* **Better accountability**: Know who did what (and when).
* **Ability to revert**: When a change turns out to be not desired, it is easy to "roll back" to a previous snapshot.
* **Easily maintain multiple versions**: Different editions of what is essential the same data set can be maintained without needless duplication of content.

Distributed versus centralized versioning
-----------------------------------------

There are two main models of maintaining version control (with emphasis here on the word "control"):

* **Centralized**: In this model, there is one canonical repository that is managed by a central authority. Users either have access to the repository or they do not.
* **Decentralized**: In this model, there is no canonical respository. Instead, every copy of repository is technically identical to any other. Anyone can make a copy of the repository and work with it and makes changes to it in their own "sandbox". One repository is usually considered the canonical one, but this is a convention and is not required. In this way, the decentralized model can emulate the centralized model, which can be convenient for users transitioning from one to the other.

.. todo:: Add figure showing both

GIS workflows traditionally employ the centralized method, while software development has moved toward the decentralized method.

GeoGig works on the decentralized platform, giving your team a choice of how you wish to use it.
