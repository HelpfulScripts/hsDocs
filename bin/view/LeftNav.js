"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hslayout_1 = require("hslayout");
const hslayout_2 = require("hslayout");
const hswidget_1 = require("hswidget");
const DocSets_1 = require("../DocSets");
const Parts_1 = require("./Parts");
class LeftNav extends hslayout_2.Layout {
    getComponents(node) {
        let lib;
        let field;
        if (node.attrs && node.attrs.route) {
            lib = node.attrs.route.lib;
            field = node.attrs.route.field;
        }
        const docSet = DocSets_1.DocSets.get(lib, 0) || { name: 'unknown', id: 0 };
        return hslayout_1.m('.hs-left', [hslayout_1.m('.hs-left-nav', navList(docSet, field))]);
    }
}
exports.LeftNav = LeftNav;
function navList(docSet, field) {
    function collectModules(docSet) {
        const modulesByName = {};
        docSet.modules = [];
        if (docSet.children) {
            docSet.children.forEach((c) => {
                if (!(c.flags && c.flags.isExternal) && !ignoreModules[c.name]) {
                    const name = c.innerModule ? c.innerModule : c.name;
                    let module = modulesByName[name];
                    if (!module) {
                        docSet.modules.push(module = modulesByName[name] = {
                            name: name,
                            lib: docSet.lib,
                            fullPath: docSet.fullPath + '.' + name,
                            groups: []
                        });
                    }
                    const groups = {};
                    module.groups.forEach((g) => groups[g.title] = g);
                    if (c.groups) {
                        c.groups.forEach((g) => {
                            let group = groups[g.title];
                            if (!group) {
                                group = groups[g.title] = {
                                    children: [],
                                    kind: g.kind,
                                    title: g.title
                                };
                                module.groups.push(group);
                            }
                            group.children = group.children.concat(g.children);
                        });
                    }
                }
            });
        }
    }
    function externalModule(mdl) {
        let selected = false;
        if (field === '' + mdl.id || field.indexOf(mdl.fullPath) === 0) {
            selected = true;
        }
        return hslayout_1.m(hswidget_1.Collapsible, { css: `.hs-left-nav-module`, preArrow: true, isExpanded: selected, components: [
                hslayout_1.m(`${selected ? '.hs-left-nav-selected' : ''}`, Parts_1.libLink(`a.hs-left-nav-module-name `, mdl.lib, mdl.fullPath, mdl.name)),
                !mdl.groups ? undefined : mdl.groups.map((g) => entries(g, mdl, field))
            ] });
    }
    if (docSet.kind === 0) {
        collectModules(docSet);
        const modules = docSet.modules.map(externalModule);
        modules.unshift(hslayout_1.m('.hs-left-nav-header', 'Modules'));
        return [hslayout_1.m('.hs-left-nav-content', modules)];
    }
}
const ignoreModules = {
    overview: true,
    index: true
};
function entries(group, mdl, field) {
    function moduleGet(c) {
        return DocSets_1.DocSets.get(mdl.lib, c);
    }
    function entry(mod) {
        const selected = (field === '' + mod.id || field === mod.fullPath) ? '.hs-left-nav-selected' : '';
        const exported = (mod.flags && mod.flags.isExported);
        const statik = (mod.flags && mod.flags.isStatic);
        const css = `a.hs-left-nav-entry ${selected} ${exported ? '.hs-left-nav-exported' : ''}`;
        return (!exported && group.title === 'Variables') ? '' :
            hslayout_1.m('', [
                statik ? 'static' : '',
                Parts_1.libLink(css, mod.lib, mod.fullPath, mod.name)
            ]);
    }
    function empty(mod) { return mod !== ''; }
    let grp = [];
    if (group && group.children) {
        grp = group.children
            .map(moduleGet)
            .sort(exportAscending)
            .map(entry)
            .filter(empty);
        if (grp.length > 0) {
            grp.unshift(hslayout_1.m('.hs-left-nav-header', group.title));
        }
    }
    return (grp.length > 1) ? hslayout_1.m(`.hs-left-nav-entries`, grp) : '';
}
function exportAscending(a, b) {
    if (a.flags && b.flags) {
        if (a.flags.isExported && b.flags.isExported) {
            return a.name > b.name;
        }
        else if (a.flags.isExported) {
            return -1;
        }
        else if (b.flags.isExported) {
            return 1;
        }
        else {
            return a.name > b.name;
        }
    }
    else {
        return a.name > b.name;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGVmdE5hdi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3L0xlZnROYXYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFLQSx1Q0FBb0M7QUFDcEMsdUNBQWlDO0FBQ2pDLHVDQUFzQztBQUN0Qyx3Q0FBcUM7QUFDckMsbUNBQWtDO0FBTWxDLGFBQXFCLFNBQVEsaUJBQU07SUFDL0IsYUFBYSxDQUFDLElBQVc7UUFDckIsSUFBSSxHQUFVLENBQUM7UUFDZixJQUFJLEtBQVksQ0FBQztRQUNqQixJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUU7WUFDaEMsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztZQUMzQixLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1NBQ2xDO1FBQ0QsTUFBTSxNQUFNLEdBQUcsaUJBQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxFQUFFLEVBQUMsQ0FBQyxFQUFDLENBQUM7UUFDN0QsT0FBTyxZQUFDLENBQUMsVUFBVSxFQUFFLENBQUMsWUFBQyxDQUFDLGNBQWMsRUFBRSxPQUFPLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7Q0FDSjtBQVhELDBCQVdDO0FBR0QsaUJBQWlCLE1BQVUsRUFBRSxLQUFZO0lBRXJDLHdCQUF3QixNQUFVO1FBQzlCLE1BQU0sYUFBYSxHQUFHLEVBQUUsQ0FBQztRQUN6QixNQUFNLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNwQixJQUFJLE1BQU0sQ0FBQyxRQUFRLEVBQUU7WUFDakIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFLLEVBQUUsRUFBRTtnQkFFOUIsSUFB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