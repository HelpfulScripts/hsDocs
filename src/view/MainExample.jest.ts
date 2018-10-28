import { example } from './MainExample';
import { m } from 'hslayout';

m.redraw = () => 0;
m.mount = () => 0;

const exmp = `
    <example>
    <file='script.js'>
    const theContent = ['Top row: 50px', 'Bottom row: remainder']
    m.mount(root, {view: () => m(hslayout.Layout, {
        css: 'myColumn',
        rows: ["50px", "fill"], 
        content:theContent
        })
    });
    </file>
    <file='style.css'>
    </file>
    </example>
`;

describe('example', () => {
    it('should exist', ()=>{
        expect(example).toBeDefined();
    });

    it('matches snapshot', () => {
        expect(example(exmp)).toMatch(/<style><\/style><example id=hs\d* style=\"height:300px\" class=\"hs-layout-frame\"><\/example>/gm);
    });
});
