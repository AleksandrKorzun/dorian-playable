/* global Image */

export default class Utils {
  static getText(key) {
    return window.App.resources.locale[key];
  }

  static addProperty(obj, prop, getter, setter) {
    Object.defineProperty(obj, prop, {
      configurable: true,
      get: getter,
      set: setter,
    });
  }

  static getAlignX(obj) {
    if (
      obj.align === "Top Left" ||
      obj.align === "Left" ||
      obj.align === "Bottom Left"
    ) {
      return obj.scene.game.size.left;
    }

    if (
      obj.align === "Top Right" ||
      obj.align === "Right" ||
      obj.align === "Bottom Right"
    ) {
      return obj.scene.game.size.right;
    }

    return obj.scene.game.size.x;
  }

  static getAlignY(obj) {
    if (
      obj.align === "Top Left" ||
      obj.align === "Top" ||
      obj.align === "Top Right"
    ) {
      return obj.scene.game.size.top;
    }

    if (
      obj.align === "Bottom Left" ||
      obj.align === "Bottom" ||
      obj.align === "Bottom Right"
    ) {
      return obj.scene.game.size.bottom;
    }

    return obj.scene.game.size.y;
  }

  static getInputPoint(obj, x, y) {
    const newX = (x - Utils.getAlignX(obj)) / obj.scene.mainContainer.scaleX;
    const newY = (y - Utils.getAlignY(obj)) / obj.scene.mainContainer.scaleY;

    return { x: newX, y: newY };
  }

  static addAudio(scene, name, volume, loop) {
    if (scene.game.cache.audio.entries.size) {
      const sound = scene.game.sound.addAudioSprite("sfx");
      sound.play(name, { loop: loop || false, volume: volume || 1 });

      return sound;
    }

    return null;
  }

  static addVideo(scene, name, config = {}) {
    if (scene.game.cache.video.entries.has(name)) {
      const video = scene.add.video(0, 0, name);

      // Конфігурація за замовчуванням
      const defaults = {
        loop: false,
        volume: 1,
        mute: false,
        x: scene.cameras.main.centerX,
        y: scene.cameras.main.centerY,
        scale: 1,
        alpha: 1,
        visible: true,
      };

      const settings = { ...defaults, ...config };

      video.setLoop(settings.loop);
      video.setVolume(settings.volume);
      video.setMute(settings.mute);
      video.setPosition(settings.x, settings.y);
      video.setScale(settings.scale);
      video.setAlpha(settings.alpha);
      video.setVisible(settings.visible);

      return video;
    }

    return null;
  }

  static coefficient(first, second, system = 100) {
    return (first / second) * system;
  }

  static generateID() {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000 || 0).toString(16).substring(1);
    };

    return `${S4() + S4()}-${S4()}-${S4()}-${S4()}-${S4() + S4() + S4()}`;
  }

  static destroy(arr) {
    for (let i = 0; i < arr.length; i++) {
      arr[i]?.destroy();
    }
  }

  static switchInteactiveObj(obj, isEnable) {
    if (isEnable) {
      obj.setInteractive();
    } else {
      obj.disableInteractive();
    }
  }

  static animText(obj, text, delay = 50, gap = 1) {
    let count = 0;
    let newText = "";
    let timer = null;

    const update = () => {
      obj.setText(newText);

      if (!text[count] && timer) {
        timer.destroy();
        timer = null;
      }

      for (let i = 0; i < gap; i++) {
        if (text[count + i]) newText += text[count + i];
      }

      count += gap;
    };

    timer = obj.scene.time.addEvent({
      delay,
      callback: update,
      callbackScope: this,
      loop: true,
    });
  }

  static changeProperty(arr, props, value, sign) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < props.length; j++) {
        if (sign === "+") {
          arr[i][props[j]] += value;
        } else if (sign === "-") {
          arr[i][props[j]] -= value;
        } else if (sign === "*") {
          arr[i][props[j]] *= value;
        } else if (sign === "/") {
          arr[i][props[j]] /= value;
        } else if (sign === "=") {
          arr[i][props[j]] = value;
        }
      }
    }
  }

  static makeSpriteSheet(
    scene,
    nameAnimation,
    texture,
    width,
    height,
    callback
  ) {
    const newImage = new Image();
    newImage.onload = () => {
      scene.textures.addSpriteSheet(nameAnimation, newImage, {
        frameWidth: width,
        frameHeight: height,
        startFrame: 0,
        endFrame: -1,
      });

      callback();
    };

    newImage.src = window.App.resources.textures[texture];
  }
}
