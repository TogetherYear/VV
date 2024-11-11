const crypto = require('crypto');
const path = require('path');
const fs = require('fs');

const boundEnv = process.argv.slice(-1)[0];

function Uid() {
    return crypto.randomBytes(4).toString('hex');
}

const replaceDir = ['Configs', 'Loading'];

const outputPath = path.join(__dirname, `../Dist/`);

const htmlPath = path.join(outputPath, 'index.html');

let htmlString = fs.readFileSync(htmlPath, { encoding: 'utf-8' });

for (let r of replaceDir) {
    const files = fs.readdirSync(path.join(outputPath, r));
    for (let f of files) {
        const s = f.split('.');
        const result = `${s[0]}-${Uid()}.${s[1]}`;
        htmlString = htmlString.replace(`${r}/${f}`, `${r}/${result}`);
        fs.renameSync(path.join(outputPath, `${r}/${f}`), path.join(outputPath, `${r}/${result}`));
    }
}

fs.writeFileSync(htmlPath, htmlString, { encoding: 'utf-8' });
