Job management with REST
========================

This section will concentrate on how to trigger seeding and truncating jobs as part of an automated cache-management strategy.

.. note::

   To trigger a seed or truncate operation, we will need to send information back to GeoWebCache, so our cURL examples will include some extra parameters:

   * ``-X POST``: Indicates that we are sending information
   * ``-H "Content-type: text/xml"``: Informs GeoWebCache that we are sending XML
   * ``-T``: Indicates the name of the file that contains the information to be sent.

A job for the tiled layer ``opengeo:countries`` to seed the western hemisphere may be launched using the following request:

.. code-block:: bash

   $ curl -u admin:geoserver -XPOST -H "Content-type: text/xml" -T job.xml "http://localhost:8080/geoserver/gwc/rest/seed/opengeo:countries.xml"

The :file:`job.xml` file contains all the parameters for the seed job:

.. code-block:: xml

   <seedRequest>
     <gridSetId>EPSG:4326</gridSetId>
     <bounds>
       <coords>
         <double>-7</double>
         <double>2</double>
         <double>56</double>
         <double>48</double>
       </coords>
     </bounds>
     <zoomStart>1</zoomStart>
     <zoomStop>6</zoomStop>
     <format>image/png</format>
     <type>seed</type>
     <threadCount>1</threadCount>
   </seedRequest>

The ``<type>`` tag may be modified to initiate a ``seed``, ``reseed`` or ``truncate`` job. Other parameters, such as ``<bounds>`` and ``<theadCount>`` do not need to be present at all.

.. admonition:: Exercise

   #. Start a new seed job with the REST API using the information above.

   #. Use the web interface to kill the job.
