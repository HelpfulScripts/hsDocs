/**
 * Site documentation
 */

/** */
import * as hslayout  from 'hslayout';
import * as header  from './view/DocsMenu';
import * as left    from './view/LeftNav';
import * as main    from './view/MainDetail';


const TitleHeight   = '30px'; 
const FooterHeight  = '10px';  
const LeftNavWidth  = '200px';
const SiteName      = 'HSDocs'; 
const SiteLink      = 'https://github.com/HelpfulScripts/hsDocs';
 
const myConfig = {
    Layout: { // whole page
        rows:  [TitleHeight, "fill", FooterHeight],
        css: '.hs-site',
        content: [{
            Layout:{ // top row
                columns: [LeftNavWidth, "fill"],
                css: '.hs-site-header',
                content: [
                    { Layout:    { 
                        css: '.hs-site-title',
                        content: SiteName, 
                        href: SiteLink 
                    }},
                    { DocsMenu:    { docSet:"./data/index.json"}}
                ]                
            }},{
            Layout:{ // main part
                columns: [LeftNavWidth, "fill"], 
                content: [
                    { LeftNav:    {}},
                    { MainDetail: {}}
                ]                
            }},
            { Layout: { // footer
                css: '.hs-site-footer',
                content: '(c) Helpful Scripts'
            }}
        ] 
    },
    route: {
        default: '/api',
        paths: [
            '/api',             // defines `http://localhost/#!/api/
            '/api/:lib',        // defines `http://localhost/#!/api/:hsLib
            '/api/:lib/:field'  // defines `http://localhost/#!/api/:hsLib/:id        
        ]
    }
}; 


export function init() {
    new hslayout.HsConfig([hslayout, header, left, main]).attachNodeTree(myConfig, document.body);
}
