import ParentScene from "../builder/components/Scene";
import Background from "../builder/components/Background";
import { appVersion } from "./constants/Constants";
import Balance from "./Balance";
import Phone from "./Phone";

export default class Game extends ParentScene {
  create() {
    this.addBackground("bg", { isAdaptive: true });
    this.addCTA();
    // this.bg.setInteractive().on("pointerdown", () => {
    //   this.onOpenStore();
    // });
    this.addCharacters();
    this.startHeroSelectionTutorial();
  }

  addBackground(bg, options = {}) {
    this.bg = new Background(this, bg, true, [1.5, 1.5, 1.1, 1.1]).setDepth(
      options.depth || 4
    );
    this.mainContainer.add([this.bg]);
    this.sort();
  }

  addCharacters() {
    this.heroes = ["leather", "ghost", "mike", "jay"];
    this.heroes.map((hero, i) => {
      const x = -180 + i * 120;
      this[hero] = this.add
        .image(0, 0, hero)
        .addProperties(["pos", "scale"])
        .setDepth(37)
        .setCustomAlign("Center")
        .setOrigin(0.5, 0.5)
        .setCustomScale(0.4, 0.4, 0.4, 0.4)
        .setTint(0x555555)
        .setCustomPosition(x, 60, x, 100);
      this[hero].setInteractive().on("pointerdown", () => {
        this.openStore();
      });
      this.mainContainer.add([this[hero]]);
      this.sort();
    });
  }
  startHeroSelectionTutorial() {
    if (!this.hand) {
      this.hand = this.add
        .image(0, 0, "atlas", "hand")
        .setDepth(100)
        .setOrigin(0.5)
        .setScale(0.5)
        .setAngle(15)
        .setAlpha(0);
      this.mainContainer.add(this.hand);
    }

    const heroes = this.heroes.map((key) => this[key]);

    let current = 0;

    const highlightHero = () => {
      // якщо рука ще не видима — показати
      if (this.hand.alpha === 0) {
        this.tweens.add({
          targets: this.hand,
          alpha: 1,
          duration: 200,
        });
      }

      const hero = heroes[current];

      // переміщення руки до героя
      this.tweens.add({
        targets: this.hand,
        x: hero.x,
        y: hero.y + 60,
        duration: 500,
        onComplete: () => {
          // роззатемнення + масштаб героя
          hero.clearTint();
          hero.setDepth(40);
          this.sort();
          this.tweens.add({
            targets: hero,
            scaleX: 0.5,
            scaleY: 0.5,
            duration: 300,
            ease: "Sine.easeInOut",
          });

          this.time.delayedCall(2000, () => {
            // назад затемнення + масштаб
            hero.setTint(0x555555);
            hero.setDepth(37);
            this.sort();
            this.tweens.add({
              targets: hero,
              scaleX: 0.4,
              scaleY: 0.4,
              duration: 300,
              ease: "Sine.easeInOut",
            });

            current++;
            if (current < heroes.length) {
              highlightHero();
            } else {
              // приховати руку після всього

              this.tweens.add({
                targets: this.hand,
                alpha: 0,
                duration: 300,
              });
              this.time.delayedCall(2000, () => {
                this.startHeroSelectionTutorial();
              });
            }
          });
        },
      });
    };

    highlightHero();
  }

  addCTA() {
    this.play = this.add
      .image(0, 0, "play")
      .addProperties(["pos", "scale"])
      .setDepth(37)
      .setCustomAlign("Top")
      .setOrigin(0.5, 0.5)
      .setCustomScale(0.7, 0.7, 0.7, 0.7)
      .setCustomPosition(0, 70, 0, 70);

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

  openStore() {
    this.game.network.openStore();
  }
}
