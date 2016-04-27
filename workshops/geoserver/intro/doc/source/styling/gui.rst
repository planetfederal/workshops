.. _geoserver.styling.gui:

Graphical styling tools
=======================

Creating style files by hand, regardless of the type of markup you use, can be a difficult and time-consuming process. Fortunately, there are some graphical tools that exist to help make the generating of styles in GeoServer easier.

While beyond the scope of this workshop, attendees are encouraged to download these programs and try them out.

QGIS
----

`QGIS <http://www.qgis.org>`_ is a free and open source GIS. It is typically used on the desktop, but is available in server / browser form as well.

QGIS has robust and varied styling options. While SLD isn't used natively  (and therefore some styling options can be used that don't fit the standard), all styles can be exported to SLD.

.. figure:: img/gui_qgis.png

   QGIS, showing style editor

uDig
----

`uDig <http://www.udig.org>`_ is another desktop GIS application. It is built from some of the exact same tools as GeoServer and so shares the same rendering engine. It reads and writes the SLD standard directly, so no conversion is necessary. 

.. figure:: img/gui_udig.png

   uDig, showing style editor
