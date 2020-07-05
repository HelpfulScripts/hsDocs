import { DocsMenu } from './DocsMenu';
import { DocSets }  from '../DocSets'; 
import m from "mithril";

const sets = {
    "docs": [
        "hsUtil.json",
        "hsDocs.json"
    ],
    "title": "HS Libraries"
};

const set1 = {
	"id": 0,
	"name": "hsUtil",
	"kind": 0,
	"flags": {},
	"children": [{
        "id": 1,
        "name": "\"Checksum\"",
        "kind": 1,
        "kindString": "External module",
        "flags": {},
        "originalName": "/Users/sth1pal/Documents/Development/JavaScript/nodejs/ts6/dev/hsLibs/standalone/hsUtil/src/Checksum.ts",
        "comment": {},
        "groups": <any[]>[],
        "sources": <any[]>[]
    }]
};

const set2 = {
	"id": 0,
	"name": "hsDocs",
	"kind": 0,
	"flags": {},
	"children": [{
        "id": 1,
        "name": "\"Checksum\"",
        "kind": 1,
        "kindString": "External module",
        "flags": {},
        "originalName": "/Users/sth1pal/Documents/Development/JavaScript/nodejs/ts6/dev/hsLibs/standalone/hsUtil/src/Checksum.ts",
        "comment": <any>{},
        "groups": <any[]>[],
        "sources": <any[]>[]
    }]
};

m.request = (req: any) => {
    let result;
    if (req.url === 'mylist.json') {
        result = sets;
    } else if (req.url === 'hsUtil.json'){
        result = set1;
    } else {
        result = set2;
    }
    return Promise.resolve(result).then(r => { m.redraw(); return r; });
};


const root:any = window.document.createElement("div");

describe('DocsMenu', () => {
    beforeAll(async (done) => { 
        await DocSets.loadList("mylist.json");
        m.mount(root, { view: () => m(DocsMenu, {docSet:"mylist.json"}) }); 
        setTimeout(done, 200);
    });

    it('should match snapshot', (done) => {
        expect(root).toMatchSnapshot();
        done();
    });

    // it ('should respond to click', (done) => {
    //     const menuItem = root.vnodes[0].instance.instance.children[0].instance.children[0].instance.children[1].instance.children[0];
    //     menuItem.events.onclick('hsDocs');
    //    setTimeout(()=>{
    //        console.log(menuItem);
    //    }, 100); 
    // });
});
