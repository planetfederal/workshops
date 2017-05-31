.. _install.suite:

Boundless Suite
===============

Boundless Suite is a complete web-based geospatial software stack. In this package, the applications contained are:

* **PostGIS** - A spatially enabled object-relational database.
* **GeoServer** - A software server for loading and sharing geospatial data.
* **GeoWebCache** - A tile cache server that accelerates the serving of maps (built into GeoServer).
* **OpenLayers** - A browser-based mapping framework

.. figure:: img/ecosystem.png

   Boundless Suite components and ecosystem

Boundless Suite is free and open source, and is available for download from `Boundless <http://boundlessgeo.com/>`_. Boundless Suite customers are provided with the latest release along with commercial training and support. Boundless Suite includes slightly different extensions than the community releases of GeoServer. Boundless Suite components are subject to extensive integration testing and are available in a range of packages including virtual machines, Linux packages, web archives, and cloud/clustering options.

GeoServer also plays an important role in other Boundless products including the `Boundless Exchange <https://boundlessgeo.com/boundless-exchange/>`__ content management system.

Installation Requirements
-------------------------
In this section we will install a virtual machine containing Boundless Suite.

Prerequisites:

* Please disable any programs on your system that use either 8080. (If this is not possible, please ask for alternative connection options.)
* We strongly recommend you use a recent version of `Firefox <http://www.mozilla.org/en-US/firefox/new/>`_ as the browser on your host system. Using `Chrome <https://www.google.com/intl/en/chrome/browser/>`_ is acceptable, though an XML viewer extension such as `XV <https://chrome.google.com/webstore/detail/xv-%E2%80%94-xml-viewer/eeocglpgjdpaefaedpblffpeebgmgddk?hl=en>`_ will be required for some sections. Other browsers have not been tested and are not recommended.
* Make sure you have administrative rights (Windows) or super-user privileges (Linux and OS X) on your system.

.. _install.suite.vm:

Install the virtual machine
---------------------------

Next we will install the Boundless Suite virtual machine. This virtual machine will run inside `VirtualBox`_ in the background of your system.

.. note:: You must be able to run a 64-bit virtual machine. 32-bit machines are not supported.

.. _VirtualBox: https://www.virtualbox.org/wiki/Downloads

#. Download the Boundless Suite virtual machine from the `Boundless Connect <https://connect.boundlessgeo.com>`__ .
   
   * Boundless Connect is a free sign up to access Boundless Suite, and to access our training and workshop materials.
   * The latest release of Boundless Suite is restricted to our customers, prior releases are available for free download.
   * This download is included in your :file:`software` folder
   
   .. figure:: img/connect.png
      :width: 100%
      
      Boundless Connect
      
#. Download and install the latest `VirtualBox`_. You may keep all defaults during the install.
   
   .. figure:: img/vbox.png

      Installing VirtualBox for Windows

   .. note:: During install on Windows, you may see a warning about your network interfaces. **This is expected.** Your network connections will be *temporarily* disconnected, and automatically reset after installation has completed. So be aware that you don't want to be utilizing your network connection (for example, downloading something) during the installation of VirtualBox.

      .. figure:: img/vbox_network.png
      
         Network Interfaces warning

#. Double-click the VM image file that you downloaded above (with the :file:`.ova` file extension). This will import the virtual machine into VirtualBox.

   .. figure:: img/vbox_import.png
      :width: 75%

      Virtual machine details
      
#. Click :guilabel:`Import` to accept the defaults.

#. You will now see the :guilabel:`BoundlessSuite` entry in the list of virtual machines in VirtualBox.

   .. figure:: img/vbox_imported.png
      :width: 100%
      
      A successful import of the training virtual machine
         
Determining hardware virtualization compatibility
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

One of the most common problems users have when importing a virtual machine is that if **hardware virtualization** is not enabled for your system, the virtual machine will silently fail, showing no obvious errors.

So the next step is to check that you have hardware virtualization is enabled for your system, and if not enabled, to show how to turn it on.

#. With the VM successfully imported into VirtualBox, click the :guilabel:`General` setting link at the top of the VirtualBox Manager window.

#. In the dialog box that displays, check the value of the :guilabel:`Version` of the operating system (under the :guilabel:`Basic` tab). It should say :guilabel:`Ubuntu (64-bit)`.

   .. figure:: img/vbox_hwvirt.png

      The version should say "64-bit"

#. If the field says :guilabel:`Ubuntu (64-bit)`, then everything is set up properly. Click :guilabel:`OK` to exit out of the Settings dialog, and **you may skip to the next section.**.

#. If the field says :guilabel:`Ubuntu (32-bit)` then *most likely* hardware virtualization is not enabled for your system.

   .. note:: 
   
      #. Reboot your machine and enter your system BIOS.

         .. note:: Please check with your hardware manufacturer for how to enter your system BIOS.

      #. Search through the settings and look for an option titled one of "Hardware Virtualization", "Intel Virtualization", "Virtualization Technology", "Intel VT-x" or similar setting.

         .. note:: It may be under an "Advanced" section.

      #. Switch the setting to :guilabel:`Enabled`.

         .. figure:: img/bios.png

            Sample BIOS image. Your BIOS will likely look different.

      #. Save changes to the BIOS and reboot your computer.

      #. Back in your system, remove the VM from your listing by right-clicking the VM and selecting :guilabel:`Remove`. When asked what to do with existing files, select :guilabel:`Delete all files`.

      #. Double-click the original VM file downloaded to reimport it into Virtualbox.

      #. When finished, click the :guilabel:`General` setting link at the top of the VirtualBox Manager window.

      #. In the dialog box that displays, check the value of the :guilabel:`Version` of the operating system (under the :guilabel:`Basic` tab). It should say :guilabel:`Ubuntu (64-bit)`.

      If it still does not display "64-bit", then either hardware virtualization was not successfully installed, or there is another issue. Please contact us at training-support@boundlessgeo.com for assistance.

Setting shared folders
----------------------

In order to facilitate copying files from your host system to the virtual machine, we will create a shared folder such that any files copied there will be accessible inside the virtual machine.

.. admonition:: Exercise

   #. Click to select the virtual machine and then click :guilabel:`Shared Folders`.

   #.  Right-click the blank area of the dialog and select :guilabel:`Add shared folder` (or press :kbd:`Insert`).

      .. figure:: img/vbox_sharedfolderlink.png

         Right-click to add a new shared folder

   #. Fill out the form:

      * For :guilabel:`Folder Path`, select your Desktop (:file:`C:\\Users\\<username>\\Desktop`) or your home directory (:file:`/home/<username>`).
      * For :guilabel:`Folder Name`, enter :kbd:`share`. 
      * Check :guilabel:`Auto-mount`.

      .. figure:: img/vbox_addsharedfolder.png

         Adding a new shared folder

   #. When finished, click :guilabel:`OK`, then click :guilabel:`OK` again to close the :guilabel:`Settings` page.

Start the virtual machine
-------------------------

Now you are ready to start the VM and test the setup.

#. Start the virtual machine by clicking the :menuselection:`Start --> Start` toolbar button (or by using the application menu :menuselection:`Machine --> Start --> Start`).

   .. figure:: img/vbox_start.png
      :width: 100%
      
      Starting the virtual machine

   .. note:: Make sure you enabled **hardware virtualization** in your system's BIOS, otherwise the virtual machine will not be able to be started.

#. If you see any Windows Firewall warnings, you may accept them.

#. It may take a few minutes for the virtual machine to load. You will know that the virtual machine is ready when you see the console pause and ask for a login:

   .. figure:: img/check_vmready.png
      :width: 100%
      
      Virtual machine ready

   This window captures keyboard and mouse input, which can be a hindrance to working with the virtual machine.
      
   * If you just see a blank screen, click in the window, press :kbd:`Enter`

   * If you ever lose your mouse or are unable to type, press the :kbd:`Right Ctrl` key to reclaim focus back from the virtual machine.

#. To login use the following credentials:
   
   * username: :kbd:`root`
   * password: :kbd:`boundless123`

   .. figure:: img/check_login.png
      :width: 100%
      
      Virtual machine ready

#. Confirm that your shared folder is available. From the command line type the following:
   
   :kbd:`cd /media/sf_Desktop`
   
   This changes the directory to your shared folder.

#. List the contents of your shared folder.

   :kbd:`ls`
   
   .. note:: If the shared folder is not available, double check the shared folder instructions and restart the virtual machine.

#. Confirm GeoServer is working by visiting http://localhost:8080/geoserver in your browser.
   
   .. figure:: img/check_geoserver.png
      :width: 100%
      
      GeoServer Web Administration page
      
.. note:: 

   Boundless Suite comes with a Dashboard application that provides links to the most common applications and their documentation.

   #. The Dashboard is available in the browser by navigating to http://localhost:8080/dashboard .

   #. The main Dashboard page show links to configuration pages and documentation.

      .. figure:: img/dashboard.png
         :width: 100%
      
         Boundless Suite Dashboard

   #. The top toolbar contains links to two other pages:

      * The :guilabel:`Getting Started` page includes a sample workflow to use for publishing data and maps using OpenGeo Suite. A similar workflow will be followed as part of this workshop.
      * The :guilabel:`Documentation` page links to the OpenGeo Suite User Manual, which contains the full user manual for GeoServer.

