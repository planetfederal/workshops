Seeding
=======

Thus far, our caches have been built up "naturally" as requests have arrived and GeoWebCache has requested images from the backing WMS server. For performance reasons, however, it may be desirable to pre-generate, or :term:`seed <seed>` the cache with tiles. 

The GeoWebCache web interface can initiate a seeding job for the gridsubsets associated with each tiled layer.

.. figure:: images/seed-task.png

   Launching seed task

When launching the seed task, the user can select a zoom range and a bounding box outside which no tiles will be generated.

.. note:: If a seed job is triggered with :guilabel:`Zoom start` or :guilabel:`Zoom stop` set to values outside the gridsubset's cached zoom range, the seed job will fail.

.. warning:: Extreme caution must be taken when initiating seed jobs, since the number of tiles at high zoom levels will be extremely large. By default, the web interface is set to stop seeding at zoom level 15, but even at this level, the ESPG:4326 gridset has more than two billion tiles!

Reseeding
---------

In addition to generating non-existing tiles (seeding), existing tiles may be updated by :term:`reseeding <reseed>` the cache. Reseeding is useful when the underlying data is dynamic and the rendered tiles need to be themselves regenerated.

Reseed operations are triggered in the same location as seeding, by changing the :guilabel:`Type of operation` from the default :kbd:`Seed - generate missing tiles` to :kbd:`Reseed - regenerate all tiles`.

Jobs
----

If the backing WMS server is sufficiently powerful, we can tell GeoWebCache to use more than one job to make requests in order to complete the seeding in less time. 

The exact number selected here will depend on the number of CPUs on the server and how much load we are willing to put it under. For servers already in production, we would likely want to limit the number of jobs. 

.. admonition:: Exercise

   #. Click :guilabel:`Tile Layers`.
  
   #. Click :guilabel:`Empty` for ``opengeo:countries``.
  
   #. Click :guilabel:`Seed/Truncate` for ``opengeo:countries``. The seeding interface will open in new tab or window.
  
   #. Change the :guilabel:`Number of tasks to use` to :kbd:`04`.
  
   #. Change the :guilabel:`Gridset` to :kbd:`EPSG:900913`.
  
   #. Change the :guilabel:`Zoom start` to :kbd:`04`.
  
   #. Change the :guilabel:`Zoom stop` to :kbd:`12`.
  
   #. Click :guilabel:`Submit`. The list of running seed jobs will open.
  
      .. figure:: images/seed-task-list.png
     
         List of running tasks

   #. Watch the seed process for a while. (Click :guilabel:`Refresh list` to update the page.)
  
   #. Click :guilabel:`Kill Task` next to each process to stop each running task.
