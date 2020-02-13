import { DocSets } from './DocSets';
const fs = require('fs');

import { m } from 'hslayout';

const set = {
    "docs": [
        "hsDocs.json"
    ],
    "title": "HS Libraries"
};

m.request = (req: any) => {
    if (req.url === 'mylist.json') {
        return Promise.resolve(set);
    } else if(req.url.endsWith('.json')) {
        return new Promise((resolve:(data:any)=>void, reject:(err:any)=>void) => {
            fs.readFile(`${__dirname}/test/${req.url}`, 'utf8', (err:any, data:any) => {
                if (err) { throw err; }
                else { resolve(data); }
            });
        })
        .then((data:any) => (typeof data === 'string')? JSON.parse(data) : data)
        .catch(console.log)
        ;
    } else {
        return Promise.resolve('dir');
    }
};


// const items = DocSets.get(); 

describe('DocSets', () => {
    beforeEach(() => DocSets.loadList('mylist.json'));

    it('shoud exist', () => {
        expect(DocSets).toBeDefined();
    });

    it('shoud have docSet', () => {
        expect(DocSets.getLibs()).toHaveLength(1);
        expect(DocSets.getLibs()[0]).toBe('hsDocs');
    });

    it('shoud have 7 children for DocSets', () => {
        const node = DocSets.getNode('hsDocs.DocSets', 'hsDocs');
        expect(node.getName()).toEqual('DocSets');
        expect(node.fullPath).toEqual('hsDocs.DocSets');
        expect(node.children).toHaveLength(7);
    });

    it('shoud have element 1 for DocSets', () => {
        const node = DocSets.getNode('hsDocs.DocSets', 'hsDocs');
        expect(node.children[0].getName()).toEqual('DocSets');
        expect(node.children[1].getName()).toEqual('json');
    });

    it('shoud have element 10', () => {
        const node = DocSets.getNode('hsDocs.DocSets.DocSets.addDocSet', 'hsDocs', );
        expect(node.getName()).toEqual('addDocSet');
        expect(node.fullPath).toEqual('hsDocs.DocSets.DocSets.addDocSet');
        expect(node.getSignatures()[0].parameters).toHaveLength(2);
        expect(DocSets.getNode(node.id, 'hsDocs').getName()).toEqual('addDocSet');
    });
});

