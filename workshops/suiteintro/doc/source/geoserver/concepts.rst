.. _geoserver.concepts:

GeoServer Concepts
==================

GeoServer uses lots of terminology, that can be confusing if you are not used to web-mapping. This section introduces the GeoServer terms that we will use in upcoming sections.

Workspace
---------

A **workspace** is the name for a notional container used to group similar data together. It is designed to be a separate, isolated space relating to a certain project. Using workspaces, it is possible to use layers with identical names (in other workspaces) without conflict.

Workspaces are usually used as a prefix to a layer or store. For example, a layer called ``streets`` in a workspace called ``nyc`` would be referred to by ``nyc:streets``.

Stores and layers must all have an associated workspace.

.. note:: Technically, the name of a workspace is a URI, not the short prefix. A URI is a Uniform Resource Identifier, which is similar to a URL, but does not need to resolve to a web site. In the above example, the full workspace could have been ``http://opengeo.org/nyc`` in which case the full layer name would be ``http://opengeo.org/nyc:streets`` GeoServer intelligently replaces the workspace prefix with the full workspace URI, but it can be useful to know the difference.

Store
-----

A **store** is the name for a container of geographic data. A store refers to a specific data source, be it a shapefile, database, or any other data source that GeoServer supports.

* A store can contain many layers, as in the case of a database that contains many tables.

* A store can also have a single layer, such as in the case of a GeoTIFF, which can only contain one layer.

* A store must contain at least one layer.

GeoServer saves the connection parameters to each store (such as a path to the shapefile, or credentials to connect to the database).

Each store is associated with one (and only one) workspace.

Layer
-----

A **layer** is a collection of geospatial features or a coverage.

* Typically a layer contains one geometry type (points, lines, polygons, raster), and

* Has a single type of content (streets, houses, country boundaries, etc.).

Aside from individual features, a layer is the smallest grouping of geospatial data.

A layer corresponds to a table or view from a database, or an individual file.

GeoServer stores information associated with a layer, such as projection information, bounding box, associated styles, and more. Each layer must be associated with one (and only one) workspace.

Layer Group
-----------

A **layer group**, as its name suggests, is a grouping of layers. A layer group makes it possible to request multiple layers with a single WMS request. 

A layer group contains information about the layers that comprise the layer group, the order in which they are rendered, the projection, associated styles, and more. This information can be different from the defaults for each individual layer.

Layer groups do not respect the concept of workspace, and are relevant only to WMS requests.

Style
-----

A **style** is a visualization directive for rendering geographic data.

A style can contain basic instructions for color, shape, and size, along with advanced rules for rendering features differently based on attributes and zoom-levels.

Every layer must be associated with at least one style (GeoServer applies a default style to each new layer). 

GeoServer recognizes styles in Styled Layer Descriptor (SLD) format.


The following diagram summarizes how the carious concepts in this section interact:

.. figure:: img/concepts.png
   :align: center

   *Relationships between workspaces, stores, layers, and layer groups*