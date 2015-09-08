Advantages of using GeoWebCache
===============================

There is usually a considerable performance advantage to using a tile cache server like GeoWebCache in conjunction with GeoServer. While there is a small time cost associated with retrieving an image from the cache, this is almost always much less than what GeoServer must do:

* Read all the source data
* Interpret styling instructions
* Draw the image
* Deliver the image

GeoWebCache effectively eliminates the need for the first three time-consuming steps, leaving a simple image delivery to the client.

The measurable performance gains will depend on how much time GeoServer would normally take to perform the other steps. This, in turn, depends on a number of factors: the efficiency of the back end (usually PostGIS in OpenGeo Suite deployments) in delivering the data to the server; the complexity of the styling; the number of features to be rendered; and so on.

In addition to being faster, GeoWebCache reduces the resource demands on the WMS server, freeing it to fulfill other tasks more efficiently. **If GeoWebCache has all the tiles saved for all necessary zoom levels, one could disconnect GeoWebCache from the WMS entirely.**

Standalone versus Embedded
--------------------------

GeoWebCache exists in two different forms:

* A :term:`standalone <standalone GeoWebCache>` Java web application that can interface with one or more :term:`OGC`-compliant Web Map Services.
* An :term:`embedded <embedded GeoWebCache>` extension to GeoServer itself.

There are differences in configuring and using GeoWebCache as a standalone or embedded application, but the concepts that underlie both are the same. 

.. note:: In these materials, unless otherwise noted, we will assume the embedded version of GeoWebCache will be used.

Which one is for you?
^^^^^^^^^^^^^^^^^^^^^

The choice of whether to use the standalone or the embedded GeoWebCache depends on the environment where it will be deployed.

* The embedded GeoWebCache is easier to deploy and configure. It is suitable if you will only be connecting to a single GeoServer instance.
* The standalone GeoWebCache is a better choice if you do not wish to have your GeoWebCache instance running in the same servlet container as GeoServer, or you wish to connect it to many GeoServers (or other WMS servers). The standalone option also allows you to create a cluster of multiple GeoWebCache instances that are all serving the same data.
