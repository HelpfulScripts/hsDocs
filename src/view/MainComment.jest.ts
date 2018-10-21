import { commentLong, comment } from './MainComment';

test('comment', ()=>{
    expect(comment).toBeDefined();
});

test('commentLong', ()=>{
    expect(commentLong).toBeDefined();
});