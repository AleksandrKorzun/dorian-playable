import { LAYERS, USERS } from "./Constants";

export default class Chat extends Phaser.GameObjects.Container {
  constructor(scene) {
    super(scene, 0, 0);
    this.tweens = scene.tweens;
    this.addMessage();
    this.addHeader();
    this.addChoices();
    this.showMessageAnimation(this.iconHero1, this.message1);
    setTimeout(() => {
      this.showMessageAnimation(this.iconHero2, this.message2);
    }, 500);
  }

  addMessage() {
    this.iconHero1 = this.scene.add
      .image(
        -200,
        -180,
        "atlas",
        `${USERS[this.scene.users.currentIdx].PHOTO}_icon`
      )
      .setDepth(10)
      .setScale(0);
    this.message1 = this.scene.add
      .image(-160, -150, "message")
      .setScale(0)
      .setOrigin(0, 1)
      .setDepth(10);
    this.iconHero2 = this.scene.add
      .image(
        -200,
        120,
        "atlas",
        `${USERS[this.scene.users.currentIdx].PHOTO}_icon`
      )
      .setDepth(10)
      .setScale(0);
    this.message2 = this.scene.add
      .image(-160, 150, "photo")
      .setScale(0)
      .setOrigin(0, 1)
      .setDepth(10);
    this.add([this.message1, this.iconHero1, this.message2, this.iconHero2]);
    this._sort();
  }
  addChoices() {
    this.choice1 = this.scene.add
      .image(0, 240, "atlas", "choice_1")
      .setDepth(10)
      .setScale(0);
    this.choice2 = this.scene.add
      .image(0, 340, "atlas", "choice_2")
      .setDepth(10)
      .setScale(0);
    this.hand = this.scene.add
      .image(150, 280, "atlas", "hand")
      .setDepth(10)
      .setAngle(100)
      .setAlpha(0)
      .setScale(0.6);
    this.tweens.add({
      targets: [this.choice1, this.choice2],
      scale: 1.2,
      duration: 300,
      easy: "Power2",
      delay: 2000,
    });
    this.tweens.add({
      targets: this.hand,
      alpha: 1,
      duration: 300,
      easy: "Power2",
      delay: 2000,
    });
    this.tweens.add({
      targets: this.hand,
      y: 420,
      duration: 700,
      easy: "Power2",
      yoyo: true,
      repeat: -1,
      delay: 2000,
    });
    this.add([this.choice1, this.choice2, this.hand]);
    this._sort();
  }
  addHeader() {
    const heroName =
      USERS[this.scene.users.currentIdx].PHOTO.charAt(0).toUpperCase() +
      USERS[this.scene.users.currentIdx].PHOTO.slice(1);
    this.progress = this.scene.add
      .image(0, 0, "progress")
      .addProperties(["pos"])
      .setCustomPosition(0, 0, 0, 0)
      .setOrigin(0.5, 0)
      .setCustomScale(1.2, 1.2, 1.2, 1.2)
      .setCustomAlign("Top")
      .setAlpha(0)
      .setDepth(LAYERS.CHAT);
    this.iconHero = this.scene.add
      .image(0, 0, "atlas", `${USERS[this.scene.users.currentIdx].PHOTO}_icon`)
      .addProperties(["pos"])
      .setCustomPosition(0, 60, 0, 60)
      .setCustomAlign("Top")
      .setDepth(LAYERS.CHAT)
      .setAlpha(0)
      .setScale(0.8);
    this.heroName = this.scene.add
      .text(0, 0, heroName, {
        font: `55px bold RobotoExtraBold`,
        fill: "#000000",
      })
      .addProperties(["pos"])
      .setCustomPosition(0, 140, 0, 140)
      .setCustomAlign("Top")
      .setOrigin(0.5, 0.5)
      .setAlpha(0)
      .setDepth(LAYERS.CHAT);
    this.inputField = this.scene.add
      .image(0, 0, "send_field")
      .addProperties(["pos"])
      .setCustomPosition(0, -20, 0, -20)
      .setCustomAlign("Bottom")
      .setOrigin(0.5, 1)
      .setDepth(LAYERS.CHAT)
      .setAlpha(0)
      .setScale(1.2);
    this.tweens.add({
      targets: [this.inputField, this.progress, this.iconHero, this.heroName],
      alpha: 1,
      duration: 300,
      easy: "Power2",
      delay: 1000,
    });
    this.scene.mainContainer.add([
      this.progress,
      this.iconHero,
      this.heroName,
      this.inputField,
    ]);
    this.scene.sort();
  }
  showMessageAnimation(icon, message) {
    this.tweens.add({
      targets: message,
      scale: 1,
      duration: 300,
      easy: "Power2",
      delay: 1000,
    });
    this.tweens.add({
      targets: icon,
      scale: 0.5,
      duration: 300,
      easy: "Power2",
      delay: 1000,
    });
  }
}
