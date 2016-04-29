The team
========

In this example, we will assume that the GIS deparment has a number of analysts who are tasked with updating the data product independently of their colleagues. While there is no limit to the number of analysts that *could* be part of this workflow, we'll assume that we have `Alice and Bob <http://en.wikipedia.org/wiki/Alice_and_Bob>`_ who will be working simultaneously, but at their own pace. There will also be a faceless data manager (you!) who will review Alice and Bob's work and be responsible for merging all their edits into the "master" copy of the product. Because Alice and Bob will be working independently, they will do their edits on separate branches in the repository (we'll name the branches **alice** and **bob**) and all the approved edits will be retained in the **master** branch.

.. figure:: img/flow.png

   GeoGig workflow

When requested, the GIS department will be able to export a copy of the state of the repository to a PostGIS database, shapefile or another format. Moreover, the GIS department will be able to export *historical* versions of the data, so if someone wants to know the state of the maps at a particular point in time, the team can checkout that particular version and export it. Likewise, the data manager, in performing quality assurance tasks before merging any of Alice's or Bob's work, will be able to export the data for review in QGIS before merging it into **master**.

Remotes
-------

In addition, to having three branches, each of our team members will need their own clones of the original repository, which we will put on one of the organisation's servers and we will treat as the canonical copy of the data.

Whenever Alice or Bob want to share their changes with the data manager, they will **push** their changes out to the original repository, and the data manager will be able to **pull** down these changes from the server for review. Once the edits are merged into **master**, the data manager will **push** the changes out to the central repository.

.. note:: In the real world, the four repositories (the server, Alice, Bob and the data manager) would all reside on different physical computers but for this exercise we will assume you are working on a single computer. However, you are free to use multiple computers to simulate the workflow, or even practise with colleagues playing the roles of Alice, Bob and the data manager!

Recall that in GeoGig parlance, when we clone a repository, it is known as the *origin* of the clone; therefore, all three of our clones will consider the server as their *origin*, meaning that they will not communicate directly with one another but only through the central server. Most importantly, our users will no longer modify the server repository directly: all changes will be made locally and then pushed to the server!
