"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hslayout_1 = require("hslayout");
const hswidget_1 = require("hswidget");
const hswidget = require("hswidget");
const hslayout = require("hslayout");
const hslayout_2 = require("hslayout");
const hsutil_1 = require("hsutil");
const hsutil_2 = require("hsutil");
const hsutil = require("hsutil");
const modules = {
    m: Promise.resolve(hslayout_1.m),
    hsutil: Promise.resolve(hsutil),
    hslayout: Promise.resolve(hslayout),
    hswidget: Promise.resolve(hswidget),
    hsdatab: Promise.resolve().then(() => require('hsdatab')),
    hsgraph: Promise.resolve().then(() => require('hsgraph'))
};
const gInitialized = {};
function example(exmpl) {
    const instance = hsutil_1.shortCheckSum(exmpl);
    let IDs = gInitialized[instance];
    if (!IDs) {
        IDs = gInitialized[instance] = initDesc(IDs);
        IDs.executeSource = exmpl;
        createExecuteScript(IDs, exmpl);
    }
    if (!document.getElementById(IDs.menuID)) {
        addExample(IDs).then(hsutil_2.delay(1)).then(executeScript).catch(executeError);
    }
    const frameHeight = (IDs.attrs ? IDs.attrs.height : undefined) || '300px';
    const wrapWithID = (css) => css === '$exampleID' ? `#${IDs.exampleID}` : `#${IDs.menuID} ${css}`;
    const style = (!IDs.pages['css']) ? '' :
        IDs.pages['css'].replace(/(^|})\s*?(\S*?)\s*?{/gi, (x, ...args) => x.replace(args[1], wrapWithID(args[1])));
    return `<style>${style}</style><example id=${IDs.exampleID} style="height:${frameHeight}" class="hs-layout-frame"></example>`;
}
exports.example = example;
function createExecuteScript(IDs, exmpl) {
    const libNames = Object.keys(modules);
    return Promise.all(libNames.map(name => modules[name]))
        .then((libs) => {
        try {
            const scriptFn = new Function('root', ...libNames, getCommentDescriptor(IDs, exmpl));
            IDs.executeScript = (root) => scriptFn(root, ...libs);
            return true;
        }
        catch (e) {
            console.log('creating script:' + e);
            return false;
        }
    });
}
function initDesc(IDs) {
    return {
        exampleID: getNewID(),
        menuID: getNewID(),
        desc: {
            items: [],
            selectedItem: 'js',
            changed: () => addExample(IDs)
                .then(executeScript)
                .catch(executeError),
            size: ["50px"]
        },
        pages: {},
        activeSrcPage: undefined
    };
}
function getNewID() {
    return 'hs' + Math.floor(1000000 * Math.random());
}
function addExample(IDs) {
    return Promise.resolve(IDs).then(addExampleStructure).then(hsutil_2.delay(1));
}
function addExampleStructure(IDs) {
    let item = IDs.activeSrcPage || 'js';
    const root = document.getElementById(IDs.exampleID);
    IDs.desc.changed = (newItem) => {
        item = IDs.activeSrcPage = newItem;
    };
    hslayout_1.m.mount(root, { view: () => hslayout_1.m(hslayout_2.Layout, {
            columns: ["50%"],
            content: [
                hslayout_1.m(hslayout_2.Layout, {
                    content: hslayout_1.m('.hs-layout .hs-execution', { id: IDs.menuID }, 'placeholder')
                }),
                hslayout_1.m(hslayout_2.Layout, {
                    rows: ["30px", "fill"],
                    css: '.hs-source',
                    content: [
                        hslayout_1.m(hswidget_1.Menu, { desc: IDs.desc, size: ['50px'] }),
                        hslayout_1.m(hslayout_2.Layout, { content: hslayout_1.m('.hs-layout .hs-source-main', hslayout_1.m.trust(`<code><pre>${IDs.pages[item]}</pre></code>`)) })
                    ]
                })
            ]
        })
    });
    return IDs;
}
function executeScript(IDs) {
    const root = document.getElementById(IDs.menuID);
    if (root) {
        console.log(`root found for menuID ${IDs.menuID}`);
        try {
            IDs.executeScript(root);
        }
        catch (e) {
            console.log("error executing script: " + e);
            console.log(IDs.executeSource);
            console.log(e.stack);
        }
    }
    else {
        console.log(`root not found for menuID ${IDs.menuID}`);
    }
    hslayout_1.m.redraw();
    return IDs;
}
function executeError(e) {
    console.log('rejection executing script:');
    console.log(e);
}
function getCommentDescriptor(IDs, example) {
    let result = '';
    let attrs = example.match(/<example\s(\S*?)(\s|>)/i);
    if (attrs && attrs[1]) {
        const at = attrs[1].split('=');
        IDs.attrs = { [at[0]]: at[1] };
    }
    example.replace(/<file[\s]*name=[\S]*?\.([\s\S]*?)['|"]>([\S\s]*?)<\/file>/gi, function (text) {
        const args = [...arguments];
        const content = args[2].trim();
        IDs.desc.items.push(args[1]);
        IDs.pages[args[1]] = content;
        return result;
    });
    return IDs.pages['js'];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFpbkV4YW1wbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdmlldy9NYWluRXhhbXBsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQTBFQSx1Q0FBZ0Q7QUFDaEQsdUNBQWdEO0FBQ2hELHFDQUFnRDtBQUNoRCxxQ0FBZ0Q7QUFDaEQsdUNBQWdEO0FBQ2hELG1DQUE4QztBQUM5QyxtQ0FBOEM7QUFDOUMsaUNBQThDO0FBRTlDLE1BQU0sT0FBTyxHQUFHO0lBQ1osQ0FBQyxFQUFXLE9BQU8sQ0FBQyxPQUFPLENBQUMsWUFBQyxDQUFDO0lBQzlCLE1BQU0sRUFBTSxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztJQUNuQyxRQUFRLEVBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7SUFDckMsUUFBUSxFQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO0lBQ3JDLE9BQU8sdUNBQStDLFNBQVMsRUFBQztJQUNoRSxPQUFPLHVDQUErQyxTQUFTLEVBQUM7Q0FDbkUsQ0FBQztBQW1CRixNQUFNLFlBQVksR0FBK0IsRUFBRSxDQUFDO0FBZ0JwRCxpQkFBd0IsS0FBWTtJQUNoQyxNQUFNLFFBQVEsR0FBRyxzQkFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3RDLElBQUksR0FBRyxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNqQyxJQUFJLENBQUMsR0FBRyxFQUFFO1FBQ04sR0FBRyxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDN0MsR0FBRyxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFDMUIsbUJBQW1CLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQ25DO0lBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ3RDLFVBQVUsQ0FBQyxHQUFHLENB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