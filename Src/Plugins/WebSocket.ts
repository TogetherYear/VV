import WS from '@/Worker/Global/WebSocket/index?worker';
import { Manager } from '@/Libs/Manager';
import { TEvent } from '@/Decorators/TEvent';
import { T } from '@/Instructions/T';

@TEvent.Create([T.WebSocket.Event.Open, T.WebSocket.Event.Close, T.WebSocket.Event.Error, T.WebSocket.Event.Message])
class WebSocket extends Manager {
    constructor() {
        super();
    }

    private webSocket!: Worker;

    public CreateWebSocket() {
        this.webSocket = new WS();

        this.webSocket.postMessage({
            url: import.meta.env.VITE_APP_SERVER_WS,
            retryCount: 10
        });

        //@ts-ignore
        this.webSocket.onmessage = (e: { data: T.WebSocket.WebSocketMessage }) => {
            if (e.data.type === T.WebSocket.Event.Open) {
                this.Emit(T.WebSocket.Event.Open, e.data.data);
            } else if (e.data.type === T.WebSocket.Event.Close) {
                this.Emit(T.WebSocket.Event.Close, e.data.data);
            } else if (e.data.type === T.WebSocket.Event.Error) {
                this.Emit(T.WebSocket.Event.Error, e.data.data);
            } else if (e.data.type === T.WebSocket.Event.Message) {
                this.Emit(T.WebSocket.Event.Message, e.data.data);
            }
        };
    }
}

const WebSocketInstance = new WebSocket();

export { WebSocketInstance as WebSocket };
