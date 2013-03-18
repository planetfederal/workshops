.. _geoserver.styling.styles:

Styles in GeoServer
===================

Every layer published in GeoServer must have a style associated with it. When manually loading layers as done in the :ref:`geoserver.data.shapefile` and :ref:`geoserver.data.geotiff` sections, GeoServer will look at the geometry of the data and assign a generic style based on that data type. When using the :ref:`Layer Importer <geoserver.data.import>`, a unique style will be generated for each layer. We will now look at how GeoServer handles styles.

Viewing existing style
----------------------

#. Navigate to the :guilabel:`Layers` list. Select a layer from the list of published layers. (This example will use :guilabel:`earth:countries`, but any layer will do.)

#. Preview the layer to see its visualization by navigating to the :guilabel:`Layer Preview`, then clicking on the :guilabel:`OpenLayers` link next to that layer.

   .. figure:: ../data/img/shp_openlayers.png

      Previewing the "countries" layer

#. Leave this preview window open and open up a new browser tab. In the new tab, navigate back to the main :ref:`geoserver.webadmin` page.

#. In order to view the SLD for this layer, we need to find out which style is associated with this layer. To do this, click on :guilabel:`Layers` under :guilabel:`Data` on the left side of the page, then click on the :guilabel:`Layer Name` link of :guilabel:`countries`.

   .. figure:: img/styles_layerslink.png

      Click to go to the Layers page

   .. figure:: img/styles_layerspage.png

      The earth:countries layer in the layer list

#. You are now back at the layer configuration page. Notice there are four tabs on this page, :guilabel:`Data` (the default), :guilabel:`Publishing`, :guilabel:`Dimensions`, and :guilabel:`Tile Caching`. Click on the :guilabel:`Publishing` tab, then scroll down to the entry that says :guilabel:`Default Styles`. Make a note of the name of the style. (In the case of ``earth:countries`` the name of the style is called ``polygon``.)

   .. figure:: img/styles_publishingtab.png

      Layer configuration page: Publishing tab

#. Now that we know the name of the style, we can view the style's code. Click on the :guilabel:`Styles` link, under :guilabel:`Data` on the left side of the page.

   .. figure:: img/sld_styleslink.png

      Click to go to the Styles page

#. Click on the style name as determined above.

#. A text editor will open up, displaying the SLD code for this style.

   .. figure:: img/styles_view.png

      Viewing the SLD code for this style


Editing existing style
----------------------

It is helpful when learning about SLD to edit existing styles rather than creating new ones from scratch. We will now do this with the style that was just opened.

#. Make a change to an RGB color value in a <CssParameter> value. For example, find the line that starts with ``<CssParameter name="fill">`` and change the RGB code to ``#0000ff`` (blue).

   .. figure:: img/styles_edit.png

      Editing the SLD code

#. When done, click :guilabel:`Validate` to make sure that the changes you have made are valid. If you receive an error, go back and check your work.

   .. figure:: img/styles_validated.png

      SLD code with no validation errors

#. Click :guilabel:`Submit` to commit the style change.

#. Now go back to the browser tab that contains the OpenLayers preview map. Refresh the page (Ctrl-F5), and you should see the color change to blue.

   .. note:: GeoServer and your browser will sometimes cache images. If you don't see a change immediately, zoom or pan the map to display a new area. 

   .. figure:: img/styles_edited.png

      Layer with a changed style

Loading new styles
------------------

If you have an SLD saved as a text file, it is easy to load it into GeoServer. We will now load the styles saved in the workshop :file:`styles` folder.

#. Navigate back to the Styles page by clicking on :guilabel:`Styles` under :guilabel:`Data` on the left side of the page.

#. Click on :guilabel:`Add a new style`.

   .. figure:: img/styles_page.png

      Styles page

#. A blank text editor will open.

   .. figure:: img/styles_new.png

      A blank text editor for making a new style

#. At the very bottom of the page, below the text editor, there is a box title :guilabel:`SLD file`. Click :guilabel:`Browse...` to navigate to and select your SLD file.

   .. figure:: img/styles_uploadsld.png

      Click to upload the SLD file

#. Select :file:`cities.sld`. 

   .. note:: Recall that the SLD files are in the :file:`styles` directory.

   .. figure:: img/styles_fileselect.png

      Selecting the cities.sld file

#. Click the :guilabel:`Upload...` link to load this SLD into GeoServer. The SLD will display in the text editor. The name of the style will be automatically generated.

   .. figure:: img/styles_displaysld.png

      SLD is uploaded

#. Click :guilabel:`Validate` to ensure that the SLD is valid.

#. Click :guilabel:`Submit` to save the new style.

#. Repeat steps 2-8 above with the two other SLD files in the the :file:`styles` directory:

    #. ``countries.sld``
    #. ``ocean.sld``

   We will leave the ``shadedrelief`` layer with the default style.


Associating styles with layers
------------------------------

Once the styles are loaded, they are merely stored in GeoServer, but not associated with any layers. The next step is to link the style with a layer.

.. warning:: If an SLD has references that are specific to a certain layer (for example, attribute names or geometries), associating that style with another layer may cause unexpected behavior or errors.

#. Navigate to the :guilabel:`Layers` page by clicking on :guilabel:`Layers` under :guilabel:`Data` on the left side of the page.

#. Click on the :guilabel:`earth:cities` layer to edit its configuration.

#. Click on the :guilabel:`Publishing` tab.

#. Scroll down mto the :guilabel:`Default style` drop down list. Change the entry to display the :guilabel:`cities` style. you should notice the legend change.

   .. figure:: img/styles_selectingnewstyle.png

      Associating the layer with a different style

#. Click :guilabel:`Save` to commit the change.

#. Verify the change by going to the layer's :guilabel:`Layer Preview` page. Zoom in the see the behavior change based on zoom level.

   .. figure:: img/styles_viewingnewstyle.png

      The cities layer with a different style
 
#. Repeat steps 2-6 for the ``earth:countries`` and ``earth:ocean`` layers, associating each with the appropriate uploaded style (``countries`` and ``ocean`` respectively). View each result in the Layer Preview.

Bonus
~~~~~

At this point, the ``earth:ocean`` layer won't display properly. Look at the SLD; can you figure out why not? The next section will explain.


External graphics and the data directory
----------------------------------------

SLD files have the ability to link to graphics in addition to drawing circles, squares, and other standard shapes. The ``earth:ocean`` style utilizes an ocean-themed graphic that will be tiled throughout the layer. While it is possible to put in a full URL to an online resource in the SLD, in practice that can be a time-consuming task for a server. In many cases, it makes sense to store the style locally.

If you look at the :file:`ocean.sld` file, you will see that an image is referenced, but with no path information. This means that GeoServer will expect the graphic to be in the same directory as the SLD itself. So in order for the ``earth:ocean`` layer to display properly, we will need to copy that file there manually.

   .. figure:: img/styles_externalgraphic.png

      SLD style showing a reference to an external graphic

#. The :file:`styles` directory of the workshop materials contains a file, :file:`oceantile.png`. We want to copy this file to the GeoServer styles repository, contained in the GeoServer data directory. In the OpenGeo Suite, the easiest way to get to the GeoServer Data Directory is go to the Start Menu and navigate to :menuselection:`Start --> Programs --> OpenGeo Suite --> GeoServer Data Directory`.

   .. note:: You can find the full path to the data directory by clicking :guilabel:`Server Status` on the left side of any GeoServer page.

#. In that directory, navigate into the :file:`styles` folder. You should see the :file:`ocean.sld` and all of the other SLD files created.

#. Copy the file :file:`oceantile.png` into the :file:`styles` directory.

   .. figure:: img/styles_datadirectory.png

      Copying the external graphic to the data directory

#. Now back in the browser, navigate to the :ref:`geoserver.webadmin.layerpreview` for the ``earth:ocean`` layer. If you copied the file correctly, you should see a ocean-like graphic tiled in the appropriate places now.

   .. figure:: img/styles_tiledgraphic.png

      The ocean layer with a tiled graphic

Revisiting the layer group
--------------------------

When all of your styles are associated with your layers, view the ``earthmap`` layer group once more by going to :guilabel:`Layer Preview`. It should look quite different now.

   .. figure:: img/styles_layergrouppreview.png

      Layer group with improved styling

   .. figure:: img/styles_layergrouppreviewzoom.png

      Detail of layer group

.. note:: If for some reason, the layer group fails to update with the new styles, go back the Layer Group page and verify that the :guilabel:`Default Style` box is checked for every layer.

