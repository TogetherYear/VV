const fs = require('fs')
const path = require('path')

const MoveServeToDist = () => {
    const serverExePath = path.join(__dirname, '/Env/Server.exe')
    const distPath = path.join(__dirname, '/Dist/Server.exe')
    fs.copyFile(serverExePath, distPath, (err) => {
        if (err) return;
    })
}

MoveServeToDist()