Tile Map Service
================

Tile Map Service (TMS) is another specification for retrieving tiled data from GeoWebCache. TMS implements a RESTful interface.

The capabilities document for TMS can be retrieved from this URL::

  http://localhost:8080/geoserver/gwc/service/tms/1.0.0

TMS uses a much simpler request format where tiles are referenced by their ``x`` and ``y`` positions in the tile grid, along with the zoom level (which can be thought of as a ``z`` position)::

  http://localhost:8080/geoserver/gwc/service/tms/1.0.0/ne:ocean/4/0/0.png

The above request will retrieve the bottom-left tile (0,0) in the gridset at zoom level 4. If there are multiple gridsets, then the URL can be extended to reference those::

  http://localhost:8080/geoserver/gwc/service/tms/1.0.0/ne:ocean@EPSG:900913@png/4/0/0.png
