/**
 * Site documentation
 */

/** */
import m from "mithril";
type Vnode = m.Vnode<any, any>;
import * as hslayout  from 'hslayout';
import * as header  from './view/DocsMenu';
import * as left    from './view/LeftNav';
import * as main    from './view/MainDetail';

const design = {
    root: { Layout: { 
        columns: ["200px", "fill"],
        css: ".hsdocs",
        content: ["LeftPane", "Main"] 
    }},
    LeftPane: { Layout: {
        css: ".hsdocs_leftpane",
        rows: ["30px", "fill", "14px"],
        content: ["title", "leftnav", "footer"]
    }},
    Main: { Layout: {
        css: ".hsdocs_left",
        rows: ["30px", "fill"],
        content: ["menu", "mainDetail"]
    }},
    title: {"Layout":    { 
        css: ".hsdocs_title",
        content: "hsDocs", 
        href: "https://github.com/HelpfulScripts/hsDocs" 
    }},
    leftnav: {"LeftNav":    {
        css: ".hsdocs_leftnav",
    }},
    footer: {"Layout": {
        css: ".hsdocs_footer",
        content: "powered by <i><a href='https://github.com/HelpfulScripts/hsDocs' target='_blank'>hsDocs</a></i>"
    }},
    menu: { "DocsMenu":    { 
        css: '.hsdocs_menu',
        docSet:"./data/index.json"
    }},
    mainDetail: {"MainDetail": {
        css: '.hsdocs_detail',
    }}
};

export function init() {
    const Router = {
        view: () => m(hslayout.Config, 
            Object.assign({source:design, context: [hslayout, header, left, main]}, 
            {
                route: {field:m.route.param('field'), 
                lib:m.route.param('lib')}
            }
        ))
    };
    m.route(document.body, '/api', { 
        '/api':             Router,
        '/api/:lib':        Router,
        '/api/:lib/:field': Router
    });
}
