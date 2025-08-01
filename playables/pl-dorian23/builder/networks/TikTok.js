/* global window, document */

import Network from './Network';

export default class TikTok extends Network {
    constructor(callback) {
        const api = document.createElement('script');
        api.type = 'text/javascript';
        api.src = 'https://sf16-muse-va.ibytedtos.com/obj/union-fe-nc-i18n/playable/sdk/playable-sdk.js';

        setTimeout(() => {
            document.body.appendChild(api);
        }, 100);

        super(callback);
    }

    openStore() {
        window.openAppStore();
    }
}
