
  print "COPY geonames (id, name, state, kind, geom) FROM STDIN;\n";

  while(<>)
  {
    # Strip the newline from the end
    chop;

    # Break the line on tabs
    @line = split(/\t/);

    # Skip any messed up line that lacks a numeric identifier
    $id = $line[0];
    next if ! ($id =~ /\d/);

    # Read in the other columns we care about
    $name = $line[1];
    $lat = $line[4];
    $lon = $line[5];
    $state = $line[10];
    $kind = $line[7];

    # Write out values in PostgreSQL copy format
    # (also tab separated, as it happens)
    print $id, "\t";
    print $name, "\t";
    print $state, "\t";
    print $kind, "\t";
	
    # Put the lat/lon into a PostGIS point text format
    printf "SRID=4326;POINT(%g %g)", $lon, $lat;

    # Complete the line with newline character
    print "\n";
  }

  # End the COPY command
  print "\\.\n";

