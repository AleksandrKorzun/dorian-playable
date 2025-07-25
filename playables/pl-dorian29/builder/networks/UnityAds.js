/* global window */

import Network from './Network';

export default class UnityAds extends Network {
    openStore() {
        window.mraid ? window.mraid.open(this.getUrl()) : window.top.open(this.getUrl());
    }
}
