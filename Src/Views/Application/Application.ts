import { onMounted, onUnmounted } from 'vue';
import { Component } from '@/Libs/Component';
import { TWorker } from '@/Decorators/TWorker';
import { TTest } from '@/Decorators/TTest';
import { TTool } from '@/Decorators/TTool';

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

    @TWorker.Await('Color')
    @TTest.BindFunction('Worker', { need: 'White' })
    @TTool.Debounce(500)
    public GetWorkerData(data: Record<string, unknown>) {
        console.error('Get:', data);
    }
}

export { Application };
