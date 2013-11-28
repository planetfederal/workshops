.. _geoserver.other:

Other protocols
===============

While beyond the scope of this workshop, it is worth noting that GeoServer offers limited support for other protocols in addition to WMS and WFS.

Web Coverage Service (WCS)
--------------------------

The Web Coverage Service is a service that enables access to the underlying raster (or "coverage") data.

In a sense, WCS is the raster analog to WFS, where you can access the actual raster data stored on a server.

GeoServer contains full support for WCS versions up to 1.1.1.

For more information on WCS, please see the OGC site on the Web Coverage Service protocol at `<http://www.opengeospatial.org/standards/wcs>`_.

Web Processing Service (WPS)
----------------------------

The Web Processing Service (WPS) is a service for publishing geospatial processes, algorithms, and calculations.

WPS extends the web mapping server to provide geospatial analysis. WPS in GeoServer allows for direct integration with other GeoServer services and the data catalog. This means that it is possible to create processes based on data served in GeoServer, including the results of a process to be stored as a new layer. In this way, WPS acts as a full browser-based geospatial analysis tool, capable of reading and writing data from and to GeoServer.

A much newer development in GeoServer, WPS is only recently available in the core OpenGeo Suite.  Expect more developments from this front in the coming months.

For more information on WPS, please see the OGC site on the Web Processing Service protocol at `<http://www.opengeospatial.org/standards/wps>`_.

REST interface
--------------

GeoServer also has a RESTful API for loading and configuring GeoServer. 

With this interface, one can create scripts (via bash, Python, etc) to batch load any number of files.

Those interested in more information can read the REST section of the GeoServer documentation at http://docs.geoserver.org/stable/en/user/rest/.
