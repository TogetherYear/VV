import { onMounted, onUnmounted } from 'vue';
import { Manager } from '../Libs/Manager';
import { TEvent } from '../Decorators/TEvent';
import { TTest } from '@/Decorators/TTest';
import router from '@/Router';

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

    @TTest.Bind('测试:App', 'App', '测试', true)
    public BindTest(label: string, title: string, type: boolean) {
        console.log(this, label, title, type);
        router.push({
            path: '/Application'
        });
    }
}

const AppInstance = new App();

export { AppInstance as App };
