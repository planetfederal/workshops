Surficial geology
=================

The **Surificial geology** layer's key attribute is **RECLASS**, which codifies the type of geology as a short series of letters; for example, the code **Mi** means "mined areas mixed with scattered deposits of residuum, slopewash, and/or bedrock outcrops". 

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

If we proceed with the data configured as it currently is, the **Surficial geology** layer's complexity would cause our processing algorithms to be extremely slow due to the complex nature of the data. Since our goal is to see if there is a relationship between geology and antelope ranges, we want to be able to calculate statistics concerning the relationship between different layers. The best way to make these calculations practical is to convert the **Surficial geology** layer to a raster using a **Rasterize** process, but we will require a numerical attribute to assign to the raster sample points when we make the conversion. Therefore, to create a raster, we must first convert each of the **RECLASS** codes into a numeric value that will then be encoded in the raster, something which can be accomplished with a process named **Create equivalent numerical field**.

#. Configure the process **Create equivalent numerical field** from the :menuselection:`Scripts --> Vector` category with the inputs **Surficial geology** and **RECLASS**. A new layer named **Equivalent_numerical_field_layer** with an extra **NUM_FIELD** attribute will be created. Additionally, the script will also create a new non-spatial layer named **Equivalent_numberical_field_table** with a list of what each of the numerical values in the new raster layer refers to.

   .. warning:: There is a **Create equivalent numerical field** process in the :menuselection:`QGIS geoalgorithms --> Vector table tools` cateogry. Functionally, the two will create equivalent output layers; however, only the process in the :menuselection:`Scripts --> Vector` category will create the reference table.

#. Run the process, saving the results to ``workshop\reference\surfical_geology_lookup.csv``.

#. Run the process **Rasterize** with the inputs **Equivalent_numerical_field_layer** and **NUM_FIELD**. We can keep the default size of 3000 by 3000 pixels. The new raster layer will appear in the layer list.

   .. figure:: images/rasterised_layer.png

      **Suficial geology** after conversion to a raster

#. Clip the new **Output layer** to the **Area of interest** layer using the **Clip raster by mask layer** algorithm from the processing toolbox. Make sure to use a :guilabel:`Nodata` value of :kbd:`-32768` and set :guilabel:`Keep resolution of output raster` to :kbd:`Yes`. Set the output file name to be ``workshop\temp\surfgeol_500k.tif``.

   .. note:: We are using the ``temp`` directory to store useful files that we will use during the workshop, but which are not actual data sets.

#. Delete **Equivalent_numerical_field_layer** and the non-clipped **Output layer** from the layer list since we no longer need these intermediary layers. We should now have a clipped raster that represents the geology of the land in our are of interest. Clicking on the raster with the identify tool will give us a value which can be referenced in the **Equivalent_numerical_field_table**. 

#. Give our new layers some more descriptive names: **Surficial geology** for the new raster and **Surficial geology (lookup)** for our reference table.
