import { onMounted, onUnmounted } from 'vue';
import { Component } from '@/Libs/Component';
import { Preload } from '@/Preload/Preload';
import { TEvent } from '@/Decorators/TEvent';
import { App } from '@/App';

class Application extends Component {
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

    @TEvent.Listen(App, 'Update')
    public OnUpdate() {
        Preload.message.success('Update!');
    }
}

export { Application };
