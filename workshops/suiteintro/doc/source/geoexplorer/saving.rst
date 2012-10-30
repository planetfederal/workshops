.. _geoexplorer.saving:

Saving map layouts
==================

Now that you've spent time configuring your map layout (adding, reordering, styling and editing layers, etc.), it might be a good idea to save your layout.  Saving your composed map allows you to come back to the current layout without having to redo all of your work.

In this section, we'll have a quick look at how to save map layouts, and return to them in another browser session.

Save Map tool
-------------

.. list-table::
   :header-rows: 1 

   * - Button
     - Name
     - Description
   * - .. image:: img/gx_icon_savemap.png         
     - Save Map
     - Initiates the workflow to save your current map layout.
       
Permalinks
----------

.. note:: The workflow for saving and loading maps is evolving.  There isn't really a single UI for the process, and there isn't an easy way to Delete or Copy (Save As) saved maps as one would expect.  Improvements are planned for the near-future.

Saving your map creates a "permalink" to the current layout and adds an entry in a server-side database capturing the list of layers in your map, their order and their properties (styling, etc). Because of this interaction with GeoServer, you must be logged in to access this function.

#. Continuing the previous exercise, you should be logged into GeoExplorer, and working with a map that contains your ``earth`` and ``smallworld`` layers.

#. The map extent should be set to the area that you want to appear by default when you load your map.

   .. figure:: img/gx_save_navigate.png
      :align: center

#. Click the **Save Map** button to trigger the process.

   .. figure:: img/gx_save_savemapbutton.png
      :align: center

#. A **Bookmark URL** dialog opens presenting a Permalink to your saved layout.

#. The Permalink is highlighted in this dialog, so you can quickly **Copy** and **Paste** it into any number of locations (Shortcuts, Documents, Emails, etc.)

   .. figure:: img/gx_save_savemapaddress.png
      :align: center

#. If you look at your browser's address bar, you'll notice that when you hit **Save Map** the location changed to the same Permalink. You have a variety of options for adding this location to your browser's Favorites folder, Toolbar, Bookmarks, etc.

Loading Saved Map Layouts
-------------------------

Loading a saved map is a matter of opening a saved location in your browser. 

#. Return to the default GeoExplorer window at ``http://localhost:8080/geoexplorer/``

   .. figure:: img/gx_save_mainpage.png
      :align: center

#. Access your saved map by navigating to the URL noted previously.

#. Your already-composed layout opens, ready for some more fine-tuning.

   .. figure:: img/gx_save_savedopen.png
      :align: center

Bonus
-----

With your saved configuration reloaded and possibly updated, what happens if you click the :command:`Save Map` button again? What doesn't happen?