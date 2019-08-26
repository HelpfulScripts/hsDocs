/**
 * # Types
 */
/** */

import { log as _log } from 'hsutil'; const log = _log('DocTypes');

interface DocNameType {
    name:           string;
    type:           string;
}

interface DocTypeNameID extends DocNameType{
    id:             number;
}

export interface DocBaseNode {
    id:                 number;
    name:               string;
    kind:               string;
    kindString?:        string;
	flags:              DocNodeFlags;
}

export interface DocNode extends DocBaseNode {
    originalName?:      string;
    comment?:           DocComment;
    type?:              DocType;
    defaultValue?:      string;
    overwrites?:        DocTypeNameID;
    inheritedFrom?:     DocInheritedFrom;
    implementationOf?:  DocImplementationOf;
    implementedTypes?:  DocImplementedTypes[];
    implementedBy?:     DocImplementedBy[];
    extendedTypes?:     DocExtendedTypes[];
    extendedBy?:        DocExtendedBy[];
    children:           DocNode[];
    groups:             DocReference[];
    sources?:           DocSource[];
    signatures?:        DocNode[];
    parameters?:        DocNode[];
    indexSignature?:    DocNode[];
    getSignature?:      DocNode[];
    typeParameter?:     DocBaseNode[];
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

interface DocType {
    id:             number;
    name:           string;
    type:           string;
    declaration:    DocNode;
    elementType?:   DocType;
    elements?:      DocElement[];
    typeArguments?: DocType[];
    types?:         DocType[];
    value?:         string;
}

interface DocTypeArguments extends DocNameType{
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

interface DocElementType {
    id:                 number;
    name:               string;
    kind:               string;
    elementType?:   DocNameType;
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

export function testNode(node:DocNode, name=''):number {
    if (name==='') { name = node.name; }
    const num =  Object.getOwnPropertyNames(node).map((k):number => {
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
            case 'children':        return node.children.map(c => testNode(c, `${name}-${c.name}`)).reduce(accumulate, 0);
            case 'groups':          return node.groups.map(c => testReference(c, node,`${name}-${k}`)).reduce(accumulate, 0);
            case 'signatures':      return node.signatures.map(c => testNode(c, `${name}-${k}`)).reduce(accumulate, 0);
            case 'parameters':      return node.parameters.map(c => testNode(c, `${name}-${k}`)).reduce(accumulate, 0);
            case 'indexSignature':  return node.indexSignature.map(is => testNode(is, `${name}-${k}`)).reduce(accumulate, 0);
            case 'getSignature':    return node.getSignature.map(is => testNode(is, `${name}-${k}`)).reduce(accumulate, 0);
            case 'typeParameter':   return node.typeParameter.map(is => testBaseNode(is, node, `${name}-${k}`)).reduce(accumulate, 0);
            default: log.warn(`testNode found unknown key '${k}' for path '${name}' ${node['lib']?'in lib '+node['lib'] : ''}`);
        }
        return 0;
    }).reduce(accumulate, 0);
    log.debug(`${num} tests in node ${node.name}`);
    return num;
}

function testBaseNode(type:DocBaseNode, node: DocNode, name: string):number {
    return Object.getOwnPropertyNames(type).map(k => {
        switch (k) {
            case 'id':              return testNumber(k, node.id, node, node.name);
            case 'name':            return testString(k, node.name, node,`${name}-${k}`);
            case 'kind':            return testNumber(k, node.kind, node,`${name}-${k}`);
            case 'kindString':      return testString(k, node.kindString, node,`${name}-${k}`);
            case 'flags':           return testFlags(node.flags, node,`${name}-${k}`);
            default: log.warn(`testNameType found unknown key '${k}' for path '${name}'`);
        }
        return 0;
    }).reduce(accumulate, 0);
}



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

function testNameType(type:DocNameType, node: DocNode, name: string):number {
    return Object.getOwnPropertyNames(type).map(k => {
        switch (k) {
            case 'type':    return testString(k, type.type, node,`${name}-${k}`);
            case 'name':    return testString(k, type.name, node,`${name}-${k}`);
            default: log.warn(`testNameType found unknown key '${k}' for path '${name}'`);
        }
        return 0;
    }).reduce(accumulate, 0);
}

function testTypeNameID(type:DocTypeNameID, node: DocNode, name: string):number {
    return Object.getOwnPropertyNames(type).map(k => {
        switch (k) {
            case 'type':    return testString(k, type.type, node,`${name}-${k}`);
            case 'name':    return testString(k, type.name, node,`${name}-${k}`);
            case 'id':      return testNumber(k, type.id, node,`${name}-${k}`);
            default: log.warn(`testTypeNameID found unknown key '${k}' for path '${name}'`);
        }
        return 0;
    }).reduce(accumulate, 0);
}

function testFlags(flags:DocNodeFlags, node:DocNode, name: string):number {
    return Object.getOwnPropertyNames(flags).map(k => {
        switch (k) {
            case 'isExported':  return testBoolean(k, flags.isExported, node,`${name}-${k}`);
            case 'isPublic':    return testBoolean(k, flags.isPublic, node,`${name}-${k}`);
            case 'isPrivate':   return testBoolean(k, flags.isPrivate, node,`${name}-${k}`);
            case 'isStatic':    return testBoolean(k, flags.isStatic, node,`${name}-${k}`);
            case 'isConst':     return testBoolean(k, flags.isConst, node,`${name}-${k}`);
            case 'isLet':       return testBoolean(k, flags.isLet, node,`${name}-${k}`);
            case 'isOptional':  return testBoolean(k, flags.isOptional, node,`${name}-${k}`);
            case 'isProtected': return testBoolean(k, flags.isProtected, node,`${name}-${k}`);
            case 'isAbstract':  return testBoolean(k, flags.isAbstract, node,`${name}-${k}`);
            case 'isRest':      return testBoolean(k, flags.isRest, node,`${name}-${k}`);
            case 'isConstructorProperty': return testBoolean(k, flags.isConstructorProperty, node,`${name}-${k}`);
            default: log.warn(`testFlags found unknown key '${k}' for path '${name}'`);
        }
        return 0;
    }).reduce(accumulate, 0);
}

function testComment(comment:DocComment, node:DocNode, name: string):number {
    return Object.getOwnPropertyNames(comment).map(k => {
        switch (k) {
            case 'shortText':   return testString(k, comment.shortText, node,`${name}-${k}`);
            case 'text':        return testString(k, comment.text, node,`${name}-${k}`);
            case 'tags':        return comment.tags.map(t => testTag(t, node,`${name}-${k}`)).reduce(accumulate, 0);
            case 'returns':     return testString(k, comment.returns, node,`${name}-${k}`);
            default: log.warn(`testComment found unknown key '${k}' for path '${name}'`);
        }
        return 0;
    }).reduce(accumulate, 0);
}

function testSources(sources:DocSource[], node: DocNode, name: string):number {
    return sources.map(s => Object.getOwnPropertyNames(s).map(k => {
        switch (k) {
            case 'fileName':    return testString(k, s.fileName, node,`${name}-${k}`);
            case 'line':        return testNumber(k, s.line, node,`${name}-${k}`);
            case 'character':   return testNumber(k, s.character, node,`${name}-${k}`);
            default: log.warn(`testSources found unknown key '${k}' for path '${name}'`);
        }
        return 0;
    }).reduce(accumulate, 0)).reduce(accumulate, 0);
}

function testType(type:DocType, node: DocNode, name: string):number {
    return Object.getOwnPropertyNames(type).map(k => {
        switch (k) {
            case 'type':            return testString(k, type.type, node,`${name}-${k}`);
            case 'name':            return testString(k, type.name, node,`${name}-${k}`);
            case 'id':              return testNumber(k, type.id, node,`${name}-${k}`);
            case 'value':           return testString(k, type.value, node,`${name}-${k}`);
            case 'declaration':     return testNode(type.declaration,`${name}-${k}`);
            case 'elementType':     return testType(type.elementType, node,`${name}-${k}`);
            case 'elements':        return type.elements.map(t => testTypeNameID(t, node,`${name}-${k}`)).reduce(accumulate, 0);
            case 'typeArguments':   return type.typeArguments.map(t => testType(t, node,`${name}-${k}`)).reduce(accumulate, 0);
            case 'types':           return type.types.map((t:DocType) => testType(t, node,`${name}-${k}`)).reduce(accumulate, 0);
            default: log.warn(`testType found unknown key '${k}' for path '${name}'`);
        }
        return 0;
    }).reduce(accumulate, 0);
}

function testReference(ref:DocReference, node:DocNode, name: string):number {
    return Object.getOwnPropertyNames(ref).map(k => {
        switch (k) {
            case 'title':       return testString(k, ref.title, node,`${name}-${k}`);
            case 'kind':        return testNumber(k, ref.kind, node,`${name}-${k}`);
            case 'children':    return ref.children.map(c => testNumber(k, c, node,`${name}-${k}`)).reduce(accumulate, 0);
            default: log.warn(`testReference found unknown key '${k}' for path '${name}'`);
        }
        return 0;
    }).reduce(accumulate, 0);
}

function testTag(tag:DocTag, node:DocNode, name: string):number {
    return Object.getOwnPropertyNames(tag).map(k => {
        switch (k) {
            case 'tag':     return testString(k, tag.tag, node,`${name}-${k}`);
            case 'text':    return testString(k, tag.text, node,`${name}-${k}`);
            case 'param':   return testString(k, tag.param, node,`${name}-${k}`);
            default: log.warn(`testTag found unknown key '${k}' for path '${name}'`);
        }
        return 0;
    }).reduce(accumulate, 0);
}

function testArguments(args:DocTypeArguments, node:DocNode, name: string):number {
    return Object.getOwnPropertyNames(args).map(k => {
        switch (k) {
            case 'type':        return testString(k, args.type, node,`${name}-${k}`);
            case 'name':        return testString(k, args.name, node,`${name}-${k}`);
            case 'elementType': return testNameType(args.elementType, node,`${name}-${k}`);
            default: log.warn(`testArguments found unknown key '${k}' for path '${name}'`);
        }
        return 0;
    }).reduce(accumulate, 0);
}

function testElementType(el:DocElementType, node:DocNode, name: string):number {
    return Object.getOwnPropertyNames(el).map(k => {
        switch (k) {
            case 'id':          return testNumber(k, el.id, node,`${name}-${k}`);
            case 'name':        return testString(k, el.name, node,`${name}-${k}`);
            case 'type':        return testString(k, el.type, node,`${name}-${k}`);
            case 'declaration': return testNode(el.declaration,`${name}-${k}`);
            default: log.warn(`testElementType found unknown key '${k}' for path '${name}'`);
        }
        return 0;
    }).reduce(accumulate, 0);
}