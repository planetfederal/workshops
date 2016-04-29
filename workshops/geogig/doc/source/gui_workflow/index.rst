.. _gui_workflow:

QGIS Sample Workflow 1
======================

This section introduces a workflow using the QGIS GeoGig plugin that we introduced earlier. For our first example we will replicate the previous 'centralized' workflow done on the command line. Again we have a small GIS department with GIS analysts who need to work on the data simultaneously and a single data manager who serves as the 'gatekeeper' by reviewing all changes before they enter the product. This time we will use Betty and Joe as our GIS analysts, in charge of **review** and **updates** respectively.

  .. todo:: keep plugin workflows under same section or create separate sections? 

The second example will introduce a 'decentralized' workflow that would be suitable for GIS analysts who need to go into the field to collect data for a new feature. This time we only have data collectors and no data manager acting as 'gatekeeper'. Our data collectors will be in charge of quality control in this case.

.. toctree::
   :maxdepth: 2

   dramatispersonae
   setup
   edits
   qa
   branchupdate
   rejects
