import { onMounted, onUnmounted } from 'vue';
import { Manager } from '../Libs/Manager';
import { TEvent } from '../Decorators/TEvent';
import { TTest } from '@/Decorators/TTest';
import router from '@/Router';

@TEvent.Create(['Update'])
class App extends Manager {
    public constructor() {
        super();
        this.selfName = 'App';
    }
    public InitStates() {
        return {};
    }

    public Run() {
        onMounted(() => {
            setInterval(() => {
                this.Emit('Update', { type: 'Update' });
            }, 1000);
        });

        onUnmounted(() => {
            this.Destroy();
        });
    }

    public Destroy() {}

    @TTest.BindFunction('测试:App', 'App', '测试', true)
    public BindTest(label: string, title: string, type: boolean) {
        console.log(this, label, title, type);
        router.push({
            path: '/Application'
        });
    }
}

const AppInstance = new App();

type AppType = App;

export { AppInstance as App, AppType };
