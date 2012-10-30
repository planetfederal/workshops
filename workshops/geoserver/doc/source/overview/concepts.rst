.. _geoserver.overview.concepts:

GeoServer concepts
==================

GeoServer uses lots of terminology, and this can sometimes be confusing, especially if you are unaccustomed to web mapping.  This section will introduce some of the most common terms used in GeoServer.  We will be using all of this information in the upcoming sections.

For more terms, please see the :ref:`geoserver.moreinfo.glossary`.

Workspace
---------

.. note:: A workspace is also sometimes known as a "namespace".

A **workspace** is the name for a notional container to group similar data together.  It is designed to be a separate, isolated space relating to a certain project.  Using workspaces, it is possible to use layers with identical names without conflicts.

Workspaces are usually denoted by a prefix to a layer name or store name.  For example, a layer called ``streets`` with a workspace prefix called ``nyc`` would be referred to by ``nyc:streets``.

Stores and layers must all have an associated workspace.

.. note:: Technically, the name of a workspace is a URI, not the short prefix.  A URI is a Uniform Resource Identifier, which is similar to a URL, but does not need to resolve to a web site.  In the above example, the full workspace could have been ``http://opengeo.org/nyc`` in which case the full layer name would be ``http://opengeo.org/nyc:streets``  GeoServer intelligently replaces the workspace prefix with the full workspace URI, but it can be useful to know the difference.

Store
-----

.. note:: A store is also sometimes known as a "datastore" when referring to vector (or feature) data, and "coveragestore" when referring to raster (or coverage) data.

A **store** is the name for a container of geographic data.  A store refers to a specific data source, be it a shapefile, database, or any other data source that GeoServer supports.

A store can contain many layers, as in the case of a database that contains many tables.  A store can also have a single layer, such as in the case of a shapefile or GeoTIFF, which can only contain one layer.  A store must contain at least one layer.

GeoServer saves the connection parameters to each store (such as a path to the shapefile, or credentials to connect to the database).  Each store must also be associated with one (and only one) workspace.

Layer
-----

.. note:: A layer is also sometimes known as a "featuretype".

A **layer** is a collection of geospatial features or a coverage.  Typically a layer contains one type of data (points, lines, polygons, raster) and has a single identifiable content (streets, houses, country boundaries, etc.).  Aside from individual features, a layer is the smallest grouping of geospatial data.

A layer corresponds to a table or view from a database, or an individual file.

GeoServer stores information associated with a layer, such as projection information, bounding box, associated styles, and more.  Each layer must be associated with one (and only one) workspace.

Layer group
-----------

A **layer group**, as its name suggests, is a collection of layers.  A layer group makes it possible to request multiple layers with a single WMS request.  A layer group contains information about the layers that comprise the layer group, the order in which they are rendered, the projection, associated styles, and more.  This information can be different from the defaults for each individual layer.

Layer groups do not respect the concept of workspace, and are relevant only to WMS requests.

.. figure:: img/concepts.png
   :align: center

   *Relationships between workspaces, stores, layers, and layer groups*


Style
-----

A **style** is a visualization directive for rendering geographic data.  A style can contain rules for color, shape, and size, along with logic including attribute-based rules and zoom-level-based rules.

Every layer must be associated with at least one style.  GeoServer recognizes styles in Styled Layer Descriptor (SLD) format.

