/**
 * DocSets.ts. Loads the doc.json files to process and display as documentation.
 * Processing occurs in these steps:
 * 1. Load the index.json file that contains a list of doc.json files to load, one for each library to show
 * 2. Load each doc.json file, which describes a library
 * 3. Call DocSets.add to add the library name to the registry and create an index of entries for the library
 */

/** */
import { m }    from '../node_modules/hslayout/index.js';

/**
 * the default location for the index .json files, relative to the web page:
 * `'./data/index.json'`
 */
const FILE:string = './data/index.json';


/**
 * DocSets object. Keeps a list of registered docsets and 
 * provides access to elements of each docset.
 */
export class DocSets { 
    /** Contains references to the docsets and all elements per docset, accessible per ID. */
    private static gList = <{set:string[], index:{}, docs:[string]}>{set:<string[]>[], index:{}, docs:<string[]>[]};
    private static gTitle: string;

    /**
     * Adds the docset in `content` to the `gList` at the position of `file` in `DocSets.gList.docs`.
     * @param content the docSet content to add. 
     * @param file the file name from which the content was read. 
     */
    public static add(content:any, file:string) {
        const lib = content.name;
        const i = DocSets.gList.docs.indexOf(file);
        DocSets.gList.set[i] = lib;
        DocSets.gList.index[lib] = {};
        recursiveIndex(content, DocSets.gList.index[lib], lib);
    }

    /**
     * loads an index set and the docsets it contains from driectory `dir`.
     * @param file the optional directory to read from. If unspecified, 
     * read from the index file specified by {@link DocSets.FILE `FILE`}.
     * @return a promise to load the index set
     */
    public static loadList(file?:string):Promise<void> {
        file = file;   
        let i = file.lastIndexOf('/');
        const dir = file.substring(0,i+1);
        return m.request({ method: "GET", url: file || FILE})
        .then((result:any) => {
            DocSets.gTitle = result.title;
            DocSets.gList.docs = result.docs;
            return Promise.all(result.docs.map((f:string) => loadDocSet(dir, f)));            
        })
        .catch(console.log);
    }

    /**
     * returns the specified documentation element.
     * When called without parameters, a `string[lib]` of available docSets is returned.
     * When called with only `lib` specified, the corresponding docSet overview is returned.
     * @param lib specifies the docset to scan. 
     * @param id specifies the element within the docSet, either by its id number, or by its fully qualified path, 
     * e.g. 'hsDocs.DocSets.DocSets.add' 
     */
    public static get(lib?:string, id:number|string=0) { 
        return (lib && DocSets.gList.index[lib])?
            DocSets.gList.index[lib][id+'']
          : DocSets.gList.set; 
    }
}

/**
 * Loads a docset specified by file from the directory `dir`. 
 * Once received, the docset is registered in `modules` via the `add` method.
 * @param dir the directory to read from
 * @param file the `json` file to load as docset
 */
function loadDocSet(dir:string, file:string):Promise<void> {
    return m.request({ method: "GET", url: dir+file })
        .then((r:any) => DocSets.add(r, file))
        .catch(console.log);
}

/**
 * recurses through the docset and registers all `children` entries of an entry by id,
 * starting with the root entry.
 * @param content the docset object literal to traverse
 * @param index the index in which to register the entries
 * @param lib the docset name, used for name validation
 */
function recursiveIndex(content:any, index:any, lib:string, path='') {
    function getNewPath(content:any) {
        content.name = content.name.replace(/["'](.+)["']|(.+)/g, "$1$2");  // remove quotes 
        // const elName  = content.name.match(/([^\/]+)$/)[1];         // name = part after last /
        const elName  = content.name.replace(/\//g, '.');         // "a/b" => "a.b" /
        content.name = elName;
        return content.fullPath = (path==='')? elName : `${path}.${elName}`;
    }

    function markIfModule(content:any) {
        if (content.comment && content.comment.tags) {
            content.comment.tags.forEach((tag:any) => {
                if (tag.tag === 'module') {
                    content.innerModule = tag.text.trim();
                }
            });
        }
    }
    content.lib = lib;
    if (typeof content === 'object' && content.name) {
        const newPath = getNewPath(content);

        markIfModule(content);

        index[content.id+''] = content;
        if (newPath.length>0) { index[newPath] = content; }

        if (content.children) {
            content.children.map((c:any) => recursiveIndex(c, index, lib, newPath));
        }
        if (content.signatures) {
            content.signatures.map((c:any) => recursiveIndex(c, index, lib, newPath));
        }
        if (content.parameters) {
            content.parameters.map((c:any) => recursiveIndex(c, index, lib, newPath));
        }
        if (content.type && content.type.declaration && content.type.declaration.children) {
            content.type.declaration.children.map((c:any) => recursiveIndex(c, index, lib, newPath));
        }
    }
}
