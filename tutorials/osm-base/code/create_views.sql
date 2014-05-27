CREATE OR REPLACE VIEW "aero-poly" AS ( SELECT way,aeroway 
FROM planet_osm_polygon
WHERE "aeroway" IN ('apron','runway','taxiway','helipad')
ORDER BY z_order asc );

CREATE OR REPLACE VIEW "agriculture" AS ( SELECT way,landuse FROM planet_osm_polygon
WHERE "landuse" IN ('allotments','farm','farmland','farmyard',
 'orchard','vineyard')
ORDER BY z_order asc );

CREATE OR REPLACE VIEW "amenity-areas" AS (select way,amenity from planet_osm_polygon
where amenity in ('hospital','college','school','university')
and (building is null or building not in ('no')));

CREATE OR REPLACE VIEW "beach" AS ( SELECT way,"natural"
  FROM planet_osm_polygon
  WHERE "natural" = 'beach'
  ORDER BY z_order asc
);

CREATE OR REPLACE VIEW "building" AS ( SELECT way,building,aeroway
FROM planet_osm_polygon
WHERE ("building" IS NOT NULL
AND "building" != 'no')
OR "aeroway" IN ('terminal')
ORDER BY z_order asc );

CREATE OR REPLACE VIEW "forest" AS ( SELECT *, (CASE 
            WHEN way_area >= 10000000 THEN 'huge'
            WHEN way_area >= 1000000 THEN 'large'
            WHEN way_area >= 100000 THEN 'medium'
            ELSE 'small' END) AS size FROM planet_osm_polygon
          WHERE "natural" IN ('wood') OR "landuse" IN ('forest','wood')
          ORDER BY z_order asc );

CREATE OR REPLACE VIEW "grass" AS ( SELECT way,landuse, (CASE 
            WHEN way_area >= 10000000 THEN 'huge'
            WHEN way_area >= 1000000 THEN 'large'
            WHEN way_area >= 100000 THEN 'medium'
            ELSE 'small' END) AS size FROM planet_osm_polygon
          WHERE "landuse" IN ('grass', 'greenfield', 'meadow')
            OR "natural" IN ('fell', 'heath', 'scrub')
          ORDER BY z_order asc );

CREATE OR REPLACE VIEW "highway-label" AS (select way,name,highway, case when oneway in
  ('yes','true','1') then 'yes'::text end as oneway
from planet_osm_line
where "highway" is not null
and ("name" is not null or "oneway" is not null)
order by z_order asc );

CREATE OR REPLACE VIEW "park" AS ( SELECT *, (CASE 
            WHEN way_area >= 10000000 THEN 'huge'
            WHEN way_area >= 1000000 THEN 'large'
            WHEN way_area >= 100000 THEN 'medium'
            ELSE 'small' END) AS size  FROM planet_osm_polygon
          WHERE "leisure" IN ('dog_park', 'golf_course', 'pitch', 'park',
            'playground', 'garden', 'common')
            OR "landuse" IN ('allotments', 'cemetery','recreation_ground', 'village_green')
          ORDER BY z_order asc );

CREATE OR REPLACE VIEW "parking-area" AS (select way,amenity from planet_osm_polygon
where amenity = 'parking'
);

CREATE OR REPLACE VIEW "placenames-medium" AS ( SELECT way,place,name
  FROM planet_osm_point
  WHERE place IN ('city','metropolis','town','large_town','small_town')
);

CREATE OR REPLACE VIEW "route-bridge-0" AS ( SELECT way,highway,railway,aeroway,tunnel
  FROM planet_osm_line
  WHERE ( "highway" IS NOT NULL
  OR "railway" IS NOT NULL
  OR "aeroway" IN ('apron','runway','taxiway') )
  AND bridge IN ('yes','true','1','viaduct')
  AND (layer IS NULL OR layer = '0')
  ORDER BY z_order asc
 );

CREATE OR REPLACE VIEW "route-bridge-1" AS ( SELECT way,highway,railway,aeroway,tunnel
  FROM planet_osm_line
  WHERE ( "highway" IS NOT NULL
  OR "railway" IS NOT NULL
  OR "aeroway" IN ('apron','runway','taxiway') )
  AND bridge IN ('yes','true','1','viaduct')
  AND layer = '1'
  ORDER BY z_order asc
 );

CREATE OR REPLACE VIEW "route-bridge-2" AS ( SELECT way,highway,railway,aeroway,tunnel
  FROM planet_osm_line
  WHERE ( "highway" IS NOT NULL
  OR "railway" IS NOT NULL
  OR "aeroway" IN ('apron','runway','taxiway') )
  AND bridge IN ('yes','true','1','viaduct')
  AND layer = '2'
  ORDER BY z_order asc
 );

CREATE OR REPLACE VIEW "route-bridge-3" AS ( SELECT way,highway,railway,aeroway,tunnel
  FROM planet_osm_line
  WHERE ( "highway" IS NOT NULL
  OR "railway" IS NOT NULL
  OR "aeroway" IN ('apron','runway','taxiway') )
  AND bridge IN ('yes','true','1','viaduct')
  AND layer = '3'
  ORDER BY z_order asc
 );

CREATE OR REPLACE VIEW "route-bridge-4" AS ( SELECT way,highway,railway,aeroway,tunnel
  FROM planet_osm_line
  WHERE ( "highway" IS NOT NULL
  OR "railway" IS NOT NULL
  OR "aeroway" IN ('apron','runway','taxiway') )
  AND bridge IN ('yes','true','1','viaduct')
  AND layer = '4'
  ORDER BY z_order asc
 );

CREATE OR REPLACE VIEW "route-bridge-5" AS ( SELECT way,highway,railway,aeroway,tunnel
  FROM planet_osm_line
  WHERE ( "highway" IS NOT NULL
  OR "railway" IS NOT NULL
  OR "aeroway" IN ('apron','runway','taxiway') )
  AND bridge IN ('yes','true','1','viaduct')
  AND layer = '5'
  ORDER BY z_order asc
 );

CREATE OR REPLACE VIEW "route-fill" AS ( select way, highway, horse, bicycle, foot, 
    aeroway,
    case when tunnel in ('yes', 'true', '1')
      then 'yes'::text
      else tunnel end as tunnel,
    case when bridge in ('yes','true','1','viaduct')
      then 'yes'::text else bridge end as bridge,
    case when railway in ('spur','siding')
      or (railway='rail' and service in ('spur','siding','yard'))
      then 'spur-siding-yard'::text else railway
      end as railway,
    case when service in 
      ('parking_aisle', 'drive-through', 'driveway')
      then 'INT-minor'::text else service 
      end as service
  from planet_osm_line
  where highway is not null
    or aeroway in ( 'runway','taxiway' )
    or railway in ( 'light_rail', 'narrow_gauge', 'funicular',
      'rail', 'subway', 'tram', 'spur', 'siding', 'platform',
      'disused', 'abandoned', 'construction', 'miniature' )
  order by z_order);

CREATE OR REPLACE VIEW "route-line" AS ( select way,highway,aeroway,
    case when tunnel in ( 'yes', 'true', '1' ) then 'yes'::text
      else 'no'::text end as tunnel,
    case when service in ( 'parking_aisle',
      'drive-through','driveway' ) then 'INT-minor'::text
      else service end as service
  from planet_osm_line
  where highway in ( 'motorway', 'motorway_link',
    'trunk', 'trunk_link', 'primary', 'primary_link',
    'secondary', 'secondary_link', 'tertiary', 'tertiary_link', 
    'residential', 'unclassified', 'road', 'service',
    'pedestrian', 'raceway', 'living_street' )
  OR "aeroway" IN ('apron','runway','taxiway')
  order by z_order);

CREATE OR REPLACE VIEW "route-tunnels" AS ( select way,highway from planet_osm_line 
  where highway in
  ( 'motorway', 'motorway_link', 'trunk', 'trunk_link', 
    'primary', 'primary_link', 'secondary', 'secondary_link',
    'tertiary', 'tertiary_link', 'residential', 'unclassified' )
  and tunnel in ( 'yes', 'true', '1' )
  order by z_order );

CREATE OR REPLACE VIEW "route-turning-circles" AS ( SELECT highway,way FROM planet_osm_point
  WHERE "highway" = 'turning_circle' );

CREATE OR REPLACE VIEW "water-outline" AS ( SELECT "natural", "landuse", "waterway", "way"
  FROM planet_osm_polygon
  WHERE "natural" IN ('lake','water')
  OR "waterway" IN ('canal','mill_pond','riverbank')
  OR "landuse" IN ('basin','reservoir','water')
  ORDER BY z_order asc
);

CREATE OR REPLACE VIEW "water" AS ( SELECT "natural", "landuse", "waterway", "way"
  FROM planet_osm_polygon
  WHERE "natural" IN ('lake','water')
  OR "waterway" IN ('canal','mill_pond','riverbank')
  OR "landuse" IN ('basin','reservoir','water')
  ORDER BY z_order asc
);

CREATE OR REPLACE VIEW "wetland" AS (select way,"natural" from planet_osm_polygon
where "natural" in ('marsh','wetland')
);


