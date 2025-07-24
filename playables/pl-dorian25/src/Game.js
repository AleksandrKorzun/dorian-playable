import ParentScene from "../builder/components/Scene";
import Background from "../builder/components/Background";
import { appVersion } from "./constants/Constants";
import Balance from "./Balance";
import Phone from "./Phone";
import Title from "./Title";
import {
  CHOICES1,
  CHOICES2,
  CHOICES3,
} from "../../pl-dorian2/src/constants/Constants";
import Choices from "./Choices";
import ProgressBar from "./ProgressBar";

export default class Game extends ParentScene {
  create() {
    this.addBackground("bg", { isAdaptive: true });
    // this.addCTA();
    this.addTitle("title1");
    this.addChoices(CHOICES1, true);
    this.addButton();
    this.events.on("active", () => this.continue.setAlpha(1));
    this.events.on("disable", () => this.continue.setAlpha(0));
    this.sceneNum = 1;
    this.isMan = false;
    this.addProgress();
    this.progressCounter = 0;
    // this.onFinalScene();
  }

  addBackground(bg, options = {}) {
    this.bg = new Background(this, bg, true, [1.3, 1.1, 0.8, 0.8]).setDepth(
      options.depth || 4
    );
    this.mainContainer.add([this.bg]);
    this.sort();
  }

  addTitle(title) {
    this.title = new Title(this, title);
    this.mainContainer.add([this.title]);
    this.sort();
  }

  addChoices(choices, isMany) {
    this.choices = new Choices(this, choices, isMany);
    this.mainContainer.add([this.choices]);
    this.sort();
  }
  addProgress() {
    this.progress = new ProgressBar(this, this.progressCounter);
    this.mainContainer.add([this.progress]);
    this.sort();
  }
  addCTA() {
    this.play = this.add
      .image(0, 0, "play")
      .addProperties(["pos", "scale"])
      .setDepth(37)
      .setCustomAlign("Bottom")
      .setOrigin(0.5, 0.5)
      .setCustomScale(0.7, 0.7, 0.7, 0.7)
      .setCustomPosition(0, -70, 0, -70);

    // this.couple.setInteractive().on("pointerdown", this.openStore, this);
    this.play.setInteractive().on("pointerdown", this.openStore, this);
    this.tweens.add({
      targets: [this.play],
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
      // this.play_glow,
      // this.couple_glow,
    ]);
    this.sort();
  }
  changeScene() {
    this.sceneNum += 1;
    switch (this.sceneNum) {
      case 2:
        this.onSecondScene();
        this.progress.changeProgress(0.33);
        break;
      case 3:
        this.onThirdScene();
        this.progress.changeProgress(0.66);
        break;
      case 4:
        this.progress.changeProgress(1);
        this.onFinalScene();
        break;

      default:
        break;
    }
  }
  onSecondScene() {
    this.choices.remove();
    this.title.hide();
    this.events.emit("disable");
    setTimeout(() => {
      this.addChoices(CHOICES2);
      this.choices.setCustomScale(0.5, 0.5, 0.7, 0.7);
      this.addTitle("title2");
    }, 1000);
  }
  onThirdScene() {
    this.choices.remove();
    this.title.hide();
    this.events.emit("disable");
    setTimeout(() => {
      this.addChoices(CHOICES3);
      this.addTitle("title3");
    }, 1000);
  }
  onFinalScene() {
    this.choices.remove();
    this.title.hide();
    this.continue.destroy();
    this.continueD.destroy();
    setTimeout(() => {
      this.progress.setAlpha(0);
      this.progress.progressBarFill.setAlpha(0);
      // this.addChoices(CHOICES3);
      this.lastImage = this.add
        .image(0, 0, this.isMan ? "man" : "everyone")
        .addProperties(["pos", "scale"])
        .setDepth(38)
        .setCustomAlign("Center")
        .setOrigin(0.5, 0.5)
        .setAlpha(1)
        .setCustomScale(0.2, 0.2, 0.2, 0.2)
        .setCustomPosition(0, -50, 0, -90);
      this.mainContainer.add([this.lastImage]);
      this.sort();
      this.addCTA();
      this.addTitle("title4");
    }, 1000);
  }
  addButton() {
    this.continue = this.add
      .image(0, 0, "atlas", "continue")
      .addProperties(["pos", "scale"])
      .setDepth(38)
      .setCustomAlign("Bottom")
      .setOrigin(0.5, 0.5)
      .setAlpha(0)
      .setCustomScale(0.7, 0.7, 0.7, 0.7)
      .setCustomPosition(0, -90, 0, -90);
    this.continueD = this.add
      .image(0, 0, "atlas", "continue_disable")
      .addProperties(["pos", "scale"])
      .setDepth(37)
      .setCustomAlign("Bottom")
      .setOrigin(0.5, 0.5)
      .setCustomScale(0.7, 0.7, 0.7, 0.7)
      .setCustomPosition(0, -70, 0, -70);
    this.continue.setInteractive().on("pointerdown", () => this.changeScene());
    this.mainContainer.add([this.continue, this.continueD]);
    this.sort();
  }
  openStore() {
    this.game.network.openStore();
  }
}
