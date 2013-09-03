.. _postgis.createdb:

Creating a PostGIS Database
===========================

Now with some spatial database concepts under our belts, we'll use the GUI client **pgAdmin** to connect to the PostGIS server and create a spatially-enabled database.

.. note:: PostgreSQL has a number of administrative front-ends. `psql <http://www.postgresql.org/docs/9.2/static/app-psql.html>`_ is a command-line tool for managing PostgreSQL databases and entering SQL queries. The desktop utility `pgAdmin <http://www.pgadmin.org/>`_ is a tool that provides similar functionality with a graphical front-end. In this workshop, we're going to use pgAdmin, but all of the queries that can be done in pgAdmin can also be done on the command line with :command:`psql`.

Start PostGIS and connect to pgAdmin
------------------------------------

#. Make sure that OpenGeo Suite is running. If it isn't already, click the green :guilabel:`Start` button in the top right corner of the Dashboard.

   .. figure:: img/dashboard_start.png

      This green button will start OpenGeo Suite and all of its components

#. When started, you can click the **Manage** option under the *PostGIS* component to start the pgAdmin utility.
  
   .. figure:: img/dashboard_pgadmin.png

      Launching pgAdmin
      
#. You should have a server entry for **PostGIS (localhost:54321)** already configured in pgAdmin. Double-click the entry, and when prompted for a password, leave it blank.  This will connect to the local PostGIS instance.

   .. figure:: img/pgadmin_connect.png

      Connecting to PostGIS

.. note:: For this workshop, the PostGIS database has been installed with unrestricted access for local users (users connecting from the same machine on which the database is running). That means that it will accept **any** password you provide. If you need to connect from a remote computer, the password for the ``postgres`` user has been set to ``postgres``.  Obviously, a production instance would be set up with more security in mind.

.. note::  If you have a previous installation of pgAdmin on your computer, you may not have an entry for the local PostGIS instance, so you will need to create a new connection. Go to :menuselection:`File --> Add Server` and register a new server at **localhost** and port **54321** (note the non-standard port number).  You will then be able to connect to the PostGIS instance that is bundled with the OpenGeo Suite.


Create a database
-----------------

PostgreSQL has the notion of a **template database** that can be used to initialize a new database. When OpenGeo Suite was installed, a spatially-enabled database called ``template_postgis`` was created in PostGIS. If we use ``template_postgis`` as a template when creating our new database, the new database will be spatially enabled.

.. warning:: Don't click on the ``template_postgis`` database in pgAdmin right now. You'll see why later, but trust us.

#. Click/open the :guilabel:`Databases` tree and have a look at the available databases.

#. Right-click the :guilabel:`Databases` item and select :guilabel:`New Database`.

   .. figure:: img/pgadmin_newdb.png

      Creating a new database

#. Fill in the **New Database** form as shown below and click :guilabel:`OK`.  

   Properties tab:

   .. list-table::

      * - **Name**
        - ``SuiteWorkshop``
      * - **Owner**
        - ``postgres``
 
   Definition tab:

   .. list-table::

      * - **Encoding**
        - ``UTF8``
      * - **Template**
        - ``template_postgis``

   .. figure:: img/pgadmin_newdbvalues1.png

      New database parameters (Properties tab)

   .. figure:: img/pgadmin_newdbvalues2.png

      New database parameters (Definition tab)


   .. note:: If you receive an error indicating that the source database (``template_postgis``) is being accessed by other users, this is because you may have accidentally clicked on the ``template_postgis`` database, which marks it as being "accessed".  To remedy this:
   
      * Click the database ``postgres`` in the tree to select it.
      * Right-click on the ``PostGIS (localhost:54321)`` item and select :guilabel:`Disconnect`.
      * Double-click ``PostGIS (localhost:54321)`` to reconnect and connect again.

#. Click the new ``SuiteWorkshop`` database and open it up to display the tree of objects. You'll see the ``public`` schema, a node called ``Tables``, and under that a PostGIS-specific metadata tables called ``spatial_ref_sys``. In the ``Views`` node, you'll see two views: ``geometry_columns`` and ``geography_columms``. We'll be working with the former as part of this workshop.

   .. figure:: img/pgadmin_dbobjects.png

      New database tables in pgAdmin
