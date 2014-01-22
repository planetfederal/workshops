.. _postgis.createdb:

Creating a PostGIS Database
===========================

Now with some spatial database concepts under our belts, we'll use the GUI client **pgAdmin** to connect to the PostGIS server and create a spatially-enabled database.

.. note:: PostgreSQL has a number of administrative front-ends. `psql <http://www.postgresql.org/docs/9.3/static/app-psql.html>`_ is a command-line tool for managing PostgreSQL databases and entering SQL queries. The desktop utility `pgAdmin <http://www.pgadmin.org/>`_ is a tool that provides similar functionality with a graphical front-end. In this workshop, we're going to use pgAdmin, but all of the queries that can be done in pgAdmin can also be done on the command line with :command:`psql`.

Start PostGIS and connect to pgAdmin
------------------------------------

#. Make sure that OpenGeo Suite is running, specifically the PostGIS service.

#. Launch pgAdmin from the Start Menu (:menuselection:`OpenGeo Suite --> pgAdmin`).
      
#. You should have a server entry for **PostGIS (localhost:5432)** already configured in pgAdmin. Double-click the entry, and when prompted for a password, leave it blank.  This will connect to the local PostGIS instance.

   .. figure:: img/pgadmin_connect.png

      Connecting to PostGIS

.. note:: For this workshop, the PostGIS database has been installed with unrestricted access for local users (users connecting from the same machine on which the database is running). That means that it will accept **any** password you provide. If you need to connect from a remote computer, the password for the ``postgres`` user has been set to ``postgres``.  Obviously, a production instance would be set up with more security in mind.

.. note::  If you have a previous installation of pgAdmin on your computer, you may not have an entry for the local PostGIS instance, so you will need to create a new connection. Go to :menuselection:`File --> Add Server` and register a new server at **localhost** and port **5432**.  You will then be able to connect to the PostGIS instance that is bundled with OpenGeo Suite.

Create a database
-----------------

Next we will create a database that will be used to hold spatial data.

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

   .. figure:: img/pgadmin_newdbvalues1.png

      New database parameters (Properties tab)

   .. figure:: img/pgadmin_newdbvalues2.png

      New database parameters (Definition tab)

#. Click the new ``SuiteWorkshop`` database and open it up to display the tree of objects. You'll see in the :guilabel:`Schemas` a ``public`` schema, but no tables or functions.

The database has been created, but it has not been spatially enabled yet. That is the next step.

#. Click the ``SuiteWorkshop`` database to select it.

#. Click the :guilabel:`SQL query` button in the toolbar.

   .. figure:: img/pgadmin_querybutton.png

      SQL query button

#. The SQL query window will open. In the :guilabel:`SQL Editor` tab at the top of the window, type the following:

   .. code-block:: sql

     CREATE EXTENSION postgis;

#. Execute the query by pressing ``F5``, clicking the "Play" button, or by navigating to :menuselection:`Query --> Execute`.

   .. figure:: img/pgadmin_createextension.png

      Spatially enabling a PostgreSQL database

#. Now examine the database tree again. You'll see a PostGIS-specific table called ``spatial_ref_sys``. In the ``Views`` node, you'll see four different views, one of which, ``geometry_columns``, we'll be working with as part of this workshop.

   .. figure:: img/pgadmin_dbobjects.png

      New database tables in pgAdmin
