.. _geoserver.googleearth.filter:

Filtering layers
================

Often a layer contains too much information and it is desirable to filter what is displayed.  In this section we will filter a KML stream coming from GeoServer using CQL.

The ``cql_filter`` parameter is a way to specify a predicate based on attribute values or spatial orientation.  Let's single out the 7 train.

#. Edit the Network Link and append the parameter ``&cql_filter=POP_MIN > '2000000'``.  Click :guilabel:`OK` when done.

   .. figure:: img/filter_pop.png
      :align: center

      *Filtering placemarks based on attributes*

You will see that only the cities that have populations greater than two million are displayed.

Bonus
~~~~~

In CQL you can also match strings using the "LIKE" operator.

* Create a filter that displays only New York.  (Hint: Use the "NAME" attribute.)

When using LIKE in CQL, you have ability to add the "%" as a wildcard to the request.

* Use a CQL filter to display all of the cities that start with an "S".  