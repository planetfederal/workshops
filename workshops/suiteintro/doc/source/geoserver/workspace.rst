.. _geoserver.workspace:

Creating a Workspace
====================

The first step in data loading is usually to create a Workspace.  This creates a virtual container for your project data. Multiple layers from multiple sources can be contained inside a workspace, with the provision that each layer name is unique within the workspace.

#. Navigate to the main :ref:`geoserver.webadmin` page.

#. Click on the :guilabel:`Workspaces` link on the left column, under :guilabel:`Data`.

   .. figure:: img/workspace_link.png
      :align: center

      *Click to go to the Workspaces page*

#. Click the :guilabel:`Add new workspace` link at the top center of the page.

   .. figure:: img/workspace_page.png
      :align: center

      *Workspaces page*

#. A workspace is comprised of a **Name** (also sometimes known as a "namespace prefix"), represented by a few characters, and a **Namespace URI**.  These two fields must uniquely identify the workspace.  Fill in the following information:

   .. list-table::
      :widths: 30 70

      * - :guilabel:`Name`
        - ``earth`` 
      * - :guilabel:`Namespace URI`
        - ``http://geoserver.org/earth``
      * - :guilabel:`Default workspace`
        - *Checked*

   .. figure:: img/workspace_new.png
      :align: center

      *Creating a new workspace*

#. When done, click :guilabel:`Submit`.

With our workspace created, we can load our data files.