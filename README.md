hsDocs [![npm version](https://badge.fury.io/js/hsdocs.svg)](https://badge.fury.io/js/hsdocs) [![Built with Grunt](https://cdn.gruntjs.com/builtwith.svg)](https://gruntjs.com/) [![NPM License](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://www.npmjs.com/package/hsdocs)
========

Helpful Scripts code documentation tool.

**hsDocs**  is a code documentation viewer for [Typescript](https://www.typescriptlang.org) projects.
It renders JSON documentation files as created by [typedoc](http://typedoc.org).

## Creating the Documentation DocSet
Follow the instruction for `typedoc` in commenting the code and set the `json` option to create a 
json file containing the documentation. See the Configuration section below for details.

In addition to the documented source files, `hsDocs` recognizes a special **`overview.ts`** file 
that will be displayed as a project overview. 
For this to work, `typedoc` requires the file to have two separate comment entries.
If the second comment is missing, `typedoc` will not generate a comment in the DocSet.

DocSets are shown as menu tabs across the top of the window. To include a DocSet in the menu, ensure that the 
corresponding documentation `.json` file is copied into the `data` folder inside the `hsDocs` staging location 
for the http server. Then edit the `index.json` file to include the documentation file name in the "docs" section. 

## Installation
Install `hsDocs` from `npm` the standard way:
> npm i hsdoc

Please see the [docs](https://helpfulscripts.github.io/hsDocs/docs/indexGH.html#!/api/hsDocs/0) for further documentation and examaples

Please report any issues and provide feedback.
 