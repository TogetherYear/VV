namespace T {
    export namespace Broadcast {
        export const enum BroadcastEvent {
            Message = 'Message'
        }
    }

    export namespace WebSocket {
        export const enum Event {
            Open = 'Open',
            Close = 'Close',
            Error = 'Error',
            Message = 'Message'
        }

        export type WebSocketMessage = {
            type: Event;
            data: Record<string, unknown>;
        };
    }

    export namespace LocalStore {
        export type LocalStoreKey = {
            Account: string;
            Password: string;
            Token: string;
        };
    }
}

export { T };
