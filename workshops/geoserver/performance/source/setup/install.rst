Install
=======
  
We will be using a range of open source mapping technologies for this workshop:

* `OpenLayers <http://openlayers.org>`__
* `GeoServer <http://geoserver.org>`__ / Importer Extension
* `PostgreSQL <http://www.postgresql.org>`__ / `PostGIS <http://postgis.net>`__ / `PgAdmin <http://www.pgadmin.org>`__
* `GDAL <http://www.gdal.org>`__

.. note::
   
   This workshop makes use of `OpenGeoSuite <http://boundlessgeo.com/solutions/opengeo-suite/>`__ for the above software packages.
   
   OpenGeo Suite offers a pre-tested software stack, and a handy installer making this workshop easier to run. If you already have these tools installed, or would like to work with the community downloads it should not effect your progress.

We will also be working with:

* `Jetty <http://www.eclipse.org/jetty/>`__ - application server
* `Tomcat <http://tomcat.apache.org/>`__ - application sever
* `JMetre <http://jmeter.apache.org>`__ - used to measure performance
* `FireFox <http://www.mozilla.org/en-US/firefox/new/>`__ ( and `FireBug <http://getfirebug.com/>`__ )
* `Chrome <https://www.google.com/chrome/>`__

Step by step instructions will be provided, so you do not need to be familiar with the tools mentioned above. We will be showcasing general stratagies here and you are welcome to use the software you are comfortable with to get the job done.

.. note::

   On Windows the following is recommended:
          
   * `Notepad++ <http://notepad-plus-plus.org>`__

OpenGeo Suite Windows
---------------------

OpenGeo Suite provides an installer for the required components.

.. admonition:: Exercise

   #. Run the windows installer
      
      .. figure:: img/windows_installer.png

         Windows Installer
         
     You may be asked to install `Microsoft .NET Framework 4.5.1 (Offline Installer) <http://www.microsoft.com/en-us/download/details.aspx?id=40779>`__ (used to run GeoServer as a background service).
   
   #. When asked to **Choose Components** select::
         
         PostGIS
         GeoServer
         Client Tools (GDAL, pgAdmin, PostGIS Utilities )
      
      .. figure:: img/windows_components.png

         Windows Components

   #. Start GeoServer service.
   
      From the :guilabel:`Start` menu select :menuselection:`OpenGeo --> GeoServer --> Start`. 

   #. Login to the Web Administration application and check server status.
   
OpenGeo Suite Ubuntu
--------------------

OpenGeo Suite provides a repository for the use of :command:`apt-get`:

.. admonition:: Exercise

   #. Repository setup instructions are provided online:
   
      * `OpenGeo Suite for Ubuntu Linux <http://suite.opengeo.org/opengeo-docs/intro/installation/ubuntu/index.html>`_
      
      Confirm repository is available using::
      
         apt-get update
         apt-cache search opengeo
      
   #. This workshop requires postgis, geoserver and command line tools::
      
         sudo apt-get install opengeo
      
   #. The services are controlled using::
      
         sudo service tomcat7 start|stop|restart
         sudo service postgresql start|stop|restart
      
   #. Login to the Web Administration application and check server status.
      
      .. note:: OpenGeo Suite includes the importer extension (listed as :guilabel:`Import Data` in the navigation menu)

OpenGeo Suite RedHat / CentOS
-----------------------------

OpenGeo Suite provides a repository for the use of :command:`yum`:

.. admonition:: Exercise

   #. Repository setup instructions are provided online:
      
      * `OpenGeo Suite for Red Hat Linux <http://suite.opengeo.org/opengeo-docs/intro/installation/redhat/index.html>`_
      
      confirm repository is available using::
      
         yum search opengeo

   #. This workshop requires postgis, geoserver and command line tools::
         
         yum install opengeo
      
   #. The services are controlled using::
      
         service tomcat start|stop|restart
         service postgresql-9.3 initdb|start|stop|restart

   #. Login to the Web Administration application and check server status.
      
      .. note:: OpenGeo Suite includes the importer extension (listed as :guilabel:`Import Data` in the navigation menu)
   
Importer Extension
------------------

If you are installing from geoserver.org you will need to manually install the Importer extension (for bulk import of data).

.. admonition:: Exercise

   To download and install the Importer extension by hand:

   #. Download geoserver-2.7.2-importer-plugin.zip from:

      * `Stable Release <http://geoserver.org/download/>`_ (GeoServer WebSite)
   
      It is important to download the version that matches the GeoServer you are running.

   #. Stop the GeoServer application.

   #. Navigate into the :file:`webapps/geoserver/WEB-INF/lib` folder.

      These files make up the running GeoServer application.

   #. Unzip the contents of geoserver-2.7.2-importer-plugin.zip into :file:`lib` folder.

   #. Restart the Application Server
   
   #. Login to the Web Administration application and confirm that :guilabel:`Import Data` is listed in the navigation menu
