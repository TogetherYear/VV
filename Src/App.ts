import { onMounted, onUnmounted } from 'vue';
import { Manager } from './Libs/Manager';
import { TEvent } from './Decorators/TEvent';

@TEvent.Generate(TEvent.Lifecycle.Global)
@TEvent.Create(['Update'])
class App extends Manager {
    public InitStates() {
        return {};
    }

    public InitHooks() {}

    public Run() {
        onMounted(() => {
            setInterval(() => {
                this.Emit('Update');
            }, 1000);
        });

        onUnmounted(() => {
            this.Destroy();
        });
    }

    public Destroy() {}
}

const AppInstance = new App();

export { AppInstance as App };
