.. _geoexplorer.uploading:

Uploading data
==============

There's one other useful feature hidden away behind GeoExplorer's :guilabel:`Login` button: The ability to upload data directly to GeoServer.

GeoExplorer allows you to upload one or more Shapefiles or GeoTIFFs, provided they are packaged into an archive (ZIP, GZ, TAR, etc.)  Single GeoTIFF files can actually be uploaded without an archive, however single SHPs cannot, as all of the associated files in a SHP (DBF, SHX, etc.) need to be packaged up together.

Conveniently, the file :file:`<workshop>\\data\\rivers.zip` contains just a shapefile that can be uploaded in GeoExplorer

#. You'll need to be logged in to GeoExplorer to do this. If not already, please launch GeoExplorer and log in now. 

#. From the Layer Toolbar, click the :command:`Add Layer` button.
  
#. We've seen this dialog before, but this time there's an :guilabel:`Upload Data` button in the bottom left corner.

   .. figure:: img/gx_dialog_addwithupload.png
      :align: center
   
#. Click :guilabel:`Upload Data`.

#. Fill in the fields in the :guilabel:`Upload Data` dialog, as shown.

   .. figure:: img/gx_dialog_upload.png
      :align: center
   
#. When you're ready, click :guilabel:`Upload`.

#. The upload progress monitor spins while your layer is

   * Uploaded to GeoServer
   * Unzipped, if archived
   * Located to the appropriate data-store
   * Registered as a layer (in a store, with a workspace)
   
#. When your layer has uploaded successfully, it will automatically appear in the list of :guilabel:`Available Layers` ready to be added to your map.

   .. figure:: img/gx_dialog_uploaded.png
      :align: center
   
#. Add the layer to your map, and click :guilabel:`Done` to close the :guilabel:`Available Layers` dialog.

   .. figure:: img/gx_dialog_uploadedadded.png
      :align: center
      
      *Rivers layer in GeoExplorer*
      
Bonus
-----

* Give your rivers a new, more appropriate style.
* Review the results of your upload in GeoServer (Workspace, Store, Layer, Style, SLD)
* If you uploaded this layer to a PostGIS store, confirm the results of the upload in the database
* Add a new WMS resource to GeoExplorer