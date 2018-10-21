/**
# hsDocs

Helpful Scripts code documentation viewer. 
[`[Github page]`](https://github.com/HelpfulScripts/hsDocs)
[`[Coverage Info]`](./data/src/hsDocs/coverage/)

___
hsDocs.js is a code documentation viewer for [Typescript](https://www.typescriptlang.org) projects.
It renders JSON documentation files as created by [typedoc](http://typedoc.org).

## Usage
1. Create a web-app directory to serve the docsets from. As an example, 
see the `docs` folder in this project's [Github page](https://github.com/HelpfulScripts/hsDocs/docs), 
which serves the [Github IO pages for this project](https://helpfulscripts.github.io/hsDocs/#!/api/hsDocs/0)

2. Copy the `index.html` file from [Github](https://github.com/HelpfulScripts/hsDocs/docs), 
or create a new **`index.html`** as follows. This will use the `GitHub`-hosted version of `hsDocs`:
<code>
<html>
<head><link href="https://helpfulscripts.github.io/hsDocs/hsDocs.css" rel="stylesheet" /></head>
<body class='hs-layout-fill'><script src="https://helpfulscripts.github.io/hsDocs/hsDocs.min.js"></script></body>
</html>
</code>

2'. Alternatively you can use a self-hosted hsDocs version. Copy the `hsDocs` runtimes 
(`hsDocs.js`, `hsDocs.min.js`, `hsDocs.css`, `hsDocs.css.map`) from
[Github](https://github.com/HelpfulScripts/hsDocs/docs) into the directory and 
modify `index.html` as follows:
<code>
<html>
<head><link href="hsDocs.css" rel="stylesheet" /></head>
<body class='hs-layout-fill'><script src="./hsDocs.min.js"></script></body>
</html>
</code>

3. Create a subdirectory **`data`** and copy the docsets into it, for example **`hsDocs.json`** or your project's .json.
See below for creating the docset.

4. Create a list of docsets to render in a new file **`index.json`** inside **`data`**:
<code>
{
    "docs": [
        "hsDocs.json",
        ...
    ],
    "title": "HS Libraries"   // will be displayed at the top left corner
}</code>

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

### Modules
Each source file is considered to be a `module`. Modules are shown in the left-hand overview panel of the main `hsDocs` window.
Alternatively, a `@module` statement in the summary comment at the top of a file will create, or add to, a module of the specified name.
This encourages to separate code into files without cluttering the overview.

### Linking across the docsets
Links to items across the docsets can be placed via a link directive: 
- "{@link [*docset*:]*module*.*item* linked text}", 

where
 - *docset* optional; the name of the docset. If omitted, a link within the current docSet will be created
 - *module* is name of the module to link to; 
   if *module* is `overview`, or unspecified, the link will point to the docset overview page.
 - *item* is the name, or period-separated path, of the item within the module. 
 - *linked text* is displayed with a link to path within module

Examples:
- '{@link overview this hsDocs overview}' -> {@link overview this hsDocs overview}
- '{@link hsDocs: this hsDocs overview}' -> {@link hsDocs: this hsDocs overview}
- '{@link hsDocs:DocSets.DocSets.add the `add` function}' --> {@link hsDocs:DocSets.DocSets.add the `add` function}
- '{@link DocSets.DocSets.add the `add` function}' --> {@link DocSets.DocSets.add the `add` function}


### Mithril Code Examples
 * `hsDocs` supports creating inline code examples in comment sections as explained 
 * in the {@link hsDocs:MainExample MainExample overview}.
 * <example>
 * <file name="script.js">
 * let tl = [10, 10];
 * 
 * const rnd = () => Math.floor(80*Math.random());
 * 
 * function click() { tl = tl.map(i => rnd()); }
 * 
 * m.mount(root, {
 *     view: () => m('.myBlock', {
 *         onclick:click, 
 *         style:`top:${tl[0]}%; left:${tl[1]}%;`
 *     }, m('', 'click me'))})
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
- [hsLayout]
- [webpack]

## Structural Code Overview
The main entry point for the web-app is index.ts, which initiates loading the docsets 
and sets up a mithril {@link hsDocs:Router router} 

*/

/** */