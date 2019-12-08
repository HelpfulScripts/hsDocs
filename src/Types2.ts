/**
 * 
 */
/** */
import { log as _log } from 'hsutil';import { stringify } from 'querystring';
 const log = _log('DocTypes');

const ifOptional = (value:any) => value===null? true : false;
const ifExists = (value:any) => value!==undefined? true : false;


//------------- interfaces -------------------------------------------

interface Flags {
    isExported?: boolean;
    isPrivate?: boolean;
    isPublic?: boolean;
    isStatic?: boolean;
    isConst?: boolean;
    isLet?: boolean;
    isOptional?: boolean;
    isProtected?: boolean;
    isAbstract?: boolean;
    isRest?: boolean;
    isConstructorProperty?: boolean;
}

interface DocsGroup {
    title:string;
    kind: number;
    children: DocsNode[];
}

interface DocsComment {
    shortText?: string;
    returns?: string;
    text?: string;
    tags?: [{
        tag: string;
        text: 'string'
    }];
}

interface DocsSource {
    fileName: string;
    line: number;
    character: number;
}

interface DocsDocSet {
    name: string;
    lib:string;
    fullPath:string;
    groups: any[];
}

interface DocsGenericType {
    type: string;
    [field:string]: any;
}

interface DocsNamedType extends DocsGenericType {
    type: string;
    name: string;
}

interface DocsReferenceIdType extends DocsNamedType {
    id: number;
}

type DocsSignature = DocsCallSignature;



//------------- Type class definitions -------------------------------------------

class DocsType {
    static makeType(mdlType:DocsGenericType) {
        switch (mdlType.type) {
            case 'intrinsic': return new DocsIntrinsicType(mdlType);
            case 'array': return new DocsArrayType(mdlType);
            case 'reflection': return new DocsReflectionType(mdlType);
            case 'stringLiteral': return new DocsStringLiteralType(mdlType);
            case 'reference': return new DocsReferenceType(mdlType);
            case 'tuple': return new DocsTupleType(mdlType);
            case 'union': return new DocsUnionType(mdlType);
            case 'unknown': return new DocsUnknownType(mdlType);
            default: log.warn(`unknown type '${mdlType.type}' in makeType`);

        }
    }
    type: string;
    constructor(mdlType:DocsGenericType) {
        this.type = mdlType.type;
    }
}

class DocsIntrinsicType extends DocsType {
    name: string;
    constructor(mdlType:DocsGenericType) {
        super(mdlType);
        this.name = mdlType.name;
    }
}

class DocsReferenceType extends DocsType {
    name: string;
    constructor(mdlType:DocsGenericType) {
        super(mdlType);
        this.name = mdlType.name;
    }
}

class DocsUnknownType extends DocsType {
    name: string;
    constructor(mdlType:DocsGenericType) {
        super(mdlType);
        this.name = mdlType.name;
    }
}

class DocsStringLiteralType extends DocsType {
    value: string;
    constructor(mdlType:DocsGenericType) {
        super(mdlType);
        this.value = mdlType.value;
    }
}

class DocsArrayType extends DocsType {
    elementType: DocsType;
    constructor(mdlType:DocsGenericType) {
        super(mdlType);
        this.elementType = DocsType.makeType(mdlType.elementType);
    }
}

class DocsReflectionType extends DocsType {
    declaration: DocsType;
    constructor(mdlType:DocsGenericType) {
        super(mdlType);
        if (mdlType.declaration) {
            this.declaration = DocsNode.makeNode(mdlType.declaration);
        }
    }
}

class DocsTupleType extends DocsType {
    elements = <DocsType[]>[];
    constructor(mdlType:DocsGenericType) {
        super(mdlType);
        mdlType.elements.forEach((e:DocsType) => this.elements.push(DocsType.makeType(e)));
    }
}

class DocsUnionType extends DocsType {
    types = <DocsReferenceIdType[]>[];
    constructor(mdlType:DocsGenericType) {
        super(mdlType);
        mdlType.types.forEach((t:DocsReferenceIdType) => this.types.push(t));
    }
}


//------------- Node class definitions -------------------------------------------

export class DocsNode {
    /** fields to expculde from the test */
    static meta = ['FLAGS', 'TYPE'];
    static count = 0;
    static makeNode(mdl:any) {
        const node = groupKindTitle[mdl.kind];
        if (!node) { log.warn(`unknown kind ${mdl.kind}`); }
        else { return new node(mdl); }
    }

    static traverse(mdl:any) {
        DocsNode.count++;
        const node = DocsNode.makeNode(mdl);
        if (mdl.children) {
            mdl.children.forEach((c:any) => DocsNode.count<5000? DocsNode.traverse(c) : '');
        }
    }

    id:number   = 0;  // defined = required; null = optional
    kind:number = 0;
    kindString: string = '';
    TYPE = <string[]>[];
    type: DocsType = null;

    constructor(mdl:any) {
        this.id = mdl.id;
        this.kindString = mdl.kindString || 'root';
    }

    set(mdl:any, fields = Object.getOwnPropertyNames(this)) {
        fields.forEach(f => { // expected fields
            if (mdl[f]!==undefined) { 
                if (f==='type') {
                    if (this.TYPE && this.TYPE.indexOf(mdl[f].type)>=0) {
                        this.type = DocsType.makeType(mdl[f]);
                    } else {
                        log.warn(`'${this.kindString}' #${mdl.id}: unexpected type '${mdl[f].type}'`);
                    }
                } else {
                    this[f] = mdl[f]; 
                }
            } else if (!ifOptional(this[f]) && DocsNode.meta.indexOf(f)<0) {
                log.warn(`'${this.kindString}' #${mdl.id}: field '${f}' should be optional`);
            }
        });
        fields = Object.getOwnPropertyNames(mdl);
        fields.forEach(f => { // unexpected fields
            if (!ifExists(this[f])) {
                log.warn(`'${this.kindString}' #${this.id}: found extra field '${f}'='${log.inspect(mdl[f],2)}'`);
            }
        });
    }
}

class DocsFlagged extends DocsNode {
    FLAGS = <Flags>{};  // flags listed here are allowed if false and required if true
    flags: flags.Flags = {};

    constructor(mdl:any) {
        super(mdl);
    }

    setFlags(mdlFlags:any) {
        const staticFlags:Flags = this.FLAGS;
        Object.keys(staticFlags).forEach(f => { // expected flags
            if (mdlFlags[f]!==undefined) { this.flags[f] = mdlFlags[f]; }
            else if (staticFlags[f]===true) {
                log.warn(`'${this.kindString}' #${this.id}: flag '${f}' should be optional`);
            }
        });
        const flags = Object.getOwnPropertyNames(mdlFlags);
        flags.forEach(f => { // unexpected flags
            if (staticFlags[f]===undefined) {
                log.warn(`'${this.kindString}' #${this.id}: found extra flag '${f}'='${log.inspect(mdlFlags[f],1)}'`);
            }
        });
    }
}

class DocsRoot extends DocsFlagged {
    FLAGS = {    // flags listed here are allowed if false and required if true
    };  
    name:string = '';
    lib:string = '';
    fullPath:string = '';
    children:DocsNode[] = null; // optional
    groups:  DocsGroup[] = [];

    constructor(mdl:any) {
        super(mdl);
        this.kindString = null; // optional for root
        this.set(mdl);
        this.setFlags(mdl.flags);
    }
}

class DocsExternalModule extends DocsFlagged {
    FLAGS = {    // flags listed here are allowed if false and required if true
        isExported:true
    };
    name:string = '';
    originalName:string = '';
    comment:DocsComment = null; 
    sources:DocsSource[] = [];
    children:DocsNode[] = null;
    groups:  DocsGroup[] = null;
    lib:string = '';
    fullPath:string = '';

    constructor(mdl:any) {
        super(mdl);
        // this.set(['name', 'originalName', 'comment', 'sources', 'children', 'groups', 'lib', 'fullPath'], mdl);
        this.set(mdl);
        this.setFlags(mdl.flags);
    }
}

class DocsModule extends DocsFlagged {
    FLAGS = {    // flags listed here are allowed if false and required if true
        isExported: false
    };
    name:string = '';
    children:DocsNode[] = []; 
    groups:  DocsGroup[] = [];
    sources:DocsSource[] = [];
    lib:string = '';
    fullPath:string = '';

    constructor(mdl:any) {
        super(mdl);
        this.set(mdl);
        this.setFlags(mdl.flags);
    }
}

class DocsEnumeration extends DocsFlagged {
    FLAGS = {    // flags listed here are allowed if false and required if true
        isExported: false
    };
    name:string = '';
    children:DocsNode[] = []; 
    groups:  DocsGroup[] = [];
    sources:DocsSource[] = [];
    lib:string = '';
    fullPath:string = '';

    constructor(mdl:any) {
        super(mdl);
        this.set(mdl);
        this.setFlags(mdl.flags);
    }
}

class DocsUnknwn extends DocsFlagged {
    FLAGS = {    // flags listed here are allowed if false and required if true
    };
    constructor(mdl:any) {
        super(mdl);
        this.setFlags(mdl.flags);
    }
}

class DocsEnumerationMember extends DocsFlagged {
    FLAGS = {    // flags listed here are allowed if false and required if true
        isExported: false
    };
    name:string = '';
    sources:DocsSource[] = [];
    lib:string = '';
    fullPath:string = '';
    defaultValue:string = null;

    constructor(mdl:any) {
        super(mdl);
        this.set(mdl);
        this.setFlags(mdl.flags);
    }
}

class DocsVariable extends DocsFlagged {
    FLAGS = {    // flags listed here are allowed if false and required if true
        isExported: false,
        isConst:    false,
        isLet:      false
    };
    TYPE = ['array', 'reflection', 'intrinsic', 'reference', 'stringLiteral', 'unknown'];
    name:string = '';
    sources:DocsSource[] = [];
    defaultValue:string[] = null;
    lib:string = '';
    fullPath:string = '';
    comment:DocsComment = null;

    constructor(mdl:any) {
        super(mdl);
        this.set(mdl);
        this.setFlags(mdl.flags);
    }
}

class DocsFunction extends DocsFlagged {
    FLAGS = {    // flags listed here are allowed if false and required if true
        isExported: false,
        isConst:    false
    };
    name:string = '';
    signatures: DocsSignature[] = [];
    sources:DocsSource[] = [];
    lib:string = '';
    fullPath:string = '';
    comment:DocsComment = null; 

    constructor(mdl:any) {
        super(mdl);
        this.set(mdl);
        this.setFlags(mdl.flags);
    }
}

class DocsClass extends DocsFlagged {
    FLAGS = {    // flags listed here are allowed if false and required if true
        isExported: false,
        isAbstract: false
    };
    name:string = '';
    comment:DocsComment = null;
    children:DocsNode[] = [];
    groups:  DocsGroup[] = [];
    sources: DocsSource[] = [];
    lib:string = '';
    fullPath:string = '';
    extendedTypes: DocsReferenceIdType[] = null;
    extendedBy: DocsReferenceIdType[] = null;
    implementedTypes: DocsNamedType[] = null;

    constructor(mdl:any) {
        super(mdl);
        this.set(mdl);
        this.setFlags(mdl.flags);
    }
}

class DocsInterface extends DocsFlagged {
    FLAGS = {    // flags listed here are allowed if false and required if true
        isExported: false
    };
    name:string = '';
    comment:DocsComment = null;
    children:DocsNode[] = null;
    groups:  DocsGroup[] = null;
    lib:string = '';
    fullPath:string = '';
    sources:DocsSource[] = [];
    extendedTypes:DocsReferenceIdType[] = null;
    extendedBy: DocsReferenceIdType[] = null;
    indexSignature: DocsIndexSignature[] = null;
    implementedBy: DocsReferenceIdType[] = null;
    signatures: DocsSignature[] = null;

    constructor(mdl:any) {
        super(mdl);
        this.set(mdl);
        this.setFlags(mdl.flags);
    }
}

class DocsConstructor extends DocsFlagged {
    FLAGS = {    // flags listed here are allowed if false and required if true
        isExported: false
    };
    name:string = '';
    signatures: DocsNode[] = [];
    sources:DocsSource[] = [];
    overwrites: DocsReferenceIdType = null;
    lib:string = '';
    fullPath:string = '';
    inheritedFrom: DocsReferenceIdType = null;
    comment:DocsComment = null;

    constructor(mdl:any) {
        super(mdl);
        this.set(mdl);
        this.setFlags(mdl.flags);
    }
}

class DocsProperty extends DocsFlagged {
    TYPE = ['intrinsic', 'array', 'reflection', 'stringLiteral', 'reference', 'tuple', 'union'];
    FLAGS = {    // flags listed here are allowed if false and required if true
        isPrivate:              false,
        isProtected:            false,
        isPublic:               false,
        isStatic:               false,
        isExported:             false,
        isOptional:             false,
        isConstructorProperty:  false
    };
    name:string = '';
    sources: DocsSource[] = [];
    comment:DocsComment = null;
    lib:string = '';
    fullPath:string = '';
    inheritedFrom: DocsReferenceIdType = null;
    overwrites: DocsReferenceIdType = null;
    defaultValue:string[] = null;

    constructor(mdl:any) {
        super(mdl);
        this.set(mdl);
        this.setFlags(mdl.flags);
    }
}

class DocsMethod extends DocsFlagged {
    FLAGS = {    // flags listed here are allowed if false and required if true
        isPublic:   false,
        isStatic:   false,
        isProtected:false,
        isExported: false,
        isPrivate:  false,
        isAbstract: false,
        isOptional: false
    };
    name:string = '';
    lib:string = '';
    fullPath:string = '';
    signatures: DocsSignature[] = [];
    sources: DocsSource[] = [];
    inheritedFrom: DocsReferenceIdType = null;
    overwrites: DocsNamedType = null;
    implementationOf: DocsReferenceIdType = null;

    constructor(mdl:any) {
        super(mdl);
        this.set(mdl);
        this.setFlags(mdl.flags);
    }
}

class DocsCallSignature extends DocsFlagged {
    FLAGS = {    // flags listed here are allowed if false and required if true
    };

    constructor(mdl:any) {
        super(mdl);
        this.set(mdl);
        this.setFlags(mdl.flags);
    }
}

class DocsIndexSignature extends DocsFlagged {
    FLAGS = {    // flags listed here are allowed if false and required if true
    };

    constructor(mdl:any) {
        super(mdl);
        this.set(mdl);
        this.setFlags(mdl.flags);
    }
}

class DocsConstructorSignature extends DocsFlagged {
    FLAGS = {    // flags listed here are allowed if false and required if true
    };

    comment:DocsComment = null;

    constructor(mdl:any) {
        super(mdl);
        this.set(mdl);
        this.setFlags(mdl.flags);
    }
}

class DocsParameter extends DocsFlagged {
    FLAGS = {    // flags listed here are allowed if false and required if true
    };

    constructor(mdl:any) {
        super(mdl);
        this.set(mdl);
        this.setFlags(mdl.flags);
    }
}

class DocsTypeLiteral extends DocsFlagged {
    FLAGS = {    // flags listed here are allowed if false and required if true
    };
    name:string = '';
    indexSignature: DocsIndexSignature[] = null;
    sources:DocsSource[] = null;
    signatures: DocsSignature[] = null;

    children:DocsNode[] = null;
    groups:  DocsGroup[] = null;

    constructor(mdl:any) {
        super(mdl);
        this.set(mdl);
        this.setFlags(mdl.flags);
   }
}

class DocsTypeParameter extends DocsFlagged {
    FLAGS = {    // flags listed here are allowed if false and required if true
    };

    constructor(mdl:any) {
        super(mdl);
        this.set(mdl);
        this.setFlags(mdl.flags);
    }
}

class DocsAccessors extends DocsFlagged {
    FLAGS = {    // flags listed here are allowed if false and required if true
        isPublic:   false,
        isPrivate:  false,
        isProtected:false,
        isExported: false,
        isStatic:   false
    };
    name:string = '';
    getSignature: DocsGetSignature[] = null;
    setSignature: DocsSetSignature[] = null;
    sources:DocsSource[] = [];
    overwrites: DocsReferenceIdType = null;
    inheritedFrom: DocsReferenceIdType = null;
    implementationOf: DocsReferenceIdType = null;
    comment:DocsComment = null;
    // children:DocsNode[];
    // groups:  DocsGroup[] = null;
    lib:string = '';
    fullPath:string = '';

    constructor(mdl:any) {
        super(mdl);
        this.set(mdl);
        this.setFlags(mdl.flags);
    }
}

class DocsGetSignature extends DocsFlagged {
    FLAGS = {    // flags listed here are allowed if false and required if true
    };

    constructor(mdl:any) {
        super(mdl);
        this.set(mdl);
        this.setFlags(mdl.flags);
    }
}

class DocsSetSignature extends DocsFlagged {
    FLAGS = {    // flags listed here are allowed if false and required if true
    };

    constructor(mdl:any) {
        super(mdl);
        this.set(mdl);
        this.setFlags(mdl.flags);
    }
}

class DocsObjectLiteral extends DocsFlagged {
    TYPE = ['intrinsic'];
    FLAGS = {    // flags listed here are allowed if false and required if true
        isPrivate:  false,
        isPublic:   false,
        isProtected:false,
        isStatic:   false,
        isExported: false,
        isConst:    false
    };
    name:string = '';
    comment:DocsComment = null;
    children:DocsNode[] = [];
    groups:  DocsGroup[] = [];
    lib:string = '';
    fullPath:string = '';
    sources:DocsSource[] = [];

    constructor(mdl:any) {
        super(mdl);
        this.set(mdl);
        this.setFlags(mdl.flags);
    }
}

class DocsTypeAlias extends DocsFlagged {
    TYPE = ['intrinsic', 'union', 'array', 'tuple', 'reflection', 'reference'];
    FLAGS = {    // flags listed here are allowed if false and required if true
        isExported: false
    };
    name:string = '';
    comment:DocsComment = null;
    lib:string = '';
    fullPath:string = '';
    sources:DocsSource[] = [];

    constructor(mdl:any) {
        super(mdl);
        this.set(mdl);
        this.setFlags(mdl.flags);
    }
}

const groupKindTitle = {
    0:      DocsRoot,
    1:      DocsExternalModule,
    2:      DocsModule,
    4:      DocsEnumeration,
    8:      DocsUnknwn,
    16:     DocsEnumerationMember,
    32:     DocsVariable,
    64:     DocsFunction,
    128:    DocsClass,
    256:    DocsInterface,
    512:    DocsConstructor,
    1024:   DocsProperty,
    2048:   DocsMethod,
    4096:   DocsCallSignature,
    8192:   DocsIndexSignature,
    16384:  DocsConstructorSignature,
    32768:  DocsParameter,
    65536:  DocsTypeLiteral,
    131072: DocsTypeParameter,
    262144: DocsAccessors,
    524288: DocsGetSignature,
    1048576:DocsSetSignature,
    2097152:DocsObjectLiteral,
    4194304:DocsTypeAlias
};

namespace flags {
    export interface Flags { [flag:string]: boolean; }

    export interface All extends Flags {
        isExported?: boolean;
        isPrivate?: boolean;
        isPublic?: boolean;
        isStatic?: boolean;
        isConst?: boolean;
        isLet?: boolean;
        isOptional?: boolean;
        isProtected?: boolean;
        isAbstract?: boolean;
        isRest?: boolean;
        isConstructorProperty?: boolean;
    }
    
    export interface ExternalModule extends Flags {   // 1
        isExported?: boolean;
    }
    
    export interface Enumeration extends Flags {  // 4
        isExported?: boolean;
    }
    
    export interface EnumerationMember extends Flags {    // 16
        isExported?: boolean;
    }
    
    export interface Variable extends Flags { // 32
        isExported?: boolean;
        isConst?: boolean;
        isLet?: boolean;
    }
    
    export interface Function extends Flags { // 64
        isExported?: boolean;
        isConst?: boolean;
        isLet?: boolean;
    }
    
    export interface Class extends Flags {    // 128
        isExported?: boolean;
        isAbstract?: boolean;
    }
    
    export interface Interface extends Flags {    // 256
        isExported?: boolean;
    }
    export interface Constructor extends Flags {  // 512
        isExported?: boolean;
    }
    
    export interface Property extends Flags { // 1024
        isPublic?: boolean;
        isStatic?: boolean;
        isExported?: boolean;
        isProtected?: boolean;
        isPrivate?: boolean;
        isOptional?: boolean;
        isConstructorProperty: boolean;
    }

    export interface Method extends Flags {   // 2048
        isPublic?: boolean;
        isStatic?: boolean;
        isExported?: boolean;
        isProtected?: boolean;
        isPrivate?: boolean;
        isAbstract?: boolean;
        isOptional?: boolean;
    }
        
    export interface CallSignature extends Flags {    // 4096
    }

    export interface IndexSignature extends Flags {   // 8192
    }

    export interface ConstructorSignature { // 16384
    }

    export interface Parameter extends Flags {    // 32768
        isOptional?: boolean;
        isRest?: boolean;
    }
    
    export interface TypeLiteral extends Flags { // 65536
    }

    export interface TypeParameter extends Flags { // 131072
    }

    export interface Accessor extends Flags { // 262144
        isExported?: boolean;
        isPrivate?: boolean;
        isPublic?: boolean;
        isProtected?: boolean;
        isStatic?: boolean;
    }
    
    export interface GetSignature extends Flags { // 524288
    }

    export interface SetSignature extends Flags { // 1048576
    }

    export interface ObjectLiteral extends Flags {    // 2097152
        isExported?: boolean;
        isPrivate?: boolean;
        isPublic?: boolean;
        isProtected?: boolean;
        isStatic?: boolean;
    }

    export interface TypeAlias extends Flags {    // 4194304
        isExported?: boolean;
    }
}