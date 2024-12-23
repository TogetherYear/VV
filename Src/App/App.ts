import { onMounted, onUnmounted } from 'vue';
import { Manager } from '../Libs/Manager';
import { Theme } from '@/Theme/Theme';

class App extends Manager {
    public InitStates() {
        return {};
    }

    public Run() {
        Theme.LoadTheme('Dark');
        onMounted(() => {});

        onUnmounted(() => {
            this.Destroy();
        });
    }

    public Destroy() {}
}

const AppInstance = new App();

export { AppInstance as App };
