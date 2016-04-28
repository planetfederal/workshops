.. _geoserver.overview.server:

Server Basics
=============

GeoServer is a server of geospatial data through the web. If you are familiar with how a web server functions, feel free to skip to the next section. For those used to working only with applications/clients, a brief discussion of what a web server is and how it works follows.

Web servers
-----------

A web server is a program that serves content (web pages, images, files, data, etc.) using HTTP (Hypertext Transfer Protocol). When you use your browser to connect to a website, you contact a web server. The web server takes the request, interprets it, and returns a response, which the browser renders on the screen.

For example, when you request a web page, your request takes the form of a URL::

   http://example.com/some/path/page.html

The web server looks to its file system, and if that request points to a valid file (if :file:`page.html` exists in :file:`some/path`), the contents of that file will be returned via HTTP. Usually these calls come from a browser, in which case the result is rendered in the browser.

It is possible to request many different kind of files through HTTP, not just HTML pages::

   http://example.com/some/path/image.jpg

   http://example.com/some/path/archive.zip

   http://example.com/some/path/data.xml

If your browser is configured to display the type of file, it will be displayed, otherwise you will usually be asked to download the file to your host system.

The server need not return a static file. Any valid request on the server will return some kind of response. Many times a client will access an endpoint that will return dynamic content.

The most popular web servers used today are `Apache HTTP Server <http://httpd.apache.org/>`_ and `Internet Information Services (IIS) <http://www.iis.net/>`_.

.. todo:: Image would be nice.

Web mapping servers
-------------------

A web mapping server is a specialized subset of web server. Like a web server, requests are sent to the server which are interpreted and responded. But the requests and responses are designed specifically toward the transfer of geographic information. 

A web mapping server may use HTTP, but employ specialized protocols, such as **Web Map Service (WMS)** and **Web Feature Service (WFS)**. These protocols are designed for the transferring geographic information to and from the server, whether it be raw feature data, geographic attributes, or map images.

Some popular web mapping servers:

* `GeoServer <http://geoserver.org>`_
* `MapServer <http://mapserver.org>`_
* `Mapnik <http://mapnik.org>`_
* `ArcGIS Server <http://www.esri.com/software/arcgis/arcgisserver/>`_

Other web-based map services such as Google Maps have their own server technology and specialized protocols as well. 

.. todo:: Image would be nice.

Data sources
------------

GeoServer can read from many different data sources, from files on the local disk to external databases. Through the medium of web protocols, GeoServer acts as an abstraction layer, allowing a standard method of serving geospatial data regardless of the source data type.

The following is a list of the most common data formats supported by GeoServer. This list is by no means exhaustive.

**Files**:

* Shapefile
* GeoTIFF
* ArcGrid
* JPEG2000
* GDAL formats
* MrSID

**Databases**:

* PostGIS
* ArcSDE
* Oracle Spatial
* DB2
* SQL Server

OGC protocols
-------------

GeoServer implements standard open web protocols established by the `Open Geospatial Consortium (OGC) <http://www.opengeospatial.org/>`_, a standards organization. It is through these protocols that GeoServer can serve data and maps in an efficient and powerful way. GeoServer implements the most common of the OGC protocols:

* Web Feature Service (WFS)
* Web Coverage Service (WCS)
* Web Map Service (WMS)
* Web Processing Service (WPS)
* ...and more

The next sections will give an overview of the two protocols most commonly used by GeoServer.
