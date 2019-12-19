import { commentLong } from './MainComment';
import { m } from 'hslayout';


const mdl = {
    comment: {
        text: `
        # complete comment
        with sub paragraphs and code:
        <code>
        line 1 {
        indented line
        }
        </code>
        `,
        shortText: `short example comment.`,
        tags: [{tag: 'description2', text:'other tag'}, {tag: 'other'}]
    },
    parameters: [{a: 5, b:'hi'}]
};

const mdl2 = {
    comment: {
        text: 'comment',
        tags: [{tag: 'description', text:'other tag'}, {tag: 'other'}],
        special: 0
    },
    parameters: [{a: 5, b:'hi'}]
};

m.route.get = () => '/api/hsDocs/0';

describe('commentLong', () => {
    let c:any;

    beforeAll((done) => {
        c = commentLong(mdl);
        setTimeout(done, 100);
    });

    it('should exist', ()=> {
        expect(commentLong).toBeDefined();
    });

    it('should translate commentLong', (done) => {
        expect(c).toMatchSnapshot();
        done();
    });
});

