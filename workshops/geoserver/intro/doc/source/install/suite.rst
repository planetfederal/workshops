.. _install.suite:

Boundless Suite GeoServer Distribution
======================================

Boundless Suite is a complete web-based geospatial software stack. In this package, the applications contained are:

* **PostGIS** - A spatially enabled object-relational database.
* **GeoServer** - A software server for loading and sharing geospatial data.
* **GeoWebCache** - A tile cache server that accelerates the serving of maps (built into GeoServer).
* **OpenLayers** - A browser-based mapping framework

.. figure:: img/ecosystem.png

   Boundless Suite components and ecosystem

Boundless Suite is free and open source, and is available for download from `Boundless <http://boundlessgeo.com/>`_. Boundless Suite customers are provided with the latest release along with commercial training and support. Boundless Suite includes slightly different extensions than the community releases of GeoServer. Boundless Suite components are subject to extensive integration testing and are available in a range of packages from virtual machines through to linux packages, web archives and cloud/clustering options.

GeoServer also plays an important role in other Boundless products including the Boundless Exchange content management system.

Installation Requirements
-------------------------


In this section we will install a virtual machine containing Boundless Suite.

Prerequisites:

* Please disable any programs on your system that use either 8080. (If this is not possible, please ask for alternative connection options.)
* We strongly recommend you use a recent version of `Firefox <http://www.mozilla.org/en-US/firefox/new/>`_ as the browser on your host system. Using `Chrome <https://www.google.com/intl/en/chrome/browser/>`_ is acceptable, though an XML viewer extension such as `XV <https://chrome.google.com/webstore/detail/xv-%E2%80%94-xml-viewer/eeocglpgjdpaefaedpblffpeebgmgddk?hl=en>`_ will be required for some sections. Other browsers have not been tested and are not recommended.
* Make sure you have administrative rights (Windows) or super-user privileges (Linux and OS X) on your system.

.. _install.suite.virtualbox:

Installing VirtualBox
---------------------

.. _install.suite.dashboard:

Boundless Suite Dashboard
-------------------------

Boundless Suite comes with a Dashboard application that provides links to the most common applications and their documentation.

#. The Dashboard is available in the browser by navigating to `http://localhost:8080/`__.

#. The main Dashboard page show links to configuration pages and documentation.

   .. figure:: img/dashboard.png

      Boundless Suite Dashboard

#. The top toolbar contains links to two other pages:

   * The :guilabel:`Getting Started` page includes a sample workflow to use for publishing data and maps using OpenGeo Suite. A similar workflow will be followed as part of this workshop.
   * The :guilabel:`Documentation` page links to the OpenGeo Suite User Manual, which contains the full user manual for GeoServer.

