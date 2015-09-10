.. encode:

******
Encode
******

Up until now we have been focusing on half the work GeoServer WMS does. If we go back to our rendering chain the last step was drawing an Image. So what else could I possibly be talking about?

I am talking about what happens after we have an Image. We need to encode that image (into a file format) and send it back to the client.

Unsurprisingly this can be a lot of work, what kind of work could take so much time?

* Image formats like JPEG perform compression taking the entire image into account, often iterating again and again over detailed sections.
* Even formats like PNG that are easier to read can take some time to encode. When working with PNG8 the entire image is examined in order to determine the "best" color palette.

Although we are going to focus on performance, keep in mind the balance between how expensive it is to encode a file (more CPU time can produce a small file) and how expensive it is to transmit and store a file.