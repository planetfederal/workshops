OpenGeo Suite for Analysts
==========================

This workshop is an introduction to performing spatial analysis using QGIS, a desktop geographic information system and a component of OpenGeo Suite by Boundless.

No previous QGIS experience is assumed, but familiarity with GIS concepts is strongly recommended.

Prerequisites and software setup
--------------------------------

The easiest way to get started with QGIS is to use Boundless's `installers for Windows or OSX <http://boundlessgeo.com/solutions/solutions-software/qgis/qgis-download/>`_.

If you have your own QGIS installation, then you'll only need to add the OpenGeo Explorer plugin by following `these installation instructions <http://suite.opengeo.org/opengeo-docs/qgis/install.html#installing-steps>`_.

.. note:: This workshop assumes that you are using QGIS version 2.2 or later.

We will also be publishing some of our results to OpenGeo Suite at the end of the workshop. This may be installed locally on the same computer as QGIS or remotely on a server running a variety of operating systems: `download OpenGeo Suite <http://boundlessgeo.com/solutions/opengeo-suite/download/>`_.

About Boundless
---------------

`Boundless <http://boundlessgeo.com/>`_ is bringing the best practices of open source software to governments and other organizations around the world.

* We provide enterprises with supported, tested, and integrated open source solutions to help open government.
* We support open source communities by employing key developers for PostGIS, GeoServer, GeoWebCache, GeoExt, and OpenLayers.
* We have a ten-year history of providing successful consulting services and products to clients like MassGIS, Ordnance Survey and the Open Geospatial Consortium.
* We believe open and accessible information empowers people to effect real change. Our goal is to make geospatial information more open: publicly available, accessible on compelling platforms that people want to use.
* We strive to build software that meets and exceeds the desires of clients, because our market success proves the value of our work.

Workshop Conventions
--------------------

These sections conform to a number of conventions to make it easier to follow the conversation.  This section gives a brief overview of what to expect in the way of typographic conventions, as well as a short overview of the structure of each workbook.

Notes
^^^^^

Notes are used to provide information that is useful but not critical to the overall understanding of the topic.

.. note:: QGIS extensions are usually written in Python, but a smaller number have also been written in C++.

Warnings
^^^^^^^^

Warnings are used to provide information that is critical to the user to avoid problems during the workshop.

.. warning:: Make sure to backup your project file before making these changes!

Code
^^^^

Code examples and excerpts will be displayed in an offset box:

.. code-block:: python

   outFeat.setGeometry(feat.geometry())
   attrs = feat.attributes() + [majority, majority_p, minority, minority_p]
   outFeat.setAttributes(attrs)
   writer.addFeature(outFeat)

Files and paths
^^^^^^^^^^^^^^^

File names, paths and variables will be shown ``like this``.

For example:

   Find the ``streets.shp`` file in the ``workshop`` directory.

Layers and attributes
^^^^^^^^^^^^^^^^^^^^^

The names of layers, attributes and so on will be shown **like this**.

For example:

    Check the value of the **name** attribute in the **streets** layer.

Menus and form elements
^^^^^^^^^^^^^^^^^^^^^^^

Menus and form elements such as fields or check boxes and other on-screen artifacts are displayed :guilabel:`like this`.

For example:

  Click on the :menuselection:`File --> New` menu. Check the box that says :guilabel:`Confirm`.

Workflow
--------

Sections are designed to be progressive.  Each section will start with the assumption that you have completed and understood the previous section in the series and will build on that knowledge.  A single section will progress through a handful of ideas and provide working examples wherever possible.  At the end of a section, where appropriate, we have included a handful of exercises to allow you to try out the ideas we've presented.  In some cases the section will include "Things To Try".  These tasks contain more complex problems than the exercises and is designed to challenge participants with advanced knowledge.

Workshop sections
-----------------

.. toctree::
   :maxdepth: 2
   :numbered:

   introduction/index
   basics/index
   processing/index
   modeller/index
   publishing/index

   glossary
