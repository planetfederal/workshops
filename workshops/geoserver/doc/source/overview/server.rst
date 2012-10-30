.. _geoserver.overview.server:

Server Basics
=============

GeoServer is a server of geospatial data through the web.  If you are familiar with how a web server functions, feel free to skip to the next section.  For those used to working only with applications/clients, a brief discussion of what a web server is and how it works may be in order.

Web servers
-----------

A web server is a program that serves content (web pages, images, files, data, etc.) using HTTP (Hypertext Transfer Protocol).  When you use your browser to connect to a website, you contact a web server.  The web server takes the request, interprets it, and returns a response, which the browser renders on the screen.

For example, when you request a web page, your request takes the form of a URL::

   http://example.com/some/path/page.html

The web server looks to its file system, and if that request points to a valid file (if :file:`page.html` exists in :file:`some/path`), the contents of that file will be returned via HTTP.  Usually these calls come from a browser, in which case the result is rendered in the browser.

If is possible to request many different kind of files through HTTP, not just HTML pages::

   http://example.com/some/path/image.jpg
   http://example.com/some/path/archive.zip
   http://example.com/some/path/data.xml

If your browser is configured to display the type of file, it will be displayed, otherwise you will usually be asked to download the file to your host system.

The most popular web servers used today are `Apache HTTP Server <http://httpd.apache.org/>`_ and `Internet Information Services (IIS) <http://www.iis.net/>`_.


Web mapping servers
-------------------

A web mapping server is a specialized subset in the web server model.  Like a web server, requests are sent to the server which are interpreted and responded.

However, a web mapping server utilizes different protocols.  Protocols that can be employed are **Web Map Service (WMS)**, **Web Feature Service (WFS)**, plus many other open and proprietary protocols.  The protocols are designed specifically for the transfer of geographic information, whether it be raw feature data, geographic attributes, or map images.

Some popular web mapping servers:

  * `GeoServer <http://geoserver.org>`_
  * `MapServer <http://mapserver.org>`_
  * `Mapnik <http://mapnik.org>`_
  * `ArcGIS Server <http://www.esri.com/software/arcgis/arcgisserver/index.html>`_

Other web-based map services such as Google Maps have their own server technology as well, but clients have limited access via published APIs.

Data sources
------------

GeoServer can read from many different data sources, from files on the local disk to external databases.  Through the medium of web protocols, GeoServer acts as an abstraction layer, allowing a standard method of serving geospatial data regardless of the source data type.

The following is a list of the most common data formats supported by GeoServer.  This list is by no means exhaustive.

* Files

  * Shapefile
  * GeoTIFF
  * ArcGrid
  * JPEG2000
  * GDAL formats

* Databases

  * PostGIS
  * ArcSDE
  * Oracle Spatial
  * DB2
  * SQL Server

OGC protocols
-------------

GeoServer implements standard open web protocols established by the `Open Geospatial Consortium (OGC) <http://www.opengeospatial.org/>`_), a standards organization.  GeoServer is in fact the reference implementation of the OGC Web Feature Service (WFS) and Web Coverage Service (WCS) standards, and contains as well a high performance certified compliant Web Map Service (WMS).  It is through these protocols that GeoServer can serve data and maps in an efficient and powerful way.

The next sections will give an overview of the two protocols most commonly used by GeoServer.