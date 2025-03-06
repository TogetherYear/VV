import { onMounted, onUnmounted } from 'vue';
import { Component } from '@/Libs/Component';
import { Application } from '../../Application';
import { TTest } from '@/Decorators/TTest';
import Empty from '@/Views/Empty/Empty.vue';

class SubPage extends Component<Application> {
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

    @TTest.BindFunction('Popup')
    private PopupEmpty() {
        const c = this.Popup(Empty);
        setTimeout(() => {
            c.unmount();
        }, 3000);
    }
}

export { SubPage };
