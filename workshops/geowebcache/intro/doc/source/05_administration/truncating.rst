Truncating
==========

In addition to seeding the cache, we can also :term:`truncate` tiles in the cache to free up disk space or to make room for new tiles if the underlying data has changed and we don't want to reseed the entire cache.

Truncate operations are triggered in the same location as seeding and reseeding, by changing the :guilabel:`Type of operation` from the default :kbd:`Seed - generate missing tiles` to :kbd:`Truncate - remove tiles`.

WFS-T truncating
----------------

GeoServer's embedded GeoWebCache is able to automatically truncate tiles from the cache when a WFS Transaction (WFS-T) operation updates features. GeoWebCache will only invalidate tiles which contain features that have changed.

.. admonition:: Exercise

   To test GeoWebCache's WFS-T truncating, we will confirm that a tile is in our cache by checking the response headers. We will then add a new feature using WFS-T. When we check the cache again, we will see that the same tile in no longer in the cache.

   .. only:: instructor

      .. admonition:: Instructor Notes

         TODO: Add a visual of what is going on here (location of WFS-T versus location of tile)
  
   #. Ensure caching is enabled for the ``usa:states`` layer.

   #. On the command line, execute the following command to get a tile::

        curl -sv "http://localhost:8080/geoserver/gwc/service/wms?LAYERS=usa:states&FORMAT=image/png&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&STYLES=&SRS=EPSG:4326&BBOX=-73.125,28.125,-67.5,33.75&WIDTH=256&HEIGHT=256" > /dev/null

   #. Repeat the command second time and you will observe a cache hit in the response header::

        geowebcache-cache-result: HIT
        geowebcache-tile-index: [19, 21, 5]
        geowebcache-tile-bounds: -73.125,28.125,-67.5,33.75

   #. Navigate to :menuselection:`Demos --> Demo requests` in GeoServer.

   #. Set the :guilabel:`URL` to :kbd:`http://localhost:8080/geoserver/wfs` and set the :guilabel:`Body` to::
       
        <wfs:Transaction service="WFS" version="1.0.0"
          xmlns:wfs="http://www.opengis.net/wfs"
          xmlns:usa="http://census.gov"
          xmlns:gml="http://www.opengis.net/gml">
          <wfs:Insert>
            <usa:states>
              <usa:the_geom>
                <gml:MultiPolygon srsName="http://www.opengis.net/gml/srs/epsg.xml#4326">
                  <gml:polygonMember>
                    <gml:Polygon srsName="http://www.opengis.net/gml/srs/epsg.xml#4326">
                      <gml:outerBoundaryIs>
                        <gml:LinearRing>
                          <gml:coordinates decimal="." cs="," ts=" ">
                            -69.0,31.0 -69.0,30.0 -70.0,30.0 -70.0,31.0 -69.0,31.0
                          </gml:coordinates>
                        </gml:LinearRing>
                      </gml:outerBoundaryIs>
                    </gml:Polygon>
                  </gml:polygonMember>
                </gml:MultiPolygon>
              </usa:the_geom>
              <usa:NAME10>Test</usa:NAME10>
              <usa:GEOID10>99</usa:GEOID10>
              <usa:STUSPS10>ZZ</usa:STUSPS10>
              <usa:DP0010001>1000000</usa:DP0010001>
            </usa:states>
          </wfs:Insert>
        </wfs:Transaction>

   #. Enter your admin :guilabel:`User name` and :guilabel:`Password` in the appropriate fields and click :guilabel:`Submit`.

   #. GeoServer should display a message indicating that the transaction was a success.

      .. figure:: images/wfs-t_demo_success.png

         Successful WFS ``Transaction`` response

   #. On the command line run the same cURL command as above. GeoWebCache should indicate that this was a cache miss::

         geowebcache-cache-result: MISS
         geowebcache-tile-index: [19, 21, 5]
         geowebcache-tile-bounds: -73.125,28.125,-67.5,33.75

      This shows that the Transaction caused GeoWebCache to truncate this particular tile.

.. admonition:: Explore

   Try the same exercise as above, but use the following URL in your cURL command::

        http://localhost:8080/geoserver/gwc/service/wms?LAYERS=usa%3Astates&FORMAT=image%2Fpng&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&STYLES=&SRS=EPSG%3A4326&BBOX=-123.75,45,-118.125,50.625&WIDTH=256&HEIGHT=256

   Were the results the same? Why?

   .. only:: instructor

      .. admonition:: Instructor Notes

         Going to take a wild guess and say that the tile was outside the area affected by the WFS-T. This will be hard for people to figure out without a visual (see note above).
