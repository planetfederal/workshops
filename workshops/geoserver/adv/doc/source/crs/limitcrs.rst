.. _gsadv.crs.limitcrs:

Limiting advertised CRS
=======================

The WMS capabilities document publishes a list of all supported CRSs. This list is quite long, and can make the capabilities document quite large.

However, a GeoServer instance typically only uses a small fraction of that list. So it is sometimes a good idea to limit the number of advertised CRSs that appear in the capabilities documents.

#. View your local WMS 1.3.0 capabilities document::

     http://localhost:8080/geoserver/wms?service=wms&version=1.3.0&request=GetCapabilities

.. todo:: If errors here, watch out that some advanced layers may have corrupted configurations.

.. figure:: img/limit_fullcaps.png

   Capabilities document with full list of CRSs

Note all of the ``<CRS>`` tags. They comprised the vast majority of the document.

Limiting the CRS list is done through the web admin interface.

#. If you haven't already, log in to the GeoServer admin account.

#. Click :guilabel:`WMS` under :guilabel:`Services`.

   .. figure:: img/limit_wmslink.png

      Click to view WMS options

#. Find the section titled :guilabel:`Limited SRS list`. Enter a list of comma-separated values, such as the following::

     2001, 2046, 3700

   .. figure:: img/limit_srslist.png

      List of SRSs to advertise

#. Scroll to the bottom of the page and click :guilabel:`Submit`.

#. Now view the capabilities document again and note the changed list of CRSs.

   .. figure:: img/limit_limitedcaps.png

      List of SRSs to advertise

If you want to output the bounding box for each CRS on every layer, make sure to check the :guilabel:`Output bounding box for every supported CRS` box. This is useful for certain clients that require the bounding box when determining whether the CRS is relevant to a given area.

.. note:: EPSG:4326 (latitiude/longitude coordinates) will always be available.

Limiting advertised CRSs doesn't turn on or off any functionality.  Rather, it highlights the "suggested" CRSs for the server, and cuts down on bandwidth for a frequently accessed file. Even if you limit advertised CRSs, **other CRSs will still be available** to be manually requested, as in the following WMS reflector requests::

  http://localhost:8080/geoserver/wms/reflect?layers=usa:states&srs=EPSG:2200
  http://localhost:8080/geoserver/wms/reflect?layers=usa:states&srs=EPSG:2900

Neither EPSG:2200 nor EPSG:2900 are in the list of limited CRSs, but both requests should succeed.