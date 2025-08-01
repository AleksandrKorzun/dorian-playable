const fs = require('fs');
const base64Img = require('base64-img');
const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const path = require('path');

module.exports.load = function load() {
    function spineToBase64(_path, title, count) {
        base64Img.base64(_path, (err, data) => {
            this.resources += `window.App.resources.spine.${title}='${data}';`;

            count.current += 1;

            if (count.current === count.total) {
                this.spineLoaded = true;
                this.inlineSpine = true;
                this.loadChunck();
            }
        });
    }

    fs.readdir(this.spineFolder, (err, names) => {
        const files = [];

        if (err) {
            console.error(err);
        }

        for (const title of names) {
            const name = title.slice(0, title.indexOf('.'));

            this.isCurrentVersionAsset(name, 'spine') && files.push(title);
        }

        if (files.length === 0 || names.length === 0) {
            this.spineLoaded = true;
            this.inlineSpine = false;
            this.loadChunck();

            return;
        }

        const count = { current: 0, total: names.length / 3 };
        for (let i = 0; i < files.length; i++) {
            const filePath = path.join(this.spineFolder, files[i]);
            if (files[i].slice(files[i].length - 3, files[i].length) === 'png') {
                (async () => {
                    await imagemin([filePath], {
                        destination: this.tempFolder,
                        glob: false,
                        plugins: [
                            imageminMozjpeg(),
                            imageminPngquant({
                                quality: [0.6, 0.8],
                            }),
                        ],
                    });

                    spineToBase64.bind(this)(path.join(this.tempFolder, files[i]), files[i], count);
                })();
            } else if (files[i].slice(files[i].length - 4, files[i].length) === 'json') {
                fs.readFile(filePath, 'utf8', (errorJson, json) => {
                    this.resources += `window.App.resources.spine.${files[i]}='${JSON.minify(json)}';`;
                });
            } else if (files[i].slice(files[i].length - 5, files[i].length) === 'atlas') {
                this.resources += `window.App.resources.spine.${files[i].slice(0, -6)}={};`;
                fs.readFile(filePath, 'utf8', (errorAtlas, atlas) => {
                    const newAtlas = atlas.replace(/\n/g, '\\n');
                    this.resources += `window.App.resources.spine.${files[i]}='${newAtlas}';`;
                });
            }
        }
    });
};
