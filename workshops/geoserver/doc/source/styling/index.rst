.. _geoserver.styling:

Styling
=======

GeoServer can render geospatial data as images and return them for viewing in a browser. This is the heart of :term:`WMS`. However, geospatial data has no inherent visualization. Therefore additional information, in the form of a style, needs to be applied to data in order to visualize it.

We have already seen automatic/generic styles in action with the layers loaded in previous sections. In this section we will discuss how those styles are generated.

GeoServer uses the Styled Layer Descriptor (:term:`SLD`) markup language to describe geospatial data. We will first explain basic SLD syntax and then show how to create and edit styles manually in GeoServer. Finally, we will introduce GeoExplorer, a browser-based apllication that contains a graphical style editor.

.. toctree::
   :maxdepth: 2
    
   sld
   styles
   geoexplorer
