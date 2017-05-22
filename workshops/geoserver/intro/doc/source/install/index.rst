.. _geoserver.install:

Installing GeoServer
====================

In this section, we will install GeoServer. For the purposes of this workshop, we will be using either:

.. toctree::
   :maxdepth: 1
   
   suite
   geoserver

* Boundless Suite (of which GeoServer is a primary component) in order to facilitate setup and configuration.
* GeoServer Latest Download, including several optional extensions.

Boundless Suite GeoServer Distribution
--------------------------------------

Boundless Suite is a complete web-based geospatial software stack. In this package, the applications contained are:

* **PostGIS** - A spatially enabled object-relational database.
* **GeoServer** - A software server for loading and sharing geospatial data.
* **GeoWebCache** - A tile cache server that accelerates the serving of maps (built into GeoServer).
* **OpenLayers** - A browser-based mapping framework

.. figure:: img/ecosystem.png

   Boundless Suite components and ecosystem

Boundless Suite is free and open source, and is available for download from `Boundless <http://boundlessgeo.com/>`_. Boundless Suite customers are provided with the latest release along with commercial training and support. Boundless Suite includes slightly different extensions than the community releases of GeoServer. Boundless Suite components are subject to extensive integration testing and are available in a range of packages from virtual machines through to linux packages, web archives and cloud/clustering options.

GeoServer also plays an important role in other Boundless products including the Boundless Exchange content management system.

OSGeo Community GeoServer Distribution
--------------------------------------

The GeoServer project is part of the Open Source Geospatial Foundation. Two community releases are available at any one time:

* stable: The latest production ready GeoServer along with optional extensions. New features and fixes are added to the stable release for the first six months.
* maintenance: Fixes are added to maintenance releases for the next six months.

GeoServer Comunity distributions include windows and mac installers along with standalone bin download. For those that already use Tomcat a web archive is alos available.

OSGeo provides a vendor neutral software foundation for Boundless, GeoSolutions and other collaborators to work on the project together. Our original company, OpenPlans, donated the GeoServer and GeoWebCache codebases to OSGeo in 2014. The OpenLayers and PostGIS projects are also hosted by OSGeo.

