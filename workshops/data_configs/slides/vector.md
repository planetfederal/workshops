Optimizing raster data in GeoServer
=====================================

---

Goals
-----

- Increase GeoServer performance


---

Key ideas
---------

- Minimizing data access
- Minimizing processing
- Doing in advance as much as much calculations as possible, so they don't have to be done on real-time
- Fine tuning Geoserver
- Fine tuning any other software involved
- Mainly (but not limited to) data used for rendering

---

What are we going to see
------------------------

- Strategies for preparing data (theory) 
- Tools and examples of preparting data (practice)
- GeoServer elements to get the best out of your data
- Geoserver configuration tips

---

You already know about this!
----------------------------

- *Geoserver in production* workshop
- This workshop has a more practical approach
- This is mainly based on data, not just on GeoServer itself
- You are going to actually see how it is done

---

Preparing data
===============

---

Preparing data
----------------

- Ensure small size and fast access
- Avoid costly operations later

---

Preparing data (factors)
--------------------------

- File vs Database
- File format and size
- Cleaning unneeded data
- Level of detail
- Indexing (of both spatial and-non spatial components)
- Using the optimal CRS


---

Strategies
-----------

- Similar to raster strategies
- Indexing <=> Tiling
- Simplifying (generalization) <=> Pyramids


File formats
-------------

- Binary vs text-

Database
----------

- More optimized
- Spatial indexing
- Non-spatial indexing

ogr2ogr
--------

- Cleaning
- Reprojection
- Simplifying

