Review
======

* **GeoWebCache** is a specialized type of cache.

* OpenGeo Suite contains both a **standalone** GeoWebCache and a GeoWebCache that is **embedded** in GeoServer.

* GeoWebCache uses **gridsets** to define which tiles will be cached and communicates this information to the client in the capabilities document.

* Gridsets are defined by a **CRS**, **bounds**, **tile size** and a **tile matrix set**.

* A client request must align very closely to a tile or GeoWebCache will return an error.

* A **gridsubset** is a gridset that has been applied to a layer. A gridsubset may have smaller bounds and fewer tile matrices than its gridset.

* GeoServer comes with several pre-configured gridsets.

* **Metatiling** is used for better performance and to eliminate problems with labeling.

* A **gutter** is used to better render features on the edge of tiles.
