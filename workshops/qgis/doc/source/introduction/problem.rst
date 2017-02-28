The problem
===========

The analytical goal of this workshop will be to take spatial data describing the physical geography of Wyoming and see how it correlates with seasonal land usage patterns of antelopes in the state. We want to find out if there is a connection between how antelope use the land and characteristics such as elevations, geology and land cover.

The data
--------

We will be using a collection of vector and raster data throughout the course of this workshop.

The `Wyoming Game and Fish Department <http://wgfd.wyo.gov/web2011/wildlife-1000819.aspx>`_ provides some good vector data files on the land usage patterns of a number of species in the state.

Next, we will use some data from the `Wyoming State Geological Survey <http://www.wsgs.uwyo.edu/data/gis/Geology.aspx>`_ to give us an idea of the geological character of the state.

The `Wyoming Geographic Information Science Center <http://www.uwyo.edu/wygisc/geodata/>`_ provides elevation models and soil maps of the state that we can use to further analyse the antelope ranges.

The `USGS National Gap Analysis Program <http://gapanalysis.usgs.gov/gaplandcover>`_ provides land cover data.

In total, for this workshop, we will need the following files:

* `Herd units <http://wgfd.wyo.gov/web2011/Departments/Wildlife/docs/zipfiles_biggame/Antelope_HuntAreasHerdUnits.zip>`_
* `Seasonal range <http://wgfd.wyo.gov/web2011/Departments/Wildlife/docs/zipfiles_biggame/Antelope_SeasonalRange.zip>`_
* `Surficial 500k <http://www.wsgs.uwyo.edu/data/gis/shapefiles/surgeol_500k.zip>`_
* `Digital elevation model for Wyoming 90 meter <http://geospatialhub.org/geohubdata/data/elevation/dem_90m.zip>`_
* `Digital soils map of Wyoming <http://geospatialhub.org/geohubdata/data/geology/soils100k.zip>`_
* `Wyoming land cover data <https://gis1.usgs.gov/csas/gap/viewer/land_cover/Map.aspx>`_

Preparation
^^^^^^^^^^^

#. Create a new ``qgis`` directory where we will hold all of our data and project files.

#. Create ``data``, ``downloads``, ``reference``, ``results`` and ``temp`` directories inside ``qgis``.

#. Download the data files into ``qgis/downloads``.

#. Most of the files you download can be used directly in QGIS. However, the ``surgeol_500k.zip`` and ``soil500k.zip`` files have the data inside an extra sub-directory, so unzip them both inside ``qgis/downloads``. We also need to unzip the ``gaplandcov_wy.zip`` archive into the downloads directory.
