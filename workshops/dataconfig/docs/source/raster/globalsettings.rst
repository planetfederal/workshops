.. _raster.globalsettings:

Global settings for raster data 
===============================

Some settings affect all kinds of raster-based data, regardless of their structure or the plug-in required to access them. These settings are available from the main GeoServer Web Administration Interface page, and are divided in two main groups—JAI (Java Advanced Imaging) settings and Coverage Access settings.

JAI settings
------------

As GeoServer uses JAI to read images, the correct configuration of JAI can have a significant impact on the image rendering performance of GeoServer.

.. figure:: img/JAIsettings.png

   *JAI Settings page*

The parameters include:

* :guilabel:`Memory capacity` and :guilabel:`Memory threshold`—Both parameters are related to JAI's TileCache. Performance will degrade with low values of capacity, but large values cause the cache to fill up quickly.

* :guilabel:`Tile Threads`—Sets the TileScheduler (calculates tiles) indicating the number of threads to be used when loading tiles (tile computation may make use of multithreading for improved performance). As a rule of thumb, use a value equal to twice the number of processing cores in your machine.

* :guilabel:`Tile recycling`—Only enable this when there are no memory restrictions 

Apart from these parameters, it is important to use native JAI and ImageIO. GeoServer ships with pure-Java JAI, which does not provide the best performance.

Coverage Access settings
------------------------

Coverage Access settings are mainly used to configure how GeoServer uses multithreading, which is important for mosaics, since this controls how multiple tile files can be opened simultaneously.

.. figure:: img/CASettings.png
 
   *Coverage Access page*

The parameters include:

* :guilabel:`Core Pool Size`—Core pool size of the thread pool executor 
* :guilabel:`Maximum Pool Size`—Maximum pool size of the thread pool executor. The guideline for the :guilabel:`Tile Threads` setting for JAI (using a value equal to twice the number of cores in your machine) also applies here. 
* :guilabel:`ImageIO Cache Memory Threshold`—Sets the threshold above which a WCS request result is cached to disk instead of in memory before encoding it. This setting is not relevant for WMS requests, since they tend to involve less data.

Reprojection settings 
~~~~~~~~~~~~~~~~~~~~~

Geoserver uses an approximated function to reproject raster layers, instead of a pixel-by-pixel reprojection. This means a trade-off between precision or performance. The precision that you want to achieve can be configured when starting GeoServer, using the ``-Dorg.geotools.referencing.resampleTolerance`` modifier. By default, it has a value of 0.333. The larger the value, the lower the accuracy of the reprojection, but the better the data access performance. Depending on the precision tolerance of your particular application requirements, you can increase or decrease this parameter as required.

.. note:: If you are publishing vector data as well, or expect your images to be combined with vector layers, a larger error tolerance may produce unwanted results. Image distortions may become more apparent when rendered with vector features.

