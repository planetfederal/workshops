Web Map Service-Cached
======================

Web Map Service-Cached (WMS-C) is an OGC standard for making tiled requests, where the request parameters are identical to a regular WMS.

Assuming that the regular GeoServer WMS endpoint is ``http://localhost:8080/geoserver/wms``, the WMS-C endpoint is ``http://localhost:8080/geoserver/gwc/service/wms``.

A sample WMS-C request would be to a WMS request::

  http://localhost:8080/geoserver/gwc/service/wms?
    LAYERS=ne:ocean&
    FORMAT=image/png&
    SERVICE=WMS&
    VERSION=1.1.1&
    REQUEST=GetMap&
    STYLES=&
    SRS=EPSG:4326&
    BBOX=0,0,45,45&
    WIDTH=256&
    HEIGHT=256

WMS-C requests must align to the layer's gridsubset or GWC will return an error message. 

.. note:: Any parameters that are not standard for WMS, such as the vendor parameters accepted by GeoServer, must be configured to work with GeoWebCache or they will be ignored.

Direct WMS integration
----------------------

When :guilabel:`Direct WMS integration` for GeoServer is enabled, GeoWebCache will handle WMS-C requests using the regular GeoServer WMS endpoints. Therefore, ``http://localhost:8080/geoserver/wms`` will serve as both a WMS and a WMS-C endpoint. 

The ``TILED=true`` parameter determines whether or not a request will be handled by GeoWebCache. Without the extra parameter, GeoWebCache will pass the request off directly to GeoServer and no caching will occur.

Direct WMS integration (alternately referred to as "integrated WMS") also works with GeoServer's virtual services, such as ``http://localhost:8080/geoserver/opengeo/wms``, where ``opengeo`` is the workspace name.

Capabilities
------------

The capabilities document for the GeoWebCache WMS-C service additionally describes the gridsubsets that have been defined for each layer. The client knows how to generate appropriate requests basd on the information in this document; without it, the client could not make valid tiled requests.

It may be retrieved from the following URL::

  http://localhost:8080/geoserver/gwc/service/wms?
    REQUEST=GetCapabilities&
    VERSION=1.1.1&
    TILED=true

The capabilities document will describe the gridsubset definitions (including associated image format and size, layer, bounding box and style) inside the ``VendorSpecificCapabilities`` tag block. The following is the EPSG:4326 gridsubset for a layer named ``ne:populated_places``.

.. code-block:: xml

  <VendorSpecificCapabilities>
    <TileSet>
      <SRS>EPSG:4326</SRS>
      <BoundingBox SRS="EPSG:4326" minx="-180.0" miny="-90.0"  maxx="0.0"  maxy="90.0" />
      <Resolutions>0.703125 0.3515625 0.17578125 0.087890625 0.0439453125 0.02197265625 0.010986328125 0.0054931640625 0.00274658203125 0.001373291015625 6.866455078125E-4 3.4332275390625E-4 1.71661376953125E-4 8.58306884765625E-5 4.291534423828125E-5 2.1457672119140625E-5 1.0728836059570312E-5 5.364418029785156E-6 2.682209014892578E-6 1.341104507446289E-6 6.705522537231445E-7 3.3527612686157227E-7 </Resolutions>
      <Width>256</Width>
      <Height>256</Height>
      <Format>image/png</Format>
      <Layers>ne:populated_places</Layers>
      <Styles></Styles>
    </TileSet>
    ...
  </VendorSpecificCapabilities>
