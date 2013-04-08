.. _geoserver.data.workspace:

Adding a workspace
==================

The first step in data loading is usually to create a :term:`workspace`. This creates a virtual container for your project. Multiple layers from multiple sources can all be contained inside a workspace, with the primary constraint being that each layer name be unique.

#. Navigate to the main :ref:`geoserver.webadmin` page.

#. Click on the :guilabel:`Workspaces` link on the left column, under :guilabel:`Data`.

   .. figure:: img/workspace_link.png

      Click to go to the Workspaces page

#. Click on the "Add new workspace" link at the top center of the page.

   .. figure:: img/workspace_page.png

      Workspaces page

#. A workspace is comprised of a **Name** (also sometimes known as a "namespace prefix"), represented by a few characters, and a **Namespace URI**. These two fields must uniquely identify the workspace. Fill in the following information:

   .. list-table::
      :widths: 30 70

      * - :guilabel:`Name`
        - ``earth`` 
      * - :guilabel:`Namespace URI`
        - ``http://earth``
      * - :guilabel:`Default workspace`
        - *Checked*

   .. figure:: img/workspace_new.png

      Creating a new workspace

#. When done, click :guilabel:`Submit`.

   .. figure:: img/workspace_created.png

      New earth workspace created

With our new workspace created and ready to be used, we can now start loading our data.
