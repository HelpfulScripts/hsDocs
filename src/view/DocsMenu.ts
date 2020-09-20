import { DocSets }      from '../DocSets'; 
import { Vnode }        from 'hswidget';
import { MenuAttrs }    from 'hswidget';
import { WidgetAttrs }  from 'hswidget';
import { Widget }       from 'hswidget';
import { Menu }         from 'hswidget';
import { Log }          from 'hsutil'; const log = new Log('DocsMenu');
import m                from "mithril";


export interface DocsAttrs extends WidgetAttrs {
    lib?: string;
    field?: string;
}

interface DocsMenuAttrs extends DocsAttrs {
    docSet: string;
}

/**
 * Creates the title menu for selecting between the different docsets.
 * Instantiate the DocsMenu via a standard `mithril` call:```
 *    m(DocsMenu, { docSet:<pathToIndexFile>})
 * ```
 * DocsMenu performs the following actions:
 * - for the first call of the view lifecycle hook, the available docSets are loaded.
 *   DocsMenu searches for an index `json` file at the location specified in the 
 *   `docSet` field of the `node.attrs` parameter. If none is specified, the 
 *   default is used as specified in the {@link hsDocs:DocSets.FILE DocSets FILE} setting.
 * - DocsMenu retrieves all available docSets via {@link hsDocs:DocSets.DocSets.get DocSets.get}.
 * - DocsMenu creates a `SelectorDesc` structure with a {@link hsWidget:hsSelector.SelectorDesc.clicked `clicked`} callback that initiates a route change 
 *   to the selected docSet
 */
export class DocsMenu extends Widget {
    async load(docSet:string) {        
        try {    
            await DocSets.loadList(docSet);
            DocSets.getLibs().forEach(set => DocSets.getNode(0, set));
            // m.redraw();
        }
        catch(e) {
            // some weird error in `m.request`
            if (e.message !== 'this is undefined') {
                log.error(e.message);
                log.error(e);
            }
        };

    }
    view(node:Vnode<DocsMenuAttrs, this>) {
        const lib = node.attrs.lib;
        // const field = node.attrs.field;
        const items = DocSets.getLibs(); 
        if (items.length === 0) { this.load(node.attrs.docSet); }
        return m(Menu, this.attrs(node.attrs, <MenuAttrs>{
            onclick: (index:number) => m.route.set('/api/:lib/0', {lib:items[index]}),
            initial: items.indexOf(lib),
            class:'hsdocs_menu'
        }), items);
    }
}