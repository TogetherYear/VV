import { onMounted, onUnmounted } from 'vue';
import { Component } from '@/Libs/Component';
import { TWorker } from '@/Decorators/TWorker';
import { TTest } from '@/Decorators/TTest';
import { TTool } from '@/Decorators/TTool';
import { TWasm } from '@/Decorators/TWasm';
import { Broadcast } from '@/Plugins/Broadcast';
import { TEvent } from '@/Decorators/TEvent';
import { T } from '@/Instructions/T';

class Application extends Component {
    public InitStates() {
        return {};
    }

    public Run() {
        onMounted(() => {});

        onUnmounted(() => {
            this.Destroy();
        });
    }

    public Destroy() {}

    @TWorker.Await(TWorker.Type.Color)
    @TTest.BindFunction('Worker', { need: '...' })
    @TTool.Debounce(500)
    private GetWorkerData(data: Record<string, unknown>) {
        console.error('Get:', data);
    }

    @TWasm.Await(TWorker.Type.Color)
    @TTest.BindFunction('Wasm', { need: '...' })
    @TTool.Debounce(500)
    private GetWasmData(data: Record<string, unknown>) {
        console.error('Get:', data);
    }

    @TEvent.Listen(Broadcast, T.Broadcast.BroadcastEvent.Message)
    private OnBroadcastMessage(e: Record<string, unknown>) {
        console.log('Broadcast', e);
    }

    @TTest.BindFunction('TestBroadcast')
    private TestBroadcast() {
        Broadcast.Send({ type: 'Test' });
    }
}

export { Application };
