import Utils from "../builder/Utils";
import { LAYERS, USERS } from "./Constants";
import Hero from "./Hero";

export default class Heroes extends Phaser.GameObjects.Container {
  constructor(scene, users, action) {
    super(scene, 0, 0);
    this.tweens = scene.tweens;
    this.action = action;
    this.differenceX = 0;
    this.changedPhoto = false;
    this.isLikePhoto = false;
    this.arrOffsetY = [0, -75, -150, -150, -150, -150];
    this.arrScales = [1, 0.9, 0.8, 0.8, 0.8, 0.8];
    this.createUsers(users);
    this.addIcon();
    this.newPosX = 0;
    this.countSwipe = 0;
    // this.addMatchAnimation();
  }

  createUsers(users) {
    this.users = [];
    users.forEach((user, idx) => {
      this[`${user.PHOTO}`] = new Hero(this.scene, user)
        .setDepth(10 - idx)
        .setPosition(0, -100)
        .setScale(1);
      this.currentIdx = 0;
      this.users.push(`${user.PHOTO}`);
      if (idx === this.currentIdx) {
        this.currentPhoto = `${user.PHOTO}`;
        this[`${user.PHOTO}`].addFilter().addTutorialAnimation();
      }
      this.addInteractiveOnPhoto(`${user.PHOTO}`);
      this.add([this[`${user.PHOTO}`]]);
      this._sort();
    });
  }

  onCancelPhoto() {
    if (this.currentIdx === USERS.length - 1) {
      this.changedPhoto = false;
      return;
    }
    if (this.countSwipe >= 4) {
      this.scene.openStore();
    }
    this.countSwipe += 1;
    console.log("first", this.countSwipe);
    this.onPhotoClick();

    const cancelHero = this.users[this.currentIdx];
    console.log("cancelHero", cancelHero);
    this.tweens.add({
      targets: this[cancelHero],
      x: -2000,
      duration: 300,
      onStart: () => {
        this.changedPhoto = true;
      },
      onComplete: () => {
        this.changedPhoto = false;
      },
    });
    this.currentIdx += 1;
  }
  onReturnPhoto() {
    if (this.currentIdx === 0) {
      this.changedPhoto = false;
      return;
    }
    this.onPhotoClick();
    const returnHero = this.users[this.currentIdx - 1];
    this.tweens.add({
      targets: this[returnHero],
      x: 0,
      duration: 300,
      onStart: () => {
        this.changedPhoto = true;
      },
      onComplete: () => {
        this.changedPhoto = false;
      },
    });
    this.currentIdx -= 1;
  }

  onMatchPhoto() {
    this.scene.openStore();
    return;
    this.onPhotoClick();
    const matchHero = this.users[this.currentIdx];
    this.scene.title.destroy();
    this.tweens.add({
      targets: [this.cancel, this.return, this.match, this.scene.footer],
      alpha: 0,
      duration: 200,
    });
    this.tweens.add({
      targets: this[matchHero],
      y: -100,
      duration: 300,
      scale: 1.07,
      onComplete: () => {
        this.addMatchAnimation();
      },
    });
    setTimeout(() => {
      this.action();
    }, 2000);
  }
  addMatchAnimation() {
    const isPortrait = window.innerHeight > window.innerWidth;
    this.matchImg = this.scene.add
      .image(0, isPortrait ? 350 : 250, "match")
      .setDepth(100)
      .setAlpha(0)
      .setScale(50);

    this.tweens.add({
      targets: this.matchImg,
      alpha: 1,
      delay: 150,
      duration: 300,
      easy: "Power2",
    });
    this.tweens.add({
      targets: this.matchImg,
      scale: 1.1,
      duration: 300,
      easy: "Power2",
    });
    this.add([this.matchImg]);
    this._sort();
  }
  onPhotoClick() {
    this[this.currentPhoto].hideTutorial();
  }

  touchAndDragPhoto(prevPosition, position) {
    if (this.isLikePhoto || this.changedPhoto) return;
    const differenceX = position.x - prevPosition.x;
    this.changedPhoto = false;
    this.newPosX += differenceX;

    if (this.newPosX < -50) {
      this.onCancelPhoto();
      this.newPosX = 0;
    }
    if (this.newPosX > 50) {
      this.onMatchPhoto();
      this.isLikePhoto = true;
      this.newPosX = 0;
    }
  }

  addinteractiveNext() {
    this.nextUser();
    this.changedPhoto = true;
  }

  nextUser() {}

  addInteractiveOnPhoto(user) {
    this[user].photo.setInteractive().on("pointerdown", () => {
      this.onPhotoClick(user);
      this[user].photo
        .setInteractive()
        .on("pointermove", ({ prevPosition, position }) =>
          this.touchAndDragPhoto(prevPosition, position)
        );
    });
    // this[user].photo.setInteractive().on("pointerup", () => this.returnPhoto());
  }

  //   removePointerMove(user) {
  //     this[user].photo
  //       .setInteractive()
  //       .off("pointermove", ({ prevPosition, position }) => {
  //         this.touchAndDragPhoto(prevPosition, position);
  //       });
  //   }

  addIcon() {
    this.return = this.scene.add
      .image(-200, 200, "atlas", "return")
      .setScale(0.7)
      .setDepth(LAYERS.ICON);
    this.cancel = this.scene.add
      .image(-80, 200, "atlas", "cancel")
      .setScale(0.7)
      .setDepth(LAYERS.ICON);
    this.match = this.scene.add
      .image(80, 200, "atlas", "match")
      .setScale(0.7)
      .setDepth(LAYERS.ICON);

    this.cancel.setInteractive().on("pointerdown", () => this.onCancelPhoto());
    this.return.setInteractive().on("pointerdown", () => this.onReturnPhoto());
    this.match.setInteractive().on("pointerdown", () => this.scene.openStore());
    this.add([this.return, this.cancel, this.match]);
    this._sort();
  }
}
