Service endpoints
=================

You are probably familiar with standard Open Geospatial Consortium endpoints (WMS, WFS, WCS, and WPS). GeoWebCache provides an additional set of OGC endpoints for tiled services: Cached Web Map Service (WMS-C), Tile Map Service (TMS) and Web Map Tile Service (WMTS).

These endpoints natively offer ``GetCapabilities`` and ``GetMap`` requests, while WMS ``GetFeatureInfo`` requests are proxied by GeoWebCache to the WMS.

The embedded GeoWebCache additionally provides direct integration with WMS, so that requests to WMS can be transparently handled by the WMS-C service whenever possible.

Different clients will have varying levels of support for the different services.
