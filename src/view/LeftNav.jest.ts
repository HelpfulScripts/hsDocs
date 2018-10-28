import { LeftNav } from './LeftNav';
import { m } from 'hslayout';
import { fs } from 'hsnode';
import { DocSets } from '../DocSets';


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
        return fs.readJsonFile(`${__dirname}/../example/${req.url}`);
    }
};

const root:any = window.document.createElement("body");


describe('LeftNav', () => {
    beforeAll((done) => { 
        DocSets.loadList('mylist.json')
        .then(() => {
            m.mount(root, { view: () => { return m(LeftNav, { route:{lib: 'hsDocs', field:'0'}});} }); 
            setTimeout(done, 200);
            m.redraw();
        });
    });

    it('should exist', (done)=>{
        expect(LeftNav).toBeDefined();
        done();
    });

    it('shoud match snapshot', (done) => {
        expect(root).toMatchSnapshot();
        done();
    });
});


