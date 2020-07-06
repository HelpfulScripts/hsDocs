import { LeftNav } from './LeftNav';
import m from "mithril";
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
            fs.readFile(`${__dirname}/../test/${req.url}`, 'utf8', (err:any, data:any) => {
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

const route = {
    field: '0',
    lib: 'hsDocs'
};

m.route.param = (name?:string) => {
    if (name==='field') { return route.field; }
    if (name==='lib')   { return route.lib; }
    return '';
};


const root:any = window.document.createElement("body");


describe('LeftNav', () => {
    describe('overview', () => {
        beforeAll((done) => { 
            m.route.get = () => '/api/hsDocs/0';
            DocSets.loadList('mylist.json')
            .then(() => {
                route.field = '0';
                m.mount(root, { view: () => { return m(LeftNav, {});} }); 
                setTimeout(done, 200);
                m.redraw();
            });
        });
    
        it('exists', (done)=>{
            expect(LeftNav).toBeDefined();
            done();
        });
    
        it('matches snapshot', (done)=>{
            expect(root).toMatchSnapshot();
            done();
        });
    });
});
