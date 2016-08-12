Beyond GeoServer Basics workshop
================================

The following instructions will show how to prepare a fresh Boundless Suite installation for the Beyond GeoServer Basics workshop.

1. Install Boundless Suite.

2. Create a PostGIS database called "earth":

   createdb -U postgres earth
   psql -U postgres -d earth -c "create extension postgis"

3. Load all shapefiles in the data/earth/ directory into PostGIS using shp2pgsql/psql:

   for f in *shp; do shp2pgsql -g geom -s 4326 ${f/.shp/} $f | psql -U postgres earth

4. Create a workspace in GeoServer called "earth". For the URI, you must use "http://earth".

5. Create a PostGIS store in GeoServer in the earth workspace called "earth" . Point it at the PostGIS database of the same same.

6. Load each table from the PostGIS store into GeoServer as a layer using the same names as the tables.

7. Upload each SLD file in the styles/earth/ directory as a new style in GeoServer and associate each with its namesake layer. The first letter of the style names should be capitalized. (Copy the associated oceantile.png to the GeoServer styles directory so that the ocean layer will display properly.)

8. Load shadedrelief.tif as a GeoTIFF datastore and layer (again in the "earth" workspace).

9. Create a layer group called "earthmap" that contains each of the layers loaded. Suggested order: shadedrelief, ocean, cities, countries. This should NOT be in workspace "earth". (If there exists a layer group called "earth" already, replace it with this one.)

10. Create a PostGIS database called "advanced":

    createdb -U postgres advanced
    psql -U postgres -d advanced -c "create extension postgis"

11. Load all shapefiles in the data/advanced/ directory into PostGIS using shp2pgsql/psql:

    Via a script:
    for f in *shp; do shp2pgsql -g geom -s 4326 ${f/.shp/} $f | psql -U postgres advanced

    Individually:
    shp2pgsql -g geom -s 4326 <layer.shp> <layer> | psql -U postgres advanced    

12. Turn on WFS Transactions. Do this by logging into GeoServer, clicking WFS under Services, and clicking the Service Level radio box for Transactional. Then click Submit.

All other loading and configuring will be done as part of the workshop.

For more information, please see http://boundlessgeo.com.


----

Note: The spatial data files contained in this package are taken from http://naturalearthdata.com/. 

Last updated: August 2016
