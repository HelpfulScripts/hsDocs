import { m, Vnode}              from 'hslayout';
import { Layout }               from 'hslayout';
import { DocSets }              from '../DocSets'; 
import { comment, commentLong } from './MainComment';
import { flags, sourceLink, 
         signature, type, 
         extensionOf, inheritedFrom,
         kindString, itemName, 
         makeID }               from './Parts'; 


/**
 * Creates Documentation on the main panel 
 */
export class MainDetail extends Layout { 
    getComponents(node:Vnode): Vnode {
        const lib =  m.route.param('lib');
        const field = m.route.param('field');
        node.attrs.route = undefined;

        let result = getOverview(lib, field) || itemDoc(DocSets.get(lib, field) || ''); 
        return m('.hs-main-detail', [result]); 
    }
}

/**
 * Checks if the project overview is being requested and returns the overview, 
 * or `undefined` if not available
 * @param mdl the module name to check
 * @return Vnode containing the overview file, or `undefined`
 */
function getOverview(lib:string, mdl:string):Vnode {
    if (mdl === '0' || mdl === '') {  //show module overview
        mdl = DocSets.get(lib, `${lib}.overview`);
        if (mdl) { // if project has an overview:
            return overviewDoc(mdl); 
        }
    }
    return undefined;
}

/**
 * Creates documentation for standard items in the main panel
 * @param mdl the module to document on the main panel
 */
function itemDoc(mdl:any) {
    const sig = mdl.signatures? mdl.signatures[0] : mdl;
    return m('.hs-item-doc', [
        title(mdl, sig),
        commentLong(sig),
        members(sig, sig)
    ]);
}

/**
 * Creates documentation for the project overview in the main panel
 * @param mdl the module to document on the main panel
 */
function overviewDoc(mdl:any) {
    const sig = mdl.signatures? mdl.signatures[0] : mdl;
    return m('.hs-item-doc', [
        commentLong(sig),
    ]);
}

/**
 * renders the title of the main panel
 * @param mdl the module to document 
 * @param sig a signature of the module, or the the module itself
 */
function title(mdl:any, sig:any): Vnode { 
    return m('.hs-item-title', {id: makeID('title', mdl)}, itemDescriptor(mdl, sig)); 
}

function members(mdl:any, sig:any): Vnode {
    if (mdl.groups) {
        return m('.hs-item-members', [
            ...mdl.groups.map((g:any) => member(g, mdl.lib, true, true)),
            ...mdl.groups.map((g:any) => member(g, mdl.lib, true, false)),
            ...mdl.groups.map((g:any) => member(g, mdl.lib, false, true)),
            ...mdl.groups.map((g:any) => member(g, mdl.lib, false, false))
        ]);
    } else if (mdl.parameters) {
        return m('.hs-item-members', parameter(mdl.parameters, mdl.lib));
    } else if (mdl.type && mdl.type.declaration) {
        mdl.type.declaration.lib = mdl.lib;
        return members(mdl.type.declaration, sig);
    } else {
        return m('.hs-item-members');
    }
}

function parameter(g:any[], lib:string): Vnode {
    let content = g.map((c:any) => m('.hs-item-parameter', {id:makeID('parameter', c)}, itemChild(c)));
    content.unshift(m('.hs-item-member-title', {id:'parameters'}, m('span', 'Parameters')));
    return m('.hs-item-member', content);
}

function member(group:any, lib:string, statc:boolean, publc: boolean): Vnode {
    const resolve           = ((c:number) => DocSets.get(lib, c));
    const directChildren    = ((mdl:any) => !mdl['inheritedFrom']);
    const inheritedChildren = ((mdl:any) =>  mdl['inheritedFrom']);
    const groupMap = {
        'External modules': '.hs-item-external-module',
        'Constructors':     '.hs-item-constructor',
        'Classes':          '.hs-item-class',          
        'Interfaces':       '.hs-item-interface',          
        'Functions':        '.hs-item-function',          
        'Methods':          '.hs-item-method',          
        'Variables':        '.hs-item-variable',
        'Object literals':  '.hs-item-object-literal',
        'Properties':       '.hs-item-property',
        'Type aliases':     '.hs-item-alias',          
        'Accessors':        '.hs-item-accessors'        
    };
    const fn = groupMap[group.title] || '.hs-item-unknown-member';
    const isPublic = (flags:any) => flags.isPublic || (flags.isExported && !flags.isPrivate);

    const content = group.children
        .map(resolve)
        .filter(directChildren)
        .filter((mdl:any) => statc? mdl.flags.isStatic : !mdl.flags.isStatic)
        .filter((mdl:any) => publc? isPublic(mdl.flags) : !isPublic(mdl.flags))
        .map((mdl:any) => m(fn, {id:makeID(group.title, mdl)}, itemChild(mdl)));
    const inherited = group.children
        .map(resolve)
        .filter(inheritedChildren)
        .filter((mdl:any) => statc? mdl.flags.isStatic : !mdl.flags.isStatic)
        .filter((mdl:any) => publc? mdl.flags.isPublic : !mdl.flags.isPublic)
        .map((mdl:any) => m(`.hs-item-inherited ${fn}`, {id:makeID(group.title, mdl)}, itemChild(mdl)));

    const publStr = publc?'Public':'Protected or Private';
    const statStr = statc?'Static':''; 
    if (inherited.length>0) {
        inherited.unshift(m('.hs-item-inherited .hs-item-member-title', m('span', `${publStr} ${statStr} Inherited ${group.title}`)));
    }
    if (content.length>0) {
        content.unshift(m('.hs-item-member-title', {id:group.title.toLowerCase()}, m('span', `${publStr} ${statStr} ${group.title}`)));
    }
    return m(`.hs-item-member ${statc?'.hs-item-static':''} ${publc?'.hs-item-public':''}`, content.concat(inherited));
}

function itemDescriptor(mdl:any, sig:any):Vnode {
    try { return m('.hs-item-desc', [ 
            flags(mdl),
            kindString(mdl),
            itemName(mdl, mdl),
            signature(sig, mdl),
            type(sig,  mdl.lib),
            extensionOf(mdl),
            inheritedFrom(mdl),
            sourceLink(mdl)
        ]);
    }
    catch(e) { console.log(e); console.log(mdl); }
}

function itemChild(mdl:any, sig=mdl): Vnode[] {
    return mdl.signatures? 
        mdl.signatures.map((s:any) => m('.hs-item-child-signature',[itemDescriptor(mdl, s), comment(s, true)])) : 
        [itemDescriptor(mdl, sig), comment(sig,true)];
}


