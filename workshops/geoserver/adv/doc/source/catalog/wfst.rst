.. _gsadv.catalog.wfs:

Transactional WFS
=================

This section will discuss Transactional WFS, a service that allows for two way communication and editing of geospatial data through the web.

What is Transactional WFS?
---------------------------

As a refresher, the Web Feature Service (WFS) provides an interface allowing requests for geographical features across the web. You can think of WFS as providing the "source code" to the map, as opposed to Web Map Service (WMS) which returns map images.

With WMS, it is possible only to retrieve information (GET requests). And with basic WFS, this is true as well. But WFS can have the ability to be "transactional," meaning that it is possible to POST information back to the server for editing.

This is a very powerful feature, in that it allows for format-agnostic editing of geospatial features. One doesn't need to know anything about the underlying data format (which database was used) in order to make edits.

GeoServer has full support for Transactional WFS.

Demo request builder
--------------------

In order to see WFS-T in action, we'll need to create some demo requests and then POST them to the server.

While we could use cURL for this, GeoServer has a built-in "Demo Request Builder" that has some templates that we can use. We'll be using this interface.

#. Access the Demo Request Builder by clicking :guilabel:`Demos` in the GeoServer web interface, and then selecting :guilabel:`Demo requests`.

   .. figure:: img/wfst_demorequests.png

      Demo requests page

#. Select any one of the items in the :guilabel:`Request`  box to see the type of POST requests that are available. (Any of the requests whose title ends in ``.xml`` is a POST request. If the ending is ``.url``, it is a GET request, which doesn't concern us here.)

   .. figure:: img/wfst_demoexample.png

      Example demo request

Simple query
~~~~~~~~~~~~

Before we test a WFS-T example, let's do a few simple POST requests. This request is a GetFeature request for a single feature in the ``earth:cities`` layer (with an id of ``3``).

#. Paste the following into the :guilabel:`Body` field:

   .. code-block:: xml

       <wfs:GetFeature service="WFS" version="1.1.0"
        xmlns:earth="http://earth"
        xmlns:wfs="http://www.opengis.net/wfs"
        xmlns:ogc="http://www.opengis.net/ogc"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.opengis.net/wfs
                            http://schemas.opengis.net/wfs/1.1.0/wfs.xsd">
         <wfs:Query typeName="earth:cities">
           <ogc:Filter>
             <ogc:FeatureId fid="cities.3"/>
           </ogc:Filter>
         </wfs:Query>
       </wfs:GetFeature>

#. Make sure the :guilabel:`URL` field contains ``http://localhost:8080/geoserver/wfs`` and that the :guilabel:`User Name` and :guilabel:`Password` fields are properly filled out.

#. Click :guilabel:`Submit`.

   .. figure:: img/wfst_demosimplequery.png

      Simple query

   The response:

   .. figure:: img/wfst_demosimplequeryresponse.png

      Simple query response

Bounding box query
~~~~~~~~~~~~~~~~~~

This next example will filter the ``earth:cities`` layer on a given bounding box.

#. Paste this example into the :guilabel:`Body` field and leave all other fields the same. Then click :guilabel:`Submit`.

   .. code-block:: xml 

       <wfs:GetFeature service="WFS" version="1.1.0"
        xmlns:earth="http://earth"
        xmlns:wfs="http://www.opengis.net/wfs"
        xmlns:ogc="http://www.opengis.net/ogc"
        xmlns:gml="http://www.opengis.net/gml"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.opengis.net/wfs
                            http://schemas.opengis.net/wfs/1.1.0/wfs.xsd">
         <wfs:Query typeName="earth:cities">
           <wfs:PropertyName>earth:name</wfs:PropertyName>
           <wfs:PropertyName>earth:pop_max</wfs:PropertyName>
           <ogc:Filter>
             <ogc:BBOX>
               <ogc:PropertyName>geom</ogc:PropertyName>
               <gml:Envelope srsName="http://www.opengis.net/gml/srs/epsg.xml#4326">
                 <gml:lowerCorner>-45 -45</gml:lowerCorner>
                 <gml:upperCorner>45 45</gml:upperCorner>
               </gml:Envelope>
             </ogc:BBOX>
           </ogc:Filter>
         </wfs:Query>
       </wfs:GetFeature>

   .. figure:: img/wfst_demobboxresponse.png

      Bounding box query response

Attribute filter query
~~~~~~~~~~~~~~~~~~~~~~

Finally, this example queries the ``earth:cities`` layer for geometries where the "name" attribute is Toronto.

#. Paste this example into the :guilabel:`Body` field and leave all other fields the same. Then click :guilabel:`Submit`.

   .. code-block:: xml 

       <wfs:GetFeature service="WFS" version="1.0.0"
        xmlns:earth="http://earth"
        xmlns:wfs="http://www.opengis.net/wfs"
        xmlns:ogc="http://www.opengis.net/ogc"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.opengis.net/wfs
                            http://schemas.opengis.net/wfs/1.0.0/WFS-basic.xsd">
         <wfs:Query typeName="earth:cities">
           <ogc:Filter>
             <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>name</ogc:PropertyName>
               <ogc:Literal>Toronto</ogc:Literal>
             </ogc:PropertyIsEqualTo>
           </ogc:Filter>
         </wfs:Query>
       </wfs:GetFeature>

   .. figure:: img/wfst_demofilterresponse.png

      Filter query response


WFS-T examples
--------------

The format of a WFS-T request is as follows:

.. code-block:: xml

   <wfs:Transaction>
     <wfs:ACTION>
       ...
     </wfs:ACTION>
   </wfs:Transaction>

where ``ACTION`` can be one of ``Delete``, ``Update``, or ``Insert``.

Delete
~~~~~~

Let's delete the entry for Toronto.

#. Paste this code into the :guilabel:`Body` field:

   .. code-block:: xml

      <wfs:Transaction service="WFS" version="1.0.0"
       xmlns:ogc="http://www.opengis.net/ogc"
       xmlns:wfs="http://www.opengis.net/wfs"
       xmlns:earth="http://earth">
        <wfs:Delete typeName="earth:cities">
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>earth:name</ogc:PropertyName>
              <ogc:Literal>Toronto</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
        </wfs:Delete>
      </wfs:Transaction>

#. For this and all other examples, use ``http://localhost:8080/geoserver/wfs`` for the :guilabel:`URL` and make sure to enter the admin user name and password. 

#. Click :guilabel:`Submit`. The result you should see will look like this:

   .. figure:: img/wfst_deleteresponse.png

      Delete response

#. You can view the result here::

      http://localhost:8080/geoserver/wms/reflect?layers=earth:shadedrelief,earth:countries,earth:cities&format=application/openlayers

#. Zoom in to the Toronto area (recall that Toronto is northwest of New York, halfway between Detroit and Ottawa):

   .. figure:: img/wfst_deletepreview.png

      Preview of layer with feature removed

Update
~~~~~~

Another option is to ``Update``, which alters an existing resource. In this case, we will update the name of Luxembourg.

#. Paste this code into the :guilabel:`Body` field:

   .. code-block:: xml

      <wfs:Transaction service="WFS" version="1.0.0"
       xmlns:earth="http://earth"
       xmlns:ogc="http://www.opengis.net/ogc"
       xmlns:wfs="http://www.opengis.net/wfs">
        <wfs:Update typeName="earth:cities">
          <wfs:Property>
            <wfs:Name>name</wfs:Name>
            <wfs:Value>Deluxembourg</wfs:Value>
          </wfs:Property>
          <ogc:Filter>
            <ogc:FeatureId fid="cities.3"/>
          </ogc:Filter>
        </wfs:Update>
      </wfs:Transaction>

#. Click :guilabel:`Submit`. You should see the same ``SUCCESS`` response as above.

#. You can view the result here::

      http://localhost:8080/geoserver/wms/reflect?layers=earth:shadedrelief,earth:countries,earth:cities&format=application/openlayers

#. Zoom in to the Luxembourg area (recall that Luxembourg is in Western Europe, between Brussels and Frankfurt):

   .. figure:: img/wfst_updatepreview.png

      Preview of layer with feature updated

Insert
~~~~~~

We can ``Insert`` new features into layers via WFS-T. Let's add a new city to our ``earth:cities`` layer.

#. Paste this code into the :guilabel:`Body` field:

   .. code-block:: xml

      <wfs:Transaction service="WFS" version="1.0.0"
       xmlns:wfs="http://www.opengis.net/wfs"
       xmlns:earth="http://earth"
       xmlns:gml="http://www.opengis.net/gml"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.opengis.net/wfs
                           http://schemas.opengis.net/wfs/1.0.0/WFS-transaction.xsd
                           http://earth 
                           http://localhost:8080/geoserver/wfs/DescribeFeatureType?typename=earth:cities">
        <wfs:Insert>
          <earth:cities>
            <earth:geom>
              <gml:Point srsName="http://www.opengis.net/gml/srs/epsg.xml#4326">
                <gml:coordinates decimal="." cs="," ts=" ">0,0</gml:coordinates>
              </gml:Point>
            </earth:geom>
            <earth:name>Null</earth:name>
            <earth:pop_min>10000000</earth:pop_min>
          </earth:cities>
        </wfs:Insert>
      </wfs:Transaction>

#. Click :guilabel:`Submit`.

#. You can view the result here (recall that 0,0 in latitude/longitude is off the coast of West Africa)::

      http://localhost:8080/geoserver/wms/reflect?layers=earth:shadedrelief,earth:countries,earth:cities&format=application/openlayers

   .. figure:: img/wfst_insertpreview.png

      Preview of layer with feature inserted

   .. note:: You will need to zoom out to see this new feature. This is because the feature that was added was outside the bounding box for the layers as saved in GeoServer. The default preview will zoom to that bounding box, though features can be shown that are outside it.

Multiple transactions
~~~~~~~~~~~~~~~~~~~~~

We can execute multiple transactions in a single transaction request. So let's undo everything that was done in the previous three examples.

#. Paste this code into the :guilabel:`Body` field:

   .. code-block:: xml

       <wfs:Transaction service="WFS" version="1.0.0"
        xmlns:wfs="http://www.opengis.net/wfs"
        xmlns:earth="http://earth"
        xmlns:advanced="http://advanced"
        xmlns:ogc="http://www.opengis.net/ogc"
        xmlns:gml="http://www.opengis.net/gml"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.opengis.net/wfs
                            http://schemas.opengis.net/wfs/1.0.0/WFS-transaction.xsd">
     
         <!-- BRING TORONTO BACK -->
         <wfs:Insert>
           <earth:cities>
           <earth:geom>
             <gml:Point srsName="http://www.opengis.net/gml/srs/epsg.xml#4326">
               <gml:coordinates xmlns:gml="http://www.opengis.net/gml" decimal="." cs="," ts=" ">
                 -79.496,43.676
               </gml:coordinates>        
             </gml:Point>
           </earth:geom>
           <earth:name>Toronto</earth:name>
           </earth:cities>
         </wfs:Insert>

         <!-- LUXEMBOURG IS NO LONGER DELUXE -->
         <wfs:Update typeName="earth:cities">
           <wfs:Property>
             <wfs:Name>name</wfs:Name>
             <wfs:Value>Luxembourg</wfs:Value>
           </wfs:Property>
           <ogc:Filter>
             <ogc:FeatureId fid="cities.3"/>
           </ogc:Filter>
         </wfs:Update>
       
         <!-- BEGONE NULL ISLAND  -->
         <wfs:Delete typeName="earth:cities">
           <ogc:Filter>
             <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>earth:name</ogc:PropertyName>
               <ogc:Literal>Null</ogc:Literal>
             </ogc:PropertyIsEqualTo>
           </ogc:Filter>
         </wfs:Delete>

       </wfs:Transaction>

#. Click :guilabel:`Submit`.

#. Preview the results here::

      http://localhost:8080/geoserver/wms/reflect?layers=earth:shadedrelief,earth:countries,earth:cities&format=application/openlayers
