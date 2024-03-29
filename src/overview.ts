/**
# hsDocs

Helpful Scripts code documentation viewer. 
<a href="./data/src/hsDocs/coverage/" target="_blank">[Coverage Info]</a>

[![NPM License](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://www.npmjs.com/package/hsdocs)
[![npm version](https://badge.fury.io/js/hsdocs.svg)](https://badge.fury.io/js/hsdocs)
[![docs](https://img.shields.io/badge/hsDocs-hsDocs-blue.svg)](https://helpfulscripts.github.io/hsDocs/#!/api/hsDocs/0)
[![Build Status](https://github.com/HelpfulScripts/hsDocs/workflows/CI/badge.svg)](https://github.com/HelpfulScripts/hsDocs/) 
[![codecov](https://codecov.io/gh/HelpfulScripts/hsDocs/branch/master/graph/badge.svg)](https://codecov.io/gh/HelpfulScripts/hsDocs)
[![Known Vulnerabilities](https://snyk.io/test/github/HelpfulScripts/hsDocs/badge.svg?targetFile=package.json)](https://snyk.io/test/github/HelpfulScripts/hsDocs?targetFile=package.json)
[![Dependencies Status](https://david-dm.org/helpfulscripts/hsdocs.svg)](https://david-dm.org/helpfulscripts/hsdocs)

___
hsDocs.js is a code documentation viewer for [Typescript](https://www.typescriptlang.org) projects.
It provides a browser rendering of JSON documentation files as created by [typedoc](http://typedoc.org).

## Usage
1 - Create a web-app directory to serve the docsets from. As an example, 
see the `docs` folder in this project's [Github page](https://github.com/HelpfulScripts/hsDocs/tree/master/docs), 
which serves the [Github IO pages for this project](https://helpfulscripts.github.io/hsDocs/#!/api/hsDocs/0)

2a - Copy the `index.html` file from [Github](https://github.com/HelpfulScripts/hsDocs/tree/master/docs), 
or create a new **`index.html`** as follows. This will use the `GitHub`-hosted version of `hsDocs`:
```
<html>
   <head>
      <link href="https://helpfulscripts.github.io/hsDocs/hsDocs.css" rel="stylesheet" />
   </head>
   <body>
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
   <body>
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

4 - Create a list of docsets to render in a new file **`index.json`** inside **`data`**:
```
{   
    "docs": [
        "docs.json",
        ...
    ],
    "title": "HS Libraries"   // will be displayed at the top left corner
}
```

5 - optionally, create a `src` folder inside the `data` folder and copy the `html`-ified source files into it. 
These are created by the command `grunt sourceCode` in the `docs/data/src/` folder of your project.

6 - Point a browser to the web-app directory

## Creating the Documentation DocSet
Install and run `typedoc` in your project folder; e.g. assuming `src` contains the sources:
```
typedoc --json docs.json src
```

Follow the instruction for [`typedoc`](https://typedoc.org/guides/doccomments/) in commenting the code 
and set the [`json`](https://typedoc.org/guides/options/#json) option to create a 
json file containing the documentation. See the Configuration section below for details.

In addition to the documented source files, `hsDocs` recognizes a special **`overview.ts`** file 
that will be displayed as a project overview. 
For this to work, `typedoc` requires the file to have two separate comment entries.
If the second comment is missing, `typedoc` will not generate a comment in the DocSet.

DocSets are shown as menu tabs across the top of the window. To include a DocSet in the menu, ensure that the 
corresponding documentation `<DocSet>.json` file is copied into the `data` folder inside the folder that holds the serving html file.
Then edit the `index.json` file to include the documentation file name in the "docs" section. If no `index.json` file is found, 
`hsDocs` will attempt to load a directory listing of the `data` file and include all encountered `*.json` files as DocSet. 
This requires enabling the http server to provide a directory listing for the `data` folder.

### Modules
Each source file is considered to be a `module`. Modules are shown in the left-hand overview panel of the main `hsDocs` window.
Alternatively, a `@module` statement in the summary comment at the top of a file will create, or add to, a module of the specified name.
This encourages to separate code into files without cluttering the overview.

### Linking across the docsets
Links to items across the docsets can be placed via a link directive: 
- `{@link [docset:]module.item` linked text`}`, 

where
 - *docset* optional; the name of the docset. If omitted, a link within the current docSet will be created
 - *module* is name of the module to link to; 
   if *module* is `overview`, or unspecified, the link will point to the docset overview page.
 - *item* is the name, or period-separated path, of the item within the module. 
 - *linked text* is displayed with a link to path within module

Examples:
- `{@link overview` this hsDocs overview`}` -> {@link overview this hsDocs overview}
- `{@link hsDocs:` this hsDocs overview`}` -> {@link hsDocs: this hsDocs overview}
- `{@link hsDocs:DocSets.DocSets.add` the `add` function`}` -> {@link hsDocs:DocSets.DocSets.add the `add` function}
- `{@link DocSets.DocSets.add` the `add` function`}` -> {@link DocSets.DocSets.add the `add` function}


### Code Examples
 * `hsDocs` supports creating live code examples in comment sections as explained 
 * in the {@link hsDocs:view.MainExample MainExample overview}. The following example 
 * renders content using [Mithril](https://mithril.js.org/). 
 * <example>
 * <file name="script.js">
 * let tl = [10, 10];
 * 
 * m.mount(root, {
 *     view: () => m('.myBlock', {
 *         onclick:() => tl = tl.map(i => Math.floor(80*Math.random())), 
 *         style:`top:${tl[0]}%; left:${tl[1]}%;`
 *     }, m('', 'click me'))
 * })
 * </file>
 * <file name="style.css">
 * .myBlock {
 *     text-align:center;
 *     color: white;
 *     background-color: red;
 *     position:relative;
 *     width:  20%;
 *     height: 30%;
 * }
 * .myBlock div {
 *     padding-top: 40%;
 * }
 * </file>
 * </example>

## Configuring typedoc
As an example, we use grunt-typedoc with the following configuration:

### tsconfig.json:
A `tsconfig.json` file seems to be required by typedoc. The file can be empty

### Gruntfile:
<code>module.exports = function(grunt) {
    ...
    typedoc: {
        code: {
            options: {
                tsconfig: 'typedoc.json',
                json:   './docs/hsDocs.json',
                out:    './docs',
                mode:   'modules',
                name:   'hsDocs'
            }
            src: ['src/*.ts', '!src/*.spec.ts']
        }
    },

   ...
   grunt.loadNpmTasks('grunt-typedoc');
   ...
   grunt.registerTask('doc', ['typedoc']);
}
</code>

## Dependencies
### For creating the docsets:
- [typedoc](http://typedoc.org)

### For rendering the docsets:
- [Mithril](https://mithril.js.org)
- [showdown](https://github.com/showdownjs/showdown)
- [hsWidget](https://github.com/HelpfulScripts/hsWidget)
- [webpack](https://webpack.js.org/)

## Structural Code Overview
The main entry point for the web-app is index.ts, which initiates loading the docsets 
and sets up a mithril {@link hsDocs:Router router} 

*/

/** */