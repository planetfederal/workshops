.. _gsadv.filtering:

Data filtering
==============

Filtering is used to **limit data from a data source**. These limits can be based on criteria like:

* **Relevancy to the map or data context.** For example, displaying only certain results from a layer.
* **User-expressed interest.** For example, in a given layer, a user only wants to display features with a certain criteria.
* **Scale.** For example, to only show certain features at certain zoom levels.
* **Cartographic design.** For example, filters in SLD are what drive cartographic classifications.

The advantages of filtering are that it both allows you to separate data into multiple representations from a given source, as well as reduce the management headache of preparing data and maintaining more content than necessary.

In short, filtering allows you to separate data into multiple representations *from* the source, not *at* the source.

GeoServer supports two main filtering languages:

* OGC Filter encoding
* CQL/ECQL filter expressions

While not specifically filters, there are other ways to separate data from source with GeoServer:

* SQL Views
* Time/Elevation dimensions on WMS requests

All of these will be discussed in upcoming sections.

.. toctree::
   :maxdepth: 2

   cqlogc
   sqlviews
   wmsdims
