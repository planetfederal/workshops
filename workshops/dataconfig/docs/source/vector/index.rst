.. _vector:

Optimizing vector layers in GeoServer
=====================================

This workshop presents some of the techniques and tools that are available to improve GeoServer performance when working with **vector layers**. The workshop will focus on the following :

* Data preparation—Differences between data formats and data containers
* Strategies for structuring vector data
* Optimal configuration of the corresponding vector data stores

Some of these techniques involve altering the data itself, while others consider how the data is structured and organized. Although we will cover some GeoServer-specific settings, most of these optimizations should result in improved general performance for other applications working with the same data. Configuring vector data stores applies specifically to GeoServer.

.. toctree::
   :maxdepth: 2

   sample
   fileformats
   structure
   ogr2ogr
   pregeneralized
   postgis
   tuninggeoserver
   
