// import { SHEETS } from './constants/assets';

export default class Title extends Phaser.GameObjects.Container {
  constructor(scene, title) {
    super(scene, 0, 0);
    this.tweens = scene.tweens;
    this.addProperties(["pos", "scale"])
      .setCustomPosition(230, -70, 0, -70)
      .setCustomScale(0.7, 0.7, 0.5, 0.5)
      .setCustomAlign("Top")
      .setDepth(250)
      .setAlpha(1);
    this.isPortrait = this.scene.game.size.isPortrait;
    this.addTitle(title);
    this.show();
  }

  addTitle() {
    this.title = this.scene.add.image(0, 0, "title");
    // this.title_text = this.scene.add.image(0, 0, 'daub_text');
    this.scene.tweens.add({
      targets: this.title,
      scale: "*=0.9",
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: "Sine.in",
    });
    this.add([this.title]);
    this._sort();
  }

  show() {
    this.tweens.add({
      targets: this,
      alpha: 1,
      py: 70,
      ly: 70,
      duration: 500,
      ease: "Sine.out",
    });
    return this;
  }
  hide() {
    this.tweens.add({
      targets: this,
      alpha: 1,
      py: -270,
      ly: -270,
      duration: 500,
      ease: "Sine.out",
    });
    return this;
  }

  move() {
    this.tweens.add({
      targets: this,
      delay: 500,
      scale: "*=0.95",
      repeat: -1,
      yoyo: true,
      duration: 1500,
    });
  }

  remove() {
    this.tweens.add({
      targets: this,
      alpha: 0,
      duration: 300,
      ease: "Sine.out",
    });
  }

  blink() {
    this.show();
    setTimeout(() => this.remove(), 2500);
  }

  scaleTitle() {
    this.tweens.add({
      targets: this,
      scaleX: 0.3,
      duration: 700,
      ease: "Sine.out",
    });
  }
}
