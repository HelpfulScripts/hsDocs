/**
 * # MainDetail
 * 
 */
/** */
import { Log }          from 'hsutil'; const log = new Log('MainDetail');
import m                from "mithril";
import { Vnode }        from 'hswidget';
import { Widget }       from 'hswidget';
import { DocsNode }     from '../Nodes';
import { DocSets }      from '../DocSets';
import { DocsAttrs }    from './DocsMenu';

interface MainDetailAttrs extends DocsAttrs {

}
/**
 * Creates Documentation on the main panel 
 */
export class MainDetail extends Widget { 
    view(node:Vnode<MainDetailAttrs, this>) {
        const lib = node.attrs.lib;
        const field = node.attrs.field;
        let result = DocSets.nodeCount<=0? '...' :  (
            (field==='0' || field==='' || field==='overview')? 
                getOverview(DocSets.getNode(`${lib}.overview`, lib)) 
              : itemDoc(DocSets.getNode(field, lib))
        ); 
        return m('.hsdocs_detail', node.attrs, [result || `no content for lib ${lib} and field ${field}`]); 
    }
}

/**
 * Checks if the project overview is being requested and returns the overview, 
 * or `undefined` if not available
 * @param mdl the module name to check
 * @return Vnode containing the overview file, or `undefined`
 */
function getOverview(node:DocsNode):m.Child {
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
