import { appVersion, LAYERS, POSITIONS, USERS } from "./Constants";
import ParentScene from "../builder/components/Scene";
import Background from "../builder/components/Background";
import Heroes from "./Heroes";
import { Footer } from "./Footer";
import Chat from "./Chat";
// import Utils from "../builder/framework/Utils";

export default class Game extends ParentScene {
  create() {
    // this.addBg("bg_black", {isAdaptive: true});
    if (appVersion === "scenario_17") {
      this.addBg("bg_red", { isAdaptive: false });
    } else {
      this.addBg("bg_black", { isAdaptive: true });
    }
    this.addHeroes();
    this.addHeader();
    this.addFooter();
    // setTimeout(() => {
    //   this.createBeginChatScene();
    // }, 1000);
    this.hero = null;
  }
  addBg(bg, options = {}) {
    this[bg] = new Background(
      this,
      bg,
      options.isAdaptive,
      [1.5, 1.5, 1.5, 1.5]
    ).setDepth(2);
    this.mainContainer.add([this[bg]]);
    this.sort();
  }

  addHeroes() {
    console.log("first", POSITIONS.CARD);
    this.users = new Heroes(this, USERS, this.createBeginChatScene.bind(this))
      .addProperties(["pos", "scale"])
      .setCustomPosition(...POSITIONS.CARD)
      .setCustomAlign("Center")
      .setCustomScale(0.75, 0.75, 0.8, 0.8)
      .setDepth(LAYERS.USER);
    this.mainContainer.add([this.users]);
    this.sort();
  }

  createBeginChatScene() {
    this.bg_black.changeBackground("bg_white", true, [1.5, 1.5, 1.6, 1.6]);
    this.addChat();
    this.tweens.add({
      targets: [
        this.users.leather,
        this.users.mike,
        this.users.jay,
        this.users.ghost,
        this.footer,
        this.heart,
        this.title,
        this.users.matchImg,
      ],
      alpha: 0,
      duration: 200,
    });
    this.game.network.addClickToStore(this.bg_black);
  }
  addChat() {
    this.chat = new Chat(this)
      .addProperties(["pos", "scale"])
      .setCustomPosition(...POSITIONS.CHAT)
      .setCustomAlign("Center")
      .setCustomScale(0.8, 0.8, 1, 1)
      .setDepth(LAYERS.CHAT);
    this.mainContainer.add([this.chat]);
    this.sort();
  }
  addHeader() {
    this.heart = this.add
      .image(0, 0, "atlas", "heart")
      .addProperties(["pos"])
      .setDepth(LAYERS.TITLE)
      .setCustomScale(0.6, 0.6, 0.6, 0.6)
      .setCustomAlign("Top")
      .setCustomPosition(0, 70, 0, 70);

    this.title = this.add
      .sprite(0, 0, "title")
      .addProperties(["pos", "image"])
      .setDepth(LAYERS.TITLE)
      .setCustomScale(1, 1, 1, 1)
      .setCustomImage("title_h", "title_v")
      .setCustomAlign("Top")
      .setCustomPosition(0, 170, 0, 170);
    this.tweens.add({
      targets: this.title,
      scale: 1.1,
      duration: 700,
      yoyo: true,
      repeat: -1,
    });
    this.mainContainer.add([this.heart, this.title]);
    this.sort();
  }

  addFooter() {
    this.footer = new Footer(this)
      .addProperties(["pos"])
      .setCustomPosition(0, -50, 0, -50)
      .setCustomAlign("Bottom")
      .setDepth(LAYERS.ICON);
    this.mainContainer.add([this.footer]);
    this.sort();
  }
  openStore() {
    this.game.network.openStore();
  }
}
