Createing a model
=================

#. In the processing toolbox, open :menuselection:`Models --> Tools --> Create new model`.

#. Double click :guilabel:`Raster Layer`.

#. Give the new parameter the name :kbd:`Image` and make it required.

   .. figure:: images/raster_model_1.png

      First input parameter

#. Add a new :guilabel:`Vector layer` named :kbd:`Zones` with :guilabel:`Shape type` as :kbd:`Polygon`.

#. Add a new :guilabel:`Table field` named :kbd:`Class` and select the :guilabel:`Parent layer` to be :kbd:`Zones`. This means that the attribute name must be selected from the vector layer that we select as the **Zones** input parameter.

   .. figure:: images/raster_model_2.png

      All input parameters

#. Change to the :guilabel:`Algorithms` tab.

   .. figure:: images/algorithms_tab.png

      Algorithms tab

#. Create a **Frequency Analysis** process that takes the **Zones** parameter as the vector layer. Set the layer output to :kbd:`zone majority`.

#. Create a **Singleparts to multipart** process that takes the **Zones** parameter and the **Class** attribute as inputs. Set the output to :kbd:`zone statistics`.

   .. figure:: images/raster_model_4.png

      Complete model

#. Create another **Frequency Analysis** process that takes the output of the **Singleparts to multipart** process (the other input settings are the same). Set the table output to :kbd:`zone statistics`.

#. Give the model the name :kbd:`Zone analysis` and the group :kbd:`workshop`.

#. Save the model.

We now have a complete model that takes three intputs and creates two outputs (one layer and one table). We can use this model to analyze any raster image to see the frequency statistics of zones defined in a polygon layer.
   
.. note:: One limitation of this model is that the raster value of interest must always be in the first band. We could additionally parameterise the band number in our model.

.. This exercise original contained these additional steps to create a baseline. However, adding these can cause Python to crash with 32-bit builds since the amount of memory required is large.

   #. Add a **Dissolve** process that takes **Zones** as an input and does not use an attribute, but rather dissolves all borders. This will create our areas of interest layer to measure against.
   
      .. note:: We could have provided another input that would allow us to use our existing **Area of interest**, but calculating it dynamically allows this model to be reused even when we have not already pre-calculated the **Area of interest**.
   
   #. Create a new **Frequency Analysis** process that takes the output of the **Dissolved** process as the vector layer and the **Class** parameter for the :guilabel:`id_field`. The raster will be the **Image** input parameter. Set the table output to :kbd:`baseline`.
   
      .. figure:: images/raster_model_3.png
   
         Chaining two processes and leaving an output

