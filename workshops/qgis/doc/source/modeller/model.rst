Creating a model
================

#. In the processing toolbox, open :menuselection:`Models --> Tools --> Create new model`.

   .. figure:: images/modeller_empty.png

      Empty model
      
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

#. Create a **Singleparts to multipart** process that takes the **Zones** parameter and the **Class** attribute as inputs.

#. Create a **Frequency Analysis** process that takes the output of the **Singleparts to multipart** process (the other input settings are the same). Set the table output to :kbd:`zonal statistics`.

   .. note:: 'Chains' that take one output and feed it into another process are the key to powerful models since they allow us to reproduce known steps while skipping the creation of all the intermediary layers that we have been adding and deleting.

   .. figure:: images/raster_model_3.png

      Processing chain

Multiple outputs
----------------

We have already created a functional model that chains two processes together and provides useful output. However, with the exact same inputs, we can add another 'parallel' process to create the equivalent of our **Majority** layer. Remember that for this layer, we only need to run the **Frequency Analysis** algorithm to calculate the most common raster value in each zone.

#. Create a **Frequency Analysis** process that takes the **Zones** parameter as the vector layer. Set the layer output to :kbd:`zonal majority`.

   .. figure:: images/raster_model_4.png

      Complete model with two tasks

#. Give the model the name :kbd:`Zone analysis` and the group :kbd:`workshop`.

#. Save the model.

We now have a complete model that takes three intputs and creates two outputs (one layer and one table). We can use this model to analyze any raster image to see the frequency statistics of zones defined in a polygon layer.
   
.. note:: One limitation of this model is that the raster value of interest must always be in the first band. We could additionally parameterise the band number in our model since the **Frequency analysis** script also takes this input parameter.
