import Utils from "../builder/Utils";
import { EVENTS, LAYERS_DEPTH } from "./constants/Constants";
// import { AUDIO, SHEETS } from "./constants/assets";

export default class Item extends Phaser.GameObjects.Container {
  constructor(scene, buttonImg) {
    super(scene, 0, 0);
    this.tweens = scene.tweens;
    this.buttonImg = buttonImg;
    this.isPortrait = this.scene.game.size.isPortrait;
    this.setScale(0.8);
    this.addBox().addBoxInteractive();
  }

  addTextTitle() {
    // this.text = this.scene.add
    //   .text(0, 0, this.buttonImg, {
    //     fontFamily: "NunitoSansRegular",
    //     fontSize: "36px",
    //     fontStyle: "normal",
    //     fill: "#FBFBFF",
    //     fontWeight: "400",
    //     textTransform: "uppercase",
    //     stroke: "#FF8FF4",
    //     strokeThickness: 1,
    //     lineSpacing: 1,
    //     lineHeight: "28px",
    //     testString: "24px",
    //   })
    //   .setPosition(0, 3)
    //   .setAlign("center")
    //   .setOrigin(0.5, 0.5)
    //   .setLineSpacing(2)
    //   .setDepth(LAYERS_DEPTH.TOP_ASSETS + 1);
    // this.add([this.text]);
    // this._sort();
    // return this;
  }

  addBox() {
    this.button = this.scene.add
      .image(0, 0, "atlas", this.buttonImg.name)
      .setDepth(LAYERS_DEPTH.ITEM_TEXT);
    this.add([this.button]);
    this._sort();
    return this;
  }

  addCustomShine() {
    this.button.postFX.addShine(0.5, 0.1, 1);
    // this.scene.time.delayedCall(2000, () => this.button.postFX.disable());
  }

  addBoxGlow() {
    this.boxGlow = this.scene.add
      .image(0, 0, "atlas", SHEETS.BUTTON_GLOW)
      .setDepth(LAYERS_DEPTH.ITEM_GLOW)
      .setAlpha(0);
    this.add([this.boxGlow]);
    this._sort();

    return this;
  }

  disable() {
    this.item.off("pointerdown");
    return this;
  }

  addSelected() {
    this.tweens.add({
      targets: this,
      scale: "-=0.08",
      yoyo: true,
      duration: 500,
      ease: "Sine.out",
      // onStart: () => {
      //     this.button.postFX.addShine(0.5, 0.1, 1);
      //     this.scene.time.delayedCall(1000, () => this.button.postFX.disable());
      // },
    });

    return this;
  }

  addBoxInteractive() {
    this.button.setInteractive().once(
      "pointerdown",
      () => {
        if (this.scene.sceneNum === 2) {
          this.scene.events.emit("second_click");
        }
        if (this.scene.sceneNum === 1) {
          this.scene.events.emit("first_click");
          this.scene.sceneNum = 2;
        }
      },
      this
    );
    return this;
  }

  removeItemInteractive() {
    this.button.disableInteractive();
  }

  onClick() {
    Utils.addAudio(this.scene, "error", 0.5, false);
    this.scene.countCoinsBet = this.buttonImg.cost;
    this.scene.emitter.emit(EVENTS.ON_CHOICE_CLICK);
  }
}
