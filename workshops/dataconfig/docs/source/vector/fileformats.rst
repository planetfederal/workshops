.. _vector.fileformats:

Selecting the proper file format
================================

Although storing data in a database is usually preferable to a file-based storage solution, it is still possible to achieve good data access performance with file-based solutions. In the following sections, we will cover some of the data preparation recommendations for both storage options.

If you are not going to store your data in a database, choosing the right file format is critical. Some of the main factors affecting performance include:

* Text-based *versus* binary. Text based formats are always a bad idea, since they usually result in larger data volumes which means time-consuming parsing. Using a GML or a DXF file  will significantly degrade the data access performance in GeoServer. Text formats also do not support indexes, so the process for extracting a subset of the information is inefficient.

* Spatial indexing. Zooming into a given area makes it unnecessary to access the rest of the data. The process for identifying which features are within that given area is optimized when we can use a spatial index, something that most file formats do not support.

For file-based solutions, the shapefile format is usually the best option, since it is a binary format, supports spatial indexing, and is supported by GeoServer. The following examples will use shapefile data.

Shapefiles may provide better data access performance than databases (such as PostGIS), especially if a query returns a large number of features. For example, if you are rendering a feature collection at a small scale, accessing the data in a shapefile is likely to be faster than accessing equivalent data in a PostGIS database. If a query returns a small number of features, or when some other type of filtering is being applied, PostGIS data access will generally be faster, making a more robust solution for a wider scenario.

However, if you require a transactional web service (such as WFS-T) to modify the data, 
you should use a database. Regardless of any performance limitations, there are no file-based data storage solutions that support web-based transactions.

The indexing options, both spatial and non-spatial, provided by PostGIS are two of the main reasons for PostGIS's improved performance when compared to ????

.. todo:: missing end of sentence above


