import { onMounted, onUnmounted } from 'vue';
import { Component } from '@/Libs/Component';
import { TWorker } from '@/Decorators/TWorker';

class Application extends Component {
    public InitStates() {
        return {};
    }

    public Run() {
        onMounted(() => {
            this.GetWorkerData({ need: 'white' });
        });

        onUnmounted(() => {
            this.Destroy();
        });
    }

    public Destroy() {}

    @TWorker.Await('Color')
    public GetWorkerData(data: Record<string, unknown>) {
        console.error('Get:', data);
    }
}

export { Application };
