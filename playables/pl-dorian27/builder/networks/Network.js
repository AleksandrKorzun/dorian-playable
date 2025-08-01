/* global window, App */

export default class Network {
    constructor(callback) {
        this.game = null;

        callback && window.addEventListener('load', callback);
    }

    addClickToStore(obj) {
        obj.setInteractive().on('pointerdown', this.openStore, this);
    }

    openStore() {
        window.top.open(this.getUrl());
    }

    getUrl() {
        if (this.game.device.os.android) {
            return App.androidUrl;
        }

        return App.iosUrl;
    }

    complete() {}
}
