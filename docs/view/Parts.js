"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hslayout_1 = require("hslayout");
const Tooltip_1 = require("./Tooltip");
const DocSets_1 = require("../DocSets");
const SourceBase = 'src/';
function flags(mdl, ignore = []) {
    const ignoreExportInKind = ['Method', 'Property'];
    const knownFlags = {
        isExported: 'export',
        isExternal: 'external',
        isPublic: 'public',
        isPrivate: 'private',
        isProtected: 'protected',
        isConstructorProperty: 'constructorProperty',
        isAbstract: 'abstract',
        isConst: 'const',
        isStatic: 'static',
        isOptional: 'optional'
    };
    return hslayout_1.m('span.hs-item-flags', !mdl.flags ? [] :
        Object.keys(mdl.flags).map((f) => {
            let ign = false;
            let flag = knownFlags[f];
            if (flag === undefined) {
                flag = f;
            }
            else {
                ign = (ignore.indexOf(flag) >= 0);
            }
            if (flag === 'export' && ignoreExportInKind.indexOf(mdl.kindString) >= 0) {
                ign = true;
            }
            return hslayout_1.m(`span.hs-item-${ign ? 'ignore' : (flag === f ? 'unknown' : flag)}-flag`, ign ? undefined : flag);
        }));
}
exports.flags = flags;
function kindString(mdl) {
    return hslayout_1.m('span.hs-item-kind', mdl.kindString);
}
exports.kindString = kindString;
function itemName(mdl, sub) {
    return hslayout_1.m('span.hs-item-name', !mdl.fullPath ? sub.name : libLink('a', mdl.lib, mdl.fullPath, sub.name));
}
exports.itemName = itemName;
function itemTooltip(mdl) {
    return hslayout_1.m('span.hs-item-name', Tooltip_1.tooltip(mdl.name, 'class name and then some', 'bottom'));
}
exports.itemTooltip = itemTooltip;
function extensionOf(mdl) {
    return hslayout_1.m('span.hs-item-extensions', !mdl.extendedTypes ? undefined : [
        hslayout_1.m('span.hs-item-extends', 'extends'),
        hslayout_1.m('span', mdl.extendedTypes.map((t, i) => hslayout_1.m('span.hs-item-extension', [
            libLink('a', mdl.lib, DocSets_1.DocSets.get(mdl.lib, t.id).fullPath, t.name),
            mdl.extendedTypes.map.length > (i + 1) ? ', ' : ''
        ]))),
    ]);
}
exports.extensionOf = extensionOf;
function inheritedFrom(mdl) {
    if (mdl.inheritedFrom) {
        let parent = DocSets_1.DocSets.get(mdl.lib, mdl.inheritedFrom.id);
        parent = DocSets_1.DocSets.get(mdl.lib, parent.fullPath.substring(0, parent.fullPath.lastIndexOf('.')));
        return hslayout_1.m('span.hs-item-inherited-from', [
            hslayout_1.m('span', 'inherited from '),
            libLink('a', parent.lib, parent.fullPath, parent.name)
        ]);
    }
    else {
        return hslayout_1.m('span.hs-item-inherited-from', undefined);
    }
}
exports.inheritedFrom = inheritedFrom;
function sourceLink(mdl) {
    const source = mdl.sources ? mdl.sources[0] : undefined;
    if (source) {
        let file = (source.fileName || '').replace('.ts', '.html');
        const index = file.indexOf(mdl.lib);
        if (index > 0) {
            file = file.substr(index);
        }
        return hslayout_1.m('span.hs-item-member-source', hslayout_1.m('a', { href: `${SourceBase}${mdl.lib}/${file}#${Math.max(0, source.line - 5)}`, target: "_blank" }, '[source]'));
    }
    else {
        return hslayout_1.m('span.hs-item-member-source', '');
    }
}
exports.sourceLink = sourceLink;
function libLink(css, lib, id, name) {
    return hslayout_1.m(css, { href: `/api/${lib}/${id}`, oncreate: hslayout_1.m.route.link, onupdate: hslayout_1.m.route.link }, name);
}
exports.libLink = libLink;
;
function signature(s, mdl) {
    const comma = (i) => (i > 0) ? ', ' : '';
    function optional(flags) {
        return (flags && flags.isOptional) ? '.hs-item-optional' : '';
    }
    let sig = [];
    if (s) {
        if (s.parameters) {
            sig = s.parameters.map((p, i) => hslayout_1.m('span', [
                comma(i),
                hslayout_1.m('span.hs-item-sig-param', [
                    hslayout_1.m(`span.hs-item-name${optional(p.flags)}`, p.name),
                    type(p, mdl.lib)
                ])
            ]));
        }
        switch (mdl.kindString) {
            case 'Method':
            case 'Function':
            case 'Constructor':
                sig.unshift(hslayout_1.m('span.hs-item-name', '('));
                sig.push(hslayout_1.m('span.hs-item-name', ')'));
                break;
            default:
        }
    }
    return hslayout_1.m('span.hs-item-signature', sig);
}
exports.signature = signature;
function defaultVal(s, lib) {
    if (s && s.defaultValue) {
        let val = ` = ${s.defaultValue}`.replace(/{/gi, '{ ').replace(/}/gi, ' }');
        return hslayout_1.m('span.hs-item-default', val);
    }
    else {
        return;
    }
}
exports.defaultVal = defaultVal;
function type(t, lib) {
    function _type(tt) {
        switch (tt.type) {
            case undefined: return '';
            case 'array': return hslayout_1.m('span.hs-item-type-array', ['Array<', _type(tt.elementType), '>']);
            case 'tuple': return hslayout_1.m('span.hs-item-type-tuple', [
                '[ ',
                ...tt.elements.map((e, i) => [i > 0 ? ', ' : undefined, _type(e)]),
                ' ]'
            ]);
            case 'intrinsic':
            case 'instrinct': return hslayout_1.m('span.hs-item-type-instrinct', tt.id ? libLink('span', lib, tt.fullPath, tt.name) : tt.name);
            case 'stringLiteral': return hslayout_1.m('span.hs-item-type-string-literal', tt.type);
            case 'union': return hslayout_1.m('span.hs-item-type-union', [...tt.types.map((e, i) => [i > 0 ? ' | ' : undefined, _type(e)])]);
            case 'reference':
                let refRes = tt.name;
                if (tt.id) {
                    const typeRef = DocSets_1.DocSets.get(lib, tt.id);
                    if (typeRef.typeArguments) {
                        refRes = typeRef.name + '<' + typeRef.typeArguments.map(_type).join(', ') + '>';
                    }
                    else if (typeRef.id) {
                        refRes = libLink('a', lib, typeRef.fullPath, typeRef.name);
                    }
                    else {
                        refRes = typeRef.name;
                    }
                }
                return hslayout_1.m('span.hs-item-type-reference', refRes);
            case 'reflection':
                let rflRes;
                if (tt.declaration) {
                    rflRes = !tt.declaration.children ? tt.declaration.kindString :
                        hslayout_1.m('span.hs-item-reflection', [
                            '{ ',
                            ...tt.declaration.children.map((c, i) => [i > 0 ? ', ' : undefined, c.name, ': ', _type(c.type)]),
                            ' }'
                        ]);
                }
                else {
                    rflRes = 'UNKNOWN';
                }
                return hslayout_1.m('span.hs-item-type-reflection', rflRes);
            default:
                console.log('unknown type ' + tt.type);
                console.log(t);
                return t.type;
        }
    }
    try {
        return hslayout_1.m('span', !t.type ? '' : [
            hslayout_1.m('span.hs-item-name', ':'),
            hslayout_1.m('span.hs-item-sig-type', _type(t.type)),
            defaultVal(t, lib)
        ]);
    }
    catch (e) {
        console.log(e);
        console.log(e.trace);
    }
}
exports.type = type;
function makeID(section, mdl) {
    let result = section ? section + '_' : '';
    result = (result + (mdl.name || '')).toLowerCase();
    return (result !== '') ? result : undefined;
}
exports.makeID = makeID;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFydHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdmlldy9QYXJ0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUFtQztBQUNuQyx1Q0FBb0M7QUFDcEMsd0NBQXFDO0FBRXJDLE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQztBQUkxQixlQUFzQixHQUFPLEVBQUUsU0FBZ0IsRUFBRTtJQUM3QyxNQUFNLGtCQUFrQixHQUFHLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ2xELE1BQU0sVUFBVSxHQUFHO1FBQ2YsVUFBVSxFQUFjLFFBQVE7UUFDaEMsVUFBVSxFQUFjLFVBQVU7UUFDbEMsUUFBUSxFQUFnQixRQUFRO1FBQ2hDLFNBQVMsRUFBZSxTQUFTO1FBQ2pDLFdBQVcsRUFBYSxXQUFXO1FBQ25DLHFCQUFxQixFQUFHLHFCQUFxQjtRQUM3QyxVQUFVLEVBQWMsVUFBVTtRQUNsQyxPQUFPLEVBQWlCLE9BQU87UUFDL0IsUUFBUSxFQUFnQixRQUFRO1FBQ2hDLFVBQVUsRUFBYyxVQUFVO0tBQ3JDLENBQUM7SUFDRixPQUFPLFlBQUMsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQVEsRUFBRSxFQUFFO1lBQ3BDLElBQUksR0FBRyxHQUFHLEtBQUssQ0FBQztZQUNoQixJQUFJLElBQUksR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekIsSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFO2dCQUFFLElBQUksR0FBRyxDQUFDLENBQUM7YUFBRTtpQkFDaEM7Z0JBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzthQUFFO1lB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