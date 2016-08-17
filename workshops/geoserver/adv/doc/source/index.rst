=======================
Beyond GeoServer Basics
=======================

Welcome!
--------

.. image:: geoserver.png

In this course, you will learn about many different features that GeoServer has to offer beyond simply loading and publishing data. From catalog operations to data filters, you will be exposed to many different aspects of GeoServer configuration.

This workshop will assume that you are familiar with basic GeoServer concepts and interaction, such as how to load and publish a shapefile.

Topics covered
--------------

The following material will be covered in this workshop:

:ref:`gsadv.background`
  Basic refresher of GeoServer interaction

:ref:`gsadv.catalog`
  Learn about catalog operations such as the REST interface and Transactional WFS.

:ref:`gsadv.crs`
  Learn how to manage coordinate reference systems (projections).

:ref:`gsadv.filtering`
  Create useful subsets of data using CQL/OGC filters and SQL views.

:ref:`gsadv.processing`
  Perform spatial analysis with GeoServer using Web Processing Service (WPS) and rendering transformations.


Workshop Materials
------------------

The following directories will be found inside of the workshop bundle:

:file:`doc`
  The workshop documentation in HTML format.

:file:`data`
  Geospatial data to be used throughout the workshop.

:file:`styles`
  Style files to be used throughout the workshop.

These directories should be placed on your desktop.


Ready to Begin?
---------------

Great! Head to the first section, :ref:`gsadv.background`.

.. toctree::
   :maxdepth: 2
   :numbered:
   :hidden:

   background
   catalog/index
   crs/index
   filtering/index
   processing/index
