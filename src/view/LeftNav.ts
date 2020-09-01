/**
 * LeftNav: Responsible for constructing the left-hand navigation pane. 
 */

/** */
import m from "mithril";
import { Vnode }        from 'hswidget';
import { Widget }       from 'hswidget';
import { Collapsible }  from 'hswidget';
import { Log }          from 'hsutil';  const log = new Log('LeftNav');
import { libLinkByPath }from '../NodesDisplay'; 
import { DocSets }      from '../DocSets';
import { DocsNode  }    from "../Nodes";
import { ModuleDesc }   from "../Nodes";
import { Group }        from "../Nodes";
import { DocsAttrs }    from "./DocsMenu";
 

interface LeftNavAttrs extends DocsAttrs {
}

/**
 * Constructs the left-hand navigation pane
 */
export class LeftNav extends Widget {
    view(node:Vnode<LeftNavAttrs, this>) {
        const lib = node.attrs.lib;
        const field = node.attrs.field;
        const docSet = DocSets.getNode(0, lib) || {name:'unknown', id:0};
        return m('.hs_left', node.attrs, navList(<DocsNode>docSet, field));
    }
}

/** creates the list if modules (`*.ts` files) */
function navList(docSet:DocsNode, field:string):m.Children {
    /** processes a module, i.e. a `.ts` file. */
    function externalModule(mdl:ModuleDesc) {
        let selected = false;
        // if (field===''+mdl.id || field.indexOf(mdl.fullPath) === 0) { selected=true; }
        if (field.indexOf(mdl.fullPath) === 0) { selected=true; }

        return m(Collapsible, {class:`hs_left_nav_module`, preArrow: true, isExpanded:selected}, [
            m(`${selected?'.hs_left_nav-selected':''}`, libLinkByPath(mdl.lib, mdl.fullPath, mdl.name, `.hs_left_nav_module_name`)),
            ...(mdl.groups || []).map((g:any) => entries(g, mdl, field))
        ]);
    }

    if (docSet.kind === 0) { // External DocSets
        collectModules(docSet);
        const modules = docSet.modules.map(externalModule);
        modules.unshift(m('.hs_left_nav-header', 'Modules'));
        return m('.hs_left_nav', [m('.hs_left_nav-content', modules)]);
    }
}

function collectModules(docSet:DocsNode) {
    const modulesByName = <ModuleDesc>{};
    docSet.modules = <ModuleDesc[]>[];
    if (docSet.children) {
        docSet.children.forEach(c => {
            if (!c) { 
                log.warn(`c is undefined for docSet ${docSet.id}`);
                return;
            }
            // don't show modules from other projects (isExternal flag) or modules on the ignore list
            if (!(c.flags && c.flags.isExternal) && !ignoreModules[c.name]) {
                // const name = c.innerModule? c.innerModule : c.name;
                const name = c.name;
                let module = modulesByName[name];
                if (!module) {  // new module
                    docSet.modules.push(module = modulesByName[name] = <ModuleDesc>{ 
                        name: name,
                        lib: docSet.lib,
                        fullPath: docSet.fullPath + '.'+ name,
                        groups:[]
                    });
                }
                // get existing module groups
                const groups = <{[title:string]:Group}>{};
                module.groups.forEach((g:Group) => groups[g.title] = g); 
                // for each group in child:
                if (c.groups) { c.groups.forEach((g:any) => {
                    let group = groups[g.title]; // get existing 
                    if (!group) {                 //  else create new
                        group = groups[g.title] = <Group>{
                            children:[],
                            kind: g.kind,
                            title: g.title
                        };
                    module.groups.push(group);
                    }
                    group.children = group.children.concat(g.children);
                });}
            }
        });
    }
}


/**
 * modules to ignore in the list
 */
const ignoreModules = {
    overview:   true,   // the project overview.ts file
    index:      true    // the index.ts file
};

//const expanded: {string?:boolean} = {};

/**
 * processes a group of entries, e.g. Variables, Functions, or Classes.
 * @param group the group structure within the docset
 * @param mdl the entire module docset
 * @param field the field ID to be displayed on the main panel
 */
function entries(group:any, mdl:any, field:string) {
    function moduleGet(c:any) {
        return DocSets.getNode(c, mdl.lib);
    }
    /**
     * processes one entry within a group, e.g. one variable, function, or class.
     */
    function entry(mod:any) { 
        const selected = (field===''+mod.id || field===mod.fullPath)? '.hs_left_nav-selected' : '';
        const exported = (mod.flags && mod.flags.isExported);
        const isStatic = (mod.flags && mod.flags.isStatic);
        const css = `.hs_left_nav_entry_link ${selected} ${exported?'.hs_left_nav-exported' : ''}`;
        return (!exported && group.title==='Variables')? '' :   // ignore local module variables
            m('.hs_left_nav_entry', [
                isStatic? 'static': '',
                libLinkByPath(mod.lib, mod.fullPath, mod.name, css)
            ]);
    }

    function empty(mod:any) { return mod !== ''; }

    let grp = [];
    if (group && group.children) {
        grp = group.children
            .map(moduleGet)         // replace id reference by module
            .sort(exportAscending)  // sort: exported first, then alphabetically
            .map(entry)             // replace module by vnode structure
            .filter(empty);         // filter empty elements
        if (grp.length > 0) { // add an entries header if there are elements
            grp.unshift(m('.hs_left_nav-header', group.title));
        }
    }
    return (grp.length > 1)? m(`.hs_left_nav_entries`, grp) : '';
}

/**
 * sorting function: sort first by exported status, then alphabetically.
 */
function exportAscending(a:any, b:any):boolean|number {
    if (a.flags && b.flags) {
        if (a.flags.isExported && b.flags.isExported) { return a.name > b.name; }
        else if (a.flags.isExported) { return -1; }
        else if (b.flags.isExported) { return 1; }
        else { return a.name > b.name; }
    } else { return a.name > b.name; }
}

