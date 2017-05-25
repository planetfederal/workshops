Review
======

* GeoWebCache adds more OGC services.

* **WMS-C** closely resembles **WMS**.

* The embedded GeoWebCache offers **integrated WMS**, which allows a regular ``geoserver/wms`` end point to be used as a WMS-C end point. Requests that do not align to a gridset are handled by GeoServer as usual.

* **TMS** references tiles by an ``x``, ``y`` and ``z`` (zoom level) in the request URL.

* **WMTS** references tiles by an ``x``, ``y`` and ``z`` (zoom level) in the request parameters.
