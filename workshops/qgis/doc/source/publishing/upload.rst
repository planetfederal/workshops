Uploading layers
================

Now let's move some data from QGIS over to our GeoServer so that we can share it over the network.

#. Right click :menuselection:`GeoServer catalogs --> Default GeoServer catalog --> GeoServer Workspaces --> New workspaces`.

#. Set the :guilabel:`Workspace name` to :kbd:`antelope` and :guilabel:`URI` to :kbd:`http://localhost:8080/antelope`.

#. Scroll down and right click on :menuselection:`QGIS project --> QGIS Layers --> Seasonal ranges` and select :menuselection:`Publish to GeoServer`.

#. Select the :kbd:`antelope` workspace from the :guilabel:`Publish layer` dialog.

   .. figure:: images/publish_layer.png

      Publishing a layer

#. Click :guilabel:`OK`. The layer and its style will be uploaded to GeoServer.

#. Open Firefox (or another browser) and navigate to http://localhost:8080/geoserver.

#. Click on :guilabel:`Layer Preview`. The **antelope:Seasonal_ranges** layer should be in our list.

   .. figure:: images/geoserver_layers.png

      Layers in GeoServer

#. Click :guilabel:`OK` to launch the preview.

   .. figure:: images/layer_preview.png

      Previewing a layer

We have now published our layer out to GeoServer for distribution over the internet. We can move other layers over to GeoServer to create a webmapping application or other data service for remote scientists to consume.
