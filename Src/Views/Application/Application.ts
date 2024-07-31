import { onMounted, onUnmounted, ref } from 'vue';
import { Component } from '@/Libs/Component';
import { TEvent } from '@/Decorators/TEvent';
import { App } from '@/App';
import { TRouter } from '@/Decorators/TRouter';

@TRouter.Root()
class Application extends Component {
    public constructor() {
        super();
    }

    public InitStates() {
        return {};
    }

    public InitHooks() {}

    public currentCount = ref<number>(0);

    public Run() {
        onMounted(() => {});

        onUnmounted(() => {
            this.Destroy();
        });
    }

    public Destroy() {}

    @TEvent.Listen(App, 'Update')
    public OnUpdate() {
        this.currentCount.value++;
    }

    public OnTest() {}
}

export { Application };
