/**
 * Processing of comments.
 */

/** */
import { m, Vnode } from 'hslayout';
import { markDown } from '../markdown';
import { example }  from './MainExample';

/**
 * Main comment processing. The result appears directly below the title in the main panel.
 * Function parameters are not reported in short form here since it is assumed they will be listed 
 * individually below the main comment
 * @param mdl the module to scan for comments
 * @return a vnode representing the comment entries
 */
export function commentLong(mdl:any):Vnode { 
    let content:any[] = [];
    if (mdl.comment) {
        content.push(textOrShortTextOrDescription(mdl.comment, false));
        content.push(returns(mdl.comment, false));
        content.push(commentRemainder(mdl.comment));
    }
    return m('.hs-item-comment', content);
}

/**
 * Shortended comment processing. This form is used to report on subitems below the main panel item.
 * If `short` is true, only the first paragraph of the main comment will be returned. Otherwise, 
 * this function creates a full comment including an inline list of parameters and the return value
 * @param mdl the module to scan for comments
 * @param short if true, only the first paragraph of the main comment is processed.
 * @return a vnode representing the comment entries
 */
export function comment(mdl:any, short=false):Vnode {
    let content:any[] = [];
    if (mdl.comment) {
        content.push(textOrShortTextOrDescription(mdl.comment, short));
        if (!short) {
            content.push(otherCommentTags(mdl.comment));
            if (mdl.parameters) {
                content = content.concat(mainCommentParams(mdl.parameters));
            }
        }
        content.push(returns(mdl.comment, false));
        content.push(commentRemainder(mdl.comment));
    }
    return m('.hs-item-comment', content);
} 

/**
 * Report the item's description. This can come in different forms that are all handled here:
 * - comment.shortText: <description>
 * - comment.text: <description>
 * - comment.tags[{tag:'description}, text:<description>]
 * Any resulting comment will be translated from markdown to html and returned as a `Vnode`.
 * @param comment the comment object to parse
 * @param short boolean; if true, only the first paragraph of the description will be returned
 */
function textOrShortTextOrDescription(comment:any, short:boolean):Vnode {
    let text = (comment.shortText || '');
    if (comment.text) { text += '\n'+ (comment.text || ''); }
    if (comment.tags) {
        comment.tags.map((tag:any) => {
            switch (tag.tag) {
                case 'shortText':
                case 'description': text = `${text}\n${tag.text}`; break;
                case 'param': text = `${text}\n- **${tag.param}**: ${tag.text}`; break;
            }
        });
    }
    // search for pattern <example...<file...</example>
    text = text.replace(/<example[^<]*?(<file[\S\s]*?)<\/example>/gi, short? '' : example);
    return m('.hs-item-comment-desc', prettifyCode(text, short));
}

/**
 * creates the `returns` message for a function or method.
 */
function returns(comment:any, short:boolean):Vnode {
    let text = comment.returns;
    return m('.hs-item-comment-return', !text? '': [            
        m('span.hs-item-comment-tag', 'returns:'), 
        m('span.hs-item-comment-text', text)
    ]);
}

function commentRemainder(comment:any):string|Vnode {
    return m('', Object.keys(comment).map((tag:any) => {
            switch(tag) {
                case 'tags':        // already handled
                case 'shortText':   // already handled
                case 'text':        // already handled
                case 'description': // already handled
                case 'returns':     // already handled
                        return '';
                default: return m('.hs-item-comment-special', [
                    m('span.hs-item-comment-tag', tag), 
                    m('span.hs-item-comment-text', comment[tag])
                ]);
            }
    }));
}

function otherCommentTags(comment:any):string|Vnode {
    return m('', !comment.tags? [] : comment.tags.map((tag:any) => {
        switch(tag.tag) {
            case 'description': return ''; // skip since already handled
            default: return m('.hs-item-comment-special', [
                m('span.hs-item-comment-tag', tag.tag), 
                m('span.hs-item-comment-text', tag.text)
            ]);
        }
    }));
}

function mainCommentParams(params:any):Vnode {
    return m('.hs-item-comment-params',  params.map((par:any) =>
        m('.hs-item-comment-param', [
            m('span.hs-item-comment-tag', par.name+':'), 
            m('span.hs-item-comment-text', !par.comment? '' :
                ((par.defaultValue!==undefined)? `[default: ${par.defaultValue}] ` : '') + par.comment.text
            )
        ])
    ));
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
//    const indentSpaces = 2;
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
