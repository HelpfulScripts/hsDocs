/**
 * Site documentation
 */

/** */
import * as hslayout  from 'hslayout';
import * as header  from './view/DocsMenu';
import * as left    from './view/LeftNav';
import * as main    from './view/MainDetail';

const design = {
    root: { Layout: { 
        columns: ["200px", "fill"],
        css: ".hs-site-main",
        content: ["LeftPane", "Main"] 
    }},
    LeftPane: { Layout: {
        rows: ["30px", "fill", "14px"],
        content: ["title", "leftnav", "footer"]
    }},
    Main: { Layout: {
        rows: ["30px", "fill"],
        content: ["menu", "mainDetail"]
    }},
    title: {"Layout":    { 
        css: ".hs-site-title",
        content: "hsDocs", 
        href: "https://github.com/HelpfulScripts/hsDocs" 
    }},
    leftnav: {"LeftNav":    {}},
    footer: {"Layout": {
        css: ".hs-site-footer",
        content: "powered by <i><a href='https://github.com/HelpfulScripts/hsDocs' target='_blank'>hsDocs</a></i>"
    }},
    menu: { "DocsMenu":    { 
        docSet:"./data/index.json"
    }},
    mainDetail: {"MainDetail": {}}
};

export function init() {
    const Router = {
        view: () => hslayout.m(hslayout.Config, 
            Object.assign({source:design, context: [hslayout, header, left, main]}, 
            {
                route: {field:hslayout.m.route.param('field'), 
                lib:hslayout.m.route.param('lib')}
            }
        ))
    };
    hslayout.m.route(document.body, '/api', { 
        '/api':             Router,
        '/api/:lib':        Router,
        '/api/:lib/:field': Router
    });
}
