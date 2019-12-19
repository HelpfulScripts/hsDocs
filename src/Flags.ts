/**
 * 
 */

 /** */

import { m, Vnode}  from 'hslayout';
import { DocsNode } from './Nodes';

export interface Flags {
    isExported?: boolean;
    isStatic?: boolean;
    isPrivate?: boolean;
    isProtected?: boolean;
    isPublic?: boolean;
    isConst?: boolean;
    isLet?: boolean;
    isOptional?: boolean;
    isAbstract?: boolean;
    isRest?: boolean;
    isConstructorProperty?: boolean;
}


export const flagsNone:Flags = {
};

export const flagsExported = (flags:Flags):Flags => {
    flags.isExported = false;
    return flags;
};

export const flagsConstLet = (flags:Flags):Flags => {
    flags.isConst =    false;
    flags.isLet =      false;
    return flagsExported(flags);
};

export const flagsPublic = (flags:Flags):Flags => {
    flags.isPublic =    false;
    flags.isProtected = false;
    flags.isPrivate =   false;
    return flags;
};

export const flagsClass = (flags:Flags):Flags => {
    flags.isExported = false;
    flags.isAbstract = false;
    return flags;
};


/**
 * generates CSS classes for the provided flags.
 * @param mdl the `DocsNode` module for which to provide the css classes
 */
export function flagsDisplay(mdl:DocsNode):Vnode {
    const classMembers = ['Method', 'Property'];
    const knownFlags = {
        isExported:     'export',
        isStatic:       'static',
        isPrivate:      'private',
        isProtected:    'protected',
        isPublic:       'public',
        isVar:          'var',
        isConst:        'const',
        isLet:          'let',
        isOptional:     'optional',
        isAbstract:     'abstract',
        isExternal:     'external',
        isRest:         'rest',
    };
    const flags:string[] = Object.keys(mdl.flags);
    const classMember = classMembers.indexOf(mdl.kindString)>=0;
    if (classMember) {
        if (!mdl.flags.isProtected && !mdl.flags.isPrivate) {
            if (flags.indexOf('isPublic')<0) { flags.unshift('isPublic'); }
        }
    }
    return !flags? undefined : flags
        .filter(f => f!=='isExported' || !classMember)
        .map(f => {
            let flag = knownFlags[f] || 'unknown';
            return m(`span.hsdocs_flag_${flag}`, flag);
        });
}
