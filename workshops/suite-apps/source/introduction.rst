.. _introduction:

Introduction 
************

What makes a "map application"?
===============================

Web mapping applications are pretty magical. They provide a window onto the world that allows users to manipulate data directly on a map, adding new features, changing existing ones, and storing those changes on a server. For a user, the parts that make up an application don't matter--the only important thing is that it works (and looks nice). For a developer, understanding the parts, and how they interact, is critical.

A web mapping application generally combines:

* A spatial data storage system capable of handling concurrent users.
* A web services system that allows web browsers to connect and interact with data via HTTP calls.
* A source of background map information, usually in the form of tiles, to provide location context to the foreground.
* A source of foreground map information, usually in the form of vectors (or a dynamically rendered image).
* An interface running in the web browser that provides the application framework.
* A map component in the interface that combines for foreground and background information, and provides interactivity with the foreground map information.

There are all kinds of software and services that can be combined to form an application:

* Backend storage can be provided by spatial databases like PostGIS or SQL Server, or by web services like Google Fusion Tables or CartoDB.
* Web services can be provided by standardized middleware like GeoServer or MapServer, or custom services scripted in NodeJS, PHP, or Python.
* Background information can be provided by common tile sets like OpenStreetMap or MapQuest, or custom rendered using GeoServer or TileMill.
* Foreground information can be served using standardized middleware like GeoServer or MapServer, or custom services scripted in NodeJS, PHP, or Python.
* Application interfaces can be built using widget frameworks like ExtJS or hand crafted using Bootstreap and HTML/CSS.
* Map components can be provided by software-as-a-service vendors like Google or Esri, or be open source like OpenLayers and Leaflet.

For this workshop, we will use OpenGeo Suite, which happily combines all the pieces needed to build a web application into a single collection of open pieces:

* PostGIS for storage
* GeoServer for web services
* OpenStreetMap for background layers
* GeoServer for foreground layers
* An SDK using ExtJS and Bootstrap for frameworks
* OpenLayers as a map component

What we will build
==================

Every ten years, the `US census <http://www.census.gov/2010census/>`_ collects a staggering array of information about the population, collates it, and then releases it in raw form. It is a truly majestic compendium of data, but browsing it can be hard: 

* there are so many scales of data, and so many potential columns to view, it's hard to build a general purpose mapping app that isn't hopelessly complicated; and,
* the data itself is so voluminous and complicated that building your own app can seem impossible.

In this workshop we will build a simple application that uses a single thematic style to visualize several dozen census variables collated to the county level.

.. image:: ./img/sdk_census_bar.png 

The basic structure of the application will be

* A spatial table of counties in PostGIS, that will join with
* An attribute table with many census variables of interest, themed by
* A thematic style in GeoServer, browsed with
* A pane-based application in OpenLayers, allowing the user to choose the census variable of interest.

This application exercises all the tiers of OpenGeo Suite!

To this basic example, we will add extra features to demonstrate the capabilities of OpenLayers and ways of interacting with web services.
