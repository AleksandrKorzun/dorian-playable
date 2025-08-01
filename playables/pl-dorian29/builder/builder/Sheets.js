const fs = require("fs");
const path = require("path");
const base64Img = require("base64-img");
const imagemin = require("imagemin");
const jsonminify = require("jsonminify");
const texturePacker = require("free-tex-packer-core");
const imageminMozjpeg = require("imagemin-mozjpeg");
const imageminPngquant = require("imagemin-pngquant");

const config = require("../../config");

function sheetsToBase64(files) {
  base64Img.base64(path.join(this.tempFolder, "atlas.png"), (err, data) => {
    const json = jsonminify(String(files[0].buffer));
    json.slice(1, 1);

    // eslint-disable-next-line prefer-template
    this.resources += "window.App.resources.sheets.json=" + json + ";"; // ${json} ломает json поэтому оставляем пока так
    this.resources += `window.App.resources.sheets.png='${data}';`;

    this.sheetsLoaded = true;
    this.loadChunck();
  });
}

module.exports.load = function load() {
  const images = [];

  const options = {
    width: 2048,
    height: 2048,
    fixedSize: false,
    padding: 2,
    allowRotation: false,
    detectIdentical: true,
    allowTrim: false,
    removeFileExtension: true,
    prependFolderName: true,
    exporter: "PhaserArray",
  };

  fs.readdir(this.sheetsFolder, (err, files) => {
    let textures = false;
    const titles = [];

    if (err) {
      console.error(err);
    }

    for (const title of files) {
      const type = title.slice(title.length - 3, title.length);
      if (type === "png" || type === "jpg") {
        textures = true;
        titles.push(title);
      } else {
        const filePath = path.join(this.sheetsFolder, title);
        fs.unlinkSync(filePath);
      }
    }

    for (const title of titles) {
      const name = title.slice(0, -4);
      const filePath = path.join(this.sheetsFolder, title);
      if (this.isCurrentVersionAsset(name, "sheets")) {
        images.push({ path: title, contents: fs.readFileSync(filePath) });
      }
    }

    if (images.length === 0 || files.length === 0 || !textures) {
      this.sheetsLoaded = true;
      this.loadChunck();

      return;
    }

    texturePacker(images, options, (img) => {
      fs.promises
        .mkdir(this.tempFolder, { recursive: true })
        .catch(console.error);
      fs.writeFile(
        path.join(this.tempFolder, "atlas.png"),
        img[1].buffer,
        () => {
          if (config.qualityAtlas) {
            (async () => {
              await imagemin([path.join(this.tempFolder, "atlas.png")], {
                destination: this.tempFolder,
                glob: false,
                plugins: [
                  imageminMozjpeg(),
                  imageminPngquant({
                    quality: config.qualityAtlas,
                  }),
                ],
              });

              sheetsToBase64.bind(this)(img);
            })();
          } else {
            sheetsToBase64.bind(this)(img);
          }
        }
      );
    });
  });
};
