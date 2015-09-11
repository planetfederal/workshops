#####################
GeoServer Performance
#####################

Welcome
-------

.. image:: img/geoserver.png

This workbook recommends several methods to improve performance of  map rendering, focusing on GeoServer Web Map Server.

* Benchmarking: 
* Configuration and Setup: Out of the box GeoServer is setup for demonstration purposes – these settings are not optimal for performance!
* Style Optimizations: The rending process is controlled using Style Layer Descriptor documents; different rendering options have different costs – knowing what techniques to use will really help.
* Data Preparation: Optimizing your data for display is a great technique. Identify work that occurs every time an image is produced; and prepare your data upfront to reduce this expense

You may also wish to check on a couple of on line resources for additional background on the recommendations made here. The GeoServer documentation is updated over time; check for specific recommendations for the version you have deployed.



Topics covered
--------------

The following material will be covered in this workshop:

:doc:`setup/index`
   Workshop materials and setup
   
:doc:`intro/index`
   Introduction to performance and establishing a baseline.

:doc:`jvm/index`
   JVM Performance tuning

:doc:`service/index`
   Service performance considerations

:doc:`style/index`
   Rendering performance and style optimisation.
   
:doc:`vector/index`
   Generating pregeneralized vector data and dynamically changing vector data based on scale.

:doc:`raster/index`
   Raster performance considerations and GeoTIFF optmization.

:doc:`encode/index`
   Image format implementations and encoding optimizations.

:doc:`gwc/index`
   GeoWebCache and tile map protocols

.. toctree::
   :maxdepth: 2
   :numbered:
   :hidden:
   
   setup/index
   intro/index
   jvm/index
   service/index
   style/index
   vector/index
   raster/index
   encode/index
   gwc/index