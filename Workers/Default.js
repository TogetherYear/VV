/**
 * 传递需要运行的函数 参数为主进程发送的数据
 */
const Run = (Instance) => {
    self.onmessage = (e) => {
        Instance(e.data);
    };
};

/**
 * 结束 Worker 参数为需要发送到主进程的数据
 */
const Finish = (data) => {
    self.postMessage(data);
};

export { Run, Finish };
