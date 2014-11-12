GeoGig Workshop
===============

Welcome to the GeoGig workshop!

Welcome!
--------

This workshop will introduce attendees to GeoGig, a distributed version control system for geospatial data. We will start with a discussion of distributed version control as applied to the specific case of geospatial data, followed by a hands-on session with the GeoGig command line interface, and finally the graphical GeoGig interface in QGIS. Attendees will learn how GeoGig can be a key tool in a workflow when managing geospatial data.

The workshop is geared toward those with no prior GeoGig experience, but familiarity with basic GIS concepts is suggested. It will also be useful to have familiarity with the desktop GIS client QGIS, along with Git, the distributed version control system, but neither one of these are required.

Prerequisites and software setup
--------------------------------

In order to perform this workshop, you will need the following software installed on your system:

* PostgreSQL (plus command line tools)
* PostGIS
* QGIS
* GeoGig

PostgreSQL, PostGIS, and QGIS can be acquired as part of an `OpenGeo Suite <http://boundlessgeo.com/solutions/opengeo-suite/>`_ installation. GeoGig can be obtained from the `GeoGig website <http://geogig.org>`_.

.. todo:: Details on how to get the GeoGig plugin?

We will assume that PostGIS is running at ``localhost`` on port ``5432``, and that both GeoGig and the PostgreSQL command-line tools are on the system ``PATH``.

To verify the ``PATH`` settings, open a terminal and type these three commands:

.. code-block:: console

   psql --version
   geogig --version

If any of these commands yields an error, please check your ``PATH`` settings.

.. todo:: Do we talk about the memory problems that result in "Error occurred during initialization of VM / Could not reserve enough space for object heap"? Need to reduce memory usage if so: -Xmx2G --> -Xmx1G

Topics covered
--------------

The following material will be covered in this workshop:

:ref:`theory`
  Discussion of versioned geospatial data, common workflows, and the connection with other distributed version control systems.

:ref:`cmd`
  A tour of the GeoGig command line interface, including creating and managing commits and branches, as well as merging from different repositories.

:ref:`workflow`
  Introducing a workflow for a distributed team of GIS analysts and a data manager responsible for approving changes to the product.

:ref:`moreinfo`
  More information about GeoGit including links and a glossary of terms.

Workshop Materials
------------------

The following directories will be found inside of the workshop bundle:

:file:`doc`
  The workshop documentation in HTML format. (This document.)

:file:`data`
  Data and other project files to be used in the workshop.

:file:`software`
  The software to be installed prior to commencing the workshop.

These directories should be placed on your desktop.

Ready to Begin?
---------------

Great! Head to the first section, :ref:`theory`.

.. toctree::
   :maxdepth: 2
   :numbered:
   :hidden:

   theory/index
   cmd/index
   workflow/index
   moreinfo/index
