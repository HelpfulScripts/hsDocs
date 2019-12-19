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
    return m('.hsdocs_comment', content);
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
    return m('.hsdocs_comment_desc', prettifyCode(text, short));
}

/**
 * creates the `returns` message for a function or method.
 */
function returns(comment:any, short:boolean):Vnode {
    let text = comment.returns;
    return m('hsdocs_comment_return', !text? '': [            
        m('span.hsdocs_comment_return_tag', 'returns:'), 
        m('span.hsdocs_comment_return_text', text)
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
                default: return m('.hsdocs_comment_remainder', [
                    m('span.hsdocs_comment_return_tag', tag), 
                    m('span.hsdocs_comment_return_text', comment[tag])
                ]);
            }
    }));
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
export function prettifyCode(comment:string, short:boolean):Vnode { 
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
