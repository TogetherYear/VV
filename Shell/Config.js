const path = require('path');
const fs = require('fs');

const boundEnv = process.argv.slice(-1)[0];

const inputPath = path.join(__dirname, `../Configs/${boundEnv}.js`);

const outputPath = path.join(__dirname, `../Dist/Configs/index.js`);

fs.readFile(inputPath, (err, data) => {
    if (err) return;
    fs.writeFile(outputPath, data, (err) => {
        if (err) return;
    });
});
