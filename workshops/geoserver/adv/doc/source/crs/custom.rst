.. _gsadv.crs.custom:

Adding a custom projection
==========================

While there are a great many projections natively served by GeoServer, there will be occasions where you will encounter data that is in a CRS that is not in the EPSG database. In this case, you will need to add a custom projection to GeoServer.

Let's add EPSG:34003, a Danish CRS. It has the following definition in WKT::

  PROJCS["Danish System 34 Jylland-Fyn", 
    GEOGCS["ED50", 
      DATUM["European_Datum_1950", 
        SPHEROID["International - 1924", 6378388.0, 297.0000000000601, AUTHORITY["EPSG","7022"]], 
        AUTHORITY["EPSG","6230"]], 
      PRIMEM["Greenwich", 0.0], 
      UNIT["degree", 0.017453292519943295], 
      AXIS["Longitude", EAST], 
      AXIS["Latitude", NORTH], 
      AUTHORITY["EPSG","4230"]], 
    PROJECTION["Transverse_Mercator"], 
    PARAMETER["central_meridian", 9.0], 
    PARAMETER["latitude_of_origin", 0.0], 
    PARAMETER["scale_factor", 0.9996], 
    PARAMETER["false_easting", 500000.0], 
    PARAMETER["false_northing", 0.0], 
    UNIT["m", 1.0], 
    AXIS["x", EAST], 
    AXIS["y", NORTH], 
    AUTHORITY["EPSG","34003"]]

To add this CRS to be available in GeoServer, we'll need to edit a file in the GeoServer catalog. This file is called :file:`epsg.properties` and it is found in :file:`user_projections/` in the GeoServer data directory.

#. Open the :file:`epsg.properties` file in a text editor.

#. Paste the following code at the very end of the file::

     34003=PROJCS["Danish System 34 Jylland-Fyn",GEOGCS["ED50",DATUM["European_Datum_1950",SPHEROID["International - 1924",6378388,297.0000000000601,AUTHORITY["EPSG","7022"]],AUTHORITY["EPSG","6230"]],PRIMEM["Greenwich",0],UNIT["degree",0.0174532925199433],AUTHORITY["EPSG","4230"]],PROJECTION["Transverse_Mercator"],PARAMETER["latitude_of_origin",0],PARAMETER["central_meridian",9],PARAMETER["scale_factor",0.9996],PARAMETER["false_easting",500000],PARAMETER["false_northing",9.999999999999999e-099],UNIT["METER",1]]

   This is the same code as above, but with spacing removed and prefixed with ``34003=``.

   .. note:: It is not necessary for the EPSG codes to be sorted in numerical order.

#. Save and close the file.

#. Restart GeoServer.

#. Now go back to the SRS List (:menuselection:`Demos --> SRS List`) and search for the number 34003. You should see it in the list.

   .. figure:: img/custom_verified.png

      Custom projection added to GeoServer.

This CRS, though user-supplied, is now on equal footing with any of the other CRSs in GeoServer, and is available for dynamic reprojecting and auto-detection. 

.. todo:: Show a layer that requires this custom projection.