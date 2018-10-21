import { flags } from './Parts';
import { kindString } from './Parts';
import { itemName } from './Parts';
import { itemTooltip } from './Parts';
import { extensionOf } from './Parts';
import { inheritedFrom } from './Parts';
import { sourceLink } from './Parts';
import { libLink } from './Parts';
import { signature } from './Parts';
import { defaultVal } from './Parts';
import { type } from './Parts';
import { makeID } from './Parts';

test('flags', ()=>{
    expect(flags).toBeDefined();
});
test('kindString', ()=>{
    expect(kindString).toBeDefined();
});
test('itemName', ()=>{
    expect(itemName).toBeDefined();
});
test('itemTooltip', ()=>{
    expect(itemTooltip).toBeDefined();
});
test('extensionOf', ()=>{
    expect(extensionOf).toBeDefined();
});
test('inheritedFrom', ()=>{
    expect(inheritedFrom).toBeDefined();
});
test('sourceLink', ()=>{
    expect(sourceLink).toBeDefined();
});
test('libLink', ()=>{
    expect(libLink).toBeDefined();
});
test('signature', ()=>{
    expect(signature).toBeDefined();
});
test('defaultVal', ()=>{
    expect(defaultVal).toBeDefined();
});
test('type', ()=>{
    expect(type).toBeDefined();
});
test('makeID', ()=>{
    expect(makeID).toBeDefined();
});
