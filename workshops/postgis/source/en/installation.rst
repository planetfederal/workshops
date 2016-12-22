.. _installation:

Installation
============

We will be using OpenGeo Suite (now known as Boundless Suite) as our software package, as it includes PostGIS/PostgreSQL in a single fast installation for Windows, OS X, and Linux. The Suite also includes GeoServer, OpenLayers, and a number of web visualization utilities.

.. note::

  If you want to install just PostgreSQL, it can also be downloaded directly as source code or binary from the PostgreSQL project site: http://postgresql.org/download/. After installing PostgreSQL, use the "StackBuilder" utility to add the PostGIS extension.

.. note:: 

  The precise directions in this document are for Windows, but for OS X the installation is largely the same. Once the Suite is installed, the directions for both operating systems should be almost identical. 

#. Find OpenGeo Suite installer for your platform. You can download the latest version through `Boundless Connect <http://connect.boundlessgeo.com>`_. OpenGeo Suite is available in the `Downloads <http://connect.boundlessgeo.com/Downloads>`_ area. The Windows installer will be named something like  :file:`opengeosuite-a.b.c.exe`, the Mac OS X installer like :file:`opengeosuite-a.b.c.dmg`). Double click to begin.

#. Enjoy the warm welcome, courtesy of Boundless, then click **Next**.

   .. image:: ./screenshots/install_welcome.png
     :class: inline


#. OpenGeo Suite is licensed under the GNU GPL, which is reproduced on the licensing page. Click **I Agree**.

   .. image:: ./screenshots/install_license.png
     :class: inline


#. The directory where OpenGeo Suite will reside is the usual ``C:\Program Files\`` (or ``C:\Program Files (x86)``) location. Click **Next**.

   .. image:: ./screenshots/install_directory.png
     :class: inline


#. The installer will create a number of shortcuts in the Boundless folder in the Start Menu. Click **Next**.

   .. image:: ./screenshots/install_startmenu.png
     :class: inline


#. Make sure the **PostGIS** component and the **Client Tools** components are selected. Click **Next**.

   .. image:: ./screenshots/install_components.png
     :class: inline


#. Ready for install! Click **Install**.

   .. image:: ./screenshots/install_ready.png
     :class: inline


#. The installation process will run for a couple of minutes.

   .. image:: ./screenshots/install_installing.png
     :class: inline


#. When the installation is complete, launch the Dashboard to start the next section of the workshop! Click **Finish**.

   .. image:: ./screenshots/install_finish.png
     :class: inline

