import PhaserJuice from "../libs/phaserJuice.min";
import EventDispatcher from "./EventsDispatcher";

export default class Scene extends Phaser.Scene {
  static PORTRAIT_MAX_WIDTH = 700;
  static PORTRAIT_MAX_HEIGHT = 1300;
  static LANDSCAPE_MAX_WIDTH = 1300 * 1.5;
  static LANDSCAPE_MAX_HEIGHT = 700 * 1.5;

  constructor(name = "Game") {
    super({ key: name });
  }

  preload() {
    this.mainContainer = this.add.container(0, 0);
    this.game.size.resize();

    this.sound.mute = true;
    this.input.once("pointerup", () => {
      this.sound.mute = false;
    });

    this.emitter = EventDispatcher.Instance;
    this.pj = new PhaserJuice(this);

    this.emitter.on("openStore", this.onOpenStore, this);
  }

  complete() {
    !this.isCompleted && this.game.network.complete();
    this.isCompleted = true;
  }

  onOpenStore() {
    this.complete();
    this.game.network.openStore();
  }

  sort() {
    this.mainContainer.sort("depth");
  }
}
