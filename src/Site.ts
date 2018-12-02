/**
 * Site documentation
 */

/** */
import * as hslayout  from 'hslayout';
import * as header  from './view/DocsMenu';
import * as left    from './view/LeftNav';
import * as main    from './view/MainDetail';

import {m, Vnode}   from 'hslayout';
import { Config }   from 'hslayout';

const TitleHeight   = '30px'; 
const FooterHeight  = '10px';  
const LeftNavWidth  = '200px';
const SiteName      = 'HSDocs'; 
const SiteLink      = 'https://github.com/HelpfulScripts/hsDocs';

const myConfig2 = {
    root: { Layout: { // whole page
        rows:  [TitleHeight, "fill", FooterHeight],
        css: '.hs-site',
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
        content: SiteName, 
        href: SiteLink 
    }},
    menu: { DocsMenu:    { 
        docSet:"./data/index.json"
    }},
    leftnav:    {LeftNav:    {}},
    mainDetail: {MainDetail: {}}
}; 


export function init() {
    const Router = {
        view: (node:Vnode) =>
            m(Config, Object.assign({source: myConfig2, context: [hslayout, header, left, main]}, node.attrs))
    };
    m.route(document.body, '/api', { 
        '/api':             Router,
        '/api/:lib':        Router,
        '/api/:lib/:field': Router
    });
}
