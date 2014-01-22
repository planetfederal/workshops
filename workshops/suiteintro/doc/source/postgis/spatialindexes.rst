.. _postgis.spatialindexes:

Spatial indexes 
===============

Recall that spatial indexing is one of the three key features of a spatial database. Indexes are what make using a spatial database for large data sets possible. Without indexing, any search for a feature would require a "sequential scan" of every record in the database. Indexing speeds up searching by organizing the data into a search tree which can be quickly traversed to find a particular record. 

Spatial indexes are one of the greatest assets of PostGIS. Without indexes, joining two tables of 10,000 records each without indexes would require 100,000,000 comparisons; **with indexes**, the cost could be as low as 20,000 comparisons.

When we loaded our tables, pgShapeLoader automatically created a spatial index called ``<layer>_gist``

How spatial Indexes work
------------------------

Standard database indexes create a hierarchical tree based on the values of the column being indexed. Spatial indexes are a little different - they are unable to index the geometric features themselves and instead index the bounding boxes of the features.

.. figure:: img/bbox.png

   Bounding box

In the figure above, the number of lines that intersect the yellow star is **one**, the red line. But the bounding boxes of features that intersect the yellow box is **two**, the red and blue ones. 

The way the database efficiently answers the question "what lines intersect the yellow star" is to first answer the question "what boxes intersect the yellow box" using the index (which is very fast) and then do an exact calculation of "what lines intersect the yellow star" **only for those features returned by the first test**. 

For a large table, this "two pass" system of evaluating the approximate index first, then carrying out an exact test can radically reduce the amount of calculations necessary to answer a query.

Both PostGIS and Oracle Spatial share the same `R-Tree <http://postgis.org/support/rtree.pdf>`_ spatial index structure. R-Trees break up data into rectangles, and sub-rectangles, and sub-sub-rectangles, etc. It is a self-tuning index structure that automatically handles variable data density and object size.

.. figure:: img/rtree.png

   R-Tree hierarchy

Analyzing
---------

The PostgreSQL query planner intelligently chooses when to use or not to use indexes to evaluate a query. Counter-intuitively, it is not always faster to do an index search: if the search is going to return every record in the table, traversing the index tree to get each record will actually be slower than just linearly reading the whole table from the start.

In order to figure out what situation it is dealing with (reading a small part of the table versus reading a large portion of the table), PostgreSQL keeps statistics about the distribution of data in each indexed table column. By default, PostgreSQL gathers statistics on a regular basis. However, if you dramatically change the make-up of your table within a short period of time, the statistics will not be up-to-date.

To ensure your statistics match your table contents, it is wise the to run the ``ANALYZE`` command after bulk data loads and deletes in your tables. This force the statistics system to gather data for all your indexed columns.

The ``ANALYZE`` command asks PostgreSQL to traverse the table and update its internal statistics used for query plan estimation (query plan analysis will be discussed later). 

.. code-block:: sql

   ANALYZE cities;
   
Vacuuming
---------

It's worth stressing that just creating an index is not enough to allow PostgreSQL to use it effectively.  VACUUMing must be performed whenever a new index is created or after a large number of UPDATEs, INSERTs or DELETEs are issued against a table. The ``VACUUM`` command asks PostgreSQL to reclaim any unused space in the table pages left by updates or deletes to records. 

Vacuuming is so critical for the efficient running of the database that PostgreSQL provides an "auto-vacuum" option.

Enabled by default, running the auto-vacuum command both vacuums (recovers space) and analyzes (updates statistics) on your tables at sensible intervals determined by the level of activity. While this is essential for highly transactional databases, it is not advisable to wait for an auto-vacuum run after adding indexes or bulk-loading data. If a large batch update is performed, you should manually run ``VACUUM``.

Vacuuming and analyzing the database can be performed separately as needed. Issuing ``VACUUM`` command will not update the database statistics; likewise issuing an ``ANALYZE`` command will not recover unused table rows. Both commands can be run against the entire database, a single table, or a single column.

.. code-block:: sql

   VACUUM ANALYZE cities;
