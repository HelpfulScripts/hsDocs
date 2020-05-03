hsDocs 
========
[![npm version](https://badge.fury.io/js/hsdocs.svg)](https://badge.fury.io/js/hsdocs)
[![GitHub](https://img.shields.io/badge/GitHub-hsDocs-blue.svg)](https://github.com/helpfulscripts/hsdocs)
[![docs](https://img.shields.io/badge/hsDocs-hsDocs-blue.svg)](https://helpfulscripts.github.io/hsDocs/#!/api/hsDocs/0)
[![Build Status](https://travis-ci.org/HelpfulScripts/hsDocs.svg?branch=master)](https://travis-ci.org/HelpfulScripts/hsDocs)
[![Dependencies Status](https://david-dm.org/helpfulscripts/hsdocs.svg)](https://david-dm.org/helpfulscripts/hsdocs)
[![codecov](https://codecov.io/gh/HelpfulScripts/hsDocs/branch/master/graph/badge.svg)](https://codecov.io/gh/HelpfulScripts/hsDocs)
[![Known Vulnerabilities](https://snyk.io/test/github/HelpfulScripts/hsDocs/badge.svg?targetFile=package.json)](https://snyk.io/test/github/HelpfulScripts/hsDocs?targetFile=package.json)
[![NPM License](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://www.npmjs.com/package/hsdocs)

Helpful Scripts code documentation tool.

**hsDocs**  is an alternative code documentation viewer for [Typescript](https://www.typescriptlang.org) projects.
It renders JSON documentation files, as created by [typedoc](http://typedoc.org), into html pages that can be viewed via browser. [This example](https://helpfulscripts.github.io/hsDocs/#!/api/hsDocs/0) shows the rendered docset for the hsDoc code itself.

## Features
Provides a more compact overview of `Typescript` library documentation as an alternative to `Typedoc` ...
- facilitating live, interactive code examples in the docs to illustrate functionality and usage
- allowing display of multiple libraries via tabs


## Usage
1 - Create a web-app directory to serve the docsets from. As an example, 
see the [`docs` folder](https://github.com/HelpfulScripts/hsDocs/tree/master/docs) in this project's Github page, which serves the [Github IO pages for this project](https://helpfulscripts.github.io/hsDocs/#!/api/hsDocs/0)

2a - Copy the [`index.html` file](https://github.com/HelpfulScripts/hsDocs/tree/master/docs/index.html) from Github into the new directory, 
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

2b - Alternatively you can use a self-hosted hsDocs version. Copy the `hsDocs` runtimes 
(`hsDocs.js`, `hsDocs.min.js`, `hsDocs.css`, `hsDocs.css.map`) from
[Github](https://github.com/HelpfulScripts/hsDocs/tree/master/docs) into the directory and modify `index.html` as follows:
```
<html>
   <head><link href="hsDocs.css" rel="stylesheet" /></head>
   <body class='hs-layout-fill'>
      <script src="./hsDocs.min.js"></script>
   </body>
</html>
```

3 - Install `typedoc` and, inside your project folder, run
```
typedoc --json docs.json src
(or: ./node_modules/.bin/typedoc --json docs.json src)
```
in your project folder. This assumes `src` is the path to the sources the sources. 
Create a subdirectory **`./data`** and copy the docset into it - i.e. `docs.json` if you used the 
commend above.

See below for more details on creating the docset.

4 - Create a list of docsets to render in a new file **`index.json`** inside **`./data`**.
Files in the `docs` array are interpreted relative to the `./data` folder unless they are full URLs.
```
{   "docs": [
        "hsDocs.json",
        "http://helpfulscripts.github.io/hsLayout/data/hsLayout.json",
        ...
    ],
    "title": "HS Libraries"   // will be displayed at the top left corner
}
```

5 - optionally, create a `src` folder inside the `data` folder and copy the `html`-ified source files into it. 
These are created by the command `grunt sourceCode` in the `docs/data/src/` folder of your project.

6 - Point a browser to the web-app directory


## Creating the Documentation DocSet
Follow the instruction for [`typedoc`](https://typedoc.org/guides/doccomments/) in commenting the code 
and set the [`json`](https://typedoc.org/guides/options/#json) option to create a 
json file containing the documentation. See the Configuration section below for details.

In addition to the documented source files, `hsDocs` recognizes a special **`overview.ts`** file 
that will be displayed as a project overview. 
For this to work, `typedoc` requires the file to have two separate comment entries.
If the second comment is missing, `typedoc` will not generate a comment in the DocSet.

DocSets are shown as menu tabs across the top of the window. To include a DocSet in the menu, ensure that the 
corresponding documentation `.json` file is copied into the `data` folder inside the `hsDocs` staging location 
for the http server. Then edit the `index.json` file to include the documentation file name in the "docs" section. 
See [hsDocs/docs/data](https://github.com/HelpfulScripts/hsDocs/tree/master/docs/data) fro an example.

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
 