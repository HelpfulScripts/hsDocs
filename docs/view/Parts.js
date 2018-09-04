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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFydHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdmlldy9QYXJ0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUFtQztBQUNuQyx1Q0FBb0M7QUFDcEMsd0NBQXFDO0FBRXJDLE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQztBQUkxQixTQUFnQixLQUFLLENBQUMsR0FBTyxFQUFFLFNBQWdCLEVBQUU7SUFDN0MsTUFBTSxrQkFBa0IsR0FBRyxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNsRCxNQUFNLFVBQVUsR0FBRztRQUNmLFVBQVUsRUFBYyxRQUFRO1FBQ2hDLFVBQVUsRUFBYyxVQUFVO1FBQ2xDLFFBQVEsRUFBZ0IsUUFBUTtRQUNoQyxTQUFTLEVBQWUsU0FBUztRQUNqQyxXQUFXLEVBQWEsV0FBVztRQUNuQyxxQkFBcUIsRUFBRyxxQkFBcUI7UUFDN0MsVUFBVSxFQUFjLFVBQVU7UUFDbEMsT0FBTyxFQUFpQixPQUFPO1FBQy9CLFFBQVEsRUFBZ0IsUUFBUTtRQUNoQyxVQUFVLEVBQWMsVUFBVTtLQUNyQyxDQUFDO0lBQ0YsT0FBTyxZQUFDLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFBLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMzQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFRLEVBQUUsRUFBRTtZQUNwQyxJQUFJLEdBQUcsR0FBRyxLQUFLLENBQUM7WUFDaEIsSUFBSSxJQUFJLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLElBQUksSUFBSSxLQUFLLFNBQVMsRUFBRTtnQkFBRSxJQUFJLEdBQUcsQ0FBQyxDQUFDO2FBQUU7aUJBQ2hDO2dCQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENB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