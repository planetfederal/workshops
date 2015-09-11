.. baseline:

Baseline
========

Our first measurement will establish a starting point for our performance tweaking. There are two metrics we will be tracking during the workbook – throughput for Vector based maps and Raster based maps. Reminder that throughput is the number of Maps your server can produce per second.

Vector Data
-----------

.. admonition:: Exercise
   
   #. The world wide natural earth dataset is very small and has already been optimized for quick visualisations.
      
      To get a more realistic setup we are going to make use of the of the `Roads <http://www.naturalearthdata.com/downloads/10m-cultural-vectors/roads/>`__ "North America supplement" which we have setup as a PostGIS table.
   
   #. Login to GeoServer administration using credentials ``admin/geoserver``.
   
   #. Navigate to :menuselection:`Data --> Import Data`.
   
   #. For :guilabel:`Choose a data source to import from` check :guilabel:`PostGIS`.
      
      .. figure:: img/import-postgis.png
         
         Data source selection
         
   #. Fill in the appropriate configuration details.
      
      * Database: workshop
      * Username: postgres
      * Password: postgres
      
      .. figure:: img/import-configure.png
         
         PostGIS connection parameters
         
      .. only:: instructor
       
         .. note::  The default database and username is determined from the current user. When running asa a service the temporaryly generated name is not useful.
         
   #. Create a new data store in the ``ne`` workspace.
      
      * Workspace: ``ne``
      * Store: ``Create new``
      
      .. figure:: img/import-target.png
         
         Create new target store
   
   #. Click :guilabel:`Next` to start the import process.
      
   #. GeoServer will connect to the database and list the available spatial tables.
   
      Checkmark the ``roads`` layer, and click :guilabel:`Import`.
   
   #. The store is added to GeoServer, and a new layer configured (along with a default style).
      
      .. figure:: img/import-success.png
          
         Import Success
         
   #. You can directly :guilabel:`View in Layer Preview` to see the resulting layer.
      
      .. figure:: img/import-preview.png
         
         Layer Preview showing Vector Network Use
      
   #. Since there was already a ``roads`` layer, the new layer has been created as ``roads0``.
      
      Navigate to :menuselectio:``Data --> Layers`` rename the layer to:
      
      * Name: ``roads_na``
      * Title: ``Roads North America``
      
      .. figure:: img/import-roads_na.png
         
         Rename to ``hyp``
Raster Data
-----------

.. admonition:: Exercise
   
   #. It is a real challenge to find raster data that is large enough to work with constructively for a workbook like this one.
      
      To get a larger sample we are going `Cross Blend Hypso with Relief, Water, Drains and Ocean Bottom <http://www.naturalearthdata.com/downloads/10m-cross-blend-hypso/cross-blended-hypso-with-relief-water-drains-and-ocean-bottom/>`__ downloading the "Large size".
   
   #. Unzip the file into your :file:`GEOSERVER_DATA_DIRECTORY` folder :file:`raster/ne1`.
      
      .. note:: You can double check the location of your data directory under :guilabel:`Server Status`.
   
      The file should be around 667 MB in size.

   #. Navigate to :menuselection:`Data --> Import Data`.
   
   #. For :guilabel:`Choose a data source to import from` check :guilabel:`Spatial Files`.
   
   #. For configuration details click :guilabel:`Browse` and navigate to:
      
      * Choose a file or directory: ``raster\hyp\HYP_HR_SR_OB_DR.tif``
   
   #. Create a new data store in the ``ne`` workspace.
      
      * Workspace: ``ne``
      * Store: ``Create new``
   
   #. Click :guilabel:`Next` to start the import process.
   
   #. From the resulting table checkmark ``HYP_HR_SR_OB_DR`` and click :guilabel:`Import`
      
      .. figure:: img/import-raster.png
         
         Import HYP_HR_SR_OB_DR GeoTIFF
   
   #. Even with this larger file raster performance is impressively quick.
      
      .. figure:: img/import-preview2.png
         
         Layer Preview showing Raster Network Use

   #. Navigate to :menuselectio:``Data --> Layers`` rename the layer to:
      
      * Name: ``hyp``
      * Title: ``Hypsometric``
      
      .. figure:: img/import-rename.png
         
         Rename to ``hyp``
      
      This will make things easier as we will refer to this layer often.

JMeter
------

.. admonition:: Exercise

   #. JMeter is a Java application, and will require Java to run:
   
      * On Linux Java has already been installed as a dependency.
   
      * On windows and mac you may need to download and install Java: https://java.com/en/download/manual.jsp
   
        OpenGeo Suite included an embedded Java Runtime for the Jetty application server to use, but did not install one for system wide use.
   
   #. Download JMeter from the Apache Foundation:
   
      * http://jmeter.apache.org/download_jmeter.cgi

   #. Unzip the JMeter download (say to your desktop).

   #. To run JMeter, navigate into the :file:`bin` folder and run :command:`jmeter.bat` or :command:`jmeter.sh` as appropriate.
   
      .. figure:: img/jmeter.png
      
         Apache JMeter

.. admonition:: Explore
   
   Check out the :file:`scripts` directory for a series of CSV files we will be using to simulate GetMap requests:
   
   * raster-bbox.csv
   * vector-bbox.csv
   * roads-bbox.csv
   
   The python script :file:`wms_request.py`` used to generate these files is included. This script was developed for the "FOSS4G 2009 WMS Shootout".

.. admonition:: Exercise

   We can now define our first benchmark:
   
   #. JMeter is used to define and execute test plans, recoding metrics for performance analysis.
      
      .. figure:: img/jm-test-plans.png
         
         Test Plans
         
      The main JMeter application shows the components that make up a test plan on the left, and the test plan details on the right.
      
   #. We are going to want our raster and vector tests independently (rather than all at once).
   
      Check :guilabel:Run Thread Groups consecutively
   
   #. Right click on :guilabel:`Test Plan` and select :menuselection:`Add --> Threads (Users) --> Thread Group``, and then fill in the following details.
      
      * Name: Vector Test
      * Number of Threads: 20
      * Ramp-Up Period: 0
      * Loop Count: 1
      
      .. figure:: img/jm-vector-tests.png
          
          Vector Tests
          
      .. note::
         
         Take this opportunity to :guilabel:`Save`, and remember to save as you go.
         
   #. Next :menuselection:`Add --> Logic Controller --> Loop Controller`, and fill in the following:
      
      * Name: Loop Controller
      * Loop Count: 5
      
      This is set to run 20 threads against this test once (the ``Thread Group``), each thread will loop 5 times (the ``Loop Controller) totally 100 requests for the test plan.
      
      .. note:: 
         
         As an alternative we could of set the :guilabel:`Loop Coun` in the ``Thread Controller`` - this just gave us a chance to introduce how a logic controller can be used when setting up a test plan.
    
   #. Next :menuselection:`Add --> Config Element -->User Defined Variables`, and fill in:
      
      * 
   