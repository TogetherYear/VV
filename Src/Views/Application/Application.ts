import { onMounted, onUnmounted, ref } from 'vue';
import { Component } from '@/Libs/Component';
import { TWorker } from '@/Decorators/TWorker';
import { TTest } from '@/Decorators/TTest';
import { TTool } from '@/Decorators/TTool';
import { TWasm } from '@/Decorators/TWasm';
import { Broadcast } from '@/Plugins/Broadcast';
import { TEvent } from '@/Decorators/TEvent';
import { T } from '@/Instructions/T';

class Application extends Component {
    private select = ref<HTMLSpanElement | null>(null);

    public InitStates() {
        return {
            select: this.select
        };
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

    @TTool.SelectFile<Application>((instance) => instance.select.value!, {
        accept: ['.png', '.jpg'],
        multiple: false,
        maxSize: 100
    })
    private GetSelectFile(files: Array<File>, error?: string) {
        console.log(files, error);
    }
}

export { Application };
