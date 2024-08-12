const compressing = require('compressing');
const path = require('path');
const fs = require('fs');

const inputPath = path.join(__dirname, '../Dist');
const outputPath = path.join(__dirname, '../DistA.zip');

const zipStream = new compressing.zip.Stream();

zipStream.addEntry(inputPath);

const destStream = fs.createWriteStream(outputPath);

zipStream.pipe(destStream)