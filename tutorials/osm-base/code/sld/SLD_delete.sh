#  script to add layer/style information
#  for every SLD file in our collection
#
restapi=http://localhost:8080/geoserver/rest
login=admin:geoserver
workspace=osm
store=openstreetmap

for sldfile in *.sld; do

  # strip the extension from the filename to use for layer/style names
  layername=`basename $sldfile .sld`

  # Delete layer 
  curl -v -u $login -XDELETE $restapi/layers/$workspace:$layername

  # Delete featuretype 
  curl -v -u $login -XDELETE $restapi/workspaces/$workspace/datastores/$store/featuretypes/$layername

  # Delete style 
  curl -v -u admin:geoserver -XDELETE $restapi/workspaces/$workspace/styles/$layername

done

curl -v -u admin:geoserver -XDELETE http://localhost:8080/geoserver/rest/workspaces/osm/layers/park?recurse=true
