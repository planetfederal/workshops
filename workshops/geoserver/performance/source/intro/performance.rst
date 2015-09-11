.. performance:

Performance
===========

This workshop is focused on performance. There are a number reasons why speed is desirable (getting the most value out of your infrastructure investment for one) but the primary motivation is simple - a better user experience.

With that in mind any performance optimisation should start by establishing a baseline, and working towards a goal. This workshop will cover a number of approaches to improving GeoServer performance, some of which are a lot more expensive (in time and/or money) than others. It is important to try each option with your your data to get a feel for how much improvement can be gained before proceeding in earnest. There is no sense spending more money on additional hardware if some simple tweaks to styling can meet your goals. By the same token there is no point to endless optimizing styles when your machine is memory or disk bound. 

Above all "keep your head up" and your goal in mind. Even though performance optimisation is lots of fun - we want to be sure to know when to stop!

Measure
-------

The *Usability* of an mapping application has a large influence on its success. The visuals (cartography) used to present information are important here, but consideration should also be given to performance concerns. The performance of an application can strongly influence user satisfaction, user productivity and ultimately what use the application is considered suitable for.

The infrastructure required to support a mapping application is also considered an initial cost (in hardware investment) and ongoing cost in terms of storage and bandwidth used. 

Teams are often asked to estimate infrastructure requirements for production, the tools we use here can also be used to that end.

Expressing common performance terms in terms of WMS:

* Throughput: number of Maps produced in a unit of time
* Performance: The time it takes to per Map
* Latency: Wait time before a client starts to receive a Map.
* Response time: time between initial request and when client has received the entire Map
* Capacity: Number of clients a WMS can support (while meeting a set performance)
* Scalability: Ability to increase capacity by adding more hardware
* Reliability: Length of time before GetMap request fails, or GeoServer crashes.
* Responsiveness: User experience of acting and then waiting for the application to respond.

Response Time
-------------

Responsiveness (above) is subjective (since it is the user experience) and holistic (since it includes the applications and the network). There are lots of tricks to increasing perceived response time, such as providing immediate user feedback even in cases where background processing will be needed.

To get a handle on the user experience side of performance is to think in terms of goals:

* Short response time between 2 and 5 seconds on a tile miss.
  
  This is a nice clear goal; and gives us a nice guide of when to stop performing milestones.

* Generating the tile set takes 20 hours and I get new data twice a day.

  The goal here is to get tile generation down to at least 12 hours.
  
* Users hitting refresh because their map client is taking too long to load a map.
  
  A definite goal for Interactive systems is to respond within 1-2 seconds to to user interaction. While this is a performance problem – it is also a problem with work flow and feedback. In the example above the map could be taking too long because the client is able to ask for too much detail in a map.

* Remote offices are unwilling to use our WMS due to slow network response time.

  In this case you will need to establish what an acceptable response time, making use of solutions such as a tile server and a caching proxy to bring information closer to the users in question.

Browser Developer Tools
-----------------------

Taking a quick look at a web application using browser debugging tools can provide insight into the performance characteristics. Often this "informal" testing will be enough to see of a performance optimisation is heading in the right direction.

* Firefox / Firebug
* Chrome / Developer Tools

Using the Network tab with an open layers client can give an idea of the timeliness of map rendering when working at different map zoom levels.

.. note:: Keep in mind that both these tools are invasive when active and will adversely affect client performance. For a less invasive approach consider applications such as Wireshark.

.. admonition:: Exercise
   
   Using Chrome:
   
   #. Open up Chrome and browse to your local GeoServer installation. This should be at http://localhost:8080/geoserver
   
   #. Select :guilabel:`Layer Preview` from the menu on the left.
   
   #. Scroll down to the bottom of the list and select the ``ne:basemap`` layer group, and choose the :guilabel:`OpenLayers` preview.
   
   #. After a short pause we should get a world map.
   
   #. Select :menuselection:`More Tools --> Developer Tools` and change to the :guilabel:`Network` tab.
   
   #. Click :guilabel:`Clear` if required, and then use the :guilabel:`+` to zoom in.
   
   #. The network tab shows all the requests made, dig into the details and determine the:
      
      * Latency
      * Response time
      
      .. figure:: img/chrome.png
         
         Chrome Developer Tools showing Network Use

.. admonition:: Exercise
   
   Using FireBug:
   
   #. Open up Chrome and browse to your local GeoServer installation. This should be at http://localhost:8080/geoserver
   
   #. Select :guilabel:`Layer Preview` from the menu on the left.
   
   #. Scroll down to the bottom of the list and select the ``ne:basemap`` layer group, and choose the :guilabel:`OpenLayers` preview.
   
   #. After a short pause we should get a world map.
   
   #. Select :menuselection:`Tools --> Web Developer --> Firebug --> Open Firebug` and switch to the  :guilabel:`Net` tab.
   
   #. Click :guilabel:`Enable` to start recording and :guilabel:`+` to zoom in.
   
   #. The network tab shows all the requests made, dig into the details and determine the:
      
      * Latency
      * Response time
      
      .. figure:: img/firefox.png
         
         Firefox with Firebug showing Network use

.. admonition:: Explore
   
   Things to try:
   
   * Hover over various parts of the the GET request that appears. You should be able to look at various information like the HTTP request made and a breakdown of the actions during the request.
   * You can also open up the request to see the HTTP Headers,
   * Play with OpenLayers, panning and zooming the map and querying the map.
     
     You should be able to pick up interesting variations in the responsiveness of the map server based on how complicated the rendering of the map is. For instance when zooming to a level that requests new information for the first time causes a longer than usual delay.

.. admonition:: Explore
   
   How does the behaviour of open layers differ when used with a tile server?
   
   #. Browse to the embedded GeoWebCache instance, available at http://192.168.225.128:8080/geoserver/gwc
   #. Find the preview for ``ne:basemap`` and compare both the responsiveness of the application, and the metrics you can record as a developer.
