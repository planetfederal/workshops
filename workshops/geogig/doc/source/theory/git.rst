.. _theory.git:

GeoGig and Git
==============

The most popular decentralized version control system today is **Git**.

As described on its website, `Git <http://git-scm.com>`_ is "a free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency."

GeoGig owes much of its lineage to Git, as it was designed with Git in mind. That said, GeoGig is focused on the unique challenges that are inherent in managing geospatial data.

Why not just use Git?
---------------------

Despite its power and flexibility, Git is not designed to handle spatial data for the following reasons:

* **Spatial data is binary**: Git is optimized for non-binary data such as text files as it can efficiently store the character-level changes in a file. With binary data, differences between files, especially when the data is compressed, means that this efficiency is lost, and each snapshot is effectively a copy of the previous file. Spatial data is usually in binary form, which means that Git is not the best tool for the job. 

* **Spatial data is usually contained in a spatial database**: Git is designed to handle text files in directory structures. Spatial data isn't stored that way, which reduces the usefulness of Git. GeoGig can handle data that exists in a spatial database such as PostGIS.

GeoGig is familiar
------------------

Users of Git will likely find that using GeoGig is familiar to them, as many of the same commands exist (add, commit, pull, merge, etc.) and share the same syntax.

That said, there are certain crucial differences between GeoGig and Git, most notably an extra step to load the data into the repository. Because of this, users of Git need to be aware that GeoGig is not Git, and take care not to confuse the two.

If you are not familiar with Git, that is fine too. GeoGig is simple to use, whether you are familiar with command line tools, or prefer the ease-of-use that comes with a graphical user interface.
