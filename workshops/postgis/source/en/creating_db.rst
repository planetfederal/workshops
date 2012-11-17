.. _creating_db:

Section 3: Creating a Spatial Database
======================================

The Dashboard and PgAdmin
-------------------------

The "Dashboard" is the central application to access all portions of the OpenGeo Suite.

When you first start the dashboard, it provides a reminder about the default password for accessing GeoServer.

.. image:: ./screenshots/dashboard_01.png

.. note::

  The PostGIS database has been installed with unrestricted access for local users (users connecting from the same machine as the database is running). That means that it will accept *any* password you provide. If you need to connect from a remote computer, the password for the ``postgres`` user has been set to ``postgres``.

For this workshop, we will be using the entries under the "PostGIS" section of the Dashboard almost exclusively.

#. First, we need to start up PostGIS. Click the green **Start** button at the top right corner of the Dashboard.

#. The first time the Suite starts, it initializes a data area and sets up template databases. This can take a couple minutes. Once the Suite has started, you can click the **Manage** option under the *PostGIS* component to start the pgAdmin utility.

      .. image:: ./screenshots/dashboard_02.png
  
      .. note:: 
  
         PostgreSQL has a number of administrative front-ends.  The primary is `psql <http://www.postgresql.org/docs/current/static/app-psql.html>`_ a command-line tool for entering SQL queries.  Another popular PostgreSQL front-end is the free and open source graphical tool `pgAdmin <http://www.pgadmin.org/>`_. All queries done in pgAdmin can also be done on the command line with psql. 

#. If this is the first time you have run pgAdmin, you should have a server entry for **PostGIS (localhost:54321)** already configured in pgAdmin. Double click the entry, and enter anything you like at the password prompt to connect to the database.

    .. image:: ./screenshots/pgadmin_01.png

    .. note::

      If you have a previous installation of PgAdmin on your computer, you will not have an entry for **(localhost:54321)**. You will need to create a new connection.  Go to *File > Add Server*, and register a new server  at **localhost** and port **54321** (note the non-standard port number) in order to connect to the PostGIS bundled with the OpenGeo Suite.

Creating a Database
-------------------
PostgreSQL has the notion of a **template database** that can be used to initialize a new database.  The new database automatically gets a copy of everything from the template. When you installed PostGIS, a spatially enabled database called ``template_postgis`` was created. If we use ``template_postgis`` as a template when creating our new database, the new database will be spatially enabled.

#. Open the Databases tree item and have a look at the available databases.  The ``postgres`` database is the user database for the default postgres user and is not too interesting to us.  The ``template_postgis`` database is what we are going to use to create spatial databases.

#. Right-click on the ``Databases`` item and select ``New Database``.

   .. image:: ./screenshots/pgadmin_02.png

   .. note:: If you receive an error indicating that the source database (``template_postgis``) is being accessed by other users, this is likely because you still have it selected.  Right-click on the ``PostGIS (localhost:54321)`` item and select ``Disconnect``.  Double-click the same item to reconnect and try again.

#. Fill in the ``New Database`` form as shown below and click **OK**.  

   .. list-table::

      * - **Name**
        - ``nyc``
      * - **Owner**
        - ``postgres``
      * - **Encoding**
        - ``UTF8``
      * - **Template**
        - ``template_postgis``

   .. image:: ./screenshots/pgadmin_03.png

   The template and encoding are specified on the "Definition" panel.

   .. image:: ./screenshots/pgadmin_03a.png

#. Select the new ``nyc`` database and open it up to display the tree of objects. You'll see the ``public`` schema, and under that a couple of PostGIS-specific metadata views -- ``geometry_columns`` and ``spatial_ref_sys``.

   .. image:: ./screenshots/pgadmin_04.png

#. Click on the SQL query button indicated below (or go to *Tools > Query Tool*).

   .. image:: ./screenshots/pgadmin_05.png

#. Enter the following query into the query text field:

   .. code-block:: sql

      SELECT postgis_full_version();

   .. note::
   
      This is our first SQL query.  ``postgis_full_version()`` is management function that returns version and build configuration. 
      
#. Click the **Play** button in the toolbar (or press **F5**) to "Execute the query." The query will return the following string, confirming that PostGIS is properly enabled in the database.

   .. image:: ./screenshots/pgadmin_06.png
   
You have successfully created a PostGIS spatial database!!

Function List
-------------

`PostGIS_Full_Version <http://postgis.org/documentation/manual-svn/PostGIS_Full_Version.html>`_: Reports full postgis version and build configuration info.
