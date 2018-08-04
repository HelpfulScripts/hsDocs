"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hslayout_1 = require("hslayout");
const DocSets_1 = require("../DocSets");
const hswidget_1 = require("hswidget");
class DocsMenu extends hslayout_1.Layout {
    constructor() {
        super(...arguments);
        this.docSet = '';
    }
    getDesc(attrs) {
        if (this.docSet !== attrs.docSet) {
            this.docSet = attrs.docSet;
            DocSets_1.DocSets.loadList(attrs.docSet);
        }
        const items = DocSets_1.DocSets.get();
        return {
            items: items.map((c) => c),
            defaultItem: (attrs.route && attrs.route.lib) ? attrs.route.lib : items[0],
            changed: (item) => hslayout_1.m.route.set('/api/:lib/0', { lib: item })
        };
    }
    getComponents(node) {
        const desc = this.getDesc(node.attrs);
        return hslayout_1.m(hswidget_1.Menu, { desc: desc });
    }
}
exports.DocsMenu = DocsMenu;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRG9jc01lbnUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdmlldy9Eb2NzTWVudS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUFnRDtBQUNoRCx3Q0FBa0Q7QUFDbEQsdUNBQWdEO0FBZ0JoRCxjQUFzQixTQUFRLGlCQUFNO0lBQXBDOztRQUNJLFdBQU0sR0FBRyxFQUFFLENBQUM7SUFtQmhCLENBQUM7SUFqQlcsT0FBTyxDQUFDLEtBQVM7UUFDckIsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFDOUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO1lBQzNCLGlCQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNsQztRQUNELE1BQU0sS0FBSyxHQUFHLGlCQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDNUIsT0FBTztZQUNILEtBQUssRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDakMsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUN6RSxPQUFPLEVBQUUsQ0FBQyxJQUFXLEVBQUUsRUFBRSxDQUFDLFlBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxFQUFDLEdBQUcsRUFBQyxJQUFJLEVBQUMsQ0FBQztTQUNuRSxDQUFDO0lBQ04sQ0FBQztJQUVELGFBQWEsQ0FBQyxJQUFVO1FBQ3BCLE1BQU0sSUFBSSxHQUFnQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuRCxPQUFPLFlBQUMsQ0FBQyxlQUFJLEVBQUUsRUFBQyxJQUFJLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztJQUNqQyxDQUFDO0NBQ0o7QUFwQkQsNEJBb0JDIn0=