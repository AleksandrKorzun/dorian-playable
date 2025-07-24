import Utils from "../builder/Utils";
import { ANIM_HAND_POSTIONS, LAYERS, USERS } from "./Constants";
import Hero from "./Hero";

export default class Heroes extends Phaser.GameObjects.Container {
  constructor(scene) {
    super(scene, 0, 0);
    this.tweens = scene.tweens;
    this.createHeroes();
    this.current = 0;
    this.addTutorial();
    this.addTutorialAnimation();
    this.isPortrait = window.innerWidth < window.innerHeight;
    // window.addEventListener("resize", () => this.onResize());
  }

  onResize() {
    // this.scene.tweens.killAll();
    this.handAnimMove.remove();
    this.handAnim.remove();
    this.curHeroHide.remove();
    this.curHeroShow.remove();
    this.circleScale.remove();
    this.circleShow.remove();

    this.hand.destroy();
    this.circle.destroy();
    const isPortrait = window.innerWidth < window.innerHeight;
    console.log("isPortrait", isPortrait);
    this.users.forEach((user, i) => {
      const x = isPortrait ? USERS[i].px : USERS[i].lx;
      const y = isPortrait ? USERS[i].py : USERS[i].ly;
      console.log("x", x);
      const scale = isPortrait ? 0.6 : 0.8;
      user.setPosition(x, y);
      user.setScale(scale);
      this[`${user.name}_hide`].setPosition(x, y);
      this[`${user.name}_hide`].setScale(scale);
    });
    // this.addTutorial();
    // this.addTutorialAnimation();
  }
  createHeroes() {
    this.users = [];
    const isPortrait = window.innerWidth < window.innerHeight;
    USERS.forEach((user) => {
      const x = isPortrait ? user.px : user.lx;
      const y = isPortrait ? user.py : user.ly;

      const scale = isPortrait ? 0.6 : 0.8;
      this[user.NAME] = this.scene.add
        .image(x, y, user.NAME)
        .setScale(scale)
        .setDepth(LAYERS.USER);
      this[user.NAME].setInteractive().on("pointerdown", () => {
        this.scene.openStore();
      });
      this[`${user.NAME}_hide`] = this.scene.add
        .image(x, y, "card_hide2")
        .setScale(scale)
        .setDepth(LAYERS.USER + 1);
      this[user.NAME].name = user.NAME;
      this.users.push(this[user.NAME]);
      this.add([this[user.NAME], this[`${user.NAME}_hide`]]);
    });
    this._sort();
  }

  addTutorial() {
    const { px, py } = ANIM_HAND_POSTIONS[this.current];

    this.hand = this.scene.add
      .image(px, py, "atlas", "hand")
      // .setOrigin(0, 0)
      .setDepth(441)
      .setAngle(90)
      .setScale(0.7);

    this.circle = this.scene.add
      .image(px - 50, py - 50, "atlas", "circle")
      .setDepth(440)
      .setAlpha(0)
      .setScale(0.2);
    // this.handAnim = this.scene.tweens.add({
    //   targets: this.hand,
    //   x: "-=10",
    //   y: "+=10",
    //   scale: "*=1.1",
    //   duration: 400,
    //   delay: 1000,
    // });
    // this.scene.tweens.add({
    //   targets: this.circle,
    //   scale: "*=1.7",
    //   duration: 400,
    //   delay: 1000,

    //   onComplete: () => {
    //     this.scene.tweens.add({
    //       targets: [this.circle, this.hand],
    //       alpha: 0,
    //       duration: 150,
    //     });
    //   },
    // });

    this.add([this.hand, this.circle]);
    this._sort();
  }

  addTutorialAnimation() {
    const { px, py, lx, ly } = ANIM_HAND_POSTIONS[this.current];
    const currentHero = this[`${USERS[this.current].NAME}_hide`];
    const isPortrait = window.innerWidth < window.innerHeight;
    const x = isPortrait ? px : lx;
    const y = isPortrait ? py : ly;
    const prevHero =
      this.current === 0
        ? this[`${USERS[USERS.length - 1].NAME}_hide`]
        : this[`${USERS[this.current - 1].NAME}_hide`];
    this.handAnimMove = this.tweens.add({
      targets: this.hand,
      x,
      y,
      duration: 500,
      easy: "Power2",
      onComplete: () => {
        this.circle.setPosition(x - 50, y - 50);
      },
    });
    this.handAnim = this.tweens.add({
      targets: this.hand,
      x: "-=10",
      y: "-=10",
      scale: 0.6,
      duration: 400,
      yoyo: true,
      delay: 500,
      // repeat: -1,
    });
    this.curHeroHide = this.tweens.add({
      targets: currentHero,
      alpha: 0,
      duration: 400,
      delay: 800,
      // repeat: -1,
    });
    this.curHeroShow = this.tweens.add({
      targets: prevHero,
      alpha: 1,
      duration: 400,
      delay: 800,
      // repeat: -1,
    });
    this.circleScale = this.tweens.add({
      targets: this.circle,
      scale: 0.35,
      duration: 400,
      delay: 800,
      // repeat: -1,
    });
    this.circleShow = this.tweens.add({
      targets: this.circle,
      alpha: 1,
      duration: 400,
      yoyo: true,
      delay: 800,
      // repeat: -1,
      onComplete: () => {
        this.current = this.current === USERS.length - 1 ? 0 : this.current + 1;
        setTimeout(() => {
          this.addTutorialAnimation();
        }, 2000);
      },
    });
  }
}
