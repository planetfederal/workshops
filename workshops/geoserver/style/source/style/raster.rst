.. _style.raster:

Rasters
=======

Finally we will look at using CSS styling for the portrayal of raster data.

Review of raster symbology:

* Raster data is **Grid Coverage** where values have been recorded in a regular array. In GIS a **Coverage** can be used to look up a value or measurement for each location.
  
* When queried with a location and grid coverage can determine the appropriate array location and retrieve a value:
  
  * A grid coverage may use different techniques to interpolate an appropriate value from the nearest measurements, or be set up to quickly return the "nearest neighbor".
  
  * Vector coverages would use a point-in-polygon check and return an appropriate attribute value.
  
* Many raster formats organize information into bands of content. Values recorded in these bands and may be mapped into colors for display (a process similar the theming an attribute for vector data).
  
  For imagery the raster data is already formed into red, green and blue bands for display.
  
* As raster data has no inherent shape, the format is responsible for describing the orientation and location of the grid used to record measurements.

Examples
--------

The raster examples make use of simple CSS documents often working with a single band of content.

Reference:

* :manual:`Raster Symbology <extensions/css/properties.html#raster-symbology>` (User Manual | CSS Property Listing )
* :manual:`Rasters <extensions/css/cookbook_raster.html>` (User Manual | CSS Cookbook );

Image
^^^^^

The ``ne:NE1`` layer was used to preview each example.

The **raster-channels** is the **key property** for display of images and raster data. The value :kbd:`auto` is recommended, allowing the image format to select the appropriate red, green and blue channels for display. 

.. code-block:: css

   * {
     raster-channels: auto;
   }

.. image:: img/raster_image_1.png

If required a list three band numbers can be supplied (for images recording in several wave lengths) or a single band number can be used to view a grayscale image.

.. code-block:: css

   * {
     raster-channels: 2;
   }

.. image:: img/raster_image_2.png

Additional properties are available to provide slight image processing during visualization. These facilities can be used to enhance the output (to look at small details) or to balance images from different sensors allowing them to be compared.

The **raster-contrast-enhancement** property is used to turn on a range of post processing effects. Settings are provided for :kbd:`normalize` or :kbd:`histogram` or :kbd:`none`;

.. code-block:: css

   * {
       raster-channels: auto;
       raster-contrast-enhancement: normalize;
   }

.. image:: img/raster_image_3.png

The **raster-gamma** property is used adjust the brightness of **raster-contrast-enhancement** output. Values less than 1 are used to brighten the image while values greater than 1 darken the image.

.. code-block:: css

   * {
      raster-channels: auto;
      raster-contrast-enhancement: none;
      raster-gamma: 1.5;
   }

.. image:: img/raster_image_4.png

DEM
^^^

A digital elevation model is an example of raster data made up of measurements, rather than colors information. The ``usgs:dem`` layer was used for the preview images.

When we use the **raster-channels** property set to :kbd:`auto` the rendering engine will select our single band of raster content, and do its best to map these values into a grayscale image.

.. code-block:: css

   * {
     raster-channels: auto;
   }

.. image:: img/raster_dem_1.png

We can use a bit of image processing to emphasis the generated color mapping by making use **raster-contrast-enhancement**. Image processing of this sort should be used with caution as it does distort the presentation (in this case making the landscape look more varied then it is in reality.

.. code-block:: css

   * {
     raster-channels: 1;
     raster-contrast-enhancement: histogram;
   }

.. image:: img/raster_dem_2.png

The approach of mapping a data channel directly to a color channel is only suitable to quickly look at quantitative data. For qualitative data, or simply to use color, we need a different approach.

* The **raster-color-map-type** property dictates how the values are used to generate a resulting color.

  * :kbd:`ramp` is used for quantitative data, providing a smooth interpolation between the provided color values.
  * :kbd:`intervals` provides categorization for quantitative data, assigning each range of values a solid color.
  * :kbd:`values` is used for qualitative data, each value is required to have a **color-map-entry** or it will not be displayed.

.. code-block:: css

    * {
      raster-channels: auto;
      raster-color-map: color-map-entry(#9080DB, 0)
                        color-map-entry(#008000, 1)
                        color-map-entry(#105020, 255)
                        color-map-entry(#FFFFFF, 4000);
    }

.. image:: img/raster_dem_3.png

An opacity value can also be used with **color-map-entry**.

.. code-block:: css

   * {
     raster-channels: auto;
     raster-color-map: color-map-entry(#9080DB, 0, 0.0)
                       color-map-entry(#008000, 1, 1.0)
                       color-map-entry(#105020, 200, 1.0)
                       color-map-entry(#FFFFFF, 4000, 1.0);
   }

.. image:: img/raster_dem_4.png

.. admonition:: Exercise
   
   .. only:: instructor
     
      .. admonition:: Instructor Notes 
 
         Working through DEM with a color brewer palette. Emphasis is on accuracy here, rather than making a pretty picture.

   #. Navigate to the **CSS Styles** page.
   
   #. Click :guilabel:`Choose a different layer` and select :kbd:`usgs:dem` from the list.
   
   #. Click :guilabel:`Create a new style` and choose the following:
   
      .. list-table:: 
         :widths: 30 70
         :stub-columns: 1

         * - Workspace for new layer:
           - :kbd:`No workspace`
         * - New style name:
           - :kbd:`raster_example`

   #. Replace the initial CSS style with the following:

      .. code-block:: css

         * {
           raster-channels: auto;
         }
   
   #. Click :guilabel:`Submit` and then the :guilabel:`Map` tab for an initial preview. You can use this tab to follow along as the style is edited, it will refresh each time :guilabel:`Submit` is pressed.

      .. image:: img/raster_01_auto.png

   #. To start with we can provide our own grayscale using two color map entries.

      .. code-block:: css
   
         * {
           raster-channels: auto;
           raster-color-map: color-map-entry(#000000, 0)
                             color-map-entry(#FFFFFF, 4000);
         }

   #. Use the :guilabel:`Map` tab to zoom in and take a look. This is much more direct representation of the source data. We have used our knowledge of elevations to construct a more accurate style.
   
      .. image:: img/raster_02_straight.png
   
   #. While our straight forward style is easy to understand, it does leave a bit to be desired for readability. The eye has a hard time telling apart dark shades of black (or bright shades of white) and will struggle to make sense of this image. To address this limitation we are going to switch to the ColorBrewer **9-class PuBuGn** palette. This is a sequential palette that has been hand tuned to communicate a steady change of values. 
    
      .. image:: img/raster_03_elevation.png

   #. Update your style with the following:

      .. code-block:: css

         * {
           raster-channels: auto;
           raster-color-map:
              color-map-entry(#014636,   0)
              color-map-entry(#016c59, 500)
              color-map-entry(#02818a,1000)
              color-map-entry(#3690c0,1500)
              color-map-entry(#67a9cf,2000)
              color-map-entry(#a6bddb,2500)
              color-map-entry(#d0d1e6,3000)
              color-map-entry(#ece2f0,3500)
              color-map-entry(#fff7fb,4000);
         }
   
      .. image:: img/raster_04_PuBuGn.png

   #. A little bit of work with alpha (to mark the ocean as a no-data section) and we are done:

      .. code-block:: css

         * {
           raster-channels: auto;
           raster-color-map:
              color-map-entry(#014636,   0,0)
              color-map-entry(#014636,   1)
              color-map-entry(#016c59, 500)
              color-map-entry(#02818a,1000)
              color-map-entry(#3690c0,1500)
              color-map-entry(#67a9cf,2000)
              color-map-entry(#a6bddb,2500)
              color-map-entry(#d0d1e6,3000)
              color-map-entry(#ece2f0,3500)
              color-map-entry(#fff7fb,4000);
         }
   
      .. image:: img/raster_05_alpha.png

.. admonition:: Explore

   #. Update your DEM example to use **intervals** for presentation. What are the advantages of using this approach for elevation data?
      
      .. only:: instructor
       
         .. admonition:: Instructor Notes      
 
            By using intervals it becomes very clear how relatively flat most of the continent is. The ramp presentation provided lots of fascinating detail which distracted from this fact.
       
            Here is style for you to cut and paste:
      
            .. code-block:: css
       
               * {
                 raster-channels: auto;
                 raster-color-map:
                    color-map-entry(#014636,   0,0)
                    color-map-entry(#014636,   1)
                    color-map-entry(#016c59, 500)
                    color-map-entry(#02818a,1000)
                    color-map-entry(#3690c0,1500)
                    color-map-entry(#67a9cf,2000)
                    color-map-entry(#a6bddb,2500)
                    color-map-entry(#d0d1e6,3000)
                    color-map-entry(#ece2f0,3500)
                    color-map-entry(#fff7fb,4000);
                 raster-color-map-type: intervals;
               }
      
            .. image:: img/raster_interval.png

   #. Make use of a simple contrast enhancement with ``usgs:dem``:
   
      .. code-block: css
   
         * {
             raster-channels: auto;
             raster-contrast-enhancement: normalize;
         }
   
      .. image:: img/raster_contrast_1.png
   
      What happens when you zoom in to only show a land area?
      
      .. only:: instructor
       
         .. admonition:: Instructor Notes      
 
            What happens is insanity, normalize stretches the palette of the output image to use the full dynamic range. As long as we have ocean on the screen (with value 0) the land area was shown with roughly the same presentation.
       
            .. image:: img/raster_contrast_2.png
       
            Once we zoom in to show only a land area, the lowest point on the screen (say 100) becomes the new black, radically altering what is displayed on the screen.

.. admonition:: Challenge

   * Now that you have seen the data on screen and have a better understanding how would you modify our initial gray-scale example?
     
     .. only:: instructor
       
        .. admonition:: Instructor Notes      
 
           The original was a dark mess, students will hopefully make use of the mid-tones (or even check color brewer) in order to fix this. I have left the ocean dark so the mountains can stand out more.
       
           .. code-block:: css

              * {
                raster-channels: auto;
                raster-color-map: color-map-entry(#000000, 0)
                                  color-map-entry(#444444, 1)
                                  color-map-entry(#FFFFFF, 3000);
              }
       
           .. image:: img/raster_grayscale.png


   * There is a quick way to make raster data transparent, **raster-opacity** property works in the same fashion as with vector data. The raster as a whole will be drawn partially transparent allow content from other layers to provide context.
  
     Can you think of an example where this would be useful?
  
     .. only:: instructor
     
        .. admonition:: Instructor Notes      
 
           This is difficult as raster data is usually provided for use as a basemap, with layers being drawn over top. The most obvious example here is the display of weather systems, or model output such as fire danger.
