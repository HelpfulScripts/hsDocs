import { flags } from './Parts';
import { itemTooltip } from './Parts';
import { extensionOf } from './Parts';
import { inheritedFrom } from './Parts';
import { sourceLink } from './Parts';
import { signature } from './Parts';
import { type } from './Parts';
import { makeID } from './Parts';

import { DocSets } from '../DocSets';
import { m } from 'hslayout';
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

describe('parts', () => {
    beforeAll(() => { 
        m.route.get = () => '/api/hsDocs/0';
        return DocSets.loadList('mylist.json');
    });
    describe('flags', () => {
        let mdl:any;
        beforeEach(() => {
            mdl = {
                flags:{isExported:true, isExternal:true, isPublic:true, isConstructorProperty:true, 
                       isAbstract:true, isConst:true, isStatic:true, isOptional:true, isUndefined:true},
                kindString:' '
            };
        });
        it('exists',                    ()=> expect(flags).toBeDefined());
        it('creates',                   () =>  expect(flags(mdl)).toMatchSnapshot());
        it('creates ignoring const',    () => expect(flags(mdl, ['const'])).toMatchSnapshot());
        it('creates ignoring export', () => {
            mdl.kindString = 'Method';
            expect(flags(mdl)).toMatchSnapshot();
        });
        it('creates missing flags', () => {
            mdl.kindString = 'Method';
            expect(flags({})).toMatchSnapshot();
        });
    });
    describe('itemTooltip', () => {
        let mdl:any;
        beforeEach(() => {
            mdl = {
                name:'test'
            };
        });
        it('exists', ()=>{
            expect(itemTooltip).toBeDefined();
        });
        it('creates', ()=>{
            expect(itemTooltip(mdl)).toMatchSnapshot();
        });
    });
    describe('extensionOf', () => {
        let mdl:any;
        beforeEach(() => {
            mdl = {
                lib:'hsDocs',
                extendedTypes:[{id:275, name:'id275'}]
            };
        });
        it('exists', ()=>{
            expect(extensionOf).toBeDefined();
        });
        it('creates', ()=>{
            expect(extensionOf(mdl)).toMatchSnapshot();
        });
    });
    describe('inheritedFrom', () => {
        let mdl:any;
        beforeEach(() => {
            mdl = {
                lib:'hsDocs',
                inheritedFrom:{id:275}
            };
        });
        it('exists', ()=>{
            expect(inheritedFrom).toBeDefined();
        });
        it('creates', ()=>{
            expect(inheritedFrom(mdl)).toMatchSnapshot();
        });
    });
    describe('sourceLink', () => {
        let mdl:any;
        beforeEach(() => {
            mdl = {
                lib:'hsDocs',
                sources:[{fileName:'./hsDocs/myfile.ts'}]
            };
        });
        it('exists', ()=>{
            expect(sourceLink).toBeDefined();
        });
        it('creates', ()=>{
            expect(sourceLink(mdl)).toBeDefined();
        });
        it('creates, no source', ()=>{
            mdl.sources[0].fileName='';
            expect(sourceLink(mdl)).toBeDefined();
        });
    });
    describe('signature', () => {
        it('exists', ()=>{
            expect(signature).toBeDefined();
        });
    });
    describe('type', () => {
        let t:any;
        beforeEach(() => { t = { type:{id:161, type:'', elementType:{}, 
                                elements:[{}], types:[], declaration:{children:[]}}}; });
        it('exists', ()=>{
            expect(type).toBeDefined();
        });
        it('creates array', ()=>{
            t.type.type = 'array';
            expect(type(t, 'hsDocs')).toMatchSnapshot();
        });
        it('creates tuple', ()=>{
            t.type.type = 'tuple';
            expect(type(t, 'hsDocs')).toMatchSnapshot();
        });
        it('creates instrinct', ()=>{
            t.type.type = 'instrinct';
            expect(type(t, 'hsDocs')).toMatchSnapshot();
        });
        it('creates stringLiteral', ()=>{
            t.type.type = 'stringLiteral';
            expect(type(t, 'hsDocs')).toMatchSnapshot();
        });
        it('creates union', ()=>{
            t.type.type = 'union';
            expect(type(t, 'hsDocs')).toMatchSnapshot();
        });
        it('creates reference', ()=>{
            t.type.type = 'reference';
            expect(type(t, 'hsDocs')).toMatchSnapshot();
        });
        it('creates reflection', ()=>{
            t.type.type = 'reflection';
            expect(type(t, 'hsDocs')).toMatchSnapshot();
        });
        it('creates default', ()=>{
            t.type.type = 'bogus';
            expect(type(t, 'hsDocs')).toMatchSnapshot();
        });
    });
    describe('makeID', () => {
        it('exists', ()=>{
            expect(makeID).toBeDefined();
        });
    });
});
