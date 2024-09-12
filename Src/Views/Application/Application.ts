import { onMounted, onUnmounted } from 'vue';
import { Component } from '@/Libs/Component';

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
}

export { Application };
