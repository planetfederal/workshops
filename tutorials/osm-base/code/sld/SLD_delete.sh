#  script to add layer/style information
#  for every SLD file in our collection
#
restapi=http://localhost:8080/geoserver/rest
login=admin:geoserver
workspace=osm

for sldfile in *.sld; do

  # strip the extension from the filename to use for layer/style names
  layername=`basename $sldfile .sld`

  # Delete layer and associated objects
  curl -v -u $login -XDELETE \
    $restapi/workspaces/$workspace/layers/$layername?recurse=true

  sleep 1

  # Delete style just to make sure
  curl -v -u $login -XDELETE \
    $restapi/workspaces/$workspace/styles/$layername

  sleep 1
  
done

