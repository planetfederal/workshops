#!/bin/perl

use File::Find;

my $debug = 0;
my $gitroot = "/var/www/workshops.opengeo.org/workshops.git/";
my $webroot = "/var/www/workshops.opengeo.org/htdocs/";
my $tmproot = "/tmp/workshops/";
my $conffile = "conf.py";
my @confdirs = ();
my $confdir = "";
my $theme = "boundless_web";

%workshops = 
(
  "geoserver-intro" => { 
    "git" => "workshops/geoserver/intro",
    "master_doc" => "index",
    "project" => "Introduction to GeoServer" },

  "openlayers-intro" => { 
    "git" => "workshops/openlayers/",
    "master_doc" => "index",
    "project" => "Introduction to OpenLayers" },

  "postgis-spatialdbtips" => {
    "git" => "workshops/postgis-spatialdb/",
    "project" => "Spatial Database Tips and Tricks" },

  "postgis-intro" => {
     "git" => "workshops/postgis/source/en/",
     "master_doc" => "index",
     "project" => "Introduction to PostGIS" },

  "postgis-intro-jp" => {
     "git" => "workshops/postgis/source/jp/",
     "master_doc" => "index",
     "project" => "Introduction to PostGIS (Japanese)" },

  "suiteintro" => {
     "git" => "workshops/suiteintro/",
     "master_doc" => "index",
     "project" => "Introduction to the OpenGeo Suite" },

  "tutorial-wordmap" => {
     "git" => "tutorials/wordmap/",
     "master_doc" => "index",
     "project" => "Building a GeoNames Heat Map" },

  "tutorial-censusmap" => {
     "git" => "tutorials/censusmap/",
     "master_doc" => "index",
     "project" => "Building a Census Map" },

  "tutorial-lidar" => {
     "git" => "tutorials/lidarkml/",
     "master_doc" => "index",
     "project" => "Analyzing and Visualizing LIDAR" },
     
  "tutorial-osm" => {
     "git" => "tutorials/osm/",
     "master_doc" => "index",
     "project" => "Styling OpenStreetMap for OpenGeo Suite" },

  "tutorial-routing" => {
     "git" => "tutorials/routing/",
     "master_doc" => "index",
     "project" => "Integrating OpenGeo Suite and pgRouting" },

  "geoext" => {
     "git" => "workshops/geoext/",
     "master_doc" => "index",
     "project" => "Developing OGC Compliant Web Applications with GeoExt" },

#  "gxp" => {
#     "git" => "workshops/gxp/",
#     "master_doc" => "index",
#     "project" => "Introduction to GXP" },

  "frontpage" => {
      "git" => "workshops/_frontpage/",
      "project" => "Workshops" }
);

if ( $ARGV[0] && $workshops{$ARGV[0]} ) {
  $onlyone = $ARGV[0];
}
else {

  cleanup($webroot) if -d $webroot;
  mkdir($webroot);

  cleanup($tmproot) if -d $tmproot; 
  mkdir($tmproot);
}

# Update the git repository
print STDERR "Updating the git repository: $gitroot \n";
chdir($gitroot);
my $cmd = "git pull origin master";
run($cmd);

for my $w (keys %workshops) 
{

  next if $onlyone && $onlyone ne $w;

  print STDERR "Building project '$w'\n";
  my $srcpath = $gitroot . $workshops{$w}->{"git"};
  my $webpath = $webroot . $w;
  my $tmppath = $tmproot . $w;
  mkdir($tmppath);

  # Prepare the build destination
  if ( $w eq "frontpage" ) {
    $webpath = $webroot;
  }
  else {
    mkdir($webpath);
  }

  # Search for the Sphinx configuration file location
  print STDERR "  Searching for $conffile...\n";
  @confdirs = ();
  my $confdir = "";
  find(\&findconf, $srcpath);

  # No config file, log and continue
  if ( @confdirs == 0 ) {
    print STDERR "  ERROR: Unable to find $conffile in project '$w'\n";
    next;
  }

  # One config file, store it an move on
  if ( @confdirs == 1 ) {
    $confdir = $confdirs[0];
  }
  # More than one config file, find an 'en' version
  else {
    foreach my $c (@confdirs) {
      if( $c =~ /\/en/ ) {
        $confdir = $c;
        break;
      }
    }
  }
  if( $confdir ) {
    print STDERR "  Found $conffile in $confdir\n";
  }
  else {
    print STDERR "  ERROR: Unable to find $conffile in project '$w'\n";
    next;
  }

  #
  # Set project-specific overrides as necessary...
  #
  # Note to future explorers: Change the project name
  # At the top of this script, not here.

  my $overrides = "-D html_theme='$theme' ";
  foreach my $o ( ("project", "master_doc" ) ) {
    if( $workshops{$w}->{$o} ) {
      $overrides .= "-D $o='" . $workshops{$w}->{$o} . "' ";
    }
  }
  #
  # Run the HTML build
  # We use the -c flag to use the theme and conf.py from the common theme
  # and ignore the conf.py in the source tree. We use the -D flag to set the
  # project name to something sensible.
  #
  print STDERR "  Building HTML using theme '$theme'...\n";
  $cmd = "sphinx-build -b html $overrides -d '$tmppath/doctrees' '$confdir' '$webpath'";
  run($cmd);
  print STDERR "  Build complete.\n";

}

# Cleanup the build area
#cleanup($tmproot) if -d $tmproot; 

sub run {
  my $cmd = shift;
  print STDERR "  ", $cmd, "\n";
  if( ! $debug ) {
    system($cmd) == 0
      or die "system '$cmd' failed: $?\n";
  }
}

sub cleanup {
  my $dir = shift;
  local *DIR;
  opendir DIR, $dir or die "opendir $dir: $!";
  for (readdir DIR) {
    next if /^\.{1,2}$/;
    my $path = "$dir/$_";
    unlink $path if -f $path;
    cleanup($path) if -d $path;
  }
  closedir DIR;
  rmdir $dir or print "error - $!";
}

sub findconf
{
  if( $_ eq $conffile )
  {
     print STDERR "    Found a $conffile in $File::Find::dir\n";
     push(@confdirs, $File::Find::dir);
  }
}

