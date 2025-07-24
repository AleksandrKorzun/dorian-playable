
export default class Background extends Phaser.GameObjects.Sprite {
    constructor(scene, sprite, isAdaptive, scales = [1, 1, 1, 1]) {
        super(scene, 0, 0, sprite);
        this.addProperties(['scale'])
            .setCustomPosition(0, 0)
            .setCustomScale(...scales);
        if (isAdaptive) {
            this.addProperties(['image']).setCustomImage(`${sprite}_horizontal`, `${sprite}_vertical`);
        }
    }

    changeBackground(newSprite, isAdaptive = false, scales = [1, 1, 1, 1]) {
        this.scene.cameras.main.fadeOut(500);
        const fadeIn = () => {
            this.scene.cameras.main.fadeIn(500);
            this.setTexture(newSprite).setCustomScale(...scales);
            if (!isAdaptive) {
                this.setCustomImage(newSprite, newSprite).setCustomScale(...scales);
                return;
            }

            this.addProperties(['image']);
            this.setCustomImage(`${newSprite}_horizontal`, `${newSprite}_vertical`).setCustomScale(...scales);
        };
        this.scene.time.delayedCall(500, fadeIn, [], this);
        return this;
    }
}
