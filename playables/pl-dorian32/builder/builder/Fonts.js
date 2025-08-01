const fs = require('fs');
const fetch = require('fetch-base64');
const path = require('path');

module.exports.load = function load() {
    this.fonts = '';

    fs.readdir(this.fontsFolder, (err, names) => {
        const currentVersionFonts = [];
        let font = false;

        if (err) {
            console.error(err);
        }

        for (const title of names) {
            const filePath = path.join(this.fontsFolder, title);
            const type = title.slice(title.length - 3, title.length);
            type === 'ttf' ? (font = true) : fs.unlinkSync(filePath);
        }

        const files = [];
        for (const title of names) {
            const name = title.slice(0, -4);
            this.isCurrentVersionAsset(name, 'fonts') && files.push(title);
        }

        if (names.length === 0 || files.length === 0 || !font) {
            this.resources += "window.App.resources.fonts='Arial.ttf';";
            this.fontsLoaded = true;
            this.loadChunck();

            return;
        }

        for (let i = 0; i < files.length; i++) {
            fetch
                .local(path.join(this.fontsFolder, files[i]))
                .then((data) => {
                    fs.readFile(path.join(this.templateFolder, 'font.html'), 'utf8', (errorHtml, html) => {
                        const name = files[i].toLocaleLowerCase().slice(0, -4);
                        let newHtml = html.replace('name', name);
                        newHtml = newHtml.replace('{data}', data[0]);
                        newHtml = newHtml.replace('name2', name);
                        this.fonts += newHtml;

                        this.fontsLoaded = true;
                        this.loadChunck();
                    });
                })
                .catch(() => {});

            currentVersionFonts.push(files[i]);
        }

        currentVersionFonts.push('Arial.ttf');

        this.resources += `window.App.resources.fonts='${currentVersionFonts}';`;
    });
};
