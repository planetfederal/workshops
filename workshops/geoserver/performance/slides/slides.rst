GeoServer Cartography and Style
===============================

.fx: titleslide

.. image:: ../source/img/geoserver.png

Boundless
---------

Presenter notes
---------------

This is where you can write notes to yourself and only you will be able to see them.


--------------------------------------------------

Outline
=======

#. Installing GeoServer
#. GeoServer web interface
#. Overview
#. Working with data
#. Styling
#. Google Earth

Presenter notes
---------------

* Installing GeoServer—Installation of GeoServer and all other related software.
* GeoServer web interface—A tour of the GeoServer Web Administration Interface.
* Overview—Basic overview of what GeoServer is, including a brief discussion of OGC services.
* Working with data—Load and manage data in GeoServer.
* Styling—Introduction to Styled Layer Descriptor (SLD) and a tour of GeoExplorer, a map browser with graphical style editing capabilities.
* Google Earth—Integrating GeoServer with Google Earth using the GeoServer built-in KML output.

--------------------------------------------------

What is GeoServer?
==================

.. image:: ../doc/source/geoserver.png

GeoServer is an open source software server written in Java that allows users to share and edit geospatial data
---------------------------------------------------------------------------------------------------------------

Presenter notes
---------------

GeoServer is an open source software server written in Java that allows users to share and edit geospatial data. Designed for interoperability, it publishes data from any major spatial data source using open standards.

Being a community-driven project, GeoServer is developed, tested, and supported by a diverse group of individuals and organizations from around the world.

GeoServer is the reference implementation of the Open Geospatial Consortium (OGC) Web Feature Service (WFS) and Web Coverage Service (WCS) standards, as well as a high performance certified compliant Web Map Service (WMS). GeoServer forms a core component of the Geospatial Web.

--------------------------------------------------

Section 1: Installing
=====================

.. image:: ../doc/source/geoserver.png
   :width: 50%

...is a core component of **OpenGeo Suite**.

.. todo:: ../doc/source/install/img/suitelogo.png


Presenter notes
---------------

In this section, we will install GeoServer. For the purposes of this workshop, we will be using the OpenGeo Suite—of which GeoServer is a primary component—in order to facilitate setup and configuration.

The OpenGeo Suite is free and open source, and is available for download from OpenGeo.

--------------------------------------------------

OpenGeo Suite?
==============

.. image:: ../doc/source/install/img/stack_all.png

Presenter notes
---------------

The OpenGeo Suite is a complete web-based geospatial software stack. In this package, the applications contained are:

* PostGIS - A spatially enabled object-relational database.
* GeoServer - A software server for loading and sharing geospatial data.
* GeoWebCache - A tile cache server that accelerates the serving of maps (built into GeoServer).
* GeoExplorer - A web application for composing, styling, and publishing maps.

GeoExplorer is based on the GeoExt framework and contains code from OpenLayers.

--------------------------------------------------

Installation
============

.. image:: ../doc/source/install/img/installation_welcome.png

Presenter notes
---------------

In this section you will install the OpenGeo Suite on your system. This will provide everything necessary to get started with GeoServer (and more!).

GeoServer, being a Java servlet, typically requires a Java Runtime Environment (JRE) as well as a servlet container in order to function. Both a JRE and a servlet container are included with the OpenGeo Suite installation packages, so separate installations of these components are not needed here.

There are many cases where you might want to install the components separately; we'll discuss those a little later on.

--------------------------------------------------

Installation
============

.. image:: ../doc/source/install/img/installation_install.png

Presenter notes
---------------

The OpenGeo Suite installation packages are available for Windows, OS X, various distributions of Linux, and Solaris UNIX. We're using the Windows installers here, but the premise acros the board is pretty much the same, and pretty simple: Run the installer, follow the bouncing ball, choose options, ~done.

--------------------------------------------------

Dashboard
=========

Desktop/web app for managing applications.

.. image:: ../doc/source/install/img/dashboard.png
   :width: 75%

Presenter notes
---------------

The OpenGeo Suite comes with a Dashboard. The Dashboard is launched (semi-)automatically when installation is complete, and otherwise from your Windows, Start menu, (or Spotlight etc. on OS X), (or Task Launcher etc. on Ubuntu).

The Dashboard provides a single interface that allows you to access all components of the OpenGeo Suite, including: links to common tasks, configuration, management, and application logs. The dashboard also provides links to a library of documentation - user guides/manuals from each of the  contributing projects, as well as some OpenGeo-Specific templates, recipies and suggestions for Getting-Started.

The Dashboard runs on the host machine as both a standalone application and in a browser. While both incarnations boast the same set of features, the desktop version might feel a bit more capable, since it can launch external system processes (Start/Shutdown) and applications (PGADMIN). [Note greyed out options].

--------------------------------------------------

Section 2: GeoServer web interface
==================================

Manage GeoServer graphically.

Presenter notes
---------------

GeoServer includes a web-based administration interface. Most GeoServer configuration can be done through this interface, without the need to edit configuration files by hand or use an API.

This section will give a brief overview to the web interface. Subsequent sections will use the web interface in greater detail.

--------------------------------------------------

Tour of the interface
=====================

``http://localhost:8080/geoserver/``

.. image:: ../doc/source/webadmin/img/tour_welcome.png

Presenter notes
---------------

The default location of the GeoServer admin interface is http://localhost:8080/geoserver. The initial page is called the Welcome page.

To return to the Welcome page from anywhere, just click the GeoServer logo in the top left corner of the page.

--------------------------------------------------

Authentication
==============

Default credentials: ``admin`` / ``geoserver``

* Robust security system
* Ability to create custom user accounts and roles

.. image:: ../doc/source/webadmin/img/tour_login.png

Presenter notes
---------------

While the unauthenticated/anonymous Welcome page is not void of features, it really just lets you see things (configured on geoserver) but not touch them (and make configuration changes).

For security reasons, most GeoServer configuration tasks require you to be logged in first. By default, the GeoServer administration credentials are admin and geoserver, although this can and should be changed.

Note: GeoServer has a powerful and robust security system. Access to resources such as layers and configuration can be granularly applied to users and groups as desired. Security is beyond the scope of this workshop, so we will just be using the built-in admin account.

--------------------------------------------------

Authentication
==============

.. image:: ../doc/source/webadmin/img/tour_loggedin.png

Presenter notes
---------------

After logging in, many more options will be displayed.

Use the links on the left side column to manage GeoServer, its services, data, security settings, and more. Also on the main page are direct links to the capabilities documents for each service (WFS, WMS, WCS). We will be using the links on the left under Data—among them Layer Preview, Workspaces, Stores, Layers, Layer Groups, and Styles—very often in this workshop, so it is good to familiarize yourself with their location.

--------------------------------------------------

Layer Preview
=============

View published layers with minimal clicks

.. image:: ../doc/source/webadmin/img/tour_layerpreviewpage.png

Presenter notes
---------------

You can use the Layer Preview link to easily view layers currently being served by GeoServer. The Layer Preview pages includes quick links to viewing layers via OpenLayers along with other services.

    Click the Layer Preview link, located on the left side under Data.

    Preview a few layers by clicking the OpenLayers link next to each layer.

--------------------------------------------------

Layer Preview
=============

View published layers with minimal clicks

.. image:: ../doc/source/webadmin/img/tour_usastates.png

Presenter notes
---------------

Take a look at the contents of the URL bar when viewing an OpenLayers map. We will discuss this request and its parameters further in the Web Map Service (WMS) section.

--------------------------------------------------

Logs
====

View application logs inside the application itself

.. image:: ../doc/source/webadmin/img/tour_logs.png

Presenter notes
---------------

GeoServer displays the contents of the application logs directly through the web interface. Reading the logs can be very helpful when troubleshooting. To view the logs, click on GeoServer Logs on the left under About & Status.

--------------------------------------------------

Bonus exercises
===============

* What is the filesystem path to the GeoServer data directory?
* What version of Java is GeoServer using?

Presenter notes
---------------

The following information can all be gleaned through the GeoServer web admin interface.

--------------------------------------------------

Loading your first data set
===========================

.. image:: ../doc/source/webadmin/img/quickload_importerpage.png

Presenter notes
---------------

There are many ways to load data into GeoServer, and even more configuration options applicable to these data once they are loaded. Oftentimes, all that you want to do is to load a simple shapefile and display it - Quickly~ish. In this section we will go from data to map in the fewest possible steps.

GeoServer with the Layer Importer extension (enabled/installed?) allows user to upload ZIP files that contain geospatial information. The extension will perform all the necessary configurations for publishing the data, including generating a unique style (template) for the layer.

The Layer Importer is currently only available as part of the OpenGeo Suite.

--------------------------------------------------

Loading your first data set
===========================

.. image:: ../doc/source/webadmin/img/quickload_fileselect.png

Presenter notes
---------------

In the data/ directory (that ships with this workshop), you will see a file called meteors.zip. It is a shapefile contained inside an archive (ZIP file). If you double click on the archive, you’ll see that it contains the following suite of files: meteors.shp, meteors.shx, meteors.dbf, meteors.prj

Go back to GeoServer, and navigate to the Layer Importer. This is accessible in the GeoServer web interface by clicking on the Import Data link on the left side of the page.

In the box titled Configure the data source, click Browse ..., and navigate to the location of the archive. Click on the file to select it.

Click Next. Leave all other fields as they are for now.

--------------------------------------------------

Loading your first data set
===========================

.. image:: ../doc/source/webadmin/img/quickload_importerpage2.png

Presenter notes
---------------

On the next page, click Import.

--------------------------------------------------

Loading your first data set
===========================

.. image:: ../doc/source/webadmin/img/quickload_importerdone.png

Presenter notes
---------------

After some processing, you should see a note that says Import completed successfully. Click Go, next to the box that says Layer Preview.

--------------------------------------------------

Loading your first data set
===========================

.. image:: ../doc/source/webadmin/img/quickload_layerpreview.png

Presenter notes
---------------

View the resulting map ...

Use the pan and zoom tools to study the map further. Click on map features to get attribute information.

[[[]]] (Talk about the interface a bit)

[[[]]] (Could we also do this in GeoExplorer a bit more sexily)?

--------------------------------------------------

Loading your first data set
========================

.. image:: ../doc/source/webadmin/img/quickload_layerpreviewdetail.png

Presenter notes
---------------

[Talk about meteors here]

[Talk about what you've done in terms of making your data available to web clients]

[ Look at preview URL / Drop into Layers Listing (?) / Drop into Capabilities Doc (?) ]

[[[]]] - Above might be a bit premature 

[[[]]] - I think it's important that we try to get people jazzed about our easy-publishing story. Even if it's note really that easy, or powerful.

--------------------------------------------------


Section 3: Overview
===================

Basic concepts related to GeoServer and web mapping, including OGC protocols and useful terminology.

Presenter notes
---------------


--------------------------------------------------

Web servers
===========

``http://example.com/some/path/page.html``
``http://example.com/some/path/image.jpg``
``http://example.com/some/path/archive.zip``
``http://example.com/some/path/data.xml``

Presenter notes
---------------

A web server is a program that serves content (web pages, images, files, data, etc.) using HTTP (Hypertext Transfer Protocol). When you use your browser to connect to a website, you contact a web server. The web server takes the request, interprets it, and returns a response, which the browser renders on the screen.

For example, when you request a web page, your request takes the form of a URL:

http://example.com/some/path/page.html

The web server looks to its file system, and if that request points to a valid file (if page.html exists in some/path), the contents of that file will be returned via HTTP. Usually these calls come from a browser, in which case the result is rendered in the browser.

If is possible to request many different kind of files through HTTP, not just HTML pages:

http://example.com/some/path/image.jpg
http://example.com/some/path/archive.zip
http://example.com/some/path/data.xml

If your browser is configured to display the type of file, it will be displayed, otherwise you will usually be asked to download the file to your host system.

The server need not return a static file. Any valid request on the server will return some kind of response. Many times a client will access an endpoint that will return dynamic content.

The most popular web servers used today are Apache HTTP Server and Internet Information Services (IIS).

--------------------------------------------------

Web mapping servers
===================

Like a web server, but designed specifically for conveying geospatial content.

Presenter notes
---------------

A web mapping server is a specialized subset of web server. Like a web server, requests are sent to the server which are interpreted and responded. But the requests and responses are designed specifically toward the transfer of geographic information.

A web mapping server may use HTTP, but employ specialized protocols, such as Web Map Service (WMS), Web Feature Service (WFS). These protocols are designed for the transferring geographic information to and from the server, whether it be raw feature data, geographic attributes, or map images.

Some popular web mapping servers: GeoServer, MapServer, Mapnik, ArcGIS Server

Other web-based map services such as Google Maps have their own server technology and specialized protocols as well.

--------------------------------------------------

Data sources
============

Lots of options

* Files (Shapefile, GeoTIFF, MrSID, ArcGrid, JPEG2000, GDAL formats)
* Databases (PostGIS, ArcSDE, Oracle Spatial, DB2, SQL Server)

Presenter notes
---------------

GeoServer can read from many different data sources, from files on the local disk to external databases. Through the medium of web protocols, GeoServer acts as an abstraction layer, allowing a standard method of serving geospatial data regardless of the source data type.

The following is a list of the most common data formats supported by GeoServer. This list is by no means exhaustive.

--------------------------------------------------

OGC protocols
=============

.. image:: ../doc/source/overview/img/ogclogo.png
   :width: 33%

* Web Feature Service (WFS)
* Web Map Service (WMS)
* Web Coverage Service (WCS)
* Web Processing Service (WPS)
* ...and much more

Presenter notes
---------------

GeoServer implements standard open web protocols established by the Open Geospatial Consortium (OGC), a standards organization. GeoServer is the reference implementation of the OGC Web Feature Service (WFS) and Web Coverage Service (WCS) standards, and contains as well a high performance certified compliant Web Map Service (WMS). It is through these protocols that GeoServer can serve data and maps in an efficient and powerful way.

--------------------------------------------------

Web Map Service
===============

Also known as the "map image"

.. image:: ../doc/source/overview/img/wms.png

Presenter notes
---------------

A fundamental component of the web map (and probably the simplest to understand) is the map image. The Web Map Service (WMS) is a standard protocol for serving georeferenced map images generated by a map server. In short, WMS is a way for a client to request map tiles from a server. The client sends a request to a map server, then the map server generates an image based on parameters passed to the server in the request and finally returns an image.

It is important to note that the source material from which the image is generated need not be an image. The WMS generates an image from whatever source material is requested, which could be vector data, raster data, or a combination of the two.

--------------------------------------------------

Web Map Service
===============

Example GetMap request::

  http://suite.opengeo.org/geoserver/wms?
    service=WMS&
    version=1.3.0&
    request=GetMap&
    layers=usa:states&
    srs=EPSG:4326&
    bbox=24.956,-124.731,49.372,-66.97&
    format=image/png&
    width=780&
    height=330

Presenter notes
---------------

The following is a sample WMS request to a hosted GeoServer instance:

While the full details of the WMS protocol are beyond the scope of this course, a quick scan of this request shows that the following information is being requested:

    Server details (a WMS 1.3.0 request)
    Request type (a WMS GetMap request)
    Layer name (usa:states)
    Projection (EPSG:4326)
    Bounding box (in this case, latitude/longitude coordinates)
    Image properties (600x255 PNG)

--------------------------------------------------

Web Map Service
===============

.. image:: ../doc/source/overview/img/wms-response.png

Presenter notes
---------------

If you paste the full request into a browser, the result would be:

--------------------------------------------------

Web Map Service
===============

Example GetCapabilities request::

  http://suite.opengeo.org/geoserver/wms?
    service=WMS&
    version=1.3.0&
    request=GetCapabilities

Presenter notes
---------------

A WMS request can ask for more than just a map image (the "GetMap" operation). An example of another such request is a request for information about the WMS server itself. The request is called GetCapabilities, and the response is known as the capabilities document. The capabilities document is an XML response that details the supported image formats, projections, and map layers being served by that WMS.

The following is a WMS GetCapabilities request given to the same WMS used above. You can paste this request into a browser to see the result.

--------------------------------------------------

Web Feature Service
===================

Also known as the "map source code"

.. image:: ../doc/source/overview/img/wfs.png

Presenter notes
---------------

A web mapping server can also (when allowed) return the actual geographic data that comprise the map images. One can think of the geographic data as the "source code" of the map. This allows users to create their own maps and applications from the data, convert data between certain formats, and be able to do raw geographic analysis of data. The protocol used to return geographic feature data is called Web Feature Service (WFS).

--------------------------------------------------

Web Feature Service
===================

Example GetFeature request::

  http://suite.opengeo.org/geoserver/wfs?
    SERVICE=wfs&
    VERSION=1.1.0&
    REQUEST=GetFeature&
    TYPENAME=usa:states&
    FEATUREID=states.39

Presenter notes
---------------

The following is a sample WFS request, rendered as a HTTP GET request to a hosted GeoServer instance:

While the details of the WFS protocol are beyond the scope of this course, a quick scan of this request shows that the following information is being requested:

    Server details (WFS 1.1.0 request)
    Request type (GetFeature)
    Layer name (usa:states)
    Feature ID (states.39)

This particular request polls the WFS for a single feature in a layer.

--------------------------------------------------

Web Feature Service
===================

.. image:: ../doc/source/overview/img/wfs-response.png

Presenter notes
---------------

Paste the request into a browser to see the result. The response contains the coordinates for each vertex in the feature in question, along with the attributes associated with this feature. Scroll down to the bottom to see the feature attributes.

While XML is difficult to read, it is easy for computers to parse, which makes WFS responses ideal for use in software. GeoServer offers other output formats as well, such as JSON, CSV, and even a zipped shapefile.

--------------------------------------------------

Web Feature Service
===================

Example GetCapabilities request::

  http://suite.opengeo.org/geoserver/wfs?
    SERVICE=WFS&
    VERSION=1.1.0&
    REQUEST=GetCapabilities

Presenter notes
---------------

A WFS request can ask for much more than just feature data. An example of another such request is to request information about the WFS server. The request is called GetCapabilities, and the response is known as the capabilities document. The capabilities document is an XML response that details the supported data layers, projections, bounding boxes, and functions available on the server.

You can paste this request into a browser to see the result.

--------------------------------------------------

Other OGC protocols
===================

* Web Coverage Service

  * Like Web Feature Service but for rasters

* Web Processing Service

  * Analysis!

Presenter notes
---------------

While beyond the scope of this workshop, it is worth noting that GeoServer offers support for other protocols in addition to Web Map Service (WMS) and Web Feature Service (WFS).

The Web Coverage Service is a service that enables access to the underlying raster (or "coverage") data. In a sense, WCS is the raster analog to WFS, where you can access the actual raster data stored on a server.

GeoServer contains full support for WCS versions up to 1.1.1.

The Web Processing Service (WPS) is a service for the publishing of geospatial processes, algorithms, and calculations. WPS extends the web mapping server to provide geospatial analysis. WPS in GeoServer allows for direct integration with other GeoServer services and the data catalog. This means that it is possible to create processes based on data served in GeoServer, including the results of a process to be stored as a new layer. In this way, WPS acts as a full browser-based geospatial analysis tool, capable of reading and writing data from and to GeoServer.

WPS is currently available as an extension only in GeoServer, but is a core component of the OpenGeo Suite.

--------------------------------------------------

GeoServer concept: Workspace
============================

Notional container for grouping similar data together

.. image:: ../doc/source/overview/img/concepts_workspace.png
   :width: 50%

Presenter notes
---------------

A workspace (sometimes referred to as a namespace) is the name for a notional container for grouping similar data together. It is designed to be a separate, isolated space relating to a certain project. Using workspaces, it is possible to use layers with identical names without conflicts.

Workspaces are usually denoted by a prefix to a layer name or store name. For example, a layer called streets with a workspace prefix called nyc would be referred to by nyc:streets. This would not conflict with another layer called streets in another workspace called dc (dc:streets)

Stores and layers must all have an associated workspace. Styles may optionally be associated with a workspace, but can also be global.

Technically, the name of a workspace is a URI, not the short prefix. A URI is a Uniform Resource Identifier, which is similar to a URL, but does not need to resolve to a web site. In the above example, the full workspace could have been http://nyc in which case the full layer name would be http://nyc:streets. GeoServer intelligently replaces the workspace prefix with the full workspace URI, but it can be useful to know the difference

--------------------------------------------------

GeoServer concept: Store
========================

A container of geographic data (a file/database)

.. image:: ../doc/source/overview/img/concepts_store.png
   :width: 50%

Presenter notes
---------------

A store is the name for a container of geographic data. A store refers to a specific data source, be it a shapefile, database, or any other data source that GeoServer supports.

A store can contain many layers, such as the case of a database that contains many tables. A store can also have a single layer, such as in the case of a shapefile or GeoTIFF. A store must contain at least one layer.

GeoServer saves the connection parameters to each store (the path to the shapefile, credentials to connect to the database). Each store must also be associated with one (and only one) workspace.

A store is sometimes referred to as a "datastore" in the context of vector data, or "coveragestore" in the context of raster (coverage) data.


--------------------------------------------------

GeoServer concept: Layer
========================

A collection of geospatial features or a coverage

.. image:: ../doc/source/overview/img/concepts_layer.png
   :width: 50%

Presenter notes
---------------

A layer (sometimes known as a featuretype) is a collection of geospatial features or a coverage. Typically a layer contains one type of data (points, lines, polygons, raster) and has a single identifiable subject (streets, houses, country boundaries, etc.). A layer corresponds to a table or view from a database, or an individual file.

GeoServer stores information associated with a layer, such as projection information, bounding box, and associated styles. Each layer must be associated with one (and only one) workspace.

--------------------------------------------------

GeoServer concept: Layer group
==============================

A collection of layers (WMS only).

.. image:: ../doc/source/overview/img/concepts_layergroup.png
   :width: 50%

Presenter notes
---------------

A layer group, as its name suggests, is a collection of layers. A layer group makes it possible to request multiple layers with a single WMS request. A layer group contains information about the layers that comprise the layer group, the order in which they are rendered, the projection, associated styles, and more. This information can be different from the defaults for each individual layer.

Layer groups do not respect the concept of workspace, and are relevant only to WMS requests.

--------------------------------------------------

GeoServer concepts
==================

.. image:: ../doc/source/overview/img/concepts.png

Presenter notes
---------------

The following graphic shows the various relationships between workspaces, stores, layers, and layer groups.

--------------------------------------------------

GeoServer concept: Style
========================

Visualization directive for rendering geographic data.

.. image:: ../doc/source/overview/img/wms-response.png

Presenter notes
---------------

A style is a visualization directive for rendering geographic data. A style can contain rules for color, shape, and size, along with logic for styling certain features or points in certain ways based on attributes or scale level.

Every layer must be associated with at least one style. GeoServer recognizes styles in Styled Layer Descriptor (SLD) format. The Styling section will go into this topic in greater detail.

--------------------------------------------------

Section 4: Working with Data
============================

Load and manage data in GeoServer

Presenter notes
---------------

Loading and publishing data is the core of GeoServer. This section will detail how to set up a new project in GeoServer, as well as load data from multiple sources in different ways. After the data is loaded, a layer group will be created.

--------------------------------------------------

Adding a workspace
==================

.. image:: ../doc/source/data/img/workspace_page.png

Presenter notes
---------------

The first step in data loading is usually to create a workspace. This creates a virtual container for your project. Multiple layers from multiple sources can all be contained inside a workspace, with the primary constraint being that each layer name be unique.

    Navigate to the main GeoServer web interface page.
    Click on the Workspaces link on the left column, under Data.
    Click to go to the Workspaces page
    Click on the "Add new workspace" link at the top center of the page.

--------------------------------------------------

Adding a workspace
==================

.. image:: ../doc/source/data/img/workspace_new.png

Presenter notes
---------------

A workspace is comprised of a Name (also sometimes known as a "namespace prefix"), represented by a few characters, and a Namespace URI. These two fields must uniquely identify the workspace. Fill in the following information:

Name: earth
Namespace URI: http://earth
Default workspace: Checked

When done, click Submit.

--------------------------------------------------

Adding a workspace
==================

.. image:: ../doc/source/data/img/workspace_created.png

Presenter notes
---------------

With our new workspace created and ready to be used, we can now start loading our data.

--------------------------------------------------

Publishing a shapefile
======================

.. image:: ../doc/source/data/img/shp_storespage.png

Presenter notes
---------------

Adding a single shapefile to GeoServer is one of the simplest data loading tasks. We encountered this task in the Load your first data set section, but here we will slow down and work through the process manually. To start our discussion of data loading, we will load a shapefile showing the locations and borders of all the world's countries.

All data for this workshop was provided by http://naturalearthdata.com. See the readme file in the data directory of the workshop bundle for details.

First, we need to load a shapefile store. In GeoServer terminology, a shapefile is a store that contains a single layer. (Refer to the GeoServer concepts section if necessary.) We must add the store to GeoServer first before we can publish the layer that the store contains.

    From the GeoServer web interface page, click the Stores link on the left side, under Data.
    Click this link to go to the Stores page
    Click Add new store.

--------------------------------------------------

Publishing a shapefile
======================

.. image:: ../doc/source/data/img/shp_newshppage.png

Presenter notes
---------------

Click Shapefile under Vector Data Sources.

A form will display. Fill out the form with the following information:

Workspace: earth
  Should be already the default

Data Source Name: countries
  Can be anything, but a good idea to match this with the name of the shapefile

Enabled: Checked
  Ensures the layer is published. Unchecking will save configuration information only.

Description: "The countries of the world"
  Layer metadata is recommended but not required

In the box marked URL, type in the full path to the shapefile if known, or click the Browse... button to navigate to the file. The file path may be something like:

C:\Users\<username>\Desktop\geoserver_workshop\data\countries.shp

Be sure to replace <username> with your current user name.

Leave all other fields as their default values.

--------------------------------------------------

Publishing a shapefile
======================

.. image:: ../doc/source/data/img/shp_layerconfig1.png

Presenter notes
---------------

We have loaded the shapefile store, but our layer has yet to be published. We'll do that now.

    On the next screen, a list of layers in the store is displayed. Since we are working with a shapefile, there is only a single layer. Click the Publish link to configure the layer.

    This is the layer configuration page. There are many settings on this page, most of which we don't need to work with now. We will return to some of these settings later.

--------------------------------------------------

Publishing a shapefile
======================

.. image:: ../doc/source/data/img/shp_layerconfig2.png

Presenter notes
---------------

Fill out the form with the following info:

    In the Coordinate Reference System section, set the Declared SRS to EPSG:4326 and set the SRS handling to Force declared. This will ensure that the layer is known to be in latitude/longitude coordinates.
    In the Bounding Boxes section, click the Compute from data and Compute from native bounds links to set the bounding box of the layer.
    When finished, click Save.

--------------------------------------------------

Publishing a shapefile
======================

.. image:: ../doc/source/data/img/shp_openlayers.png

Presenter notes
---------------

Your shapefile is now published with GeoServer. You can now view the layer using the Layer Preview. Click the Layer Preview link.

A list of published layers is displayed. Find the layer in the list, and select OpenLayers in the select box if it isn't already selected. Click the Go link next to the select box.

Note: Lists in GeoServer are paged at 25 items at a time. If you can't find the layer, you may need to click the [2] or [>] buttons. Alternately, type "earth" in the search box at the top to narrow the list.

A new tab in your browser will open up, showing your layer inside an OpenLayers application. You can use your mouse to zoom and pan, and can also click the features in the window to display attribute information.

If you're wondering where the style/color of the layer is coming from, this will be discussed in the upcoming Styling section.

--------------------------------------------------

Publishing a GeoTIFF
====================

.. image:: ../doc/source/data/img/tif_newtifstore.png

Presenter notes
---------------

GeoServer can also publish raster imagery. This could be simple georeferenced images (such as Blue Marble imagery), multi-band DEM (digital elevation model) data, or many other options. In this section, we will load a simple GeoTIFF containing a shaded relief of land area. The layer contains standard tri-band RGB values (0-255).

The procedure for adding a store for a GeoTIFF is very similar to that of a shapefile. A GeoTIFF, like a shapefile, is a store that contains a single layer.

    From the GeoServer web interface page, click on the Stores link on the left side, under Data.
    Click on Add new store.
    Select GeoTIFF under Raster Data Sources.

--------------------------------------------------

Publishing a GeoTIFF
====================

.. image:: ../doc/source/data/img/tif_newtifpage.png

Presenter notes
---------------

Fill out the following form:

Workspace: earth
  Should be already the default
Data Source Name: shadedrelief
  Can be anything, but a good idea to match this with the name of the shapefile
Enabled: Checked
  Ensures the layer is published. Unchecking will save configuration information only.
Description: "Shaded relief of the world"
  Layer metadata is recommended but not required

In the box marked URL, type in the full path to the shapefile if known, or click the Browse... button to navigate to the file. The file path may be something like:

C:\Users\<username>\Desktop\geoserver_workshop\data\shadedrelief.tif

Be sure to replace <username> with your user name.

--------------------------------------------------

Publishing a GeoTIFF
====================

.. image:: ../doc/source/data/img/tif_newlayerconfig1.png

Presenter notes
---------------

As with the shapefile, now that store is loaded, we now need to configure and publish the layer itself.

    On the next screen, a list of layers in the store is displayed. Since we are working with a GeoTIFF, there is only a single layer. Click the Publish link to configure the layer.

    This is the layer configuration page. There are many settings on this page, most of which we don't need to work with just now. We will return to some of these settings later.

--------------------------------------------------

Publishing a GeoTIFF
====================

.. image:: ../doc/source/data/img/tif_newlayerconfig2.png

Presenter notes
---------------

Fill out the form with the following info:
    In the Coordinate Reference System section, set the Declared SRS to EPSG:4326 and set the SRS handling to Force declared. This will ensure that the layer is known to be in latitude/longitude coordinates.
    In the Bounding Boxes section, click the Compute from data and Compute from native bounds links to set the bounding box of the layer.
    When finished, click Save.

--------------------------------------------------

Publishing a GeoTIFF
====================

.. image:: ../doc/source/data/img/tif_openlayers.png

Presenter notes
---------------

Your GeoTIFF is now published in GeoServer. You can now view the layer using the Layer Preview as in previous sections. Clicking on the map will display the RGB values for that particular point.

--------------------------------------------------

Loading multiple layers
=======================

Using the Layer Importer

.. image:: ../doc/source/data/img/importer_directory.png

Presenter notes
---------------

So far we have seen a few different ways to load data into GeoServer. In the Load your first data set section, we used the Layer Importer to load an archive of a shapefile. The Layer Importer can also be used to load multiple layers as well, saving time and configuration.

In this section, we will load the rest of our workshop data by using the Layer Importer to load and configure all shapefiles in our workshop data directory.

Navigate to the Layer Importer. This is accessible in the GeoServer web interface by clicking on the Import Data link on the left side of the page.

On the next page, in the section titled Choose a data source to import from, select Shapefiles if it isn't already selected.

In the section titled Configure the data source, type in the full path to the data, or click the Browse... button to navigate to the directory. The path may look something like:

C:\Users\<username>\Desktop\geoserver_workshop\data\

Be sure to replace <username> with your user name.

In the section titled Specify the target for the import, select earth for the Workspace (if it isn't already selected), and select Create new for the Store.

Click Next to continue.

--------------------------------------------------

Loading multiple layers
=======================

.. image:: ../doc/source/data/img/importer_select.png

Presenter notes
---------------

You will see a list of shapefiles contained in that directory. Make sure to uncheck the ``countries`` and ``shadedrelief`` layers! Failure to do this will cause GeoServer to try to load a layer with the same name as one already loaded ("earth:countries" and earth:shadedrelief). While this won't cause an error, it may cause confusion later on in the workshop.

All layers should say Ready for import. Click Import Data to create/configure a store with each of these shapefiles as layers.

Note: If there are any issues with the shapefiles such as a lack of projection information, they will be displayed here.


--------------------------------------------------

Loading multiple layers
=======================

.. image:: ../doc/source/data/img/importer_results.png

Presenter notes
---------------

    To preview these layers, select OpenLayers in the select box next to a layer and click Go. Alternately, you can use the standard Layer Preview. As you view the layers, you'll see that the Layer Importer has generated unique styles for each layer, instead of reusing default GeoServer styles.

All of our layers are now loaded into GeoServer.

--------------------------------------------------

Bonus: REST
===========

* GeoServer catalog operations are scriptable
* Use bash, PHP, etc.
* Load, configure, delete resources
* See http://docs.geoserver.org/stable/en/user/rest/

Presenter notes
---------------

GeoServer also has a full RESTful API for loading and configuring GeoServer. With this interface, one can create scripts (via bash, PHP, etc) to batch load and configure any number of files.

The REST interface is beyond the scope of an introductory workshop, but those interested can read the REST section of the GeoServer documentation at http://docs.geoserver.org/stable/en/user/rest/.

--------------------------------------------------

Creating a layer group
======================

.. image:: ../doc/source/data/img/layergroup_page.png

Presenter notes
---------------

A layer group, as its name suggests, is a group of layers that acts as a single layer. This is useful when creating a "base map", or other situations when more than one separate layer needs to be requested simultaneously or frequently. Since layers typically contain only a single type of geometry, using a layer group also allows you to combine data types in one single WMS request.

Take care not to get confused between a workspace, which is a notional grouping of layers (think "container"), and a layer group, which is a group of layers for WMS requests (think "image group"). Refer to the GeoServer concepts section for more information.

In the previous sections, we loaded and published a few layers. Now we'll use a layer group to combine them.

--------------------------------------------------

Creating a layer group
======================

.. image:: ../doc/source/data/img/layergroup_new.png

Presenter notes
---------------

Fill out the following form:

    In the Name field, enter earthmap.

    In the Workspace field, enter earth.

    Skip the Bounds section for now.

    Now we will add layers to our layer group. Click the Add Layer... link.

    Select each of the following layers so that they appear in this order:
        earth:shadedrelief
        earth:ocean
        earth:countries
        earth:cities

Layer order is important. The top layer in the list will be drawn first, the bottom last. Make sure to match the order of the above list. Reorder the layers if necessary by clicking on the Position arrows for each layer.

Note: It will be much easier to use the search box to narrow down the list.

Check the Default style box for every layer.

Now go back to the Bounds section and click the Generate Bounds button. This will determine the bounding box for the entire layer group. This is why we waited to do this until all layers were added to the layer group.

Leave all other areas as their defaults for now. The form should look like this:


--------------------------------------------------

Creating a layer group
======================

.. image:: ../doc/source/data/img/layergroup_openlayers.png

Presenter notes
---------------

Scroll down to the bottom of the page and click Save.

Preview the layer by going to the Layer Preview.

Even though the Layer Importer generated unique styles for each layer, this layer group doesn't look very nice. The following section will discuss the next important step of making maps: styling.

--------------------------------------------------

Section 5: Styling
==================

GeoServer can render geospatial data as images and return them for viewing in a browser. This is the heart of WMS. However, geospatial data has no inherent visualization. Therefore additional information, in the form of a style, needs to be applied to data in order to visualize it.

Presenter notes
---------------

We have already seen automatic/generic styles in action with the layers loaded in previous sections. In this section we will discuss how those styles are generated.

GeoServer uses the Styled Layer Descriptor (SLD) markup language to apply cartographic effects to geospatial data. We will first explain basic SLD syntax and then show how to create and edit styles manually in GeoServer. Finally, we will introduce GeoExplorer, a browser-based apllication that contains a graphical style editor.

--------------------------------------------------

Viewing an SLD
==============

.. image:: ../doc/source/styling/img/sld_pointedit.png

Presenter notes
---------------

GeoServer saves SLD information as plain text files in its data directory. You can edit them in place, but styles can be retrieved and managed more easily through the GeoServer web admin interface.

    Click the Styles link under Data on the left side of the page.

    Click the entry in the list called point.

    This brings up the Style Editor for this particular style. While we won't be editing this style, but take a look at it and refer back to it through the next few sections.

--------------------------------------------------

SLD structure
=============

* Header

  * FeatureTypeStyles

    * Rules

      * Symbolizers

Presenter notes
---------------

The header of the SLD contains metadata about XML namespaces, and is usually identical among different SLDs. The details of the header are beyond the scope of this workshop.

Notice the <FeatureTypeStyle> block towards the top of the document ...

A FeatureTypeStyle is a group of styling rules. (Recall that a featuretype is another word for a layer.) Grouping by FeatureTypeStyle affects rendering order; the first FeatureTypeStyle will be rendered first, followed by the second, etc, allowing for precise control over the order in which our styling effects are applied.

Within a <FeatureTypeStyle>, notice the <Rule> tag ...

A Rule is a single styling directive. It can apply globally to a layer, or it can have logic associated with it so that the rule is conditionally applied. These conditions can be based on the properties of the data or based on the scale (~zoom-level) of the map being rendered.

Within a <Rule>, you'll find one or more <~Symbolizer> tags ...

A Symbolizer is the actual style instruction. There are five types of symbolizers: PointSymbolizer, LineSymbolizer, PolygonSymbolizer, RasterSymbolizer, TextSymbolizer

There can be one or more FeatureTypeStyles per SLD, one or more Rules per FeatureTypeStyles, and one or more Symbolizers per Rule.

[ Note nesting / tag balance/syntax ]

--------------------------------------------------

Simple SLD
==========

::

    ...
      <FeatureTypeStyle>
        <Rule>
          <PointSymbolizer>
            <Graphic>
              <Mark>
                <WellKnownName>circle</WellKnownName>
                <Fill>
                  <CssParameter name="fill">#FF0000</CssParameter>
                </Fill>
              </Mark>
              <Size>6</Size>
            </Graphic>
          </PointSymbolizer>
        </Rule>
      </FeatureTypeStyle>
    ...

Presenter notes
---------------

The first lines are the header, which contain XML namespace information, as well as the Name and Title of the SLD. The actual styling happens inside the <FeatureTypeStyle> tag , of which there is only one in this example. The tag contains one <Rule> and the rule contains one symbolizer, a <PointSymbolizer>. The symbolizer directive creates a graphic mark of a "well known name", in this case a circle. This shape has a <Fill> parameter of #FF0000, which is an RGB color code for 100% red. The shape also has a <Size> of 6, which is the diameter of the circle in pixels.

--------------------------------------------------

Simple SLD
==========

.. image:: ../doc/source/styling/img/sld_simplestyle.png
   :width: 150%

Presenter notes
---------------

When applied to a hypothetical layer, the result would look like this:

--------------------------------------------------

Another SLD example
===================

::

        <Rule>
          <Name>SmallPop</Name>
          <Title>1 to 50000</Title>
          <ogc:Filter>
            <ogc:PropertyIsLessThan>
              <ogc:PropertyName>pop</ogc:PropertyName>
              <ogc:Literal>50000</ogc:Literal>
            </ogc:PropertyIsLessThan>
          </ogc:Filter>
          <PointSymbolizer>
            <Graphic>
              <Mark>
                <WellKnownName>circle</WellKnownName>
                <Fill>
                  <CssParameter name="fill">#0033CC</CssParameter>
                </Fill>
              </Mark>
              <Size>8</Size>
            </Graphic>
          </PointSymbolizer>
        </Rule>


Presenter notes
---------------

Here is an example of an SLD that includes attribute-based styling. The SLD also contains three rules. Each rule has an attribute-based condition.

For each featur in the layer, agreement with one of these conditions determines the size of the shape being rendered.

The attribute in question is called "pop", and the three rules are "less than 50000", "50000 to 100000", and "greater than 100000". The result is a blue circle with a size of 8, 12, of 16 pixels, depending on the rule.

[First rule only showed]

Looking at the first rule (lines 13-33), there is a filter tag (<ogc:Filter>). This filter specifies that if the attribute value of pop for a given feature is less than 50000, then the condition is true and the feature is displayed.

--------------------------------------------------

Another SLD example
===================

.. image:: ../doc/source/styling/img/sld_intermediatestyle.png
   :width: 150%

Presenter notes
---------------

When applied to a hypothetical layer, the result would look like this:

The GeoServer documentation (available at http://docs.geoserver.org) contains a collection of styles called the SLD Cookbook, designed for those wishing to learn SLD, or those who want a quick reference. The SLD Cookbook is available at http://docs.geoserver.org/stable/en/user/styling/sld-cookbook/. The above SLD examples were taken from the SLD Cookbook.

--------------------------------------------------

Viewing an existing style
=========================

.. image:: ../doc/source/data/img/shp_openlayers.png

Presenter notes
---------------

Every layer published in GeoServer must have a style associated with it. When manually loading layers as done in the Publishing a shapefile and Publishing a GeoTIFF sections, GeoServer will look at the geometry of the data and assign a generic style based on that data type. When using the Layer Importer, a unique style will be generated for each layer. We will now look at how GeoServer handles styles.

    [[[]]] WARNING - Window Juggling ahead, we could streamline these instructions

    Navigate to the Layer list. Select a layer from the list of published layers. (This example will use earth:countries, but any layer will do.)

    Preview the layer to see its visualization by navigating to the Layer Preview, then clicking on the OpenLayers link next to that layer.

--------------------------------------------------

Viewing an existing style
=========================

.. image:: ../doc/source/styling/img/styles_publishingtab.png

Presenter notes
---------------

Leave this preview window open and open up a new browser tab. In the new tab, navigate back to the main GeoServer web interface page.

In order to view the SLD for this layer, we need to find out which style is associated with this layer. To do this, click on Layers under Data on the left side of the page, then click on the Layer Name link of countries.

You are now back at the layer configuration page. Notice there are four tabs on this page, Data (the default), Publishing, Dimensions, and Tile Caching. Click on the Publishing tab, then scroll down to the entry that says Default Styles. Make a note of the name of the style. (In the case of earth:countries the name of the style is called polygon.)

--------------------------------------------------

Viewing an existing style
=========================

.. image:: ../doc/source/styling/img/styles_view.png

Presenter notes
---------------

Now that we know the name of the style, we can view the style's code. Click on the Styles link, under Data on the left side of the page.

Click on the style name determined in the previous step.

A text-like editor will open up, displaying the SLD code for this style.

--------------------------------------------------

Editing an existing style
=========================

.. image:: ../doc/source/styling/img/styles_view.png

.. image:: ../doc/source/styling/img/styles_validated.png

Presenter notes
---------------

It is helpful when learning about SLD to edit existing styles (or copies of existing styles!) rather than creating new ones from scratch. We will now do this with the style that was just opened.

    Make a change to an RGB color value in a <CssParameter> value. For example, find the line that starts with <CssParameter name="fill"> and change the HEX colour code to #0000ff (blue).

    When done, click Validate to make sure that the changes you have made are valid. If you receive an error, go back and check your work.

	Click Submit to commit the style change.


--------------------------------------------------

Editing an existing style
=========================

.. image:: ../doc/source/styling/img/styles_edited.png

Presenter notes
---------------

Now, go back to the browser tab that contains the OpenLayers preview map. Refresh the page (Ctrl-R / F5 / etc), and you should see the color change to blue (or your own new HEX colour).

--------------------------------------------------

Loading new styles
==================

.. image:: ../doc/source/styling/img/styles_page.png

Presenter notes
---------------

Often, you might have an SLD saved as a text file (downloaded, in-house, external application, etc.)

If this si the case, it is easy to load it into GeoServer. We will now load the saved styles provided in the workshop styles folder.

    Navigate back to the Styles page by clicking on Styles under Data on the left side of the page.

    Click on Add a new style.

--------------------------------------------------

Loading new styles
==================

.. image:: ../doc/source/styling/img/styles_new.png

Presenter notes
---------------

A blank text editor will open.

At the very bottom of the page, below the text editor, there is a box titled SLD file. Click Browse ... to navigate to, and select your SLD file.

Select cities.sld

Note: If you're having trouble finding it, recall that the SLD files are in the styles sub-directory of the workshop.

Click the Upload ... link to load this SLD into GeoServer. The SLD will display in the text editor, and the name of the style will be automatically populated (from the contents of the SLD file).

--------------------------------------------------

Loading new styles
==================

.. image:: ../doc/source/styling/img/styles_displaysld.png

Presenter notes
---------------

Click Validate to confirm that the SLD is valid. (As-is, it really should be!)

Click Submit to save the new style.

Repeat steps 2-8 above with the two other SLD files in the the styles directory:

    countries.sld
    ocean.sld

We will leave the shadedrelief layer with the default style.

--------------------------------------------------

Associating styles with layers
==============================

.. image:: ../doc/source/styling/img/styles_selectingnewstyle.png

Presenter notes
---------------

Once the styles are loaded, they are merely stored in GeoServer - They are available, but not associated with any layers. (Don't let their namesakes fool you).

Our next step is to link the styles with corresponding layers.

Warning: If an SLD has references that are specific to a certain layer (for example, attribute names or geometries), associating that style with another layer may cause unexpected behavior or errors.

    Navigate to the Layers page by clicking on Layers under Data on the left side of the page.

    Click on the earth:cities layer to edit its configuration.

    Click on the Publishing tab.

    Scroll down to the Default style drop down list. Select the option to display the cities style. you should see that the legend changes.

--------------------------------------------------

Associating styles with layers
==============================

.. image:: ../doc/source/styling/img/styles_viewingnewstyle.png
   :width: 75%

Presenter notes
---------------

Click Save to commit the change.

Verify the change by going to the layer's Layer Preview page. Zoom in the see the behavior change based on zoom level.

Repeat steps 2-6 for the earth:countries and earth:ocean layers, associating each with the appropriate uploaded style (countries and ocean respectively). View each result in the Layer Preview.

--------------------------------------------------

Error in the ocean
==================

Why doesn't the ocean layer display?

.. image:: ../doc/source/styling/img/styling_blankolmap.png

Presenter notes
---------------

BOOM! 

At this point, the earth:ocean layer won't display properly. Let's look at the SLD and see if we can figure out why not? The next section will explain.

--------------------------------------------------

External graphics...
====================

.. image:: ../doc/source/styling/img/styles_externalgraphic.png

Presenter notes
---------------

In addition to drawing circles, squares, and other standard shapes, SLD files have the ability to link to (external) graphics.

The earth:ocean style uses an ocean-themed graphic that is directed to be tiled throughout the layer.

It is possible for the SLD to use a full URL that references an online resource. However, in practice that can become a bandwidth-intensive task for a server. In most cases, it makes sense to store the asset file referenced in the SLD locally.

If you look at the ocean.sld file, you will see that an image is referenced, but that that reference contains no path information. This means that GeoServer will expect the graphic to be in the same directory as the SLD itself. In order for the layer to display properly, we will need to copy that file manually into the right location (adjacent to the SLD).

--------------------------------------------------

...and the data directory
=========================

.. image:: ../doc/source/styling/img/styles_datadirectory.png

Presenter notes
---------------

The styles directory of the workshop materials contains a file, oceantile.png. We want to copy this file to the GeoServer styles repository, contained in the GeoServer data directory. In the OpenGeo Suite, the easiest way to get to the GeoServer Data Directory is go to the Start Menu and navigate to Start ‣ Programs ‣ OpenGeo Suite ‣ GeoServer Data Directory.

Note: You can find the full path to the data directory by clicking Server Status on the left side of any GeoServer page.

In that directory, navigate into the styles folder. You should see the ocean.sld and all of the other SLD files created.

Copy the file oceantile.png into the styles directory.

--------------------------------------------------

External graphics
=================

.. image:: ../doc/source/styling/img/styles_tiledgraphic.png

Presenter notes
---------------

Now back in the browser, navigate to the Layer Preview for the earth:ocean layer. If you copied the file correctly, you should see a ocean-like graphic tiled in the appropriate places now.

[[[]]] Note advanced uses of external graphics ... Can be applied to points / lines/poly Beyond this workshop,

--------------------------------------------------

Revisiting the layer group
==========================

.. image:: ../doc/source/styling/img/styles_layergrouppreviewzoom.png

Presenter notes
---------------

When all of your styles are associated with your layers, view the earthmap layer group once more by going to Layer Preview. It should look quite different now.

If for some reason, the layer group fails to update with the new styles, go back the Layer Group page and verify that the Default Style box is checked for every layer.

--------------------------------------------------

GeoExplorer
===========

Don't create those SLDs by hand!

GeoExplorer includes a graphical styling editor.

Presenter notes
---------------

Creating SLD files by hand can be a difficult and time-consuming process. 

The SLDs we looked at previously were quite simple, but complexity (and length)can increase quite quickly when we start working with complex rules and/or compound symbolizers.

Fortunately, there is a tool called GeoExplorer which offers a graphical style editor. With GeoExplorer, you can create rules and symbolizers without ever needing to view SLD code.

Note: GeoExplorer currently implements most but not all of the features of the SLD specification.

--------------------------------------------------

GeoExplorer
===========

.. image:: ../doc/source/styling/img/geoexplorer.png

Presenter notes
---------------

Launch GeoExplorer. By default, GeoExplorer is located at http://localhost:8080/geoexplorer.

By default, the only layer that displays is a MapQuest OpenStreetMap layer. 

Click the Add layers button (the green circle with the white plus) towards the top left of the screen and then select Add layers.

--------------------------------------------------

GeoExplorer
===========

.. image:: ../doc/source/styling/img/gx_addlayersdialog.png

Presenter notes
---------------

In the resulting Available Layers dialog, select the four layers used in this workshop (not the earthmap layer group) and click Add layers. To select multiple layers at once, hold the CTRL (or CMD) key while clicking on the layer.

Note: Among large lists of layers, it may be easier to find the layers of interest by clicking the ID column header to sort by workspace.

--------------------------------------------------

GeoExplorer
===========

.. image:: ../doc/source/styling/img/gx_layersadded.png

Presenter notes
---------------

When you have added all of your layers, click Done to return to the main map. 

The check-boxes control, or toggle, which layers are visible (not unlike other applications, checked = visible / unchecked = not displayed)

The order of the layers determines the rendering order

The layer list also contains an in-line legend for each layer, which is a compilation of all the rules in the styles of the visible layer.

Finally, notably, the bulk of the window is taken up by the map itself.

Note: Layer groups, being a compilation of layers (each with their own style)  cannot be styled with GeoExplorer. You need to access and edit the style on each member layer of the group. When you edit (and SAVE) the style of a layer that is contained in a layer group, the layer group will reflect the change.

--------------------------------------------------

GeoExplorer
===========

.. image:: ../doc/source/styling/img/gx_layersreordered.png

Presenter notes
---------------

When they're added to the map, our earth layers may not be in the correct order. To reorder layers in GeoExplorer, click to select a layer and drag it into its new postition in "the stack". A suitable order for our layers (from top to bottom) would be:

    cities, countries, ocean, shadedrelief

Finally, select None under the Base Maps list. The map should now look identical to the layer group.

--------------------------------------------------

Editing an existing style
=========================

Click to log in, and then enter credentials:

.. image:: ../doc/source/styling/img/gx_loginbutton.png
   :width: 40%

.. todo:: ../doc/source/styling/img/gx_logindialog.png

Presenter notes
---------------

If you edit styles in GeoExplorer, it makes changes directly to the underlying SLD in GeoServer. An SLD file may look very different after being edited by GeoExplorer, so it is always a good idea to make a back-up copy of your SLDs before using GeoExplorer to edit them.

 Before we can make any changes to styles, we have to log in to GeoExplorer. (They should currently be disabled ...). Click the login button at the very top right of the window and enter your GeoServer admin credentials: admin / geoserver .

--------------------------------------------------

Editing an existing style
=========================

.. image:: ../doc/source/styling/img/gx_listofrules.png

Presenter notes
---------------

Once you're logged in, the style editor, among other tools, will be enabled. 

Select the countries layer by single clicking on it in the layer list. Then 
click on the Change Styles (palette) icon right above the layer list to Edit Styles.

Note: If the icon is disabled, make sure that you have logged in successfully and that you have selected the correct layer.

Click on the first rule and then click Edit.

Note: You can also invoke the Style Editor on a given layer throught the right-click (context) menu.

--------------------------------------------------

Editing an existing style
=========================

.. image:: ../doc/source/styling/img/gx_editrulebefore.png

Presenter notes
---------------

The style rule editor will display.

Make some changes to the rule and see how it updates in real-time. As a suggestion, change the Fill Color by clicking on the color box and selecting a new color.

--------------------------------------------------

Editing an existing style
=========================

.. image:: ../doc/source/styling/img/gx_editruleafter.png

Presenter notes
---------------

Finally, click Save to persist your changes.

--------------------------------------------------

Editing an existing style
=========================

Now take a look at the SLD code that GeoExplorer has created. Navigate back to GeoServer, to the Styles menu, and then to the countries style to view it.

Presenter notes
---------------

.. image:: ../doc/source/styling/img/gx_verify.png

--------------------------------------------------

Bonus exercises
===============

* Add a new rule that displays the label of the country. Don't worry about label placement.
* Hint: The attribute to display is called NAME. But if you didn't know this, how would you find it out?

* How might we go about creating an attribute-based classification to draw features within a layer differently based on those features' properties?
* Hint: Check out the Advanced tab. What else do we see in there?

Presenter notes
---------------

Answer1: GetFeatureInfo
Answer2:
- Limit by Condition (and a suitable set of operators and comparators)
- Limit by Scale ... 

--------------------------------------------------

Section 6: Google Earth
=======================

Google Earth is a powerful 3D map viewer. GeoServer integrates with Google Earth by providing native KML output, allowing any layer served by GeoServer to be loaded into Google Earth.

Presenter notes
---------------

Google Earth is a powerful 3D map viewer. GeoServer integrates with Google Earth by providing native KML output, allowing any layer served by GeoServer to be loaded into Google Earth. In addition, there are additional visualization features that are made possible through Google Earth, such as legends, filters, and extrudes.

In this section, you will see how Google Earth can be used as a client for viewing and interacting with GeoServer.

--------------------------------------------------

Viewing layers
==============

.. image:: ../doc/source/googleearth/img/view_preview.png

Presenter notes
---------------

GeoServer natively outputs data in KML format. This is the markup language that is used by Google Maps and Google Earth. In this way, it is easy to convert shapefiles or any geospatial data to a format that Google services understand.

There are two ways to view data in Google Earth. The first is by statically loading a KML file. The second is by using a Network Link and connecting to a KML stream. We will show both.

    Navigate to the Layer Preview .

    Find the earth:countries layer and select Google Earth in its View menu. Click Go.

--------------------------------------------------

Viewing layers
==============

.. image:: ../doc/source/googleearth/img/view_layer.png

Presenter notes
---------------

You will be asked to download a file. Select Open with Google Earth and click OK.

Note: A KMZ file is a KML file compressed into an archive.

The layer will open in Google Earth.

--------------------------------------------------

Viewing layers
==============

.. image:: ../doc/source/googleearth/img/view_placemark.png

Presenter notes
---------------

Click on one of the layer's points to view its placemark description.

It is possible to customize this placemark description through GeoServer, including adding custom HTML.

--------------------------------------------------

Network Link
============

.. image:: ../doc/source/googleearth/img/view_addnetworklink.png

Presenter notes
---------------

Now we will connect Google Earth to a GeoServer KML stream via a Network Link. This allows for the view in Google Earth to be dynamically updated.

Remove the entry called countries.kmz in the Places list by right-clicking and selecting Delete.

Add a new Network Link by navigating to the Add menu and selecting Network Link.

In the dialog that appears, enter "Countries" in the Name field.

In the Link field, enter the following URL:

http://localhost:8080/geoserver/wms/kml?layers=earth:countries

Note: This is the same target for the Layer Preview Go URL above.

Click OK when done.

The output should be the same as before. The difference is that a Network Link is dynamic, which means that we can alter the stream and refresh the view without having to export a new KML file. We'll put this to use in the next section.

--------------------------------------------------

Displaying a legend
===================

.. image:: ../doc/source/googleearth/img/legend_link.png

Presenter notes
---------------

When viewing data with a thematic style a legend is very helpful. We'll now add a legend to our map of cities.

    Edit the existing Network Link for the Countries by right-clicking on the entry in the Places list and selecting Properties. This will return you to the original dialog where the Network Link was created.

    Append the parameter &legend=true to the end of the Network Link URL.

Click OK when done.

--------------------------------------------------

Displaying a legend
===================

.. image:: ../doc/source/googleearth/img/legend_view.png

.. image:: ../doc/source/googleearth/img/legend_sldtitle.png

Presenter notes
---------------

The legend is generated from the <Title> tags inside the SLD that the layer is using. You can verify this by opening up the cities.sld in a text editor, or from within GeoServer. In this case, the rules in the SLD are based on colors used to better distinguish countries on the map.

--------------------------------------------------

Displaying a legend
===================

.. image:: ../doc/source/googleearth/img/legend_sldtitle.png

Presenter notes
---------------

--------------------------------------------------

Filtering layers
================

``&cql_filter=POP_EST > '100000000'``

.. image:: ../doc/source/googleearth/img/filter_pop.png

Presenter notes
---------------

Often a layer contains too much information and it is desirable to filter what is displayed. In this section we will filter a KML stream coming from GeoServer using CQL.

The cql_filter parameter is a way to specify a predicate based on attribute values or spatial orientation. Let's single out only countries that have populations of one hundred million or more.

    Edit the Network Link as in the previous section. Append the following parameter to the end of the Network Link:

    &cql_filter=POP_EST > '100000000'

    Click OK when done.

You will see that only the countries that have populations greater than one hundred million are displayed. In the case of South America, only Brazil's feature is shown. All other country features are not shown as part of the layer.



--------------------------------------------------

Bonus: Filtering
================

* Create a filter that displays only your favorite country. (Hint: Use the ``Name`` attribute)
* Use a CQL filter to display all of the countries that start with an "S". (Hint: ``%`` is a wildcard)

Presenter notes
---------------

In CQL you can also match strings using the "LIKE" operator. Create a filter that displays only your favorite country. (Hint: Use the "NAME" attribute.)
When using LIKE in CQL, you have ability to add the "%" as a wildcard to the request. Use a CQL filter to display all of the countries that start with an "S".

--------------------------------------------------

Raster and vector display
=========================

* Also known as "scoring" or "kmscore"
* Raster or vector determined by how much data is displayed

Presenter notes
---------------

Google Earth's rendering of GeoServer features can take one of two forms: raster or vector output.

Raster output is like a WMS response wrapped over top of the globe. It requires much less throughput to generate the display, but provide much less interactivity. On the other hand, vector output is like a WFS response rendered over the globe. You get the entire feature's geometry, which requires much more bandwidth, but allows for more interactivity.

The determination to display raster or vector data is made by Google Earth depending on the number of features displayed on screen at any given time. You can see this by zooming out very far, waiting a few seconds for the display to update, and then zooming in very close. You will notice subtle differences in the way that the features are rendered.

--------------------------------------------------

Raster and vector display
=========================

Too many features = raster display

.. image:: ../doc/source/googleearth/img/score_zoomoutraster.png

Presenter notes
---------------

The raster-versus-vector determination is called scoring. The score itself is known as the kmscore. The kmscore is a value between 0 and 100, where 0 means "force raster" and 100 means "force vector". The values in between use a abstruse formula, and in general it is perhaps best to try out a few values to see how performant your display is. The default is 50.

Since we have a small number of features here, we want to force vector display. To do this, we are going to set a kmscore of 100.

    Edit the Network Link as in the previous sections.

    Remove the cql_filter parameter and append &kmscore=100 to the end of the request. Click OK when done.

--------------------------------------------------

Raster and vector display
=========================

Forced vector display

.. image:: ../doc/source/googleearth/img/score_zoomoutvector.png

Presenter notes
---------------

Now zoom out very far. Notice that the features remain in vector form. The way to test this is to click on a feature. If the placemark displays, then the feature was drawn as a vector.

--------------------------------------------------

Extrudes
========

* 2.5D display (features with height)
* Formula for determining height of features saved in data directory

Presenter notes
---------------

Google Earth has the ability to draw extruded features. This is a technical way of saying that it can draw features with "height" such that they appear floating in the air above the globe as opposed to "clamped" to it.

GeoServer can send information to Google Earth on how to draw extrudes based on a template saved in the GeoServer data directory.

Recall from the section on External graphics and the data directory that the GeoServer data directory is where the catalog and settings of GeoServer are stored. We will create a height template and save it in the data directory

Note: These templates are known as Freemark templates, named after the template engine used. See the Freemarker homepage for more information.


--------------------------------------------------

Extrudes
========

``${POP_EST.value}``

Save as ``<data_dir>\workspaces\earth\countries\countries\height.ftl``

Presenter notes
---------------

Open up a text editor and type in the following text:

${POP_EST.value}

This will set the height of a feature to be equal to the value of the POP_EST attribute, which is the population of the country.

Save this file as height.ftl and save it in the GeoServer Data Directory at:

<data_dir>\workspaces\earth\countries\countries\height.ftl

This location will associate this template with this particular layer only.


--------------------------------------------------

Extrudes
========

``${POP_EST.value}``

.. image:: ../doc/source/googleearth/img/extrude_huge.png

Presenter notes
---------------

Now go back to Google Earth and move the globe around enough so that the view will refresh.

You will see the polygons extruded based on the value of the attribute, so that the countries with larger populations are taller. However, with such extreme values, the globe is a bit hard to interpret. It would be better to scale the polygons down.

--------------------------------------------------

Extrudes
========

``${POP_EST.value?number / 1000}``

.. image:: ../doc/source/googleearth/img/extrude_small.png

Presenter notes
---------------

Open the same text file again. Replace the text with the following:

${POP_EST.value?number / 1000}

This will divide the attribute value by 1,000. The ?number is to force the attribute to be seen as a numerical value.

Now go back to Google Earth again and refresh the view.

The height is much more easy to interact with now.


--------------------------------------------------

For more information
====================

Web
  http://geoserver.org

Docs
  http://docs.geoserver.org

Mailing lists
  https://lists.sourceforge.net/lists/listinfo/geoserver-users

Bug tracker
  http://jira.codehaus.org/browse/GEOS

IRC
  #geoserver on Freenode

Presenter notes
---------------

The following is a list of external sites related to GeoServer.

Visit the GeoServer home page at http://geoserver.org.


GeoServer has an active users mailing list, which you can subscribe to at https://lists.sourceforge.net/lists/listinfo/geoserver-users. If you're a developer, you can subscribe to the developer list at https://lists.sourceforge.net/lists/listinfo/geoserver-users.

JIRA, the GeoServer bug tracker, is hosted on http://codehaus.org at http://jira.codehaus.org/browse/GEOS.

Join a live discussion at #geoserver, on irc.freenode.net.

--------------------------------------------------

For more information
====================

.. image:: ../doc/source/moreinfo/img/boundless.png
   :width: 50%

http://boundlessgeo.com
-----------------------

Presenter notes
---------------

Boundless helps to develop GeoServer and funds development through its OpenGeo Suite. Learn more at http://boundlessgeo.com.

--------------------------------------------------

Any questions?
==============

Thanks!
-------

Presenter notes
---------------

--------------------------------------------------

