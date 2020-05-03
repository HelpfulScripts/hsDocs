/**
 * DocSets.ts. Loads the doc.json files to process and display as documentation.
 * Processing occurs in these steps:
 * 1. Load the index.json file that contains a list of doc.json files to load, one for each library to show
 * 2. Load each doc.json file, which describes a library
 * 3. Call DocSets.add to add the library name to the registry and create an index of entries for the library
 */

/** */
import { m }            from 'hslayout';
import { Log }          from 'hsutil'; const log = new Log('DocsSets');
import { DocsNode }     from './Nodes';

const DOCDIR:string = './data/';

/**
 * the default location for the index .json files, relative to the web page:
 * `'./data/index.json'`
 */
const FILE:string = './data/index.json';

export type json = any;

function matchAll(str:string, re:RegExp): string[] {
    const result:string[] = [];
    let partial:string[];
    while ((partial = re.exec(str)) !== null) {
        result.push(partial[1]);
        log.debug(log.inspect(partial));
    }
    return result;
}

/**
 * DocSets object. Keeps a list of registered docsets and 
 * provides access to elements of each docset.
 */
export class DocSets { 
    /** Contains references to the docsets and all elements per docset, accessible per ID. */
    // private static gList:List = {index:{}};

    private static libs:string[] = [];
    private static docs:string[] = [];

    /** an optional title for the set of DocSets loaded, as specified in the `index.json` file. */
    private static gTitle: string = '';
    private static nodeList = <{[id:string]: DocsNode}>{};
    
    public static nodeCount = 0;
    
    public static addNode(mdl:json, node:DocsNode) {
        const id = mdl.id;
        const lib =  mdl.lib;
        DocSets.nodeList[`${lib}.${id}`] = node;
        DocSets.nodeList[mdl.fullPath] = node;
// if (mdl.fullPath.indexOf('hsDocs.DocSets')>=0) { log.info(`added node ${id}: '${mdl.fullPath}'`); }
        DocSets.nodeCount++;
    }


    /**
     * Adds the docset in `content` to the `gList` at the position of `file` in `DocSets.docs`.
     * @param content the docSet content to add. 
     * @param file the file name from which the content was read. 
     */
    public static addDocSet(content:json, file:string):void {
        const lib = content.name;
        const i = DocSets.docs.indexOf(file);
        DocSets.libs[i] = lib;
        const root = DocsNode.traverse(content, lib);
        log.info(`traversed '${root.fullPath}'`);
    }
    
    public static getNode(id:string|number, lib:string):DocsNode {
        const key = ((typeof id === 'number') || (parseInt(''+id, 10)>=0))? `${lib}.${id}` : id;
        // log.info(`getNode id=${id}, lib=${lib} -> ${key}, typeof=${typeof id}, parseInt=${parseInt(''+id, 10)}`);
        if (DocSets.nodeList.length && !DocSets.nodeList[key]) { 
            log.warn(`did not find node for key '${key}' (id=${id}, lib=${lib})`); 
            log.warn(new Error().stack);
        }
        return DocSets.nodeList[key]; 
    }
    
    /**
     * returns the specified documentation element.
     * When called without parameters, a `string[lib]` of available docSets is returned.
     * When called with only `lib` specified, the corresponding docSet overview is returned.
     * @param lib specifies the docset to scan. 
     * @param id specifies the element within the docSet, either by its id number, or by its fully qualified path, 
     * e.g. 'hsDocs.DocSets.DocSets.add' 
     */
    public static getLibs():string[]{ 
        return DocSets.libs; 
    }

    /**
     * loads an index set and the docsets it contains from directory `dir`.
     * @param file the optional directory to read from. If unspecified, 
     * read from the index file specified by {@link DocSets.FILE `FILE`}.
     * @return a promise to load the index set
     */
    public static async loadList(file?:string):Promise<void> {
        /** load an `index.json` file that contains references to the DocSets to load. */
        async function getIndexFile(dir:string, url:string):Promise<boolean> {
            if (!url) { return false; }
            try {
                const result = await m.request({ method: "GET", url: file});
                DocSets.gTitle = result.title;
                DocSets.docs = result.docs.map((doc:string) => doc.indexOf(':')>0? doc : dir+doc);
                log.info(`found index file ${url} with ${DocSets.docs.length} library references`);
                return true;
            } catch(e) {
                return false;
            }
        }
        /** 
         * get all `jsons` in a directory specified by `url`. 
         * If the directory contains an `index.json`, calls `getIndexFile` on that file's url.
         */
        async function getDirJSONs(url:string):Promise<boolean> {
            let result = false;
            await m.request({ method: "GET", url: url, 
                // catch extract to avoid attempt to deserialize
                extract: async (xhr:any, options:any) => { 
                    const jsons = matchAll(xhr.responseText, /<a href="(\S*?.json)">/g);  // all *.json references
                    // check if index.jon exists:
                    const index = jsons.filter(m => m==='index.json')[0];
                    // const jsons = matches.filter(m => !m.startsWith('index'));

                    if (index) { 
                        result = await getIndexFile(dir, index); 
                    } else if (jsons.length) {
                        log.info(`found dir list in ${url}`);
                        DocSets.gTitle = '';
                        DocSets.docs = jsons;
                        result = true;
                    }
                }
            });
            return result;
        }
        let i = file.lastIndexOf('/');
        const dir = file.substring(0,i+1);
        
        let found = false;
        if (!found) { found = await getIndexFile(dir, file); }
        if (!found) { found = await getDirJSONs(dir); }
        if (!found) { found = await getDirJSONs(DOCDIR); }
        log.debug(`found ${DocSets.docs.length} dos sets: ${log.inspect(DocSets.docs, 5)}`);
        await Promise.all(DocSets.docs.map(async (f:string) => await loadDocSet(f))).catch(log.error);        
        log.info(`found ${DocSets.nodeCount} DocNodes`);
        m.redraw();
    }
}

/**
 * Loads a docset specified by file from the directory `dir`. 
 * Once received, the docset is registered in `modules` via the `add` method.
 * @param dir the directory to read from
 * @param file the `json` file to load as docset
 */
async function loadDocSet(file:string):Promise<void> {
    log.debug(`loading ${file}`);
    const r:json = await m.request({ method: "GET", url: file });
    DocSets.addDocSet(r, file);
}

