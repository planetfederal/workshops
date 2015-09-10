.. jvm:

***********************
Java Performance Tuning
***********************

The first set of optimisations we will work on is fine tuning the Java Virtual Machine.

When installing C/C++ applications on Linux you are often given a chance to fill in configuration information allowing the application to fine tuned to the specific hardware you are running on. The supported build options vary from application to application turing system administration into quite an art.

By contrast Java applications are run by a Java Virtual Machine (JVM). A JVM sets up an an imaginary computer `defined <https://docs.oracle.com/javase/specs/jvms/se7/html/index.html>`__ by a specification). The initial advantage was one of application portability - allowing you your choice of computing hardware for running GeoServer.

Today we are going to focus on two secondary "performance" advantages:

* Java applications are compiled on the fly (using a just in time compiler) - we can control these settings providing amazingly deep control over how GeoServer operates.
* Memory management - GeoServer consuming huge quantities of data during its operation but does not hold on to it in memory. By fine tuning the JVM's memory management to match this unusual workload we can get better performance.

.. note:: Technically GeoServer is a Java Enterprise Edition "Web Application". An application server (such as Tomcat or Jetty) is run as a Java application. The application server is responsible for deploying web applications, handling HTTP requests and routing them to the appropriate application as required.
  
  With this in mind much of our JVM configuration will take place by modifying Jetty or Tomcat configuration files.