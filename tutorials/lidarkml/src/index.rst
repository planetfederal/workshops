
.. note:: 

  Check out the `final elevated buildings in Google Earth <_static/code/buildings-elevated.kml>`_ and play!


Introduction
============

`LIDAR`_ data is accumulating in companies and government agencies around the world as acquisition costs fall and potential uses grow. Site surveys, detailed flood plain mapping, and infrastructure inventories are all making extensive use of the laser range-finding technology.

`LIDAR`_ works by sending out pulses of laser light, then measuring the reflections that return, and how long it takes for the return to arrive. Using this information, the position of the reflection can be calculated relative to the sensor. Among the information that is generally included in LIDAR data files are:

* the x, y and z coordinates of the reflection points;
* the red, green, and blue components of the reflection;
* the intensity of the reflection;
* other reflections that came from the same pulse--known as "first return", "second return", "third return"--which can occur in forested areas, for example, with one return from the top of the tree canopy and others from further down;
* the time of the pulse;
* the angle of the reflection relative to the sensor; and
* many other sensor-specific measurements.

The scanners will generate billions of pulses in a large survey, each of which will have all the above information (and more) measured. 

Suffice to say, LIDAR data can be both really complex, and **really large!**

A lot of LIDAR uses are very particular, whether generating building site models to measure from or evaluating the state of physical infrastructure, but once the work is done, what's a good way to store LIDAR for future uses?

The most common storage system so far is the desk drawer, but new database technology is opening up the possibility to keep the data live and online, available for analytical and visualization uses.

This tutorial will explore loading and exploiting a LIDAR data set:

* downloading the data and loading it into PostgreSQL using the LIDAR tools included in `OpenGeo Suite 4`_;
* visualizing and exposing some of the data using GeoServer and Google Earth;
* analyzing and elevating a building footprints layer against the LIDAR; and,
* visualizing the elevated buildings using GeoServer and Google Early.


Installing Software
===================

Install the following software:

* `OpenGeo Suite 4`_
  
  * Linux users: Ensure that the `pointcloud-postgresql93` extension for PostgreSQL and `pdal` LIDAR tools are installed, they may not be automatically installed with the `opengeo` package
  * All users: Check that you can run the command-line `pdal` program.
  
* `Google Earth <http://earth.google.com>`_


Getting Data
============

LIDAR
-----

Thanks to open data initiatives, both LIDAR data and vector data are not hard to come by. This workshop uses data from the State of Oregon.

For LIDAR data, we'll use a survey `conducted by the Oregon Departing of Geology in 2009 <http://catalog.data.gov/dataset/2009-oregon-department-of-geology-and-mineral-industries-dogami-lidar-medfordc9f32>`_. It covers a large area of Jackson County, including the City of Medford.

.. image:: ./img/oregon.jpg
   :width: 98%

The data is collected into individual "LASZIP" files, of about 70MB in size each. For simplicity we're only going to use one tile, but there's no reason you could not use multiple tiles for this example.

.. image:: ./img/lidar_area.jpg
   :width: 98%

The `data directory <http://www.csc.noaa.gov/htdata/lidar1_z/geoid12a/data/1171/>`_ includes all the tiles as well as a shape file that provides a spatial index of where each tile is.

The tile we are going to use covers both a residential and commercial area of Medford.

.. image:: ./img/lidar_tile.jpg
   :width: 98%

**Download** LIDAR tile `20090429_42122c8225_ld_p23.laz <http://www.csc.noaa.gov/htdata/lidar1_z/geoid12a/data/1171/20090429_42122c8225_ld_p23.laz>`_ now.


Building Footprints
-------------------

In our analysis, we'll be using the LIDAR data to determine the height of the buildings within our LIDAR tile. To do that, we need building outlines! Fortunately, Jackson County has an `open data program <http://www.smartmap.org/Portal/gis-data.aspx>`_.

**Download** the shape file `BuildingFootprints.zip <http://www.smartmap.org/Portal/SharedFiles/Download.aspx?pageid=2&mid=2&fileid=43>`_ now.


Loading LIDAR
=============






Topics TO DO
============

* Enable pointcloud, postgis, pointcloud_postgis
* Create PDAL chain and load
* Metadata about LIDAR (pdal info? PC\_*)
* Thematic view of chip outlines in GeoServer
  * http://docs.geoserver.org/latest/en/user/styling/sld-tipstricks/transformation-func.html#interpolate
  * visualize it using interpolation transformation on the chip boundaries
  * visualize it using interpolation transformation on the points?
* Load buildings
  * http://prj2epsg.org/epsg/2270
  * note on coordinate systems, matching them to LIDAR?
  * find elevation of a building footprint
  * find elevations of all of them, add to table
* KML output template for buildings
  * Using Heights TMPL to extrude
  * http://docs.geoserver.org/stable/en/user/googleearth/tutorials/heights/heights.html#tutorials-heights
  
::

  <altitudeMode>absolute</altitudeMode>
  <extrude>1</extrude>



.. _OpenGeo Suite 4: http://suite.opengeo.org/opengeo-docs/installation/index.html
.. _LIDAR: http://en.wikipedia.org/wiki/Lidar
