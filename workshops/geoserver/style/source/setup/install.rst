Install
=======

This workshop course requires OpenGeo Suite and a few additional software packages.

.. admonition:: Exercise

   #. Install the OpenGeo Suite with the following components:
   
      ================== ==================== =================
      Default Components GeoServer Extensions Client Tools
      ================== ==================== =================
      GeoServer          CSS Styling          
                         Importer
      ================== ==================== =================
   
      .. image:: img/install_components.png
   
   #. Unzip the course materials to your Desktop:
        
      * ne_datapack - sample data


   #. On Windows the following is recommended:
             
      * `FireFox <http://www.mozilla.org/en-US/firefox/new/>`_
      * `Notepad++ <http://notepad-plus-plus.org>`_

GeoServer Configuration
-----------------------

In a classroom setting GeoServer has been preconfigured with the appropriate data directory.

To setup up GeoServer yourself:

#. Use the **Importer** to add and publish the from :file:`ne-datapack`.
   
   Add the following TIF Coverage Stores:
   
   * dem/W100N40.TIF
   * ne/ne1/NE1_HR_LC_SR.tif
   
   Add the following Directory of shape files:
   
   * ne/ne1/physical
   * ne/ne1/cultural

#. (Optional) create a group layer consisting of:
   
   * NE/NE1_HR_LC_SR
   