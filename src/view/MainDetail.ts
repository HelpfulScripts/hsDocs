/**
 * # MainDetail
 * 
 */
/** */
import { Log }                  from 'hsutil'; const log = new Log('MainDetail');
import m from "mithril";
type Vnode = m.Vnode<any, any>;import { Layout }               from 'hslayout';
import { DocsNode }             from '../Nodes';
import { DocSets }              from '../DocSets';


/**
 * Creates Documentation on the main panel 
 */
export class MainDetail extends Layout { 
    getComponents(node:Vnode): Vnode {
        const lib =  m.route.param('lib');
        const field = m.route.param('field');
        node.attrs.route = undefined;

        let result = DocSets.nodeCount<=0? '...' :  (
            (field==='0' || field==='' || field==='overview')? 
                getOverview(DocSets.getNode(`${lib}.overview`, lib)) 
              : itemDoc(DocSets.getNode(field, lib))
        ); 
        return m('.hsdocs', [result || `no content for lib ${lib} and field ${field}`]); 
    }
}

/**
 * Checks if the project overview is being requested and returns the overview, 
 * or `undefined` if not available
 * @param mdl the module name to check
 * @return Vnode containing the overview file, or `undefined`
 */
function getOverview(node:DocsNode):Vnode {
    return node? m('div.hsdocs_head_comment', (node.getSignatures()? node.getSignatures()[0] : node).commentLong()) : 'overview unavailable';
}

/**
 * Creates documentation for standard items in the main panel
 * @param mdl the module to document on the main panel
 */
function itemDoc(node:DocsNode) {
    return !node? 'no item' : [
        node.title(), 
        node.getSignatures()? undefined : m('div.hsdocs_head_comment', node.commentLong()),
        node.members()
    ];
}
