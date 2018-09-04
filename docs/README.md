hsDocs 
========
[![npm version](https://badge.fury.io/js/hsdocs.svg)](https://badge.fury.io/js/hsdocs) 
[![Build Status](https://travis-ci.org/HelpfulScripts/hsDocs.svg?branch=master)](https://travis-ci.org/HelpfulScripts/hsDocs)
[![Coverage Status](https://coveralls.io/repos/github/HelpfulScripts/hsDocs/badge.svg?branch=master)](https://coveralls.io/github/HelpfulScripts/hsDocs?branch=master)
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.svg)](https://gruntjs.com/) 
[![NPM License](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://www.npmjs.com/package/hsdocs)

Helpful Scripts code documentation tool.

**hsDocs**  is a code documentation viewer for [Typescript](https://www.typescriptlang.org) projects.
It renders JSON documentation files, as created by [typedoc](http://typedoc.org), into html pages that can be viewed via browser. [This example](https://helpfulscripts.github.io/hsDocs/#!/api/hsDocs/0) shows the rendered docset for the hsDoc code itself.

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
> `npm i hsdocs`

## Typedoc configuration
Below is an example configuration for use with `grunt` and [`grunt-typedoc`](https://www.npmjs.com/package/grunt-typedoc): 
```
typedoc: {
    code: {
        options: {
            target: 'es6',
            module: 'commonjs',
            moduleResolution: "node",
            json:   `_dist/docs/data/myLib.json`,
            mode:   'modules',
            name:   `myLib`
        },
        src: ['src/**/*.ts', '!src/**/*.*.ts'] // all .ts files, no specs
    }
}
```

## Hosting the docs
Install `hsDocs`from npm (see above), then copy and host the entire folder in your favorite web server.
To add a new docset, 
1. copy the docset's `json` file created by `typedoc` into the `data` folder of the hsDocs directory
2. edit `./data/index.json` to add a reference to the new `json`file (`myLib.json` in the typedoc config example above).
3. reload the browser. The new docset should appear as a tab across the top

Please see the [docs](https://helpfulscripts.github.io/hsDocs/#!/api/hsDocs/0) for further documentation and examples

Please report any issues and provide feedback.
 