.. _simple_sql_exercises:

Section 7: Simple SQL Exercises
===============================

Using the ``nyc_census_blocks`` table, answer the following questions (don't peak at the answers!). 

Here is some helpful information to get started.  Recall from the :ref:`About Our Data <about_data>` section our ``nyc_census_blocks`` table definition.

.. list-table::
   :widths: 20 80

  * - **blkid**
    - A 15-digit code that uniquely identifies every census **block**. Eg: 360050001009000
  * - **popn_total**
    - Total number of people in the census block
  * - **popn_white**
    - Number of people self-identifying as "white" in the block
  * - **popn_black**
    - Number of people self-identifying as "black" in the block
  * - **popn_nativ**
    - Number of people self-identifying as "native american" in the block
  * - **popn_asian**
    - Number of people self-identifying as "asias" in the block
  * - **popn_other**
    - Number of people self-identifying with other categories in the block
  * - **hous_total**
    - Number of housing units in the block
  * - **hous_own**
    - Number of owner-occupied housing units in the block
  * - **hous_rent**
    - Number of renter-occupied housing units in the block
  * - **boroname**
    - Name of the New York borough. Manhattan, The Bronx, Brooklyn, Staten Island, Queens
  * - **geom**
    - Polygon boundary of the block

And, here are some common SQL aggregation functions you might find useful:

* avg() - the average (mean) of the values in a set of records
* sum() - the sum of the values in a set of records
* count() - the number of records in a set of records

Now the questions:

* **"What is the population of the City of New York?"**
 
  .. code-block:: sql
   
    SELECT Sum(popn_total) AS population
      FROM nyc_census_blocks;
     
  :: 
   
    8008278 
   
  .. note:: 
   
    What is this ``AS``? You can give a table or a column another name by using an alias.  Aliases can make queries easier to both write and to read. So instead of our outputted column name as ``sum`` we write it **AS** the more readable ``population``. 
       
* **"What is the population of the Bronx?"**

  .. code-block:: sql
 
    SELECT Sum(popn_total) AS population
      FROM nyc_census_blocks
      WHERE boroname = 'The Bronx';
     
  :: 
   
    1332650 
  
* **"What is the average number of people living in each housing unit in New York City?"**
 
  .. code-block:: sql

    SELECT Sum(popn_total)/Sum(hous_total) AS popn_per_house
      FROM nyc_census_blocks;

  :: 
   
    2.6503540522400804 
   
* **"For each borough, what percentage of the population is white?"**

  .. code-block:: sql

    SELECT 
      boroname, 
      100 * Sum(popn_white)/Sum(popn_total) AS white_pct
    FROM nyc_census_blocks
    GROUP BY boroname;

  :: 
   
       boroname    |      white_pct      
    ---------------+---------------------
     Brooklyn      | 41.2005552206888663
     The Bronx     | 29.8655310846808990
     Manhattan     | 54.3594013771837665
     Queens        | 44.0806610271290794
     Staten Island | 77.5968611401579346
 
Function List
-------------

`avg(expression) <http://www.postgresql.org/docs/current/static/functions-aggregate.html#FUNCTIONS-AGGREGATE-TABLE>`_: PostgreSQL aggregate function that returns the average value of a numeric column.

`count(expression) <http://www.postgresql.org/docs/current/static/functions-aggregate.html#FUNCTIONS-AGGREGATE-TABLE>`_: PostgreSQL aggregate function that returns the number of records in a set of records.

`sum(expression) <http://www.postgresql.org/docs/current/static/functions-aggregate.html#FUNCTIONS-AGGREGATE-TABLE>`_: PostgreSQL aggregate function that returns the sum of records in a set of records.
