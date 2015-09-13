.. raster:

*******
Raster
*******

Serving up raster images through a WMS seems a little redundant; the advantage here is the WMS can read the highly specialized raster formats used for geospatial data and translate them into small bite sized chunks for web applications. In addition many raw raster formats (like radar imagery) cannot be visualized directly as is – you need to define a raster symbolizer to control how this information is portrayed.

For WMS Raster performance we need to focus on two aspects of raster data access:

* Crop - extracting data limited to a specific extent (such as zooming into a larger image)
* Sample - sampling data values, even if they are spread out over a wide area

Format selection
================

Do not use JPEG as your source imagery; it is simply too expensive to decode (the entire image needs to be brought into memory and so on). ArcGRID is a format for exchange of information and does not support fast operation.

You will find GeoTIFF performs extremely well; especially if you take some time to prepare it. The advanced wavelet formats like ECW and JPEG2000 are also recommended.

If you need to change the format of your data please use the gdal_translate command line tools.

Prepare your GeoTIFF Data
=========================

Using command line tools we can introduce overviews (to aid in sampling our data). The effect on performance is similar to filtering or simplifying geometry - far less disk access is required to produce the same visual.

.. admonition:: Exercise

   The GDAL command line utilities are very useful here:

   #. Navigate into :file:`raster\ne1\HYP_HR_SR_OB_DR` - we will be working on :file:`HYP_HR_SR_OB_DR.tif`.
   
   #. Use the gdaladdo tool to introduce an overlay into your geotiff (this acts as an overview and is used when zoomed out to provide lower levels of detail)::

        gdaladdo -r average HYP_HR_SR_OB_DR.tif 2 4 8 16
      
      The file size is now increased but we should see a dramatic performance improvement. When zoomed out GeoServer will be able to sample the much smaller overview(s).

      This setting helps with sampling raster data when zoomed out.

   #. Use the gdal_translate tool to introduce “inner tiling” (rather than the alternative which is striped rows).::

         gdal_translate -of GTiff -projwin -180 90 -50 -10 -co "TILED=YES" HYP_HR_SR_OB_DR.tif tiled.tif
      
      This setting helps with cropping raster data when zoomed in.

   .. note:: If you are working with “raw” data (such as radar bands) you may wish to reduce the dataset down to only the bands needed for display.

Image Mosaic and Image Pyramid
==============================

These two image formats make use of an interesting on disk convention to allow GeoServer to work with a file that has been split up into many individual tiles.

* Image Mosaic uses a shapefile as a spatial index to locate where individual files go.
* Image Pyramid extends this idea to support different zoom levels (similar to how overlay works inside a single tiff image).

This technique can be used to serve up truly staggering amounts of raster data while meeting your performance requirements. Each tile can be subject to the same optimization techniques mentioned for a single GeoTIFF file.

Pay Attention to Interpolation
==============================

Check the GeoServer configuration for interpolation options, these settings determine how many times the data is sampled for each pixel.

* Nearest Neighbour: samples once in the center of each pixel location.

* Bilinear: samples four times and adjusts the color appropriately.

* Bicubic: samples sixteen nearest cells and adjusts the color based on a smooth curve.

The more times sampling occurs the better the visual, but the slower the performance.

.. admonition:: Exercise

   #. Navigate to :menuselection:`Service --> WMS`.

   #. Compare the performance of Bicubic to Nearest Neighbour.
