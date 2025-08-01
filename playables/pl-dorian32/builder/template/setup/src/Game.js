import ParentScene from '../core/framework/components/Scene';

export default class Game extends ParentScene {
    create() {
        const sprite = this.add.image(0, 0, '').setCustomPosition(0, 0);

        this.mainContainer.add([sprite]);

        this.game.network.addClickToStore(sprite);
    }
}
