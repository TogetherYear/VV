import { onMounted, onUnmounted } from 'vue';
import { Manager } from '../Libs/Manager';
import { Theme } from '@/Theme/Theme';
import { T } from '@/Instructions/T';

class App extends Manager {
    public InitStates() {
        return {};
    }

    public Run() {
        Theme.LoadTheme(T.Theme.Style.Dark);
        onMounted(() => {});

        onUnmounted(() => {
            this.Destroy();
        });
    }

    public Destroy() {}
}

const AppInstance = new App();

export { AppInstance as App };
