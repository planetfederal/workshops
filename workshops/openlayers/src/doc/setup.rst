Workshop Setup
==============

Prerequisites
-------------

This workshop requires that that PostgreSQL with PostGIS and GeoServer are  installed on workshop machines.  These instructions assume that the OpenGeo Suite installer was assumed to install both GeoServer and PostgreSQL.  GeoServer and PostgreSQL should be running before starting the workshop.  With the Suite install, these services can be started from the Suite Dashboard (on Windows,  you'll also find items in the Start menu.)  As noted below, deploy the workshop documentation before starting the Suite.


Deploying the Workshop Docs
---------------------------

Extract the ol_workshop.zip archive to the :file`webapps` directory in your Suite install.  The location of this directory differs depending on your operating system.

 * Windows: :file:`C:\\Program Files\\OpenGeo\\OpenGeo Suite\\webapps`
 * Mac OS X: :file:`/opt/opengeo/suite/webapps`
 * Linux: :file:`/var/lib/tomcat6/webapps/`
 
.. note:: Move the extracted :file:`ol_workshop` directory into your :file:`webapps` directory **before** starting the Suite.
 
Test the Setup
--------------

Test GeoServer and Postgres Setup:

 #. Start the OpenGeo Suite.
 #. Load @geoserver_url@/ in a browser. You should see GeoServer's welcome screen.
 #. Navigate to the layers preview page. You should be able to see the medford layers listed in the table. 
 #. Click on the OpenLayers preview link for the ``medford`` layer. You should see some elevation data with infrastructure data over it.

Test Workshop Docs:

 #. Load @workshop_url@/doc/ in a browser. You should see a the intro page for the workshop docs with links to lead you through the workshop.
