import { m, Vnode, Layout }         from 'hslayout';
import { DocSets }                  from '../DocSets'; 
import { Menu, SelectorDesc }       from 'hswidget';
import { log as gLog }              from 'hsutil'; const log = gLog('DocsMenu');
import { testNode }                 from '../Types';

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
export class DocsMenu extends Layout {
    docSet = '';

    private getDesc(attrs:any):SelectorDesc { 
        if (this.docSet !== attrs.docSet) {
            this.docSet = attrs.docSet;
            DocSets.loadList(attrs.docSet)
            .then(() => {
                m.redraw();
                DocSets.get().map((set:string) => {
                    const mdl = DocSets.get(set);
                    const counts = testNode(mdl);
                    log.debug(`testing getDesc ${mdl.name}: ${log.inspect(counts)} tests run`);            
                });
            })
            .catch(log.error);
        }
        const items = DocSets.get(); 
        return {
            items: items.map((c:string) => c),
            // defaultItem: (attrs.route && attrs.route.lib)? attrs.route.lib : items[0],
            defaultItem: m.route.param('lib') || items[0],
            clicked: (item:string) => m.route.set('/api/:lib/0', {lib:item})
        };
    }

    getComponents(node:Vnode):Vnode {
        const desc:SelectorDesc = this.getDesc(node.attrs);
        return m(Menu, {desc: desc});
    }
}