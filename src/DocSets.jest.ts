import { DocSets } from './DocSets';
// import { log } from 'hsnode';
import { fs } from 'hsnode';

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
    } else {
        return fs.readJsonFile(`${__dirname}/example/${req.url}`);
    }
};


// const items = DocSets.get(); 

describe('DocSets', () => {
    beforeEach(() => DocSets.loadList('mylist.json'));

    it('shoud exist', () => {
        expect(DocSets).toBeDefined();
    });

    it('shoud have docSet', () => {
        expect(DocSets.get()).toHaveLength(1);
        expect(DocSets.get()[0]).toBe('hsDocs');
    });

    it('shoud return docSets for invalid lib', () =>{
        expect(DocSets.get('uhoh')).toHaveLength(1);
        expect(DocSets.get()[0]).toBe('hsDocs');
    });

    it('shoud have 12 children', () =>
        expect(DocSets.get('hsDocs').children.length).toBe(12)
    );

    it('shoud have element 1', () => {
        const elem = DocSets.get('hsDocs', 'hsDocs.DocSets');
        expect(elem.name).toEqual('DocSets');
        expect(elem.fullPath).toEqual('hsDocs.DocSets');
        expect(elem.children).toHaveLength(4);
        expect(elem.children[0].name).toEqual('DocSets');
        expect(elem.children[1].name).toEqual('FILE');
    });

    it('shoud have element 10', () => {
        const elem = DocSets.get('hsDocs', 'hsDocs.DocSets.DocSets.add');
        expect(elem.name).toEqual('add');
        expect(elem.fullPath).toEqual('hsDocs.DocSets.DocSets.add');
        expect(elem.signatures[0].parameters).toHaveLength(2);
        expect(DocSets.get('hsDocs', elem.id).name).toEqual('add');
    });
});

