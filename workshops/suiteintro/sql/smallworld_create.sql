CREATE TABLE "smallworld" (gid serial PRIMARY KEY,  "placename" varchar(50), "comment" varchar(255), "year" numeric);
SELECT AddGeometryColumn('','smallworld','the_geom','4326','POINT',2);

