.. _raster.filetypes:

File types and performance
==========================

.. todo:: Need better headings.

The performance for publishing raster layers with GeoServer depends on a number of parameters, many of which are related to how the source data is stored. The time it takes to read and prepare the the data can have a significant impact on performance.

We can see this clearly in a simple example. In the data package assocaited with this workshop, open the directory called :file:`sampleimgs`. This directory contains four different representations of the same file.

.. todo:: Where is this file?

.. code-block:: console

   image1.png
   image2.jpg
   image3.tif
   image4.tif

These four images are stored in three different formats. We will use these files to illustrate how, although they contain the same image and appear similar, they exhibit different performance profiles in GeoServer. Even when files appear to be stored in the same format, as with the two ``.tif`` files, the performance profiles can differ depending on the parameters used to create the files.

First of all, let's have a look at the sizes of those images.

.. list-table::
   :header-rows: 1

   * - File name
     - Size (in bytes)
   * - ``image1.png``
     - 136,052,194 
   * - ``image2.jpg``
     - 12,480,346 
   * - ``image3.tif``
     - 34,896,016
   * - ``image4.tif``
     - 52,921,428

The PNG format file is clearly the largest file, while the JPG format is the smallest file. TIFF files are similar in size to the JPG format. The relatively compact JPG format seems the obvious choice if data storage is limited. The JPEG's smaller file size might suggest better data access performance as well, however there are other factors to consider that may negate these advantages.

Let's import these files into GeoServer. You can do this manually through the GeoServer web administration interface. If you have the ``curl`` command line tool installed, you can use the ``import_layers`` script included in the image zip file to import the images using Geoserver's REST API. Just make sure GeoServer is running before executing the script.

.. todo:: Where's the script? Instructions on running it. How to load a JPEG!?

To assess the relative performance of accessing each file format in GeoServer, we will be using Google Chrome's built-in tools to measure performance (similar tools are provided for other browsers, feel free to your preferred browser). Open the GeoServer :guilabel:`Layer Preview` page. In the row representing the first image (:file:`image1.png`), click :command:`Go` to see open a preview of the layer in OpenLayers. Once the page is loaded, press Ctrl+Shift+I (Command+Alt+I on a MAC) to open the Chrome Developer Tools window. Select the :guilabel:` Network` tab.

.. todo:: Similar commands on Firefox?

You should see something similar to the following:

.. figure:: img/chrometools.png

   *Chrome browser developer tools*

As you start making requests, you will notice the time it takes to respond to each request is reported in the *Timeline* column. Zoom and pan around the image and keep an eye on the results recorded in this column. The request times may appear longer than expected, and pan and zoom operations are not as smooth as they could be, mostly due to the size of the image.

Repeat the same process with the JPG image. Perhaps surprisingly, you should experience something similar. The request response times are a bit shorter, but still long enough to delay the pan and zoom operations.

If you now open the first TIFF file (``image3.tif``), it might take some time to render the image when the full extent is displayed for the first time, but once loaded if you zoom and pan around the image you should see much better response times. If you zoom to the maximum resolution (so you can see the actual pixels), response times are almost immediate and pan operations are smooth. The layer access performance for the TIFF format file is demonstrably better than the JPG and PNG formats.

Let's try to improve the performance at low resolution. Preview the second TIFF image layer, ``image4.tif``. You should notice that it displays much faster than the other three images. If you zoom and pan around the image, you should also see that the response times are similar at all scales and there is no difference in terms of performance between the different zoom levels.

This simple test demonstrates how important the appropriate file format and the appropriate configuration are in optimizing system performance.

In the remainder of this workshop, we will investigate why this discrepancy in layer access performance occurs and how to create appropriate files and file structures.

For both the PNG and the JPG format files, even when only part of the image has to be rendered, the whole image has to be opened and read first—this operation incurs a significant processing overhead. 

The first TIFF file (``image3.tif``) is divided internally into tiles, so when you zoom to a given area, only the data corresponding to that area is accessed. However, previewing the full extent of the image still requires a full scan.

For both the JPG and PNG images, pixel values are written sequentially, starting from one corner of the image, and ending in the diagonally opposite corner. That means that, to find the pixels corresponding to a given area, a sequential reading is also needed. In the TIFF file, the internal division allows to get a group of pixels without having to read the whole layer, since each division can be considered independent from the point of view of access.

.. todo:: need more of explanation here as to why this sequential write process affects performance

The last TIFF image (``image4.tif``) contains additional lower resolution images (hence its larger size), so when a full scan is required to render at a small scale, the scan is performed on those lower resolution images instead of the original higher resolution image.

These different data storage techniques explain the variations in layer access performance and provide the focus for our performance optimization strategies. We will discuss this further in this workshop and see how to apply these optimizations with GeoServer, even when the data is not available in a single file as in this example.
