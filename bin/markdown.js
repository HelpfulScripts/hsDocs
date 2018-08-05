"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const showdown = require('showdown');
const hslayout_1 = require("hslayout");
function markDown(text, short = false, currentRoute = hslayout_1.m.route.get()) {
    const converter = new showdown.Converter({
        tables: true,
        ghCompatibleHeaderId: true,
        smartIndentationFix: true,
        takslists: true,
        strikethrough: true
    });
    let result = (!text) ? '' : converter.makeHtml(text);
    if (short) {
        const i = result.indexOf('</p>');
        if (i > 0) {
            result = result.substring(0, i);
        }
    }
    result = substituteLinks(result, currentRoute);
    return result;
}
exports.markDown = markDown;
function substituteLinks(comment, currentRoute) {
    function deconstructRoute(route) {
        let lib, mod;
        route.replace(/\/([^\/.]*)\/([^\/\s]*$)/gi, (match, ...args) => {
            lib = args[0];
            mod = args[1];
            return '';
        });
        return [lib, mod];
    }
    function getLibMod(path) {
        let lib, mod, frag;
        if (path.indexOf(':') > 0) {
            [lib, mod] = path.split(':');
        }
        else {
            lib = defLib;
            mod = path;
        }
        if (mod.indexOf('#') > 0) {
            [mod, frag] = mod.split('#');
        }
        return [lib, mod, frag];
    }
    let [defLib] = deconstructRoute(currentRoute);
    comment = comment.replace(/\s{@link ([\S]*)\s*([^}]+)}/gi, (match, ...args) => {
        const path = args[0];
        const text = args[1];
        let [lib, module] = getLibMod(path);
        return (module === '' || module === '0' || module === 'overview') ?
            ` <a href="#!/api/${lib}/0">${text}</a>` :
            ` <a href="#!/api/${lib}/${lib}.${module}">${text}</a>`;
    });
    return comment;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvbWFya2Rvd24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxNQUFNLFFBQVEsR0FBSSxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDdEMsdUNBQThCO0FBUTlCLGtCQUF5QixJQUFXLEVBQUUsUUFBYyxLQUFLLEVBQUUsZUFBc0IsWUFBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUU7SUFDMUYsTUFBTSxTQUFTLEdBQUcsSUFBSSxRQUFRLENBQUMsU0FBUyxDQUFDO1FBQ3JDLE1BQU0sRUFBa0IsSUFBSTtRQUM1QixvQkFBb0IsRUFBSSxJQUFJO1FBQzVCLG1CQUFtQixFQUFLLElBQUk7UUFDNUIsU0FBUyxFQUFlLElBQUk7UUFDNUIsYUFBYSxFQUFXLElBQUk7S0FDL0IsQ0FBQyxDQUFDO0lBQ0gsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFBLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEQsSUFBSSxLQUFLLEVBQUU7UUFDUCxNQUFNLENBQUMsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRTtZQUFFLE1BQU0sR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUFFO0tBQ2hEO0lBQ0QsTUFBTSxHQUFHLGVBQWUsQ0FBQyxNQUFNLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFDL0MsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQztBQWZELDRCQWVDO0FBb0JELHlCQUF5QixPQUFjLEVBQUUsWUFBbUI7SUFDeEQsMEJBQTBCLEtBQVk7UUFDbEMsSUFBSSxHQUFHLEVBQUUsR0FBRyxDQUFDO1FBQ2IsS0FBSyxDQUFDLE9BQU8sQ0FBQyw0QkFBNEIsRUFBRSxDQUFDLEtBQUssRUFBRSxHQUFHLElBQUksRUFBRSxFQUFFO1lBQzNELEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDZCxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2QsT0FBTyxFQUFFLENBQUM7UUFDZCxDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUVELG1CQUFtQixJQUFXO1FBQzFCLElBQUksR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUM7UUFDbkIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFDLENBQUMsRUFBRTtZQUNyQixDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ2hDO2FBQU87WUFDSixHQUFHLEdBQUcsTUFBTSxDQUFDO1lBQ2IsR0FBRyxHQUFHLElBQUksQ0FBQztTQUNkO1FBQ0QsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFDLENBQUMsRUFBRTtZQUNwQixDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ2hDO1FBQ0QsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVELElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUc5QyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQywrQkFBK0IsRUFBRSxDQUFDLEtBQUssRUFBRSxHQUFHLElBQUksRUFBRSxFQUFFO1FBQzFFLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyQixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckIsSUFBSSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEMsT0FBTyxDQUFDLE1BQU0sS0FBSyxFQUFFLElBQUksTUFBTSxLQUFLLEdBQUcsSUFBSSxNQUFNLEtBQUssVUFBVSxDQUFDLENBQUEsQ0FBQztZQUMxRCxvQkFBb0IsR0FBRyxPQUFPLElBQUksTUFBTSxDQUFDLENBQUM7WUFDMUMsb0JBQW9CLEdBQUcsSUFBSSxHQUFHLElBQUksTUFBTSxLQUFLLElBQUksTUFBTSxDQUFDO0lBQ3BFLENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxPQUFPLENBQUM7QUFFbkIsQ0FBQyJ9