/**
 * ### Nodes
 * Definition of DocsNode classes.
 */

/** */
import m from "mithril";
type Vnode = m.Vnode<any, any>;

import { Log }                  from 'hsutil'; const log = new Log('Nodes');
import { json }                 from './DocSets';
import { DocSets }              from './DocSets';
import { DocsType }             from './Types';
import { DocsNamedType }        from './Types';
import { DocsReferenceIdType }  from './Types';
import { Flags }                from './Flags';
import { flagsNone }            from './Flags';
import { flagsExported }        from './Flags';
import { flagsConstLet }        from './Flags';
import { flagsClass }           from './Flags';
import { flagsPublic }          from './Flags';
import { title }                from './NodesDisplay';
import { DocsComment }          from './NodesDisplay';
import { commentLong }          from './NodesDisplay';
import { members }              from './NodesDisplay';


/** fields to exclude from the test */
const ignoreFields = ['FLAGS', 'TYPE', 'modules', 'kindPrint'];

const optional:any    = null;
const unsupported:any = undefined;

const expected = true;  // mandatory flag
const allowed  = false; // optional flag


export interface Group {
    children:   DocsNode[];
    kind:       string;
    title:      string;
}

export interface ModuleDesc {
    name:       string;
    lib:        string;
    fullPath:   string;
    groups:     Group[];
}


export class DocsNode {
    static errCount = 0;

    private static makeNode(mdl:json):DocsNode {
        const node = groupKindTitle[mdl.kind];
        if (!node) { log.warn(`unknown kind ${mdl.kindString} (${mdl.kind}) for ${mdl.fullPath}`); }
        else { 
            // if (DocSets.getNode(mdl.id, mdl.lib)) {
            //     log.warn(`node ${mdl.lib}.${mdl.id} already exists`);
            // // } else {
            // }
            return new node(mdl); 
        }
    }
    
    static traverse(mdl:json, lib:string, path=''):DocsNode {
        mdl.lib = lib;
        mdl.name = mdl.name.replace(/["'](.+)["']|(.+)/g, "$1$2")   // remove quotes 
                           .replace(/\//g, '.');                    // "a/b" => "a.b" /
        mdl.fullPath = (path==='')? mdl.name : `${path}.${mdl.name}`;
    if (DocsNode.errCount>20) { return; }
        return DocsNode.makeNode(mdl);
    }


    // All DocsNode fields:
    // - undefined: not allowed
    // - optional:      optional
    // - else:      required
    public    modules: ModuleDesc[];
    public    children:DocsNode[];
    public    comment:DocsComment = optional;
    public    defaultValue:string;
    public    extendedBy: DocsReferenceIdType[];
    public    extendedTypes: DocsReferenceIdType[];
    public    FLAGS = flagsNone;
    public    flags: Flags = {};
    public    fullPath:string = optional;
    public    getSignature: DocsGetSignature[];
    public    groups:DocsGroup[];
    public    id:number   = 0;  // defined = required; optional = optional
    public    indexSignature: DocsIndexSignature[];
    public    implementedTypes: DocsNamedType[];
    public    implementationOf: DocsReferenceIdType;
    public    implementedBy: DocsReferenceIdType[];
    public    inheritedFrom: DocsReferenceIdType;
    public    kind:number = 0;
    public    kindString: string = '';
    public    kindPrint: string;
    public    lib:string = optional;
    public    name:string = '';
    public    originalName:string;
    public    overwrites: DocsReferenceIdType;
    public    parameters:DocsParameter[];
    public    setSignature: DocsSetSignature[];
    protected signatures: DocsSignature[];
    public    sources: DocsSource[] = [];
    public    target:number;
    public    TYPE = <string[]>[];
    public    type: DocsType = optional;
    public    typeParameter:DocsTypeParameter[];

    constructor(mdl:json) {
        this.id = mdl.id;
        this.kindString = mdl.kindString || 'root';
        DocSets.addNode(mdl, this);
    }

    public getName() { return this.name; }
    public getSignatures() { return this.signatures; }
    public setSignatures(signatures: DocsSignature[]) { this.signatures = signatures; }
    public getParameters(params:(s:DocsParamaterized)=>Vnode[]):Vnode[] { 
        return this.getParameters? params(this) : undefined;    
    }

    public title():Vnode { return title(this); }
    public commentLong():m.Children { return commentLong(this); }
    public members():Vnode { return members(this); }
}


const isNotIgnored = (field:string) => ignoreFields.indexOf(field)<0;
const isExpected = (value:any) => value===null? false : true;


//------------- interfaces -------------------------------------------
export interface DocsGroup {
    title:string;
    kind: number;
    children: number[];
}


export interface DocsSource {
    fileName: string;
    line: number;
    character: number;
}

export interface DocsParamaterized extends DocsNode {}
export interface DocsSignature extends DocsParamaterized {}

//------------- Node class definitions -------------------------------------------

/**
 * establishes a mechanism to check for expected or optional properties, as well as 
 * a set of flags and types, for derived classes.
 */
export class DocsBaseNode extends DocsNode {
    mdl:json;
    constructor(mdl:json) {
        super(mdl);
        this.init();
        this.set(mdl);
        this.setFlags(mdl.flags);
    }

    init() {
        this.FLAGS = flagsNone;
    }

    set(mdl:json, fields = Object.getOwnPropertyNames(this)) {
        fields.filter(f=>this[f]!==undefined).forEach(f => { // expected fields
            if (mdl[f]!==undefined) { 
                switch(f) {
                    case 'type': 
                        if (mdl[f].type==='unknown' || this?.TYPE.indexOf(mdl[f].type)>=0) {
                            this[f] = DocsType.makeType(mdl[f], this);
                        } else {
                            log.warn(`${this.lib} #${mdl.id}: unexpected TYPE '${mdl[f].type}' missing in class '${this.kindString}'`);
                            DocsNode.errCount++;
                        }
                        break;
                    case 'comment': 
                        this[f] = new DocsComment(mdl[f], this); break;
                    case 'children': 
                        this[f] = mdl.children.map((c:json) => DocsNode.traverse(c, this.lib, mdl.fullPath)); break;
                    case 'signatures':
                        this[f] = mdl.signatures.map((c:json) => DocsNode.traverse(c, this.lib, mdl.fullPath)); break;
                    case 'indexSignature':
                        this[f] = mdl.indexSignature.map((c:json) => DocsNode.traverse(c, this.lib, mdl.fullPath)); break;
                    case 'setSignature':
                        this[f] = mdl.setSignature.map((c:json) => DocsNode.traverse(c, this.lib, mdl.fullPath)); break;
                    case 'getSignature':
                        this[f] = mdl.getSignature.map((c:json) => DocsNode.traverse(c, this.lib, mdl.fullPath)); break;
                    case 'parameters':
                        this[f] = mdl.parameters.map((c:json) => DocsNode.traverse(c, this.lib, mdl.fullPath)); break;
                    case 'typeParameter':
                        this[f] = mdl.typeParameter.map((c:json) => DocsNode.traverse(c, this.lib, mdl.fullPath)); break;
                    default: this[f] = mdl[f];
                }
            } else if (this.lib && this.kind && !this.kindString) {
                log.warn(`${this.lib}: no 'kindString' for ${log.inspect(this, {indent:'   ', colors:null})}`);
            } else if (isExpected(this[f]) && isNotIgnored(f)) {
                log.warn(`${this.lib}: '${this.kindString}' #${mdl.id}: field '${f}' should be optional`);
                DocsNode.errCount++;
            }
        });
        fields = Object.getOwnPropertyNames(mdl);
        fields.forEach(f => { // unexpected fields
            if (this[f]===undefined && isNotIgnored(f)) {
                log.warn(`${this.lib}: '${this.kindString}' #${this.id}: found extra field '${f}'='${log.inspect(mdl[f],{depth:2, indent:'   '})}'`);
                DocsNode.errCount++;
            }
        });
    }
    
    setFlags(mdlFlags:json) {
        const staticFlags:Flags = this.FLAGS;
        Object.keys(staticFlags).forEach(f => { 
            if (mdlFlags[f]!==undefined) { this.flags[f] = mdlFlags[f]; }
            else if (staticFlags[f]===true) {   // an expected flags
                log.warn(`'${this.kindString}' #${this.id}: flag '${f}' should be optional`);
                DocsNode.errCount++;
            }
        });
        const flags = Object.getOwnPropertyNames(mdlFlags);
        flags.forEach(f => { // unexpected flags
            if (staticFlags[f]===undefined) {
                log.warn(`'${this.kindString}' #${this.id}: found extra flag '${f}'='${log.inspect(mdlFlags[f],{depth:1})}'`);
                DocsNode.errCount++;
            }
        });
    }
}

class DocsSourced extends DocsBaseNode {
    init() {
        super.init();
        this.sources = [];
    }
}

class DocsStructured extends DocsSourced {
    init() {
        super.init();
        this.children = optional; 
        this.groups = optional; 
        this.kindString = optional;
        this.sources = [];      // required
    }
}

class DocsWithDefault extends DocsSourced {
    init() {
        super.init();
        this.defaultValue = optional;
    }
}


class DocsRoot extends DocsBaseNode {
    init() {
        super.init();
        this.children = optional;  
        this.groups = optional; 
        this.kindString = optional; // optional for root
        this.sources = optional;    // optional for root
    }
}

//-------------- Actual Modules
class DocsExternalModule extends DocsStructured {
    init() {
        super.init();
        this.FLAGS = flagsExported({});
        this.originalName = '';
        this.kindPrint = 'module';
    }
}

class DocsModule extends DocsStructured {
    init() {
        super.init();
        this.FLAGS = flagsExported({            
            isExternal: allowed
        });
        this.kindPrint = 'namespace';
    }
}

class DocsEnumeration extends DocsStructured {
    init() {
        super.init();
        this.FLAGS = flagsExported({});
        this.kindPrint = 'enumeration';
    }
}

class DocsUnknown extends DocsBaseNode {
    init() {
        this.kindPrint = 'unknown';
    }
}

class DocsEnumerationMember extends DocsWithDefault {
    init() {
        super.init();
        this.FLAGS = flagsExported({});
        this.kindPrint = 'enumeration member';
        this.defaultValue = optional;
    }
}

class DocsVariable extends DocsWithDefault {
    init() {
        super.init();
        this.FLAGS = flagsConstLet({ isOptional:allowed });
        this.TYPE = ['array', 'reflection', 'intrinsic', 'reference', 'stringLiteral', 'unknown', 'union', 'tuple'];
        this.kindPrint = '';
    }
}

class DocsFunction extends DocsSourced implements DocsParamaterized {
    init() {
        super.init();
        this.FLAGS = flagsConstLet({});
        this.signatures = [];
        this.parameters = optional;
        this.kindPrint = 'function';
    }
}

class DocsClass extends DocsStructured {
    init() {
        super.init();
        this.FLAGS = flagsClass({            
            isExternal: allowed
        });
        this.extendedTypes = optional;
        this.extendedBy = optional;
        this.implementedTypes = optional;
        this.typeParameter = optional;
        this.kindPrint = 'class';
    }
}

class DocsInterface extends DocsStructured {
    init() {
        super.init();
        this.FLAGS = flagsExported({            
            isExternal: allowed
        });
        this.extendedTypes = optional;
        this.extendedBy = optional;
        this.implementedTypes = optional;
        this.indexSignature = optional;
        this.signatures = optional;
        this.implementedBy = optional;
        this.kindPrint = 'interface';
        this.typeParameter = optional;
    }
    
}

class DocsConstructor extends DocsSourced implements DocsParamaterized {
    init() {
        super.init();
        this.FLAGS = flagsPublic(flagsExported({}));
        this.signatures = optional;
        this.overwrites = optional;
        this.inheritedFrom = optional;
        this.parameters = optional;
        this.implementationOf = optional;
        this.kindPrint = '';
    }
}

class DocsProperty extends DocsWithDefault {
    init() {
        super.init();
        this.TYPE = ['intrinsic', 'array', 'reflection', 'stringLiteral', 'reference', 'tuple', 'union', 'typeParameter',];
        this.FLAGS = flagsPublic(flagsExported({
            isStatic:               allowed,
            isOptional:             allowed,
            isConstructorProperty:  allowed,
            isExternal:             allowed,
            isReadonly:             allowed
        }));
        this.overwrites = optional;
        this.inheritedFrom = optional;
        this.implementationOf = optional;
        this.extendedBy = optional;
        this.kindPrint = '';
    }
}

class DocsMethod extends DocsSourced implements DocsParamaterized {
    init() {
        super.init();
        this.FLAGS = flagsPublic(flagsExported({
            isStatic:   allowed,
            isAbstract: allowed,
            isOptional: allowed,
            isExternal: allowed
        }));
        this.signatures = [];
        this.overwrites = optional;
        this.inheritedFrom = optional;
        this.implementationOf = optional;
        this.parameters = optional;
        this.kindPrint = '';
    }
}

class DocsCallSignature extends DocsBaseNode implements DocsParamaterized {
    init() {
        super.init();
        this.TYPE = ['reference', 'union', 'intrinsic', 'array', 'reflection', 'tuple', 'typeParameter', 'predicate'];
        this.FLAGS = flagsPublic(flagsExported({}));
        this.sources = optional;
        this.parameters = optional;
        this.inheritedFrom = optional;
        this.implementationOf = optional;
        this.overwrites = optional;
        this.typeParameter = optional;
        this.kindPrint = '';
    }
    // public getName() { return this.name === '__call'? '()' : this.name; }
}

export class DocsIndexSignature extends DocsBaseNode {
    init() {
        super.init();
        this.TYPE = ['array', 'reference', 'union', 'intrinsic', 'reflection'];
        this.FLAGS = { isExported:allowed };
        this.sources = optional;
        this.parameters = [];
        this.kindPrint = 'index signature';
    }
}

class DocsConstructorSignature extends DocsBaseNode implements DocsParamaterized {
    init() {
        super.init();
        this.TYPE = ['reference'];
        this.FLAGS = { isExported:allowed };
        this.sources = optional;
        this.parameters = optional;
        this.overwrites = optional;
        this.inheritedFrom = optional;
        this.kindPrint = '';
        // this.kindPrint = 'constructor signature';
   }
}

export class DocsParameter extends DocsBaseNode {
    init() {
        super.init();
        this.FLAGS = { isOptional:allowed, isRest:allowed, isExported:allowed };
        this.TYPE = ['reference', 'intrinsic', 'union', 'array', 'reflection', 'typeParameter', 'query'];
        this.sources = optional;   //  sources optional
        this.defaultValue = optional;
        this.kindPrint = 'parameter';
        this.originalName = optional;
    }
}

class DocsTypeLiteral extends DocsStructured {
    init() {
        super.init();
        this.FLAGS = { isExported:allowed };
        this.signatures = optional;
        this.indexSignature = optional;
        this.sources = optional;   //  sources optional
        this.kindPrint = 'type literal';
    }
}

class DocsTypeParameter extends DocsBaseNode {
    init() {
        super.init();
        this.TYPE = ['typeOperator', 'reference'];
        this.FLAGS = { isExported:allowed };
        this.sources = optional;   
        this.kindPrint = 'types parameter';
    }
}

class DocsAccessors extends DocsSourced implements DocsParamaterized {
    init() {
        super.init();
        this.FLAGS = flagsPublic(flagsExported({
            isStatic:   allowed
        }));
        this.getSignature = optional;
        this.setSignature = optional;
        this.overwrites = optional;
        this.inheritedFrom = optional;
        this.implementationOf = optional;
        this.parameters = optional;
        this.kindPrint = 'accessor';
    }
    public getSignatures() { return this.getSignature || this.setSignature || this.signatures; }
    // public getParameters(params:(s:DocsParamaterized)=>Vnode[]):Vnode { 
    //     // const sigs = this.getSignatures();
    //     // return !sigs? [] : sigs.map((sig:any) => m('span', '/Accessor type/' /* sig.type() */));    
    //     return this.parameters? params(this) : [];    
    // }
}

export class DocsGetSignature extends DocsBaseNode {
    init() {
        this.TYPE = ['intrinsic', 'reference', 'union', 'array', 'reflection', 'stringLiteral'];
        this.FLAGS = { isExported:allowed };
        this.kindPrint = 'get';
        this.sources = unsupported;   
        this.overwrites = optional;
        this.inheritedFrom = optional;
    }
}

export class DocsSetSignature extends DocsBaseNode {
    init() {
        this.kindPrint = 'set';
        this.sources = unsupported; 
        this.parameters = [];  
        this.TYPE = ['intrinsic', 'stringLiteral'];
        this.FLAGS = { isExported:allowed };
        this.inheritedFrom = optional;
    }
}

class DocsObjectLiteral extends DocsStructured implements DocsParamaterized {
    init() {
        super.init();
        this.TYPE = ['intrinsic'];
        this.FLAGS = flagsPublic(flagsExported({
            isStatic:   allowed,
            isConst:    allowed
        }));
        this.parameters = optional;
        this.inheritedFrom = optional;
        this.overwrites = optional;
    }
}

class DocsTypeAlias extends DocsSourced {
    init() {
        super.init();
        this.FLAGS = flagsExported({});
        this.TYPE = ['intrinsic', 'union', 'array', 'tuple', 'reflection', 'reference'];
        this.kindPrint = 'type';
        this.typeParameter = optional;
    }
}

class DocsReference extends DocsBaseNode {
    init() {
        super.init();
        this.FLAGS = { isExported:allowed };
        this.TYPE = [];
        this.kindPrint = 'reference';
        // optionals:
        this.sources = unsupported;
        // required:
        this.target = 0;
    }
}

export const groupKindTitle = {
    0:       DocsRoot,
    1:       DocsExternalModule,
    2:       DocsModule,
    4:       DocsEnumeration,
    8:       DocsUnknown,
    16:      DocsEnumerationMember,
    32:      DocsVariable,
    64:      DocsFunction,
    128:     DocsClass,
    256:     DocsInterface,
    512:     DocsConstructor,
    1024:    DocsProperty,
    2048:    DocsMethod,
    4096:    DocsCallSignature,
    8192:    DocsIndexSignature,
    16384:   DocsConstructorSignature,
    32768:   DocsParameter,
    65536:   DocsTypeLiteral,
    131072:  DocsTypeParameter,
    262144:  DocsAccessors,
    524288:  DocsGetSignature,
    1048576: DocsSetSignature,
    2097152: DocsObjectLiteral,
    4194304: DocsTypeAlias,

    16777216:DocsReference
};
