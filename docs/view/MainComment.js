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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFpbkNvbW1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdmlldy9NYWluQ29tbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUtBLHVDQUFvQztBQUNwQywwQ0FBdUM7QUFDdkMsK0NBQXlDO0FBU3pDLFNBQWdCLFdBQVcsQ0FBQyxHQUFPO0lBQy9CLElBQUksT0FBTyxHQUFTLEVBQUUsQ0FBQztJQUN2QixJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUU7UUFDYixPQUFPLENBQUMsSUFBSSxDQUFDLDRCQUE0QixDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUMvRCxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDMUMsT0FBTyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztLQUMvQztJQUNELE9BQU8sWUFBQyxDQUFDLGtCQUFrQixFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQzFDLENBQUM7QUFSRCxrQ0FRQztBQVVELFNBQWdCLE9BQU8sQ0FBQyxHQUFPLEVBQUUsS0FBSyxHQUFDLEtBQUs7SUFDeEMsSUFBSSxPQUFPLEdBQVMsRUFBRSxDQUFDO0lBQ3ZCLElBQUksR0FBRyxDQUFDLE9BQU8sRUFBRTtRQUNiLE9BQU8sQ0FBQyxJQUFJLENBQUMsNEJBQTRCLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQy9ELElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDUixPQUFPLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQzVDLElBQUksR0FBRyxDQUFDLFVBQVUsRUFBRTtnQkFDaEIsT0FBTyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENB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