.. _geoexplorer.login:

Logging in
==========

Thus far in the workshop, we've composed a map using the very layers we stored in PostGIS and then published through GeoServer.  Now, if we log in to GeoExplorer, we can do some even more exciting things.

#. Click the :guilabel:`Login` button on the top right of the Toolbar.

   .. figure:: img/gx_icon_login.png
      :align: center

      *Login button*
      
#. Enter your **Username** and **Password** as shown and click :guilabel:`OK`. These credentials are the same as for GeoServer (`admin` / `geoserver`  by default).

   .. figure:: img/gx_dialog_login.png
      :align: center

      *Login dialog*

#. After logging in successfully, you'll notice that we have a few more items on the *Button Bar* available to us.

 .. list-table::
    :header-rows: 1

    * - Button
      - Name
      - Description
    * - .. image:: img/gx_icon_savemap.png
      - Save Map
      - Save the current map configurations (on the server) with a permalink to access this map in the future.
    * - .. image:: img/gx_icon_publish.png
      - Publish
      - Open a wizard for building an embeddable map widget using your current configurations.
    * - .. image:: img/gx_icon_createfeature.png
      - Create New Feature
      - Initiates the workflow to create a new feature in the selected layer.
    * - .. image:: img/gx_icon_editfeature.png
      - Edit Existing Feature
      - Initiates the workflow to edit and/or delete an existing feature in the selected layer.
       
Additionally, if we select one of the Overlays in the :guilabel:`Layer List`, the :guilabel:`Edit Styles` button is now available to us in both the Layer Toolbar and the layer's context menu.