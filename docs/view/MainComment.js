"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hslayout_1 = require("hslayout");
const markdown_1 = require("../markdown");
const MainExample_1 = require("./MainExample");
function commentLong(mdl) {
    let content = [];
    if (mdl.comment) {
        content.push(textOrShortTextOrDescription(mdl.comment, false));
        content.push(returns(mdl.comment, false));
        content.push(commentRemainder(mdl.comment));
    }
    return hslayout_1.m('.hs-item-comment', content);
}
exports.commentLong = commentLong;
function comment(mdl, short = false) {
    let content = [];
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
    return hslayout_1.m('.hs-item-comment', content);
}
exports.comment = comment;
function textOrShortTextOrDescription(comment, short) {
    let text = (comment.shortText || '');
    if (comment.text) {
        text += '\n' + (comment.text || '');
    }
    if (comment.tags) {
        comment.tags.map((tag) => { if (tag.tag === 'description') {
            text = tag.text;
        } });
    }
    text = text.replace(/<example([\S\s]*?)<\/example>/gi, short ? '' : MainExample_1.example);
    return hslayout_1.m('.hs-item-comment-desc', prettifyCode(text, short));
}
function returns(comment, short) {
    let text = comment.returns;
    return hslayout_1.m('.hs-item-comment-return', !text ? '' : [
        hslayout_1.m('span.hs-item-comment-tag', 'returns:'),
        hslayout_1.m('span.hs-item-comment-text', text)
    ]);
}
function commentRemainder(comment) {
    return hslayout_1.m('', Object.keys(comment).map((tag) => {
        switch (tag) {
            case 'tags':
            case 'shortText':
            case 'text':
            case 'description':
            case 'returns':
                return '';
            default:
                return hslayout_1.m('.hs-item-comment-special', [
                    hslayout_1.m('span.hs-item-comment-tag', tag),
                    hslayout_1.m('span.hs-item-comment-text', comment[tag])
                ]);
                ;
        }
    }));
}
function otherCommentTags(comment) {
    return hslayout_1.m('', !comment.tags ? [] : comment.tags.map((tag) => {
        switch (tag.tag) {
            case 'description': return '';
            default: return hslayout_1.m('.hs-item-comment-special', [
                hslayout_1.m('span.hs-item-comment-tag', tag.tag),
                hslayout_1.m('span.hs-item-comment-text', tag.text)
            ]);
        }
    }));
}
function mainCommentParams(params) {
    return hslayout_1.m('.hs-item-comment-params', params.map((par) => hslayout_1.m('.hs-item-comment-param', [
        hslayout_1.m('span.hs-item-comment-tag', par.name + ':'),
        hslayout_1.m('span.hs-item-comment-text', !par.comment ? '' :
            ((par.defaultValue !== undefined) ? `[default: ${par.defaultValue}] ` : '') + par.comment.text)
    ])));
}
function prettifyCode(comment, short) {
    let result = comment;
    function braceIndenting(text) {
        let indent = 0;
        const result = text
            .substring(6, text.length - 7)
            .trim()
            .replace(/(<)/g, '&lt;').replace(/(>)/g, '&gt;')
            .split('\n')
            .map((l) => {
            let oldIndent = indent;
            let k = l.trim();
            indent += Math.max(-1, Math.min(1, k.split('{').length - k.split('}').length));
            indent += Math.max(-1, Math.min(1, k.split('[').length - k.split(']').length));
            return '<span class="hs-code-indent"></span>'.repeat(((indent < oldIndent) ? indent : oldIndent)) + k;
        })
            .join('\n')
            .trim();
        return '<pre><code>' + result + '</code></pre>';
    }
    result = result.replace(/<code>([\S\s]*?)<\/code>/gi, braceIndenting);
    return hslayout_1.m.trust(markdown_1.markDown(result, short, hslayout_1.m.route.get()));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFpbkNvbW1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdmlldy9NYWluQ29tbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUtBLHVDQUFvQztBQUNwQywwQ0FBdUM7QUFDdkMsK0NBQXlDO0FBU3pDLHFCQUE0QixHQUFPO0lBQy9CLElBQUksT0FBTyxHQUFTLEVBQUUsQ0FBQztJQUN2QixJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUU7UUFDYixPQUFPLENBQUMsSUFBSSxDQUFDLDRCQUE0QixDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUMvRCxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDMUMsT0FBTyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztLQUMvQztJQUNELE9BQU8sWUFBQyxDQUFDLGtCQUFrQixFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQzFDLENBQUM7QUFSRCxrQ0FRQztBQVVELGlCQUF3QixHQUFPLEVBQUUsS0FBSyxHQUFDLEtBQUs7SUFDeEMsSUFBSSxPQUFPLEdBQVMsRUFBRSxDQUFDO0lBQ3ZCLElBQUksR0FBRyxDQUFDLE9BQU8sRUFBRTtRQUNiLE9BQU8sQ0FBQyxJQUFJLENBQUMsNEJBQTRCLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQy9ELElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDUixPQUFPLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQzVDLElBQUksR0FBRyxDQUFDLFVBQVUsRUFBRTtnQkFDaEIsT0FBTyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLFVBQVUs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