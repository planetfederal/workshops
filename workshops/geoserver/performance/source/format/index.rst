.. format:

******
Format
******

Up until now we have been focusing on half the work GeoServer WMS does. If we go back to our rendering chain after drawing an image the result needs to encoded in an image format and sent back to the client.

Unsurprisingly this can be a lot of work:

* Image formats like JPEG perform compression taking the entire image into account, often iterating again and again over detailed sections.

* Even formats like PNG that are easier to read can take some time to encode. When working with PNG8 the entire image is examined in order to determine the "best" color palette.

Although we are going to focus on performance, keep in mind the balance between how expensive it is to encode a file (more CPU time can produce a small file) and how expensive it is to transmit and store a file (in networks cost).


Choosing Output Format
======================

The selection of an output format results in a number of trade offs. The formats available produce images of different quality, of different size, and take different amounts of processing time to “encode” the image.

* image/jpeg results in images with encoding artifacts and is not suitable for line work. The fact that transparency is not supported means this is only really suitable for basemap data.

  JPEG images take a long time to encode; however the resulting images are very small and take less time to transmit.

* image/png8 (ie 256 color) results in nice small images; but it can be very expensive to figure out a good palette. PNG transparency can be a problem in Internet Explorer.

  This format is highly recommended especially if you can provide a prepared palette.

* PNG is faster than PNG8 to render without a fixed palette for PNG8. With a fixed palette for PNG8, rendering is faster than PNG and results in smaller images.

  While GIF transparency is supported all modern browsers, PNG transparency can be a problem in older versions Internet Explorer (IE6 only). Transparency support in PNG is more extensive than in GIF, as it can support partial transparency or translucency. This is the ability to blend the background behind an image with the image to generate partial transparency. This is also known as alpha compositing or alpha channel.

* image/gif: supports transparency; and is limited to a fixed palette. Generating a good palette is relatively expensive.

Choosing the correct output format is going to be a matter of thinking about your users and network deployment; it may be worth while to take a hit on rendering performance if you can save on total bandwidth?

The output format requested is in the hands of the client code making the request; though you can change the option GeoWebCache uses (which will help).

.. admonition:: Exercise
   
   #. Adjust your TestPlan to return `image/jpeg` and compare the resulting performance.
      
      .. figure:: img/image-jpeg.png
          
         image/jpeg performance
   
   #. Compare carefully with `image/png` performance and size.
      
      .. figure:: img/image-png.png
         
         image/png performance 
         
      Although `image/jpeg` is significantly slower, the resulting file size (shown in `Avg. Bytes`) is smaller.
      
      You can use this to your advantage, trading off server CPU cycles for reduced network load (and reduced tile cache storage needed).

Turn off Antialiasing
---------------------

Antialising produces very pretty output; but this comes at a cost. Output Size is 4-6 times greater – simply because more color graduations will be produced to “blur” lines into looking smoother. All this extra detail has a cost.

Despite the performance gains available here many deployments to not opt for this option; just based on the appearance of the final product.

To disable antialiasing you can add a “format option” to your GetMap request (``format_options=antialias:none``). If you are configuring GeoWebCache you would want to include this format option there.

.. admonition:: Exercise
   
   #. Adjust your TestPlan to return with an additional `format_options` parameter::

      * format_options: ``antialias:none``

   #. Measure the result.
   
      ... tip:: GeoServer has the ability to go through the style definition and generate a good palette quickly when antialias is set to none and `image/png8` or `image/gif` is used.

Java Advanced Imaging
=====================

GeoServer makes use of two Java Extensions for working with imagery:

* Java Advanced Imaging (JAI) extension used for image processing (so raster scaling, slicing, re-projection).

* Java Image IO (ImageIO) used for image access and encoding common output formats.

There are two very important GeoServer configuration options that control how much memory is available to JAI for working with imagery.

.. figure:: img/memory-jai.svg
   
   JAI Memory Use
   
*Memory capacity* describes how much of the heap should be used as a *tile cache* storing imagery for processing.

*Memory threshold* is used to to determine how much of the *tile cache* should be clear ... and available to quickly work on new imagery.

Keep in mind this is only a cache, and the memory can be quickly reclaimed if it is needed for other use.

Native JAI and ImageIO
----------------------

Java extensions are available as "pure java" class files (like a normal application) and also as optional native (compiled C++ code) bundles for installation into your Java Virtual Machine :file:`ext` folder.

Native versions of JAI and ImageIO are available for a couple different platforms (win32, linux 32, linux 64) and has traditionally and was an easy 10-15% performance improvements when working with Java 5.

.. figure:: img/jai_comparison.png
   
   Image Processing Performance

The above figure compares the performance Oracle (Sun) JDK and OpenJDK, with and without JAI native code enabled. The test (performed using the TIGER road data) show Oracle JDK with the JAI native code implementation providing a significant gain.

Keep in mind:

* Modern Java Virtual Machines (Java 6 and Java 7) are doing such a good job compiling at compiling the "pure java" code that this performance gain has largely been erased.

* There are two alternatives for image encoding ( :manual:`libjpeg <extensions/libjpeg-turbo/index.html>` turbo and one based on PNGJ) that `perform better <http://osgeo-org.1560.x6.nabble.com/Faster-PNG-encoder-some-WMS-tests-td5083309.html>`__ .

.. admonition:: Explore
      
   If you are working on a supported platform you may wish download and install these native extensions and benchmark the result in JMeter.
   
   The windows install of OpenGeo Suite already has the native JAI and ImageIO extensions installed.

.. admonition:: Exercise
     
   #. Login to GeoServer Admin and navigate to :menuselection:`Server Status`.
   
   #. Scroll down to the current JAI settings.
      
      .. figure:: img/memory-jai-use.png
         
         JAI Memory Use
      
      You can review if native JAI is available, and view the memory dedicated to image  processing.
   
   #. To adjust these settings navigate to :menuselection:`Settings --> JAI`.
      
      .. figure:: img/jai-settings.png
         
         JAI Settings
   
   #. You can also check which encoders are used.
      
      .. figure:: img/jai-settings2.png
         
         JAI Encoders
      
      The PNGJ based encoder out performs both the default Java implementation, and the ImageIO native implementation.

PNG8
====

PNG8 is a great format for low bandwidth use (as the files are quite small when generated). Unfortunately it can be very expensive to review all the pixels in an image and determine the "best-fit" palette of 256 colors.

Reference:

* :manual:`tutorials/palettedimage/palettedimage.html`

.. admonition:: Exercise

   #. Collect a baseline using using ``image/png8``.
      
      .. figure:: img/png8-baseline.png
         
         PNG8 Benchmark
   
   #. Add the an extra parameter ``palette=safe`` to the Raster Parameters and rerun your benchmark.

      .. figure:: img/png8-safe.png
         
         PNG8 with Predefined Palette
         
      The palette consists of 216 colors that could reliability be reproduced on the computers used for the early web.
      
   #. Enable *View Result Tree* and have a look at the loss of image quality compared to normal PNG8 (where an optimized palette is generated for each image).
   
.. admonition:: Exercise
   
   Define your own palette:
   
   #. Use layer preview, to quickly make an image that uses colors common to the ne:hyp layer.
   #. Right click and **Save As** - choosing the filename :file:`hyp.png`
   #. Use a paint program to save the file as a GIF (this will reduce the palette to 256 colors).   
   #. Copy the :file:`hype.gif` to data directory :file:`palettes/hyp.gif` 
   #. Change the ``palette=hyp`` and rerun the benchmark
      
      .. figure:: img/png8-custom.png
         
         PNG8 Custom
   
   Use a predefined palette to avoid:

JPEG
----

The **libjpeg-turbo** community module is highly recommended.

References:

* http://sourceforge.net/projects/libjpeg-turbo/files/
* :manual:`libjpeg-turbo Map Encoder Extension <extensions/libjpeg-turbo/index.html>`
