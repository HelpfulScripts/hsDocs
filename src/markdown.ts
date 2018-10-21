const showdown  = require('showdown');
import { m }  from 'hslayout';

/**
 * process a markdown comment string and returns the equivalent html syntax. 
 * @param text the comment to markdown
 * @param short if true, only the first paragraph is returned
 * @return the marked down comment
 */
export function markDown(text:string, short:boolean=false, currentRoute:string = m.route.get()):string {
    const converter = new showdown.Converter({
        tables:                 true,   // enables |...| style tables; requires 2nd |---| line
        ghCompatibleHeaderId:   true,   // github-style dash-separated header IDs
        smartIndentationFix:    true,   // fixes ES6 template indentations
        takslists:              true,   // enable - [ ] task; doesn't seem to work.
        strikethrough:          true    // enables ~~text~~
    });
    let result = (!text)? '' : converter.makeHtml(text);
    if (short) {
        const i = result.indexOf('</p>');
        if (i>0) { result = result.substring(0, i); }
    }
    result = substituteLinks(result, currentRoute);
    return result;
}

/**
 * replaces link statements in the comment with hyperlink references.
 * The format of a link statement is "{@link *docset*:*path* linked text}", where
 * - *docset* is the name of the docset
 * - *path* is the structural path of a component with steps on the path separated by a period,
 *    following the pattern *module*.*entity*.*member* with
 *     - *module* = the name of the module file
 *     - *entity* = [*class* | *function* | *variable*]
 *     - *member* = [*method* | *variable*]
 * - if *path* is omittied, or is `overview`, the library overview will be shown.
 *   
 * Examples: 
 * - '{@link hsDocs: Doc Overview}' -> {@link hsDocs: Doc Overview}
 * - '{@link hsDocs:DocSets.DocSets.add the `adds` function}' --> {@link hsDocs:DocSets.DocSets.add the `adds` function}
 * 
 * @param comment the comment in which to replace the links
 * @return the comment with substituted links 
 */
function substituteLinks(comment:string, currentRoute:string):string {
    /**
     * searches for pattern '/...'
     * @param route 
     */
    function deconstructRoute(route:string) {
        let lib, mod;
        route.replace(/\/([^\/.]*)\/([^\/\s]*$)/gi, (match, ...args) => {
            lib = args[0];
            mod = args[1];
            return '';
        }); 
        return [lib, mod];
    }

    function getLibMod(path:string) {
        let lib, mod, frag; 
        if (path.indexOf(':')>0) {
            [lib, mod] = path.split(':');
        } else  {
            lib = defLib;
            mod = path;
        }
        if (mod.indexOf('#')>0) {
            [mod, frag] = mod.split('#');
        }
        return [lib, mod, frag];       
    }

    let [defLib] = deconstructRoute(currentRoute);

    // regex: requires whitespace before {@link; otherwise treated as quoted '{@link...}'
    comment = comment.replace(/\s{@link ([\S]*)\s*([^}]+)}/gi, (match, ...args) => {
        const path = args[0];
        const text = args[1];
        let [lib, module] = getLibMod(path);        
        return (module === '' || module === '0' || module === 'overview')?
                ` <a href="#!/api/${lib}/0">${text}</a>` :
                ` <a href="#!/api/${lib}/${lib}.${module}">${text}</a>`;
    });
    return comment;

}
