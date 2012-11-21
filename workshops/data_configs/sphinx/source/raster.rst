Optimizing raster layers in GeoServer 
=====================================

.. only:: workshop

Outline 
--------

This workshop presents some of the techniques and tools that are available to improve GeoServer performance when working with raster layers. Some of these techniques involve altering the data itself, while others consider how the data is structured and organized. Although we will cover 
some GeoServer-specific settings, most of these optimizations should result in improved general performance for other applications working with the same data. 


Introduction 
-------------

The performance for publishing raster layers with GeoServer depends on a number of parameters, many of which are related to how the source data is stored. The time it takes to read and prepare the the data can have a significant impact on performance.

.. only:: workshop

We can see this clearly in a simple example. Download `this zip file <http://link.to.file>`__. This file contains four different representations of the same file.

.. code-block:: console

 	image1.png 
 	image2.jpg 
 	image3.tiff 
 	image4.tiff

.. only:: workshop

As you can see, the images are stored a three different formats. We will use these files to illustrate how, although they contain the same image and appear similar, they exhibit different performance profiles in GeoServer. Even when files appear to be stored in the same format, as with the two .tiff files, the performance profiles can differ depending on the parameters used to create the files.

.. only:: workshop

First of all, let’s have a look at the sizes of those images.

.. code-block:: console

	image1.png 136.052.194 
 	image2.jpg 12.480.346 
 	image3.tiff 34.896.016 
 	image4.tiff 52.921.428

The PNG format file is clearly the larger file, while the JPG format is the smallest file. TIFF files are similar in size to the JPG format. The relatively compact JPG format seems the obvious choice if data storage is limited and its smaller file sizes might suggest better data access performance as well. However there are other factors to consider that may negate these advantages.


.. only:: workshop

Let’s move to GeoServer now. The first thing we have to do is import the images into GeoServer. You can do this manually through the GeoServer web administration interface. If you have the ``curl`` command line tool installed, you can use the ``import_layers`` script included in the image zip file to import the images using Geoserver’s REST API. Just make sure GeoServer is running before executing the script.

To assess the relative performance of accessing each file format in GeoServer, we will be using Google Chrome's built-in tools to measure performance (similar tools are provided for other browsers, feel free to your preferred browser). Open the GeoServer :guilabel:`Layer Preview` page. In the row representing the first image (``image1.png``), click :command:`Go` to see open a preview of the layer in OpenLayers. Once the page is loaded, press Ctrl+Shift+I (Command+Alt+I on a MAC ) to open the Chrome Developer Tools window. Select the :guilabel:` Network` tab.

You should see something similar to the following:

.. figure:: imgs/chrometools.jpg

   *Chrome browser developer tools*

As you start making requests, you will notice the time it takes to respond to each request is reported in the *Time* column. Do some zooming and panning around the image and keep an eye on the results recorded in this column. The request times may appear longer than expected, and pan and zoom operations are not as smooth as they could be, mostly due to the size of the image.

Repeat the same process with the JPG image. Perhaps surprisingly, you should experience something similar. The request response times are a bit shorter, but still long enough to delay the pan and zoom operations.

If you now open the first TIFF file (``image3.tiff``), it might take some time to render the image when the full extent is displayed for the first time, but once loaded if you zoom and pan around the image you should see much better response times. If you zoom to the maximum resolution (so you can see the actual pixels), response times are almost immediate and pan operations are smooth. The layer access performance for the TIFF format file is demonstrably better than the JPG and PNG formats.

Let’s try to improve the performance at low resolution. Preview the second TIFF image layer, ``image4.tiff``. You should notice that it displays much faster than the other three images. If you zoom and pan around the image, you should also see that the response times are similar at all scales and there is no difference in terms of performance between the different zoom levels.

This simple test demonstrates how important the appropriate file format and the appropriate configuration are in optimizing system performance.

In the remainder of this workshop, we will investigate why this discrepancy in layer access performance occurs and how to create appropriate files and file structures.

For both the PNG and the JPG format files, even when only part of the image has to be rendered, the whole image has to be opened and read first—this operation incurs a significant processing overhead. 

The first TIFF file (``image3.tiff``) is divided internally into tiles, so when you zoom to a given area, only the data corresponding to that area is accessed. However, previewing the full extent of the image still requires a full scan.

For both the JPG and PNG images, pixel values are written sequentially, starting from one corner of the image, and ending in the diagonally opposite corner. 

.. todo:: need more of explanation here as to why this sequential write process affects performance

The last TIFF image (``image4.tiff``) contains additional, lower resolution, images (hence its larger size), so when a full scan is required, the scan is performed on those lower resolution images instead of the original higher resolution image.

These different data storage techniques explain the variations in layer access performance and provide the focus for our performance optimization strategies. We will discuss this further in this tutorial and see how to apply these optimizations with GeoServer, even when the data is not available in a single file as in this example.

Working with raster tiles and pyramids 
--------------------------------------

There are several optimization techniques available for working with large raster layers. Some of these techniques rely on a horizontal division, sub-dividing the layer into smaller sections, so only those sections of the data that are required are accessed. The layer can be accessed partially, depending on the request. This process is usually referred to as *tiling*.

.. figure:: imgs/mosaic.png

   *Image tiling*


When the layer is tiled, the image covering a given area is comprised of a set of smaller images covering sections of the original area.

Other techniques are used when viewing the layer at a lower scale, and although the whole extent of the layer might be rendered, not all of the data in the layer needs to be accessed to render the final image.
 
For instance, consider the first zoom level when you opened the layer preview. Although the original image has 10800 x 10800 pixels, the image rendered in your screen is much smaller because your screen resolution is lower than the original image. Creating the image you see on the screen from the original image is a time consuming process, and involves reading more data than is required to create the lower resolution version.

One solution to this problem is to maintain several versions of a given image, suitable for representation at different scales, in a **pyramid** data structure illustrated next.
as illustrated next. 

.. figure:: imgs/pyramid.png
  
   *Raster pyramids*

Maintaining different resolution versions of the data means the amount of resampling required is reduced, as presampling has already been performed to create those versions. When an image is requested at a given rendering scale, the version closest to that scale is used, optimizing the layer access performance.

You can see the number of image pixels in each level in the pyramid is 1/4 of the number of image pixels at the next level. Each dimension (width, height) of the image is halved, and the area previously represented by four pixels is now represented by just one. 

.. figure:: imgs/tilingandpyramid.png

   *Pyramid data structures*

As pyramids provide a progressive decrease in resolution, there should always be an 
optimal level of resolution to respond to a given layer access request.

Tiling and pyramid data structures can be used together to improve the data access performance of GeoServer and any other application accessing the same raster data, since these optimizations are independent of the application requesting access to the date. 

Some file formats support internal pyramids, also known as *overviews*, where a single file contains all the different resolution images. Other file formats don’t support overviews.

.. todo:: could you give an example of the formats that do/don't support overviews? 

Also, some formats support inner tiling, while others do not, or they support it just for one pyramid level (in case they support inner pyramids). 

.. todo:: please clarify - do you mean internal tiling?

GeoServer can take advantage of image pyramids containing several tiled versions of the same image, with those versions maintained in separate files. Such a file structure provides much better data access performance, since a request covering a section of the image, at any scale, means only the tiles overlapping the requested area are read.

In some cases, tiling and pyramid data structures are sufficient have provide good performance. However, with large datasets, it is better to manually create a pyramid as a collection of files and folders, and let GeoServer handle that structure efficiently.

In this tutorial we will see how to use tiling and pyramids, both internal and external, to achieve the optimal configuration for our system and dataset.

Working with raster tiles and pyramids in GeoServer 
---------------------------------------------------

With the techniques described above, there are several possibilities for configuring our GeoServer instance for a given dataset. These include:

* A single file that may have inner tiles and/or overviews 
* A set of tiles 
* A pyramid

The choice of configuration depends largely on the size of your dataset. The following general guidelines apply:

* If your dataset is smaller than 1 or 2 GB, the best option is usually to keep your data in a single file, provided that file is optimized with tiles and overviews. If your data format that does not support tiling and overviews, you could either create a mosaic of tiles or, preferably, translate the data into a different format that does support tiling and overviews. 
* Datasets larger than 2 GB should be tiled in smaller files, using inner pyramids and tiles if possible. 
* If your dataset is really large, and will be used at all scales, create an external pyramid.

.. todo:: can you define what you mean by really large? > 10Gb?

Some notes on pyramids and tiles
--------------------------------

Let’s review some the ideas and concepts we have discussed before we move onto setting  up our data, create tiles and pyramids if needed, and configuring all of them in GeoServer. 

Since the pyramid case is the more complex data structure, we will review the process for creating a pyramid. You should consider several factors that may influence the data access performance and consider how best to provide access to the different sections of the source image, at all scales.

For large images, we want to create an efficient pyramid that will provide the optimal access to the data. This involves two steps—tiling the image and creating the different levelså of the pyramid. The pyramid configuration parameters are discussed next. 

Tile size 
~~~~~~~~~

Tiling optimizes the amount of data that has to be read for any given area. In our original image, at its original resolution, the whole image has to be read even if we are going to display a small area in one corner. By creating tiles and storing them in separate files, only those tiles that cover the area of interest are required.

All tiles in a pyramid (not just those tiles stored at the original resolution) are the same size, and that size is determined before creating the pyramid. A small tile size will reduce the amount of data required to satisfy a request for a given area. Too small a tile size could degrade the data access performance as many tiles must be read to satisfy the request. 

The application accessing the pyramid, for this workshop GeoServer, must maintain an index of all available tiles to know which tiles are needed for a given request. More tiles means a larger application database, and also a larger number of files (one for each tile). This could have a negative impact on performance.

On the other hand, if tiles are too big the advantage of tiling is lost. A tile size of approximately 0.5-1GB is a reasonable solution for optimum file management and reducing the total number of tiles required.

Creating a tiled scheme with several files does not make the inner tiles redundant. 
Inner tiling supports the creation of larger tile files, which eventually will increase performance.

.. todo:: a diagram here would be useful. I also think we need clarification on inner and outer tiling - it's not clear.

Pyramid levels 
~~~~~~~~~~~~~~

The base level (highest resolution) of the pyramid will have the number of tiles defined by the tile size. Let's suppose our image has a size of 8192 x 8192 pixels. If we use a tile size of 1024 x 1024 pixels, we will have 64 (8 x 8) tiles. At the top of the pyramid we will have a single tile, covering the whole extent. In between, and considering that the number of pixels (and the number of tiles) multiplies by four at each level, we can have a level with four tiles (2 x 2) and another one with 16 (4 x 4) tiles. In total, we will have four levels starting at the maximum resolution defined by the original image, to the top of the pyramid, at the lowest resolution, with a single tile.

.. todo:: needs diagram here

The number of levels depends on the tile size. The following formula will calculate the number of levels required to complete the full pyramid.

.. math:: n = \log_2(\frac{width}{tile\_width})

.. todo:: format of math output doesn't seem right

We're assuming in this case the image is square, so it has the same value for its height and width. If the image isn't square, the larger value should be taken. 

.. todo:: what larger value - the larger of the width or the height?

Tiles are also assumed to be square—this is the most common configuration.

In the example above, the result is an integer. If the result is not an integer, the truncated value (the lower integer closest to that value) should be taken.

It might not always be necessary to create all of the pyramid. We can save disk-space by restricting the number of levels to just those we require. Remember that at each level the scale of the corresponding layer is divided by two, so if our original image corresponds to 1:100000 scale, the single-tile level correspond to a 1:800000 scale. However, if we don't anticipate rendering that image at that scale (we will use a different image for scales over 1:200000), the tiles corresponding to that scale would never be used. In that case, we would just need two levels in our pyramid.

File format 
~~~~~~~~~~~

Tiles can be saved in many formats, including the original format of the image the pyramid is created for. Choosing the right format can have a significant influence on system performance, since it influences both the size of files to be created and the amount of processing required to access the image data (which might be compressed).

Formats that don't support overviews—JPEG and PNG—should not be used for large images, as the data access performance would suffer. The TIFF format does support overviews.

.. todo:: you use JPEG here but JPG elsewhere - be consistent

ECW and MrSID formats support both tiling and overviews, but unfortunately both are not open formats and are not supported by many applications. GeoServer does support both formats, providing a valid license is available. The TIFF format is among the best and most popular of all the raster data formats, and will be used in this workshop.

The TIFF format is complex and can be used in a number of configurations. The different configurations influence how effective the TIFF format is for generating a raster pyramid. 

The first TIFF file parameter to consider is the *compression* type. Although TIFF files can be saved with no compression, using raw, uncompressed data is generally not a good idea and will result in poor data access performance. A better option is to consider using one of the compression algorithms, both lossy and lossless, to compress the original data.

.. note:: A lossy compression algorithm compresses the data by discarding or loosing some of the data with each compression. The loss of data is permanent and lossy compression is not suitable for datasets that may be used for analysis or deriving other data products. A lossless compression algorithm on the other hand supports file compression but also allows the original data to be reconstructed from the compressed data. There is no permanent loss of data with lossless compression algorithms and may be used on raster datasets that will be used for analysis. LZW and Deflate are commonly used lossless compression algorithms. JPEG is a popular lossy compression algorithm.

Choosing one compression algorithm or another depends on several factors. In general, if your are going to use your data primarily for rendering, JPG is a good choice as although it produces a lossy compression, it can be considered as visually lossless. 
If the data being compressed is an actual measurement (DEM, Temperature, and so on) or any other value not representing an image, lossless compression is the better option, as the original values are preserved.

LZW compression works better on data with repeated patterns, so it is of particular interest for those layers with large areas of a single values, such as no-data values or with categorical values, like the image shown below.

.. figure:: imgs/categories.png

   *Image categories*

TIFF format files support internal tiles, which is a useful for large tile sizes. Having each tile file internally tiled can speed up data access operations.

.. todo:: think the above statement needs some clarification

For very large files, there is also the BigTIFF format, which supports the creation of files larger that 4 Gb (the limit for TIFF).


Resampling algorithm 
~~~~~~~~~~~~~~~~~~~~

Creating pyramids involves completing resampling operations in advance of using the data, so the application accessing the pyramid does not need to perform the same operation on the original image. Resampling may be performed using different algorithms, some of which will produce higher quality resampled images than other algorithms. More complex algorithms can produce better quality images but it usually takes longer to create the pyramid.

A nearest neighbor interpolation is the simplest method and it is a good option for non-image data such as elevation data and so on. However this interpolation technique is not recommended for images. It is suitable for resampling raster layers with categorical data published via a  Web Coverage Service (WCS) service.


Coordinate Reference System 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Coordinate Reference System (CRS) is not strictly speaking a parameter of the pyramid itself, but it may be important when accessing the data. The main advantage of a tiling and/or pyramid data structure is that certain operations are performed in advance and do not have to be performed each time a data request is processed. As reprojecting data can be a time consuming task, choosing the most appropriate CRS for the pyramid data will improve system performance. *Most appropriate* in this context means choosing the CRS that will be requested most frequently. This also applies to single files and other data formats.

RGB *vs* paletted images 
~~~~~~~~~~~~~~~~~~~~~~~~

There are different methods for storing colors in an image. In the RGB color space, a color is expressed as a combination of three components—red, green and blue. This supports the representation of virtually every color that may appear in an image. However, if an image includes only a few colors, the full RGB model is unnecessary and a paletted image should be considered instead. Palatted images store the RGB definition of those colors in a list, and the index of the color required for each pixel is also stored in that list. This means a single value, not three values, is used to represent each color, helping to reduce file sizes and promoting faster data access.

Compare the two images below. The top image uses the RGB color model, whereas the bottom image is a palatted image.

.. figure:: imgs/rgb.jpg

   *RGB image*

.. figure:: imgs/paletted.jpg

   *Paletted image* 

Palettes are usually limited to 256 colors. As each RGB component is represented in the 0-255 range, a paletted image size corresponds to a single band representing one of those components. Although this may be less than the number of colors used in the image, we can still use a palette, choosing the colors that are closest to the colors in the palette. The trade-off is smaller file sizes versus a lower quality image.

Providing we do not degrade the image too much, this can be useful for improving performance. For some images, like the bottom image in our examples above, using a palette does not mean less color detail as the number of colors used is smaller.

RGB images can be converted into paletted images using the GDAL ``rgb2pct`` tool. 

.. note:: GDAL is part of FWTools, and if you are running Windows, installing FWTools is the recommended way of using GDAL. We will be using other GDAL tools for most of the examples in this tutorial.

For a simple conversion, just provide the input filename and the required output filename as parameters. To transform our ``image3.tiff`` image into a paletted image named ``image3p.tiff`` we would the following.

.. code-block:: console

 $rgb2pct image3.tiff image3p.tiff

The default output format is TIFF. You may provide an alternate format if required 

As a general rule, use the ``rgb2pct`` tool when working with images like lower image above. For other images, consider your particular requirements to find the right balance between image quality and performance. Color map conversion should generally be completed before the other data preparations that we cover discuss next. 

You may also notice that there is a relationship between the compression methods and the way colors are stored. Images that are suitable for using a palette tend to be good for compression algorithms like LZW which provide good compression ratios when there are clusters of contiguous pixels with the same values. This is not always true, but in most cases an image with few colors has some degree of homogeneity, with blocks of pixels with a single value.

Since the image we are using in this workshop has a large number of different colors, and assuming that we do not want to lose color detail, we will be using the original RGB image for the following examples.

Multispectral imagery - Value interleaving 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

So far, we have assumed the type of raster data to optimize consists of RGB (color) or pancromatic (monochrome) images, or non-image data, such as a DEM. Images with more bands can be also used and that provides an opportunity for further optimization.

Multispectral images can have a number of bands ranging from four, usually the three corresponding to RGB and a infrared band, to several hundreds. They cover different regions of the electromagnetic spectrum and rendered using a *false-color* composition. To create this composition, three bands are selected and used as RGB components. However, the intensity represented in their pixel values does not represent the intensity in the frequencies corresponding to the RGB components. With those pixel values, the color of the pixel is computed.

If we are working with multispectral imagery, but our goal is to serve only true-color or false-color rendered images derived from that imagery through a WCS service, we can retain only those bands required for the color composition. This will result in smaller file sizes, and consequently better performance.

However, if we're working with all the bands in the multispectral image, understanding how band values are stored can help optimize the performance. In the case of a TIFF file, two schemes are supported.

* Pixel interleaved—All the values for a single *pixel* are stored together. For an RGB image the data looks like RGBRGBRGB 
* Band interleaved—All the values for a single *band* are stored together. For an RGB image the data looks like RRRGGGBBB

Band interleaved generally provides better performance when querying a section of the image, especially if it involves reading values from a few bands. Band interleaved images also tend to provide better compression ratios.

Pixel interleaved images are the preferred format if we expect per-pixel queries. For images published by GeoServer, band interleaved is generally the best option.

``gdal_translate`` and ``gdaladdo`` tools 
-----------------------------------------

When a single file supports a raster layer, we have to make sure that the file format and its settings are correctly configured, as these are the only parameters that can be adjusted.

As we have discussed previously, the TIFF format is the best option in most cases, so we will assume that we want to create a TIFF file to store our data. To create a TIFF file we will use two tools from GDAL toolset, namely ``gdal_translate`` and ``gdaladdo``.

For the rest of the workshop, we will use the ``image3.tiff`` file. You may wish to try some of the techniques discussed in this workshop on larger images. They may require different options, specially when it comes to creating pyramids. 

Once you have downloaded the image and installed GDAL, open a console window and access the folder containing the image. First, we will convert the image into a TIFF image with inner tiles using ``gdal_translate``. Secondly, we will add overviews to the image using ``gdaladdo``.

To convert the image to a TIFF file with inner tiles, execute the following command in the console:

.. code-block:: console

	$gdal_translate -of GTiff -co "TILED=YES" -co "COMPRESS=JPEG" image3.tif image.tiff

This creates a tiled GeoTIFF file named ``image.tiff`` from our source layer ``image3.tiff``. The new layer was created using the JPEG compression algorithm and now contains inner tiles. Further configuration is possible by adding additional commands using the ``-co`` modifier. For further information, refer to the `TIFF format description page <http://www.gdal.org/frmt_gtiff.html>`__. 

By default the size of the inner tiles is set to 256 x 256 pixels. To change this to  2048 x 2048, a much more efficient tile size for this example, use the following example instead:

.. code-block:: console

	$gdal_translate -of GTiff -co "TILED=YES" -co "COMPRESS=JPEG" -co "BLOCKXSIZE=2048" -co "BLOCKYSIZE=2048" image.tif image_tiled.tiff

We can now use the ``gdaladdo`` tool to add overviews. Execute the following:

.. code-block:: console

	$gdaladdo -r average image_tiled.tif 2 4 8 16

In this example, we are instructing ``gdaladdo`` to use an average value resampling algorithm, and to create four levels of overviews. Notice how this tool requires us to explicitly set the size ratio of all levels we want to create. We will also see that the GDAL tool used to create an external pyramid has a different syntax for defining the levels to create.

The ``gdaladdo`` command does not create any new files, but adds the overviews to the input file instead.

As we have discussed earlier, a single file with inner tiles and overviews is the optimal structure for file sizes below 2 Gb. In some cases it is worthwhile creating a single file from a previously tiled dataset, so the tiles are present in the file and also the overviews. If there are many small files, having to open and read the files when rendering the layer at smaller scales may have an adverse impact on performance.

The ``gdal_merge`` tool can be used to create a single file. 

.. code-block:: console

	$gdal_merge.py -o single_file.tif -of GTiff -co "TILED=YES" *.tif

This merges all TIFF files in your current folder into a single TIFF one. ``Gdaladdo`` can be later used to add overviews to the output file.

The last thing we can do with ``gdal_translate`` is to remove any unwanted bands we don't intend to use. To do so, we will use the ``-b`` modifier, to specify the bands that we want to keep in the resulting image.

If we have a 7-band Landsat image and we want to render it using a natural color composite with bands 1, 2 and 3, we can reduce the size of the image by keeping just those three bands with the following command:

.. code-block:: console

	$gdal_translate -b 1 -b 2 -b3 landsat.tif landsat_reduced.tif

Once the optimized file is created, setting the corresponding layer in GeoServer is straightforward. This procedure is not covered in this workshop. 

.. todo:: where is it covered?

``gdal_retile`` tool 
--------------------

If your data is too large for a single file, dividing it into tiles is the next option to consider. For this we need to use the ``gdal_retile`` tool. To tile a single image, execute the following:

.. code-block:: console

	$gdal_retile.py -targetDir tiles image.tif

.. todo:: is image.tif the output or input file?


That will create a set of tiled TIFF files from the source data. The size of the tiles (256 x 256 by default) can be set with the ``-ps`` modifier as follows: 

.. code-block:: console

	$gdal_retile.py -ps 2048 2048 -targetDir tiles image.tif

If your dataset comprises a number of layers (and assuming their individual sizes make it inappropriate to use them as single layers), you can retile all the layers with the ``-optFile`` modifier, as shown next:

.. code-block:: console

	$gdal_retile.py -targetDir tiles --optfile filestotile.txt

The ``filestotile.txt`` file should contain a list of all the input image files. If you are running Windows, open a console window, go to the folder containing the files and type the following:

.. code-block:: console

	$dir /b > files.txt

In Linux, the command syntax is:

.. code-block:: console

	$ls > files.txt

Once the tiles have been created, we need to configure GeoServer to use the tiles as a single layer. Open your GeoServer Web Administration Interface and add a new data store. Select :guilabel:`ImageMosaic` as the type of data store to create.

.. figure:: imgs/imagemosaicentry.jpg

   *ImageMosaic option* 

.. figure:: imgs/MosaicStoreDefinition.jpg

   *ImageMosaic settings* 

Select a workspace and add a name. In the :guilabel:`URL` field, enter the folder where the recently created tiles are located. Save the changes and publish the layer. You may now preview your data using OpenLayers, or another suitable client.

You should notice that performance is good when viewing the data at high resolutions (small scale), but performance could be improved at lower resolutions (large scale). This is because overviews were not created for the images. Even if we had created the layer from the ``image4.tiff`` file, which does contains overviews, the tiles do not have pyramids. The tiles don't even have internal tiling, so the performance optimization we see viewing the data at high resolution is a result of the external tiling we've set up.

Internal tiles can be created with ``gdal_retile``, just like we did when using ``gdal_translate``. As it is a GDAL tool, it accepts all parameters that are valid for the output format using the ``-co`` modifier. The following command will add internal tiles with a tile size of 512 x 512.

.. code-block:: console

	$gdal_retile.py -ps 2048 2048 -co "TILED=YES" -co "BLOCKXSIZE=512" -co "BLOCKYSIZE=512" -targetDir tiles image.tif

The ``gdaladdo`` tool will create overviews but it does not support multiple files. Create a batch script to automate the process of adding a pyramid to each tile. For those who prefer a more point-and-click solution and are not familiar with batch scripting, the open source QGIS package provides a graphical user interface for GDAL tools, and includes an option for batch processing the content of a folder. From the :guilabel:`raster` menu, click :guilabel:`Miscellaneous` and click :guilabel:`Build overviews(Pyramids)`.

.. figure:: imgs/qgisoverviews.jpg

   *Build overviews dialog box* 

Select :guilabel:`Batch mode (for processing whole directory)` and complete the input text box with the path to your folder. The other options are the same as those used for the command-line version of ``gdaladdo``.

Using pyramids 
--------------

To use pyramids in GeoServer, the first thing to do is to create a directory with pyramid files and tiles. To do so, we will use the ``gdal_retile`` tool again but this time we will create the different pyramid levels and not just tiles the base layer. This tool create a GeoServer compatible structure with a folder containing image files and subfolders. Open a console window, locate the image to tile, and enter the following:

.. code-block:: console

	$gdal_retile.py -levels 4 -ps 2048 2048 -targetDir tiles image.tif

You will notice that the only difference this time is the ``-levels`` modifier which instructs ``gdal_retile`` to create four levels of overviews, the number required to complete the whole pyramid in our example. The tile size is set to 2048 x 2048. If you think you may just need the lower levels of the pyramid, use a value less than four.

Since the process of creating a pyramid is rather time-consuming, it is usually a good idea to add the ``-v`` modifier to instruct ``gdal_retile`` to report the progress of the operation.

The interpolation method used to create the overviews can be specified with the ``-r`` modifier. To use a bilinear interpolation instead of the default nearest neighbor interpolation, the following command would be used:

.. code-block:: console

	$gdal_retile.py -r bilinear -levels 4 -ps 512 512 -targetDir tiles image.tif

The ``gdal_retile`` tool will create a set of files corresponding to the first level of the pyramid (these are the same files that we created when we created the mosaic without pyramids) and then a number of subfolders corresponding to the rest of levels, each containing a set of tile files.

As you can see, only the tiles have been generated, and there are no additional index files. Although ``gdal_retile`` can create index files, it is not necessary as GeoServer will add those.

Now we need to configure what we have created as a new data source for GeoServer. To do it we need a new type data store, ImagePyramid, that is not available with GeoServer by default. To install it, just download the corresponding ``jar`` file from the `GeoServer website <http://www.geoserver.org/>`_ and save it in the ``WEB-INF/lib`` folder of your GeoServer installation. Now when you create a new data store, ImagePyramid will be listed as one of the options. Click :guilabel:`ImagePyramid` to access the configuration page:

.. figure:: imgs/ConfigureImagePyramidStore.jpg

   *ImagePyramid options* 

Complete the input boxes as required and in the :guilabel:`URL` box enter the folder where you created the pyramid. Save and publish the layer.

When we created a MosaicImage store, GeoServer automatically added the shapefile containing the tile index. For the ImagePyramid store it also generates additional files that describe the structure of the pyramid and optimizes access to the pyramid using its files. In particular:

.. todo:: which files does it use to optimize access?

* All files in the pyramid folder (those corresponding to the original resolution, first level), are moved to a folder named ``0``. 
* An index shapefile is created for the mosaic representing each pyramid level, and stored in the corresponding folder.

If you have a large dataset, it is usually a good idea to complete the first step manually after the pyramid tiles have been created. Otherwise, if it takes too much time to copy the files the data store creation request may expire.

.. todo:: clarify what the first step was?

Fine-tuning GeoServer 
---------------------

The instructions above all relate to the optimum methods of storing data to achieve the best performance. Depending on the options chosen, there are a number of ways of incorporating our raster data into GeoServer. While this ensures that our data is optimally configured for GeoServer, there are some additional settings in GeoServer that we can configure to improve overall performance.

This section will explain all the settings available for each of the different data stores, and provide some recommendations for optimal performance. For single layers, there are no configuration options in GeoServer to optimize how they are accessed. 

Fine-tuning an ImageMosaic data store 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

For a mosaic of tiles, access to the tiles can be configured from the layer configuration page. Access the GeoServer Web Administration Interface, click :guilabel:`Layers` and select the layer you want to configure. The most relevant parameters are configured via the Coverage Parameters section.

.. figure:: imgs/MosaicSettings.jpg

   *Coverage Parameters settings* 

The two main parameters that affect performance are :guilabel:`AllowMultithreading` and :guilabel:`SE_JAI_IMAGEREAD`. If :guilabel:`AllowMultithreading` is set to true, GeoServer will read more than one tile at a time. If :guilabel:`USE_JAI_IMAGEREAD` is set to true, GeoServer will use the deferred loading mechanism of JAI, which allows tiles to be streamed. This is usually slower but the process consumes much less memory as tiles are not loaded in memory when creating the mosaic. When this setting is set to false, an immediate loading mechanism is used, which uses more memory but provides better performance.

Setting the :guilabel:`USE_JAI_IMAGEREAD` parameter to true may result in a “Too many files opened” error, as files are left opened for the deferred loading mechanism to be available. As a rule of thumb, set :guilabel:`USE_JAI_IMAGEREAD` to true and set :guilabel:`AllowMultithreading` to false if your system has limited memory. If there are no memory limitations, switch those values (:guilabel:`USE_JAI_IMAGE_READ` = false, :guilabel:`AllowMultithreading` = true*) for better performance.

Aside from the GeoServer configurations, we can also manually configure some other settings. Let’s have a look at the folder where we stored our tiles. After adding our mosaic of image tiles as a new data store to GeoServer, a few new files have been created. The extra files are:

.. code-block:: console

	sample_image
	tiles.dbf 
	tiles.fix 
	tiles.prj 
	tiles.properties 
	tiles.qix 
	tiles.shp 
	tiles.shx

These files include the index shapefile, which helps identify which tiles will satisfy a given request, and a couple of additional files. If you preview the index shapefile in you GIS application it should look similar to the following:

.. figure:: imgs/qgisindex.jpg

   *Tile index* 


The :guilabel:`location` field in the associated attribute table points to the file that contains the actual image data for each geometry.

.. figure:: imgs/qgisindex2.jpg

   *Tile index attribute table*

Configuration parameters are listed in the <*name*>.properties file, which should include content similar to the following:

.. code-block:: console

 #-Automagically created from GeoTools
 - #Tue Oct 16 14:03:20 CEST 2012 
 Levels=0.0166666666666664,0.0166666666666664 
 Heterogeneous=true 
 AbsolutePath=false 
 Name=tiles 
 Caching=false 
 ExpandToRGB=false 
 LocationAttribute=location 
 SuggestedSPI=it.geosolutions.imageioimpl.plugins.tiff.TIFFImageReaderSpi 
 LevelsNum=1

From a performance perspective, the two interesting parameters are ``Caching`` and ``ExpandToRGB``. If ``Caching`` is set to true, the spatial index is retained in memory,  providing much better data access performance. This option is especially significant if your raster data has just one dimension, like our sample data, so it is good idea to set this parameter to true. However, if your data has more than one dimension and the queries are not restricted to index-based queries, caching does not produce in any performance gains.

The ``ExpandToRGB`` setting can be used to optimize performance for paletted images. If all images share the same palette, setting this parameter to :guilabel:`false` will improve the data access performance. If images don't share the same palette, then it must be set to true, since non-matching palettes make it necessary to expand the color definitions to RGB.

Fine-tuning a pyramid image data store 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

For pyramids we can configure the settings both for GeoServer and also the additional files that are created by GeoServer along with the tile files. As this data store depends directly on the ImageMosaic data store, the configuration values are the same. Determining how GeoServer uses multithreading is fundamental to performance tuning.

Global settings for raster data 
--------------------------------

Some settings affect all kinds of raster-based data, regardless of their structure or the plug-in required to access them. These settings are available from the main GeoServer Web Administration Interface page, and are divided in two main groups—JAI (Java Advanced Imaging) settings and Coverage Access settings.

JAI settings
~~~~~~~~~~~~

As GeoServer uses JAI to read images, the correct configuration of JAI can have a significant impact on the image rendering performance of GeoServer.

.. figure:: imgs/JAIsettings.jpg

   *JAI Settings page*

The parameters include:

* :guilabel:`Memory capacity` and :guilabel:`Memory threshold`—Both parameters are related to JAI's TileCache. Performance will degrade with low values of capacity, but large values cause the cache to fill up quickly.

.. todo:: does this mean both settings should have high or low settings - any guidelines for the values to use?

* :guilabel:`Tile Threads`—Sets the TileScheduler (calculates tiles) indicating the number of threads to be used when loading tiles (tile computation may make use of multithreading for improved performance). As a rule of thumb, use a value equal to twice the number of processing cores in your machine.

* :guilabel:`Tile recycling`—Only enable this when there are no memory restrictions 

Apart from these parameters, it is important to use native JAI and ImageIO. GeoServer ships with pure-Java JAI, which does not provide the best performance.

Coverage Access settings
~~~~~~~~~~~~~~~~~~~~~~~~

Coverage Access settings are mainly used to configure how GeoServer uses multithreading, very important for mosaics, since this controls how multiple granules can be opened simultaneously.

.. todo:: explain granules

.. figure:: imgs/CASettings.jpg
 
   *Coverage access page*

The parameters include:

* :guilabel:`Core Pool Size`—Core pool size of the thread pool executor 
* :guilabel:`Maximum Pool Size`—Maximum pool size of the thread pool executor. The guideline for the :guilabel:`Tile Threads` setting for JAI (using a value equal to twice the number of cores in your machine) also applies here. 
* :guilabel:`ImageIO Cache Memory Threshold`—Sets the threshold above which a WCS request result is cached to disk instead of in memory before encoding it. This setting is not relevant for WMS requests, since they tend to involve less data.

Reprojection settings 
^^^^^^^^^^^^^^^^^^^^^

Geoserver uses an approximated function to reproject raster layers, instead of a pixel-by-pixel reprojection. This means a trade-off between precision or performance. The precision that you want to achieve can be configured when starting GeoServer, using the ``-Dorg.geotools.referencing.resampleTolerance`` modifier. By default, it has a value of 0.333. The larger the value, the lower the accuracy of the reprojection, but the better the data access performance. Depending on the precision tolerance of your particular application requirements, you can increase or decrease this parameter.

.. note:: If you are publishing vector data as well, or expect your images to be combined with vector layers, a larger error tolerance may produce unwanted results. Image distortions may become more apparent when rendered with vector features. 

