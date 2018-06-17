if (!global['window']) {
    console.log('creating non-browser polyfill');
    // Polyfill DOM env for mithril
    global['window'] = require("mithril/test-utils/browserMock.js")();
    global['document'] = window.document;

}

const o = require("mithril/ospec/ospec");
const m = require("mithril");

const root = window.document.createElement("div");

o.spec('example', () => {
    let docsMenu:any;
    o.before(() => {
        m.mount(root, {view: () => m('', '')});
        docsMenu = root.childNodes[0];
    }); 
    o('DocsMenu exists', () => {
        o(docsMenu===undefined).equals(false)('should be defined');
    });
});
