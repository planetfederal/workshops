Instructions for Setting up Your Machine for the GeoExt Workshop
================================================================

The GeoExt workshop requires the OpenGeo Suite.


Prerequisites
-------------

Software required for this workshop:
* A recent web browser with debugging facilities, e.g. Chrome, Safari,
  Firefox with the Firebug extension, or Internet Explorer 9.
* A text editor with JavaScript syntax highlighting and indentation, e.g.
  Notepad2.exe (not Notepad++) on Windows, TextWrangler on OSX
* The OpenGeo Suite, recommended version 2.4.3

If a copy of the OpenGeo Suite was not provided, visit
http://opengeo.org/products/suite/ to download.

Install the OpenGeo Suite with the default settings. If a service is already
running on port 8080, you need to change the Suite's primary port. On Windows
and OSX this can easily be done by launching the OpenGeo Dashboard, going to
the Preferences pane, and set the Primary Port under Service Ports to a
different port, e.g. 9080.


Installing the workshop materials
---------------------------------

These instructions assume that when the OpenGeo Suite is running, GeoServer
will be running on port 8080 (default setting). Note, if GeoServer does not run
on port 8080, change 8080 below to the appropriate port. "www folder" in
the context of these instructions means the default location of GeoServer's www
folder, as installed by the OpenGeo Suite, which is e.g.
/opt/opengeo/suite/data_dir/www on OSX or
C:\Documents and Settings\<User>\.opengeo\data_dir\www on an English Windows
system.

The gx_workshop.zip archive should be extracted into this www folder. After
extraction, the www folder should have a gx_workshop folder.

This should give you a gx_workshop subfolder on your web server. When the
workshop asks you to save files in the root folder of the work shop, this refers
to the gx_workshop/ folder under www.


Starting the Workshop
---------------------

    1. Load http://localhost:8080/geoserver/www/gx_workshop/doc/ in a browser.
       You should see a the intro page for the workshop docs with links to lead
       you through the workshop. Enjoy!


Please contact me with any issues that come up (ahocevar at opengeo.org).
