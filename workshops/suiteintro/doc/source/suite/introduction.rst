.. _suite.introduction:

Introducing the OpenGeo Suite
=============================

In this section, we'll introduce the OpenGeo Suite and illustrate a few of the terms and concepts involved in setting up a geospatial "stack".

What's a stack?
---------------

A "stack" is industry jargon for a software system that comprises many individual applications. The stack analogy implies that the individual components stack or build up on each other.

In theory, the stack is vertical. The more fundamental components are (buried) at the bottom, with the more tangible, visible pieces at the top.

.. figure:: img/stack_analogy.png
   :align: center

   *Some commonly-seen stacks*

What is the OpenGeo Suite?
--------------------------

The OpenGeo Suite is a fully-open geospatial software stack for publishing your data on the web.  It includes the following software:

* **PostGIS** - PostGIS is a robust spatial database system.

* **GeoServer** - GeoServer is a map and geospatial data server.

* **GeoExplorer** - GeoExplorer is browser-based tool commonly used to view, navigate, and manage data, either locally or remote.  It is built upon **OpenLayers** and **GeoExt**, two JavaScript libraries for building your own geospatial applications.

* **GeoWebCache** - GeoWebCache is a tool that accelerates the delivery of map images by pre-drawing and caching.

.. figure:: img/stack_all.png
   :align: center

   *The OpenGeo Suite*

These are the key pieces we'll be using in this workshop.