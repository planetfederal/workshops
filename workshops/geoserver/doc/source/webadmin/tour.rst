.. _geoserver.webadmin.tour:

Tour of the interface
=====================

Viewing
-------

The default location of the GeoServer admin interface is ``http://localhost:8080/geoserver``. The initial page is called the Welcome page.

.. figure:: img/tour_welcome.png

   GeoServer Welcome page

Authentication
--------------

For security reasons, most GeoServer configuration tasks require you to be logged in first. By default, the GeoServer administration credentials are ``admin`` and ``geoserver``, although this can and should be changed.

#. Log in using the default credentials.

   .. figure:: img/tour_login.png

      Logging in with default credentials

#. After logging in, many more options will be displayed.

   .. figure:: img/tour_loggedin.png

      GeoServer Welcome page with administrative options

Navigation
----------

Use the links on the left side column to manage GeoServer, its services, data, security settings, and more. Also on the main page are direct links to the capabilities documents for each service (:ref:`WFS <geoserver.overview.wfs>`, :ref:`WMS <geoserver.overview.wms>`, :ref:`WCS <geoserver.overview.other>`). We will be using the links on the left under :guilabel:`Data`—among them :guilabel:`Layer Preview`, :guilabel:`Workspaces`, :guilabel:`Stores`, :guilabel:`Layers`, :guilabel:`Layer Groups`, and :guilabel:`Styles`—very often in this workshop, so it is good to familiarize yourself with their location.

.. _geoserver.webadmin.layerpreview:

Layer Preview
-------------

You can use the :guilabel:`Layer Preview` link to easily view layers currently being served by GeoServer. The Layer Preview pages includes quick links to viewing layers via OpenLayers along with other services.

#. Click the :guilabel:`Layer Preview` link, located on the left side under :guilabel:`Data`.

   .. figure:: img/tour_layerpreviewlink.png

      Navigating to the Layer Preview page

#. Preview a few layers by clicking the :guilabel:`OpenLayers` link next to each layer.

   .. figure:: img/tour_layerpreviewpage.png

      The Layer Preview page

   .. figure:: img/tour_usastates.png

      Viewing the usa:states layer

#. Take a look at the contents of the URL bar when viewing an OpenLayers map. Notice that it is similar in construction to the sample WMS requests made in the :ref:`geoserver.overview.wms` section. The salient difference is the use of ``format=application/openlayers`` as the output format.

Logs
----

GeoServer displays the contents of the application logs directly through the web interface. Reading the logs can be very helpful when troubleshooting. To view the logs, click on :guilabel:`GeoServer Logs` on the left under :guilabel:`About & Status`.

.. figure:: img/tour_logs.png

   View the GeoServer application logs

More settings
-------------

Spend some time exploring this interface and its features by clicking through the links on the left. The :guilabel:`Demos` link in particular contains some helpful utilities for learning about GeoServer functionality.

Bonus
-----

The following information can all be gleaned through the GeoServer web admin interface.

* What is the filesystem path to the GeoServer data directory?
* What version of Java is GeoServer using?
