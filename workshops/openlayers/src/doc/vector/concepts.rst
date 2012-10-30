.. _openlayers.vector.basics:

Working with Vector Layers
==========================

The base ``OpenLayers.Layer.Vector`` constructor provides a fairly flexible layer type. By default, when you create a new vector layer, no assumptions are made about where the features for the layer will come from. In addition, a very basic style is applied when rendering those features. Customizing the rendering style is addressed in an :ref:`upcoming section <openlayers.vector.style-intro>`. This section introduces the basics of vector data :ref:`formats <openlayers.vector.basics.format>`, the :ref:`protocols <openlayers.vector.basics.protocol>` used to read and write feature data, and various :ref:`strategies <openlayers.vector.basics.strategy>` for engaging with those protocols.

In dealing with vector layers and features, it is somewhat useful to consider a postal analogy. When writing a letter, you have to know some of the rules imposed by the postal service, such as how addresses are formatted or what an envelope can contain. You also have to know something about your recipient: primarily what language they speak. Finally, you have to make a decision about when to go to the post office to send your letter. Having this analogy in mind may help in understanding the concepts below.

.. _openlayers.vector.basics.format:

OpenLayers.Format
-----------------

The ``OpenLayers.Format`` classes in OpenLayers are responsible for parsing data from the server representing vector features. Following the postal analogy, the format you choose is analogous to the language in which you write your letter. The format turns raw feature data into ``OpenLayers.Feature.Vector`` objects.  Typically, format is also responsible for reversing this operation.

Consider the two blocks of data below. Both represent the same ``OpenLayers.Feature.Vector`` object (a point in Barcelona, Spain). The first is serialized as `GeoJSON <http://geojson.org>`_ (using the ``OpenLayers.Format.GeoJSON`` parser). The second is serialized as :abbr:`GML (OGC Geography Markup Language)` (using the ``OpenLayers.Format.GML.v3`` parser).

GeoJSON Example
```````````````

.. code-block:: javascript

    {
        "type": "Feature",
        "id": "OpenLayers.Feature.Vector_107",
        "properties": {},
        "geometry": {
            "type": "Point",
            "coordinates": [-104.98, 39.76] 
        }
    }

GML Example
```````````

.. code-block:: xml

    <?xml version="1.0" encoding="utf-16"?>
    <gml:featureMember 
        xsi:schemaLocation="http://www.opengis.net/gml http://schemas.opengis.net/gml/3.1.1/profiles/gmlsfProfile/1.0.0/gmlsf.xsd" 
        xmlns:gml="http://www.opengis.net/gml" 
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
        <feature:feature fid="OpenLayers.Feature.Vector_107" xmlns:feature="http://example.com/feature">
            <feature:geometry>
                <gml:Point>
                    <gml:pos>-104.98, 39.76</gml:pos>
                </gml:Point>
            </feature:geometry>
        </feature:feature>
    </gml:featureMember>

See the `vector formats
<http://openlayers.org/dev/examples/vector-formats.html>`_ example for a
demonstration of translation between a few OpenLayers formats.

.. _openlayers.vector.basics.protocol:

OpenLayers.Protocol
-------------------

The ``OpenLayers.Protocol`` classes refer to specific communication protocols for reading and writing vector data. A protocol instance may have a reference to a specific ``OpenLayers.Format``. So, you might be working with a service that communicates via HTTP and deals in GeoJSON features. Or, you might be working with a service that implements :abbr:`WFS (OGC Web Feature Service)` and deals in :abbr:`GML (OGC Geography Markup Language)`. In these cases you would construct an ``OpenLayers.Protocol.HTTP`` with a reference to an ``OpenLayers.Format.GeoJSON`` object or an ``OpenLayers.Protocol.WFS`` with a reference to an ``OpenLayers.Format.GML`` object.

Back on the postal analogy, the protocol is akin to the rules about how an envelope must be addressed. Ideally, a protocol doesn't specify anything about the format of the content being delivered (the post office doesn't care about the language used in a letter; ideally, they only need to read the envelope).

Neither protocols nor formats are explicitly tied to an ``OpenLayers.Layer.Vector`` instance. The layer provides a view of the data for the user, and the protocol shouldn't have to bother itself about that view.

.. _openlayers.vector.basics.strategy:

OpenLayers.Strategy
-------------------

Loosely speaking, the ``OpenLayers.Strategy`` classes tie together the layer and the protocol. Strategies deal with `when` to make requests for data (or `when` to send modifications). Strategies can also determine `how` to prepare features before they end up in a layer.

The ``OpenLayers.Strategy.BBOX`` strategy says "request new features whenever the map bounds are outside the bounds of the previously requested set of features."

The ``OpenLayers.Strategy.Cluster`` strategy says "before passing any new features to the layer, clump them together in clusters based on proximity to other features."

In creating a vector layer, you choose the mix: one protocol (typically) with a reference to one format, and any number of strategies. And, all of this is optional. You can very well create a vector layer `without` protocol or strategies and manually make requests for features, parse those features, and add them to the layer.

Having dispensed with the basics of formats, protocols, and strategies, we're ready to start :ref:`creating new features <openlayers.vector.draw>`.

