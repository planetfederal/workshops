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
     * Publish that data through web services.

#. GeoExplorer

     * GeoExplorer background
     * View, compose, and publish maps 
     * Edit geospatial data.

#. GeoWebCache

     * Introduce tile caching concepts
     * Strategies for tile caching
     * Accelerate map rendering with tile caching

#. OpenLayers & GeoExt

     * Introduce very basic HTML, CSS and JavaScript
     * Use OpenLayers and GeoExt to create a desktop-like map application in a web browser.


Data package
------------

We will assume that the contents of the workshop package is located on your desktop:

:file:`<user>\\Desktop\\suiteintro\\`

In this case, :file:`<user>` is your local user's home directory. In a typical Windows installation, this is typically:

* Windows XP: :file:`C:\\Documents and Settings\\Doug\\` 
* Windows Vista/7: :file:`C:\\Users\\Doug\\`

For example:

:file:`C:\\Documents and Settings\\Doug\\Desktop\\suiteintro\\`

.. note:: We wil refer to the workshop directory as ``<workshop>`` throughout the course.

In some cases, we'll be adding and/or saving files to a Tomcat virtual directory. This is located at:

  :file:`<user>\\.opengeo\\data_dir\\www\\`

For example:

:file:`C:\\Documents and Settings\\Doug\\.opengeo\\data_dir\\www\\`

Contents
--------

* :file:`<workshop>\\data` - Spatial data used in the examples.
* :file:`<workshop>\\doc` - Workshop text (what you're reading right now).
* :file:`<workshop>\\html` - Template HTML files, images, and JavaScript libraries .
* :file:`<workshop>\\software` - OpenGeo Suite installer plus a few utilities that might be helpful.
* :file:`<workshop>\\sql` - Two SQL files that used in the PostGIS section.
* :file:`<workshop>\\styles` - Styling instructions for the spatial data used throughout this workshop.

