#####################
GeoServer Performance
#####################

Welcome
-------

.. image:: img/geoserver.png

This workshop is focused on performance. There are a number reasons why speed is desirable (getting the most value out of your infrastructure investment for one) but the primary motivation is simple - a better user experience.

With that in mind any performance optimisation should start by establishing a baseline, and working towards a goal. This workshop will cover a number of approaches to improving GeoServer performance, some of which are a lot more expensive in time and/or money than others. It is important to try each option with your your data to get a feel for how much improvement can be gained before proceeding. There is no sense spending more money on additional hardware if some simple tweaks to styling can meet your goals. By the same token there is no point to endless optimizing styles when your machine is memory or disk bound. 

Above all "keep your head up" and your goal in mind. Even though performance optimisation is lots of fun - we want to be sure to know when to stop!

.. note::
   
   We will be using a range of open source technologies for this workshop, all of which are available for download.
   
   Key technologies used are:
   
   
   This workshop assumes the installation of `OpenGeoSuite <>`__ containing the following:

   * `OpenLayers <http://openlayers.org>`__ - javascript client
   * `GeoServer <http://geoserver.org>`__ - middleware application used to publish geospatial data
   * `PostgreSQL <http://www.postgresql.org>`__ / `PostGIS <http://postgis.net>`__ - used to host our vector data, and perform data simplifications
   * `PgAdmin <http://www.pgadmin.org>`__ - desktop application for interacting with PostgreSQL
   
   OpenGeo Suite offers a pre-tested software stack, and a handy installer making this workshop easier to run. If you already have these tools installed, or would like to work with the community downloads it should not effect your progress.
   
   We will also be working with:
   
   * `JMetre <http://jmeter.apache.org>`__ - used to measure performance
   * `GDAL <http://www.gdal.org>`__ - command line tools used for data preparation
   
   Step by step instructions will be provided, so you do not need to be familiar with all the tools mentioned above. We will be showcasing general stratagies here and you are welcome to use the software you are comfortable with to get the job done.

Topics covered
--------------

The following material will be covered in this workshop:

:doc:`setup/index`
   Workshop materials and setup
   
:doc:`intro/index`
   Introduction to performance and establishing a baseline.

:doc:`jvm/index`
   JVM Performance tuning

:doc:`service/index`
   Service performance considerations

:doc:`style/index`
   Rendering performance and style optimisation.
   
:doc:`vector/index`
   Generating pregeneralized vector data and dynamically changing vector data based on scale.

:doc:`raster/index`
   Raster performance considerations and GeoTIFF optmization.

:doc:`encode/index`
   Image format implementations and encoding optimizations.

:doc:`gwc/index`
   GeoWebCache and tile map protocols

.. toctree::
   :maxdepth: 2
   :numbered:
   :hidden:
   
   setup/index
   intro/index
   jvm/index
   service/index
   style/index
   vector/index
   raster/index
   encode/index
   gwc/index