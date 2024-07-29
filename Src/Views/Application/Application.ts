import { onMounted, onUnmounted } from 'vue';
import { Component } from '@/Libs/Component';
import { Preload } from '@/Preload/Preload';
import { TEvent } from '@/Decorators/TEvent';
import { App } from '@/App';
import { TTool } from '@/Decorators/TTool';

class Application extends Component {
    public constructor() {
        super();
    }

    public InitStates() {
        return {};
    }

    public InitHooks() {}

    public currentCount = 0;

    public Run() {
        onMounted(() => {});

        onUnmounted(() => {
            this.Destroy();
        });
    }

    public Destroy() {}

    @TEvent.Listen(App, 'Update')
    public OnUpdate() {
        this.currentCount++;
        Preload.message.success('Update：' + this.currentCount);
    }
}

export { Application };
