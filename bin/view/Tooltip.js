"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hslayout_1 = require("hslayout");
function tooltip(text, tip, position) {
    return hslayout_1.m('.hs-tooltip[href=#]', [text, hslayout_1.m(`span.hs-tooltip-${position}`, tip)]);
}
exports.tooltip = tooltip;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVG9vbHRpcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3L1Rvb2x0aXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBbUM7QUFFbkMsaUJBQXdCLElBQVcsRUFBRSxHQUFVLEVBQUUsUUFBZTtJQUU1RCxPQUFPLFlBQUMsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLElBQUksRUFBRSxZQUFDLENBQUMsbUJBQW1CLFFBQVEsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNuRixDQUFDO0FBSEQsMEJBR0MifQ==