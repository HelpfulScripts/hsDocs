import { MainDetail } from './MainDetail';
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
