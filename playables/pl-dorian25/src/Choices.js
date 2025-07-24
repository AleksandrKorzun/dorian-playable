import Choice from "./Choice";

export default class Choices extends Phaser.GameObjects.Container {
  constructor(scene, choices, isMany) {
    super(scene, 0, 0);
    this.tweens = scene.tweens;
    this.addProperties(["pos", "scale"])
      .setCustomPosition(0, 0, 0, 0)
      .setCustomScale(0.7, 0.7, 0.7, 0.7)
      .setCustomAlign("Center")
      .setDepth(250)
      .setAlpha(1);
    this.choicesName = choices;
    this.isMany = isMany;
    this.isPortrait = this.scene.game.size.isPortrait;
    this.addChoices();
    // this.show();
  }
  addChoices() {
    this.cho = [];
    this.choicesName.forEach(({ name, x, y, scale }) => {
      this[name] = new Choice(this.scene, {
        name,
        x,
        y,
        scale,
        onClick: () => this.onClick(),
      });
      this.add(this[name]);
      this._sort();
      this.cho.push(this[name]);
    });
  }
  removeGlow() {
    if (!this.isMany) {
      this.cho.forEach((c, i) => {
        if (c.isPress) {
          c.glow?.destroy();
          c.isPress = false;
        }
      });
    }
  }
  remove() {
    this.cho.forEach((c, i) => {
      console.log("c.x", c);
      const xTween = c.choicesName.x < 0 ? -2000 : 2000;
      this.scene.tweens.add({
        targets: c,
        x: xTween,
        duration: 300,
        delay: 50 * i,
        onComplete: () => c.destroy(),
      });
    });
  }
  onClick() {
    const isActive = this.cho.some((c) => c.isPress);
    this.removeGlow();
    if (isActive) {
      this.scene.events.emit("active");
    } else {
      this.scene.events.emit("disable");
    }
  }
}
