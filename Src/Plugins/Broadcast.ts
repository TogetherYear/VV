import { TEvent } from '@/Decorators/TEvent';
import { T } from '@/Instructions/T';
import { Manager } from '@/Libs/Manager';

/**
 * 多窗口广播
 */
@TEvent.Create([T.Broadcast.BroadcastEvent.Message])
class Broadcast extends Manager {
    constructor() {
        super();
        this.CreateChannel();
    }

    private broadcast!: BroadcastChannel;

    private CreateChannel() {
        this.broadcast = new BroadcastChannel('VVChannel');
        this.broadcast.onmessage = (e) => {
            this.Emit(T.Broadcast.BroadcastEvent.Message, e.data);
        };
    }

    /**
     * 广播消息
     */
    public Send(data: Record<string, unknown>) {
        this.Emit(T.Broadcast.BroadcastEvent.Message, { ...data, fromRoute: this.Route, routeQuery: this.Query, self: true });
        this.broadcast.postMessage({ ...data, fromRoute: this.Route, routeQuery: this.Query, self: false });
    }
}

const BroadcastInstance = new Broadcast();

export { BroadcastInstance as Broadcast };
