.. service:

*********************
Service Configuration
*********************

As a middleware application GeoServer is responsible for for communicating with clients using a number of OGC Service protocols.

In this section we are going to talk about two key locations on disk.

* *GEOSERVER_DATA_DIRECTORY*: used to store configuration files on disk. In many cases we will be able to use the configuration user interface directly; however knowing how this is laid out will assist in the few cases where a configuration UI is not available. ::
   
   coverages/
   demo/
   gwc/
   gwc-layers/
   featureTypes/
   logs/         <-- logging profile (and main geoserver log file)
   palettes/     <--- we will be making use of this later
   security/
   styles/
   templates/
   user_projections/
   workspaces

* :file:`webaps` : folder used by Jetty and Tomcat application server to stage web applications for publication. ::

   webapps/
     geoserver/
       WEB-INF/
         web.xml <-- key manual configuration file
         lib/ <-- folder used to manually install extensions
         
Logging
=======

Quick Fix: When GeoServer was first profiled we were in for a shock- by default GeoServer thinks it is an application for producing really long log files. Indeed that is where is was spending a lot of its time.

GeoServer provides several logging profiles and you can add your own::

   log4j.rootLogger=WARN, geoserverlogfile, stdout

   log4j.appender.stdout=org.apache.log4j.ConsoleAppender
   log4j.appender.stdout.layout=org.apache.log4j.PatternLayout
   log4j.appender.stdout.layout.ConversionPattern=%d{dd MMM HH:mm:ss} %p [%c{2}] - %m%n


   log4j.appender.geoserverlogfile=org.apache.log4j.RollingFileAppender

   # Keep three backup files.
   log4j.appender.geoserverlogfile.MaxBackupIndex=3

   # Pattern to output: date priority [category] - message
   log4j.appender.geoserverlogfile.layout=org.apache.log4j.PatternLayout
   log4j.appender.geoserverlogfile.layout.ConversionPattern=%d %p [%c{2}] - %m%n

   log4j.category.log4j=FATAL

   log4j.category.org.geotools=WARN
   log4j.category.org.geotools.factory=WARN
   log4j.category.org.geoserver=WARN
   log4j.category.org.vfny.geoserver=WARN

   log4j.category.org.springframework=WARN

   log4j.category.org.geowebcache=ERROR

These logging profiles provide fine grain control over messages from internal GeoServer components. As an example the line ``log4j.category.org.geoserve=WARN`` quiets all GeoServer messages .. except warnings.

.. admonition:: Quickfix

   #. Navigate to :menuselection:`Settings --> Global`.
   #. Change Logging Profilefrom DEFAULT_LOGGING to PRODUCTION_LOGGING

Service Strategy
================

Tuning: GeoServer has a few strategies for returning output to the client. The following is a list of the strategies with descriptions taken from the GeoServer manual.

* SPEED: Serves output right away. This is the fastest strategy, but proper OGC errors are usually omitted.
  
  .. warning:: This should really be called DIRECT (matching what it does) as other stratagies such as partial-buffer can perform better.
  
* BUFFER: Stores the whole result in memory, and then serves it after the output is complete. This ensures proper OGC error reporting, but delays the response quite a bit and can exhaust memory if the response is large.
  
* FILE: Similar to BUFFER, but stores the whole result in a file instead of in memory. Slower than BUFFER, but ensures there won’t be memory issues.

* PARTIAL-BUFFER: A balance between BUFFER and SPEED, this strategy tries to buffer in memory a few KB of response, then serves the full output. 

The SPEED strategy is risky (it has the chance of failing to produce error message) but reduces latency.

For a less risky option you could consider “PARTIAL_BUFFER”; it will hold the response in memory (until it gets too big). This gives GeoServer a chance to return error messages; while still directly returning large content.

The other options “BUFFER” and “FILE” have no risk; but considerably impact performance response (and memory).

Service strategies are configured in the web.xml file for GeoServer.

.. admonition:: Exercise
   
   Next we'll try setting the strategy to “SPEED”.
   
   1. Open a terminal and edit the GeoServer web.xml file, you may need to edit as an administrator or sudo.
   2. Search for “serviceStrategy” - you should see that it's almost at the top of the file.
   3. Change change the service strategy to “SPEED”
   4. Save and quit.
   5. Restart tomcat and retest

.. admonition:: Explore
   
   #. Undo the strategy change and retest.
   #. Which one is faster - and why?
