import { onMounted, onUnmounted } from 'vue';
import { Component } from '@/Libs/Component';
import { TWorker } from '@/Decorators/TWorker';
import { TTest } from '@/Decorators/TTest';
import { TTool } from '@/Decorators/TTool';
import { TWasm } from '@/Decorators/TWasm';

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
    public GetWorkerData(data: Record<string, unknown>) {
        console.error('Get:', data);
    }

    @TWasm.Await(TWorker.Type.Color)
    @TTest.BindFunction('Wasm', { need: '...' })
    @TTool.Debounce(500)
    public GetWasmData(data: Record<string, unknown>) {
        console.error('Get:', data);
    }
}

export { Application };
