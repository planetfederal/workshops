Review
======

* **Disk Quotas** must be enabled for GeoServer to correctly calcualte the size of a layer's caches.

* GeoWebCache adds special **HTTP repsonse headers** for the client.

* A cache can be built 'organically' or we can **seed** the cache ahead of time.

* If our cache has grown too big, we can **truncate** the cache.

* **WFS-T** requests will automatically remove tiles from the cache.

* If data has changed, we can **reseed** the cache with new tiles.
