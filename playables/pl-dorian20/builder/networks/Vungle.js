/* global window */

import Network from './Network';

export default class Vungle extends Network {
    complete() {
        window.parent.postMessage('complete', '*');
    }

    openStore() {
        window.parent.postMessage('download', '*');
    }
}
