.. _geoserver.styling:

Styling Layers in GeoServer
===========================

GeoServer can render geospatial data as images and return them for viewing in a browser. This is the heart of the Web Map Server (WMS).  However, geospatial data has no inherent instructions for visualization, therefore additional information, in the form of a style, needs to be applied to data for it to be displayed a certain way.

GeoServer uses the Styled Layer Descriptor (SLD) markup language to describe geospatial data.

In this section, we will:

#. Load an SLD file for (most of) our layers,
#. Have a quick look at the syntax of SLD, and 
#. Apply those styles to our layers.

Loading Styles
--------------

#. From the GeoServer menu, click on the :guilabel:`Styles` link

   .. figure:: img/gs_linkstyles.png
      :align: center
   
#. The list of all styles currently defined in GeoServer opens.

   .. figure:: img/gs_liststyles.png
      :align: center
   
#. Find the ``earth_cities`` style in your list. Scroll, page and/or sort if you have to. 

   .. figure:: img/gs_earthstyles.png
      :align: center

#. Click the entry to open the SLD **Style Editor**.

   .. figure:: img/gs_opensld.png
      :align: center
   
#. Two properties should be pretty evident here:

   * The **Name** of the style,
   * What/where the **SLD** is.
     
#. Have a look at the layout of the SLD. What do we notice?

   * It looks like XML
   * There are a few standard tags/attributes
   * Some specific symbology instructions happen in the middle
   * It's not terse   

#. This is a very basic SLD that universally renders a *square* in *dark yellow*.  We could start editing the SLD by hand to change some of this around, but there's an easier way to see differences in visualization.  At the bottom of this page, click the :guilabel:`Choose File` button and locate the file ``<workshop>\styles\cities.sld``. Select it and click :guilabel:`Open`.

   .. figure:: img/gs_browsesld.png
      :align: center

   .. warning:: Don't jump to the Submit button yet.  Patience. 

#. Now click the :guilabel:`Upload ...` link.

   .. figure:: img/gs_uploadsld.png
      :align: center

#. The contents of the SLD editor, are replaced by the contents of the SLD file which contains "far more elegant" styling instructions than the default. 

   .. figure:: img/gs_newsld.png
      :align: center

#. It's a good idea to click the :guilabel:`Validate` button to ensure that the code doesn't contain any errors.

#. Click the :guilabel:`Submit` button to save the uploaded SLD into the current style definition.

   .. figure:: img/gs_submitsld.png
      :align: center

   .. note:: The updated definition is saved as an SLD file on your local machine in :file:`<user>\\.opengeo\\data_dir\\styles\\`.

#. Repeat this process for both the ``earth_countries`` and ``earth_ocean`` styles. The source SLDs should be in your file:`<workshop>\\styles\\` directory.

#. Preview one/all/some of the layers ... How does it look now?

   .. figure:: img/gs_previewsld.png
      :align: center
   
Now you've got style!

