import { markDown } from './markdown';
import m from "mithril";


describe('markdown', () => {
    test('markDown long', ()=>{
        expect(markDown('*bold*', false, '#')).toEqual('<p><em>bold</em></p>');
    });
    
    test('markDown default long', ()=>{
        m.route.get = () => '#';
        expect(markDown('*bold*')).toEqual('<p><em>bold</em></p>');
    });
    
    test('markDown short', ()=>{
        expect(markDown('*bold*', true, '#')).toEqual('<p><em>bold</em>');
    });

    test('links', () => {
        expect(markDown('a {@link hsDocs/one two}', true, '#')).toEqual('<p>a <a href=\"#!/api/undefined/undefined.hsDocs/one\">two</a>');
        expect(markDown('a {@link hsDocs:one two}', true, '#')).toEqual('<p>a <a href=\"#!/api/hsDocs/hsDocs.one\">two</a>');
        expect(markDown('a {@link hsDocs#one two}', true, '#')).toEqual('<p>a <a href=\"#!/api/undefined/undefined.hsDocs\">two</a>');
    });
});
