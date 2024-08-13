import { onMounted, onUnmounted } from 'vue';
import { Manager } from '../Libs/Manager';
import { TEvent } from '../Decorators/TEvent';
import { TTest } from '@/Decorators/TTest';

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

    @TTest.Bind('测试:App', 'App', '测试', 24)
    public BindTest(label: string, title: string, count: number) {
        console.log(this, label, title, count);
    }
}

const AppInstance = new App();

export { AppInstance as App };
