.. _geometries_exercise_answers:

Geometry Exercise Answers
=========================


Exercises with answers
----------------------

* **"What is the area of the 'West Village' neighborhood?"**

  .. code-block:: sql

    SELECT ST_Area(geom)
      FROM nyc_neighborhoods
      WHERE name = 'West Village';

  ::

    1044614.5296486

  .. note::

    The area is given in square meters. To get an area in hectares, divide by 10000. To get an area in acres, divide by 4047.

* **"What is the area of Manhattan in acres?"** (Hint: both ``nyc_census_blocks`` and ``nyc_neighborhoods`` have a ``boroname`` in them.)

  .. code-block:: sql

    SELECT Sum(ST_Area(geom)) / 4047
      FROM nyc_neighborhoods
      WHERE boroname = 'Manhattan';

  ::

    13965.3201224118

  or...

  .. code-block:: sql

    SELECT Sum(ST_Area(geom)) / 4047
      FROM nyc_census_blocks
      WHERE boroname = 'Manhattan';

  ::

    14601.3987215548


* **"How many census blocks in New York City have a hole in them?"**

  .. code-block:: sql

    SELECT Count(*)
      FROM nyc_census_blocks
      WHERE ST_NumInteriorRings(ST_GeometryN(geom,1)) > 0;

  .. note::

    The ST_NRings() functions might be tempting, but it also counts the exterior rings of multi-polygons as well as interior rings.  In order to run ST_NumInteriorRings() we need to convert the MultiPolygon geometries of the blocks into simple polygons, so we extract the first polygon from each collection using ST_GeometryN(). Yuck!

  ::

    43

* **"What is the total length of streets (in kilometers) in New York City?"** (Hint: The units of measurement of the spatial data are meters, there are 1000 meters in a kilometer.)

  .. code-block:: sql

    SELECT Sum(ST_Length(geom)) / 1000
      FROM nyc_streets;

  ::

    10418.9047172

* **"How long is 'Columbus Cir' (Columbus Circle)?**

  .. code-block:: sql

    SELECT ST_Length(geom)
      FROM nyc_streets
      WHERE name = 'Columbus Cir';

  ::

    308.34199

* **"What is the JSON representation of the boundary of the 'West Village'?"**

  .. code-block:: sql

    SELECT ST_AsGeoJSON(geom)
      FROM nyc_neighborhoods
      WHERE name = 'West Village';

  ::

    {"type":"MultiPolygon","coordinates":
     [[[[583263.2776595836,4509242.6260239873],
        [583276.81990686338,4509378.825446927], ...
        [583263.2776595836,4509242.6260239873]]]]}

  The geometry type is "MultiPolygon", interesting!

* **"How many polygons are in the 'West Village' multipolygon?"**

  .. code-block:: sql

    SELECT ST_NumGeometries(geom)
      FROM nyc_neighborhoods
      WHERE name = 'West Village';

  ::

    1

  .. note::

    It is not uncommon to find single-element MultiPolygons in spatial tables. Using MultiPolygons allows a table with only one geometry type to store both single- and multi-geometries without using mixed types.


* **"What is the length of streets in New York City, summarized by type?"**

  .. code-block:: sql

    SELECT type, Sum(ST_Length(geom)) AS length
    FROM nyc_streets
    GROUP BY type
    ORDER BY length DESC;

  ::

                           type                       |      length
    --------------------------------------------------+------------------
     residential                                      | 8629870.33786606
     motorway                                         | 403622.478126363
     tertiary                                         | 360394.879051303
     motorway_link                                    | 294261.419479668
     secondary                                        | 276264.303897926
     unclassified                                     | 166936.371604458
     primary                                          | 135034.233017947
     footway                                          | 71798.4878378096
     service                                          |  28337.635038596
     trunk                                            | 20353.5819826076
     cycleway                                         | 8863.75144825929
     pedestrian                                       | 4867.05032825026
     construction                                     | 4803.08162103562
     residential; motorway_link                       | 3661.57506293745
     trunk_link                                       | 3202.18981240201
     primary_link                                     | 2492.57457083536
     living_street                                    | 1894.63905457332
     primary; residential; motorway_link; residential | 1367.76576941335
     undefined                                        |  380.53861910346
     steps                                            | 282.745221342127
     motorway_link; residential                       |  215.07778911517


  .. note::

    The ``ORDER BY length DESC`` clause sorts the result by length in descending order. The result is that most prevalent types are first in the list.
