/**
 * LeftNav: Responsible for constructing the left-hand navigation pane. 
 */

/** */
import { m, Vnode}      from 'hslayout';
import { Layout }       from 'hslayout';
import { Collapsible }  from 'hswidget';
import { libLinkByPath }from '../NodesDisplay'; 
import { DocSets }      from '../DocSets';


/**
 * Constructs the left-hand navigation pane
 */
export class LeftNav extends Layout {
    getComponents(node: Vnode): Vnode {
        let lib = m.route.param('lib');
        let field = m.route.param('field');
        const docSet = DocSets.getNode(0, lib) || {name:'unknown', id:0};
        return m('.hs-left', [m('.hs-left-nav', navList(docSet, field))]);
    } 
}

/** creates the list if modules (`*.ts` files) */
function navList(docSet:any, field:string):Vnode[] {
    /** */
    function collectModules(docSet:any) {
        const modulesByName = {};
        docSet.modules = [];
        if (docSet.children) {
            docSet.children.forEach((c:any) => {
                // don't show modules from other projects (isExternal flag) or modules on the ignore list
                if (!(c.flags && c.flags.isExternal) && !ignoreModules[c.name]) {
                    const name = c.innerModule? c.innerModule : c.name;
                    let module = modulesByName[name];
                    if (!module) {  // new module
                        docSet.modules.push(module = modulesByName[name] = { 
                            name: name,
                            lib: docSet.lib,
                            fullPath: docSet.fullPath + '.'+ name,
                            groups:[]
                        });
                    }
                    // get existing module groups
                    const groups = {};
                    module.groups.forEach((g:any) => groups[g.title] = g); 
                    // for each group in child:
                    if (c.groups) { c.groups.forEach((g:any) => {
                        let group = groups[g.title]; // get existing 
                        if (!group) {                 //  else create new
                            group = groups[g.title] = {
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
     * processes a module, i.e. a `.ts` file.
     */
    function externalModule(mdl:any) {
        let selected = false;
        if (field===''+mdl.id || field.indexOf(mdl.fullPath) === 0) { selected=true; }

        return m(Collapsible, {css:`.hs-left-nav-module`, preArrow: true, isExpanded:selected, components:[
            m(`${selected?'.hs-left-nav-selected':''}`, libLinkByPath(mdl.lib, mdl.fullPath, mdl.name, `.hs-left-nav-module-name`)),
            !mdl.groups? undefined : mdl.groups.map((g:any) => entries(g, mdl, field))
        ]});
    }

    if (docSet.kind === 0) { // External DocSets
        collectModules(docSet);
//        const modules = docSet.children? docSet.children.map(externalModule) : ['no children'];
        const modules = docSet.modules.map(externalModule);
        modules.unshift(m('.hs-left-nav-header', 'Modules'));
        return [m('.hs-left-nav-content', modules)];
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
        const selected = (field===''+mod.id || field===mod.fullPath)? '.hs-left-nav-selected' : '';
        const exported = (mod.flags && mod.flags.isExported);
        const isStatic = (mod.flags && mod.flags.isStatic);
        const css = `.hs-left-nav-entry ${selected} ${exported?'.hs-left-nav-exported' : ''}`;
        return (!exported && group.title==='Variables')? '' :   // ignore local module variables
            m('', [
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
            grp.unshift(m('.hs-left-nav-header', group.title));
        }
    }
    return (grp.length > 1)? m(`.hs-left-nav-entries`, grp) : '';
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

