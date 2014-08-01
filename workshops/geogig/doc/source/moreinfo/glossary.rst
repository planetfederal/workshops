.. _moreinfo.glossary:

Glossary
========

The following are terms commonly used when discussing GeoGig.

.. todo:: NEED MORE TERMS

.. glossary::
   :sorted:

   branch
     A history path containing its own timeline and list of commits. Using multiple branches allows for parallel development.

   master
     The default branch name. In a common workflow, branches are created from the master branch and then merged back in at a later time

   commit
     A snapshot of changes made to files in a repository. Commits have a timestamp, an author, a description, and contain a diff of the files changed.

   merge
     The process of combining commits from one branch onto another branch.

   checkout
     The process of switching to another branch.

   log
     The history of a repository. Contains a list of commits, unique IDs, and metadata about the committer.

   conflict
     A contradictory state of a repository. Usually caused by merging from different branches.
