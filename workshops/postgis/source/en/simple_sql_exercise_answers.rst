.. _simple_sql_exercise_answers:

Simple SQL Exercise Answers
===========================

Now the questions with answers:

* **"What is the population of the City of New York?"**

  .. code-block:: sql

    SELECT Sum(popn_total) AS population
      FROM nyc_census_blocks;

  ::

    8175032

  .. note::

    What is this ``AS``? You can give a table or a column another name by using an alias.  Aliases can make queries easier to both write and to read. So instead of our outputted column name as ``sum`` we write it **AS** the more readable ``population``.

* **"What is the population of the Bronx?"**

  .. code-block:: sql

    SELECT Sum(popn_total) AS population
      FROM nyc_census_blocks
      WHERE boroname = 'The Bronx';

  ::

    1385108

* **"For each borough, what percentage of the population is white?"**

  .. code-block:: sql

    SELECT
      boroname,
      100 * Sum(popn_white)/Sum(popn_total) AS white_pct
    FROM nyc_census_blocks
    GROUP BY boroname;

  ::

       boroname    |    white_pct
    ---------------+------------------
     Brooklyn      | 42.8011737932687
     Manhattan     | 57.4493039480463
     The Bronx     | 27.9037446899448
     Queens        |  39.722077394591
     Staten Island | 72.8942034860154
