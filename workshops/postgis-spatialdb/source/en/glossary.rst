.. Master glossary for Spatial SQL for the Web Workshop.
.. _glossary:

Glossary
========

.. glossary::

    OGC
        The `Open Geospatial Consortium <http://www.opengeospatial.org/>`_ (OGC) is a standards organization that develops specifications for geospatial services.

    WFS
        The `Web Feature Service <http://www.opengeospatial.org/standards/wfs>`_ (WFS) specification from the :term:`OGC` defines an interface for reading and writing geographic features across the web.

    WMS
        The `Web Map Service <http://www.opengeospatial.org/standards/wms>`_ (WMS) specification from the :term:`OGC` defines an interface for requesting rendered map images across the web.

    SFSQL
        The `Simple Features for SQL <http://www.opengeospatial.org/standards/sfs>`_ (SFSQL) specification from the :term:`OGC` defines the types and functions that make up a standard spatial database.

    CRS
        A "coordinate reference system". The combination of a geographic coordinate system and a projected coordinate system.
        
    WKT
        "Well-known text". Can refer either to the text representation of geometries, with strings starting "POINT", "LINESTRING", "POLGYON", etc. Or can refer to the text representation of a :term:`CRS`, with strings starting "PROJCS", "GEOGCS", etc.  Well-known text representations are :term:`OGC` standards, but do not have their own specification documents. The first descriptions of WKT (for geometries and for CRS) appeared in the SFSQL 1.0 specification.
        
    KML
        "Keyhole Markup Language", the spatial XML format used by Google Earth. Google Earth was originally written by a company named "Keyhole", hence the (now obscure) reference in the name.
        
    GML
        The `Geography Markup Language <http://www.opengeospatial.org/standards/gml>`_ is the :term:`OGC` standard XML format for representing rich spatial feature information.
        
    JSON
        "Javascript Object Notation", a text format that is very fast to parse in Javascript virtual machines. In spatial, the extended specification for `GeoJSON <http://geojson.org>`_ is commonly used.
        
    JSTL
        "JavaServer Page Template Library", a tag library for :term:`JSP` that encapsulates many of the standard functions handled in JSP (database queries, iteration, conditionals) into a terse syntax.
        
    JSP
        "JavaServer Pages" a scripting system for Java server applications that allows the interleaving of markup and Java procedural code.
        
    SRID
        "Spatial reference ID" a unique number assigned to a particular "coordinate reference system". The PostGIS table **spatial_ref_sys** contains a large collection of well-known SRID values and text representations of the coordinate reference systems.