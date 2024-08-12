const compressing = require('compressing');
const path = require('path')
const fs = require('fs')

const inputPath = path.join(__dirname, '../Dist')
const outputPath = path.join(__dirname, '../Dist.zip')

compressing.zip.compressDir(inputPath, outputPath).then(() => {

}).catch(() => {

})