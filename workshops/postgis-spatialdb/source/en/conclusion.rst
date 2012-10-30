.. _conclusion:

Conclusions
===========

We have now looked at several small applications that tie spatial database functionality to web front ends. Here are a few things to take away:

1. **Your technology choices are plentiful.** There are lots of different spatial databases that have enough features to serve as a spatially intelligent back-end. There are lots of different scripting and programming languages you can use to build a web API to your spatial SQL queries.
2. **You do not need a "spatial middleware".** All the spatial smarts you need for most questions already exists in your database. You need some kind of middleware (or scripting language) to bridge the gap between the web and your database, but it does not need to be "spatial" in any way.
3. **Spatial SQL is a powerful tool for answering questions with location.** Compare the amount of code necessary to answer a question with spatial SQL to that required to script up processes using GIS tools. Spatial SQL wins every time.
4. **Spatial SQL is a re-usable skill.** No matter whether you learn your spatial SQL on PostGIS, Oracle or SQL Server, the problem solving habits you pick-up will be transferable to other databases, with minimal extra effort. 
5. **Standard formats and protocols are good.** Using formats like GeoJSON, KML and GML, and protocols like WMS allow you to easily bind your database to other standards-based systems like OpenLayers and get your data out easily.
