import { MainDetail } from './MainDetail';
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
    } else {
        return new Promise((resolve:(data:any)=>void, reject:(err:any)=>void) => {
            fs.readFile(`${__dirname}/../example/${req.url}`, 'utf8', (err:any, data:any) => {
                if (err) { throw err; }
                else { resolve(data); }
            });
        })
        .then((data:any) => (typeof data === 'string')? JSON.parse(data) : data)
        .catch(console.log)
        ;
    }
};

const root:any = window.document.createElement("body");


describe('MaiDetail', () => {
    describe('overview', () => {
        beforeAll((done) => { 
            m.route.get = () => '/api/hsDocs/0';
            DocSets.loadList('mylist.json')
            .then(() => {
                m.mount(root, { view: () => { return m(MainDetail, { route:{lib: 'hsDocs', field:'0'}});} }); 
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
                m.mount(root, { view: () => { return m(MainDetail, { route:{lib: 'hsDocs', field:'hsDocs.DocSets'}});} }); 
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
                m.mount(root, { view: () => { return m(MainDetail, { route:{lib: 'hsDocs', field:'hsDocs.DocSets.DocSets.add'}});} }); 
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
