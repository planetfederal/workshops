.. _history_tracking:

Section 27: Tracking Edit History using Triggers
================================================

A common requirement for production databases is the ability to track history: how has the data changed between two dates, who made the changes, and where did they occur? Some GIS systems track changes by including change management in the client interface, but that adds a lot of complexity to editing tools.

Using the database and the trigger system, it's possible to add history tracking to any table, while maintaining simple "direct edit" access to the primary table.

History tracking works by keeping a history table that records, for every edit:

  * If a record was created, when it was added and by whom.
  * If a record was deleted, when it was deleted and by whom.
  * If a record was updated, adding a deletion record (for the old state) and a creation record (for the new state).

Building the History Table
~~~~~~~~~~~~~~~~~~~~~~~~~~

Using this information it is possible to reconstruct the state of the edit table at any point in time. In this example, we will add history tracking to our **nyc_streets** table.

  * First, add a new **nyc_streets_history** table. This is the table we will use to store all the historical edit information. In addition to all the fields from **nyc_streets**, we add five more fields.

    * **hid** the primary key for the history table
    * **created** the date/time the history record was created
    * **created_by** the database user that caused the record to be created
    * **deleted** the date/time the history record was marked as deleted
    * **deleted_by** the database user that caused the record to be marked as deleted

    Note that we don't actually delete any records in the history table, we just mark the time they ceased to be part of the current state of the edit table.

    .. code-block:: sql

      CREATE TABLE nyc_streets_history (
        hid SERIAL PRIMARY KEY,
        gid INTEGER,
        id FLOAT8,
        name VARCHAR(200),
        oneway VARCHAR(10),
        type VARCHAR(50),
        geom GEOMETRY,
        created TIMESTAMP,
        created_by VARCHAR(32),
        deleted TIMESTAMP,
        deleted_by VARCHAR(32)
    	);

  * Next, we import the current state of the active table, **nyc_streets** into the history table, so we have a starting point to trace history from. Note that we fill in the creation time and creation user, but leave the deletion records NULL.

    .. code-block:: sql

      INSERT INTO nyc_streets_history 
  	    (gid, id, name, oneway, type, geom, created, created_by)
  	    SELECT gid, id, name, oneway, type, geom, now(), current_user
  	      FROM nyc_streets;
	
  * Now we need three triggers on the active table, for INSERT, DELETE and UPDATE actions. First we create the trigger functions, then bind them to the table as triggers.
  
    For an insert, we just add a new record into the history table with the creation time/user.

    .. code-block:: sql

      CREATE OR REPLACE FUNCTION nyc_streets_insert() RETURNS trigger AS 
      $$
        BEGIN
          INSERT INTO nyc_streets_history 
            (gid, id, name, oneway, type, geom, created, created_by)
          VALUES
            (NEW.gid, NEW.id, NEW.name, NEW.oneway, NEW.type, NEW.geom,
             current_timestamp, current_user);
          RETURN NEW;
        END;
      $$ 
      LANGUAGE plpgsql;
      
      CREATE TRIGGER nyc_streets_insert_trigger
      AFTER INSERT ON nyc_streets
          FOR EACH ROW EXECUTE PROCEDURE nyc_streets_insert();
      

    For a deletion, we just mark the currently active history record (the one with a NULL deletion time) as deleted.

    .. code-block:: sql

      CREATE OR REPLACE FUNCTION nyc_streets_delete() RETURNS trigger AS 
      $$
        BEGIN
          UPDATE nyc_streets_history 
            SET deleted = current_timestamp, deleted_by = current_user
            WHERE deleted IS NULL and gid = OLD.gid;
          RETURN NULL;
        END;
      $$ 
      LANGUAGE plpgsql;
      
      CREATE TRIGGER nyc_streets_delete_trigger
      AFTER DELETE ON nyc_streets
          FOR EACH ROW EXECUTE PROCEDURE nyc_streets_delete();
      

    For an update, we first mark the active history record as deleted, then insert a new record for the updated state.

    .. code-block:: sql

      CREATE OR REPLACE FUNCTION nyc_streets_update() RETURNS trigger AS 
      $$
        BEGIN

          UPDATE nyc_streets_history 
            SET deleted = current_timestamp, deleted_by = current_user
            WHERE deleted IS NULL and gid = OLD.gid;

          INSERT INTO nyc_streets_history 
            (gid, id, name, oneway, type, geom, created, created_by)
          VALUES
            (NEW.gid, NEW.id, NEW.name, NEW.oneway, NEW.type, NEW.geom,
             current_timestamp, current_user);

          RETURN NEW;

        END;
      $$ 
      LANGUAGE plpgsql; 

      CREATE TRIGGER nyc_streets_update_trigger
      AFTER UPDATE ON nyc_streets
          FOR EACH ROW EXECUTE PROCEDURE nyc_streets_update();

  * Now we can test the system by doing some edits to the **nyc_streets** table and watching the history table. Note how each edit results in new time- and user-stamped records in the **nyc_streets_history** table.


Querying the History Table
~~~~~~~~~~~~~~~~~~~~~~~~~~

Now that we have a history table, what use is it? It's useful for time travel! Since presumably all your test edits have happened in the past hour, let's create a view of the history table that shows the state of the table one hour ago, before you started editing.

.. code-block:: sql

  -- State of history one hour ago
  -- Records must have been created at least an hour ago and
  -- either be visible now (deleted is null) or deleted in the last hour
  CREATE OR REPLACE VIEW nyc_streets_one_hour_ago AS
    SELECT * FROM nyc_streets_history
      WHERE created < (now() - '1hr'::interval)
      AND ( deleted IS NULL OR deleted > (now() - '1min'::interval) );

  -- Add the view to geometry_columns so applications can see it
  INSERT INTO geometry_columns VALUES
    ('', 'public','nyc_streets_one_hour_ago','geom',2,26918,'MULTILINESTRING');
    

We can also create views that show just what a particular used has added, for example:

.. code-block:: sql

  CREATE OR REPLACE VIEW nyc_streets_postgres AS
    SELECT * FROM nyc_streets_history
      WHERE created_by = 'postgres';

  INSERT INTO geometry_columns VALUES
    ('', 'public','nyc_streets_postgres','geom',2,26918,'MULTILINESTRING');



See Also
--------

 * `PostgreSQL Triggers <http://www.postgresql.org/docs/current/static/plpgsql-trigger.html>`_

