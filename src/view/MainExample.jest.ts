import { example } from './MainExample';
import m from "mithril";

m.redraw = <m.Redraw>(() => undefined);
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
    let x:any;
    beforeAll(async(done) => {
        x = await example(exmp);
        done();
    });
    it('should exist', ()=>{
        expect(example).toBeDefined();
    });

    it('matches snapshot', (done) => {
        expect(x).toMatch(/<style><\/style><example id=hs\d* style=\"height:300px\" class=\"hs-layout-frame\"><\/example>/gm);
        done();
    });
});
