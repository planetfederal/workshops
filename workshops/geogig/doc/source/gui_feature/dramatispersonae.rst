The team
========

In this example, we will assume that the GIS deparment has an analyst who is tasked with planning a new regional trail. While there is no limit to the number of analysts that *could* be part of this workflow, we'll assume that we have a single persion, Betty, who will be gathering data in the field to plot the new route. This time we'll assume quality assurance will be done by the analyst, saving a more thorough quality check for the data manager. Betty will do her edits on a **working** branch. As before all the approved edits will be retained in the **master** branch.

Remotes
-------

In addition, to the **working** branch, Betty will need her own clone of the original repository.  We will use the **repo_gui** repository, treating it as a canonical copy of the data.

Whenever Betty wants to share her changes with the data manager, she will **push** the changes out to the original repository, and the data manager will be able to **pull** down these changes from the server for review in the **qa** repository. Once the edits are merged into **master**, the data manager will **push** the changes out to the central repository.

.. note:: In the real world, the two repositories (the server and Betty) would reside on different physical computers but for this exercise we will assume you are working on a single computer.

Recall that in GeoGig parlance, when we clone a repository, it is known as the *origin* of the clone; therefore, our clones will consider the server as their *origin*, meaning that they will not communicate directly with one another but only through the central server. As before our user will no longer modify the server repository directly: all changes will be made locally and then pushed to the server!
