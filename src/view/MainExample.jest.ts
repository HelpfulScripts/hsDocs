import { example } from './MainExample';
import m from "mithril";

m.redraw = <m.Redraw>(() => undefined);
m.mount = () => 0;

const exmp = `
    <example>
    <file='script.js'>
    const theContent = ['Top row: 50px', 'Bottom row: remainder']
    m.mount(root, {view: () => m('', 'the test')
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
        expect(x).toMatch(/<div class='example'><style><\/style><div id='hs100000' style='height:300px'><\/div><\/div>/gm);
        done();
    });
});
