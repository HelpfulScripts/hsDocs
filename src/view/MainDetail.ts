/**
 * # MainDetail
 * 
 */
/** */
import { log as _log }          from 'hsutil'; const log = _log('MainDetail');
import { m, Vnode}              from 'hslayout';
import { Layout }               from 'hslayout';
import { commentLong }          from './MainComment';
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
                getOverview(DocSets.getNode(`${lib}.overview`, lib)) : itemDoc(DocSets.getNode(field, lib))
        ); 
        return m('.hsdocs_main', [result || `no content for lib ${lib} and field ${field}`]); 
    }
}

/**
 * Checks if the project overview is being requested and returns the overview, 
 * or `undefined` if not available
 * @param mdl the module name to check
 * @return Vnode containing the overview file, or `undefined`
 */
function getOverview(node:DocsNode):Vnode {
    return node? m('div.hsdocs_head', commentLong(node.getSignatures()? node.getSignatures()[0] : node)) : 'overview unavailable';
}

/**
 * Creates documentation for standard items in the main panel
 * @param mdl the module to document on the main panel
 */
function itemDoc(node:DocsNode) {
    // log.info(`get itemDoc '${node? node.fullPath : 'node undefined'}'`);
    return !node? 'no item' : [
        node.title(), 
        m('div.hsdocs_head', node.commentLong()),
        node.members()
    ];
}
