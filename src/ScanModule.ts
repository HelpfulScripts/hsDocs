/**
 * 
 */
/** */

import { log as _log } from 'hsutil'; const log = _log('scanModule');

/** for the following fields (if `true`), replace the type with a value enumeration durting the scan */
const ENUMERATE = {
    kindString: true,
    kind: true,
    title: true
};

const mainNodeTypes = {};

export function scanModule(mdl: any) {
    try { nodeRecurse(mdl); }
    catch (e) { log.warn(e); }
}

export function reportModuleTypes() {
    log.debug(log.inspect(mainNodeTypes, null));
}

function nodeRecurse(node: any) {
    mainNodeTypes[node.kind] = mainNodeTypes[node.kind] || {};
    destruct(node, mainNodeTypes[node.kind]);
    if (node.children) {
        node.children.forEach((child: any) => nodeRecurse(child));
    }
}

function destruct(struct: any, result: any) {
    const keys = Object.getOwnPropertyNames(struct);
    keys.forEach(k => {
        const type = typeof (struct[k]);
        if (ENUMERATE[k]) {
            result[k] = enumerate(struct[k], result[k]);
        } else if (k !== 'children' && type === 'object') {
            if (struct[k].length) {
                result[k] = result[k] || [{}];
                struct[k].forEach((s: any) => destruct(s, result[k][0]));
            } else {
                result[k] = result[k] || {};
                destruct(struct[k], result[k]);
            }
        } else {
            result[k] = type;
        }
    });
}

function enumerate(struct: any, result: any) {
    if (!result) {
        result = '' + struct;
    } else if (result.indexOf(struct) < 0) {
        result = result + '|' + struct;
    }
    return result;
}

// -------------- Type Declarations

type DocsKinds = 1|2|4|8|16|32|64|128|256|
                        512|1024|2048|4096|8192|16384|32768|65536|
                        131072|262144|524288|1048576|2097152|4194304;

type DocsTitles =  "External modules" | "Module" | "Enumerations" | "Enumeration members" | 
        "Variables" | "Functions" | "Classes" | "Interfaces" | "Constructors" | 
        "Properties" | "Methods" | "Call signature" | "Index signature" | 
        "Constructor signature" | "Parameter" | "Type literal" | "Type parameter" | 
        "Accessors" | "Get signature" | "Set signature" | "Object literals" | "Type aliases";

// export type DocNodeType =
//     DocsExternalModule        // 1
//     | DocModule                 // 2
//     | DocsEnumeration           // 4
//     | DocsEnumerationMember     // 16
//     | DocsVariable              // 32
//     | DocsFunction              // 64
//     | DocsClass                 // 128
//     | DocsInterface             // 256
//     | DocsConstructor           // 512
//     | DocsProperty              // 1024
//     | DocsMethod                // 2048
//     | DocsAccessor              // 262144
//     | DocsObjectLiteral         // 2097152
//     | DocsTypeAlias             // 4194304`
// ;


export namespace flags {
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

export interface Node {
    id: number;
    name: string;
    lib?: string;
    fullPath?: 'string';
}

export namespace nodes {

    export interface Base extends Node {
        sources?: DocsSource[];
        comment?: DocsComment;
        signatures?: signatures.Base[];
    }

    export interface Root extends Base {
        kind: '0';
        flags: flags.All;
        children: 'object';
        groups: DocsGroup[];
        modules: [{
            name: string;
            lib: string;
            fullPath: string;
            groups:  DocsGroup[];
        }];
    }
    
    export interface ExternalModule extends Base {
        kind: '1';
        kindString: 'External module';
        flags: flags.ExternalModule;
        originalName: string;
        children: 'object';
        groups:  DocsGroup[];
    }
    
    export interface Module extends Base {
        kind: '2';
        kindString: 'Module';
    }

    export interface Enumeration extends Base {
        kind: '4';
        kindString: 'Enumeration';
        flags: flags.Enumeration;
        children: Base[];
        groups:  DocsGroup[];
    }
    
    export interface EnumerationMember extends Base {
        kind: '16';
        kindString: 'Enumeration member';
        flags: flags.EnumerationMember;
        defaultValue: string;
    }
    
    export interface Variable extends Base {
        kind: '32';
        kindString: 'Variable';
        flags: flags.Variable;
        type: DocsType;
        defaultValue: string;
        lib: string;
    }

    export interface Function extends Base {
        kind: '64';
        kindString: 'Function';
        flags: flags.Function;
        signatures: signatures.Call[];
    }
    
    export interface Class extends Base {
        kind: '128';
        kindString: 'Class';
        flags: flags.Class;
        children: Base[];
        groups:  DocsGroup[];
        extendedTypes: DocsType[];
        extendedBy: DocsType[];
        implementedTypes: DocsType[];
    }
    
    export interface Interface extends Base {
        kind: '256';
        kindString: 'Interface';
        flags: flags.Interface;
        children: Base[];
        groups:  DocsGroup[];
        extendedTypes: DocsType[];
        extendedBy: DocsType[];
        indexSignature: signatures.Index[];
        implementedBy: DocsType[];
        signatures: signatures.Call[];
    }
    
    export interface Constructor extends Base {
        kind: '512';
        kindString: 'Constructor';
        flags: flags.Constructor;
        signatures: signatures.Constructor[];
        overwrites: DocsSimpleType;
        inheritedFrom: DocsSimpleType;
    }
    
    export interface Property extends Base {
        kind: '1024';
        kindString: 'Property';
        flags: flags.Property;
        type: DocsType;
        inheritedFrom: DocsSimpleType;
        defaultValue: string;
        overwrites: DocsSimpleType;
    }
    
    export interface Method extends Base {
        kind: '2048';
        kindString: 'Method';
        flags: flags.Method;
        signatures: signatures.Call[];
        inheritedFrom: DocsSimpleType;
        overwrites: DocsSimpleType;
        implementationOf: DocsSimpleType;
    }
    
    export interface Accessor extends Base {
        kind: '262144';
        kindString: 'Accessor';
        flags: flags.Accessor;
        getSignature: signatures.Get[];
        overwrites: DocsSimpleType;
        inheritedFrom: DocsSimpleType;
        implementationOf: DocsSimpleType;
        setSignature: signatures.Accessor[];
    }
    
    export interface ObjectLiteral extends Base {
        kind: '2097152';
        kindString: 'Object literal';
        flags: flags.ObjectLiteral;
        children: Base[];
        groups:  DocsGroup[];
        type: DocsSimpleType;
    }
    
    export interface TypeAlias extends Base {
        kind: '4194304';
        kindString: 'Type alias';
        flags: flags.TypeAlias;
        type: DocsType;
    }
}

export namespace signatures {

    export interface Base extends Node{
    }
    
    export interface Call extends Base {
        kind: '4096';
        kindString: 'Call signature';
        flags: flags.CallSignature;
        parameters: DocsParameter[];
        comment?: DocsComment;
        type: DocsType;
        typeParameter?: DocsTypeParameter[];
    }
    
    export interface Index extends Base {
        kind: '8192';
        kindString: 'Index signature';
        flags: flags.IndexSignature;
        parameters: DocsTypeParameter[];
        comment?: DocsComment;
        type: DocsSimpleType;
    }
    
    export interface Constructor extends Base {
        kind: '16384';
        kindString: 'Constructor signature';
        flags: flags.ConstructorSignature;
        parameters: DocsParameter[];
        type: DocsSimpleType;
        overwrites: DocsSimpleType;
        inheritedFrom: DocsSimpleType;
        comment: DocsComment;
    }
    
    export interface Get extends Base {
        kind: '524288';
        kindString: 'Get signature';
        flags: flags.GetSignature;
        type: DocsType;
        overwrites: DocsSimpleType;
        inheritedFrom: DocsSimpleType;
        comment: DocsComment;
    }
    
    export interface Set extends Base {
        kind: '1048576';
        kindString: 'Set signature';
        flags: flags.SetSignature;
        parameters: DocsParameter[];
        type: DocsSimpleType;
    }

    export type Accessor = Get | Set;
}


interface DocsParameter {
    id: number;
    name: string;
    kind: '32768';
    kindString: 'Parameter';
    flags: flags.Parameter;
    type: DocsSimpleType;
    lib?: string;
    fullPath?: string;
    defaultValue?: string;
    comment?: DocsComment;

}

type DocsType = DocsSimpleType | DocsStructuredType | DocsTargetType;

interface DocsSimpleType {
    type: string;
    name?: 'string';
    id?: number;
}

interface DocsStructuredType extends DocsSimpleType {
    types?: DocsType[];
    declaration: DocsTypeLiteral;
    elementType?: DocsSimpleType;
    typeArguments?: DocsSimpleType[];
}

interface DocsTargetType extends DocsSimpleType {
    operator: string;
    target: DocsSimpleType;
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

interface DocsTypeLiteral extends nodes.Base {
    kind: '65536';
    kindString: 'Type literal';
    flags: flags.TypeLiteral;
    indexSignature: signatures.Index[];
    children: nodes.Base[];
    groups:  DocsGroup[];
    signatures?: signatures.Call[];
}

interface DocsTypeParameter extends nodes.Base {
    kind: '131072';
    kindString: 'Type parameter';
    flags: flags.TypeParameter;
    type?: DocsType;
}

interface DocsGroup {
    title:DocsTitles;
    kind: DocsKinds;
    children: nodes.Base[];
}

interface DocsSource {
    fileName: string;
    line: number;
    character: number;
}