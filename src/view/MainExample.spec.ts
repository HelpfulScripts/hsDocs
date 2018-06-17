const hslayout = require('hslayout');
const m = hslayout.m;
const o = hslayout.o;


o.spec('example', () => {
    let docsMenu:any;
    o.before(() => {
        m.mount(o.root, {view: () => m('', '')});
        docsMenu = o.root.childNodes[0];
    }); 
    o('DocsMenu exists', () => {
        o(docsMenu===undefined).equals(false)('should be defined');
    });
});
