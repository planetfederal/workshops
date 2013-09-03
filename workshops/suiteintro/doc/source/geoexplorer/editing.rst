.. _geoexplorer.editing:

Editing Features
================

Two other options enabled when we logged in to GeoExplorer were the layer editing features. These powerful tools allow authenticated users to Create, Edit, and Delete features served through GeoServer using the web browser.

Feature editing tools
---------------------

   .. list-table::
      :header-rows: 1

      * - Button
        - Name
        - Description
      * - .. image:: img/gx_icon_createfeature.png
        - Create New Feature
        - Initiates the workflow to create a new feature in the selected layer.
      * - .. image:: img/gx_icon_editfeature.png
        - Edit Existing Feature
        - Initiates the workflow to edit and/or delete an existing feature in the selected layer.

Creating new features
---------------------

The intention of the ``smallworld`` layer is to capture a list of places.  Let's add some more!

Use the following workflow to create points for several other cities you've been to.

#. You should be logged into GeoExplorer, and your ``smallworld`` layer should be loaded, visible and selected.

   .. figure:: img/gx_create_selected.png
   
#. Click the :guilabel:`Create Feature` button to make it active.

   .. figure:: img/gx_create_createfeaturebutton.png

#. Navigate to a memorable destination.

   .. note:: Don't forget that you can zoom and pan with any tool active by using the Shift and Control keys, respectively.

#. Once you've found your destination, click the location on the map. GeoExplorer places a blue marker on the map at your click point, and opens a small dialog box containing a table of attributes.

   .. figure:: img/gx_create_newmarker.png

#. Fill in the name of the :guilabel:`Place`, :guilabel:`Year` visited, and a short :guilabel:`Comment` (e.g. the purpose of your visit). If you want, while you're in edit mode, you can adjust your point on the map by dragging the temporary marker elsewhere.

   .. figure:: img/gx_create_newattributes.png

#. Once you're satisfied, click :guilabel:`Save`.

#. Repeat this process for a few more places. Hit some other countries, continents, and hemispheres. Make places up.

.. note:: You've added spatial records to a PostGIS database table through a browser. Awesome!

Editing existing features
-------------------------

Let's now edit an existing feature.

#. You should be logged into GeoExplorer, and your ``smallworld`` layer should be loaded, visible and selected. You should be zoomed in to a point (at zoom-level 10 or thereabouts).

   .. figure:: img/gx_edit_navigate.png

#. If it isn't already, click the **Edit Feature** button to make it active.

   .. figure:: img/gx_edit_editfeature.png

#. Click on the feature you wish to edit.

#. A familiar dialog will pop up listing the attributes of the selected feature and highlighting its geometry.

   .. figure:: img/gx_edit_popup.png

#. Click the :guilabel:`Edit` button (at the bottom left of the dialog).  The pop-up will change to a mode where the field values can be edited.

#. Change the year, or any other value, and move the point marker closer to the city center.

   .. figure:: img/gx_edit_makeedits.png

#. Click :guilabel:`Save`.

.. note:: You've gone and edited the attributes and geometries of features in a spatial database over the web.  Nicely done!

Deleting existing features
--------------------------

Again for the sake of example, let's assume that at least one of your destinations was bogus and delete it.

   .. figure:: img/gx_delete_navigate.png

#. You should be logged into GeoExplorer, and your ``smallworld`` layer should be loaded, visible and selected. You should be zoomed into a feature at zoom-level 10 or thereabouts.

#. Navigate to a point in ``smallworld`` that you've never been to or are trying to forget about.

#. If it isn't already, click the :guilabel:`Edit Feature` button to make it active.

#. Click on the point you wish to delete.  The feature edit dialog opens.

#. Next to the :guilabel:`Edit` button you'll notice a :guilabel:`Delete` button that does exactly what its name implies.

#. Click the :guilabel:`Delete` button. This opens a prompt asking for confirmation that you do want to delete the feature. Click :guilabel:`Yes`.

   .. figure:: img/gx_delete_confirmation.png

      Delete confirmation

#. Your feature will be deleted, both from the map and the database.
