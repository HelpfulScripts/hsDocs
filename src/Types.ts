/**
 * # Types
 */
/** */

import { log as _log } from 'hsutil'; const log = _log('DocTypes');

export const Counts = <{[docType:string]: {[docSubtype:string]: number}}>{};

const accumulate = (acc:number, curr:number) => acc+curr;

/** initialize and increment `counts` structure */
const use = (docType:string, docKey:string) => { 
    Counts[docType] = Counts[docType] || {};
    Counts[docType][docKey] = (Counts[docType][docKey] || 0) + 1;
};


const groupKindTitle = {
    1:      "External module",
    2:      "Module",
    4:      "Enumerations",
    8:      "",
    16:     "Enumeration members",
    32:     "Variables",
    64:     "Functions",
    128:    "Classes",
    256:    "Interfaces",
    512:    "Constructors",
    1024:   "Properties",
    2048:   "Methods",
    4096:   "Call signature",
    8192:   "Index signature",
    16384:  "Constructor signature",
    32768:  "Parameter",
    65536:  "Type literal",
    131072: "Type parameter",
    262144: "Accessors",
    524288: "Get signature",
    1048576:"Set signature",
    2097152:"Object literals",
    4194304:"Type aliases",
};

const gFlags = {
    isExported:            0,
    isPrivate:             0,
    isPublic:              0,
    isStatic:              0,
    isConst:               0,
    isLet:                 0,
    isOptional:            0,
    isProtected:           0,
    isAbstract:            0,
    isRest:                0,
    isConstructorProperty: 0,
};

function checkFlags(flags:DocNodeFlags) {
    Object.keys(flags).forEach(f => {
        if (gFlags[f]===undefined) { log.warn(`unknown FLAG ${f}`); }
        else { gFlags[f]++; }
    });
    return flags;
}


//----- 'Abstract' interfaces -----------

//----- Node component interfaces -----------


interface DocsSource {
    fileName:   string;
	line:       number;
	character:  number;
}

interface DocsComment {
    shortText: string;
    text:      string;
    tags:      DocTag[];
    returns:   string;
}

interface DocsNodeFlags {
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

interface DocsType {
    type: "reference";
	name: string;
	id: number;
}



//----- Node interfaces -----------


function create(node:any, kind:number):DocsNode {
    switch (kind) {
        case 0:         return new DocsTop(node);
        case 1:         return new DocsExternalModule(node);
        case 2:         return new DocsUnknown(node);
        case 4:         return new DocsEnumeration(node);
        case 8:         return new DocsUnknown(node);
        case 16:        return new DocsEnumerationMember(node);
        case 32:        return new DocsVariable(node);
        case 64:        return new DocsFunction(node);
        case 128:       return new DocsClass(node);
        case 256:       return new DocsInterface(node);
        case 512:       return new DocsConstructor(node);
        case 1024:      return new DocsProperty(node);
        case 2048:      return new DocsMethod(node);
        case 4096:      return new DocsCallSignature(node);
        case 8192:      return new DocsIndexSignature(node);
        case 16384:     return new DocsConstructorSignature(node);
        case 32768:     return new DocsParameter(node);
        case 65536:     return new DocsTypeLiteral(node);
        case 131072:    return new DocsTypeParameter(node);
        case 262144:    return new DocsAccessor(node);
        case 524288:    return new DocsGetSignature(node);
        case 1048576:   return new DocsSetSignature(node);
        case 2097152:   return new DocsObjectLiteral(node);
        case 4194304:   return new DocsTypeAlias(node);
    }
}

export function testAllNodes(node:any) {
    const root = <DocsTop>create(node, node.kind);
    root.testTree();
    // log.info(log.inspect(gFlags, null));
}


class DocsBase {
    id:     number = null;  // null = required; undefined = optional
    kind:   number = null;

    constructor(node:DocsBase) {
        this.set(['id', 'kind'], node);
    }

    set(fields:string[], node:DocsBase) {
        fields.forEach(f => this[f] = node[f] || this[f]);
    }
    /**
     * tests this node against the original data `node` from which it was created.
     * @param node 
     */
    static testMissingOrIllegalFields(template:DocsNode, data:DocsNode) {
        let names =  Object.getOwnPropertyNames(data);
        names.map(k => {
            if (template[k]===undefined) { 
                log.warn(`'${template.kindString}' #${data.id}: found extra key '${k}'='${data[k]}'`);
            }
        });
        names = Object.getOwnPropertyNames(template);
        names.map(k => {
            if (template[k]===null) { // is required, should be optional
                log.warn(`'${template.kindString}' #${data.id}: key '${k}' should be optional`);
            }
        });
    }
}

class DocsNode extends DocsBase {
    kindString: string = null;
    children: DocsNode[];
    lib: string = null;
    fullPath: string = null;

    constructor(node:DocsNode, kindString?:string) {
        super(node);
        this.set(['kindString', 'children', 'lib', 'fullPath'], node);
    }
}

class DocsUnknown extends DocsNode {
    constructor(node:DocsUnknown) {
        super(node);
    }
}

class DocsNamed extends DocsNode {
    name:  string = null;
    flags: DocsNodeFlags = null;

    constructor(node:DocsNamed, kindString?:string) {
        super(node);
        this.set(['name', 'flags'], node);
    }
}

class DocsGroup extends DocsNode {
    title: string = null;
    children: DocsNode[];
    constructor(node:DocsGroup) {
        super(node);
    }
}

class DocsTop extends DocsNamed {
    groups: DocsGroup[] = null;

    constructor(node:DocsTop) {
        super(node, 'Root node');
        this.set(['groups'], node);
    }

    testTree() {
        let count = 1;
        function test(node:DocsNode, level:number) {
            if (node.children) { 
                node.children.forEach(c => {
                    log.info(`testing node ${count}, id=${c.id} '${c.kindString}'`);
                    const child = create(c, c.kind);
                    DocsBase.testMissingOrIllegalFields(child, c);
                    count++;
                    if (level<1 && count<10) { test(child, level+1); }
                }); 
            }
        }
        log.info(`\nModule ${this.name}:`);
        test(this, 0);
    }
}

class DocsSourced extends DocsNamed {
    groups: DocsGroup[] = null;
    sources: DocsSource[] = null;

    constructor(node:DocsSourced) {
        super(node);
        this.set(['groups', 'sources'], node);
    }
}


class DocsExternalModule extends DocsSourced {
    originalName: string = null;
    comment: DocsComment = null;

    constructor(node:DocsExternalModule) {
        super(node);
        this.set(['originalName', 'comment'], node);
    }
}

class DocsEnumeration extends DocsNamed {
    groups: DocsGroup[] = null;
    sources: DocsSource[] = null;
    constructor(node:DocsEnumeration) {
        super(node);
    }
}

class DocsEnumerationMember extends DocsNode {
    constructor(node:DocsEnumerationMember) {
        super(node);
    }
}

class DocsVariable extends DocsNode {
    constructor(node:DocsVariable) {
        super(node);
    }
}

class DocsFunction extends DocsNode {
    constructor(node:DocsFunction) {
        super(node);
    }
}

class DocsClass extends DocsSourced {
    comment: DocsComment;
    kind:number;
    extendedTypes: DocsType[] = null;
    implementedTypes: DocsType[] = null;

    constructor(node:DocsClass) {
        super(node);
        this.set(['comment', 'extendedTypes', 'implementedTypes'], node);
    }
}

class DocsInterface extends DocsSourced {
    constructor(node:DocsInterface) {
        super(node);
    }
}

class DocsConstructor extends DocsNode {
    constructor(node:DocsConstructor) {
        super(node);
    }
}

class DocsProperty extends DocsNode {
    constructor(node:DocsProperty) {
        super(node);
    }
}

class DocsMethod extends DocsNode {
    constructor(node:DocsMethod) {
        super(node);
    }
}

class DocsCallSignature extends DocsNode {
    constructor(node:DocsCallSignature) {
        super(node);
    }
}

class DocsIndexSignature extends DocsNode {
    constructor(node:DocsIndexSignature) {
        super(node);
    }
}

class DocsConstructorSignature extends DocsNode {
    constructor(node:DocsConstructorSignature) {
        super(node);
    }
}

class DocsParameter extends DocsNode {
    constructor(node:DocsParameter) {
        super(node);
    }
}

class DocsTypeLiteral extends DocsNode {
    constructor(node:DocsTypeLiteral) {
        super(node);
    }
}

class DocsTypeParameter extends DocsNode {
    constructor(node:DocsTypeParameter) {
        super(node);
    }
}

class DocsAccessor extends DocsNode {
    constructor(node:DocsAccessor) {
        super(node);
    }
}

class DocsGetSignature extends DocsNode {
    constructor(node:DocsGetSignature) {
        super(node);
    }
}

class DocsSetSignature extends DocsNode {
    constructor(node:DocsSetSignature) {
        super(node);
    }
}

class DocsObjectLiteral extends DocsNode {
    constructor(node:DocsObjectLiteral) {
        super(node);
    }
}

class DocsTypeAlias extends DocsNamed {
    sources: DocsSource[] = null;
    type: DocsType = null;

    constructor(node:DocsTypeAlias) {
        super(node);
        this.set(['sources', 'type'], node);
    }
}








interface DocGroup {
    title: string;
    kind: number;
    children: DocID[];
}

interface DocComment {
    shortText?: string;
    text?:      string;
    tags?:      DocTag[];
    returns?:   string;
}

interface DocSource {
    fileName:   string;
	line:       number;
	character:  number;
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
    type:               DocTypeOperator;
}

interface DocElementType extends DocKindNameID {
    elementType?:   DocNameType;
}


interface DocSignature extends DocKindNameID {
    kindString?:        string;
    flags:              DocNodeFlags;
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
    setSignature?:      DocNode[];
}

interface DocType extends DocTypeNameID {
    declaration:    DocNode;
    elementType?:   DocType;
    elements?:      DocElement[];
    typeArguments?: DocType[];
    types?:         DocType[];
    value?:         string;
    constraint:     DocConstraint;
}


interface DocID {
    id:     number;
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
    typeArguments: DocTypeNameID[];
}

interface DocExtendedBy extends DocTypeNameID {
}

interface DocImplementationOf extends DocTypeNameID {
}

interface DocImplementedTypes extends DocTypeNameID {
}

interface DocImplementedBy extends DocTypeNameID {
}

interface DocTypeOperator {
    type: string;
    name: string;
    operator: string;
    target: DocNameType;
}

interface DocConstraint {
    type: string;
    name: string;
    operator: string;
    constraint: DocTypeOperator;
    target: DocNameType;
}

//-----------------


export function testNode(node:DocNode, name=''):typeof Counts {
    testFullNode(node);
    return Counts;
}

function testFullNode(node:DocNode, name=''):number {
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
            case 'extendedTypes':   return node.extendedTypes.map(t =>testExtendedTypes(t, node,`${name}-${k}`)).reduce(accumulate, 0);
            case 'children':        return node.children.map(c => testFullNode(c, `${name}-${c.name}`)).reduce(accumulate, 0);
            case 'groups':          return node.groups.map(c => testReference(c, node,`${name}-${k}`)).reduce(accumulate, 0);
            case 'signatures':      return node.signatures.map(c => testSignature(c, node, `${name}-${k}`)).reduce(accumulate, 0);
            case 'parameters':      return node.parameters.map(c => testFullNode(c, `${name}-${k}`)).reduce(accumulate, 0);
            case 'indexSignature':  return node.indexSignature.map(is => testFullNode(is, `${name}-${k}`)).reduce(accumulate, 0);
            case 'getSignature':    return node.getSignature.map(is => testFullNode(is, `${name}-${k}`)).reduce(accumulate, 0);
            case 'setSignature':    return node.setSignature.map(is => testFullNode(is, `${name}-${k}`)).reduce(accumulate, 0);
            case 'typeParameter':   return node.typeParameter.map(is => testBaseNode(is, node, `${name}-${k}`)).reduce(accumulate, 0);
            default: log.warn(`'testFullNode' found unknown key '${k}' for path '${name}' ${node['lib']?'in lib '+node['lib'] : ''}\n${log.inspect(node[k], null)}`);
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
            default: log.warn(`testSignature found unknown key '${k}' for path '${name}'`);
        }
        return -1;
    }).reduce(accumulate, 0);
}

function testBaseNode(test:DocBaseNode, node: DocNode, name: string):number {
    return Object.getOwnPropertyNames(test).map(k => {
        use('DocBaseNode', k);
        switch (k) {
            case 'id':          return testNumber(k, test.id, node, node.name);
            case 'name':        return testString(k, test.name, node,`${name}-${k}`);
            case 'kind':        return testNumber(k, test.kind, node,`${name}-${k}`);
            case 'kindString':  return testString(k, test.kindString, node,`${name}-${k}`);
            case 'flags':       return testFlags(test.flags, node,`${name}-${k}`);
            case 'type':        return testTypeOperator(test.type, node, `${name}-${k}`);
            default: log.warn(`testBaseNode found unknown key '${k}' for path '${name}'`);
                     log.info(log.inspect(test, null));
        }
        return -1;
    }).reduce(accumulate, 0);
}


function testTypeOperator(test:DocTypeOperator, node: DocNode, name: string):number {
    return Object.getOwnPropertyNames(test).map(k => {
        use('DocTypeOperator', k);
        switch (k) {
            case 'type':    return testString(k, test.type, node,`${name}-${k}`);
            case 'name':    return testString(k, test.name, node,`${name}-${k}`);
            case 'operator':return testString(k, test.operator, node,`${name}-${k}`);
            case 'target':  return testNameType(test.target, node, name);
            default: log.warn(`testTypeOperator found unknown key '${k}' for path '${name}'`);
                     log.info(log.inspect(test, null));
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
                     log.info(log.inspect(test, null));
        }
        return -1;
    }).reduce(accumulate, 0);
}

function testExtendedTypes(test:DocExtendedTypes, node: DocNode, name: string):number {
    return Object.getOwnPropertyNames(test).map(k => {
        use('DocTypeNameID', k);
        switch (k) {
            case 'type':    return testString(k, test.type, node,`${name}-${k}`);
            case 'name':    return testString(k, test.name, node,`${name}-${k}`);
            case 'id':      return testNumber(k, test.id, node,`${name}-${k}`);
            case 'typeArguments': return test.typeArguments.map(c => testNameType(c, node, `${name}-${k}`)).reduce(accumulate, 0); 
            default: log.warn(`testExtendedTypes found unknown key '${k}' for path '${name}'`);
                     log.info(log.inspect(test, null));
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
            case 'constraint':      return testConstraint(test.constraint, node, `${name}-${k}`);
            default: log.warn(`testType found unknown key '${k}' for path '${name}'`);
                     log.info(log.inspect(test, null));
        }
        return -1;
    }).reduce(accumulate, 0);
}


function testConstraint(test:DocConstraint, node: DocNode, name: string):number {
    return Object.getOwnPropertyNames(test).map(k => {
        use('DocNameType', k);
        switch (k) {
            case 'type':        return testString(k, test.type, node,`${name}-${k}`);
            case 'name':        return testString(k, test.name, node,`${name}-${k}`);
            case 'constraint':  return testTypeOperator(test.constraint, node,`${name}-${k}`);
            case 'operator':    return testString(k, test.operator, node,`${name}-${k}`); 
            case 'target':      return testNameType(test.target, node, name);
            default: log.warn(`testConstraint found unknown key '${k}' for path '${name}'`);
                     log.info(log.inspect(test, null));
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
