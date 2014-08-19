.. _moreinfo.glossary:

Glossary
========

The following are terms commonly used when discussing GeoGig.

.. glossary::
   :sorted:

   branch
     History path containing its own timeline and list of commits. Using multiple branches allows for parallel development.

   master
     Default branch name. In a common workflow, branches are created from the master branch and then merged back in at a later time

   clone
     Copy of a repository. While a clone is made from an existing repository, there is no hierarchy between them.

   commit
     A snapshot of changes made to files in a repository. Commits have a timestamp, an author, a description, and contain a diff of the files changed.

   merge
     Combines commits from one branch onto another branch.

   checkout
     Switches to another branch.

   log
     History of a repository, containing a list of commits, unique IDs, and metadata about the committer.

   conflict
     Contradictory state of a repository. Usually caused by merging from different branches.

   diff
     Shows specific differences between two commits. Can also contain commits included between them on the timeline. 

   show
     Displays details about a single commit.

   reset
     Manages history and allows for "rolling back" commits.

   timeline
     The history of commits over time.

   import
     Loads information about a data source (such as a shapefile or database) into a GeoGig repository.

   export
     Loads information about a repository into a data source, such as a shapefile or database.

   push
     Process to send commits and branches to remote repository

   pull
     Process to receive commits and branches from a remote repository

   fetch
     See :term:`pull`.

   remote
     Other repository that is linked to the current repository. Repositories that linked as remotes can execute a pulls or pushes to each other.
