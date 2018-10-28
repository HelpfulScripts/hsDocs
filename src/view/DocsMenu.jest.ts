import { DocsMenu } from './DocsMenu';
import { m }        from "hslayout";
import { log }      from 'hsnode';

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
        "groups": [],
        "sources": []
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
        "comment": {},
        "groups": [],
        "sources": []
    }]
};

m.request = (req: any) => {
    log.debug(`requesting ${req.url}`);
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
    beforeAll((done) => { 
        m.mount(root, { view: () => { return m(DocsMenu, {docSet:"mylist.json"});} }); 
        setTimeout(done, 200);
    });

    it('should match snapshot', (done)=>{
        expect(root).toMatchSnapshot();
        done();
    });
});
