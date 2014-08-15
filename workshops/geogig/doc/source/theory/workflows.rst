.. _theory.workflows:

Common GIS workflows
====================

.. todo:: Figures for these scenarios needed

There are many ways that organizations work with geospatial data. In this section we'll highlight two typical workflows.

Centralized GIS department
--------------------------

In this workflow, there is a person or group in charge of vetting all changes to data (the "authority"). Other users can make changes, at home or in the field, and submit them to the authority, which determines whether the changes are able to go into the official repository. This is the "traditional" way that large GIS departments operate.

GeoGig supports this workflow. In this scenario, one person or group would have "commit rights" to the repository, while others can clone the repository, make commits there, and send the "diff" to the authority for vetting. 

.. todo:: Is this correct?

.. note:: We'll discuss the terms in greater detail later on.

Decentralized data collection
-----------------------------

In contrast to the above, consider a situation where multiple users are in the field doing data collection. No central authority exists; there are only the collectors.

GeoGig supports this workflow as well. In this scenario, each collector would have a cloned repository, which they would have ownership of and make changes to. These collector can, at their discretion, "pull" changes from other collectors to their own repository.

Choose your own
---------------

Being a decentralized platform, there are many ways that you can use GeoGig to manage your geospatial data. You have the flexibility to choose what works for your team, and even let the decision evolve over time, as you are not locked into any one workflow.

