import { HEROES, SCALES } from "./constants/Constants";

export default class Hero extends Phaser.GameObjects.Container {
  constructor(scene, count) {
    super(scene, 0, 0);
    this.tweens = scene.tweens;

    this.addHeroes();
    this.initAssets();
  }
  initAssets() {
    this.addProperties(["pos", "scale"])
      .setDepth(7)
      .setCustomAlign("Bottom")
      .setCustomScale(...SCALES.woman)
      .setCustomPosition(-2700, 100, -2700, 50);
    this.tweens.add({
      targets: this,
      px: 0,
      lx: 0,
      duration: 500,
      ease: "Sine.inOut",
    });
  }
  addHeroes() {
    HEROES.forEach((hero, i) => {
      const x = this.scene.currentHero === i ? 0 : -2700;
      this[`hero${i}`] = this.scene.add
        .image(x, 0, hero)
        .setDepth(7)
        .setOrigin(0.5, 1);

      this[`title${i}`] = this.scene.add
        .image(0, -1000, `title${i + 1}`)
        .setDepth(8)
        .setScale(0)
        .setOrigin(0.5, 0);
      this.add([this[`hero${i}`], this[`title${i}`]]);
      this._sort();
    });
    this.scene.tweens.add({
      targets: [this[`title${this.scene.currentHero}`]],
      scale: 1.2,
      duration: 500,
      ease: "Sine.inOut",
      delay: 500,
    });
  }
  prevHero(curr, prev) {
    this.scene.tweens.add({
      targets: [this[`hero${curr}`]],
      x: 2700,
      duration: 500,
      onComplete: () => {
        this[`hero${curr}`].x = -2700;
      },
      ease: "Sine.inOut",
    });
    this.scene.tweens.add({
      targets: [this[`hero${prev}`]],
      onStart: () => {
        this[`hero${prev}`].x = -2700;
      },
      x: 0,
      duration: 500,
      ease: "Sine.inOut",
    });
    this.scene.tweens.add({
      targets: [this[`title${prev}`]],
      scale: 1.2,
      alpha: 1,
      duration: 200,
      delay: 200,
      ease: "Sine.inOut",
    });
    this.scene.tweens.add({
      targets: [this[`title${curr}`]],
      scale: 0,
      alpha: 0,
      duration: 200,
      ease: "Sine.inOut",
    });
  }

  nextHero(curr, prev) {
    this.scene.tweens.add({
      targets: [this[`hero${curr}`]],

      x: -2700,
      onComplete: () => {
        this[`hero${curr}`].x = 2700;
      },
      duration: 500,

      ease: "Sine.inOut",
    });

    this.scene.tweens.add({
      targets: [this[`title${prev}`]],
      scale: 1,
      alpha: 1,
      duration: 200,
      delay: 200,
      ease: "Sine.inOut",
    });
    this.scene.tweens.add({
      targets: [this[`title${curr}`]],
      scale: 0,
      alpha: 0,
      duration: 200,
      ease: "Sine.inOut",
    });
    this.scene.tweens.add({
      targets: [this[`hero${prev}`]],
      onStart: () => {
        this[`hero${prev}`].x = 2700;
      },

      x: 0,
      duration: 500,
      ease: "Sine.inOut",
    });
  }
}
