/**
 * 
 */

 /** */
import { m, Vnode}              from 'hslayout';
import { Log }                  from 'hsutil'; const log = new Log('NodesDisplay');
import { DocsNode, DocsSignature }             from './Nodes';
import { DocsParameter }        from './Nodes';
import { DocSets }              from './DocSets';
import { DocsParamaterized }    from './Nodes';
import { flagsDisplay }         from './Flags';
import { DocsReferenceIdType }  from './Types';
import { DocsNamedType }        from './Types';
import { json }                 from './DocSets';
import { example }              from './view/MainExample';
import { markDown }             from './markdown';


const SourceBase = 'data/src/'; 

interface Tag {
    tag: string;
    text: 'string';
    param: string;
}


/**
 * creates a library link on the specified `name`. 
 * The link points to `/api/<lib>/<id>`
 * @param css the css tag selector to use
 * @param cls the css class selector to use
 * @param lib the lib string to point to
 * @param id the id number to point to
 * @param name the name on which to formt he link
 */
export function libLinkByPath(lib:string, path:string, name:string, css=''):Vnode {
    return m(`a${css}`, { href:`#!/api/${lib}/${path}`, oncreate: m.route.link, onupdate: m.route.link }, name);
}

function libLinkByID(lib:string, id:string|number, name:string, css=''):Vnode {
// log.info(`libLinkByID ${lib} ${id} ${name}`);
    const path = (DocSets.getNode(id, lib)||{fullPath:''}).fullPath||'';
    return libLinkByPath(lib, path, name, css);
}

export class DocsComment {
    shortText?: string;
    returns?: string;
    text?: string;
    tags?: Tag[];

    constructor(comment:json, node:DocsNode) {
        this.shortText = comment.shortText;
        this.returns = comment.returns;
        this.text = comment.text;
        this.tags = comment.tags || [];
    }

    /**
     * Report the item's description. This can come in different forms that are all handled here:
     * - comment.shortText: <description>
     * - comment.text: <description>
     * - comment.tags[{tag:'description}, text:<description>]
     * Any resulting comment will be translated from markdown to html and returned as a `Vnode`.
     * @param short boolean; if true, only the first paragraph of the description will be returned
     */
    getDescription(short: boolean) {
        let text = (this.shortText || '');
        if (this.text) { text += '\n'+ (this.text || ''); }
        this.tags.map((tag:Tag) => {
            switch (tag.tag) {
                case 'shortText':
                case 'description': text = `${text}\n${tag.text}`; break;
                case 'param': text = `${text}\n- **${tag.param}**: ${tag.text}`; break;
            }
        });
        // search for pattern <example...<file...</example>
        text = short? '' : text.replace(/<example[^<]*?(<file[\S\s]*?)<\/example>/gi, example);
        return m('span.hsdocs_comment_desc', prettifyCode(text, short));
    }
    
    /**
     * creates the `returns` message for a function or method.
     */
    getParams(params?:DocsParameter[]) {
        return !params? undefined: m('.hsdocs_comment_params', [
            m('.hsdocs_params_title', 'parameters:'),
            ...params.map(p => 
                m('.hsdocs_comment_param',[
                    m('span.hsdocs_param_name', [p.getName(), ': ']), 
                    m('span.hsdocs_param_comment', commentLong(p))
                ]))
            ]);
    }
    
    /**
     * creates the `returns` message for a function or method.
     */
    getReturns() {
        let text = this.returns;
        return !text? undefined: m('span.hsdocs_comment_return', [            
            m('span.hsdocs_comment_return_tag', 'returns:'), 
            m('span.hsdocs_comment_return_text', text)
        ]);
    }

    getCommentRemainder() {
        const tags = Object.getOwnPropertyNames(this);
        return tags.length===0? undefined : m('', tags.map((tag:string) => {
            switch(tag) {
                case 'tags':        // already handled
                case 'shortText':   // already handled
                case 'text':        // already handled
                case 'description': // already handled
                case 'returns':     // already handled
                        return undefined;
                default: return m('.hsdocs_comment_remainder', [
                    m('span.hsdocs_comment_return_tag', tag), 
                    m('span.hsdocs_comment_return_text', this[tag])
                ]);
            }
        }));
    }
}

export function title(node:DocsNode, parent?:DocsNode):Vnode {
    if (node.getSignatures()) {
        return node.getSignatures().map((s:DocsNode) => 
            m('.hsdocs_child.hsdocs_signature', [title(s, node), m('.hsdocs_sig_comment', s.commentLong())])
        );
    }
    return m('.hsdocs_title', {id: 'title_' + node.getName().toLowerCase()}, titleElements(node, parent)); 
}

/**
 * creates a signature row.
 * @param node the node for which to generate the signature row.
 * @param parent optional parent node for use in `mItemName`, used 
 * when the node has a `signature` array. 
 */
export function titleArr(node:DocsNode, parent?:DocsNode):Vnode {
    return m('span', titleElements(node, parent)); 
}

function titleElements(node:DocsNode, parent?:DocsNode) {
    try { return  [ 
        mFlags(parent || node),
        mKindString(parent || node),
        mItemName(parent || node),
        mSignature(node),
        m('span.hsdocs_title_colon',': '), 
        mType(node),
        mExtensionOf(node),
        mImplementationOf(node),
        mInheritedFrom(node),
        mSourceLink(node),
        mExtendedBy(node),
        mImplementedBy(node)
        ];
    }
    catch(e) { 
        log.error(e.message); 
        log.error(e.stack); 
        log.error(`creating title #${node.id} for ${node.kindString}`); 
        return [m('span.hsdocs_error', e.message)];
    }
}

export function inlineTitle(node:DocsNode):Vnode {
    let desc:Vnode = '';
    try { desc = [ 
        mFlags(node),
        mKindString(node),
        mSignature(node),
        m('span.hsdocs_title_arrow',' => '), 
        mType(node)
        ];
    }
    catch(e) { 
        log.error(e.message); 
        log.error(e.stack); 
        log.error(`creating title #${node.id} for ${node.kindString}`); 
    }
    return m('span.hsdocs_title_inline', desc); 
}

function mFlags(node:DocsNode):Vnode {
    return m('span.hsdocs_flags', flagsDisplay(node));
}

function mKindString(node:DocsNode):Vnode {
    const kind = node.kindPrint;
    return kind===''? '' : m('span.hsdocs_kind', node.getSignature? 'get ' : (node.setSignature? 'set ' : kind));
}

function mItemName(node:DocsNode):Vnode {
    return m('span.hsdocs_itemname', !node.fullPath? node.getName() : libLinkByPath(node.lib, node.fullPath, node.getName()));
}

function mSignature(node:DocsNode):Vnode {
    const optional = (flags:any) => (flags && flags.isOptional)? '.hsdocs_flag_optional' : '';
    const params = (s:DocsParamaterized):Vnode[] => 
        !s.parameters? undefined : s.parameters.map((p:DocsParameter, i:number) => { 
            const name = p.getName() === '__namedParameters'? '' : p.getName();
            return m('span', [
                m('span.hsdocs_colon', i>0?', ' : ''),
                m('span.hsdocs_signature_param', [
                    m(`span.hsdocs_itemname${optional(p.flags)}`, name),
                    m('span.hsdocs_colon', name.length>0?':' : ''),     // possibly unnamed parameter
                    mType(p)
                ])
            ]);
        });
    const sigText = (s:DocsParamaterized) => {
        let result:Vnode[];
        if (s.type && s.type.declaration) {
            const dec = s.type.declaration;
            const sig = dec.indexSignature || dec.getSignatures();
            if (sig) {
                result = sig.map((isig:DocsSignature) => params(isig));
            }
        }
        result = params(s);
        if (result) {
            result.unshift(m('span.hsdocs_itemname', ' ('));
            result.push(m('span.hsdocs_itemname', ')'));
        }
        if (s.typeParameter) {
            result.unshift(...s.typeParameter.map(t => m('span',` <${t.name}>`)));
        }
        return result;
    };

    const sigs:DocsParamaterized[] = node.getSignatures();
    return m('span.hsdocs_signatures', !sigs? sigText(node) : sigs.map(s =>  m('span.hsdocs_signature', sigText(s))));
}

function mType(node:DocsNode):Vnode {
    const defVal = !node.defaultValue? undefined : m('span.hsdocs_type_default', 
    ` = ${node.defaultValue.replace(/{/gi, '{ ').replace(/}/gi, ' }')}`);

    if (!node.type) { 
        if (node.getSignatures()) { 
            return m('span', node.getSignatures().map(s => mType(s)));
        } else {
            return defVal || m('span', ''); 
        }
    }
    if (!node.type.mType) {
        log.warn(``);
    }
    try {
        return m('span', [
            m('span.hsdocs_type', node.type.mType()),
            defVal
         ]);
     } catch(e) { 
         log.error(`mType: ${e}`); 
         log.error(e.trace); 
    }     
}

function mExtensionOf(node:DocsNode):Vnode {
    const types = node.extendedTypes;
    return m('span.hsdocs_extensionOf', !types? undefined : [
        m('span.hsdocs_extends', 'extends'),
        m('span', types.map((t:DocsReferenceIdType, i:number) =>
            m('span.hsdocs_extensionType', [(i>0)?', ' : '',
                t.id? libLinkByID(node.lib, t.id, t.name) : t.name,
            ])
        )),
    ]);
}

function mImplementationOf(node:DocsNode):Vnode {
    return !node.implementedTypes? undefined : m('span.hsdocs_implementationsOf', [
        m('span.hsdocs_implements', 'implements'),
        m('span', node.implementedTypes.map((t:DocsNamedType, i:number) =>
            m('span.hsdocs_implementationType', [ (i>0)?', ' : '', libLinkByID(node.lib, t.id, t.name)])
        )),
    ]);
}

function mInheritedFrom(node:DocsNode):Vnode {
    if (node.inheritedFrom) {
        if (node.inheritedFrom.id) {
            let parent = DocSets.getNode(node.inheritedFrom.id, node.lib);
            parent = DocSets.getNode(parent.fullPath.substring(0, parent.fullPath.lastIndexOf('.')), node.lib);
            return m('span.hsdocs_inheritedFrom', [
                m('span', 'inherited from '),
                libLinkByPath(parent.lib, parent.fullPath, parent.getName())
            ]);
        } else {
            return m('span.hsdocs_inheritedFrom', [
                m('span', 'inherited from '),
                m('span', node.inheritedFrom.name)
            ]);
        }
    } else {
        return m('span.hsdocs_inheritedFrom', undefined);
    }
}

function adjustCase(name:string) {
    if (name.indexOf('hs') === 0) {
        return 'hs' + name.slice(2).charAt(0).toUpperCase() + name.slice(3).toLowerCase();
    }
    return name;
}

function mSourceLink(node:DocsNode):Vnode {
    const source = node.sources? node.sources[0] : undefined;
    if (source) {
        let file = (source.fileName || '').replace('.ts', '.html');
        const index = file.indexOf(node.lib);
        if (index>0) {
            file = file.substr(index+node.lib.length+5); // only consider links within the docSet (everything after the lib name)
        }
        return m('span.hsdocs_source',  
            m('a', { href:`${SourceBase}${adjustCase(node.lib)}/${file}#${Math.max(0,source.line-5)}`, target:"_blank"}, '[source]')
        );
    } else {
        return m('span.hsdocs_source', '');
    }
}

function mExtendedBy(node:DocsNode):Vnode {
    return !node.extendedBy? undefined : m('div.hsdocs_extendedBy',[
        m('span.hsdocs_extended_by', 'extended by'),
        m('span', node.extendedBy.map((t:any, i:number) =>
            m('span.hsdocs_extendedby_type', [(i>0)?', ' : '', libLinkByID(node.lib, t.id, t.name)])
        )),
    ]);
}

function mImplementedBy(node:DocsNode):Vnode {
    return !node.implementedBy? undefined : m('div.hsdocs_implementedBy',[
        m('span.hsdocs_implemented_by', 'implemented by'),
        m('span', node.implementedBy.map((t:any, i:number) =>
            m('span.hsdocs_implementedby_type', [(i>0)?', ' : '', libLinkByID(node.lib, t.id, t.name)])
        )),
    ]);
}


/**
 * Main comment processing. The result appears directly below the title in the main panel.
 * Function parameters are not reported in short form here since it is assumed they will be listed 
 * individually below the main comment
 * @param node the module to scan for comments
 * @return a vnode representing the comment entries
 */
export function commentLong(node:DocsNode):Vnode[] {
    let content:any[] = [];
    if (node.comment) {
        content.push(node.comment.getDescription(false));
        content.push(node.comment.getParams(node.parameters));
        content.push(node.comment.getReturns());
        content.push(node.comment.getCommentRemainder());
    } else if (node.getSignatures()) {
        return node.getSignatures().map(s => commentLong(s));
    } else if (node.type) {
        return node.type.mType();
    }
    return content.length? content : undefined;    
}

interface TestFunction {
    (n:DocsNode): boolean;
}
interface Access {
    text: {true:string; false:string;}[];
    sort: TestFunction[];
    css: string[];
}
export function members(node:DocsNode):Vnode {
    const not        = (fn:TestFunction) => (n:DocsNode) => !fn(n);
    const isStatic   = (n:DocsNode) => n.flags.isStatic === true;
    const isExported = (n:DocsNode) => n.flags.isExported === true;
    const isPublic   = (n:DocsNode) => (n.flags.isPublic || (!n.flags.isPrivate && !n.flags.isProtected))? true : false;
    const filterChildren = (cs:[string,DocsNode[]][], filters:((n:DocsNode)=>boolean)[]):[string,DocsNode[]][] => {
        if (filters.length===0) { return cs; }
        const remaining = filters.slice(1);
        return [
            ...filterChildren(cs.map(m => [m[0], m[1].filter(filters[0])]), remaining),
            ...filterChildren(cs.map(m => [m[0], m[1].filter(not(filters[0]))]), remaining)
        ].filter(m => m[1].length);
    };

    /** flags to sort by */
    let sorts:((n:DocsNode)=>boolean)[];
    /** the  */
    const access:Access = (node.kindString==='External module')? {
            text: [{true:'Static', false: ''}, {true:'Exported', false:'Internal'}],
            css: ['.hsdocs_flag_static', '.hsdocs_flag_public'],
            sort:   [isStatic, isExported]
        } : {
            text: [{true:'Static', false: ''}, {true:'Public', false:'Protected or Private'}],
            sort: [isStatic, isPublic],
            css: ['.hsdocs_flag_static', '.hsdocs_flag_public'],
        };
    
    const grp = node.groups;
    if (grp) {
        const children:[string,DocsNode[]][] = grp.map(g => [g.title, g.children.map(id => DocSets.getNode(id, node.lib))]);
        // flags to sort by: 
        const _members = filterChildren(children, access.sort);
        return m('.hsdocs_members', _members.map(m => member(m[1], m[0], access)));

    } else if (node.parameters) {
        return m('.hsdocs_members', node.parameters);

    // } else if (node.getSignatures()) {
    //     return m('.hsdocs_members', node.getSignatures().map((s:DocsParamaterized) => s.parameters));
    
    } else if (node.type && node.type.declaration) {
        node.type.declaration.lib = node.lib;
        return m('.hsdocs_members', node.type.declaration.members());

    }
    return m('.hsdocs_members');
}

function member(nodes:DocsNode[], title:string, access:Access): Vnode {
    const directChildren    = ((node:DocsNode) => !node.inheritedFrom);
    const inheritedChildren = ((node:DocsNode) =>  node.inheritedFrom);
    const [css, flagText]   = nodes.length? getFlagText(nodes[0], access) : ['',''];

    const content:Vnode[] = nodes.filter(directChildren)
        .map((c:DocsNode) => m('.hsdocs_node', {id:c.fullPath}, itemChild(c)));
    const inherited:Vnode[] = nodes.filter(inheritedChildren)
        .map((c:DocsNode) => m('.hsdocs_node .hsdocs_node_inherited', {id:c.fullPath}, itemChild(c)));
    if (inherited.length>0) {
        inherited.unshift(m('div.hsdocs_member_title', `${flagText} Inherited ${title}`));
    }
    if (content.length>0) {
        content.unshift(m('div.hsdocs_member_title', `${flagText} ${title}`));
    }
    const members:DocsNode[] = content.concat(inherited);
    return !members.length? '' : m(`.hsdocs_member ${css}`, members);
}

function itemChild(node:DocsNode): Vnode[] {
    if (node.getSignatures()) {
        return node.getSignatures().map((s:DocsNode) => 
            m('.hsdocs_child.hsdocs_signature', [titleArr(s, node), m('.hsdocs_childsig_comment', s.commentLong())])
        );
    } else if (node.commentLong()) {
        return m('.hsdocs_child', [titleArr(node), m('.hsdocs_sig_comment',node.commentLong())]);
    } else if (node.inheritedFrom) {
        return m('.hsdocs_child', node.inheritedFrom.name);
    } else {
        return m('.hsdocs_child', titleArr(node));
    }
}

function getFlagText(n:DocsNode, access:Access) {
    const select:boolean[] = access.sort.map(f => f(n));
    const css = select.map((f,i) => f? access.css[i]:'').join(' ').trim();
    const flagText = select.map((f,i) => access.text[i][''+f]).join(' ').trim();
    return [css, flagText];
    // const css = `${f.isStatic?'.hsdocs_flag_static' : ''} ${select?'.hsdocs_flag_public' : ''}`;
    // return [css, `${access.text[''+select]} ${f.isStatic? 'Static' : ''}`];
}

/**
 * finds segments of `<code>...</code>` in `comment` and replaces them with a prettified version.
 * Currently the function performs operations in this sequence:
 * - add indentation for brackets {...}
 * - wrap the &lt;code&gt;...&lt;/code&gt; part within &lt;pre&gt;...&lt;/pre&gt; brackets
 * - apply markdown syntax
 * - wrap results in a trusted mithril node
 * @param comment the comment comment 
 * @param short only return the first paragraph
 */
function prettifyCode(comment:string, short:boolean):Vnode { 
    let result = comment;

    function braceIndenting(text:string): string {
        let indent = 0;
        const result = text
            .substring(6, text.length-7)    // remove <code> and </code>
            .trim()
            .replace(/(<)/g, '&lt;').replace(/(>)/g, '&gt;')
            .split('\n')
            .map((l:string) => {
                let oldIndent = indent;
                let k = l.trim();
                indent += Math.max(-1, Math.min(1, k.split('{').length - k.split('}').length)); 
                indent += Math.max(-1, Math.min(1, k.split('[').length - k.split(']').length)); 
                return '<span class="hs-code-indent"></span>'.repeat(((indent < oldIndent)?indent:oldIndent)) + k;
            })
            .join('\n')
            .trim();
        return '<pre><code>' + result + '</code></pre>';
    }

    result = result.replace(/<code>([\S\s]*?)<\/code>/gi, braceIndenting);
    return m.trust(markDown(result, short, m.route.get()));
}
