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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRG9jc01lbnUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdmlldy9Eb2NzTWVudS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUFnRDtBQUNoRCx3Q0FBa0Q7QUFDbEQsdUNBQWdEO0FBZ0JoRCxNQUFhLFFBQVMsU0FBUSxpQkFBTTtJQUFwQzs7UUFDSSxXQUFNLEdBQUcsRUFBRSxDQUFDO0lBbUJoQixDQUFDO0lBakJXLE9BQU8sQ0FBQyxLQUFTO1FBQ3JCLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQzlCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztZQUMzQixpQkFBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDbEM7UUFDRCxNQUFNLEtBQUssR0FBRyxpQkFBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQzVCLE9BQU87WUFDSCxLQUFLLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLFdBQVcsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQSxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDekUsT0FBTyxFQUFFLENBQUMsSUFBVyxFQUFFLEVBQUUsQ0FBQyxZQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsRUFBQyxHQUFHLEVBQUMsSUFBSSxFQUFDLENBQUM7U0FDbkUsQ0FBQztJQUNOLENBQUM7SUFFRCxhQUFhLENBQUMsSUFBVTtRQUNwQixNQUFNLElBQUksR0FBZ0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkQsT0FBTyxZQUFDLENBQUMsZUFBSSxFQUFFLEVBQUMsSUFBSSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7SUFDakMsQ0FBQztDQUNKO0FBcEJELDRCQW9CQyJ9