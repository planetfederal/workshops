Web Map Tile Service
====================

Web Map Tile Service (WMTS) is the successor to TMS.

The WMTS capabilities document can be retrieved from this URL::

  http://localhost:8080/geoserver/gwc/service/wmts?
    REQUEST=GetCapabilities

Retrieving a tile from the WMTS endpoint requires a ``GetTile`` request of the following format::

  http://localhost:8080/geoserver/gwc/service/wmts?
    REQUEST=GetTile&
    TILECOL=0&
    TILEROW=0&
    LAYER=ne:ocean&
    FORMAT=image/png&
    TILEMATRIX=EPSG:4326:0&
    TILEMATRIXSET=EPSG:4326

.. note::

   The tile coordinates in WMTS are counted from the top left corner, unlike TMS which counts them from the bottom left corner.

.. note::

   The ``TILEMATRIX`` parameter must be set to the full name of the matrix, not simply the zoom level.
