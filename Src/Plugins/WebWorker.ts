import WS from '@/Worker/Global/WebSocket/index?worker';
import { Manager } from '@/Libs/Manager';
import { TEvent } from '@/Decorators/TEvent';
import { T } from '@/Instructions/T';

@TEvent.Create([T.WebWorker.WebSocket.WebSocketEvent.Open, T.WebWorker.WebSocket.WebSocketEvent.Close, T.WebWorker.WebSocket.WebSocketEvent.Error, T.WebWorker.WebSocket.WebSocketEvent.Message])
class WebWorker extends Manager {
    constructor() {
        super();
        this.CreateWorker();
    }

    private webSocket!: Worker;

    private CreateWorker() {
        this.CreateWebSocket();
    }

    private CreateWebSocket() {
        this.webSocket = new WS();

        this.webSocket.postMessage({
            url: 'wss://plus.xinkongan.com/socket/connect/1/6dc86bf07f414fe499c61d42ca7133bc',
            retryCount: 10
        });

        //@ts-ignore
        this.webSocket.onmessage = (e: { data: T.WebWorker.WebSocket.WebSocketMessage }) => {
            if (e.data.type === T.WebWorker.WebSocket.WebSocketEvent.Open) {
                this.Emit(T.WebWorker.WebSocket.WebSocketEvent.Open, e.data.data);
            } else if (e.data.type === T.WebWorker.WebSocket.WebSocketEvent.Close) {
                this.Emit(T.WebWorker.WebSocket.WebSocketEvent.Close, e.data.data);
            } else if (e.data.type === T.WebWorker.WebSocket.WebSocketEvent.Error) {
                this.Emit(T.WebWorker.WebSocket.WebSocketEvent.Error, e.data.data);
            } else if (e.data.type === T.WebWorker.WebSocket.WebSocketEvent.Message) {
                this.Emit(T.WebWorker.WebSocket.WebSocketEvent.Message, e.data.data);
            }
        };
    }
}

const WebWorkerInstance = new WebWorker();

export { WebWorkerInstance as WebWorker };
