# Contributing guide

## To create a new version
* Update the version in `bower.json`.
* Run `gulp` to compile production files in the `dist/` directory.
* Commit your changes and the `dist/` folder.

## To publish a new version (for repo owners and collaborators only)
* Run `npm version x.x.x`: this will create a new commit and tag it.
* Run `git push origin master vx.x.x`.
* You're done!

## To add an icon

You have to respect some rules when you plan to add an icon in anyfetch-assets (such as a provider icon):

* Use SVG format (Inkscape is preferred).
* Set your canvas size to 512*512px, and draw your icon centered. (in Inkscape: File > Document Properties > Custom dimensions). You icon must fill the canvas.
* Generate a grayscale icon if needed. (in Inkscape: Select All, then Filters > Color > Desaturate). Save it as `filename_grayscale.svg`
* Run `gulp` to minimise your svg in the `dist/` directory, but as this process can be destructive, be sure to check if your icon is not broken in a web browser.
If others icons are modified in the process (`git diff`), ensure they are not broken too.
* Commit your changes *and* the `dist/` folder, and follow instructions described in the first section of this CONTRIBUTING.
