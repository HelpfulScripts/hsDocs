/**
 * Comment sections may contain code examples that are placed within &lt;example&gt; tags.
 * 
 * `hsDocs` will interpret and execute Javascript instructions within a &lt;`file name='script.js'`&gt; tag.
 * and stylesheet instructions with a &lt;`file name='style.css'`&gt; tag, as in following example:
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
 * Scripts are expected to mount a `mithril Vnode` on a root DOM element using `m.mount` or `m.render`. 
 * Do not use `m.route` as only a single call is allowed per web app and that is used to manage the 
 * main hsDocs site menu and navigation.
 * 
 * hsDocs internally uses the [global `Function` object][Function] to parse and execute the script. 
 * Thus the script has access only to global objects and to objects provided
 * as parameters in the `Function` constructor. hsDocs currently provides the following namespaces as parameters
 * for use in the scripts:
 * - **m**: the `Mithril` m function    
 * - **layout**: the {@link hsLayout: `hsLayout`} namespace, providing functions to layout the browser window.
 * - **widget**: the {@link hsGraph: `hsGraph`} namespace, providing various UI widget functions.
 * - additionally, the parameter **root** is provided as the DOM element to mount to.
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
 *             'third line',
 *             'fourth line'
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
import { Layout }               from 'hslayout';
import { shortCheckSum }        from 'hsutil'; 
import { delay }                from 'hsutil'; 

const modules = {
    m:          Promise.resolve(m),
    hsutil:     import(/* webpackChunkName: "hsutil" */   'hsutil'),
    hsdatab:    import(/* webpackChunkName: "hsdatab" */  'hsdatab'),
    hslayout:   import(/* webpackChunkName: "hslayout" */ 'hslayout'),
    hswidget:   import(/* webpackChunkName: "hswidget" */ 'hswidget'),
    hsgraph:    import(/* webpackChunkName: "hsgraph" */  'hsgraph')
};

/**
 * describes an executable comment example
 */
interface CommentDescriptor { 
    exampleID: string;                  // example tag ID
    menuID:    string;                  // menu tag ID
    desc:   SelectorDesc;               // menu items
    attrs?: {string?:string};           // <example attr=value>
    pages:  {string?:string};           // page content for each menu item
    executeScript?: (root:any) => void; // the example code to execute
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
 * withibn the example, and returns a function that can be used in calls to `string.replace`. 
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
        addExample(IDs).then(delay(1)).then(executeScript).catch(executeError);
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

function createExecuteScript(IDs:CommentDescriptor, exmpl:string): Promise<boolean> {
    const libNames = Object.keys(modules);
    return Promise.all(libNames.map(name => modules[name]))
    .then((libs) => {
        try {
            const scriptFn = new Function('root', ...libNames, getCommentDescriptor(IDs, exmpl));    
            IDs.executeScript = (root:any) => scriptFn(root, ...libs);
            return true;
        }
        catch(e) { 
            console.log('creating script:' + e); 
            return false;
        } 
    });
}

/**
 * creates the example configuration 
 */
function initDesc(IDs:CommentDescriptor):CommentDescriptor {
    return {
        exampleID:  getNewID(),    // example tag ID
        menuID:     getNewID(),    // main execution area tag ID
        desc:<SelectorDesc>{ 
            items:<string[]>[],
            selectedItem: 'js',
            changed: () => addExample(IDs)   // called when source menu changes
                        .then(executeScript) 
                        .catch(executeError),
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

/** asynchronously adds the example structure on the page and then executed the script. */
function addExample(IDs:CommentDescriptor):Promise<CommentDescriptor> {
    return Promise.resolve(IDs).then(addExampleStructure).then(delay(1)); 
}

/**
 * returns a parameterless function that can be called via setTimeout to 
 * mount the menu and execute the script function provided in `IDs`. 
 * @param IDs the `CommentDescriptor` to execute on. 
 */
function addExampleStructure(IDs:CommentDescriptor):CommentDescriptor { 
    let item = IDs.activeSrcPage || 'js';
    const root = document.getElementById(IDs.exampleID);

    IDs.desc.changed = (newItem:string) => {
        item = IDs.activeSrcPage = newItem;
    };

    m.mount(root, {view: () => m(Layout, { 
        columns: ["50%"],
        content: [
            m(Layout, {
                content: m('.hs-layout .hs-execution', {id:IDs.menuID}, 'placeholder')
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
    return IDs;
}

/**
 * execute the provided script 
 * @param IDs provides the context in which the script is exceuted/
 */
function executeScript(IDs:CommentDescriptor) {
    const root = document.getElementById(IDs.menuID);
    if (root) {
        console.log(`root found for menuID ${IDs.menuID}`);
        try { IDs.executeScript(root); }
        catch(e) { 
            console.log("error executing script: " + e); 
            console.log(IDs.executeSource);
            console.log(e.stack);
        }
    } else {
        console.log(`root not found for menuID ${IDs.menuID}`);
    }
    m.redraw();
    return IDs;
}

function executeError(e:any) {
    console.log('rejection executing script:');
    console.log(e);
}
 
/**
 * Fills in all fields of the CommentDescriptor provided as `IDs`.
 * @param IDs the CommentDescriptor to complete
 * @param example the example string, including <example> tag
 * @return the script to execute, as a string
 */
function getCommentDescriptor(IDs:CommentDescriptor, example:string):string {
    let result = '';
    let attrs = example.match(/<example\s(\S*?)(\s|>)/i);
    if (attrs && attrs[1]) { 
        const at = attrs[1].split('=');
        IDs.attrs =  {[at[0]]: at[1]};
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

