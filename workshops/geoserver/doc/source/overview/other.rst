.. _geoserver.overview.other:

Other protocols
===============

While beyond the scope of this workshop, it is worth noting that GeoServer offers limited support for other protocols in addition to :ref:`geoserver.overview.wms` and :ref:`geoserver.overview.wfs`.

Web Coverage Service (WCS)
--------------------------

The Web Coverage Service is a service that enables access to the underlying raster (or "coverage") data.  In a sense, WCS is the raster analog to WFS, where you can access the actual raster data stored on a server.

GeoServer contains full support for WCS versions up to 1.1.1.

For more information on WCS, please see the OGC site on the Web Coverage Service protocol at `<http://www.opengeospatial.org/standards/wcs>`_.

Web Processing Service (WPS)
----------------------------

The Web Processing Service (WPS) is a service for the publishing of geospatial processes, algorithms, and calculations. WPS extends the web mapping server to provide geospatial analysis.  WPS in GeoServer allows for direct integration with other GeoServer services and the data catalog. This means that it is possible to create processes based on data served in GeoServer, including the results of a process to be stored as a new layer. In this way, WPS acts as a full browser-based geospatial analysis tool, capable of reading and writing data from and to GeoServer.

A much newer development in GeoServer, WPS is available only as an extension.  Development continues support for this protocol, though, and eventually support will be added to the standard build.

For more information on WPS, please see the OGC site on the Web Processing Service protocol at `<http://www.opengeospatial.org/standards/wps>`_.
