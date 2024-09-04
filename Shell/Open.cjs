// 目前只是打开飞书 自动发送文件 飞书机器人我看了下 好像不支持

const HMC = require('hmc-win32');
const cp = require('child_process');

const trays = HMC.getTrayList();

const target = trays.find((t) => t.path.includes('Feishu'));

if (target) {
    cp.exec(target.path);
}
