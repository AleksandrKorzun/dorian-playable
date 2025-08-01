const fs = require("fs");
const path = require("path");

const config = require("../../config");

module.exports.load = function load() {
  let lang = config.versions[config.currentVersion].lang;
  if (this.mode === "production") {
    lang =
      config.versions[Object.keys(config.versions)[this.currentVersion]].lang;
  }

  fs.readFile(
    path.join(this.localesFolder, `${lang}.json`),
    "utf8",
    (err, locale) => {
      if (locale) {
        this.resources += `window.App.resources.locale=${locale};`;
      }

      this.localesLoaded = true;
      this.loadChunck();
    }
  );
};
