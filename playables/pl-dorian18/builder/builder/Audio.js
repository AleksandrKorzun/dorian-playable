const fs = require("fs");
const path = require("path");

const audiosprite = require("audiosprite");
const config = require("../../config");

module.exports.load = function load() {
  fs.readdir(this.audioFolder, (err, names) => {
    let audio = false;
    for (const title of names) {
      const filePath = path.join(this.audioFolder, title);
      const type = title.slice(title.length - 3, title.length);
      type === "mp3" ? (audio = true) : fs.unlinkSync(filePath);
    }

    if (err) {
      console.error(err);
    }

    const files = [];
    for (const title of names) {
      const filePath = path.join(this.audioFolder, title);
      const name = title.slice(0, -4);
      this.isCurrentVersionAsset(name, "audio") && files.push(filePath);
    }

    if (names.length === 0 || files.length === 0 || !audio) {
      this.audioLoaded = true;
      this.loadChunck();

      return;
    }

    const output = path.join(this.tempFolder, "audio.ogg");
    console.log("first", this.tempFolder);
    const opts = {
      output: `${this.tempFolder}/audio`,
      export: "m4a,ogg",
      bitrate: config.bitrateAudio,
    };

    audiosprite(files, opts, (errorJson, json) => {
      this.resources += `window.App.resources.audio.json=${JSON.stringify(
        json
      )};`;

      fs.readFile(output, (errorOgg, ogg) => {
        const oggBase64 = ogg.toString("base64");
        this.resources += `window.App.resources.audio.ogg='${oggBase64}';`;

        fs.readFile(
          path.join(this.tempFolder, "audio.m4a"),
          (errorM4a, m4a) => {
            const m4aBase64 = m4a.toString("base64");
            this.resources += `window.App.resources.audio.m4a='${m4aBase64}';`;

            this.audioLoaded = true;
            this.loadChunck();
          }
        );
      });
    });
  });
};
