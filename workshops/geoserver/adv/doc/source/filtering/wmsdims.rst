.. _gsadv.filtering.wmsdims:

WMS dimensions
==============

This section discusses WMS dimensions. WMS dimensions are specially-handled parameters taken from attributes in a data set and utilized in WMS requests. The two dimensions handled are **time** and **elevation**.

Time is a perfect candidate for special handling, as the strings themselves can be quite complex, and there are so many different representations of time to manage. The filters that would need to be created to manage these different representations would be quite cumbersome.

For example, the following are both equally valid time representations::

  1974-05-01T10:06:21.000Z
  1974-05-01
  1974-05
  1974

.. note:: Times are expressed in compliance with the `ISO 8601 <http://www.w3.org/TR/NOTE-datetime>`_ standard.

Elevation, while less complicated to work with than time, is nevertheless a fundamental concept in geographical work, and one that complements the often 2D nature of data.

Version 1.1.0 of the WMS spec introduced the notion of time and elevation dimensions to WMS. Spatial data had always had time/date fields and attributes that represented feature elevations, but WMS lacked a decent mechanism for realizing that information.

Enabling WMS dimensions on a layer
----------------------------------

.. todo:: This section requires converting the globe layer to have a proper time attribute.

GeoServer lets us access this feature of the WMS specification by allowing us to enable time and elevation dimensions on a given layer that has suitable attribute types. For example, to enable time on a layer, one attribute must be of type *timestamp*, while to enable elevation, an attribute need only to be a *numeric* field.

This enabling of dimensions is done on a per-layer basis. Enabling either time, elevation, or both is allowed.

.. note:: As the requirements for elevation are so lenient, it is possible to utilize the benefits of the elevation parameter on an attribute that has nothing to do with elevation. However, the parameter's name cannot be changed from ``elevation=``.

Let's enable the time dimension on one of our layers. We'll use the ``advanced:globe`` layer for this.

#. In the Layer list (not Layer Preview) select the :guilabel:`advanced:globe` layer for configuration editing.

#. There are four tabs across the top of the screen. Click the tab that says :guilabel:`Dimensions`.

#. Because our data has a timestamp field we have the option to enable the Time dimension. Likewise we need a numeric field to enable the elevation dimension. (If we didn't have a field with a date/time format, this option would have been disabled. Most but not all tables will have a numeric field, so elevation is typically enabled, but not always.)

#. Check the box to enable the Time dimension.

#. Select the ``measured_at`` field as the :guilabel:`Attribute` that contains our timestamps.

#. Leave the :guilabel:`End Attribute` blank.

#. Set the :guilabel:`Presentation Type` to :guilabel:`List`.

#. Click :guilabel:`Save`.

Query string formats
--------------------

Now that the layer has a properly enabled Time dimension, it is possible to make queries against that value.

At single point in time::

  &time=2010-12-30T08:00:00.000Z

Between a range of times::

  &time=2010-12-25T00:00:00Z/2010-12-28T00:00:00Z

Discrete time periods::

  &time=2010-12-30T08:00:00Z,2010-12-25T08:00:00Z

Or multiple time periods::

  &time=2010-12-30T08:00:00Z,2010-12-25T08:00:00Z/2010-12-28T08:00:00Z

To test this, open a layer preview on the time-enabled globe layer

::

  http://localhost:8080/geoserver/wms/reflect?layers=advanced:globe&format=application/openlayers

Click on some points to identify them. Notice anything strange?

The data covers an entire year, but you're only seeing points at each station for a few dates. The reason for this is that a GetMap request that omits the time dimension parameter shows *only the maximum value* for that layer. In this case, the most recent time value.

In this data set, the features span a given time period (2010), are measured daily, and always at local solar noon. So we know the interval and resolution of the data.

With that in mind, a specific time value can be specified::

  http://localhost:8080/geoserver/wms/reflect?layers=globe&format=application/openlayers&time=2010-12-01

Now click on a few point to confirm that this request filtered points by that given day.

Similarly, this request will show all features within this range of dates::

  http://localhost:8080/geoserver/wms/reflect?layers=globe&format=application/openlayers&time=2010-12-25T00:00:00Z/2010-12-28T00:00:00Z

Or discontinuous periods::

  http://localhost:8080/geoserver/wms/reflect?layers=globe&format=application/openlayers&time=2010-12-30T08:00:00Z,2010-12-25T08:00:00Z/2010-12-28T08:00:00Z

Capabilities documents with dimensions enabled
----------------------------------------------

When dimensions are enabled (either time or elevation), the WMS capabilities document will expresses the possible values for dimensioned layers.

#. Open the WMS 1.3.0 capabilities document::

     http://localhost:8080/geoserver/ows?service=wms&version=1.3.0&request=GetCapabilities

#. Find the globe layer and take a look at the ``<Dimensions>`` tag. 

   .. warning:: LOOK AT XML

Precision of values
-------------------

A parameter that is fully precise::

  &time=1945-05-07T02:42:00.000Z

will return features that contain a timestamp at this exact value only.

A parameter that is imprecise::

  &time=1980-12-08

will return all of the features whose timestamp match that date, regardless of time.

Both values, and many others of varying precision, are all ISO 8601 compliant and are thus valid for use in requests.

Validity checking
-----------------

Values that are not ISO 8601 compliant when used in requests, will cause errors.

For example, try these two requests::

  http://localhost:8080/geoserver/wms/reflect?layers=shadedrelief,globe&format=application/openlayers&time=2010-12-30T

  http://localhost:8080/geoserver/wms/reflect?layers=shadedrelief,globe&format=application/openlayers&time=sammy

