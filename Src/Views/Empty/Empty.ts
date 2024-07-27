import { Component } from '@/Libs/Component';
import { onMounted, onUnmounted } from 'vue';

class Empty extends Component {
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

    protected Destroy() {}
}

export { Empty };
