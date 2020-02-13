import { MainDetail } from './MainDetail';
import { m } from 'hslayout';
import { DocSets } from '../DocSets';
const fs = require('fs');


const set = {
    "docs": [
        "hsDocs.json",
        "hsGraphD3.json",
        "hsWidget.json",
        "hsLayout.json",
        "hsNode.json",
        "hsUtil.json"
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
    lib: 'hsGraphD3'
};

m.route.param = (name:string) => {
    if (name==='field') { return route.field; }
    if (name==='lib')   { return route.lib; }
    return '';
};


const root:any = window.document.createElement("body");


describe('MainDetail', () => {
    describe('overview', () => {
        beforeAll((done) => { 
            m.route.get = () => '/api/hsDocs/0';
            DocSets.loadList('mylist.json')
            .then(() => {
                route.field = '0';
                m.mount(root, { view: () => { return m(MainDetail, {});} }); 
                setTimeout(done, 200);
                m.redraw();
            });
        });
    
        it('exists', (done)=>{
            expect(MainDetail).toBeDefined();
            done();
        });
    
        it('matches snapshot', (done)=>{
            expect(root).toMatchSnapshot();
            done();
        });
    });

    describe('hsDocs.DocSets', () => {
        beforeAll((done) => { 
            m.route.get = () => '/api/hsDocs/hsDocs.DocSets';
            DocSets.loadList('mylist.json')
            .then(() => {
                route.field = 'hsDocs.DocSets';
                m.mount(root, { view: () => { return m(MainDetail, { });} }); 
                setTimeout(done, 200);
                m.redraw();
            });
        });
    
        it('exists', (done)=>{
            expect(MainDetail).toBeDefined();
            done();
        });
    
        it('matches snapshot', (done)=>{
            expect(root).toMatchSnapshot();
            done();
        });
    });

    describe('hsDocs.DocSets.DocSets.add', () => {
        beforeAll((done) => { 
            m.route.get = () => '/api/hsDocs/hsDocs.DocSets.DocSets.add';
            DocSets.loadList('mylist.json')
            .then(() => {
                route.field = 'hsDocs.DocSets.DocSets.add';
                m.mount(root, { view: () => { return m(MainDetail, { });} }); 
                setTimeout(done, 200);
                m.redraw();
            });
        });
    
        it('exists', (done)=>{
            expect(MainDetail).toBeDefined();
            done();
        });
    
        it('matches snapshot', (done)=>{
            expect(root).toMatchSnapshot();
            done();
        });
    });
});
