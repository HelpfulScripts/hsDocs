/**
 * Site documentation
 */

/** */
import * as hslayout  from 'hslayout';
import * as header  from './view/DocsMenu';
import * as left    from './view/LeftNav';
import * as main    from './view/MainDetail';

// import { Layout }   from 'hslayout';
// import { m } from 'hslayout';
// import { Config }   from 'hslayout';

const TitleHeight   = '30px'; 
const FooterHeight  = '10px';  
const LeftNavWidth  = '200px';

const myConfig2 = {
    root: { Layout: { // whole page
        rows:  [TitleHeight, "fill", FooterHeight],
        css: '.hs-site-main',
        content: ['header', 'body', 'footer'] 
    }},
    header: { Layout:{ // top row
        columns: [LeftNavWidth, "fill"],
        css: '.hs-site-header',
        content: ['title', 'menu']                
    }},
    body: { Layout:{ // main part
        columns: [LeftNavWidth, "fill"], 
        content: ['leftnav', 'mainDetail']                
    }},
    footer: {Layout: { // footer
        css: '.hs-site-footer',
        content: '(c) Helpful Scripts'
    }},
    title: {Layout:    { 
        css: '.hs-site-title',
        content: 'HSDocs', 
        href: 'https://github.com/HelpfulScripts/hsDocs' 
    }},
    menu: { DocsMenu:    { 
        docSet:"./data/index.json"
    }},
    leftnav:    {LeftNav:    {}},
    mainDetail: {MainDetail: {}}
}; 

const docWindow = {
    view: () => hslayout.m(hslayout.Layout, {
        rows:  [TitleHeight, "fill", FooterHeight],
        css: '.hs-site-main',
        content: [
            hslayout.m(docHeader, {}),
            hslayout.m(docBody, {}),
            hslayout.m(docFooter, {})
        ] 
    })
};

const docHeader = {
    view: () => hslayout.m(hslayout.Layout, { 
        columns: [LeftNavWidth, "fill"],
        css: '.hs-site-header',
        content: [
            hslayout.m(title, {}),
            hslayout.m(menu, {})
        ]                
    })
};

const docBody = {
    view: () => hslayout.m(hslayout.Layout, { 
        columns: [LeftNavWidth, "fill"], 
        content: [
            hslayout.m(left.LeftNav, {}), 
            hslayout.m(main.MainDetail, {})
        ]                
    })
};

const docFooter = {
    view: () => hslayout.m(hslayout.Layout, {
        css: '.hs-site-footer',
        content: '(c) Helpful Scripts'
    })
};

const title = {
    view: () => hslayout.m(hslayout.Layout, { 
        css: '.hs-site-title',
        content: 'HSDocs', 
        href: 'https://github.com/HelpfulScripts/hsDocs' 
    })
};

const menu = {
    view: () => hslayout.m(header.DocsMenu, { 
        docSet:"./data/index.json"
    })
};

const useConfig = false;

export function init() {
    const Router = {
        view: () => {
            const param = {route: {field:hslayout.m.route.param('field'), lib:hslayout.m.route.param('lib')}};
            return useConfig?
                hslayout.m(hslayout.Config, Object.assign({source: myConfig2, context: [hslayout, header, left, main]}, param)) :
                hslayout.m(docWindow, param);
        }
    };
    hslayout.m.route(document.body, '/api', { 
        '/api':             Router,
        '/api/:lib':        Router,
        '/api/:lib/:field': Router
    });
}
