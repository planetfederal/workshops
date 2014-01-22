CREATE TABLE "smallworld" (
  gid serial PRIMARY KEY,  
  "placename" varchar(50), 
  "comment" varchar(255), 
  "year" numeric,
  "geom" geometry(Point,4326)
);

