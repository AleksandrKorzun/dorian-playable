// import Utils from "../builder/Utils";
import Item from "./Item";
import Screen from "./Screen";
import { EVENTS, LAYERS_DEPTH } from "./constants/Constants";
// import { LOCAL } from "./constants/Local";
// import { AUDIO, SHEETS } from "./constants/assets";

export default class Items extends Phaser.GameObjects.Container {
  constructor(scene, items) {
    super(scene, 0, 0);
    this.tweens = scene.tweens;
    this.isPortrait = this.scene.game.size.isPortrait;
    this.choices = items;
    this.initAssets();
    this.initListeners();
    this.addItems();
    this.addHand();
  }

  initAssets() {
    this.addProperties(["pos", "scale"])
      .setCustomPosition(230, -100, 0, -100)
      .setCustomScale(1.2, 1.2, 1, 1)
      .setCustomAlign("Bottom")
      .setAlpha(0)
      .setDepth(LAYERS_DEPTH.TOP_ASSETS);
  }

  initListeners() {
    // this.scene.emitter.on(EVENTS.ON_ITEM_CLICK, this.onClick, this);
    // this.scene.emitter.on(EVENTS.REMOVE_UI_CONTAINER, this.removeItems, this);
  }

  show(options = {}) {
    this.tweens.add({
      targets: this,
      alpha: 1,
      duration: 500,
      delay: 750,
      ease: "Sine.out",
      ...options,
      onStart: () => {
        this.showItems();
        // Utils.addAudio(this.scene, AUDIO.TRANSITION, 0.8);
      },
    });
    return this;
  }

  addItems() {
    const version = window.App.version;
    const gap = this.isPortrait ? 100 : 40;
    const position = 100;
    this.stopItem = new Item(this.scene, this.choices[0])
      .setPosition(-1400, -200 - gap)
      .setAlpha(0);
    this.continueItem = new Item(this.scene, this.choices[1])
      .setPosition(1400, -200)
      .setAlpha(0);
    this.add([this.stopItem, this.continueItem]);
    this._sort();
    return this;
  }

  showItems() {
    this.tweens.timeline({
      tweens: [
        {
          targets: this.stopItem,
          y: -320,
          duration: 150,
          delay: 300,
          onStart: () => {
            this.showHand();
            this.stopItem.setAlpha(1);
          },
        },
        { targets: this.stopItem, x: 0, duration: 100 },
      ],
    });

    this.tweens.timeline({
      tweens: [
        {
          targets: this.continueItem,
          x: 80,
          duration: 300,
          delay: 450,
          onStart: () => this.continueItem.setAlpha(1),
        },
        { targets: this.continueItem, x: 0, duration: 100 },
      ],
    });
  }

  removeItems() {
    this.tweens.timeline({
      tweens: [
        {
          targets: this.stopItem,
          x: -80,
          duration: 100,
          delay: 300 /* onStart: () => */,
        },
        {
          targets: this.stopItem,
          x: 700,
          duration: 300,
          onComplete: () => this.stopItem.setAlpha(0),
        },
      ],
    });

    this.tweens.timeline({
      tweens: [
        {
          targets: this.continueItem,
          x: 80,
          duration: 100,
          delay: 500,
        },
        {
          targets: this.continueItem,
          x: -700,
          duration: 300,
          onComplete: () => {
            this.continueItem.setAlpha(0);
            this.setAlpha(0);
            this.scene.emitter.emit(EVENTS.NEXT_SCENE, this);
          },
        },
      ],
    });
    return this;
  }

  addHand() {
    this.handX = this.isPortrait ? 500 : -300;
    this.handY = this.isPortrait ? -100 : 300;
    this.hand = this.scene.add
      .image(0, 0, "atlas", "hand")
      .setDepth(LAYERS_DEPTH.HAND_TUTORIAL)
      .setPosition(this.handX, this.handY)
      .setAlpha(0)
      .setScale(1)
      .setAngle(10);
    // .setFlipX(this.isPortrait ? 0 : 1);
    this.add([this.hand]);
    this._sort();
  }

  showHand() {
    this.handYTop = -300;
    this.handYBottom = -150;
    this.tweens.add({
      targets: this.hand,
      alpha: 1,
      scale: this.isPortrait ? 0.9 : 1,
      //   x: this.isPortrait ? 190 : -140,
      x: 130,
      y: -300,
      duration: 500,
      delay: 300,
      onComplete: () => {
        this.addHandTutorial();
        // this.stopItem.addBoxInteractive();
        // this.continueItem.addBoxInteractive();
      },
    });
  }

  hideHand() {
    this.tweens.add({
      targets: this.hand,
      alpha: 0,
      scale: 1,
      x: 500,
      y: 300,
      duration: 500,
      delay: 300,
    });
  }

  addHandTutorial() {
    this.tweensHand = this.tweens.timeline({
      loop: -1,
      targets: this.hand,
      tweens: [
        {
          targets: this.hand,
          scale: this.isPortrait ? 0.8 : 0.9,
          yoyo: true,
          duration: 300,
          startDelay: 300,
          onStart: () => this.stopItem.addSelected(),
        },
        {
          delay: 300,
          duration: 300,
          y: this.handYBottom,
          onComplete: () => this.continueItem.addSelected(),
        },
        {
          targets: this.hand,
          scale: this.isPortrait ? 1 : 0.9,
          yoyo: true,
          duration: 300,
          startDelay: 300,
        },
        {
          delay: 300,
          duration: 300,
          y: this.handYTop,
          onComplete: () => this.stopItem.addSelected(),
        },
      ],
    });
  }

  removeHandTutorial() {
    this.hideHand();
    this.scene.tweens.remove(this.tweensHand);
    return this;
  }

  onClick() {
    this.removeHandTutorial();
    this.stopItem.removeItemInteractive();
    this.continueItem.removeItemInteractive();
  }
}
