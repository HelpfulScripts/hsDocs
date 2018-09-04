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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGVmdE5hdi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3L0xlZnROYXYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFLQSx1Q0FBb0M7QUFDcEMsdUNBQWlDO0FBQ2pDLHVDQUFzQztBQUN0Qyx3Q0FBcUM7QUFDckMsbUNBQWtDO0FBTWxDLE1BQWEsT0FBUSxTQUFRLGlCQUFNO0lBQy9CLGFBQWEsQ0FBQyxJQUFXO1FBQ3JCLElBQUksR0FBVSxDQUFDO1FBQ2YsSUFBSSxLQUFZLENBQUM7UUFDakIsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFO1lBQ2hDLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7WUFDM0IsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztTQUNsQztRQUNELE1BQU0sTUFBTSxHQUFHLGlCQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUUsRUFBRSxFQUFDLENBQUMsRUFBQyxDQUFDO1FBQzdELE9BQU8sWUFBQyxDQUFDLFVBQVUsRUFBRSxDQUFDLFlBQUMsQ0FBQyxjQUFjLEVBQUUsT0FBTyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN0RSxDQUFDO0NBQ0o7QUFYRCwwQkFXQztBQUdELFNBQVMsT0FBTyxDQUFDLE1BQVUsRUFBRSxLQUFZO0lBRXJDLFNBQVMsY0FBYyxDQUFDLE1BQVU7UUFDOUIsTUFBTSxhQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ3pCLE1BQU0sQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLElBQUksTUFBTSxDQUFDLFFBQVEsRUFBRTtZQUNqQixNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUssRUFBRSxFQUFFO2dCQUU5QixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUM1RCxNQUFNLElBQUksR0FBRyxDQUFDLENBQUMsV0FBVyxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO29CQUNuRCxJQUFJLE1BQU0sR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ2pDLElBQUksQ0FBQyxNQUFNLEVBQUU7d0JBQ1QsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRzs0QkFDL0MsSUFBSSxFQUFFLElBQUk7NEJBQ1YsR0FBRyxFQUFFLE1BQU0sQ0FBQyxHQUFHOzRCQUNmLFFBQVEsRUFBRSxNQUFNLENBQUMsUUFBUSxHQUFHLEdBQUcsR0FBRSxJQUFJOzRCQUNyQyxNQUFNLEVBQUMsRUFBRTt5QkFDWixDQUFDLENBQUM7cUJBQ047b0JBRUQsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO29CQUNsQixNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUssRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFFdEQsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFO3dCQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBSyxFQUFFLEVBQUU7NEJBQ3ZDLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7NEJBQzVCLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0NBQ1IsS0FBSyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUc7b0NBQ3RCLFFBQVEsRUFBQyxFQUFFO29DQUNYLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSTtvQ0FDWixLQUFLLEVBQUUsQ0FBQyxDQUFDLEtBQUs7aUNBQ2pCLENBQUM7Z0NBQ04sTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7NkJBQ3pCOzRCQUNELEtBQUssQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO3dCQUN2RCxDQUFDLENBQUMsQ0FBQztxQkFBQztpQkFDUDtZQUNMLENBQUMsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDO0lBSUQsU0FBUyxjQUFjLENBQUMsR0FBTztRQUMzQixJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDckIsSUFBSSxLQUFLLEtBQUcsRUFBRSxHQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQUUsUUFBUSxHQUFDLElBQUksQ0FBQztTQUFFO1FBRTlFLE9BQU8sWUFBQyxDQUFDLHNCQUFXLEVBQUUsRUFBQyxHQUFHLEVBQUMscUJBQXFCLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUMsUUFBUSxFQUFFLFVBQVUsRUFBQztnQkFDOUYsWUFBQyxDQUFDLEdBQUcsUUFBUSxDQUFBLENBQUMsQ0FBQSx1QkFBdUIsQ0FBQSxDQUFDLENBQUEsRUFBRSxFQUFFLEVBQUUsZUFBTyxDQUFDLDRCQUE0QixFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ25ILENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUssRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDN0UsRUFBQyxDQUFDLENBQUM7SUFDUixDQUFDO0lBRUQsSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsRUFBRTtRQUNuQixjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFdkIsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDbkQsT0FBTyxDQUFDLE9BQU8sQ0FBQyxZQUFDLENBQUMscUJBQXFCLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUNyRCxPQUFPLENBQUMsWUFBQyxDQUFDLHNCQUFzQixFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7S0FDL0M7QUFDTCxDQUFDO0FBS0QsTUFBTSxhQUFhLEdBQUc7SUFDbEIsUUFBUSxFQUFJLElBQUk7SUFDaEIsS0FBSyxFQUFPLElBQUk7Q0FDbkIsQ0FBQztBQVVGLFNBQVMsT0FBTyxDQUFDLEtBQVMsRUFBRSxHQUFPLEVBQUUsS0FBWTtJQUM3QyxTQUFTLFNBQVMsQ0FBQyxDQUFLO1FBQ3BCLE9BQU8saUJBQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBSUQsU0FBUyxLQUFLLENBQUMsR0FBTztRQUNsQixNQUFNLFFBQVEsR0FBRyxDQUFDLEtBQUssS0FBRyxFQUFFLEdBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxLQUFLLEtBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFBLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQzNGLE1BQU0sUUFBUSxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3JELE1BQU0sTUFBTSxHQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ25ELE1BQU0sR0FBRyxHQUFHLHVCQUF1QixRQUFRLElBQUksUUFBUSxDQUFBLENBQUMsQ0FBQSx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7UUFDdkYsT0FBTyxDQUFDLENBQUMsUUFBUSxJQUFJLEtBQUssQ0FBQyxLQUFLLEtBQUcsV0FBVyxDQUFDLENBQUEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2pELFlBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ0YsTUFBTSxDQUFBLENBQUMsQ0FBQyxRQUFRLENBQUEsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3BCLGVBQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUM7YUFDaEQsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVELFNBQVMsS0FBSyxDQUFDLEdBQU8sSUFBSSxPQUFPLEdBQUcsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRTlDLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztJQUNiLElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUU7UUFDekIsR0FBRyxHQUFHLEtBQUssQ0FBQyxRQUFRO2FBQ2YsR0FBRyxDQUFDLFNBQVMsQ0FBQzthQUNkLElBQUksQ0FBQyxlQUFlLENBQUM7YUFDckIsR0FBRyxDQUFDLEtBQUssQ0FBQzthQUNWLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuQixJQUFJLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ2hCLEdBQUcsQ0FBQyxPQUFPLENBQUMsWUFBQyxDQUFDLHFCQUFxQixFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQ3REO0tBQ0o7SUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQSxDQUFDLENBQUMsWUFBQyxDQUFDLHNCQUFzQixFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDakUsQ0FBQztBQUtELFNBQVMsZUFBZSxDQUFDLENBQUssRUFBRSxDQUFLO0lBQ2pDLElBQUksQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFO1FBQ3BCLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUU7WUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztTQUFFO2FBQ3BFLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUU7WUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO1NBQUU7YUFDdEMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRTtZQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQUU7YUFDckM7WUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztTQUFFO0tBQ25DO1NBQU07UUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztLQUFFO0FBQ3RDLENBQUMifQ==