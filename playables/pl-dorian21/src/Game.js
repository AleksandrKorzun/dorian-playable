import ParentScene from "../builder/components/Scene";
import Background from "../builder/components/Background";
import { appVersion } from "./constants/Constants";
import Balance from "./Balance";
import Phone from "./Phone";

export default class Game extends ParentScene {
  create() {
    this.addBackground("bg", { isAdaptive: true });
    this.addHero();
  }

  addBackground(bg, options = {}) {
    this.bg = new Background(this, bg, true, [1.5, 1.5, 1.1, 1.1]).setDepth(
      options.depth || 4
    );
    this.mainContainer.add([this.bg]);
    this.sort();
  }

  addHero() {
    this.hero = this.add
      .image(0, 0, "main")
      .addProperties(["pos", "scale"])
      .setDepth(37)
      .setCustomAlign("Bottom")
      .setOrigin(0.5, 0.5)
      .setCustomScale(0.3, 0.3, 0.3, 0.3)
      .setCustomPosition(0, -420, 0, -550);
    this.text = this.add
      .image(0, 0, "text")
      .addProperties(["pos", "scale"])
      .setDepth(37)
      .setCustomAlign("Center")
      .setOrigin(0.5, 0.5)
      .setCustomScale(0.5, 0.5, 0.5, 0.5)
      .setCustomPosition(0, 100, 0, 100);
    this.button = this.add
      .image(0, 0, "button")
      .addProperties(["pos", "scale"])
      .setDepth(37)
      .setCustomAlign("Bottom")
      .setOrigin(0.5, 0.5)
      .setCustomScale(0.8, 0.8, 0.8, 0.8)
      .setCustomPosition(0, -100, 0, -100);
    this.button.setInteractive().on("pointerdown", () => this.openStore());
    this.tweens.add({
      targets: this.button,
      scale: 0.75,
      duration: 400,
      yoyo: true,
      repeat: -1,
    });
    this.mainContainer.add([this.hero, this.text, this.button]);
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
