#  script to add layer/style information
#  for every SLD file in our collection
#
restapi=http://localhost:8080/geoserver/rest
login=admin:geoserver
workspace=osm

for sldfile in *.sld; do

  # strip the extension from the filename to use for layer/style names
  layername=`basename $sldfile .sld`

  # create a new featuretype in the store, assuming the table
  # already exists in the database and is named $layername
  # this step automatically creates a layer of the same name
  # as a side effect
  curl -v -u $login -XPOST -H "Content-type: text/xml" \
    -d "<featureType><name>$layername</name></featureType>" \
    $restapi/workspaces/$workspace/datastores/postgis/featuretypes?recalculate=nativebbox,latlonbbox

  sleep 1

  # create an empty style object in the workspace, using the same name
  curl -v -u $login -XPOST -H "Content-type: text/xml" \
    -d "<style><name>$layername</name><filename>$sldfile</filename></style>" \
    $restapi/workspaces/$workspace/styles

  sleep 1

  # upload the SLD definition to the style
  curl -v -u $login -XPUT -H "Content-type: application/vnd.ogc.sld+xml" \
    -d @$sldfile \
    $restapi/workspaces/$workspace/styles/$layername

  sleep 1

  # associate the style with the layer as the default style
  curl -v -u $login -XPUT -H "Content-type: text/xml" \
    -d "<layer><defaultStyle><name>$layername</name><workspace>$workspace</workspace></defaultStyle></layer>" \
    $restapi/layers/$workspace:$layername

  sleep 1

done

