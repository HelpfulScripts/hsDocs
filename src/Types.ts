/**
 * # Types
 */
/** */

import { log as _log } from 'hsutil';import { userInfo } from 'os';
 const log = _log('DocTypes');

export const Counts = <{[docType:string]: {[docSubtype:string]: number}}>{};

interface DocID {
    id:     number;
}

interface DocNameType {
    name:   string;
    type:   string;
}

interface DocTypeNameID extends DocNameType, DocID {
}

interface DocKindNameID extends DocID {
    name:   string;
    kind:               string;
}

export interface DocBaseNode extends DocKindNameID {
    kindString?:        string;
	flags:              DocNodeFlags;
}

interface DocElementType extends DocKindNameID {
    elementType?:   DocNameType;
}

interface DocSignature extends DocBaseNode {
    type:               DocType;
    comment?:           DocComment;
    parameters?:        DocNode[];
    inheritedFrom?:     DocInheritedFrom;
    overwrites?:        DocTypeNameID;
    implementationOf?:  DocImplementationOf;
    typeParameter?:     DocBaseNode[];
}

interface DocNode extends DocSignature {
    originalName?:      string;
    defaultValue?:      string;
    implementedTypes?:  DocImplementedTypes[];
    implementedBy?:     DocImplementedBy[];
    extendedTypes?:     DocExtendedTypes[];
    extendedBy?:        DocExtendedBy[];
    children:           DocNode[];
    groups:             DocReference[];
    sources?:           DocSource[];
    signatures?:        DocSignature[];
    indexSignature?:    DocNode[];
    getSignature?:      DocNode[];
}

interface DocType extends DocTypeNameID {
    declaration:    DocNode;
    elementType?:   DocType;
    elements?:      DocElement[];
    typeArguments?: DocType[];
    types?:         DocType[];
    value?:         string;
}

interface DocNodeFlags {
    isExported?:            boolean;
    isPrivate?:             boolean;
    isPublic?:              boolean;
    isStatic?:              boolean;
    isConst?:               boolean;
    isLet?:                 boolean;
    isOptional?:            boolean;
    isProtected?:           boolean;
    isAbstract?:            boolean;
    isRest?:                boolean;
    isConstructorProperty?: boolean;
}

interface DocSource {
    fileName:   string;
	line:       number;
	character:  number;
}

interface DocComment {
    shortText?: string;
    text?:      string;
    tags?:      DocTag[];
    returns?:   string;

}

interface DocTypeArguments extends DocNameType {
    elementType: DocNameType;
}

interface DocElementType extends DocTypeNameID {
    declaration:    DocNode;
}

interface DocElement extends DocTypeNameID {
}

interface DocReference {
    title:      string;
	kind:       number;
	children:   number[];
}

interface DocTag {
    tag:        string;
	text:       string;
    param:      string;
}

interface DocInheritedFrom extends DocTypeNameID {
}

interface DocExtendedTypes extends DocTypeNameID {
}

interface DocExtendedBy extends DocTypeNameID {
}

interface DocImplementationOf extends DocTypeNameID {
}

interface DocImplementedTypes extends DocTypeNameID {
}

interface DocImplementedBy extends DocTypeNameID {
}


//-----------------

const accumulate = (acc:number, curr:number) => acc+curr;

const use = (docType:string, docSubtype:string) => { 
    Counts[docType] = Counts[docType] || {};
    Counts[docType][docSubtype] = (Counts[docType][docSubtype] || 0) + 1;
};


export function testNode(node:DocNode, name=''):typeof Counts {
    testFullNode(node);
    return Counts;
}

export function testFullNode(node:DocNode, name=''):number {
    if (name==='') { name = node.name; }
    const num =  Object.getOwnPropertyNames(node).map((k):number => {
        use('DocNode', k);
        switch (k) {
            case 'lib':             return 0;  // added by HsDocs
            case 'modules':         return 0;  // added by HsDocs
            case 'fullPath':        return 0;  // added by HsDocs
            case 'id':              return testNumber(k, node.id, node, node.name);
            case 'name':            return testString(k, node.name, node,`${name}-${k}`);
            case 'kind':            return testNumber(k, node.kind, node,`${name}-${k}`);
            case 'kindString':      return testString(k, node.kindString, node,`${name}-${k}`);
            case 'flags':           return testFlags(node.flags, node,`${name}-${k}`);
            case 'originalName':    return testString(k, node.originalName, node,`${name}-${k}`);
            case 'defaultValue':    return testString(k, node.defaultValue, node,`${name}-${k}`);
            case 'comment':         return testComment(node.comment, node,`${name}-${k}`);
            case 'sources':         return testSources(node.sources, node,`${name}-${k}`);
            case 'type':            return testType(node.type, node,`${name}-${k}`);
            case 'inheritedFrom':   return testTypeNameID(node.inheritedFrom, node,`${name}-${k}`);
            case 'implementationOf':return testTypeNameID(node.implementationOf, node,`${name}-${k}`);
            case 'overwrites':      return testTypeNameID(node.overwrites, node,`${name}-${k}`);
            case 'implementedTypes':return node.implementedTypes.map(t => testTypeNameID(t, node,`${name}-${k}`)).reduce(accumulate, 0);
            case 'implementedBy':   return node.implementedBy.map(t => testTypeNameID(t, node,`${name}-${k}`)).reduce(accumulate, 0);
            case 'extendedBy':      return node.extendedBy.map(e => testTypeNameID(e, node,`${name}-${k}`)).reduce(accumulate, 0);
            case 'extendedTypes':   return node.extendedTypes.map(t =>testTypeNameID(t, node,`${name}-${k}`)).reduce(accumulate, 0);
            case 'children':        return node.children.map(c => testFullNode(c, `${name}-${c.name}`)).reduce(accumulate, 0);
            case 'groups':          return node.groups.map(c => testReference(c, node,`${name}-${k}`)).reduce(accumulate, 0);
            case 'signatures':      return node.signatures.map(c => testSignature(c, node, `${name}-${k}`)).reduce(accumulate, 0);
            case 'parameters':      return node.parameters.map(c => testFullNode(c, `${name}-${k}`)).reduce(accumulate, 0);
            case 'indexSignature':  return node.indexSignature.map(is => testFullNode(is, `${name}-${k}`)).reduce(accumulate, 0);
            case 'getSignature':    return node.getSignature.map(is => testFullNode(is, `${name}-${k}`)).reduce(accumulate, 0);
            case 'typeParameter':   return node.typeParameter.map(is => testBaseNode(is, node, `${name}-${k}`)).reduce(accumulate, 0);
            default: log.warn(`testFullNode found unknown key '${k}' for path '${name}' ${node['lib']?'in lib '+node['lib'] : ''}`);
        }
        return -1;
    }).reduce(accumulate, 0);
    log.debug(`${num} tests in node ${node.name}`);
    return num;
}

function testSignature(test:DocSignature, node: DocNode, name: string):number {
    return Object.getOwnPropertyNames(test).map(k => {
        use('DocSignature', k);
        switch (k) {
            case 'lib':             return 0;  // added by HsDocs
            case 'fullPath':        return 0;  // added by HsDocs
            case 'id':              return testNumber(k, test.id, node, node.name);
            case 'name':            return testString(k, test.name, node,`${name}-${k}`);
            case 'kind':            return testNumber(k, test.kind, node,`${name}-${k}`);
            case 'kindString':      return testString(k, test.kindString, node,`${name}-${k}`);
            case 'flags':           return testFlags(test.flags, node,`${name}-${k}`);
            case 'comment':         return testComment(test.comment, node,`${name}-${k}`);
            case 'parameters':      return test.parameters.map(c => testFullNode(c, `${name}-${k}`)).reduce(accumulate, 0);
            case 'type':            return testType(test.type, node,`${name}-${k}`);
            case 'inheritedFrom':   return testTypeNameID(test.inheritedFrom, node,`${name}-${k}`);
            case 'overwrites':      return testTypeNameID(test.overwrites, node,`${name}-${k}`);
            case 'implementationOf':return testTypeNameID(test.implementationOf, node,`${name}-${k}`);
            case 'typeParameter':   return test.typeParameter.map(is => testBaseNode(is, node, `${name}-${k}`)).reduce(accumulate, 0);
            default: log.warn(`testNameType found unknown key '${k}' for path '${name}'`);
        }
        return -1;
    }).reduce(accumulate, 0);
}

function testBaseNode(test:DocBaseNode, node: DocNode, name: string):number {
    return Object.getOwnPropertyNames(test).map(k => {
        use('DocBaseNode', k);
        switch (k) {
            case 'id':              return testNumber(k, test.id, node, node.name);
            case 'name':            return testString(k, test.name, node,`${name}-${k}`);
            case 'kind':            return testNumber(k, test.kind, node,`${name}-${k}`);
            case 'kindString':      return testString(k, test.kindString, node,`${name}-${k}`);
            case 'flags':           return testFlags(test.flags, node,`${name}-${k}`);
            default: log.warn(`testBaseNode found unknown key '${k}' for path '${name}'`);
        }
        return -1;
    }).reduce(accumulate, 0);
}



function testNameType(test:DocNameType, node: DocNode, name: string):number {
    return Object.getOwnPropertyNames(test).map(k => {
        use('DocNameType', k);
        switch (k) {
            case 'type':    return testString(k, test.type, node,`${name}-${k}`);
            case 'name':    return testString(k, test.name, node,`${name}-${k}`);
            default: log.warn(`testNameType found unknown key '${k}' for path '${name}'`);
        }
        return -1;
    }).reduce(accumulate, 0);
}

function testTypeNameID(test:DocTypeNameID, node: DocNode, name: string):number {
    return Object.getOwnPropertyNames(test).map(k => {
        use('DocTypeNameID', k);
        switch (k) {
            case 'type':    return testString(k, test.type, node,`${name}-${k}`);
            case 'name':    return testString(k, test.name, node,`${name}-${k}`);
            case 'id':      return testNumber(k, test.id, node,`${name}-${k}`);
            default: log.warn(`testTypeNameID found unknown key '${k}' for path '${name}'`);
        }
        return -1;
    }).reduce(accumulate, 0);
}

function testFlags(test:DocNodeFlags, node:DocNode, name: string):number {
    return Object.getOwnPropertyNames(test).map(k => {
        use('DocNodeFlags', k);
        switch (k) {
            case 'isExported':  return testBoolean(k, test.isExported, node,`${name}-${k}`);
            case 'isPublic':    return testBoolean(k, test.isPublic, node,`${name}-${k}`);
            case 'isPrivate':   return testBoolean(k, test.isPrivate, node,`${name}-${k}`);
            case 'isStatic':    return testBoolean(k, test.isStatic, node,`${name}-${k}`);
            case 'isConst':     return testBoolean(k, test.isConst, node,`${name}-${k}`);
            case 'isLet':       return testBoolean(k, test.isLet, node,`${name}-${k}`);
            case 'isOptional':  return testBoolean(k, test.isOptional, node,`${name}-${k}`);
            case 'isProtected': return testBoolean(k, test.isProtected, node,`${name}-${k}`);
            case 'isAbstract':  return testBoolean(k, test.isAbstract, node,`${name}-${k}`);
            case 'isRest':      return testBoolean(k, test.isRest, node,`${name}-${k}`);
            case 'isConstructorProperty': return testBoolean(k, test.isConstructorProperty, node,`${name}-${k}`);
            default: log.warn(`testFlags found unknown key '${k}' for path '${name}'`);
        }
        return -1;
    }).reduce(accumulate, 0);
}

function testComment(test:DocComment, node:DocNode, name: string):number {
    return Object.getOwnPropertyNames(test).map(k => {
        use('DocComment', k);
        switch (k) {
            case 'shortText':   return testString(k, test.shortText, node,`${name}-${k}`);
            case 'text':        return testString(k, test.text, node,`${name}-${k}`);
            case 'tags':        return test.tags.map(t => testTag(t, node,`${name}-${k}`)).reduce(accumulate, 0);
            case 'returns':     return testString(k, test.returns, node,`${name}-${k}`);
            default: log.warn(`testComment found unknown key '${k}' for path '${name}'`);
        }
        return -1;
    }).reduce(accumulate, 0);
}

function testSources(test:DocSource[], node: DocNode, name: string):number {
    return test.map(s => Object.getOwnPropertyNames(s).map(k => {
        use('DocSource', k);
        switch (k) {
            case 'fileName':    return testString(k, s.fileName, node,`${name}-${k}`);
            case 'line':        return testNumber(k, s.line, node,`${name}-${k}`);
            case 'character':   return testNumber(k, s.character, node,`${name}-${k}`);
            default: log.warn(`testSources found unknown key '${k}' for path '${name}'`);
        }
        return -1;
    }).reduce(accumulate, 0)).reduce(accumulate, 0);
}

function testType(test:DocType, node: DocNode, name: string):number {
    return Object.getOwnPropertyNames(test).map(k => {
        use('DocType', k);
        switch (k) {
            case 'type':            return testString(k, test.type, node,`${name}-${k}`);
            case 'name':            return testString(k, test.name, node,`${name}-${k}`);
            case 'id':              return testNumber(k, test.id, node,`${name}-${k}`);
            case 'value':           return testString(k, test.value, node,`${name}-${k}`);
            case 'declaration':     return testFullNode(test.declaration,`${name}-${k}`);
            case 'elementType':     return testType(test.elementType, node,`${name}-${k}`);
            case 'elements':        return test.elements.map(t => testTypeNameID(t, node,`${name}-${k}`)).reduce(accumulate, 0);
            case 'typeArguments':   return test.typeArguments.map(t => testType(t, node,`${name}-${k}`)).reduce(accumulate, 0);
            case 'types':           return test.types.map((t:DocType) => testType(t, node,`${name}-${k}`)).reduce(accumulate, 0);
            default: log.warn(`testType found unknown key '${k}' for path '${name}'`);
        }
        return -1;
    }).reduce(accumulate, 0);
}

function testReference(test:DocReference, node:DocNode, name: string):number {
    return Object.getOwnPropertyNames(test).map(k => {
        use('DocReference', k);
        switch (k) {
            case 'title':       return testString(k, test.title, node,`${name}-${k}`);
            case 'kind':        return testNumber(k, test.kind, node,`${name}-${k}`);
            case 'children':    return test.children.map(c => testNumber(k, c, node,`${name}-${k}`)).reduce(accumulate, 0);
            default: log.warn(`testReference found unknown key '${k}' for path '${name}'`);
        }
        return -1;
    }).reduce(accumulate, 0);
}

function testTag(test:DocTag, node:DocNode, name: string):number {
    return Object.getOwnPropertyNames(test).map(k => {
        use('DocTag', k);
        switch (k) {
            case 'tag':     return testString(k, test.tag, node,`${name}-${k}`);
            case 'text':    return testString(k, test.text, node,`${name}-${k}`);
            case 'param':   return testString(k, test.param, node,`${name}-${k}`);
            default: log.warn(`testTag found unknown key '${k}' for path '${name}'`);
        }
        return -1;
    }).reduce(accumulate, 0);
}

// function testArguments(test:DocTypeArguments, node:DocNode, name: string):number {
//     return Object.getOwnPropertyNames(test).map(k => {
//         use('DocTypeArguments', k);
//         switch (k) {
//             case 'type':        return testString(k, test.type, node,`${name}-${k}`);
//             case 'name':        return testString(k, test.name, node,`${name}-${k}`);
//             case 'elementType': return testNameType(test.elementType, node,`${name}-${k}`);
//             default: log.warn(`testArguments found unknown key '${k}' for path '${name}'`);
//         }
//         return -1;
//     }).reduce(accumulate, 0);
// }

// function testElementType(test:DocElementType, node:DocNode, name: string):number {
//     return Object.getOwnPropertyNames(test).map(k => {
//         use('DocElementType', k);
//         switch (k) {
//             case 'id':          return testNumber(k, test.id, node,`${name}-${k}`);
//             case 'name':        return testString(k, test.name, node,`${name}-${k}`);
//             case 'type':        return testString(k, test.type, node,`${name}-${k}`);
//             case 'declaration': return testFullNode(test.declaration,`${name}-${k}`);
//             default: log.warn(`testElementType found unknown key '${k}' for path '${name}'`);
//         }
//         return -1;
//     }).reduce(accumulate, 0);
// }

//----------


function testString(k:string, v:any, node:DocNode, name: string):number {
    if (typeof v !== 'string') { log.warn(`value ${v} for key '${k}' is not a string for path '${name}'`); }
    else { log.debug(`test ${k}:${v.slice(0, 10)} as string for path '${name}'`); }
    return 1;
}

function testBoolean(k:string, v:any, node:DocNode, name: string):number {
    if (typeof v !== 'boolean') { log.warn(`value ${v} for key '${k}' is not a boolean for path '${name}'`); }
    else { log.debug(`test ${k}:${v} as string for path '${name}'`); }
    return 1;
}

function testNumber(k:string, v:any, node:DocNode, name: string):number {
    if (typeof v !== 'number') { log.warn(`value ${v} for key '${k}' is not a number for path '${name}'`); }
    else { log.debug(`test ${k}:${v} as string for path '${name}'`); }
    return 1;
}
