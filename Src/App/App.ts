import { onMounted, onUnmounted } from 'vue';
import { Manager } from '../Libs/Manager';

class App extends Manager {
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

const AppInstance = new App();

export { AppInstance as App };
