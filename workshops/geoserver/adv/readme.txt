Advanced GeoServer workshop
===========================

The following instructions will show how to prepare a fresh OpenGeo Suite installation for the Advanced GeoServer workshop.


1. Install the OpenGeo Suite. The software is not included in this bundle.

2. Create a PostGIS database called earth:
   createdb -U postgres earth
   Turn on the PostGIS extension with SQL: 
   psql -U postgres -d earth -c "create extension postgis"

3. Load all shapefiles in the data/earth/ directory into PostGIS using pgShapeLoader or shp2pgsql/psql:
   for f in *shp; do shp2pgsql -g geom -s 4326 ${f/.shp/} $f | psql -U postgres earth

4. Create a workspace in GeoServer called "earth". For the URI, you must use http://earth.opengeo.org.

5. Create a PostGIS store in GeoServer in the earth workspace called "earth" . Point it at the PostGIS database of the same same.

6. Load each table from the PostGIS store into GeoServer as a layer using the same names as the tables.

7. Upload each SLD file in the styles/earth/ directory as a new style in GeoServer and associate each with its namesake layer. The first letter of the style names should be capitalized.

8. Load shadedrelief.tif as a GeoTIFF datastore and layer (again in the earth workspace).

9. Create a layer group called "earth" that contains each of the layers loaded. Suggested order: shadedrelief, ocean, cities, coastline, countries, rivers. This should NOT be in workspace "earth". (If there exists a layer group called "earth" already, replace it with this one.)

10. Create a PostGIS database called advanced
    createdb -U postgres advanced
    Turn on the PostGIS extension with SQL: 
    psql -U postgres -d advanced -c "create extension postgis"

11. Load all shapefiles in the data/advanced/ directory into PostGIS using pgShapeLoader or shp2pgsql/psql:
    for f in *shp; do shp2pgsql -g geom -s 4326 ${f/.shp/} $f | psql -U postgres advanced

12. Turn of WFS Transactions. Do this by logging into GeoServer, clicking WFS under Services, and clicking the Service Level radio box for Transactional. Then click Submit.


All other loading and configuring will be done as part of the workshop.

For more information, please contact us at http://boundlessgeo.com/about/contact-us/ .


----

Note: The spatial data files contained in this package are taken from http://naturalearthdata.com/. 

Last updated: September 2015
