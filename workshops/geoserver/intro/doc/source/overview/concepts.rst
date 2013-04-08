.. _geoserver.overview.concepts:

GeoServer concepts
==================

You'll encounter lots of terminology when working with GeoServer, and some of it may be unfamiliar, especially if you are unaccustomed to web mapping. This section will introduce some of the most commonly-used terms used in GeoServer. All of these terms will be uses in the upcoming sections.

For more terms, please see the :ref:`geoserver.moreinfo.glossary`.


.. _geoserver.overview.concepts.workspace:

Workspace
---------

A **workspace** (sometimes referred to as a namespace) is the name for a notional container for grouping similar data together. It is designed to be a separate, isolated space relating to a certain project. Using workspaces, it is possible to use layers with identical names without conflicts.

Workspaces are usually denoted by a prefix to a layer name or store name. For example, a layer called ``streets`` with a workspace prefix called ``nyc`` would be referred to by ``nyc:streets``. This would not conflict with another layer called ``streets`` in another workspace called ``dc`` (``dc:streets``)

:ref:`Stores <geoserver.overview.concepts.store>` and :ref:`layers <geoserver.overview.concepts.layer>` must all have an associated workspace. :ref:`Styles <geoserver.overview.concepts.style>` may optionally be associated with a workspace, but can also be global.

.. note:: Technically, the name of a workspace is a URI, not the short prefix. A URI is a Uniform Resource Identifier, which is similar to a URL, but does not need to resolve to a web site. In the above example, the full workspace could have been ``http://nyc`` in which case the full layer name would be ``http://nyc:streets``.  GeoServer intelligently replaces the workspace prefix with the full workspace URI, but it can be useful to know the difference.

.. figure:: img/concepts_workspace.png

   Workspace

.. _geoserver.overview.concepts.store:

Store
-----

A **store** is the name for a container of geographic data. A store refers to a specific data source, be it a shapefile, database, or any other data source that GeoServer supports.

A store can contain many :ref:`layers <geoserver.overview.concepts.layer>`, such as the case of a database that contains many tables. A store can also have a single layer, such as in the case of a shapefile or GeoTIFF. A store must contain at least one layer.

GeoServer saves the connection parameters to each store (the path to the shapefile, credentials to connect to the database). Each store must also be associated with one (and only one) :ref:`workspace <geoserver.overview.concepts.workspace>`.

A store is sometimes referred to as a "datastore" in the context of vector data, or "coveragestore" in the context of raster (coverage) data.

.. figure:: img/concepts_store.png

   Store

.. _geoserver.overview.concepts.layer:

Layer
-----

A **layer** (sometimes known as a featuretype) is a collection of geospatial features or a coverage. Typically a layer contains one type of data (points, lines, polygons, raster) and has a single identifiable subject (streets, houses, country boundaries, etc.). A layer corresponds to a table or view from a database, or an individual file.

GeoServer stores information associated with a layer, such as projection information, bounding box, and associated styles. Each layer must be associated with one (and only one) :ref:`workspace <geoserver.overview.concepts.workspace>`.

.. figure:: img/concepts_layer.png

   Layer

.. _geoserver.overview.concepts.layergroup:

Layer group
-----------

A **layer group**, as its name suggests, is a collection of layers. A layer group makes it possible to request multiple layers with a single WMS request. A layer group contains information about the layers that comprise the layer group, the order in which they are rendered, the projection, associated styles, and more. This information can be different from the defaults for each individual layer.

Layer groups do not respect the concept of :ref:`workspace <geoserver.overview.concepts.workspace>`, and are relevant only to WMS requests.

.. figure:: img/concepts_layer.png

   Layer

The following graphic shows the various relationships between workspaces, stores, layers, and layer groups.

.. figure:: img/concepts.png

   Relationships between workspaces, stores, layers, and layer groups

.. _geoserver.overview.concepts.style:

Style
-----

A **style** is a visualization directive for rendering geographic data. A style can contain rules for color, shape, and size, along with logic for styling certain features or points in certain ways based on attributes or scale level.

Every layer must be associated with at least one style. GeoServer recognizes styles in Styled Layer Descriptor (SLD) format. The :ref:`geoserver.styling` section will go into this topic in greater detail.

