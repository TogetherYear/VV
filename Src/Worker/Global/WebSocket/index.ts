import { Run } from '../index';

type WebSocketOptions = {
    /**
     * 地址
     */
    url: string;
    /**
     * 重试次数
     */
    retryCount: number;
};

Run((o: WebSocketOptions) => {
    let closeCount = 0;
    let client: WebSocket | null = null;
    let pingTimer = 0;

    const CreateWebSocket = () => {
        client = new WebSocket(o.url);

        client.onopen = (e) => {
            self.postMessage({
                type: 'Open',
                data: {}
            });
            clearInterval(pingTimer);
            pingTimer = setInterval(() => {
                client?.send('PING');
            }, 10000);
        };

        client.onclose = (e) => {
            if (closeCount < o.retryCount) {
                closeCount++;
                client = null;
                CreateWebSocket();
            }
            self.postMessage({
                type: 'Close',
                data: {}
            });
            clearInterval(pingTimer);
        };

        client.onerror = (e) => {
            self.postMessage({
                type: 'Error',
                data: {}
            });
        };

        client.onmessage = (e) => {
            /**
             * 对不同格式做处理
             */
            // self.postMessage({
            //     type: 'Message',
            //     data: {}
            // });
        };
    };

    CreateWebSocket();
});
