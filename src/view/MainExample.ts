/**
 * Comment sections may contain code examples that demonstrate code behaviour and usage.
 * 
 * `hsDocs` will interpret and execute Javascript instructions within a `<file name='script.js'>` tag.
 * and stylesheet instructions with a &lt;`file name='style.css'`&gt; tag, as in following example (also see Example below):
 * <code>
 *     &lt;example&gt; 
 *     <file name='script.js'>
 *     m.mount(root, { 
 *         view:() => m(hslayout.Layout, { columns:[], 
 *             content:['first line','second line')]
 *         })
 *     });
 *     </file>
 * 
 *     <file name='style.css'>
 *     .hsLeaf { 
 *         color: blue; 
 *     }
 *     </file>
 *     &lt;/example&gt;
 * </code> 
 * 
 * ### Scripts 
 * Scripts are enclosed by `<file name='script.js'>` and `</file>` tags and are intended to be live examples for 
 * explaining some concept of the module are contained in. 
 * 
 * hsDocs internally uses the [global Function object][Function] to parse and execute the script. 
 * Thus the script runs in the global scope and has access to global objects. A number of additional objects are provided
 * as parameters in the `Function` constructor and are thus available to the script. 
 * hsDocs currently provides the following namespaces as parameters
 * for use in the scripts:
 * - **m**: the `Mithril` m function    
 * - **layout**: the {@link hsLayout: `hsLayout`} namespace, providing functions to layout the browser window.
 * - **widget**: the {@link hsGraph: `hsGraph`} namespace, providing various UI widget functions.
 * - **root**: the DOM element to attach content to.
 * 
 * Scripts can use and manipulate any of the provided objects. 
 * #### Using Mithril:
 * mount a `mithril Vnode` on the provided root DOM element using `m.mount` or `m.render`. 
 * Do not use `m.route` as only a single call is allowed per web app and that is used to manage the 
 * main hsDocs site menu and navigation.
 * ```
 * m.mount(root, { view:() => m('div', 'content')});
 * ```
 * #### Using d3:
 * ```
 * const base = d3.select(root);
 *  const svg = base.append('svg')
 *     .classed('baseSVG', true)
 *     .attr('height', '100%')
 *     .attr('width', '100%')
 *     .attr('preserveAspectRatio', 'xMinYMin meet');
 * ```
 * 
 * #### Configuring the `example`
 * The `&lt;example&gt` accepts additional arguments to configure the example:
 * - height=<numper>px   the height of the example box; defaults to 300
 * - libs={<export name>:<path>}   a list of additional libraries to load. `export name` is the symbol exported by the library.
 * This symbol will be available to the script. The main intent is to load the library being documented so that its features 
 * can be illustrated by the example script.
 * For example:
 * <code>
 * &lt;example height=500px libs={hsGraphd3:'hsGraphd3',d3:'https://d3js.org/d3.v5.min.js'}&gt
 * </code>
 * If `path` is a module nane (e.g. 'hsDocs'), 
 * this involves the following attempts
 * at resolving the library path:
 * 1. load from 'node_modules/<path.toLowerCase()>/<path>.js, relative to the current web page.
 * 2. load from 'https://helpfulscripts.github.io/<path>/<path>.js'
 * If `path` is structured, i.e. contains '/', it is requested as is. 
 * 
 * [Function]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function
 * 
 * ### Styles
 * Styles will be automatically sandboxed so they are valid only within the enclosing example tags. 
 * This is achieved by prefixing css tags with a unique exmple ID and allows multiple examples to co-exist on the same page.
 * In the DOM, the example ID is assgned top the &lt;example&gt; tag.
 * Use `$exampleID` as css tag in the `css` section of the example to refer to the &lt;example&gt; element, 
 * as shown below.
 * 
 * ### Example
 * <example>
 * <file name='script.js'>
 * m.mount(root, { 
 *     view:() => m(hslayout.Layout, {
 *         css:'.myExample', 
 *         columns:[], 
 *         content:[
 *             'left column',
 *             'right column'
 *         ]
 *     })
 * });
 * </file>
 * <file name='style.css'>
 * $exampleID { height: 200px;}
 * .hs-layout { 
 *     margin:0; 
 * }
 * .myExample { 
 *     color: red; 
 *     font-weight:bold; 
 * }
 * </file>
 * </example>
 */

/** */
import { m }                    from 'hslayout';
import { Menu, SelectorDesc }   from 'hswidget';
import * as hswidget            from 'hswidget';
import * as hslayout            from 'hslayout';
import { Layout }               from 'hslayout';
import { shortCheckSum }        from 'hsutil'; 
import { delay }                from 'hsutil'; 
import { log as _log }          from 'hsutil';  const log = _log('MainExample');
import * as hsutil              from 'hsutil';
import * as hsdatab             from 'hsdatab';
import * as hsgraph             from 'hsgraph';

const modules = {
    m:          Promise.resolve(m),
    hsutil:     Promise.resolve(hsutil), //import(/* webpackChunkName: "hsutil" */   'hsutil'),
    hslayout:   Promise.resolve(hslayout), //import(/* webpackChunkName: "hslayout" */ 'hslayout'),
    hswidget:   Promise.resolve(hswidget), //import(/* webpackChunkName: "hswidget" */ 'hswidget'),
};

interface Attribute {
    height?: string;
    libs?: {
        [name:string]: string;
    };
}

/**
 * describes an executable comment example
 */
interface CommentDescriptor { 
    created:   boolean;                 // indicates if all dynamic modules are loaded
    exampleID: string;                  // example tag ID
    menuID:    string;                  // menu tag ID
    desc:   SelectorDesc;               // menu items
    attrs?: Attribute;                  // <example attr=value>
    pages:  {string?:string};           // page content for each menu item
    runScript?: (root:any) => void; // the example code to execute
    executeSource?: '';                 // the source code to execute
    activeSrcPage:string;               // the active page for the source display
}

/**
 * Map containing various exampkle configurations 
 */
const gInitialized:{string?:CommentDescriptor} = {};

/**
 * creates the example configuration, generates the DOM hook, and sets up the example execution.
 * `example` takes a context map of the form `{ name:module, ...}` containing libraries to be used 
 * within the example, and returns a function that can be used in calls to `string.replace`. 
 * See the following example:
 * <code><pre>
 * import * as layout from "layout";
 * text = text.replace(/<example>([\S\s]*?)<\/example>/gi, example({layout:layout}));
 * </pre></code>
 * The modules `m`, `hsLayout`, and `hsGraph` will be added by default as 
 * ` { m: m, layout: layout, widget: widget } `
 * @param exmpl the example string extracted from the comment, including the `<example>` tags.
 * @param context the context in which the example script should be run, expressed as `name`:`namespace` pairs.
 */
export function example(exmpl:string) { 
    const instance = shortCheckSum(exmpl);
    let IDs = gInitialized[instance]; 
    if (!IDs) {
        IDs = gInitialized[instance] = initDesc(IDs);
        IDs.executeSource = exmpl;
        createExecuteScript(IDs, exmpl);
    }
    if (!document.getElementById(IDs.menuID)) { 
        addExampleStructure(IDs);
        delay(1)(IDs)
            .then(executeScript)
            .catch(executeError);
    }

    const frameHeight = (IDs.attrs? IDs.attrs.height : undefined) || '300px';
    const wrapWithID = (css:string) => css==='$exampleID'? `#${IDs.exampleID}`: `#${IDs.menuID} ${css}`;

    // prefix css selectors with ID of main execution area to sandbox the scope
    // (^|}): start of string or end of previous style def
    // \s*?: any white spaces
    // (\S*?): capturing group: css name
    // \s*?{: whitespaces, followed by start of style def
    const style = (!IDs.pages['css'])? '':                              // empty if no css defined
                    IDs.pages['css'].replace(/(^|})\s*?(\S*?)\s*?{/gi,    // otherwise wrap each css statement
                        (x:string, ...args:any[]) => x.replace(args[1], wrapWithID(args[1]))
    );
    return `<style>${style}</style><example id=${IDs.exampleID} style="height:${frameHeight}" class="hs-layout-frame"></example>`;
}

async function createExecuteScript(IDs:CommentDescriptor, exmpl:string): Promise<boolean> {
    const libNames = Object.keys(modules);
    try {
        const libs = await Promise.all(libNames.map(async name => await modules[name]));
        const desc = await getCommentDescriptor(IDs, exmpl);
        const scriptFn = new Function('root', ...libNames, desc);    
        IDs.runScript = (root:any) => scriptFn(root, ...libs);
        log.info('example function ready');
        IDs.created = true;
        return true;
    } catch(e) { 
        log.error(`creating script: ${e}`); 
        return false;
    } 
}

/**
 * creates the example configuration 
 */
function initDesc(IDs:CommentDescriptor):CommentDescriptor {
    return {
        created:    false,
        exampleID:  getNewID(),    // example tag ID
        menuID:     getNewID(),    // main execution area tag ID
        desc:<SelectorDesc>{ 
            items:<string[]>[],
            selectedItem: 'js',
            clicked: async () => {
                try {
                    addExampleStructure(IDs);   // called when source menu changes
                    await delay(1)();
                    await executeScript(IDs);
                } 
                catch(e) { executeError(e); }
            },
            size: ["50px"]
        },
        pages:{},
        activeSrcPage: undefined
    };
}

/** creates a new random example ID for each call. */
function getNewID():string { 
    return 'hs'+Math.floor(1000000*Math.random());
}

/**
 * returns a parameterless function that can be called via setTimeout to 
 * mount the menu and execute the script function provided in `IDs`. 
 * @param IDs the `CommentDescriptor` to execute on. 
 */
function addExampleStructure(IDs:CommentDescriptor):CommentDescriptor { 
    let item = IDs.activeSrcPage || 'js';
    const root = document.getElementById(IDs.exampleID);

    IDs.desc.clicked = (newItem:string) => {
        item = IDs.activeSrcPage = newItem;
    };

    if (root && IDs.created) {
        m.mount(root, {view: () => m(Layout, { 
            columns: ["50%"],
            content: [
                m(Layout, {
                    content: m('.hs-layout .hs-execution', {id:IDs.menuID}, m('div', 'placeholder'))
                }),
                m(Layout, {
                    rows:["30px", "fill"],
                    css: '.hs-source',
                    content:[
                        m(Menu, {desc: IDs.desc, size:['50px'] }),
                        m(Layout, { content: m('.hs-layout .hs-source-main', m.trust(`<code><pre>${IDs.pages[item]}</pre></code>`))})
                    ]
                })
            ]})
        });
    }
    return IDs;
}

/**
 * execute the provided script 
 * @param IDs provides the context in which the script is exceuted/
 */
function executeScript(IDs:CommentDescriptor) {
    const root = document.getElementById(IDs.menuID);
    if (root && IDs.created) {
        // log.info(`root found for menuID ${IDs.menuID}`);
        log.info('running example script');
        try { IDs.runScript(root); }
        catch(e) { 
            log.error(`error executing script: ${e}\n${IDs.executeSource}\n${e.stack}`); 
        }
    } else {
        // log.error(`root not found for menuID ${IDs.menuID}`);
    }
    m.redraw();
    return IDs;
}

function executeError(e:any) {
    log.error(`rejection executing script:\n${e}`);
}
 
/**
 * Fills in all fields of the CommentDescriptor provided as `IDs`.
 * @param IDs the CommentDescriptor to complete
 * @param example the example string, including <example> tag
 * @return the script to execute, as a string
 */
async function getCommentDescriptor(IDs:CommentDescriptor, example:string):Promise<string> {
    let result = '';
    
    // let attrs = example.match(/<example\s(\S*?)(\s|>)/gi);
    let attrs = example.match(/<example\s([\s\S]*?)>/); // capture all parameters to `example`
    if (attrs && attrs[1]) { 
        await Promise.all(attrs[1].split(' ').map(async att => {
            const cmd = att.split('=');
            await decodeAttrs(IDs, cmd[0].trim().toLowerCase(), cmd[1].trim());
            log.debug(`found attrs:\n ${log.inspect(IDs.attrs, 5)}`);
        }));
    }
    example.replace(/<file[\s]*name=[\S]*?\.([\s\S]*?)['|"]>([\S\s]*?)<\/file>/gi, function(text:string) {
        const args = [...arguments];
        const content = args[2].trim(); // the part between <file> and </file>
        IDs.desc.items.push(args[1]);   // record available extensions, i.e. 'js', 'html', etc 
        IDs.pages[args[1]] = content;   // associate the content with the extension
        return result;
    });
    return IDs.pages['js'];
}

declare const hsGraphd3:any;

async function decodeAttrs(IDs:CommentDescriptor, cmd:string, val:string) {
    IDs.attrs = IDs.attrs || {};
    switch(cmd) {
        case 'height': IDs.attrs['height'] = val; break;
        case 'libs':    // {graph:'/node_modules/hsgraphd3/index.js'}
            if (val.startsWith('{') && val.endsWith('}')) {
                IDs.attrs['libs'] = {};
                const list = val.slice(1, -1);
                await Promise.all(list.split(',').map(async lib => {
                    const colon = lib.indexOf(':');
                    // const libDesc = lib.slice(0,colon);
                    // if (libDesc.length !== 2) {
                    //     log.warn(`expected format 'lib:path', found '${lib}'`);
                    // }
                    // const name = libDesc[0].trim();
                    // let path = libDesc[1].trim().replace(/['"]/g, '');
                    const name = lib.slice(0,colon).trim();
                    const path = lib.slice(colon+1).trim().replace(/['"]/g, '');
                    IDs.attrs.libs[name] = path;
                    log.info(`lib: ${name}: ${path}`);
                    await loadScript(path);
                    modules[name] = Promise.resolve(path);
                }));
            } else {
                log.warn(`expected libs to have form '{lib:path}', found '${val}'`);
            }
    }
}

/**
 * attempts to load a library for the specified `path`. If `path` is a module nane (e.g. 'hsDocs'), 
 * this involves the following attempts
 * at resolving the library path:
 * 1. load from 'node_modules/<path.toLowerCase()>/<path>.js, relative to the current web page.
 * 2. load from 'https://helpfulscripts.github.io/<path>/<path>.js'
 * If `path` is structured, i.e. contains '/', it is requested as is. 
 * @param path module name, such as 'hsDocs'
 */
async function loadScript(path:string) {
    async function load(p:string) {
        const result = await m.request({ method: "GET", url: p, extract: (xhr:any) => xhr });
        if (result.status !== 200) { log.warn(`${result.status}: ${p}`); }
        return result;
    }

    function add(text:string) {
        const s = document.createElement('script');
        s.type = 'text/javascript';
        const code = text;
        try {
            s.appendChild(document.createTextNode(code));
        } catch (e) {
            s.text = code;
        } finally {
            document.body.appendChild(s);
        }
    }

    const paths = [
        `node_modules/${path.toLowerCase()}/${path}.js`,
        `https://helpfulscripts.github.io/${path}/${path}.js`
    ];
    let content:any;
    try {
        if (path.indexOf('/')>=0) { // if structured: call as is
            content = await load(path);
        } else {
            content = await load(paths[0]);
            if (content.status !== 200) { content = await load(paths[1]); }
        }
    } catch(e) { log.error(`loading lib ${path}: ${e}`);}
    add(content.responseText);
}