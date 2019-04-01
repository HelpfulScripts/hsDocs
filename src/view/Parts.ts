import { m, Vnode} from 'hslayout';
import { tooltip } from './Tooltip';
import { DocSets } from '../DocSets'; 
import { log as _log }  from 'hsutil';  const log = _log('Parts');

const SourceBase = 'data/src/'; 


// TODO: sort flags in array to garantee sequence of printing
export function flags(mdl:any, ignore:string[]=[]) {
    const ignoreExportInKind = ['Method', 'Property'];
    const knownFlags = {
        isExported:             'export',
        isExternal:             'external', // 
        isPublic:               'public',
        isPrivate:              'private',
        isProtected:            'protected',
        isConstructorProperty:  'constructorProperty',
        isAbstract:             'abstract',
        isConst:                'const',
        isLet:                  'let',
        isVar:                  'var',
        isStatic:               'static',
        isOptional:             'optional'
    };
    return m('span.hs-item-flags', !mdl.flags? [] : 
        Object.keys(mdl.flags).map((f:string) => {
            let ign = false;
            let flag = knownFlags[f];
            if (flag === undefined) { flag = f; }
            else { ign = (ignore.indexOf(flag) >= 0); }
            if (flag === 'export' && ignoreExportInKind.indexOf(mdl.kindString)>=0) { ign = true; }
            return m(`span.hs-item-${ign?'ignore':(flag===f?'unknown':flag)}-flag`, ign? undefined : flag);
        })
    );
}

export function kindString(mdl:any) {
    return m('span.hs-item-kind', mdl.kindString);
}

export function itemName(mdl:any, sub:any) {
    return m('span.hs-item-name', !mdl.fullPath? sub.name : libLink('a', mdl.lib, mdl.fullPath, sub.name));
}


export function itemTooltip(mdl:any) {
    return m('span.hs-item-name', tooltip(mdl.name, 'class name and then some', 'bottom'));
}

export function extensionOf(mdl:any) {
    return m('span.hs-item-extensions', !mdl.extendedTypes? undefined : [
        m('span.hs-item-extends', 'extends'),
        m('span', mdl.extendedTypes.map((t:any, i:number) =>
            m('span.hs-item-extension', [
                libLink('a', mdl.lib, DocSets.get(mdl.lib, t.id).fullPath, t.name),
                mdl.extendedTypes.map.length>(i+1)? ', ': ''
            ])
        )),
    ]);
}

export function inheritedFrom(mdl:any) {
    if (mdl.inheritedFrom) {
        let parent = DocSets.get(mdl.lib, mdl.inheritedFrom.id);
        parent = DocSets.get(mdl.lib, parent.fullPath.substring(0, parent.fullPath.lastIndexOf('.')));
        return m('span.hs-item-inherited-from', [
            m('span', 'inherited from '),
            libLink('a', parent.lib, parent.fullPath, parent.name)
        ]);
    } else {
        return m('span.hs-item-inherited-from', undefined);
    }
}

export function sourceLink(mdl:any) {
    const source = mdl.sources? mdl.sources[0] : undefined;
    if (source) {
        let file = (source.fileName || '').replace('.ts', '.html');
        const index = file.indexOf(mdl.lib);
        if (index>0) {
            file = file.substr(index); // only consider links within the docSet (everything after the lib name)
        }
        return m('span.hs-item-member-source',  
            m('a', { href:`${SourceBase}${mdl.lib}/${file}#${Math.max(0,source.line-5)}`, target:"_blank"}, '[source]')
        );
    } else {
        return m('span.hs-item-member-source', '');
    }
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
export function libLink(css:string, lib:string, id:string, name:string) {
    return m(css, { href:`/api/${lib}/${id}`, oncreate: m.route.link, onupdate: m.route.link }, name);
};

/**
 * creates a function or method signature
 */
export function signature(s:any, mdl:any): Vnode {
    const comma = (i:number) => (i>0)? ', ': '';
    function optional(flags: any) {
        return (flags && flags.isOptional)? '.hs-item-optional' : '';
    }

    let sig = [];
    if (s) {
        if (s.parameters) {
            sig = s.parameters.map((p:any, i:number) => m('span', [
                comma(i),
                m('span.hs-item-sig-param', [
                    m(`span.hs-item-name${optional(p.flags)}`, p.name),
                    type(p, mdl.lib)
                ])
            ]));
        }
        switch (mdl.kindString) {
            case 'Method':
            case 'Function': 
            case 'Constructor': 
                sig.unshift(m('span.hs-item-name', '('));
                sig.push(m('span.hs-item-name', ')'));
                break;
            default: log.warn(`unexpected kindString ${mdl.kindString}`);
        }
    }
    return m('span.hs-item-signature', sig);
}

/**
 * adds a default value, if defined
 */
export function defaultVal(s:any, lib:string): Vnode {
    if (s && s.defaultValue) {
        let val = ` = ${s.defaultValue}`.replace(/{/gi, '{ ').replace(/}/gi, ' }');
        return m('span.hs-item-default', val);
    } else {
        return;
    }        
}

export function type(t:any, lib:string) {
    function _type(tt:any):any {
        switch (tt.type) {
            case undefined:         return '';
            case 'array':           return m('span.hs-item-type-array', ['Array<', _type(tt.elementType), '>']);
                                    
            case 'tuple':           return m('span.hs-item-type-tuple', [
                                        '[ ',
                                        ...tt.elements.map((e:any, i:number) => [i>0?', ':undefined, _type(e)]),
                                        ' ]'
                                    ]);
            case 'intrinsic':
            case 'instrinct':       return m('span.hs-item-type-instrinct', tt.id? libLink('span', lib, tt.fullPath, tt.name) : tt.name); 
            case 'stringLiteral':   return m('span.hs-item-type-string-literal', tt.type); 
            case 'union':           return m('span.hs-item-type-union', [...tt.types.map((e:any, i:number) => [i>0?' | ':undefined, _type(e)])]);
            case 'reference':       let refRes = tt.name;
                                    if (tt.id) {
                                        const typeRef = DocSets.get(lib, tt.id);
                                        if (typeRef.typeArguments) { refRes = typeRef.name+'<'+ typeRef.typeArguments.map(_type).join(', ') + '>'; }
                                        else if (typeRef.id)       { refRes = libLink('a', lib, typeRef.fullPath, typeRef.name); }
                                        else                       { refRes = typeRef.name; }
                                    }
                                    return m('span.hs-item-type-reference', refRes);
            case 'reflection':      let rflRes;
                                    if (tt.declaration) {
                                        rflRes = !tt.declaration.children? tt.declaration.kindString :
                                            m('span.hs-item-reflection', [
                                                '{ ',
                                                ...tt.declaration.children.map((c:any, i:number) => 
                                                    [i>0?', ':undefined, c.name, ': ', _type(c.type)]
                                                ),
                                                ' }'
                                            ]);
                                    } else {
                                        rflRes = 'UNKNOWN';
                                    }
                                    return m('span.hs-item-type-reflection', rflRes);
            default: log.warn('unknown type '+ tt.type);
                     log.warn(log.inspect(t,3));
                     return t.type;
        }
    }

    try {
       return m('span', !t.type? '': [
           m('span.hs-item-name',':'), 
           m('span.hs-item-sig-type', _type(t.type)),
           defaultVal(t, lib)
        ]);
    } catch(e) { log.error(e); log.error(e.trace); }
}

export function makeID(section:string, mdl:any) {
    let result = section? section+'_' : '';
    result = (result + (mdl.name || '')).toLowerCase();
    return (result!=='')? result : undefined;
}