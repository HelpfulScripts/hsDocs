/**
 * Site documentation
 */

/** */
import m from "mithril";
type Vnode = m.Vnode<any, any>;
import { GridColumns }  from 'hswidget';
import { GridRows }     from 'hswidget';
import { DocsMenu }     from './view/DocsMenu';
import { LeftNav }      from './view/LeftNav';
import { MainDetail }   from './view/MainDetail';


export function init() {
    const Router = {
        view: (node: Vnode) => {
            const lib = node.attrs.lib;
            const field = node.attrs.field;
            return m(GridColumns, { class:'hsdocs', template: '200px auto' }, [
                m(GridRows, { class:'hsdocs_leftpane', template: '35px auto 14px' }, [
                    m('.hsdocs_title', { href:'https://github.com/HelpfulScripts/hsDocs'}, 'hsDocs'), 
                    m(LeftNav, { lib:lib, field:field}),
                    m('.hsdocs_footer', m.trust(`powered by <i><a href='https://github.com/HelpfulScripts/hsDocs' target='_blank'>hsDocs</a></i>`))
                ]),
                m(GridRows, { class:'hsdocs_left', template: '35px auto'}, [
                    m(DocsMenu,   { docSet:'./data/index.json', lib:lib, field:field}),
                    m(MainDetail, { lib:lib, field:field}) 
                ]),
            ]);
        }
    };
    m.route(document.body, '/api', { 
        '/api':             Router,
        '/api/:lib':        Router,
        '/api/:lib/:field': Router
    });
}
