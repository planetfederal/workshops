.. _introduction:

Spatial analysis
================

Spatial analysis is the study of data with spatial characteristics, such as shape and location, with the goal of answering specific questions. The types of questions that we can answer with spatial analysis range from the very simple, "What is the largest country?", to the extremely complex, requiring large amounts of data and a large amount of computing power. 

The analysis of spatial data often, but not always, intersects with the analysis of *non-spatial* data to accomplish the research goal. Likewise, the product or results of the spatial analysis may be presented in the form of spatial data, such as a map, or it may be presented in a non-spatial format, such as a table or text.

In computing, spatial analysis can be performed on a client, a server or a database; in this workshop, we will be concentrating on client-side analysis and processing of spatial data using QGIS, which is a desktop application.

Spatial functions
-----------------

The key to performing spatial analysis will be using a set of functions for analyzing geometric components, determining spatial relationships and manipulating geometries. These spatial functions serve as the building block for any spatial processing task.

The majority of all spatial functions can be grouped into one of the following categories:

#. **Conversion**: Functions that *convert* between geometries and external data formats. 
#. **Retrieval**: Functions that *retrieve* properties and measurements of a geometry. 
#. **Comparison**: Functions that *compare* two geometries with respect to their spatial relation. 
#. **Generation**: Functions that *generate* new geometries from others.
