Surficial geology
=================

The **Surficial geology** layer's key attribute is **RECLASS**, which codifies the type of geology as a short series of letters; for example, the code **Mi** means "mined areas mixed with scattered deposits of residuum, slopewash, and/or bedrock outcrops". 

Surfical geology codes
----------------------

==== =======
Code Meaning
==== =======
Ai   Old alluvial plain with scattered deposits of eolian, residuum, and slopewash
ai   Alluvium with scattered deposits of terrace, slopewash, eolian, residuum, grus and glacial
aR   Shallow Alluvium mixed with scattered bedrock outcrops
bi   Bench including eolian, slopewash, outwash, and bench and/or mesa
bdi  Dissected bench with scattered deposits of residuum, slopewash, landslide, and eolian
tdi  Dissected terrace deposits mixing with alluvium, residuum, eolian, and slopewash
ti   Terrace deposits mixed with scattered deposits of alluvium, residuum, eolian, slopewash, and outwash
tre  Shallow terrace deposits mixed with scattered deposits of eolian and residuum
fi   Alluvial fan and gradational fan deposits mixed with scattered deposits of slopewash, residuum, and eolian
fdi  Dissected alluvial fan and gradational fan deposits mixed with scattered deposits of slopewash and residuum
mi   Mesa including scattered deposits of residuum and eolian
ei   Eolian mixed with scattered deposits of residuum, alluvium, and slopewash
oai  Glacial outwash and alluvium mixed with scattered deposits of glacial, terrace, hot spring, bedrock outcrops, residuum, slopewash and grus
gi   Glacial deposits mixed with scattered deposits of slopewash, residuum, grus, alluvium, colluvium, landslide, and/or bedrock outcrops
li   Landslide mixed with scattered deposits of slopewash, residuum, Tertiary landslides, and bedrock outcrops; landslides too small and numerous to show separately
pea  Playa deposits mixed with scattered deposits of alluvium, eolian, and r; playa deposits too small to show separately
sci  Slopewash and colluvium mixed with scattered deposits of slopewash, residuum, grus, glacial, periglacial, alluvium, eolian, and/or bedrock outcrops
ri   Residuum mixed with alluvium, eolian, slopewash, grus, and/or bedrock outcrops
ui   Grus mixed with alluvium, eolian, slopewash, grus, and/or bedrock outcrops
Ri   Bedrock and glaciated bedrock including hot spring deposits and volcanic necks; mixed with scattered shallow deposits of eolian, grus, slopewash, colluvium, residuum, glacial, and alluvium.
Mi   Mined areas mixed with scattered deposits of residuum, slopewash, and/or bedrock outcrops
Ki   Karst areas mixed with scattered deposits of residuum, slopewash, alluvium and/or bedrock outcrops
ki   Clinker mixed with scattered deposits of residuum, slopewash, alluvium and/or bedrock outcrops
xi   Truncated bedrock mixed with scattered shallow deposits of eolian, terrace, residuum, alluvium, old alluvial plain, bench, and slopewash
Ti   Structural terrace including and/or mixed with deposits of alluvium, eolian, residuum, slopewash, and terrace. 
==== =======

Converting vectors to rasters
-----------------------------

If we proceed with the data configured as it currently is, the **Surficial geology** layer's complexity would cause our processing algorithms to be extremely slow due to the nature of the data. Since our goal is to see if there is a relationship between geology and antelope ranges, we want to be able to calculate statistics concerning the relationship between the different layers. The best way to perform this calculation is to convert the **Surficial geology** layer to a raster using a **Rasterize** process, but we will first require a numerical attribute to be assigned to the raster sample points. Therefore, we must convert each of the **RECLASS** codes into a numeric value that will then be encoded in the raster. This can be accomplished with  the **Create equivalent numerical field** process.

#. Configure the process **Create equivalent numerical field** from the :menuselection:`Scripts --> Vector` category with the **Surficial geology** input layer and the **RECLASS** fieldname. A new layer named **Equivalent numerical field layer** with an extra **NUM FIELD** attribute will be created. Additionally, the script will also create a new non-spatial layer named **Equivalent_numberical_field_table** with a list of what each of the numerical values in the new raster layer refers to.

   .. warning:: There is a **Create equivalent numerical field** process in the :menuselection:`QGIS geoalgorithms --> Vector table tools` category. Functionally, the two will create equivalent output layers; however, only the process in the :menuselection:`Scripts --> Vector` category will create the reference table.

#. Run the process, saving the table results to ``qgis/reference/surfical_geology.csv``.

#. Run the **Rasterize** process under the GDAL/OGR drop down, with the inputs **Equivalent numerical field layer** and **NUM_FIELD**. Set output raster size to **Output size in pixels**, and set **Horizontal** and **Vertical** to 3000. The new raster layer will appear in the layer list.

   .. figure:: images/rasterised_layer.png

      **Surficial geology** after conversion to a raster

#. Delete **Equivalent numerical field layer** from the layer list since we no longer need these intermediary layers. We should now have a raster that represents the geology of the land in our are of interest. Clicking on the raster with the identify tool (ensure layer is selected) will gives us a value which can be referenced in the **Equivalent numerical field table**. 

#. Give our new layers some more descriptive names: **Surficial geology (raster)** for the new raster and **Surficial geology (reference)** for our reference table.

.. note::

   You may wish to clip the new raster to the **Area of interest** layer using the **Clip raster by mask layer** algorithm from the processing toolbox. Make sure to use a :guilabel:`Nodata` value of :kbd:`-32768` and set :guilabel:`Keep resolution of output raster` to :kbd:`Yes`.
