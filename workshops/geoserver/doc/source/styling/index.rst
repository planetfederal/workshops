.. _geoserver.styling:

Styling
=======

GeoServer can render geospatial data as images and return them for viewing in a browser.  This is the heart of :term:`WMS`.  However, geospatial data has no inherent visualization.  Therefore additional information, in the form of a style, needs to be applied to data in order to visualize it.

GeoServer uses the Styled Layer Descriptor (:term:`SLD`) markup language to describe geospatial data.  In this section, we will first explain basic SLD syntax and then show how to create and edit styles manually in GeoServer.  Finally, we will introduce Styler, a graphical style editor.

.. toctree::
   :maxdepth: 2
    
   sld
   styles
   geoexplorer