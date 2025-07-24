import ParentScene from "../builder/components/Scene";
import Background from "../builder/components/Background";
import Items from "./Items";
import { appVersion } from "./constants/Constants";
import Balance from "./Balance";
import Hero from "./Hero";

export default class Game extends ParentScene {
  create() {
    this.addBackground("bg_purple", { isAdaptive: false });
    // this.addCTA();
    // this.initListeners();
    // this.addHero();
    this.sceneNum = 0;
    this.currentHero = 0;
    // this.onSwitchScene(SCENE[this.sceneNum]);
    this.addCharacter();
    this.addCTA();
    // this.addArrow();
    this.clickCount = 0;
    // this.addTitle();
    // Utils.addAudio(this, "soundtrack", 0.5, true);
    if (appVersion === "scenario18_auto_redirect") {
      setTimeout(() => this.openStore(), 10000);
    }
  }

  addBackground(bg, options = {}) {
    this.bg = new Background(this, bg, false[(1.5, 1.5, 1.1, 1.1)]).setDepth(
      options.depth || 4
    );
    this.mainContainer.add([this.bg]);
    this.sort();
  }
  addHero() {
    this.hero = this.add
      .image(0, 0, "slusher")
      .addProperties(["pos", "scale"])
      .setDepth(37)
      .setCustomAlign("Center")
      .setOrigin(0.5, 0.5)
      .setCustomScale(0.3, 0.3, 0.2, 0.2)
      .setCustomPosition(0, -100, 0, -100);
    this.title1 = this.add
      .image(0, 0, "title1")
      .addProperties(["pos", "scale"])
      .setDepth(37)
      .setCustomAlign("Top")
      .setOrigin(0.5, 0.5)
      .setCustomScale(0.3, 0.3, 0.7, 0.7)
      .setCustomPosition(0, 80, 0, 80);
    this.title2 = this.add
      .image(0, 0, "title2")
      .addProperties(["pos", "scale"])
      .setDepth(37)
      .setCustomAlign("Bottom")
      .setOrigin(0.5, 0.5)
      .setCustomScale(0.3, 0.3, 0.3, 0.3)
      .setCustomPosition(0, -200, 0, -200);
    this.mainContainer.add([this.hero, this.title1, this.title2]);
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
