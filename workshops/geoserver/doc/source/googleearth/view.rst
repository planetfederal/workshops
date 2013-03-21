.. _geoserver.googleearth.view:

Viewing layers
==============

GeoServer natively outputs data in KML format. This is the markup language that is used by Google Maps and Google Earth. In this way, it is easy to convert shapefiles or any geospatial data to a format that Google services understand.

There are two ways to view data in Google Earth. The first is by statically loading a KML file. The second is by using a Network Link and connecting to a KML stream. We will show both.

Loading a KML file
------------------

#. Navigate to the :guilabel:`Layer Preview` .

#. Find the ``earth:countries`` layer and select :guilabel:`Google Earth` in its View menu. Click :guilabel:`Go`.

   .. figure:: img/view_preview.png

      Click to generate KML for viewing in Google Earth

#. You will be asked to download a file. Select :guilabel:`Open with Google Earth` and click :guilabel:`OK`.

   .. figure:: img/view_openwith.png

      Open KML/KMZ files in Google Earth

   .. note:: A KMZ file is a KML file compressed into an archive.

#. The layer will open in Google Earth.

   .. figure:: img/view_layer.png

      A layer published on Google Earth

#. Click on one of the layer's points to view its placemark description.

   .. figure:: img/view_placemark.png

      Default placemark for a GeoServer feature in Google Earth

It is possible to customize this placemark description through GeoServer, including adding custom HTML.

Network Link
------------

Now we will connect Google Earth to a GeoServer KML stream via a Network Link. This allows for the view in Google Earth to be dynamically updated.

#. Remove the entry called ``countries.kmz`` in the :guilabel:`Places` list by right-clicking and selecting :guilabel:`Delete`.

#. Add a new :guilabel:`Network Link` by navigating to the :guilabel:`Add` menu and selecting :guilabel:`Network Link`.

   .. figure:: img/view_addnetworklinkmenu.png

      Menu to add a Network Link

#. In the dialog that appears, enter "Countries" in the :guilabel:`Name` field.

#. In the :guilabel:`Link` field, enter the following URL::

     http://localhost:8080/geoserver/wms/kml?layers=earth:countries

   .. figure:: img/view_addnetworklink.png

      Specifying the source of a KML Network Link

   .. note:: This is the same target for the Layer Preview :guilabel:`Go` URL above.

#. Click :guilabel:`OK` when done.

The output should be the same as before. The difference is that a Network Link is dynamic, which means that we can alter the stream and refresh the view without having to export a new KML file. We'll put this to use in the next section.
