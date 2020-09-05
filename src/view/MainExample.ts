/**
 * # How to add live code examples
 * Comment sections may contain code examples that are intended to be live demonstrations for 
 * explaining some concept of the module are contained in. 
 * 
 * `hsDocs` will interpret comment sections between `<example>` and `</example>`
 * tags as code examples. Inside a code example, `<file name='script.js'>` tags contain a script to be executed, 
 * and `<file name='style.css'>` tags contain stylesheet instructions to apply, as in the following snippet (also see Example below):
 * <code>
 *     &lt;example&gt; 
 *     <file name='script.js'>
 *     m.mount(root, { 
 *         view:() => m('.myClass', { style:'font-weight:bold;' }, 'my example')
 *     });
 *     </file>
 * 
 *     <file name='style.css'>
 *     .myClass { 
 *         color: blue; 
 *     }
 *     </file>
 *     &lt;/example&gt;
 * </code> 
 * 
 * ### Scripts 
 * Scripts are enclosed by `<file name='script.js'>` and `</file>` tags. 
 * 
 * hsDocs internally uses the [global Function object][Function] to parse and execute the script. 
 * Thus the script runs in the global scope and has access to global objects. A number of additional modules are provided
 * as parameters in the `Function` constructor and are thus available to the script. 
 * hsDocs currently provides the following default namespaces to access the corresponding modules in the scripts:
 * - **m**: namespace for the [`Mithril`](https://mithril.js.org/) m function    
 * - **hsUtil**: namespace for the [`hsUtil`](http://helpfulscripts.github.io/hsUtil/#!/api/hsUtil/0) library, 
 * providing various utility functions.
 * - **hsWidget**: namespace for the [`hsWidget`](https://helpfulscripts.github.io/hsWidget/#!/api/hsWidget/0) library, 
 * providing various UI widget functions.
 * - **root**: the DOM element to attach content to.
 * 
 * Additional Scripts can loaded - see `Configuring the example` below. 
 * 
 * The script can access and manipulate any of the provided libraries
 * via their namespace, for example as in `m(hsWidget.Icon,{mdi:'stop'})`
 * 
 * #### Using Mithril:
 * mount a `mithril Vnode` on the provided root DOM element using `m.mount` or `m.render`. 
 * Do not use `m.route` as only a single call is allowed per web app and that is used to manage the 
 * main hsDocs site menu and navigation.
 * ```
 * m.mount(root, { view:() => m('div', 'content')});
 * ```
 * #### Using D3js:
 * ```
 * const base = d3.select(root);
 *  const svg = base.append('svg')
 *     .classed('baseSVG', true)
 *     .attr('height', '100%')
 *     .attr('width', '100%')
 *     .attr('preserveAspectRatio', 'xMinYMin meet');
 * ```
 * 
 * ### Configuring the `example`
 * The `<example>` accepts additional arguments to configure the example:
 * 
 * #### Height of the `example` panel
 * To change the default panel height of 300px, set the `height=<numper>px` argument.
 * 
 * #### Module injection
 * Additional module libraries can be injected by adding the argument `libs={<export name>:<path>[,...]}`.
 * `hsDocs` will try to load the library via the provided `path` and make it available to the script within the namespace `export name`. 
 * For example:
 * <code>
 * <example height=500px libs={hsGraphd3:'hsGraphd3', d3:'https://d3js.org/d3.v5.min.js'}>
 * ...in the script:
 *    new hsGraph.Graph();
 *    d3.slect('');
 * </code>
 * The following rules apply in resolving `path`:
 * 1. If `path` is structured, i.e. contains '/', it is requested as is - see 'd3' example above.
 * 2. load from `node_modules/<path.toLowerCase()>/<path>.js`, relative to the current web page. 
 * This is useful to maintain libraries installed via `npm` locally on the server.
 * 3. load from `https://helpfulscripts.github.io/<path>/<path>.js`. Provided as a convenience to access `helpfulscript` modules ;)
 *  
 * To be recognized as injectable module, libraries need to follow the convention of `webPack's` 
 * [`output.libraryTarget: "this"`](https://webpack.js.org/configuration/output/#expose-via-object-assignment) configuration.
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
 *     view:() => m(hsWidget.Grid, {
 *          columns:''
 *     }, [
 *          'left column',
 *          'right column'
 *     ])
 * });
 * </file>
 * <file name='style.css'>
 * $exampleID { height: 200px;}
 * .myExample { 
 *     color: red; 
 *     font-weight:bold; 
 * }
 * </file>
 * </example>
 */

/** */
import m from "mithril";
import { Menu }             from 'hswidget';
import * as hswidget        from 'hswidget';
import { shortCheckSum }    from 'hsutil'; 
import { delay }            from 'hsutil'; 
import { Log }              from 'hsutil';  const log = new Log('MainExample');
import * as hsutil          from 'hsutil';

const modules = {
    m:          m,
    hsUtil:     hsutil, 
    hsWidget:   hswidget
};

interface Attribute {
    height?: string;
    libs?: {sym:string, path:string}[];
}

/**
 * describes an executable comment example
 */
interface CommentDescriptor { 
    created:   boolean;                 // indicates if all dynamic modules are loaded
    exampleID: string;                  // example tag ID
    menuID:    string;                  // menu tag ID
    items:     string[];
    // desc:   SelectorDesc;               // menu items
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

/** used to generate unique IDs for examples. */
let gIDCounter = 100000;

/** creates a new random example ID for each call. */
function getNewID():string { 
    // return 'hs'+Math.floor(1000000*Math.random());
    return 'hs'+gIDCounter++;
}


/**
 * creates the example configuration, generates the DOM hook, and sets up the example execution.
 * `example` takes a context map of the form `{ name:module, ...}` containing libraries to be used 
 * within the example, and returns a function that can be used in calls to `string.replace`. 
 * See the following example:
 * <code><pre>
 * import * as layout from "layout";
 * text = text.replace(/<example>([\S\s]*?)<\/example>/gi, example({layout:layout}));
 * </pre></code>
 * The modules `m`, `hsUtil`, and `hsWidget` will be added by default. 
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
    return `<div class='example'><style>${style}</style><div id='${IDs.exampleID}' style='height:${frameHeight}'></div></div>`;
}

async function createExecuteScript(IDs:CommentDescriptor, exmpl:string): Promise<boolean> {
    try {
        const commentDesc = await getCommentDescriptor(IDs, exmpl);
        IDs.runScript = (root:any) => {
            const libNames = Object.keys(modules);
            const missingLibs = IDs.attrs.libs.map(l => l.sym).filter(l => libNames.indexOf(l)<0);
            if (missingLibs.length > 0) {
                log.info(`expected modules to be loaded: ${missingLibs.join(', ')}`);
            } else {
                const libs = libNames.map(name => modules[name]);
                const scriptFn = new Function('root', ...libNames, commentDesc);    
                log.info(`running example script with modules '${libNames.join(', ')}'`);
                scriptFn(root, ...libs);
            }
        };
        log.debug(()=>'example function ready');
        IDs.created = true;
        return true;
    } catch(e) { 
        log.error(`creating script: ${e}\n${e.stack}`); 
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
        items:<string[]>[],
        pages:{},
        activeSrcPage: undefined,
        attrs: {libs:[]}
    };
}

/**
 * returns a parameterless function that can be called via setTimeout to 
 * mount the menu and execute the script function provided in `IDs`. 
 * @param IDs the `CommentDescriptor` to execute on. 
 */
function addExampleStructure(IDs:CommentDescriptor):CommentDescriptor { 
    let item = IDs.activeSrcPage || 'js';
    const root = document.getElementById(IDs.exampleID);
    const click = (menuIndex:number) => item = IDs.activeSrcPage = IDs.items[menuIndex];

    if (root && IDs.created) {
        m.mount(root, {view: () => m('.exampleGrid', [
            m('.hs_scroll_content', [
                m(`.hs_execution`, {id:IDs.menuID}, m('div.placeholder', 'placeholder')),
                m('.hs_source', m.trust(`<code><pre>${IDs.pages[item]}</pre></code>`))
            ]),
            m(Menu, { class:'hs_menu', onclick: click }, IDs.items)
        ])});
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
        // root.querySelectorAll('.placeholder').forEach(d => root.removeChild(d));
        while (root.children.length>0) { root.removeChild(root.children[0]); }
        try { IDs.runScript(root); }
        catch(e) { 
            log.error(`executing script: ${e}\n${IDs.executeSource}\n${e.stack}`); 
        }
    } else {
        // log.error(`root not found for menuID ${IDs.menuID}`);
    }
    m.redraw();
    return IDs;
}

function executeError(e:any) {
    log.error(`rejection executing script:\n${e}\n${e.stack}`);
}
 
/**
 * Fills in all fields of the CommentDescriptor provided as `IDs`.
 * @param IDs the CommentDescriptor to complete
 * @param example the example string, including <example> tag
 * @return the script to execute, as a string
 */
async function getCommentDescriptor(IDs:CommentDescriptor, example:string):Promise<string> {
    let result = '';
    
    let attrs = example.match(/<example\s([\s\S]*?)>/); // capture all parameters to `example`
    if (attrs && attrs[1]) { 
        findTokens(IDs, attrs[1]);
        if (IDs.attrs.libs.length>0) {
            await Promise.all(IDs.attrs.libs.map(async l => {
                log.debug(()=>`loading lib: ${l.sym}: ${l.path}`);
                const content = await loadScript(l.sym, l.path);
                if (content) { modules[l.sym] = content[l.sym]; }
            }));
        }
        log.debug(()=>`found attrs:\n ${log.inspect(IDs.attrs, {depth:5})}`);
    }
    example.replace(/<file[\s]*name=[\S]*?\.([\s\S]*?)['|"]>([\S\s]*?)<\/file>/gi, function(text:string) {
        const args = [...arguments];
        const content = args[2].trim();         // the part between <file> and </file>
        IDs.items.push(args[1]);                // record available extensions, i.e. 'js', 'html', etc 
        IDs.pages[args[1]] = content.trim();    // associate the content with the extension
        return result;
    });
    return IDs.pages['js'];
}

function findTokens(IDs:CommentDescriptor, str:string) {
    const results = [];
    // find 'key=value' and 'key={value}' statements
    const reg = new RegExp(/((\w+?)\s*?=\s*?([^\s{},]+|{[\s\S]+?}))/g);
    let r;
    while(r = reg.exec(str)) {
        results.push({key:r[2], val:r[3]});
    }
    results.map(kv => {
        switch (kv.key) {
            case 'height': IDs.attrs['height'] = kv.val; break;       
            case 'libs':    // {graph:'/node_modules/hsgraphd3/index.js'}
                const ligreg = new RegExp(/((\w+?)\s*:\s*([^\s,}]+))/g);
                while(r = ligreg.exec(kv.val)) {
                    IDs.attrs.libs.push({sym:r[2],path:r[3].replace(/['"]/g, '')});
                }
        }
    });
    log.debug(()=>`${str} --> \n${log.inspect(IDs.attrs,{depth:5})}`);
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
async function loadScript(sym:string, path:string) {
    const load = (p:string) => m.request({ method: "GET", url: p, extract: (xhr:any) => xhr });

    const paths = [
        `node_modules/${path.toLowerCase()}/${path}.js`,
        `https://helpfulscripts.github.io/${path}/${path}.js`
    ];
    let content:any;
    try {
        if (path.indexOf('/')>=0) {     // if structured: call as is
            content = await load(path);
        } else {                        // else try other paths
            for (let i=0; i<paths.length; i++) {
                try { 
                    path = paths[i];
                    content = await load(paths[i]); 
                    if (content.status === 200) { break; }
                }
                catch(e) {}
            }
            // log.info(`${path} of ${paths.join(', ')} ${content?'found':'not found'}`);
        }
    } catch(e) { log.error(`loading lib ${path}`);}
    let code:string;
    try { 
        code = content.responseText;
        let lib:any = {};
        log.info(`loaded ${path}, creating library`);
        new Function(code).bind(lib)();
        if (lib) {
            return lib;
        } else {
            log.warn(`wrong lib format for ${sym}: ${code.slice(0, 20)}..., should be 'this["${sym}"] = ...`);
        }
    } catch(e) {
        log.error(`JSON.parse: ${path}: ${e}`);
        log.error(code);
        return undefined;
    }
    // add(content.responseText);
}

