import Item from "./Item";
import { EVENTS, LAYERS_DEPTH } from "./constants/Constants";

export default class Items extends Phaser.GameObjects.Container {
  constructor(scene, items) {
    super(scene, 0, 0);
    this.scene = scene;
    this.choices = items;
    this.isPortrait = this.scene.game.size.isPortrait;
    this.tweens = scene.tweens;

    this.initAssets();
    this.initListeners();
    this.addItems();
    this.addHand();
  }

  initAssets() {
    const y = this.scene.sceneNum === 1 ? 50 : 170;
    this.addProperties(["pos", "scale"])
      .setCustomPosition(0, y, 0, 0)
      .setCustomScale(1.2, 1.2, 1, 1)
      .setCustomAlign("Bottom")
      .setAlpha(0)
      .setDepth(100);
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
      onStart: () => this.showItems(),
    });
    return this;
  }
  hide(options = {}) {
    this.tweens.add({
      targets: this,
      alpha: 0,
      duration: 500,
      delay: 750,
      ease: "Sine.out",
      ...options,
      onStart: () => this.removeItems(),
    });
    return this;
  }

  addItems() {
    const gap = this.isPortrait ? 100 : 40;
    const y = this.isPortrait ? -200 : -200;

    if (this.choices.length === 3) {
      const startX = -220;
      const x = [-200, 0, 200];
      this.items = this.choices.map((data, i) => {
        const item = new Item(this.scene, data)
          .setAlpha(0)
          .setScale(0.6)
          .setPosition(x[i], y);
        this.add(item);
        return item;
      });
    } else {
      this.stopItem = new Item(this.scene, this.choices[0])
        .setPosition(-1400, y - gap)
        .setAlpha(0);
      this.continueItem = new Item(this.scene, this.choices[1])
        .setPosition(1400, y)
        .setAlpha(0);
      this.add([this.stopItem, this.continueItem]);
    }

    this._sort();
    return this;
  }

  showItems() {
    if (this.choices.length === 3) {
      this.items.forEach((item, index) => {
        this.tweens.add({
          targets: item,
          x: item.x,
          alpha: 1,
          duration: 300,
          delay: 300 + index * 150,
          onStart: () => {
            if (index === 0) this.showHand();
          },
        });
      });
    } else {
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
  }

  removeItems() {
    if (this.choices.length === 3) {
      this.items.forEach((item, i) => {
        this.tweens.add({
          targets: item,
          x: (i % 2 === 0 ? -1 : 1) * 700,
          alpha: 0,
          duration: 400,
          delay: i * 150,
        });
      });

      this.tweens.add({
        targets: this,
        alpha: 0,
        delay: 600,
        onComplete: () => {
          this.scene.emitter.emit(EVENTS.NEXT_SCENE, this);
        },
      });
    } else {
      this.tweens.timeline({
        tweens: [
          {
            targets: this.stopItem,
            x: -80,
            duration: 100,
            delay: 300,
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
    }

    return this;
  }

  addHand() {
    this.handX = this.isPortrait ? 500 : -300;
    this.handY = this.isPortrait ? -100 : -190;
    this.hand = this.scene.add
      .image(0, 0, "atlas", "hand")
      .setDepth(LAYERS_DEPTH.HAND_TUTORIAL)
      .setPosition(this.handX, this.handY)
      .setAlpha(0)
      .setScale(1)
      .setAngle(10);
    this.add(this.hand);
    this._sort();
  }

  showHand() {
    this.handYTop = -100;
    this.handYBottom = -320;

    this.tweens.add({
      targets: this.hand,
      alpha: 1,
      scale: this.isPortrait ? 0.9 : 1,
      x: 130,
      y: this.handYTop,
      duration: 500,
      delay: 300,
      onComplete: () => {
        this.addHandTutorial();
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
    if (this.choices.length === 3) {
      let index = 0;
      this.tweensHand = this.tweens.addCounter({
        from: 0,
        to: 1,
        duration: 1000,
        repeat: -1,
        onRepeat: () => {
          const item = this.items[index];
          this.tweens.add({
            targets: this.hand,
            x: item.x,
            y: item.y + 50,
            duration: 300,
            onStart: () => item.addSelected(),
          });
          index = (index + 1) % 3;
        },
      });
    } else {
      this.tweensHand = this.tweens.timeline({
        loop: -1,
        targets: this.hand,
        tweens: [
          {
            scale: this.isPortrait ? 0.8 : 0.9,
            yoyo: true,
            duration: 300,
            startDelay: 300,
            onStart: () => this.continueItem.addSelected(),
          },
          {
            delay: 300,
            duration: 300,
            y: this.handYBottom,
            onComplete: () => this.stopItem.addSelected(),
          },
          {
            scale: this.isPortrait ? 1 : 0.9,
            yoyo: true,
            duration: 300,
            startDelay: 300,
          },
          {
            delay: 300,
            duration: 300,
            y: -190,
            onComplete: () => this.continueItem.addSelected(),
          },
        ],
      });
    }
  }

  removeHandTutorial() {
    this.hideHand();
    if (this.tweensHand) this.scene.tweens.remove(this.tweensHand);
    return this;
  }

  onClick() {
    this.removeHandTutorial();

    if (this.choices.length === 3) {
      this.items.forEach((item) => item.removeItemInteractive());
    } else {
      this.stopItem.removeItemInteractive();
      this.continueItem.removeItemInteractive();
    }
  }
}
