.. _joins:

Section 12: Spatial Joins
=========================

Spatial joins are the bread-and-butter of spatial databases.  They allow you to combine information from different tables by using spatial relationships as the join key.  Much of what we think of as "standard GIS analysis" can be expressed as spatial joins.

In the previous section, we explored spatial relationships using a two-step process: first we extracted a subway station point for 'Broad St'; then, we used that point to ask further questions such as "what neighborhood is the 'Broad St' station in?"

Using a spatial join, we can answer the question in one step, retrieving information about the subway station and the neighborhood that contains it:

.. code-block:: sql

  SELECT 
    subways.name AS subway_name, 
    neighborhoods.name AS neighborhood_name, 
    neighborhoods.boroname AS borough
  FROM nyc_neighborhoods AS neighborhoods
  JOIN nyc_subway_stations AS subways
  ON ST_Contains(neighborhoods.geom, subways.geom)
  WHERE subways.name = 'Broad St';

:: 

   subway_name | neighborhood_name  |  borough  
  -------------+--------------------+-----------
   Broad St    | Financial District | Manhattan

We could have joined every subway station to its containing neighborhood, but in this case we wanted information about just one.  Any function that provides a true/false relationship between two tables can be used to drive a spatial join, but the most commonly used ones are: :command:`ST_Intersects`, :command:`ST_Contains`, and :command:`ST_DWithin`.

Join and Summarize
------------------

The combination of a ``JOIN`` with a ``GROUP BY`` provides the kind of analysis that is usually done in a GIS system.

For example: **"What is the population and racial make-up of the neighborhoods of Manhattan?"** Here we have a question that combines information from about population from the census with the boundaries of neighborhoods, with a restriction to just one borough of Manhattan.

.. code-block:: sql

  SELECT 
    neighborhoods.name AS neighborhood_name, 
    Sum(census.popn_total) AS population,
    Round(100.0 * Sum(census.popn_white) / Sum(census.popn_total),1) AS white_pct,
    Round(100.0 * Sum(census.popn_black) / Sum(census.popn_total),1) AS black_pct
  FROM nyc_neighborhoods AS neighborhoods
  JOIN nyc_census_blocks AS census
  ON ST_Intersects(neighborhoods.geom, census.geom)
  WHERE neighborhoods.boroname = 'Manhattan'
  GROUP BY neighborhoods.name
  ORDER BY white_pct DESC;

::

   neighborhood_name  | population | white_pct | black_pct 
 ---------------------+------------+-----------+-----------
  Carnegie Hill       |      19909 |      91.6 |       1.5
  North Sutton Area   |      21413 |      90.3 |       1.2
  West Village        |      27141 |      88.1 |       2.7
  Upper East Side     |     201301 |      87.8 |       2.5
  Greenwich Village   |      57047 |      84.1 |       3.3
  Soho                |      15371 |      84.1 |       3.3
  Murray Hill         |      27669 |      79.2 |       2.3
  Gramercy            |      97264 |      77.8 |       5.6
  Central Park        |      49284 |      77.8 |      10.4
  Tribeca             |      13601 |      77.2 |       5.5
  Midtown             |      70412 |      75.9 |       5.1
  Chelsea             |      51773 |      74.7 |       7.4
  Battery Park        |       9928 |      74.1 |       4.9
  Upper West Side     |     212499 |      73.3 |      10.4
  Financial District  |      17279 |      71.3 |       5.3
  Clinton             |      26347 |      64.6 |      10.3
  East Village        |      77448 |      61.4 |       9.7
  Garment District    |       6900 |      51.1 |       8.6
  Morningside Heights |      41499 |      50.2 |      24.8
  Little Italy        |      14178 |      39.4 |       1.2
  Yorkville           |      57800 |      31.2 |      33.3
  Inwood              |      50922 |      29.3 |      14.9
  Lower East Side     |     104690 |      28.3 |       9.0
  Washington Heights  |     187198 |      26.9 |      16.3
  East Harlem         |      62279 |      20.2 |      46.2
  Hamilton Heights    |      71133 |      14.6 |      41.1
  Chinatown           |      18195 |      10.3 |       4.2
  Harlem              |     125501 |       5.7 |      80.5


What's going on here? Notionally (the actual evaluation order is optimized under the covers by the database) this is what happens:

#. The ``JOIN`` clause creates a virtual table that includes columns from both the neighborhoods and census tables. 
#. The ``WHERE`` clause filters our virtual table to just rows in Manhattan. 
#. The remaining rows are grouped by the neighborhood name and fed through the aggregation function to :command:`Sum()` the population values.
#. After a little arithmetic and formatting (e.g., ``GROUP BY``, ``ORDER BY``) on the final numbers, our query spits out the percentages.

.. note:: 

   The ``JOIN`` clause combines two ``FROM`` items.  By default, we are using an ``INNER JOIN``, but there are four other types of joins. For further information see the `join_type <http://www.postgresql.org/docs/8.1/interactive/sql-select.html>`_ definition in the PostgreSQL documentation.

We can also use distance tests as a join key, to create summarized "all items within a radius" queries. Let's explore the racial geography of New York using distance queries.

First, let's get the baseline racial make-up of the city.

.. code-block:: sql

  SELECT 
    100.0 * Sum(popn_white) / Sum(popn_total) AS white_pct, 
    100.0 * Sum(popn_black) / Sum(popn_total) AS black_pct, 
    Sum(popn_total) AS popn_total
  FROM nyc_census_blocks;

:: 

        white_pct      |      black_pct      | popn_total 
  ---------------------+---------------------+------------
   44.6586020115685295 | 26.5945063345703034 |    8008278


So, of the 8M people in New York, about 44% are "white" and 26% are "black". 

Duke Ellington once sang that "You / must take the A-train / To / go to Sugar Hill way up in Harlem." As we saw earlier, Harlem has far and away the highest African-American population in Manhattan (80.5%). Is the same true of Duke's A-train?

First, note that the contents of the ``nyc_subway_stations`` table ``routes`` field is what we are interested in to find the A-train. The values in there are a little complex.

.. code-block:: sql

  SELECT DISTINCT routes FROM nyc_subway_stations;
  
:: 

 A,C,G
 4,5
 D,F,N,Q
 5
 E,F
 E,J,Z
 R,W

.. note::

   The ``DISTINCT`` keyword eliminates duplicate rows from the result.  Without the ``DISTINCT`` keyword, the query above identifies 491 results instead of 73.
   
So to find the A-train, we will want any row in ``routes`` that has an 'A' in it. We can do this a number of ways, but today we will use the fact that :command:`strpos(routes,'A')` will return a non-zero number if 'A' is in the routes field.

.. code-block:: sql

   SELECT DISTINCT routes 
   FROM nyc_subway_stations AS subways 
   WHERE strpos(subways.routes,'A') > 0;
   
::

  A,B,C
  A,C
  A
  A,C,G
  A,C,E,L
  A,S
  A,C,F
  A,B,C,D
  A,C,E
  
Let's summarize the racial make-up of within 200 meters of the A-train line.

.. code-block:: sql

  SELECT 
    100.0 * Sum(popn_white) / Sum(popn_total) AS white_pct, 
    100.0 * Sum(popn_black) / Sum(popn_total) AS black_pct, 
    Sum(popn_total) AS popn_total
  FROM nyc_census_blocks AS census
  JOIN nyc_subway_stations AS subways
  ON ST_DWithin(census.geom, subways.geom, 200)
  WHERE strpos(subways.routes,'A') > 0;

::

        white_pct      |      black_pct      | popn_total 
  ---------------------+---------------------+------------
   42.0805466940877366 | 23.0936148851067964 |     185259

So the racial make-up along the A-train isn't radically different from the make-up of New York City as a whole. 

Advanced Join
-------------

In the last section we saw that the A-train didn't serve a population that differed much from the racial make-up of the rest of the city. Are there any trains that have a non-average racial make-up?

To answer that question, we'll add another join to our query, so that we can simultaneously calculate the make-up of many subway lines at once. To do that, we'll need to create a new table that enumerates all the lines we want to summarize.

.. code-block:: sql

    CREATE TABLE subway_lines ( route char(1) );
    INSERT INTO subway_lines (route) VALUES 
      ('A'),('B'),('C'),('D'),('E'),('F'),('G'),
      ('J'),('L'),('M'),('N'),('Q'),('R'),('S'),
      ('Z'),('1'),('2'),('3'),('4'),('5'),('6'),
      ('7');

Now we can join the table of subway lines onto our original query.

.. code-block:: sql

    SELECT 
      lines.route,
      Round(100.0 * Sum(popn_white) / Sum(popn_total), 1) AS white_pct, 
      Round(100.0 * Sum(popn_black) / Sum(popn_total), 1) AS black_pct, 
      Sum(popn_total) AS popn_total
    FROM nyc_census_blocks AS census
    JOIN nyc_subway_stations AS subways
    ON ST_DWithin(census.geom, subways.geom, 200)
    JOIN subway_lines AS lines
    ON strpos(subways.routes, lines.route) > 0
    GROUP BY lines.route
    ORDER BY black_pct DESC;

::

     route | white_pct | black_pct | popn_total 
    -------+-----------+-----------+------------
     S     |      30.1 |      59.5 |      32730
     3     |      34.3 |      51.8 |     201888
     2     |      33.6 |      45.5 |     535414
     5     |      32.1 |      45.1 |     407324
     C     |      41.3 |      35.9 |     430194
     4     |      34.7 |      30.9 |     328292
     B     |      36.1 |      30.6 |     261186
     Q     |      52.9 |      26.3 |     259820
     J     |      29.5 |      23.6 |     126764
     A     |      42.1 |      23.1 |     370518
     Z     |      29.5 |      21.5 |      81493
     D     |      39.8 |      20.9 |     233855
     G     |      44.8 |      20.0 |     138602
     L     |      53.9 |      17.1 |     104140
     6     |      52.7 |      16.3 |     257769
     1     |      54.8 |      12.6 |     659028
     F     |      60.0 |       8.6 |     438212
     M     |      50.0 |       7.8 |     166721
     E     |      69.4 |       5.3 |      86118
     R     |      57.7 |       4.8 |     389124
     7     |      42.4 |       3.8 |     107543


As before, the joins create a virtual table of all the possible combinations available within the constraints of the ``JOIN ON`` restrictions, and those rows are then fed into a ``GROUP`` summary. The spatial magic is in the ``ST_DWithin`` function, that ensures only census blocks close to the appropriate subway stations are included in the calculation.

Function List
-------------

`ST_Contains(geometry A, geometry B) <http://postgis.org/docs/ST_Contains.html>`_: Returns true if and only if no points of B lie in the exterior of A, and at least one point of the interior of B lies in the interior of A.

`ST_DWithin(geometry A, geometry B, radius) <http://postgis.org/docs/ST_DWithin.html>`_: Returns true if the geometries are within the specified distance of one another. 

`ST_Intersects(geometry A, geometry B) <http://postgis.org/docs/ST_Intersects.html>`_: Returns TRUE if the Geometries/Geography "spatially intersect" - (share any portion of space) and FALSE if they don't (they are Disjoint). 

`round(v numeric, s integer) <http://www.postgresql.org/docs/current/interactive/functions-math.html>`_: PostgreSQL math function that rounds to s decimal places

`strpos(string, substring) <http://www.postgresql.org/docs/current/static/functions-string.html>`_: PostgreSQL string function that returns an integer location of a specified substring.

`sum(expression) <http://www.postgresql.org/docs/current/static/functions-aggregate.html#FUNCTIONS-AGGREGATE-TABLE>`_: PostgreSQL aggregate function that returns the sum of records in a set of records.

.. rubric:: Footnotes

.. [#PostGIS_Doco] http://postgis.org/documentation/manual-1.5/

