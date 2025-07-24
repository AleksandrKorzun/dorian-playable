export default class Choice extends Phaser.GameObjects.Container {
  constructor(scene, choice) {
    super(scene, 0, 0);
    this.tweens = scene.tweens;
    this.choicesName = choice;
    this.isPortrait = this.scene.game.size.isPortrait;
    this.addChoice();
    this.isPress = false;
    // this.show();
    // this.scene.events.on('choice_click', () => this.onClick())
  }
  addChoice() {
    const { name, x, y, scale, onClick } = this.choicesName;
    const xStart = x < 0 ? -2000 : 2000;
    this[name] = this.scene.add.image(xStart, y, name).setScale(scale);
    this[name].setInteractive().on("pointerdown", () => {
      onClick();
      this.onClick();
    });

    this.scene.tweens.add({
      targets: this[name],
      x,
      duration: 300,
    });
    this.add(this[name]);
    this._sort();
  }
  addGlow() {
    this.glow = this[this.choicesName.name].preFX.addGlow();
  }
  removeGlow() {
    this.glow.destroy();
  }
  onClick() {
    if (this.choicesName.name === "choice3_2") {
      this.scene.isMan = true;
    } else {
      this.scene.isMan = false;
    }
    if (this.isPress) {
      this.isPress = false;
      this.removeGlow();
      if (this.scene.choices.cho.every((c) => !c.isPress)) {
        this.scene.events.emit("disable");
      }
    } else {
      this.isPress = true;
      this.scene.events.emit("active");
      this.addGlow();
    }
  }
}
