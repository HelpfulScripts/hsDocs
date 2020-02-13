/**
 * ### Nodes
 * Definition of DocsNode classes.
 */

/** */
import { Vnode}                 from 'hslayout';
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


export class DocsNode {
    static errCount = 0;

    private static makeNode(mdl:json):DocsNode {
        const node = groupKindTitle[mdl.kind];
        if (!node) { log.warn(`unknown kind ${mdl.kind}`); }
        else { return new node(mdl); }
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
    // - null:      optional
    // - els:       required
    public    children:DocsNode[];
    public    comment:DocsComment = null;
    public    defaultValue:string;
    public    extendedBy: DocsReferenceIdType[];
    public    extendedTypes: DocsReferenceIdType[];
    public    FLAGS = flagsNone;
    public    flags: Flags = {};
    public    fullPath:string = null;
    public    getSignature: DocsGetSignature[];
    public    groups:DocsGroup[];
    public    id:number   = 0;  // defined = required; null = optional
    public    indexSignature: DocsIndexSignature[];
    public    implementedTypes: DocsNamedType[];
    public    implementationOf: DocsReferenceIdType;
    public    implementedBy: DocsReferenceIdType[];
    public    inheritedFrom: DocsReferenceIdType;
    public    kind:number = 0;
    public    kindString: string = '';
    public    kindPrint: string;
    public    lib:string = null;
    protected name:string = '';
    public    originalName:string;
    public    overwrites: DocsReferenceIdType;
    public    parameters:DocsParameter[];
    public    setSignature: DocsSetSignature[];
    protected signatures: DocsSignature[];
    public    sources: DocsSource[] = [];
    public    TYPE = <string[]>[];
    public    type: DocsType = null;
    public    typeParameter:DocsTypeParameter[];

    constructor(mdl:json) {
        this.id = mdl.id;
        this.kindString = mdl.kindString || 'root';
        DocSets.addNode(mdl, this);
    }

    public getName() { return this.name; }
    public getSignatures() { return this.signatures; }
    public setSignatures(signatures: DocsSignature[]) { this.signatures = signatures; }
    public getParameters(params:(s:DocsParamaterized)=>Vnode[]):Vnode { 
        return this.getParameters? params(this) : undefined;    
    }

    public title():Vnode { return title(this); }
    public commentLong():Vnode { return commentLong(this); }
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
        // this.mdl = mdl;
    }

    init() {
        this.FLAGS = flagsNone;
    }

    set(mdl:json, fields = Object.getOwnPropertyNames(this)) {
        fields.filter(f=>this[f]!==undefined).forEach(f => { // expected fields
            if (mdl[f]!==undefined) { 
                switch(f) {
                    case 'type': 
                        if (this.TYPE && this.TYPE.indexOf(mdl[f].type)>=0) {
                            this[f] = DocsType.makeType(mdl[f], this);
                        } else {
                            log.warn(`${this.lib} #${mdl.id}: unexpected type '${mdl[f].type}' missing in class '${this.kindString}'`);
                            DocsNode.errCount++;
                        }
                        break;
                    case 'comment': 
                        this[f] = new DocsComment(mdl[f]); break;
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
            } else if (isExpected(this[f]) && isNotIgnored(f)) {
                log.warn(`${this.lib}: '${this.kindString}' #${mdl.id}: field '${f}' should be optional`);
                DocsNode.errCount++;
            }
        });
        fields = Object.getOwnPropertyNames(mdl);
        fields.forEach(f => { // unexpected fields
            if (this[f]===undefined && isNotIgnored(f)) {
                log.warn(`${this.lib}: '${this.kindString}' #${this.id}: found extra field '${f}'='${log.inspect(mdl[f],2, '   ', null)}'`);
                DocsNode.errCount++;
            }
        });
    }
    
    setFlags(mdlFlags:json) {
        const staticFlags:Flags = this.FLAGS;
        Object.keys(staticFlags).forEach(f => { // expected flags
            if (mdlFlags[f]!==undefined) { this.flags[f] = mdlFlags[f]; }
            else if (staticFlags[f]===true) {
                log.warn(`'${this.kindString}' #${this.id}: flag '${f}' should be optional`);
                DocsNode.errCount++;
            }
        });
        const flags = Object.getOwnPropertyNames(mdlFlags);
        flags.forEach(f => { // unexpected flags
            if (staticFlags[f]===undefined) {
                log.warn(`'${this.kindString}' #${this.id}: found extra flag '${f}'='${log.inspect(mdlFlags[f],1)}'`);
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
        this.children = null;   // optional
        this.groups = null;     // optional
        this.kindString = null; // optional
        this.sources = [];      // required
    }
}

class DocsWithDefault extends DocsSourced {
    init() {
        super.init();
        this.defaultValue = null;
    }
}


class DocsRoot extends DocsBaseNode {
    init() {
        super.init();
        this.children = null;   // optional
        this.groups = [];       // required
        this.kindString = null; // optional for root
        this.sources = null;    // optional for root
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
        this.FLAGS = flagsExported({});
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
        this.defaultValue = null;
    }
}

class DocsVariable extends DocsWithDefault {
    init() {
        super.init();
        this.FLAGS = flagsConstLet({ isOptional:false });
        this.TYPE = ['array', 'reflection', 'intrinsic', 'reference', 'stringLiteral', 'unknown', 'union', 'tuple'];
        this.kindPrint = '';
    }
}

class DocsFunction extends DocsSourced implements DocsParamaterized {
    init() {
        super.init();
        this.FLAGS = flagsConstLet({});
        this.signatures = [];
        this.parameters = null;
        this.kindPrint = 'function';
    }
}

class DocsClass extends DocsStructured {
    init() {
        super.init();
        this.FLAGS = flagsClass({});
        this.extendedTypes = null;
        this.extendedBy = null;
        this.implementedTypes = null;
        this.kindPrint = 'class';
    }
}

class DocsInterface extends DocsStructured {
    init() {
        super.init();
        this.FLAGS = flagsExported({});
        this.extendedTypes = null;
        this.extendedBy = null;
        this.implementedTypes = null;
        this.indexSignature = null;
        this.signatures = null;
        this.implementedBy = null;
        this.kindPrint = 'interface';
    }
    
}

class DocsConstructor extends DocsSourced implements DocsParamaterized {
    init() {
        super.init();
        this.FLAGS = flagsExported({});
        this.signatures = null;
        this.overwrites = null;
        this.inheritedFrom = null;
        this.parameters = null;
        this.implementationOf = null;
        this.kindPrint = '';
    }
}

class DocsProperty extends DocsWithDefault {
    init() {
        super.init();
        this.TYPE = ['intrinsic', 'array', 'reflection', 'stringLiteral', 'reference', 'tuple', 'union'];
        this.FLAGS = flagsPublic(flagsExported({
            isStatic:               false,
            isOptional:             false,
            isConstructorProperty:  false
        }));
        this.overwrites = null;
        this.inheritedFrom = null;
        this.implementationOf = null;
        this.kindPrint = '';
    }
}

class DocsMethod extends DocsSourced implements DocsParamaterized {
    init() {
        super.init();
        this.FLAGS = flagsPublic(flagsExported({
            isStatic:   false,
            isAbstract: false,
            isOptional: false
        }));
        this.signatures = [];
        this.overwrites = null;
        this.inheritedFrom = null;
        this.implementationOf = null;
        this.parameters = null;
        this.kindPrint = '';
    }
}

class DocsCallSignature extends DocsBaseNode implements DocsParamaterized {
    init() {
        super.init();
        this.TYPE = ['reference', 'union', 'intrinsic', 'array', 'reflection', 'tuple'];
        this.sources = null;
        this.parameters = null;
        this.inheritedFrom = null;
        this.implementationOf = null;
        this.overwrites = null;
        this.typeParameter = null;
        this.kindPrint = '';
    }
    public getName() { return this.name === '__call'? '' : this.name; }
}

export class DocsIndexSignature extends DocsBaseNode {
    init() {
        super.init();
        this.TYPE = ['array', 'reference', 'union', 'intrinsic', 'reflection'];
        this.sources = null;
        this.parameters = [];
        this.kindPrint = 'index signature';
    }
}

class DocsConstructorSignature extends DocsBaseNode implements DocsParamaterized {
    init() {
        super.init();
        this.TYPE = ['reference'];
        this.sources = null;
        this.parameters = null;
        this.overwrites = null;
        this.inheritedFrom = null;
        this.kindPrint = '';
        // this.kindPrint = 'constructor signature';
   }
}

export class DocsParameter extends DocsBaseNode {
    init() {
        super.init();
        this.FLAGS = { isOptional:false, isRest:false };
        this.TYPE = ['reference', 'intrinsic', 'union', 'array', 'reflection', 'typeParameter'];
        this.sources = null;   //  sources optional
        this.defaultValue = null;
        this.kindPrint = 'parameter';
    }
}

class DocsTypeLiteral extends DocsStructured {
    init() {
        super.init();
        this.signatures = null;
        this.indexSignature = null;
        this.sources = null;   //  sources optional
        this.kindPrint = 'type literal';
    }
}

class DocsTypeParameter extends DocsBaseNode {
    init() {
        super.init();
        this.TYPE = ['typeOperator', 'reference'];
        this.sources = null;   
        this.kindPrint = 'types parameter';
    }
}

class DocsAccessors extends DocsSourced implements DocsParamaterized {
    init() {
        super.init();
        this.FLAGS = flagsPublic(flagsExported({
            isStatic:   false
        }));
        this.getSignature = null;
        this.setSignature = null;
        this.overwrites = null;
        this.inheritedFrom = null;
        this.implementationOf = null;
        this.parameters = null;
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
        this.kindPrint = 'get';
        this.sources = undefined;   
        this.TYPE = ['intrinsic', 'reference', 'union', 'array', 'reflection', 'stringLiteral'];
        this.overwrites = null;
        this.inheritedFrom = null;
    }
}

export class DocsSetSignature extends DocsBaseNode {
    init() {
        this.kindPrint = 'set';
        this.sources = undefined; 
        this.parameters = [];  
        this.TYPE = ['intrinsic', 'stringLiteral'];
    }
}

class DocsObjectLiteral extends DocsStructured implements DocsParamaterized {
    init() {
        super.init();
        this.TYPE = ['intrinsic'];
        this.FLAGS = flagsPublic(flagsExported({
            isStatic:   false,
            isConst:    false
        }));
        this.parameters = null;
        this.inheritedFrom = null;
    }
}

class DocsTypeAlias extends DocsSourced {
    init() {
        super.init();
        this.FLAGS = flagsExported({});
        this.TYPE = ['intrinsic', 'union', 'array', 'tuple', 'reflection', 'reference'];
        this.kindPrint = 'type';
    }
}

export const groupKindTitle = {
    0:      DocsRoot,
    1:      DocsExternalModule,
    2:      DocsModule,
    4:      DocsEnumeration,
    8:      DocsUnknown,
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
