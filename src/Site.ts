/**
 * Site documentation
 */

/** */
import * as hslayout  from 'hslayout';
import * as header  from './view/DocsMenu';
import * as left    from './view/LeftNav';
import * as main    from './view/MainDetail';

export function init() {
    const Router = {
        view: () => hslayout.m(hslayout.Config, 
            Object.assign({source:'./design.json', context: [hslayout, header, left, main]}, 
            {
                route: {field:hslayout.m.route.param('field'), 
                lib:hslayout.m.route.param('lib')}
            }
        ))
    };
    hslayout.m.route(document.body, '/api', { 
        '/api':             Router,
        '/api/:lib':        Router,
        '/api/:lib/:field': Router
    });
}
