Styling
=======

Now that we have some data to work with, let's experiment with assigning some styles to the data. The **ant14hh** layer contains information about designated herd units in the state.

#. Make sure that the **ant14hh** layer is selected in the layer list.

#. Click the |id| button in the toolbar to activate the feature identification tool.

#. Click on any of the herd areas on the map. A dialog will appear that gives information about the selected feature and its attributes.

   .. figure:: images/herd_units.png

      Herd unit feature

   The **HERDNAME** attribute has a name that we can use to identify each feature as belonging to a particular unit. We will style each feature differently based on the value of this attribute.
   
   .. note:: There is also a **HUNTNAME** attribute which subdivides the herds into hunt areas, but we are interested in the movement of the antelope and how it relates to natural conditions rather than human-designated zones. We will ignore all attributes which relate to hunting.

#. Right click the **ant14hh** layer and select :guilabel:`Properties`.

#. Select :guilabel:`Style` from the list of tabs. Currently, we are using only a single symbol (a solid colour) for all features. We want to change this so that the colour will change depending on the value of an attribute.

   .. figure:: images/style_menu.png

      Single symbol style

#. Change :guilabel:`Single Symbol` to :guilabel:`Categorized`.

#. Select **HERDNAME** from the :guilabel:`Column` drop down box.

#. Select :guilabel:`Random colors` from the :guilabel:`Color ramp` drop down box. 

#. Click the :guilabel:`Apply` button. This will find all the unique values for the **HERDNAME** attribute and assign each a random colour.

   .. figure:: images/herdname_style.png

      Categorised style

#. Click the :guilabel:`Labels` tab on the left side bar.

#. Select :guilabel:`Show labels for this layer` from the drop down menu near the top.

#. Set the label for this layer to be **HERDNAME**.

#. Click :guilabel:`OK`. The map will be redrawn with the colour and label of each attribute tied to the **HERDNAME** attribute.

   .. figure:: images/herdname_map.png

      Styled layer
   
.. |id| image:: images/id_features.png
            :class: inline
