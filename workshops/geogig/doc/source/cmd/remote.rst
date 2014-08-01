.. _cmd.remote:

Working with remote repositories
================================

We have so far only worked within a single repository. The benefits to working with GeoGig extend beyond this, to allow for the possibility of multiple/remote repositories.

A repository can be "cloned", and copy is just as "authoritative," at least in a technical sense, as the original. (Your workflow decides which, if any, becomes the "canonical" version.)

Cloning a remote repository
---------------------------

We created our own respotiory here, but it's just as common for someone else to have created tohe repository, with you being given instructions to work on it and modify it.

Let's say that the repo that we created was someone else's and we want to clone it to work on it. The process is quick, requiring only a new directory.

#. On a terminal, move one level up and create a clone:

   .. code-block:: console

      cd ..
      geogig clone repo repo_clone

   ::

      Cloning into 'repo_clone'...
      95%
      Done.

The clone is placed in the :file:`repo_clone` directory. If you move into that directory, it is a complete copy of the original repository, with all history.

.. todo:: Mention something about sparse/shallow clones?

Adding a remote repository
--------------------------

.. todo:: Unclear if it's even possible to be able to do pre-cloned repo.

.. todo:: If so, need to create repo.

To simulate a remote repository, there is an already-created copy of the workshop repository in the workshop ``data`` directory, called ``bikepdx_clone``. The repository contains the initial state of the data plus a single additional commit. Let's pretend that this work was done by one of our colleagues.

.. todo:: Add this pre-cloned repo as a remote

.. todo:: Pull the commit from the pre-cloned repo

.. todo:: Push our commits to this other pre-cloned repo

Now we have completed the process of sharing our commits between repositories.