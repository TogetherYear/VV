/**
 * 传递需要运行的函数 参数为主进程发送的数据
 */
const Run = (Instance: (data: Record<string, unknown> | unknown | any) => void) => {
    self.onmessage = (e) => {
        Instance(e.data);
    };
};

export { Run };
