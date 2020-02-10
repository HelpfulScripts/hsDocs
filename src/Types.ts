/**
 * Node type declarations
 */
/** */

import { Log }                  from 'hsutil'; const log = new Log('DocTypes');
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
            case 'unknown': return new DocsUnknownType(mdlType, node);
            default: log.warn(`unknown type '${mdlType.type}' in makeType`);
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

    mType(parent:DocsNode) { return m('span.hsdocs_type_unknown', 'default type'); }
}

class DocsIntrinsicType extends DocsType {
    name: string;
    constructor(mdlType:DocsGenericType, node:DocsNode) {
        super(mdlType, node);
        this.name = mdlType.name;
    }
    mType(parent:DocsNode) {
        // return m('span.hsdocs_type_intrinsic', this.id? libLinkByPath(this.node.lib, ''+this.id, this.name) : parent.getName()); 
        return m('span.hsdocs_type_intrinsic', this.id? libLinkByPath(this.node.lib, ''+this.id, this.name) : this.name); 
    }
}

class DocsReferenceType extends DocsType {
    typeArguments: DocsType[];
    constructor(mdlType:DocsGenericType, node:DocsNode) {
        super(mdlType, node);
        this.typeArguments = !mdlType.typeArguments? [] : mdlType.typeArguments.map((t:DocsNamedType) => DocsType.makeType(t, node));
    }

    mType(parent:DocsNode) {
        let refRes = [this.id? libLinkByPath(this.node.lib, ''+this.id, this.name) : this.name];
        if (this.typeArguments.length) { 
            refRes.push('<');
            refRes.push(...this.typeArguments.map(t => t.mType(parent)));
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
    mType(parent:DocsNode) {
        return m('span.hsdocs_type_array', ['Array<', this.elementType.mType(parent), '>']);
    }
}

class DocsTypeParameterType extends DocsType {
    constraint: DocsTypeOperatorType;
    constructor(mdlType:DocsGenericType, node:DocsNode) {
        super(mdlType, node);
        this.constraint = mdlType.constraint;
    }
    mType() {
        return m('span.hsdocs_type_typeparameter', `${this.constraint.operator} ${this.constraint.target.name}`);
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
            // if (decl.children) {
            //     this.declaration.children = decl.children.map((c:json) => DocsNode.traverse(c, node.fullPath));
            // }
            // if (decl.signatures) {
            //     this.declaration.signatures = decl.signatures.map((c:json) => DocsNode.traverse(c, node.fullPath)));
            // }
            // if (decl.indexSignature) {
            //     decl.indexSignature = decl.indexSignature.map(c => <DocsIndexSignature>DocsNode.traverse(c, node.fullPath));
            // }
        }
    }

    mType(parent:DocsNode) {
        const dec = this.declaration;
        const rflRes = !dec? 'UNKNOWN' : 
            dec.children? [
                '{ ',
                ...dec.children.map((c:any, i:number) => `${c.name}: ${c.type.mType(parent)}`).join(', '),
                ' }'
            ] : dec.getSignatures()? [
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
    mType(parent:DocsNode) {
        return m('span.hsdocs_type_tuple', [
            '[ ',
            ...this.elements.map((e:any, i:number) => [i>0?', ':undefined, e.mType(parent)]),
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

    mType(parent:DocsNode):Vnode {
        return m('span.hsdocs_type_union', [...this.types.map((t:any, i:number) => m('span', [i>0?' | ':'', t.mType(parent)]))]);
    }
}
