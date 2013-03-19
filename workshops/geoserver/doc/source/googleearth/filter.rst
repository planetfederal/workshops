.. _geoserver.googleearth.filter:

Filtering layers
================

Often a layer contains too much information and it is desirable to filter what is displayed. In this section we will filter a KML stream coming from GeoServer using CQL.

The ``cql_filter`` parameter is a way to specify a predicate based on attribute values or spatial orientation. Let's single out only countries that have populations of one hundred million or more.

#. Edit the Network Link as in the previous section. Append the parameter ``&cql_filter=POP_EST > '100000000'``. Click :guilabel:`OK` when done.

   .. figure:: img/filter_pop.png

      Filtering placemarks based on attributes

You will see that only the countries that have populations greater than one hundred million are displayed. In the case of South America, only Brazil's feature is shown. All other country features are not part of the layer

Bonus
~~~~~

In CQL you can also match strings using the "LIKE" operator.

* Create a filter that displays only your favorite country. (Hint: Use the "NAME" attribute.)

When using LIKE in CQL, you have ability to add the "%" as a wildcard to the request.

* Use a CQL filter to display all of the countries that start with an "S". 