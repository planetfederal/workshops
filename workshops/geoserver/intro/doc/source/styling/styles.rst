.. _geoserver.styling.styles:

Styles in GeoServer
===================

Every layer published in GeoServer must have at least one style associated with it. When manually loading layers as done in the :ref:`geoserver.data.shapefile` and :ref:`geoserver.data.geotiff` sections, GeoServer looks at the geometry of the data and assign a generic existing style based on that data type. When using the :ref:`Layer Importer <geoserver.data.import>`, GeoServer will generate a unique style for each layer, but still based on the geometry. We will now look at how GeoServer handles styles.

Viewing an existing style
-------------------------

#. Navigate to the :guilabel:`Layers` list. Select the ``earth:countries`` layer from the list of published layers.

   .. note:: Make sure to select ``earth:countries`` and not the other ``countries`` layer. Check the workspace to make sure.

#. Preview the layer to see its visualization by navigating to the :guilabel:`Layer Preview`, then clicking the :guilabel:`OpenLayers` link next to that layer.

   .. figure:: ../data/img/shp_openlayers.png

      Previewing the "countries" layer

#. Leave this preview window open and open up a new browser tab. In the new tab, navigate back to the main :ref:`geoserver.webadmin` page.

#. In order to view the style for this layer, we need to find out which style is associated with this layer. To do this, click :guilabel:`Layers` under :guilabel:`Data` on the left side of the page.

   .. figure:: img/styles_layerslink.png

      Click to go to the Layers page

#. Click the :guilabel:`Layer Name` link of :guilabel:`countries`.

   .. figure:: img/styles_layerspage.png

      The earth:countries layer in the layer list

#. You are now back at the layer configuration page. Notice there are four tabs on this page:

   * :guilabel:`Data` (default)
   * :guilabel:`Publishing`
   * :guilabel:`Dimensions`
   * :guilabel:`Tile Caching`

   Click the :guilabel:`Publishing` tab, then scroll down to the entry that says :guilabel:`Default Styles`. Make a note of the name of the style. (In the case of ``earth:countries``, the name of the style is called ``polygon``.)

   .. figure:: img/styles_publishingtab.png

      Layer configuration page: Publishing tab

#. Now that we know the name of the style, we can view the style's code. Click the :guilabel:`Styles` link, under :guilabel:`Data` on the left side of the page.

   .. figure:: img/sld_styleslink.png

      Click to go to the Styles page

#. Click the style name as determined above.

#. A text editor will open up, displaying the code for this style.

   .. figure:: img/styles_view.png

      Viewing the code for this style


Editing an existing style
-------------------------

It is helpful when learning about styles to edit existing ones rather than creating new ones. We will now do this with the style that was just opened.

#. Make a change to an RGB color value in a ``<CssParameter>`` value. For example, find the line that starts with ``<CssParameter name="fill">`` and change the RGB code to ``#0000FF`` (blue).

   .. figure:: img/styles_edit.png

      Editing the style code

#. When done, click :guilabel:`Validate` to make sure that the changes you have made are valid. If you receive an error, go back and check your work.

   .. figure:: img/styles_validated.png

      Style code with no validation errors

#. Click :guilabel:`Submit` to commit the style change.

#. Now go back to the browser tab that contains the OpenLayers preview map. Refresh the page, and you should see the color change to blue.

   .. note:: GeoServer and your browser can both cache images. If you don't see a change immediately, zoom or pan the map to display a new area. 

   .. figure:: img/styles_edited.png

      Layer with a changed style

Loading new styles
------------------

If you have a style file saved as a text file, it is easy to load it into GeoServer. We will now load the YSLD styles saved in the workshop :file:`styles` folder.

.. note:: The procedure for loading SLD files is exactly the same.

#. Navigate back to the Styles page by clicking :guilabel:`Styles` under :guilabel:`Data` on the left side of the page.

#. Click :guilabel:`Add a new style`.

   .. figure:: img/styles_page.png

      Styles page

#. A blank text editor will open.

   .. figure:: img/styles_new.png

      A blank text editor for making a new style

#. At the very bottom of the page, below the text editor, there is an area where you can populate a style based on an existing text file. click :guilabel:`Choose File...` to navigate to and select a style file.

   .. figure:: img/styles_uploadstyle.png

      Click to upload the style file

#. Select the :file:`cities.ysld` file. Recall that the style files are in the :file:`styles` directory of your workshop bundle.

#. Back in GeoServer, click the :guilabel:`Upload...` link to load this style file into GeoServer.

   .. figure:: img/styles_uploadlink.png

      This link will upload the file to GeoServer.

#. The code will display in the text editor. The name of the style will be automatically generated.

   .. figure:: img/styles_displaystyle.png

      Style file is uploaded

#. Click :guilabel:`Validate` to ensure that the style is valid.

#. Change the title to :guilabel:`Cities`.

   .. note:: The capital letter will help distinguish the uploaded styles from other similar-looking style names. The specific name isn't important though. 

#. Make sure the :guilabel:`Format` is set to :guilabel:`YSLD`.

   .. figure:: img/styles_nameandformat.png

      Name and format for new style

#. Click :guilabel:`Submit` to save the new style.

#. Repeat the above steps with the two other YSLD files in the the :file:`styles` directory:

   * ``countries.ysld``
   * ``ocean.ysld``

   .. note:: We will not upload a new style for the ``shadedrelief`` layer.

Associating styles with layers
------------------------------

Once the styles are loaded, they are merely stored in GeoServer, but not associated with any layers. The next step is to link the styles with their appropriate layer.

.. warning:: If a style file has references that are specific to a certain layer (for example, attribute names or geometries), associating that style with another layer may cause errors or unexpected behavior.

#. Navigate to the :guilabel:`Layers` page.

   .. figure:: img/styles_layerslink.png

      Click to go to the Layers page

#. Click the :guilabel:`earth:cities` layer to edit its configuration.

#. Click the :guilabel:`Publishing` tab.

#. Scroll down to the :guilabel:`Default style` drop down list. Change the entry to display the :guilabel:`Cities` style. You will see that the legend changes.

   .. figure:: img/styles_selectingnewstyle.png

      Associating the layer with a different style

#. Click :guilabel:`Save` to commit the change.

#. Verify the change by going to the layer's :guilabel:`Layer Preview` page. Zoom in the see the behavior change based on zoom level.

   .. figure:: img/styles_viewingnewstyle.png

      The cities layer with a different style
 
#. Repeat the above steps for the ``earth:countries`` and ``earth:ocean`` layers, associating each with the appropriate uploaded style (``Countries`` and ``Ocean`` respectively). View each result in the Layer Preview.

Bonus
~~~~~

At this point, the ``earth:ocean`` layer won't display properly. Look at the style file; can you figure out why not? The next section will explain.

.. _geoserver.styling.styles.extgraphics:

External graphics and the data directory
----------------------------------------

Style files have the ability, in addition to drawing circles, squares, and other standard shapes, to link to graphics files. The ``earth:ocean`` style utilizes an ocean-themed graphic that will be tiled throughout the layer. While it is possible to link to a full URL that references an online resource, in practice that is less efficient than storing the file locally and linking to it there.

Below is the entire :file:`ocean.ysld` file. Notice that on **lines 11-13**, you will see that an image is referenced, but with no path information.

.. code-block:: yaml
   :linenos:
   :emphasize-lines: 11-13

   name: 'Ocean'
   title: 'Ocean: Graphic fill'
   feature-styles:
   - rules:
     - scale: [min, max]
       symbolizers:
       - polygon:
           fill-graphic:
             size: 16
             symbols:
             - external:
                 url: oceantile.png
                 format: image/png

This means that GeoServer will expect the graphic to be in the same directory as the file itself. So in order for the layer to display properly, we will need to copy that file manually.

#. The :file:`styles` directory of the workshop materials contains a file, :file:`oceantile.png`. We want to copy this file to the GeoServer styles repository, contained in the GeoServer data directory. In OpenGeo Suite for Windows, the easiest way to get to the GeoServer data directory is go to the Start Menu and navigate to :menuselection:`OpenGeo Suite --> Data Directory`.

   .. figure:: img/styles_datadirstartmenu.png

      Data Directory in the Start Menu

   You can also find the full path to the data directory by clicking :guilabel:`Server Status` on the left side of any GeoServer page.

   .. figure:: img/styles_serverstatus.png

      Server Status page showing location of GeoServer Data Directory

#. Once located, navigate to the GeoServer Data directory.

#. Navigate into the :file:`styles` folder. 

#. Copy the :file:`oceantile.png` file from the workshop materials into the :file:`styles` directory.

#. Now back in GeoServer, navigate to the :ref:`geoserver.webadmin.layerpreview` for the ``earth:ocean`` layer. If you copied the file correctly, you should see a ocean-like graphic tiled in the appropriate places now.

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

