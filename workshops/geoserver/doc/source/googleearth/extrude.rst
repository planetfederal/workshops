.. _geoserver.googleearth.extrudes:

Extrudes
========

Google Earth has the ability to draw extruded features. This is a technical way of saying that it can draw features with "height" such that they appear floating in the air above the globe as opposed to "clamped" to it.

GeoServer can send information to Google Earth on how to draw extrudes based on a template saved in the GeoServer data directory.

Recall from the section on :ref:`geoserver.styling.styles.extgraphics` that the GeoServer data directory is where the catalog and settings of GeoServer are stored. We will create a height template and save it in the data directory

.. note:: These templates are known as Freemark templates named after the template engine used. See the `Freemarker homepage <http://freemarker.sourceforge.net/>`_ for more information.

#. Open up a text editor and type in the following text::

     ${POP_EST.value}

   This will set the height of a feature to  be equal to the value of the POP_EST attribute, which is the population of the country.

#. Save this file as :file:`height.ftl` and save it in the GeoServer Data Directory at::

     <data_dir>\workspaces\earth\countries\countries\height.ftl

   This location will associate this template with this particular layer only.

#. Now go back to Google Earth and move the globe around enough so that the view will refresh. 

   .. figure:: img/extrude_huge.png

      Very tall extruded polygons

   You will see the polygons extruded based on the value of the attribute, so that the countries with larger populations are taller. However, with such extreme values, the globe is a bit hard to interpret. It would be better to scale the polygons down.

#. Open the same text file again. Replace the text with the following::

     ${POP_EST.value?number / 1000}

   This will divide the attribute value by 1,000. The ``?number`` is to force the attribute to be seen as a numerical value.

#. Now go back to Google Earth again and refresh the view.

    .. figure:: img/extrude_small.png

      Smaller extruded polygons

   The height is much more easy to interact with now.