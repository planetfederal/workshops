Filters
=======

Allowed parameters
------------------

GeoWebCache will remove all non-required parameters from requests before checking the cache for tiles or sending a request to GeoServer. 

Because extra parameters are stripped out of requests made to GeoWebCache's endpoints, extra parameters supported by GeoServer, such as ``CQL_FILTER`` or ``FEATUREID`` are not usable with GeoWebCache.

For example, the following request would have the ``FEATUREID=countries.42`` stripped out by GeoWebCache::

  http://localhost:8080/geoserver/gwc/service/wms?LAYERS=opengeo:countries&
    STYLES=&
    FORMAT=image/png&
    SERVICE=WMS&
    VERSION=1.1.1&
    REQUEST=GetMap&
    SRS=EPSG:4326&
    BBOX=-180,-90,180,90&
    WIDTH=512&
    HEIGHT=256&
    FEATUREID=countries.42

.. note:: The ``featureid`` parameter tells GeoServer to render only specific features.

Removing these parameters is a feature which makes caching possible, but it is not always desirable.

Whitelisting parameters
-----------------------

OpenGeo Suite 4.0 comes with a powerful new filter-whitelisting feature that allows GeoWebCache to keep optional parameters and create additional caches based on them.

With OpenGeo Suite, however, each layer may have a list of whitelisted parameter names and values (including default values if the parameter is not specified) which will be accepted by GeoWebCache's endpoints. **A separate cache will be created for each value that the filter accepts**, just as we saw with multiple styles.

Integrated GeoWebCache
----------------------

With direct WMS integration enabled, the presence of any of the following parameters means that GeoWebCache is bypassed completely and the request is passed directly to GeoServer:

- ``ANGLE``
- ``BGCOLOR``
- ``BUFFER``
- ``CQL_FILTER``
- ``ELEVATION``
- ``ENV``
- ``FEATUREID``
- ``FEATUREVERSION``
- ``FILTER``
- ``FORMAT_OPTIONS``
- ``MAXFEATURES``
- ``PALETTE``
- ``STARTINDEX``
- ``TIME``
- ``VIEWPARAMS``
