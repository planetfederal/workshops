.. _geoexplorer.publishing:

Publishing map widgets
======================

In this section, we'll use GeoExplorer's **Export Map** tool to publish our composed layout as a custom map application that can be embedded on a web page.

Export Map tool
---------------

.. list-table::
   :header-rows: 1 

   * - Button
     - Name
     - Description
   * - .. image:: img/gx_icon_exportmap.png         
     - Export Map
     - Initiates the workflow to export your current map layout to a custom web-map widget.
       
Export Your Saved Map
---------------------

Exporting your map to a web page is a quick process. However, first we need a web page to export our map to. Thankfully, there is a template HTML file in our :file:`<workshop>\\html` directory.

The unadorned template looks a little like this:

   .. figure:: img/gx_publish_preview.png
      
      Without a map, it's just a bunch of gibberish

Now let's have a quick look at the **code**.

#. Open the :file:`GNN.html` file in your text editor. 

    .. figure:: img/gx_publish_unedited.png
    
       The HTML page we'll be editing

#. Now back to publishing our map. Continuing the previous exercise, you should be logged in to GeoExplorer. Open the map layout you saved previously.

#. Click the :guilabel:`Export Map` button to trigger the publishing process.

   .. figure:: img/gx_export_toolbar.png

#. The :guilabel:`Export Map` dialog opens, presenting a list of tools that can be added to the toolbar in your exported map. By default, all of the tool options are enabled.

   .. figure:: img/gx_dialog_export01.png

      Selecting map tools

#. Adjust the selection of tools if desired.

#. Once you've selected the tools to include your published map's toolbar, click the :guilabel:`Next` button to proceed.

#. This screen provides you with a code snippet to embed your map application into a web-page template. Copy the code in the ``<iframe>...</iframe>`` block to your clipboard.

   .. figure:: img/gx_dialog_export02.png
      
      Published map code snippet

#. Return to your text editor and scroll down to around line 32. Replace the comment shown below with GeoExplorer's HTML block.

   .. code-block:: html

      <!--Insert your exported HTML code from GeoExplorer here!-->
   
#. Your HTML file should now look something like this:

    .. figure:: img/gx_publish_edited.png

#. Save your HTML file, and return to your browser.

#. **Refresh** the page.

    .. figure:: img/gx_publish_gnnmap.png
    
       A happy web page

#. Congratulations, you have published your first map!

How's the map performance? A little slow? In an upcoming section, we'll look at how to accelerate map delivery using GeoWebCache.
       

Other publishing options
------------------------

We have a few other options when publishing our maps.

Preview
~~~~~~~

At any time we can click the **Preview** button to get a glimpse of what our published map application will look like.

#. Click the :guilabel:`Preview` button.

#. A preview of our mapping application pops-up in a new panel.

#. :guilabel:`Close` the preview pop-up.

    .. figure:: img/gx_publish_previewpanel.png

Dimensions
~~~~~~~~~~

In the second step, we have controls to specify the dimensions of our map.

#. The :guilabel:`Map Size` drop-down lists several common map height/width pairs.

#. Alternately, you can enter values in the :guilabel:`Height` and :guilabel:`Width` fields directly. Change these values to 750 and 650, respectively.

   .. note:: Make sure to tab or click out of the *Width* field when you're done, otherwise the change won't take effect.
   
#. Changing these values updates the code in the ``<iframe>`` block with the new map size.

   .. figure:: img/gx_publish_resize.png

Bonus
-----

Change any of the map options. Use the **Back** and **Next** buttons to move between the toolbar and dimension option screens.

Republish these changes into your HTML page, and confirm your changes.