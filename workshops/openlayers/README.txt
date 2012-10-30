Workshop Setup
==============

Prerequisites
-------------

This workshop requires that that PostgreSQL with PostGIS and GeoServer are  
installed on workshop machines.  These instructions assume that the OpenGeo 
Suite installer was assumed to install both GeoServer and PostgreSQL.  GeoServer 
and PostgreSQL should be running before starting the workshop.  With the Suite 
install, these services can be started from the Suite Dashboard (on Windows,  
you'll also find items in the Start menu.)  As noted below, deploy the workshop 
documentation before starting the Suite.

Either the Community Edition or the Enterprise Edition of the Suite can be used
in the workshop.  See http://opengeo.org/products/suite/ for details on 
downloading and installing the Suite for your system.

Deploying the Workshop Docs
---------------------------

Extract the ol_workshop.zip archive to the :file`webapps` directory in your Suite install.  The location of this directory differs depending on your operating system.

 * Windows: `C:\Program Files\OpenGeo\OpenGeo Suite\webapps`
 * Mac OS X: `/opt/opengeo/suite/webapps`
 * Linux: `/var/lib/tomcat6/webapps/`
 
Note: Move the extracted `ol_workshop` directory into your `webapps` directory **before** starting the Suite.
 
Test the Setup
--------------

Test GeoServer and Postgres Setup:

 1. Start the OpenGeo Suite.

 2. Load http://localhost:8080/geoserver in a browser. You should see 
    GeoServer's welcome screen.

 3. Navigate to the layers preview page. You should be able to see the medford
    layers listed in the table. 

 4. Click on the OpenLayers preview link for the ``medford`` layer. You should 
    see some elevation data with infrastructure data over it.

Test Workshop Docs:

 1. Load http://localhost:8080/ol_workshop/doc/ in a browser. You should see a 
    the intro page for the workshop docs with links to lead you through the 
    workshop.



