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

## Usage
1. Create a web-app directory to serve the docsets from. As an example, 
see the `docs` folder in this project's [Github page](https://github.com/HelpfulScripts/hsDocs/tree/master/docs), 
which serves the [Github IO pages for this project](https://helpfulscripts.github.io/hsDocs/#!/api/hsDocs/0)

2. Copy the `index.html` file from [Github](https://github.com/HelpfulScripts/hsDocs/tree/master/docs), 
or create a new **`index.html`** as follows. This will use the `GitHub`-hosted version of `hsDocs`:
```
<html>
   <head>
      <link href="https://helpfulscripts.github.io/hsDocs/hsDocs.css" rel="stylesheet" />
   </head>
   <body class='hs-layout-fill'>
      <script src="https://helpfulscripts.github.io/hsDocs/hsDocs.min.js"></script>
    </body>
</html>
```

2. Alternatively you can use a self-hosted hsDocs version. Copy the `hsDocs` runtimes 
(`hsDocs.js`, `hsDocs.min.js`, `hsDocs.css`, `hsDocs.css.map`) from
[Github](https://github.com/HelpfulScripts/hsDocs/tree/master/docs) into the directory and 
modify `index.html` as follows:
```
<html>
   <head><link href="hsDocs.css" rel="stylesheet" /></head>
   <body class='hs-layout-fill'>
      <script src="./hsDocs.min.js"></script>
   </body>
</html>
```

3. Create a subdirectory **`data`** and copy the docsets into it, for example **`hsDocs.json`** or your project's `.json` .
See below for creating the docset.

4. Create a list of docsets to render in a new file **`index.json`** inside **`data`**:
```
{   "docs": [
        "hsDocs.json",
        ...
    ],
    "title": "HS Libraries"   // will be displayed at the top left corner
}
```

5. Point a browser to the web-app directory


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
            json:   `docs/data/myLib.json`,
            mode:   'modules',
            name:   `myLib`
        },
        src: ['src/**/*.ts', '!src/**/*.*.ts'] // all .ts files, no specs
    }
}
```

Please see the [docs](https://helpfulscripts.github.io/hsDocs/#!/api/hsDocs/0) for further documentation and examples

Please report any issues and provide feedback.
 