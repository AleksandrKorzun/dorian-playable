import { LAYERS } from "./Constants";

export class Footer extends Phaser.GameObjects.Container {
  constructor(scene) {
    super(scene, 0, 0);
    this.tweens = scene.tweens;
    this.createFooter();
  }

  createFooter() {
    this.icon1 = this.scene.add
      .image(-160, 0, "atlas", "icon1")
      .setScale(0.6)
      .setDepth(LAYERS.ICON);
    this.icon2 = this.scene.add
      .image(-80, 0, "atlas", "icon2")
      .setScale(0.6)
      .setDepth(LAYERS.ICON);
    this.icon3 = this.scene.add
      .image(0, 0, "atlas", "icon3")
      .setScale(0.6)
      .setDepth(LAYERS.ICON);
    this.icon4 = this.scene.add
      .image(80, -5, "atlas", "icon4")
      .setScale(0.6)
      .setDepth(LAYERS.ICON);
    this.icon5 = this.scene.add
      .image(160, -5, "atlas", "icon5")
      .setScale(0.6)
      .setDepth(LAYERS.ICON);
    this.add([this.icon1, this.icon2, this.icon3, this.icon4, this.icon5]);
    this._sort();
  }
}
