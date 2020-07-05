import m from "mithril";
type Vnode = m.Vnode<any, any>;

export function tooltip(text:string, tip:string, position:string):Vnode { 
    // position: top, left, botton, right
    return m('.hs-tooltip[href=#]', [text, m(`span.hs-tooltip-${position}`, tip)]);
}

