import { LAYERS, POSITIONS, USERS } from "./Constants";
import ParentScene from "../builder/components/Scene";
import Background from "../builder/components/Background";
import Heroes from "./Heroes";
import { Footer } from "./Footer";

export default class Game extends ParentScene {
  create() {
    this.addBg("bg_black");
    this.addHeroes();
    this.addHeader();
    this.addFooter();
    this.hero = null;
    window.addEventListener("resize", this.onResize.bind(this));
    // setTimeout(() => this.openStore(), 8000);
  }
  onResize() {
    this.heroes.destroy();
    setTimeout(() => this.addHeroes(), 10);
  }
  addBg(bg) {
    this[bg] = new Background(this, bg, true, [1.5, 1.5, 1.5, 1.5]).setDepth(2);
    this.mainContainer.add([this[bg]]);
    this.sort();
  }

  addHeroes() {
    this.heroes = new Heroes(this)
      .addProperties(["pos", "scale"])
      .setCustomPosition(0, 0, 0, 0)
      .setCustomAlign("Center")
      .setCustomScale(0.75, 0.75, 0.8, 0.8)
      .setDepth(LAYERS.USER);
    this.mainContainer.add([this.heroes]);
    this.sort();
  }

  addHeader() {
    this.title = this.add
      .sprite(0, 0, "title")
      .addProperties(["pos", "image"])
      .setDepth(LAYERS.TITLE)
      .setCustomScale(1, 1, 1, 1)
      .setCustomImage("title_h", "title_v")
      .setCustomAlign("Top")
      .setCustomPosition(0, 70, 0, 70);
    this.tweens.add({
      targets: this.title,
      scale: 1.1,
      duration: 700,
      yoyo: true,
      repeat: -1,
    });
    this.mainContainer.add([this.title]);
    this.sort();
  }

  addFooter() {
    this.play = this.add
      .image(0, 0, "atlas", "play")
      .addProperties(["pos"])
      .setCustomPosition(0, -40, 0, -40)
      .setCustomAlign("Bottom")
      .setScale(0.8)
      .setDepth(LAYERS.ICON);
    this.play_glow = this.add
      .image(0, 0, "atlas", "play_glow")
      .addProperties(["pos"])
      .setCustomPosition(0, -70, 0, -70)
      .setCustomAlign("Bottom")
      .setScale(0.8)
      .setDepth(LAYERS.ICON - 1);
    this.tweens.add({
      targets: this.play_glow,
      alpha: 0.5,
      duration: 500,
      yoyo: true,
      repeat: -1,
    });
    this.play.setInteractive().on("pointerdown", this.openStore.bind(this));
    this.mainContainer.add([this.play, this.play_glow]);
    this.sort();
  }
  openStore() {
    this.game.network.openStore();
  }
}
