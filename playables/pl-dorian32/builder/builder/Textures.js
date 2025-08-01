const fs = require("fs");
const path = require("path");
const base64Img = require("base64-img");
const imagemin = require("imagemin");
const imageminMozjpeg = require("imagemin-mozjpeg");
const imageminPngquant = require("imagemin-pngquant");

const config = require("../../config");

module.exports.load = function load() {
  function textureToBase64(_path, title, count) {
    base64Img.base64(_path, (err, data) => {
      if (data) {
        const name = this.filterAssetName(title.slice(0, -4));
        this.resources += `window.App.resources.textures.${name}='${data}';`;
      }

      count.current += 1;

      if (count.current === count.total) {
        this.texturesLoaded = true;
        this.loadChunck();
      }
    });
  }

  fs.readdir(this.texturesFolder, (err, names) => {
    let textures = false;

    if (err) {
      console.error(err);
    }

    for (const title of names) {
      const type = title.slice(title.length - 3, title.length);
      const filePath = path.join(this.texturesFolder, title);
      type === "png" || type === "jpg"
        ? (textures = true)
        : fs.unlinkSync(filePath);
    }

    const files = [];
    for (const title of names) {
      const name = title.slice(0, -4);

      this.isCurrentVersionAsset(name, "textures") && files.push(title);
    }

    if (names.length === 0 || files.length === 0 || !textures) {
      this.texturesLoaded = true;
      this.loadChunck();

      return;
    }

    const count = { current: 0, total: 0 };
    for (let i = 0; i < files.length; i++) {
      const filePath = path.join(this.texturesFolder, files[i]);
      if (config.qualityTexture) {
        (async () => {
          await imagemin([filePath], {
            destination: this.tempFolder,
            glob: false,
            plugins: [
              imageminMozjpeg(),
              imageminPngquant({
                quality: config.qualityTexture,
              }),
            ],
          });
          textureToBase64.bind(this)(
            path.join(this.tempFolder, files[i]),
            files[i],
            count
          );
        })();
      } else {
        textureToBase64.bind(this)(filePath, files[i], count);
      }

      count.total += 1;
    }
  });
};
