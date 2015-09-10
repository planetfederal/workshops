CSS Install
===========

This workshop course requires GeoServer with a few additional extensions.

* CSS Styling: Quickly and easily generate SLD files
* Importer: Wizard for bulk import of data

On Windows the following is recommended:
          
* `FireFox <http://www.mozilla.org/en-US/firefox/new/>`_
* `Notepad++ <http://notepad-plus-plus.org>`_

The **CSS extension** is distributed as a supported GeoServer extension. Extensions are unpacked into the ``libs`` folder of the GeoServer application.

.. note:: In a classroom setting this extension has already been installed.

Installation instructions are provided here if needed.

Manual Install
--------------

To download and install the CSS extension by hand:

#. Download geoserver-2.5-css-plugin.zip from:

   * `Stable Release <http://geoserver.org/download/>`_ (GeoServer WebSite)
   
   It is important to download the version that matches the GeoServer you are running.

#. Stop the GeoServer application.

#. Navigate into the :file:`webapps/geoserver/WEB-INF/lib` folder.

   These files make up the running GeoServer application.

#. Unzip the contents of geoserver-2.5-css-plugin.zip into :file:`lib` folder.

#. Restart the Application Server.
   
#. Login to the Web Administration application and confirm that **CSS Styles** is listed in the navigation menu.
   
   .. figure:: img/install_css_menu.png

      CSS Styles installed


.. only:: windows
   
   OpenGeo Suite Windows
   ---------------------
   
   The **CSS Extension** is included in the Windows installer.

   If you did not select this option initially the installer can be run again to update your GeoServer application.

   .. admonition:: Exercise
   
      #. Stop the GeoServer service. From the :guilabel:`Start` menu select :menuselection:`OpenGeo --> GeoServer --> Stop`. 
      
      #. Run the installer, and when asked to **Choose Components** select :kbd:`CSS Styling`.
      
         .. figure:: img/install_components.png
   
            Selecting the CSS Styling component
   
      #. Restart the GeoServer service.
      
         From the :guilabel:`Start` menu select :menuselection:`OpenGeo --> GeoServer --> Start`. 
   
      #. Login to the Web Administration application and confirm that **CSS Styles** is listed in the navigation menu.
      
         .. figure:: img/install_css_menu.png

            CSS Styles installed

.. only:: linux
   
   OpenGeo Suite Linux
   ---------------------
   
   OpenGeo Suite includes the packages for the CSS extension and other supported extensions. 
   
   While we have included quick install instructions here you may wish to check the release documentation more detailed step-by-step instructions.

   .. admonition:: Exercise
   
      #. Stop GeoServer so we can update the application:
   
         .. code-block:: bash
         
            service tomcat6 stop
   
      #. Install the wps archive.
   
         Ubuntu:
      
         .. code-block:: bash
         
            sudo su -
            apt-get install geoserver-css
      
         Red Hat:
      
         .. code-block:: bash
      
            sudo su -
            yum install geoserver-css
      
      #. Restart GeoServer:

         .. code-block:: bash
         
            service tomcat6 start
         
      #. Login to the Web Administration application and confirm that **CSS Styles** is listed in the navigation menu.
      
         .. figure:: img/install_css_menu.png

            CSS Styles installed
