import { commentLong, comment } from './MainComment';
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

describe('comment', () => {
    let c1, c2, c3;

    beforeAll((done) => {
        c1 = comment(mdl);
        c2 = comment(mdl, true);
        c3 = comment(mdl2, true);
        setTimeout(done, 100);
    });

    it('should exist', ()=> {
        expect(comment).toBeDefined();
    });

    it('should translate comment, not short', (done) => {
        expect(c1).toMatchSnapshot();
        done();
    });

    it('should translate comment, short', (done) => {
        expect(c2).toMatchSnapshot();
        done();
    });

    it('should translate description comment', (done) => {
        expect(c3).toMatchSnapshot();
        done();
    });
});

describe('commentLong', () => {
    let c;

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

