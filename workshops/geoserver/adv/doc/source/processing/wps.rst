.. _gsadv.processing.wps:

Web Processing Service (WPS)
============================

In this section, we'll introduce the OGC Web Processing Service and how it is implemented in GeoServer.

What is WPS?
------------

Here is the official definition of WPS from the specification:

  WPS defines a standardized interface that facilitates the publishing of geospatial processes, and the discovery of and binding to those processes by clients. "Processes" include any algorithm, calculation or model that operates on spatially referenced data. "Publishing" means making available machine-readable binding information as well as human-readable metadata that allows service discovery and use.*

As its name suggests, a Web Processing Service is a service that allows you to perform **analytical processes over the web**. The processes/analyses are run on the server, but the calls to the processes (and sometimes the inputs) are made over the web.

Processes are run on data, and since we're talking about GeoServer. we're typically (but not always) talking about spatial data.

Geoprocessing and spatial analysis aren't new topics, but what WPS is doing differently is taking these processes off of desktops using potentially unmanaged versions of data and putting them onto centralized servers with canonical copies of data.

This approach of centralizing data on a web server enables anyone to perform analysis on the same source at any time. A given user need not have specific access to the data, and yet can manipulate it through processing.

How does it work?
-----------------

WPS works just like other OGC services like WMS and WFS. The only difference is the extra notion of a "process." A process is just some sort of function, or chain of functions. These definitions are usually defined on the server and accessed as part of a request. It can take inputs from a client (or from the server itself)

The definition of the process exists on a server, and it can take inputs from a client, which is then operated on by the server, and then output in some way.

Like WMS and WFS, there is the same idea of the capabilities document (through a GetCapabilities request), which lists all of the processes known to the server. Like WFS DescribeFeatureType, the DescribeProcess operation will detail the inputs and outputs of a given process. And just like GetMap or GetFeature, ExecuteProcess will perform the operation.

The data to be operated on can be POST'ed as part of the request, but that can be unwieldy if the data is large or the bandwidth small. It makes much more sense to store the data on the server, and then operate on it there. The exception to this is smaller data, such as a bounding box or simple shape, that is used to operate on larger datasets stored on the server (say with a clipping operation).

GeoServer and WPS
-----------------

GeoServer has full support for WPS. It is currently available as an extension in the community version. In the OpenGeo Suite version of GeoServer, though, it is integrated into the core without any additional work required. The functionality of both implementations are identical.

It should be noted that there is a difference between WPS as a *standard* and WPS as it is *implemented*.  WPS as a standard is very generic, and doesn't specify any more than a framework for what is possible. It is in the implementation of WPS (and especially what processes are available) that determine how useful and powerful it can be. So while the discussion here will be on GeoServer's implementation of WPS, other products such as 52-North or Deegree may have very different implementations.

WPS, like other OGC services, uses XML for its inputs and outputs. With multiple inputs and outputs (and especially when chained processes are invoked) this can get extremely unwieldy. Thankfully, GeoServer includes a **WPS Request Builder** to perform basic tasks, and to learn/prototype syntax. As a bonus, when building a process or task through the interface, it also generates the actual XML instructions, allowing you to hold on to the process for later use.

WPS example
-----------

The buffer process is the simplest, most common process, and so it makes sense to start with it here. We're going to buffer a point centered on the origin to a radius of 2. (The units are only important if specified, which we won't do here.)

#. Load the WPS request builder. This is accessed by clicking on :guilabel:`Demos` and then selecting :guilabel:`WPS request builder`.

   .. figure:: img/wps_link.png

      Click to load the WPS request builder

   .. figure:: img/wps_page.png

      WPS request builder

#. Select the :guilabel:`JTS:buffer` process in the :guilabel:`Choose process` field.

#. Enter the following fields:

   .. list-table::
      :header-rows: 1

      * - Field
        - Value
      * - Input geometry
        - TEXT, application/wkt, POINT(0 0)
      * - distance
        - 2
      * - quadrantSegments
        - 10
      * - capStyle
        - Round
      * - result
        - Generate application/wkt

   .. figure:: img/wps_bufferform.png

      JTS:buffer form filled out

#. If you click :guilabel:`Generate XML from process inputs/outputs`, you'll see the XML that is POSTed to the server in order to execute the process. It is reproduced below:

   .. code-block:: xml

      <?xml version="1.0" encoding="UTF-8"?><wps:Execute version="1.0.0" service="WPS" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.opengis.net/wps/1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wcs="http://www.opengis.net/wcs/1.1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd">
        <ows:Identifier>JTS:buffer</ows:Identifier>
        <wps:DataInputs>
          <wps:Input>
            <ows:Identifier>distance</ows:Identifier>
            <wps:Data>
              <wps:LiteralData>2</wps:LiteralData>
            </wps:Data>
          </wps:Input>
          <wps:Input>
            <ows:Identifier>quadrantSegments</ows:Identifier>
            <wps:Data>
              <wps:LiteralData>10</wps:LiteralData>
            </wps:Data>
          </wps:Input>
          <wps:Input>
            <ows:Identifier>capStyle</ows:Identifier>
            <wps:Data>
              <wps:LiteralData>Round</wps:LiteralData>
            </wps:Data>
          </wps:Input>
        </wps:DataInputs>
        <wps:ResponseForm>
          <wps:RawDataOutput mimeType="application/wkt">
            <ows:Identifier>result</ows:Identifier>
          </wps:RawDataOutput>
        </wps:ResponseForm>
      </wps:Execute>

   Take a look at this request, and see how all of the input parameters (including the input geometry) have been encoded into the XML request.

#. Click :guilabel:`Execute request`. Here is the result::

     POLYGON ((2 0, 1.9753766811902755 -0.3128689300804617, 1.902113032590307 -0.6180339887498948, 1.7820130483767358 -0.9079809994790935, 1.618033988749895 -1.1755705045849463, 1.4142135623730951 -1.414213562373095, 1.1755705045849463 -1.618033988749895, 0.9079809994790937 -1.7820130483767356, 0.6180339887498949 -1.902113032590307, 0.3128689300804618 -1.9753766811902755, 0.0000000000000001 -2, -0.3128689300804616 -1.9753766811902755, -0.6180339887498947 -1.9021130325903073, -0.9079809994790935 -1.7820130483767358, -1.175570504584946 -1.618033988749895, -1.414213562373095 -1.4142135623730951, -1.6180339887498947 -1.1755705045849465, -1.7820130483767356 -0.9079809994790937, -1.902113032590307 -0.618033988749895, -1.9753766811902753 -0.312868930080462, -2 -0.0000000000000002, -1.9753766811902755 0.3128689300804615, -1.9021130325903073 0.6180339887498946, -1.7820130483767358 0.9079809994790934, -1.618033988749895 1.175570504584946, -1.4142135623730954 1.414213562373095, -1.1755705045849465 1.6180339887498947, -0.9079809994790938 1.7820130483767356, -0.6180339887498951 1.902113032590307, -0.3128689300804621 1.9753766811902753, -0.0000000000000004 2, 0.3128689300804614 1.9753766811902755, 0.6180339887498945 1.9021130325903073, 0.9079809994790933 1.782013048376736, 1.1755705045849458 1.6180339887498951, 1.4142135623730947 1.4142135623730954, 1.6180339887498947 1.1755705045849467, 1.7820130483767356 0.9079809994790939, 1.902113032590307 0.6180339887498952, 1.9753766811902753 0.3128689300804622, 2 0))

   .. figure:: img/wps_bufferoutput.png

      Visualization of buffet result

Chaining processes
------------------

WPS has the ability to chain multiple process together, so that the output of one becomes the input to another. This is where the power of WPS really shows.

Here are some examples of some applications of chaining:

* Chaining a viewshed with a simplification and then a smoothing process on the resulting polygon.
* Overlaying a land use polygon coverage against a county coverage, then unioning all the resultant polygons of a certain type.
* Taking cell towers, buffering them by a radius depending on their signal strength and elevation, then unioning all the buffer polygons to determine a total area of coverage. 

.. todo:: This section needs a chained example.

Types of processes
------------------

There are two categories of processes in GeoServer's implementation of WPS:

#. JTS Topology Suite (primarily *geometry* operations such as buffer, centroid, contains, and touches)
#. Internal GeoTools/GeoServer processes (primarily *feature* operations such as bounds, clip, reproject, and import)

The benefit to the GeoServer-specific processes is that the data can already be on the server. In this way things can be set up such that the large data sets are stored on the server, and only the inputs and output are passed to and from the client. In fact, the output (which can itself be quite large) doesn't even need to be passed back to the client, as the output of a process can be stored on the server as a new layer (via the gs:Import process). So in most cases, large bandwidth is not required for large-scale processing.

Build your own process
----------------------

There is also the ability to define your own processes. The types of processes that are possible are virtually unlimited. The WPS spec only discusses the need for a process to have inputs and outputs, but doesn't specify what they are or how many of them (or what type) they are.

There are a few options through which you can build your own processes. If you're a Java developer, you're in luck, as you can build your classes right into GeoServer.

.. figure:: img/wps_javadev.png

   You could be a Java developer

If not, you can use something like GeoScript. GeoScript allows you to interact with GeoTools and all of its rich Java goodness within the context of your preferred scripting language, such as Python or JavaScript.

You can think of GeoScript as an interpretation layer to GeoServer.

GeoScript is beyond the scope of this workshop, but note that if you're comfortable in Python, JavaScript, you should be able to use GeoScript comfortably.

.. figure:: img/wps_geoscript.png

   Or you could use GeoScript
