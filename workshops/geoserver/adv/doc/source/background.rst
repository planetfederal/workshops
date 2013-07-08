.. _gsadv.background:

Background
==========

Before we get started with topics, let's review what we know about GeoServer.

A web-mapping server is a specific subset of a web-server designed to transfer mapping data (or spatial, or geographic, or geometric data).

GeoServer is a web-mapping server. As such, it operates as middleware between geospatial data formats and web services.

GeoServer can read many different data formats, both vector and raster, proprietary and open.

.. figure:: theory.png

   GeoServer interaction with clients and data

What's perhaps most important is that GeoServer acts as a **format-agnostic gateway** to spatial information. It standardizes its responses to the conventions of the OGC service specifications. While there are many services, the most frequently accessed are the Web Map Service (for map images) and Web Feature Service (for map data).

