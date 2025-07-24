import ParentScene from "../builder/components/Scene";
import Background from "../builder/components/Background";
import Items from "./Items";
import { appVersion } from "./constants/Constants";
import Balance from "./Balance";
import Hero from "./Hero";
import Title from "./Title";

export default class Game extends ParentScene {
  create() {
    // this.addBackground("bg", { isAdaptive: true });
    this.addImg();
    this.sceneNum = 1;
    this.addTitle();
    this.addUIContainer([
      { name: "choice1_1", cost: 0.2 },
      { name: "choice1_2", cost: -0.2 },
      { name: "choice1_3", cost: -0.2 },
    ]);
    this.events.on("first_click", () => {
      this.secondScene();
    });
    this.events.on("second_click", () => {
      this.finalScene();
    });
    // this.addButton();
  }

  secondScene() {
    this.title.hide();
    this.uiContainer.hide();
    setTimeout(() => {
      this.tweens.add({
        targets: this.mainImg,
        pScaleX: 0.41,
        pScaleY: 0.41,
        lScaleX: 0.41,
        lScaleY: 0.41,
        // py: 100,
        // ly: 100,

        duration: 700,
      });
    }, 1000);
    setTimeout(() => {
      this.addText();
    }, 1500);
    setTimeout(() => {
      this.addUIContainer([
        { name: "choice2_1", cost: 0.2 },
        { name: "choice2_2", cost: -0.2 },
      ]);
    }, 1500);
  }
  finalScene() {
    this.uiContainer.hide();
    this.tweens.add({
      targets: this.slasherText,
      alpha: 0,
      duration: 300,
    });

    this.tweens.add({
      targets: this.mainImg,
      pScaleX: 0.3,
      pScaleY: 0.3,
      lScaleX: 0.3,
      lScaleY: 0.3,
      delay: 500,
      // py: 100,
      // ly: 100,

      duration: 700,
      onComplete: () => {
        this.addBackground("bg_hide", { isAdaptive: false, depth: 300 });
        this.addButton();
      },
    });
  }
  addButton() {
    this.cta = this.add
      .image(0, 0, "atlas", "download")
      .addProperties(["pos", "scale"])
      .setCustomPosition(0, -100, 0, -100)
      .setCustomScale(0.65, 0.65, 0.65, 0.65)
      .setCustomAlign("Bottom")
      .setAlpha(1)
      .setDepth(400);
    this.tweens.add({
      targets: this.cta,
      pScaleX: 0.6,
      pScaleY: 0.6,
      lScaleX: 0.6,
      lScaleY: 0.6,
      delay: 500,
      yoyo: true,
      repeat: -1,
      // py: 100,
      // ly: 100,

      duration: 700,
    });
    this.cta.setInteractive().on("pointerdown", () => this.openStore());
    this.mainContainer.add([this.cta]);
    this.sort();
  }
  addText() {
    this.slasherText = this.add
      .image(0, 0, "text")
      .addProperties(["pos", "scale"])
      .setCustomPosition(0, 0, 0, 0)
      .setCustomScale(0.45, 0.45, 0.45, 0.45)
      .setCustomAlign("Center")
      .setAlpha(1)
      .setDepth(100);
    this.mainContainer.add([this.slasherText]);
    this.sort();
  }
  addBackground(bg, options = {}) {
    this.bg = new Background(
      this,
      bg,
      options.isAdaptive,
      [1.5, 1.5, 1.1, 1.1]
    ).setDepth(options.depth || 4);
    this.mainContainer.add([this.bg]);
    this.sort();
  }
  addImg() {
    this.mainImg = this.add
      .image(0, 0, "slusher")
      .addProperties(["pos", "scale"])
      .setDepth(37)
      .setCustomAlign("Center")
      .setOrigin(0.5, 0.5)
      .setCustomScale(0.3, 0.3, 0.3, 0.3)
      .setCustomPosition(0, 0, 0, 0);
    this.mainContainer.add([this.mainImg]);
    this.sort();
  }
  addTitle() {
    this.title = new Title(this);
    this.mainContainer.add([this.title]);

    this.sort();
  }
  addUIContainer(options) {
    this.uiContainer = new Items(this, options);
    this.mainContainer.add([this.uiContainer]);
    this.sort();
    this.uiContainer.show();
  }
  addBalance(options) {
    this.balance = new Balance(this, options);
    this.mainContainer.add([this.balance]);
    this.sort();
  }

  addCharacter() {
    this.heroes = new Hero(this);
    this.mainContainer.add([this.heroes]);
    this.sort();
  }
  addArrow() {
    this.arrowRight = this.add
      .image(0, 0, "atlas", "arrow")
      .addProperties(["pos", "scale"])
      .setDepth(37)
      .setCustomAlign("Center")
      .setOrigin(0.5, 0.5)
      .setFlipX(true)
      .setCustomScale(0.5, 0.5, 0.5, 0.5)
      .setCustomPosition(-350, 0, -220, -100);

    this.arrowRight.setInteractive().on("pointerdown", () => {
      if (this.clickCount >= 4) {
        this.openStore();
        return;
      }
      this.heroes.nextHero(
        this.currentHero,
        this.currentHero === 3 ? 0 : this.currentHero + 1
      );
      this.currentHero = this.currentHero === 3 ? 0 : this.currentHero + 1;
      this.clickCount += 1;
    });

    this.arrowLeft = this.add
      .image(0, 0, "atlas", "arrow")
      .addProperties(["pos", "scale"])
      .setDepth(37)
      .setCustomAlign("Center")
      .setOrigin(0.5, 0.5)
      .setCustomScale(0.5, 0.5, 0.5, 0.5)
      .setCustomPosition(350, 0, 220, -100);

    this.arrowLeft.setInteractive().on("pointerdown", () => {
      if (this.clickCount >= 4) {
        this.openStore();
        return;
      }
      this.heroes.prevHero(
        this.currentHero,
        this.currentHero === 0 ? 3 : this.currentHero - 1
      );
      this.currentHero = this.currentHero === 0 ? 3 : this.currentHero - 1;
      this.clickCount += 1;
    });
    this.mainContainer.add([this.arrowLeft, this.arrowRight]);
    this.sort();
  }
  addCTA() {
    // this.couple = this.add
    //   .image(0, 0, "atlas", "couple")
    //   .addProperties(["pos", "scale"])
    //   .setDepth(37)
    //   .setCustomAlign("Bottom")
    //   .setOrigin(0.5, 0.5)
    //   .setCustomScale(0.6, 0.6, 0.5, 0.5)
    //   .setCustomPosition(0, -200, 0, -200);
    // this.couple_glow = this.add
    //   .image(0, 0, "atlas", "glow")
    //   .addProperties(["pos", "scale"])
    //   .setDepth(35)
    //   .setCustomAlign("Bottom")
    //   .setOrigin(0.5, 0.5)
    //   .setCustomScale(0.6, 0.6, 0.5, 0.5)
    //   .setCustomPosition(0, -215, 0, -215);

    this.play = this.add
      .image(0, 0, "try")
      .addProperties(["pos", "scale"])
      .setDepth(37)
      .setCustomAlign("Bottom")
      .setOrigin(0.5, 0.5)
      .setCustomScale(0.7, 0.7, 0.7, 0.7)
      .setCustomPosition(0, -70, 0, -70);
    this.play_glow = this.add
      .image(0, 0, "try_glow")
      .addProperties(["pos", "scale"])
      .setDepth(35)
      .setCustomAlign("Bottom")
      .setOrigin(0.5, 0.5)
      .setAlpha(0)
      .setCustomScale(0.7, 0.7, 0.7, 0.7)
      .setCustomPosition(0, -70, 0, -70);
    // this.couple.setInteractive().on("pointerdown", this.openStore, this);
    this.play.setInteractive().on("pointerdown", this.openStore, this);
    this.tweens.add({
      targets: [this.play, this.play_glow],
      scale: "*=0.9",
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: "Sine.in",
    });
    // this.tweens.add({
    //   targets: [this.play_glow, this.couple_glow],
    //   alpha: 0.5,
    //   duration: 500,
    //   yoyo: true,
    //   repeat: -1,
    //   ease: "Sine.in",
    // });

    this.mainContainer.add([
      // this.couple,
      this.play,
      this.play_glow,
      // this.couple_glow,
    ]);
    this.sort();
  }

  openStore() {
    this.game.network.openStore();
  }
}
