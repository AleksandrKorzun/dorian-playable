/* global Phaser, window, document */

import Orientation from "./components/Orientation";

import Network from "./networks/Network";
import Applovin from "./networks/Applovin";
import Facebook from "./networks/Facebook";
import Google from "./networks/Google";
import Ironsource from "./networks/IronSource";
import Liftoff from "./networks/Liftoff";
import TikTok from "./networks/TikTok";
import UnityAds from "./networks/UnityAds";
import Vungle from "./networks/Vungle";
import MindWorks from "./networks/MindWorks";
import Moloco from "./networks/Moloco";
import Affiliates from "./networks/Affiliates";

import Preloader from "./Preloader";
import Game from "../src/Game";

import Utils from "./Utils";
import Smadex from "./networks/Smadex";

let network;

class App extends Phaser.Game {
  constructor() {
    const config = {
      type: Phaser.AUTO,
      parent: "app",
      scale: {
        mode: Phaser.Scale.NONE,
        width: window.innerWidth * window.devicePixelRatio,
        height: window.innerHeight * window.devicePixelRatio,
      },
      title: `Core Version: ${window.App.CORE_VERSION}`,
      backgroundColor: "#1e1e1e",
      scene: [Preloader, Game],
    };

    if (window.SpinePlugin) {
      config.plugins = {
        scene: [
          {
            key: "SpinePlugin",
            plugin: window.SpinePlugin,
            start: true,
            mapping: "spine",
          },
        ],
      };
    }

    super(config);

    this.create();
    this.addStyle();
    this.setObjects();
    this.fixedAudioStop();
    this.resize();
  }

  create() {
    setTimeout(() => {
      window.scrollTo(0, 1);
    }, 10);

    window.addEventListener("resize", this.resize.bind(this), true);
    this.network = network;
    this.network.game = this;
    this.size = { resize: this.resize.bind(this) };
  }

  addStyle() {
    document.body.style.margin = "0%";
    document.body.style.padding = "0%";
    document.body.style.backgroundColor = "#000000";
    document.body.style.overflow = "hidden";

    document.getElementById("app").style.position = "relative";

    const styleNode = document.createElement("style");
    styleNode.type = "text/css";
    document.getElementsByTagName("head")[0].appendChild(styleNode);

    this.changeLoaderStyle();

    let webkitKeyFrames =
      "@-webkit-keyframes spin{0%{-webkit-transform:rotate(0deg);}";
    webkitKeyFrames += "100%{-webkit-transform:rotate(360deg);}}";
    const webkitTextNode = document.createTextNode(webkitKeyFrames);
    document.getElementsByTagName("style")[0].appendChild(webkitTextNode);

    const keyFrames =
      "@keyframes spin{0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}}";
    const textNode = document.createTextNode(keyFrames);
    document.getElementsByTagName("style")[0].appendChild(textNode);
  }

  changeLoaderStyle() {
    const loader = document.getElementById("loader").style.display;

    const w =
      window.innerWidth > window.innerHeight
        ? window.innerHeight
        : window.innerWidth;
    const size = (w / 10) * window.devicePixelRatio;
    const sizeBorder = size / 10;
    const margin = size / 2 + sizeBorder / 2;

    let loaderStyle = `position: absolute;top: 50%;left: 50%;margin-left: -${margin}px;margin-top: -${margin}px;`;
    loaderStyle += `background-color: #000000;border:${sizeBorder}px solid #000000;border-radius: 50%;`;
    loaderStyle += `width: 100%;height: 100%;display:${loader};`;
    loaderStyle += `border-bottom:${sizeBorder}px solid #ffffff;border-top:${sizeBorder}px solid #ffffff;`;
    loaderStyle += `width:${size}px;height:${size}px;`;
    loaderStyle +=
      "-webkit-animation:spin 2s linear infinite;animation:spin 2s linear infinite;";
    document.getElementById("loader").style.cssText = loaderStyle;
  }

  setObjects() {
    const objects = [
      Phaser.GameObjects.Sprite.prototype,
      Phaser.GameObjects.Graphics.prototype,
      Phaser.GameObjects.Container.prototype,
      Phaser.GameObjects.Image.prototype,
      Phaser.GameObjects.Text.prototype,
      Phaser.GameObjects.TileSprite.prototype,
      Phaser.GameObjects.RenderTexture.prototype,
      // Phaser.GameObjects.Particles.ParticleEmitterManager.prototype,
      Phaser.GameObjects.Particles.ParticleEmitter.prototype,
      Phaser.GameObjects.Zone.prototype,
    ];

    if (window.SpinePlugin)
      objects.push(window.SpinePlugin.SpineGameObject.prototype);

    for (let i = 0; i < objects.length; i++) {
      Orientation.addDefaultProperties(objects[i]);
    }

    function sort() {
      this.sort("depth");
    }
    Phaser.GameObjects.Container.prototype._sort = sort;
  }

  resize() {
    let width = window.innerWidth;
    let height = window.innerHeight;
    let devicePixelRatio = window.devicePixelRatio < 2 ? 1 : 2;

    if (this.device.os.iPad) devicePixelRatio = 1;

    let deviceWidth = width * devicePixelRatio;
    let deviceHeight = height * devicePixelRatio;
    if (window.dapi) {
      width = window.dapi.getScreenSize().width;
      height = window.dapi.getScreenSize().height;

      deviceWidth = window.dapi.getScreenSize().width * devicePixelRatio;
      deviceHeight = window.dapi.getScreenSize().height * devicePixelRatio;
    } else if (window.mraid) {
      width = window.mraid.getScreenSize().width;
      height = window.mraid.getScreenSize().height;

      deviceWidth = window.mraid.getScreenSize().width * devicePixelRatio;
      deviceHeight = window.mraid.getScreenSize().height * devicePixelRatio;
    }

    document.getElementById("app").style.width = `${width}px`;
    document.getElementById("app").style.height = `${height}px`;

    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;

    this.scale.resize(deviceWidth, deviceHeight);

    const scale = Math.min(deviceWidth / 600, deviceHeight / 900);
    this.size.scale = scale.toFixed(1);
    this.size.isPortrait = deviceWidth < deviceHeight;

    this.updateScale();
    this.scaleContainer();
    this.changeLoaderStyle();
  }

  scaleContainer() {
    for (let i = 0; i < this.scene.scenes.length; i++) {
      if (this.scene.scenes[i].mainContainer) {
        const container = this.scene.scenes[i].mainContainer;
        const coff = Utils.coefficient(1, this.size.scale, 1);
        container.setCustomPosition(-this.size.x, -this.size.y);
        container.setScale(1).setScale(this.size.scale);
        container.cx /= coff;
        container.cy /= coff;

        this.resizeObj(container);
      }
    }

    this.updateScale();
  }

  resizeObj(container) {
    const list = container.list.map((x) => x);
    for (let j = 0; j < list.length; j++) {
      const obj = list[j];
      if (obj.customProps.includes("pos")) {
        obj.setCustomPosition(obj.lx, obj.ly, obj.px, obj.py);
      } else {
        obj.setCustomPosition(obj.cx, obj.cy);
      }

      if (obj.customProps.includes("scale"))
        obj.setCustomScale(obj.lScaleX, obj.lScaleY, obj.pScaleX, obj.pScaleY);
      if (obj.customProps.includes("angle"))
        obj.setCustomAngle(obj.lAngle, obj.pAngle);
      if (obj.customProps.includes("alpha"))
        obj.setCustomAlpha(obj.lAlpha, obj.pAlpha);
      if (obj.customProps.includes("visible"))
        obj.setCustomVisible(obj.lVisible, obj.pVisible);
      if (obj.customProps.includes("align"))
        obj.setCustomAlign(obj.lAlign, obj.pAlign);
      if (obj.customProps.includes("depth")) {
        obj.setCustomDepth(obj.lDepth, obj.pDepth);
        container.sort("depth");
      }
      if (obj.customProps.includes("image"))
        obj.setCustomImage(obj.lImage, obj.pImage);
      if (obj.customProps.includes("origin"))
        obj.setCustomOrigin(
          obj.lOriginX,
          obj.lOriginY,
          obj.pOriginX,
          obj.pOriginY
        );
      if (obj.customProps.includes("maxScale"))
        obj.setMaxScale(obj.lMaxScale, obj.pMaxScale);
    }
  }

  updateScale() {
    const width = this.scale.width;
    const height = this.scale.height;

    this.size.x = width / 2;
    this.size.y = height / 2;
    this.size.top = height / this.size.scale / 2 - this.size.y;
    this.size.top =
      this.size.top < height / this.size.scale / 2
        ? -this.size.top
        : this.size.top;
    this.size.left = width / this.size.scale / 2 - this.size.x;
    this.size.left =
      this.size.left < width / this.size.scale / 2
        ? -this.size.left
        : this.size.left;
    this.size.bottom = height / this.size.scale / 2 + this.size.y;
    this.size.bottom =
      this.size.bottom < height / this.size.scale / 2
        ? -this.size.bottom
        : this.size.bottom;
    this.size.right = width / this.size.scale / 2 + this.size.x;
    this.size.right =
      this.size.right < width / this.size.scale / 2
        ? -this.size.right
        : this.size.right;
  }

  fixedAudioStop() {
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) this.sound.volume = 0;
      else this.sound.volume = 1;
    });
  }
}

const start = () => {
  new App();
};

if (window.App.network === "Applovin") {
  network = new Applovin(start);
} else if (window.App.network === "Facebook") {
  network = new Facebook(start);
} else if (window.App.network === "Google") {
  network = new Google(start);
} else if (window.App.network === "IronSource") {
  network = new Ironsource(start);
} else if (window.App.network === "Liftoff") {
  network = new Liftoff(start);
} else if (window.App.network === "TikTok") {
  network = new TikTok(start);
} else if (window.App.network === "UnityAds") {
  network = new UnityAds(start);
} else if (window.App.network === "Vungle") {
  network = new Vungle(start);
} else if (window.App.network === "MindWorks") {
  network = new MindWorks(start);
} else if (window.App.network === "Moloco") {
  network = new Moloco(start);
} else if (window.App.network === "Affiliates") {
  network = new Affiliates(start);
} else if (window.App.network === "Smadex") {
  network = new Smadex(start);
} else {
  network = new Network(start);
}

window.App.CORE_VERSION = "0.0.1";
