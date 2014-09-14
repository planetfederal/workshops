Ranges
======

As a final step before we begin our analysis of the data, let's load the remaining required data sets using some of the techniques we have learnt thus far. Remember to reproject all the new layers to the correct CRS and save the files to the ``workspace\data`` directory.

The key layer for our analysis are the ranges of antelope in various seasons of the year with the **RANGE** attribute contains one of the following codes:

* ``OUT``: Out. Insufficient animals to be considered an important habitat.
* ``SWR``: Severe Winter Relief. Only used to a great extent during extremely severe winters.
* ``WIN``: Winter. Only used to a great extent during the winter.
* ``WYL``: Winter/Yearlong. Used on a year-round basis but experiences an influx of additional animals during the winter.
* ``SSF``: Spring/Summer/Fall. Used from the end of winter until the start of the next winter.
* ``YRL``: Yearlong. Used on a year-round basis except under severe conditions.

A number of these ranges are marked with a ``CRU`` prefix, indicating that they have "been documented as the determining factor in a population's ability to maintain itself at a certain level (theoretically at or above the population objective) over the long term."

#. Load ``Antelope_SeasonalRange.zip`` and rename it as :kbd:`Seasonal ranges`. 
   
#. Save as a new file in the ``qgis\data`` directory and reproject to our project's CRS.

#. Open the style settings for the **Seasonal ranges** layer and apply :download:`this QGIS style file <downloads/ranges.qml>` by using the :guilabel:`Load Style ...` button.

   .. figure:: images/load_style.png

      Loading a QGIS style

#. After clicking :guilabel:`OK`, the **Seasonal ranges** layer will be styled with separate colours for the different range types.

   .. figure:: images/seasonal_ranges.png

      Styled **Seasonal ranges** layer

   Visually, we can see that there are few areas that are used in severe winter situations or exlusively as winter ranges for Wyoming's antelopes. The remainder of the area is split between yearlong habitat and non-winter habitat areas.
