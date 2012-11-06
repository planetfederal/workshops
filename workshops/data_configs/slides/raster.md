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

- File format and properties
- File size
- Structure/Layout
- CRS

- They should be combined.

---

Formats
--------

- Binary vs text-based
- Compression
- Inner tiling
- Overviews
- Color representation

---

Formats
--------

- ASC
- TIFF
- PNG
- JPEG
- JPEG2000

- Proprietary formats (MrSid, ECW)

---

Compression
--------------

- No compression
- Lossy
- Loseless

- Compression can make your files bigger!

---

Compression methods
--------------

- JPEG 
	- lossy. 
	- visually lossless
- LZW
	- lossless
	- good for images with homogeneous areas
	- good for images with few colors	
- Wavelets

---


Color representation
---------------------

RGB implies larger data volume
Paletted images imply less color detail but smaller data volume
Depending on image characteristics
Relation to compression method


---

The TIFF format
----------------

- A very versatile format
- Supports inner tiling
- Supports overviews
- Supports different compression methods
- GeoTiff
- BigTiff

---

Strategies for data structuring
---------------------------------

- Single file
- Mosaic (tiles)
- Pyramid

- Dependent on data size and file format

---

Strategies for data structuring (suggestions)
----------------------------------------------

- Assuming Tiff format in all cases
- Single (well prepared!) file for less than 4Gb
- Mosaic (with well prepared tiles) if larger than 4Gb
- Pyramid for massive data.

--- 

Single file
-----------

- File format/characteristics is crucial
- Optimizations for single files should be applied in all other cases as well
- "Un-tiling" is a good idea in some cases (don't abuse the advance features)

---


Mosaic (tiles)
--------------

- Tile size (not too small)
- Tiles with inner tiling
- Tiles with overviews

---

Pyramid (overviews)
--------------------

- Number of levels
- Resampling methods
- Each level is a mosaic


GDAL tools
-----------

- ``gdaltranslate`` (format conversion and reprojection)
- ``gdaladdo`` (adding overviews)
- ``gdal_retile`` (tiling)
- ``gdal_merge`` (merging, "un-tiling")
- ``rgb2pct`` (creation of paletted images)

---

Other tools
-----------

- QGIS as GDAL frontend
- Other QGIS tools


GeoServer elements
===================

---

ImageMosaic plugin
-------------------

---

ImagePyramid plugin
---------------------

---

Fine tuning GeoServer
======================

---

ImageMosaic plugin settings
-------------------

---

ImagePyramid plugin settings
-----------------------------

---

Coverage Access settings
---------------------------

- Used to optimize multithreaded access in mosaics
- Use 2 X #cores threads
- Threshold for WCS requests

---

JAI settings
----------------------

- Use native JAI
- Use native ImageIO
- Enable native mosaic acceleration
- Enable Tile recycling if there are no memory problems
- Use 2 X #cores in Tile threads

---

Reprojection settings
---------------------

- -Dorg.geotools.referencing.resampleTolerance
- Default value of 0.333
- Larger values mean better performance, but less precision
- Set accordingly with dataset characteristics and goals.

- Remember to select the right CRS.


---



