import Color from './Color/index?worker';

/**
 * 传递需要运行的函数 参数为主进程发送的数据
 */
const Run = (Instance: (data: Record<string, unknown>) => void) => {
    self.onmessage = (e) => {
        Instance(e.data);
    };
};

/**
 * 结束 Worker 参数为需要发送到主进程的数据
 */
const Finish = (data: Record<string, unknown>) => {
    self.postMessage(data);
};

export { Color, Run, Finish };
