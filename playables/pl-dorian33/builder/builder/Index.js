/* eslint-disable indent */
/* eslint-disable prettier/prettier */
const fs = require("fs");
const path = require("path");
const zip = require("bestzip");
const open = require("open");
const chokidar = require("chokidar");

const textures = require("./Textures");
const sheets = require("./Sheets");
const fonts = require("./Fonts");
const locales = require("./Locales");
const audio = require("./Audio");
const spine = require("./Spine");

const config = require("../../config");

class BuilderPlugin {
  constructor(options = {}) {
    this.mode = options.mode;

    this.currentVersion = 0;
    this.isOpenTab = false;
    this.isChangeAssets = true;

    if (this.mode === "development") {
      const watcher = chokidar.watch("./assets/");
      watcher.on("add", () => this.rebuild());
      watcher.on("change", () => this.rebuild());
      watcher.on("unlink", () => this.rebuild());
    }
  }

  rebuild() {
    if (this.isChangeAssets) return;

    this.isChangeAssets = true;

    setTimeout(() => {
      this.isChangeAssets && this.startBuild();
    }, 2000);
  }

  apply(compiler) {
    compiler.hooks.done.tap("Builder Plugin", (compilation, callback) => {
      this.callback = callback;

      if (!this.isChangeAssets) {
        return;
      }

      this.isChangeAssets = false;

      this.startBuild();
    });
  }

  setDefaultProps() {
    this.isChangeAssets = false;
    this.buildComplete = false;
    this.texturesLoaded = false;
    this.sheetsLoaded = false;
    this.fontsLoaded = false;
    this.localesLoaded = false;
    this.audioLoaded = false;
    this.spineLoaded = false;
    this.inlineSpine = false;

    this.currentNetworkCount = 0;

    this.fonts = "";

    this.resources = "window.App={};window.App.CORE_VERSION;";
    this.resources +=
      "window.App.network='{network}';window.App.version='{version}';";
    this.resources += `window.App.iosUrl='${config.ios}';window.App.androidUrl='${config.android}';`;
    this.resources +=
      "window.App.resources={};window.App.resources.textures={};window.App.resources.sheets={};";
    this.resources +=
      "window.App.resources.audio={};window.App.resources.spine={};";
    this.resources += `window.App.facebookPixel=${config.facebookPixel};window.App.oneLink='${config.oneLink}';`;

    this.projectFolder = path.join(__dirname, "../../");
    this.builderFolder = path.join(__dirname, "../");

    this.projectTitle =
      config.name ||
      path.basename(this.projectFolder).match(/([^\\\/]*)\/*$/)[1];

    const assetsFolder = path.join(this.projectFolder, "assets");
    this.audioFolder = path.join(assetsFolder, "audio");
    this.sheetsFolder = path.join(assetsFolder, "sheets");
    this.localesFolder = path.join(assetsFolder, "locales");
    this.texturesFolder = path.join(assetsFolder, "textures");
    this.fontsFolder = path.join(assetsFolder, "fonts");
    this.spineFolder = path.join(assetsFolder, "spine");
    this.distFolder = path.join(this.projectFolder, "dist");
    this.tempFolder = path.join(this.projectFolder, "temp");
    this.templateFolder = path.join(this.builderFolder, "template");
  }
  startBuild() {
    this.setDefaultProps();

    if (!fs.existsSync(path.join(this.projectFolder, "assets")))
      fs.mkdirSync(path.join(this.projectFolder, "assets"));
    if (!fs.existsSync(this.distFolder)) fs.mkdirSync(this.distFolder);
    if (!fs.existsSync(this.tempFolder)) fs.mkdirSync(this.tempFolder);

    if (this.mode === "production") {
      for (let i = 0; i < Object.keys(config.versions).length; i++) {
        const filePath = path.join(
          this.distFolder,
          `${Object.keys(config.versions)[i]}`
        );
        if (!fs.existsSync(filePath)) fs.mkdirSync(filePath);
      }
    }

    !fs.existsSync(this.texturesFolder)
      ? fs.mkdir(this.texturesFolder, () => {
          textures.load.bind(this)();
        })
      : textures.load.bind(this)();
    !fs.existsSync(this.sheetsFolder)
      ? fs.mkdir(this.sheetsFolder, () => {
          sheets.load.bind(this)();
        })
      : sheets.load.bind(this)();
    !fs.existsSync(this.fontsFolder)
      ? fs.mkdir(this.fontsFolder, () => {
          fonts.load.bind(this)();
        })
      : fonts.load.bind(this)();
    !fs.existsSync(this.localesFolder)
      ? fs.mkdir(this.localesFolder, () => {
          locales.load.bind(this)();
        })
      : locales.load.bind(this)();
    !fs.existsSync(this.audioFolder)
      ? fs.mkdir(this.audioFolder, () => {
          audio.load.bind(this)();
        })
      : audio.load.bind(this)();
    !fs.existsSync(this.spineFolder)
      ? fs.mkdir(this.spineFolder, () => {
          spine.load.bind(this)();
        })
      : spine.load.bind(this)();
  }

  isCurrentVersionAsset(name, folder) {
    let includes = false;
    let includesCurrentVersion = false;

    let currentVesion = config.currentVersion;
    if (this.mode === "production") {
      currentVesion = Object.keys(config.versions)[this.currentVersion];
    }

    for (const key in config.versions) {
      if (config.versions[key][folder].includes(name)) {
        if (currentVesion === key) includesCurrentVersion = true;
        includes = true;
      }
    }

    if (includesCurrentVersion || !includes) return true;

    return false;
  }

  loadChunck() {
    if (
      !this.audioLoaded ||
      !this.fontsLoaded ||
      !this.sheetsLoaded ||
      !this.localesLoaded ||
      !this.texturesLoaded ||
      !this.spineLoaded ||
      this.buildComplete
    )
      return;

    this.buildComplete = true;
    this.makeHtml(this.mode === "development" ? "dev" : config.networks[0]);
  }

  makeHtml(network) {
    const phaserName = `phaser${config.customPhaser ? "-custom" : ""}.min.js`;
    let networkName;
    switch (network) {
      case "IronSources":
        networkName = "dapi.html";
        break;
      case "Landing":
        networkName = "landing.html";
        break;
      default:
        networkName = "mraid.html";
        break;
    }
    // const networkName = `${network === 'IronSource' ? 'dapi' : 'mraid'}.html`;
    let html = fs.readFileSync(
      path.join(this.templateFolder, networkName),
      "utf8"
    );

    const customPhaserPath = config.customPhaserPath;
    const enginePath = customPhaserPath
      ? path.join(this.projectFolder, customPhaserPath)
      : path.join(this.builderFolder, "libs", phaserName);
    const engine = fs.readFileSync(enginePath, "utf-8");
    const spineLib = this.inlineSpine
      ? fs.readFileSync(
          path.join(this.builderFolder, "libs", "SpinePlugin.min.js"),
          "utf8"
        )
      : "";

    html = html.replace("{engine}", engine + spineLib);
    html = html.replace("{fonts}", this.fonts);
    html = html.replace("{resources}", this.resources);
    html = html.replace("{fonts}", "");
    html = html.replace("{network}", network);
    html = html.replace("{title}", this.projectTitle);

    this.mode === "development"
      ? this.buildDev(html)
      : this.buildProd(html, network);
  }

  buildDev(html) {
    let newHtml = html.replace(
      "{devCode}",
      "<script src = './../../main.js'></script>"
    );
    newHtml = newHtml.replace("{code}", "");
    newHtml = newHtml.replace("{version}", config.currentVersion);

    fs.writeFile(path.join(this.distFolder, "index.html"), newHtml, () => {
      if (!this.isOpenTab) {
        open("http://localhost:8080/index.html");
        this.isOpenTab = true;
      }
    });
  }

  buildProd(html, network) {
    const code = fs.readFileSync(path.join(this.distFolder, "main.js"), "utf8");
    let newHtml = html.replace("{devCode}", "");
    newHtml = newHtml.replace("{code}", code);

    const folderName = Object.keys(config.versions)[this.currentVersion];
    newHtml = newHtml.replace("{version}", folderName);

    const makeNextNetwork = () => {
      if (this.currentNetworkCount !== config.networks.length - 1) {
        this.currentNetworkCount += 1;
        this.makeHtml(config.networks[this.currentNetworkCount]);
      } else if (
        this.currentVersion !==
        Object.keys(config.versions).length - 1
      ) {
        this.buildNextVersion();
      } else {
        fs.unlink(path.join(this.distFolder, "main.js"), () => {});
      }
    };
    const indexHtml = path.join(this.distFolder, folderName, "index.html");
    const folder = path.join(this.distFolder, folderName);

    if (network === "Google") {
      fs.writeFile(indexHtml, html, () => {
        zip({
          source: "index.html",
          destination: `${
            this.projectTitle
          }_${folderName.toUpperCase()}_Adwords.zip`,
          cwd: path.join(this.distFolder, folderName),
        }).then(() => {
          fs.unlink(indexHtml, () => makeNextNetwork());
        });
      });
    } else if (network === "TikTok") {
      const c = fs.readFileSync(
        path.join(this.templateFolder, "config.json"),
        "utf8"
      );
      fs.writeFileSync(path.join(folder, "config.json"), c);

      fs.writeFile(indexHtml, newHtml, () => {
        zip({
          source: ["index.html", "config.json"],
          destination: `${
            this.projectTitle
          }_${folderName.toUpperCase()}_TikTok.zip`,
          cwd: path.join(folder),
        }).then(() => {
          fs.unlink(path.join(folder, "config.json"), () => {});
          fs.unlink(indexHtml, () => makeNextNetwork());
        });
      });
    } else if (network === "Vungle") {
      const filePath = path.join(
        folder,
        `${this.projectTitle}_${folderName.toUpperCase()}_${network}`
      );
      fs.mkdir(filePath, () => {
        fs.writeFile(path.join(filePath, "ad.html"), newHtml, () =>
          makeNextNetwork()
        );
      });
    } else {
      const filePath = path.join(
        folder,
        `${this.projectTitle}_${folderName.toUpperCase()}_${network}.html`
      );
      fs.writeFile(filePath, newHtml, () => makeNextNetwork());
    }
  }

  buildNextVersion() {
    this.currentVersion += 1;

    this.setDefaultProps();

    textures.load.bind(this)();
    sheets.load.bind(this)();
    fonts.load.bind(this)();
    locales.load.bind(this)();
    audio.load.bind(this)();
    spine.load.bind(this)();
  }

  filterAssetName(title) {
    return title
      .replaceAll(/\?|\+|\.|%|:|\*|@|\+|!|"|;|\(|\)|=/g, "")
      .replaceAll(/-|\s/g, "_")
      .toLowerCase();
  }
}

module.exports = BuilderPlugin;
