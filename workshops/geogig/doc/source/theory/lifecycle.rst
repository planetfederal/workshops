.. _theory.lifecycle:

Lifecycle of versioned data
===========================

The following describes the lifecycle of data and what happens to it when it is versioned. There are any number of different workflows, so this will necessarily not reflect your work exactly. Nonetheless, it includes most of the basic tasks that users will want to encounter GeoGig.

* **Create a repository**: A repository is created. This is just a placeholder for where geospatial data will be able to be notionally stores. The repository is merely a directory on disk, and need not include the actual spatial data.

* **Import data**: Data is imported to the GeoGig repository.

  .. note:: For Git users, there is no equivalent to this step. Just copying files into the working directory is all that is necessary to "import" them.

* **Add data**: Initially, all the data is staged so as to be ready to be committed.

* **Commit data**: All data is committed to the repository as an initial snapshot.

* **Make changes**: Changes to spatial data can be made using any standard GIS tool. 

* **Import / add / commit data**: When the changes have been made, the process of importing, adding, and the committing is repeated. The new snapshot that is created is a "diff" of the changes made since the previous commit.

* **Create a branch**: When you wish to create a separate area for working on a project, without the commits affecting the main development workflow, a branch is created.

* **Make edits on the branch**: Edits can be made on one branch without affecting the other. For each snapshot to be made, it will be necessary to import / add / commit the data.

* **Merge branches**: When work is completed on the branch, the branch can be merged with the master branch (or any other branch) combining the work done on both.

* **Clone the repository**: Allow others to work on the data by cloning the repository. The other users will have to have access to the underlying data as well.

* **Push and pull changes with the clones**: Reflecting the distributed nature of the workflow, commits that you have made can be "pushed" to another cloned repository; likewise, commits from other repositories can be "pulled" to your repository.

* **Export data**: When the work is completed, or when a good stopping point has been reached (such as the time for a weekly snapshot), data can be exported to any number of data formats. Data can be exported based on any commit on any branch.

Optional:

* **Manage conflicts**: When two commits cause the data to be in a conflicted (contradictory) state, the conflict will need to be resolved before the process can continue. You can choose between the current local state ("ours"), the current remote state ("theirs") or a custom resolution that could be a combination.

