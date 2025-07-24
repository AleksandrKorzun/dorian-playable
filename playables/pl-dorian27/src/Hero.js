import {
  appVersion,
  HEROES,
  POSITIONS,
  SCALES,
  TITLES,
} from "./constants/Constants";

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
      .setCustomAlign("Center")
      .setCustomScale(...SCALES.woman)
      .setCustomPosition(0, -80, 0, -80);
    // this.tweens.add({
    //   targets: this,
    //   px: 0,
    //   lx: 0,
    //   duration: 500,
    //   ease: "Sine.inOut",
    // });
  }
  addHeroes() {
    this.hero = this.scene.add.image(0, 0, "slusher").setScale(0.4).setDepth(5);
    this.title1 = this.scene.add.image(0, -680, "title1").setDepth(4);
    this.title2 = this.scene.add
      .image(0, 720, "title2")
      .setScale(0.5)
      .setDepth(4);
    this.add([this.hero, this.title1, this.title2]);
    this.sort();
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
