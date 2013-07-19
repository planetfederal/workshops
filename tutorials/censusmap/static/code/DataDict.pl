@cols = (1, 11, 116, 120, 127, 139, 151, 163);
@lens = (10, 105, 4, 7, 12, 12, 12, 8);
@names = ("name", "desc", "unit", "dec", "total", "min", "max", "source");

$lineno = 0;

# json list start
print "[";

while(<>) {

  # increment line number
  $lineno++;

  # skip first two lines
  next if $lineno <= 2;

  # comma between each dictionary
  print ",\n" if $lineno > 3;

  # json dictionary start
  print "{\n";
  # read each field
  for ( $i = 0; $i < 8; $i++ ) {
    # clip out the field
    $val = substr($_, $cols[$i]-1, $lens[$i]);
    # strip white space from ends
    $val =~ s/^\s*//g;
    $val =~ s/\s*$//g;
    # print out json dictionary entry
    print ",\n" if $i;
    printf '"%s":"%s"', $names[$i], $val;
  }
  # json dictionary end
  print "\n}";
}

# json list end
print "]\n";

