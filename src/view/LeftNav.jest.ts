import { LeftNav } from './LeftNav';
import { m } from 'hslayout';
import { DocSets } from '../DocSets';
const fs = require('fs');


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
            fs.readFile(`${__dirname}/../example/${req.url}`, 'utf8', (err:any, data:any) => {
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

m.route.param = (name:string) => {
    if (name==='field') { return '0'; }
    if (name==='lib')   { return 'hsDocs'; }
    return '';
};

const root:any = window.document.createElement("body");


describe('LeftNav', () => {
    beforeAll((done) => { 
        DocSets.loadList('mylist.json')
        .then(() => {
            m.mount(root, { view: () => { return m(LeftNav, { route:{lib: 'hsDocs', field:'0'}});} }); 
            setTimeout(() => {
                m.redraw();
                done();
            }, 500);
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


