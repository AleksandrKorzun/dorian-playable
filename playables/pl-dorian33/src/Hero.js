import { LAYERS } from "./Constants";

export default class Hero extends Phaser.GameObjects.Container {
  constructor(scene, user) {
    super(scene, 0, 0);
    this.tweens = scene.tweens;
    this.userData = user;
    this.skipInfo = false;
    this.photo = this.scene.add.image(0, 0, this.userData.PHOTO).setDepth(1);
    this.add([this.photo]);
    this._sort();
  }

  createUser() {
    this.user = this.add.image(0, 0, this.photo).setDepth(1);
    this.add([this.user]);
    this._sort();
    return this;
  }

  addFilter() {
    this.line = this.scene.add
      .image(0, 0, "atlas", "line")
      .setDepth(LAYERS.FILTER + 1)
      .setScale(1.48)
      .setAlpha(0);
    this.add([this.line]);
    this._sort();
    return this;
  }

  addTutorial() {
    this.skipHand = this.scene.add
      .image(0, -50, "atlas", "skip_hand")
      .setDepth(LAYERS.FILTER + 1)
      .setAngle(-30)
      .setScale(0.8)
      .setAlpha(0);
    this.likeHand = this.scene.add
      .image(0, -50, "atlas", "skip_hand")
      .setDepth(LAYERS.FILTER + 1)
      .setAngle(30)
      .setScale(0.8)
      .setAlpha(0)
      .setFlipX(true);
    this.likeIcon = this.scene.add
      .image(50, -120, "atlas", "skip_icon")
      .setDepth(LAYERS.FILTER + 1)
      .setScale(0)
      .setOrigin(0, 0.5);

    this.skipIcon = this.scene.add
      .image(-50, -120, "atlas", "skip_icon")
      .setDepth(LAYERS.FILTER + 1)
      .setScale(0)
      .setOrigin(0, 0.5)
      .setFlipX(true);
    this.like = this.scene.add
      .image(100, 50, "atlas", "like")
      .setDepth(LAYERS.FILTER + 1)
      .setAlpha(0);
    this.skip = this.scene.add
      .image(-100, 50, "atlas", "skip")
      .setDepth(LAYERS.FILTER + 1)
      .setAlpha(0);
    this.add([
      this.likeHand,
      this.skipHand,
      this.likeIcon,
      this.skipIcon,
      this.like,
      this.skip,
    ]);
    this._sort();
  }

  hideTutorial() {
    this.skipInfo = true;
    this.handRightAnim?.remove();
    this.handLeftAnim?.remove();
    this.iconRightAnim?.remove();
    this.iconLeftAnim?.remove();
    this.tweens.add({
      targets: [
        this.skipHand,
        this.skipIcon,
        this.skip,
        this.likeHand,
        this.likeIcon,
        this.like,
        this.line,
      ],
      alpha: 0,
      duration: 300,
    });
  }

  addLikeTutorialAnimation() {
    this.tweens.add({
      targets: [
        this.skipHand,
        this.skipIcon,
        this.skip,
        this.likeHand,
        this.likeIcon,
        this.like,
        this.line,
      ],
      alpha: 1,
      duration: 500,
    });
    this.handRightAnim = this.tweens.add({
      targets: [this.likeHand],
      angle: 60,
      x: 200,
      duration: 700,
      hold: 1000,
      repeat: -1,
    });
    this.handLeftAnim = this.tweens.add({
      targets: [this.skipHand],
      angle: -60,
      x: -200,
      duration: 700,
      hold: 1000,
      repeat: -1,
    });
    this.iconRightAnim = this.tweens.add({
      targets: [this.likeIcon],
      scale: 0.8,
      alpha: 1,
      duration: 700,
      hold: 1000,
      repeat: -1,
    });
    this.iconLeftAnim = this.tweens.add({
      targets: [this.skipIcon],
      scale: 0.8,
      duration: 700,
      hold: 1000,
      repeat: -1,
    });
  }
  addTutorialAnimation() {
    // this.setAlphaObject([this.filter, this.line], 1);
    this.addTutorial();
    this.addLikeTutorialAnimation();
  }

  handleChoice(isLiked) {
    const newOriginX = isLiked ? 1 : 0;
    const newOffsetX = isLiked ? 271 : -271;

    this.photo.setOrigin(newOriginX, 0.5);
    this.photo.x += newOffsetX;

    this.tweens.add({
      targets: this.photo,
      scaleX: 0,
      duration: 300,
    });
  }

  skipPhoto() {
    this.handleChoice(false);
  }

  likePhoto() {
    this.handleChoice(true);
  }
}
