

import { node }     from 'hsnode';
import { testNode } from './Types';



describe('Types', () => {
    test('hsDocs', async () => {
        const content = await node.fs.readJsonFile('./src/test/hsDocs.json');
        expect(testNode(content)).toMatchSnapshot();
    });
    test('hsGraphD3', async () => {
        const content = await node.fs.readJsonFile('./src/test/hsGraphD3.json');
        expect(testNode(content)).toMatchSnapshot();
    });
    test('hsLayout', async () => {
        const content = await node.fs.readJsonFile('./src/test/hsLayout.json');
        expect(testNode(content)).toMatchSnapshot();
    });
    test('hsWidget', async () => {
        const content = await node.fs.readJsonFile('./src/test/hsWidget.json');
        expect(testNode(content)).toMatchSnapshot();
    });
});
