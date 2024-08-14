const compressing = require('compressing');
const path = require('path');
const fs = require('fs');
const cp = require('child_process');

const boundEnv = process.argv.slice(-1)[0];

const inputPath = path.join(__dirname, '../Dist');
const outputPath = path.join(__dirname, `../Dist_${boundEnv}.zip`);

const zipStream = new compressing.zip.Stream();

zipStream.addEntry(inputPath);

const destStream = fs.createWriteStream(outputPath);

const result = zipStream.pipe(destStream);

result.on('finish', () => {
    cp.exec(`explorer.exe /select,"${outputPath}"`);
});
