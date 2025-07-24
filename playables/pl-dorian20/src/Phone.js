export default class Phone extends Phaser.GameObjects.Container {
  constructor(scene) {
    super(scene, 0, 0);
    this.tweens = scene.tweens;
    this.addProperties(["pos", "scale"])
      .setCustomPosition(0, -70, 0, -70)
      .setCustomScale(0.5, 0.5, 0.5, 0.5)
      .setCustomAlign("Center")
      .setDepth(250)
      .setAlpha(1);
    this.isPortrait = this.scene.game.size.isPortrait;
    this.addPhone();
    this.addHero();
    this.userChoice = "";
    setTimeout(() => {
      this.addTutorial();
    });
  }
  addPhone() {
    this.phone = this.scene.add.image(0, 0, "phone1").setDepth(1);
    this.perfect = this.scene.add.image(0, -600, "perfect").setDepth(2);
    this.add([this.phone, this.perfect]);
    this._sort();
  }
  addHero() {
    this.hero1 = this.scene.add
      .image(0, -200, "first")
      .setScale(0.8)
      .setDepth(3);
    this.hero2 = this.scene.add
      .image(0, 400, "second")
      .setScale(0.8)
      .setDepth(4);
    this.hero1.setInteractive().once("pointerdown", () => {
      this.onClickHero("hero1");
    });
    this.hero2.setInteractive().once("pointerdown", () => {
      this.onClickHero("hero2");
    });
    this.add([this.hero1, this.hero2]);
    this._sort();
  }
  onClickHero(hero) {
    this.userChoice = hero;
    this.tweensHand.stop();
    this.hero2.preFX.remove(this.hero2Glow);
    this.hero1.preFX.remove(this.hero1Glow);
    this.hand.destroy();
    this.addChoice();
  }
  addTutorial() {
    this.hand = this.scene.add
      .image(200, 0, "atlas", "hand")
      .setScale(2)
      .setAngle(15)
      .setDepth(25);
    this.add([this.hand]);
    this._sort();

    this.tweensHand = this.scene.tweens.chain({
      loop: -1,
      targets: this.hand,
      tweens: [
        {
          targets: this.hand,
          scale: 1.8,
          yoyo: true,
          duration: 300,
          startDelay: 300,
          onStart: () => {
            this.hero2Glow = this.hero1.preFX.addGlow(
              0xffffff,
              4,
              4,
              false,
              0.5,
              24
            );
          },
          onComplete: () => this.hero1.preFX.remove(this.hero2Glow),
        },
        {
          delay: 300,
          duration: 300,
          y: 500,
          // onComplete: () => this.continueItem.addSelected(),
        },
        {
          targets: this.hand,
          scale: 1.8,
          yoyo: true,
          duration: 300,
          startDelay: 300,
          onStart: () => {
            this.hero2Glow = this.hero2.preFX.addGlow(
              0xffffff,
              4,
              4,
              false,
              0.5,
              24
            );
          },
          onComplete: () => this.hero2.preFX.remove(this.hero2Glow),
        },
        {
          delay: 300,
          duration: 300,
          y: 0,
          // onComplete: () => this.stopItem.addSelected(),
        },
      ],
    });
  }

  addChoice() {
    const deletedHero = this.userChoice === "hero1" ? this.hero2 : this.hero1;
    this.scene.tweens.add({
      targets: [this.perfect, deletedHero],
      alpha: 0,
      duration: 200,
    });
    this.scene.tweens.add({
      targets: this[this.userChoice],
      y: -420,
      x: -50,
      scale: 0.8,
      duration: 400,
      ease: "sign.in",
    });
    this.question = this.scene.add
      .image(-170, -170, "text1")
      .setOrigin(0.2, 0)
      .setScale(0)
      .setDepth(4);
    this.responde = this.scene.add
      .image(0, 140, "responde")
      .setScale(1)
      .setAlpha(0)
      .setDepth(4);
    this.answer1 = this.scene.add
      .image(180, 450, "choice_1")
      .setScale(0)
      .setOrigin(0.8, 1)
      .setDepth(4);
    this.answer2 = this.scene.add
      .image(180, 650, "choice_2")
      .setScale(0)
      .setOrigin(0.8, 1)
      .setDepth(4);
    this.answer1
      .setInteractive()
      .once("pointerdown", () => this.onChoiceClick("choice1"));
    this.answer2
      .setInteractive()
      .once("pointerdown", () => this.onChoiceClick("choice2"));
    this.add([this.question, this.answer1, this.answer2, this.responde]);
    this._sort();
    this.scene.tweens.add({
      targets: this.question,
      scale: 0.8,
      duration: 300,
    });
    this.scene.tweens.add({
      targets: this.responde,
      alpha: 1,
      duration: 300,
    });
    this.scene.tweens.add({
      targets: [this.answer1, this.answer2],
      scale: 0.8,
      duration: 300,
      delay: 300,
    });
  }
  onChoiceClick(choice) {
    const deletedChoice = choice === "choice1" ? this.answer2 : this.answer1;
    const current = choice === "choice2" ? this.answer2 : this.answer1;
    this.scene.tweens.add({
      targets: current,
      y: 220,
      duration: 300,
    });
    this.scene.tweens.add({
      targets: [deletedChoice, this.responde],
      alpha: 0,
      duration: 300,
    });
    const blur = this.userChoice === "hero1" ? "first_2" : "second_2";
    this.blurImage = this.scene.add
      .image(-50, 450, blur)
      .setScale(0)
      .setDepth(5);
    this.blurbtn = this.scene.add
      .image(-50, 450, "unblur")
      .setScale(0)
      .setDepth(5);
    this.blurImage
      .setInteractive()
      .on("pointerdown", () => this.scene.openStore());
    this.blurImage.preFX.addBlur();
    this.scene.tweens.add({
      targets: [this.blurImage, this.blurbtn],
      scale: 0.8,
      duration: 300,
      delay: 200,
    });
    this.scene.tweens.add({
      targets: [this.blurbtn],
      scale: 0.7,
      duration: 300,
      delay: 200,
      repeat: -1,
      delay: 600,
      yoyo: true,
    });
    this.add([this.blurImage, this.blurbtn]);
    this._sort();
  }
}
