Course Data
===========

Natural Earth
-------------

The Natural Earth dataset is a free collection of vector and raster data published by the North American Cartographic Information Society to encourage mapping.

For this course we will be using the `Natural Earth <http://www.naturalearthdata.com/>`_ cultural and physical vector layers backed by a raster shaded relief dataset ( `vector <http://kelso.it/x/nequickstart>`_
| `raster <http://www.naturalearthdata.com/http//www.naturalearthdata.com/download/10m/raster/NE1_HR_LC_SR_W_DR.zip>`_).
  
.. figure:: img/natural_earth.png
   
   Natural Earth
   
We will also be making use of:

* `Roads <http://www.naturalearthdata.com/downloads/10m-cultural-vectors/roads/>`__ "North America supplement" providing a larger dataset suitable for optimisation.

.. The Quickstart Natural Earth styling has been exported from QGIS and cleaned up in uDig for use in GeoServer.


Digital Elevation Model
-----------------------

A digital elevation model records height information for visualisation and analysis. We are using a dataset derived from the USGS GTOPO30 dataset.

.. figure:: img/gtopo30.gif
   
   Digital Elevation Model

The GeoServer "dem" styling has been used for this dataset.

PostGIS Configuration
---------------------

.. note::
   
   In a classroom a PostGIS `training` database has been configured with:
   
   * PostGIS extension
   * Roads table

.. admonition:: Exercise

   If you need to configure PostGIS yourself:
   
   #. Use pgAdmin to create a `training` database (with postgres as owner).
      
      .. figure:: img/postgis_database.png
   
         Training Database
   
   #. Select the training database, and use the :guilabel:`SQL query` button.
   
   #. Load PostGIS extension by executing the following query:
      
      .. code-block:: sql
      
         CREATE EXTENSION postgis;
      
   #. Start :file:`pgShapeLoader` to load the the :file:`ne_10m_roads_north_america.shp`.
      
      Click :guilabel:`Connection details` and fill in:
      
      * Username: :kbd:`postgres`
      * Password: :kbd:`postgres`
      * Database: :kbd:`training`
      
   #. Use :file:`Add File` to locate :file:`ne_10m_roads_north_america.shp` - be sure to fill in:
      
      * Table: :kbd:`roads`
      * SRID: :kbd:`4326`
      
      .. figure:: img/postgis_pgShapeLoader.png
         
         pgShapeLoader Roads
         
   #. Click :guilabel:`Import`.
      
      .. figure:: img/postgis_import.png
         
         pgShapeLoader Import

GeoServer Configuration
-----------------------

.. note::
   
   In a classroom setting GeoServer has been preconfigured with the appropriate data directory.
   
   * natural earth cultural data
   * usgs dem
   * natural earth basemap
   
   If you need to reset the data directory at any point:
   
   #. Stop the GeoServer service
   
   #. Replace the GEOSERVER_DATA_DIRECTORY with the one provided:
      
      * Windows: Use the short cut to open the data directory
      * Ubuntu: :file:`/var/lib/opengeo/geoserver`
      * Redhat: :file:`/usr/share/opengeo-suite-data/geoserver_data`
      * Mac: Use the menubar short cut to locate the data directory
      
   #. Restart the GeoServer service

.. admonition:: Exercise
   
   To set up the data directory yourself:

   #. Use the **Importer** to add and publish -
   
      The following TIF Coverage Stores:
   
      * dem/W100N40.TIF
      * ne/ne1/NE1_HR_LC_SR.tif
   
      The following directories of shape files:
 
      * ne/ne1/physical   
      * ne/ne1/cultural

      .. image:: img/stores.png
   
   #. Cleaning up the published vector layers:
   
      * Layer names have been shortened for publication - the :file:`ne_10m_admin_1_states_provinces_lines_ship.shp` is published  named ``states_provinces_shp``
      * Use ``EPSG:4326`` as the spatial reference system
      * Appropriate SLD styles have been provided (from the uDig project)

      .. image:: img/cultural.png

   #. To clean up the published raster layers:

      * The NE1 GeoTiff is styled with the default ``raster`` style
      * The usgs:dem GeoTiff is styled with the default ``DEM`` style
   
      .. image:: img/raster.png
   
   #. Optional: create a ``basemap`` group layer consisting of:
   
      .. image:: img/group.png
   
      This offers a combined layer, forming a cohesive base map.
   
      .. image:: img/basemap.png