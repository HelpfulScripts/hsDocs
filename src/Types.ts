/**
 * Node type declarations
 */
/** */

import { Log }                  from 'hsutil'; const log = new Log('Types');
import { DocsNode }             from './Nodes';
import { m, Vnode}              from 'hslayout';
import { libLinkByPath }        from './NodesDisplay';
import { titleArr }             from './NodesDisplay';

interface DocsGenericType {
    type: string;
    [field:string]: any;
}

export interface DocsNamedType extends DocsGenericType {
    type: string;
    name: string;
}

export interface DocsReferenceIdType extends DocsNamedType {
    id: number;
}

export interface DocsConstrainedType extends DocsNamedType {
    constraint: {
        operator: string;
        type:     string;
        target:   DocsNamedType;
    };
}


//------------- Type class definitions -------------------------------------------

export class DocsType implements DocsReferenceIdType {
    static makeType(mdlType:DocsGenericType, node:DocsNode) {
        switch (mdlType.type) {
            case 'intrinsic': return new DocsIntrinsicType(mdlType, node);
            case 'array': return new DocsArrayType(mdlType, node);
            case 'reflection': return new DocsReflectionType(mdlType, node);
            case 'stringLiteral': return new DocsStringLiteralType(mdlType, node);
            case 'reference': return new DocsReferenceType(mdlType, node);
            case 'tuple': return new DocsTupleType(mdlType, node);
            case 'union': return new DocsUnionType(mdlType, node);
            case 'typeParameter': return new DocsTypeParameterType(mdlType, node);
            case 'typeOperator': return new DocsTypeOperatorType(mdlType, node);
            case 'query': return new DocsQueryType(mdlType, node);
            case 'indexedAccess': return new DocsIndexedAccessType(mdlType, node);
            case 'unknown': return new DocsUnknownType(mdlType, node);
            default: log.warn(`unknown type '${mdlType.type}' for ${node.fullPath} in makeType`);
        }
    }
    type: string;
    name: string;
    node: DocsNode;
    id:   number;
    declaration: DocsNode;
    constructor(mdlType:DocsGenericType, node:DocsNode) {
        this.type = mdlType.type;
        this.id   = mdlType.id;
        this.name = mdlType.name;
        this.node = node;
    }

    mType() { return m('span.hsdocs_type_unknown', 'default type'); }
}

class DocsIntrinsicType extends DocsType {
    name: string;
    constructor(mdlType:DocsGenericType, node:DocsNode) {
        super(mdlType, node);
        this.name = mdlType.name;
    }
    mType() {
        return m('span.hsdocs_type_intrinsic', this.id? libLinkByPath(this.node.lib, ''+this.id, this.name) : this.name); 
    }
}

class DocsReferenceType extends DocsType {
    typeArguments: DocsType[];
    constructor(mdlType:DocsGenericType, node:DocsNode) {
        super(mdlType, node);
        this.typeArguments = !mdlType.typeArguments? [] : mdlType.typeArguments.map((t:DocsNamedType) => DocsType.makeType(t, node));
    }

    mType() {
        let refRes = [this.id? libLinkByPath(this.node.lib, ''+this.id, this.name) : this.name];
        if (this.typeArguments.length) { 
            refRes.push('<');
            refRes.push(...this.typeArguments.map(t => t.mType()));
            refRes.push('>'); 
        }
        return m('span.hsdocs_type_reference', refRes);        
    }
}

class DocsUnknownType extends DocsType {
    name: string;
    constructor(mdlType:DocsGenericType, node:DocsNode) {
        super(mdlType, node);
        this.name = mdlType.name;
    }
    mType() { return m('span.hsdocs_type_unknown', 'unknown type'); }
}

class DocsStringLiteralType extends DocsType {
    value: string;
    constructor(mdlType:DocsGenericType, node:DocsNode) {
        super(mdlType, node);
        this.value = mdlType.value;
    }
    mType() {
        return m('span.hsdocs_type_string_literal', this.type); 
    }
}

class DocsArrayType extends DocsType {
    elementType: DocsType;
    constructor(mdlType:DocsGenericType, node:DocsNode) {
        super(mdlType, node);
        this.elementType = DocsType.makeType(mdlType.elementType, node);
    }
    mType() {
        return m('span.hsdocs_type_array', ['Array<', this.elementType.mType(), '>']);
    }
}

class DocsTypeParameterType extends DocsType {
    constraint: DocsNamedType|DocsTypeOperatorType;
    constructor(mdlType:DocsGenericType, node:DocsNode) {
        super(mdlType, node);
        this.constraint = mdlType.constraint;
    }
    mType() {
        return !this.constraint? 
            m('span.hsdocs_type_typeparameter', this.name) : this.constraint.name? 
            m('span.hsdocs_type_typeparameter', `${this.constraint.name}`)
          : m('span.hsdocs_type_typeparameter', `${this.constraint.operator} ${this.constraint.target.name}`);
    }
}

class DocsTypeOperatorType extends DocsType {
    operator: string;   // "keyof";
    target: DocsNamedType;
    constructor(mdlType:DocsGenericType, node:DocsNode) {
        super(mdlType, node);
        this.operator = mdlType.operator;
        this.target = mdlType.target;
    }
    mType() {
        return m('span.hsdocs_type_typeoperator', `${this.operator} ${this.target.name}`);
    }
}

class DocsReflectionType extends DocsType {
    constructor(mdlType:DocsGenericType, node:DocsNode) {
        super(mdlType, node);
        if (mdlType.declaration) {
            const decl:DocsNode = this.declaration = DocsNode.traverse(mdlType.declaration, node.fullPath);
        }
    }

    mType() {
        const dec = this.declaration;
        const rflRes = !dec? 'UNKNOWN' : 
            dec.children? [
                '{ ', 
                ...dec.children
                    .map((c:any, i:number) =>
                        m('span.named_param',[i>0?', ':'', c.name, ':', c.type?c.type.mType() : '??type??',c.defaultValue?'='+c.defaultValue : ''])
                    ),
                ' }']
            : dec.getSignatures()? [
                ...dec.getSignatures().map(s => titleArr(s))
            ] : dec.kindString
        ;
        return m('span.hsdocs_type_reflection', rflRes);
    }
}

class DocsTupleType extends DocsType {
    elements = <DocsType[]>[];
    constructor(mdlType:DocsGenericType, node:DocsNode) {
        super(mdlType, node);
        mdlType.elements.forEach((e:DocsType) => this.elements.push(DocsType.makeType(e, node)));
    }
    mType() {
        return m('span.hsdocs_type_tuple', [
            '[ ',
            ...this.elements.map((e:any, i:number) => [i>0?', ':undefined, e.mType()]),
            ' ]'
        ]);
    }
}

class DocsUnionType extends DocsType {
    types = <DocsReferenceIdType[]>[];
    constructor(mdlType:DocsGenericType, node:DocsNode) {
        super(mdlType, node);
        mdlType.types.forEach((t:DocsReferenceIdType) => this.types.push(DocsType.makeType(t, node)));
    }

    mType():Vnode {
        return m('span.hsdocs_type_union', [...this.types.map((t:any, i:number) => m('span', [i>0?' | ':'', t.mType()]))]);
    }
}

class DocsQueryType extends DocsType {
    queryType:DocsReferenceIdType;
    constructor(mdlType:DocsGenericType, node:DocsNode) {
        super(mdlType, node);
        this.queryType = mdlType.queryType;
    }
    mType() {
        return m('span.hsdocs_type_query', `typeof ${this.queryType.name}`);
    }
}

class DocsIndexedAccessType extends DocsType {
    indexType: DocsConstrainedType;
    objectType:DocsNamedType;
    constructor(mdlType:DocsGenericType, node:DocsNode) {
        super(mdlType, node);
        this.indexType  = mdlType.indexType;
        this.objectType = mdlType.objectType;
    }
    mType() {
        return m('span.hsdocs_type_indexed_access', this.objectType.name);
    }
}
