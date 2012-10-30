.. _geoexplorer.printing:

Printing Static Maps
====================

GeoExplorer provides a built-in tool for printing static maps to PDF format. Where a link to a live map application isn't appropriate, PDF maps can be emailed or printed in hard-copy for reference.

In this section we'll walk through the steps for printing a static map in GeoExplorer.

.. list-table::
   :header-rows: 1 

   * - Button
     - Name
     - Description
   * - .. image:: img/gx_icon_printmap.png
     - Print Map
     - Opens a dialog for printing your map to PDF
	     
Printing a Map
--------------

.. note:: You do not need to be logged in to GeoExplorer to print a static map.

#. We assume GeoExplorer is running and displaying a composed map.

#. Click the :command:`Print` button. The GeoExplorer :guilabel:`Print Preview` dialog opens.

   .. figure:: img/gx_dialog_printpreview.png
      :align: center

#. Select your target :guilabel:`Paper Size` and image :guilabel:`Resolution` from the respective drop-downs.

#. The text in the upper and lower boxes can be replaced by a :guilabel:`Map Title` and :guilabel:`Map Comments`.

#. If necessary, reposition the map image in the map frame using the on-map navigation controls.

#. Click the :guilabel:`Print` button when you are satisfied with your print layout. This fires a command to GeoServer to generate a PDF and then send it back to the browser.

#. When your map has been prepared, your browser will prompt you to save or open the PDF.

   .. figure:: img/gx_print_pdf.png
      :align: center
      
      *A PDF map printed from GeoExplorer*

.. note::

   Did you see this pop up when you tried to print your map?

      .. figure:: img/gx_dialog_noprintlayers.png
         :align: center

   You'll typically see this message when your composed map is *only* displaying proprietary layers. Terms of use prevent Google, Bing, Yahoo!, and other map services from being printed under most circumstances. Otherwise, if you've got at least one Overlay layer (or OpenStreetMap), a print will occur, though the proprietary layers will be ignored.