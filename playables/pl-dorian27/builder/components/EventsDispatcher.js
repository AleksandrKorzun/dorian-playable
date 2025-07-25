/* global Phaser */

let instance = null;

export const EVENTS_DEFAULT = {
    ON_ITEM_CLICK: 'onItemClick',
    BG_CHANGED: 'backgroundChanged',
    OPEN_STORE: 'openStore',
    NEXT_SCENE: 'nextScene',
    BUTTON_PRESSED: 'button_pressed',
    CHARACTER_ANIMATION_COMPLETE: 'character_animation_complete',
};

export default class EventDispatcher extends Phaser.Events.EventEmitter {
    static get Instance() {
        if (instance === null) {
            instance = new EventDispatcher();
        }

        return instance;
    }
}
