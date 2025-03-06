import { onMounted, onUnmounted, ref } from 'vue';
import { Component } from '@/Libs/Component';
import { TWorker } from '@/Decorators/TWorker';
import { TTest } from '@/Decorators/TTest';
import { TTool } from '@/Decorators/TTool';
import { TWasm } from '@/Decorators/TWasm';
import { SubPage } from './Components/SubPage/SubPage';

class Application extends Component {
    private select = ref<HTMLSpanElement | null>(null);

    public subPage = new SubPage(this);

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
}

export { Application };
