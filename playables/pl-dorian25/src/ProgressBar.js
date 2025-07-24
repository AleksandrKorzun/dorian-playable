import GeometryMask from "../builder/components/GeometryMask";
export default class ProgressBar extends Phaser.GameObjects.Container {
  constructor(scene, progress = 0.01) {
    super(scene, 0, 0);
    this.addProperties(["pos", "scale"])
      .setCustomScale(0.6, 0.6, 0.6, 0.6)
      .setCustomAlign("Top")
      .setCustomPosition(0, 210, 0, 210)
      .setDepth(100);
    this._progress = progress;
    this.whiteBar = this.scene.add.image(0, 0, "progress_base").setDepth(1);

    const w = 840;
    const h = 20;
    this.w = w;
    this.h = h;
    this.progressBarFill = this.scene.add
      .tileSprite(0, 0, w, h, "progress_fill")
      .addProperties(["pos", "scale"])
      .setCustomAlign("Top")
      .setCustomScale(this.lScaleX, this.lScaleY, this.pScaleX, this.pScaleY)
      .setDepth(this.depth + 2)
      .setCustomPosition(this.lx, this.ly, this.px, this.py);
    this.failText = this.scene.add.text(-40, -110, this.scene.sceneNum, {
      fontFamily: "BerlinSansFBDemiBold",
      fontSize: "66px",
      fontStyle: "normal",
      fill: "#FFF",
      fontWeight: "900",
      textTransform: "uppercase",
    });
    this.line = this.scene.add.text(0, -110, "/", {
      fontFamily: "BerlinSansFBDemiBold",
      fontSize: "66px",
      fontStyle: "normal",
      fill: "#FFF",
      fontWeight: "900",
      textTransform: "uppercase",
    });
    this.surviveText = this.scene.add.text(30, -110, "3", {
      fontFamily: "BerlinSansFBDemiBold",
      fontSize: "66px",
      fontStyle: "normal",
      fill: "#FFF",
      fontWeight: "900",
      textTransform: "uppercase",
    });
    this.add([this.whiteBar, this.failText, this.surviveText, this.line]);
    this._sort();
    this.scene.tweens.add({
      targets: this.heart,
      pScaleX: 0.8,
      pScaleY: 0.8,
      lScaleX: 0.8,
      lScaleY: 0.8,
      duration: 200,
      yoyo: true,
      hold: 200,
      ease: "Bounce",
      repeat: -1,
    });
    scene.mainContainer.add([
      this.progressBarFill,

      //   this.textProgress,
    ]);
    scene.sort();
    this.addMask();
    this.scene.time.delayedCall(10, () => this.onResize(), [], this);
    const cb = this.onResize.bind(this);
    const onDestroy = () => {
      window.removeEventListener("resize", cb);
      this.progressBarFill.destroy();
      this.clockAnimation.remove();
      this.clockHandAnimation.remove();
      this.clockHand.destroy();
      this.clockBlack.destroy();
      this.clockGreen.destroy();
    };
    window.addEventListener("resize", cb);
    this.on("destroy", onDestroy);
  }

  onResize() {
    const { isPortrait } = this.scene.game.size;
    const scale = isPortrait ? this.pScaleX : this.lScaleX;
    const w = this.w * scale;
    const h = this.h * scale;
    this._mask.startFillX = -w / 2;
    this._mask.startFillY = -h / 2;
    this._mask.width = w;
    this._mask.height = h;
    this._mask.rounded = h / 2;
    this._mask.cx = -w + w * this._progress;
  }

  addMask() {
    this._mask = new GeometryMask(this.scene, this.progressBarFill, {
      cx: -this.w,
      startFillX: -this.w / 2,
      startFillY: -this.h / 2,
      width: this.w,
      height: this.h,
      rounded: this.h / 2,
    });
    this._mask.cx = -this.w + this.w * this._progress;
  }

  changeProgress(_progress, options = {}) {
    let progress = _progress;
    if (progress < 0) {
      progress = 0;
    }
    if (progress > 1) {
      progress = 1;
    }
    this.scene.tweens.addCounter({
      from: this._progress,
      to: progress,
      duration: 500,
      ...options,
      onUpdate: (tween) => {
        this._progress = tween.getValue();
        this.onResize();
      },
    });
    if (this.scene.sceneNum >= 4) return;
    this.failText.setText(`${this.scene.sceneNum}`);
  }

  setCustomPos(lx, ly, px, py) {
    this.setCustomPosition(lx, ly, px, py);
    this.progressBarFill.setCustomPosition(lx, ly, px, py);
    this.progressBarFill.clearMask();
    this.addMask();
    return this;
  }

  get progress() {
    return this._progress;
  }
}
