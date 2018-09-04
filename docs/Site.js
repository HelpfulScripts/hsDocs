"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hslayout = require("hslayout");
const header = require("./view/DocsMenu");
const left = require("./view/LeftNav");
const main = require("./view/MainDetail");
const TitleHeight = '30px';
const FooterHeight = '10px';
const LeftNavWidth = '200px';
const SiteName = 'HSDocs';
const SiteLink = 'https://github.com/HelpfulScripts/hsDocs';
const myConfig = {
    Layout: {
        rows: [TitleHeight, "fill", FooterHeight],
        css: '.hs-site',
        content: [{
                Layout: {
                    columns: [LeftNavWidth, "fill"],
                    css: '.hs-site-header',
                    content: [
                        { Layout: {
                                css: '.hs-site-title',
                                content: SiteName,
                                href: SiteLink
                            } },
                        { DocsMenu: { docSet: "./data/index.json" } }
                    ]
                }
            }, {
                Layout: {
                    columns: [LeftNavWidth, "fill"],
                    content: [
                        { LeftNav: {} },
                        { MainDetail: {} }
                    ]
                }
            },
            { Layout: {
                    css: '.hs-site-footer',
                    content: '(c) Helpful Scripts'
                } }
        ]
    },
    route: {
        default: '/api',
        paths: [
            '/api',
            '/api/:lib',
            '/api/:lib/:field'
        ]
    }
};
function init() {
    new hslayout.HsConfig([hslayout, header, left, main]).attachNodeTree(myConfig, document.body);
}
exports.init = init;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2l0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9TaXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBS0EscUNBQXNDO0FBQ3RDLDBDQUEyQztBQUMzQyx1Q0FBMEM7QUFDMUMsMENBQTZDO0FBRzdDLE1BQU0sV0FBVyxHQUFLLE1BQU0sQ0FBQztBQUM3QixNQUFNLFlBQVksR0FBSSxNQUFNLENBQUM7QUFDN0IsTUFBTSxZQUFZLEdBQUksT0FBTyxDQUFDO0FBQzlCLE1BQU0sUUFBUSxHQUFRLFFBQVEsQ0FBQztBQUMvQixNQUFNLFFBQVEsR0FBUSwwQ0FBMEMsQ0FBQztBQUVqRSxNQUFNLFFBQVEsR0FBRztJQUNiLE1BQU0sRUFBRTtRQUNKLElBQUksRUFBRyxDQUFDLFdBQVcsRUFBRSxNQUFNLEVBQUUsWUFBWSxDQUFDO1FBQzFDLEdBQUcsRUFBRSxVQUFVO1FBQ2YsT0FBTyxFQUFFLENBQUM7Z0JBQ04sTUFBTSxFQUFDO29CQUNILE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUM7b0JBQy9CLEdBQUcsRUFBRSxpQkFBaUI7b0JBQ3RCLE9BQU8sRUFBRTt3QkFDTCxFQUFFLE1BQU0sRUFBSztnQ0FDVCxHQUFHLEVBQUUsZ0JBQWdCO2dDQUNyQixPQUFPLEVBQUUsUUFBUTtnQ0FDakIsSUFBSSxFQUFFLFFBQVE7NkJBQ2pCLEVBQUM7d0JBQ0YsRUFBRSxRQUFRLEVBQUssRUFBRSxNQUFNLEVBQUMsbUJBQW1CLEVBQUMsRUFBQztxQkFDaEQ7aUJBQ0o7YUFBQyxFQUFDO2dCQUNILE1BQU0sRUFBQztvQkFDSCxPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDO29CQUMvQixPQUFPLEVBQUU7d0JBQ0wsRUFBRSxPQUFPLEVBQUssRUFBRSxFQUFDO3dCQUNqQixFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUM7cUJBQ3BCO2lCQUNKO2FBQUM7WUFDRixFQUFFLE1BQU0sRUFBRTtvQkFDTixHQUFHLEVBQUUsaUJBQWlCO29CQUN0QixPQUFPLEVBQUUscUJBQXFCO2lCQUNqQyxFQUFDO1NBQ0w7S0FDSjtJQUNELEtBQUssRUFBRTtRQUNILE9BQU8sRUFBRSxNQUFNO1FBQ2YsS0FBSyxFQUFFO1lBQ0gsTUFBTTtZQUNOLFdBQVc7WUFDWCxrQkFBa0I7U0FDckI7S0FDSjtDQUNKLENBQUM7QUFHRixTQUFnQixJQUFJO0lBQ2hCLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDbEcsQ0FBQztBQUZELG9CQUVDIn0=