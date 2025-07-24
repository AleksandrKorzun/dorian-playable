/* global window */

import Network from './Network';

export default class Moloco extends Network {
    openStore() {
        window.FbPlayableAd ? window.FbPlayableAd.onCTAClick() : window.top.open(this.getUrl());
    }
}
