.. _joins_exercise_answers:

Spatial Joins Exercises with Answers
====================================

Exercises with Answers
----------------------

* **"What subway station is in 'Little Italy'? What subway route is it on?"**

  .. code-block:: sql

    SELECT s.name, s.routes
    FROM nyc_subway_stations AS s
    JOIN nyc_neighborhoods AS n
    ON ST_Contains(n.geom, s.geom)
    WHERE n.name = 'Little Italy';

  .. note:: Recall: the function ``AS`` is used to give a table another name by using an alias, which can make queries easier to read and write. In this case, ``s`` is an alias for ``nyc_subway_stations``, ``n`` is an alias for ``nyc_neighborhoods``, ``s.name`` refers to the name column in the ``nyc_subway_stations`` table, etc.

  ::

      name    | routes
   -----------+--------
    Spring St | 6

* **"What are all the neighborhoods served by the 6-train?"** (Hint: The ``routes`` column in the ``nyc_subway_stations`` table has values like 'B,D,6,V' and 'C,6')

  .. code-block:: sql

    SELECT DISTINCT n.name, n.boroname
    FROM nyc_subway_stations AS s
    JOIN nyc_neighborhoods AS n
    ON ST_Contains(n.geom, s.geom)
    WHERE strpos(s.routes,'6') > 0;

  ::

            name        | boroname
    --------------------+-----------
     Midtown            | Manhattan
     Hunts Point        | The Bronx
     Gramercy           | Manhattan
     Little Italy       | Manhattan
     Financial District | Manhattan
     South Bronx        | The Bronx
     Yorkville          | Manhattan
     Murray Hill        | Manhattan
     Mott Haven         | The Bronx
     Upper East Side    | Manhattan
     Chinatown          | Manhattan
     East Harlem        | Manhattan
     Greenwich Village  | Manhattan
     Parkchester        | The Bronx
     Soundview          | The Bronx

  .. note::

    We used the ``DISTINCT`` keyword to remove duplicate values from our result set where there were more than one subway station in a neighborhood.

* **"After 9/11, the 'Battery Park' neighborhood was off limits for several days. How many people had to be evacuated?"**

  .. code-block:: sql

    SELECT Sum(popn_total)
    FROM nyc_neighborhoods AS n
    JOIN nyc_census_blocks AS c
    ON ST_Intersects(n.geom, c.geom)
    WHERE n.name = 'Battery Park';

  ::

    17153

* **"What are the population density (people / km^2) of the 'Upper West Side' and 'Upper East Side'?"** (Hint: There are 1000000 m^2 in one km^2.)

  .. code-block:: sql

    SELECT
      n.name,
      Sum(c.popn_total) / (ST_Area(n.geom) / 1000000.0) AS popn_per_sqkm
    FROM nyc_census_blocks AS c
    JOIN nyc_neighborhoods AS n
    ON ST_Intersects(c.geom, n.geom)
    WHERE n.name = 'Upper West Side'
    OR n.name = 'Upper East Side'
    GROUP BY n.name, n.geom;

  ::

          name       |  popn_per_sqkm
    -----------------+------------------
     Upper East Side | 48524.4877489857
     Upper West Side | 40152.4896080024
