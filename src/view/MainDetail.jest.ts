import { MainDetail }   from './MainDetail';
import m                from "mithril";
import { Log }          from 'hsnode'; const log = new Log('MainDetail.jest');
import { DocSets }      from '../DocSets';
import { libLinkByPath } from '../NodesDisplay';
const fs = require('fs');


const set = {
    "docs": [
        "hsDocs.json",
        "hsGraphD3.json",
        "hsWidget.json",
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
    lib: 'hsWidget'
};

m.route.param = (name?:string):string => {
    if (name==='field') { return route.field; }
    if (name==='lib')   { return route.lib; }
    return '';
};


describe('MainDetail', () => {
    describe('overview', () => {
        const root:any = window.document.createElement("body");
        beforeAll(async (done) => { 
            m.route.get = () => '/api/hsDocs/0';
            await DocSets.loadList('mylist.json')
            route.field = '0';
            // route.field = 'hsGraphD3.plots.Pie.Pie';
            m.mount(root, { view: () => m(MainDetail, {lib:route.lib, field:route.field}) }); 
            done();
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
        const root:any = window.document.createElement("body");
        beforeAll( async (done) => { 
            m.route.get = () => '/api/hsDocs/hsDocs.DocSets';
            await DocSets.loadList('mylist.json')
            route.field = 'hsDocs.DocSets';
            m.mount(root, { view: () => m(MainDetail, {lib:route.lib, field:route.field}) }); 
            done();
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
        const root:any = window.document.createElement("body");
        beforeAll(async (done) => { 
            m.route.get = () => '/api/hsDocs/hsDocs.DocSets.DocSets.add';
            await DocSets.loadList('mylist.json')
            route.field = 'hsDocs.DocSets.DocSets.add';
            m.mount(root, { view: () => { return m(MainDetail, {lib:route.lib, field:route.field});} }); 
            done();
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

    describe('hsGraphD3.plots.Pie.Pie', () => {
        const root:any = window.document.createElement("body");
        beforeAll(async (done) => { 
            m.route.get = () => '/api/hsGraphD3/hsGraphD3.plots.Pie.Pie';
            await DocSets.loadList('mylist.json')
            route.lib = 'hsGraphD3';
            route.field = 'hsGraphD3.plots.Pie.Pie';
            m.mount(root, { view: () => { return m(MainDetail, {lib:route.lib, field:route.field});} }); 
            done();
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
