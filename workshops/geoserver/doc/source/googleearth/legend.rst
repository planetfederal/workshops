.. _geoserver.googleearth.legend:

Displaying a legend
===================

A legend is very helpful when viewing data with a thematic style. We'll now add a legend to our map of cities.

#. Edit the existing Network Link for the Countries by right-clicking on the entry in the :guilabel:`Places` list and selecting :guilabel:`Properties`. This will return you to the original dialog where the Network Link was created.

#. Append the parameter ``&legend=true`` to the end of the Network Link URL.

   .. figure:: img/legend_link.png

      Adding the legend parameter to a Network Link

#. Click :guilabel:`OK` when done.

   .. figure:: img/legend_view.png

      Google Earth legend

The legend is generated from the ``<Title>`` tags inside the SLD that the layer is using. You can verify this by opening up the :file:`cities.sld` in a text editor, or from within GeoServer. In this case, the rules in the SLD are based on colors used to better distinguish countries on the map.

.. figure:: img/legend_sldtitle.png

   Title of the rule in the SLD
