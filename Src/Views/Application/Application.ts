import { onMounted, onUnmounted } from 'vue';
import { AActor } from '@/Libs/AActor';
import { Preload } from '@/Preload/Preload';

class Application extends AActor {
    public constructor() {
        super();
    }

    public InitStates() {
        return {};
    }

    public InitHooks() {}

    public Run() {
        onMounted(() => {});
        onUnmounted(() => {
            this.Destroy();
        });
    }

    public Destroy() {}

    public Test() {
        Preload.message.success('Hello World!');
    }
}

export { Application };
