.. _workshop:

Workshop materials
================== 

Workflow
--------

The following are the high-level tasks that we'll accomplish:

#. PostGIS

     * Spatial database overview 
     * Create a spatial database
     * Load shapefiles into database tables 
     * Introduce some basic functions and operations

#. GeoServer

     * GeoServer concepts
     * Basic GeoServer administration tasks
     * Load data into GeoServer from PostGIS tables and files
     * Publish that data through web services

#. GeoExplorer

     * GeoExplorer background
     * View, compose, and publish maps 
     * Edit geospatial data

#. GeoWebCache

     * Introduce tile caching concepts
     * Strategies for tile caching
     * Accelerate map rendering with tile caching

#. OpenLayers & GeoExt

     * Introduce very basic HTML, CSS and JavaScript
     * Use OpenLayers and GeoExt to create a desktop-like map application in a web browser


Data package
------------

We will assume that the contents of the workshop package is located on your desktop::

  <user>\Desktop\suiteintro\

In this case, ``<user>`` is your local user's home directory. In a Windows installation, this is typically::

  C:\Users\Doug\

For example::

  C:\Users\Doug\Desktop\suiteintro\data\

.. note:: We wil refer to the workshop directory as ``<workshop>`` throughout the course.

In some cases, we'll be adding and/or saving files to a Tomcat virtual directory. This is located at::

  C:\ProgramData\Boundless\OpenGeo\geoserver

or more generally at::

  %ProgramData%\Boundless\OpenGeo\geoserver


.. note:: On Linux, the data directory is located at :file:`/var/lib/opengeo/geoserver`, and on OS X, at :file:`~/Library/Application Support/GeoServer/data_dir`

Contents
--------

* ``<workshop>\data`` - Spatial data used in the examples.
* ``<workshop>\doc`` - Workshop text (this document).
* ``<workshop>\html`` - Template HTML files and images.
* ``<workshop>\sql`` - SQL files used in the PostGIS section.
* ``<workshop>\styles`` - Styling directives for the spatial data used throughout this workshop.

