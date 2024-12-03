namespace T {
    export namespace Broadcast {
        export const enum BroadcastEvent {
            Message = 'Message'
        }
    }

    export namespace WebWorker {
        export namespace WebSocket {
            export const enum WebSocketEvent {
                Open = 'Open',
                Close = 'Close',
                Error = 'Error',
                Message = 'Message'
            }

            export type WebSocketMessage = {
                type: WebSocketEvent;
                data: Record<string, unknown>;
            };
        }
    }

    export namespace Theme {
        export const enum Style {
            Dark = 'Dark',
            Light = 'Light'
        }
    }
}

export { T };
