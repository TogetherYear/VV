import { onMounted, onUnmounted } from 'vue';
import { Manager } from '../Libs/Manager';
import { TEvent } from '../Decorators/TEvent';
import { TTest } from '@/Decorators/TTest';
import router from '@/Router';
import { Try } from '@/Views/Application/Component/Try/Try';

@TEvent.Create(['Update'])
class App extends Manager {
    public InitStates() {
        return {};
    }

    public selfName = 'App';

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

    @TTest.BindFunction('实例:App')
    public BindTestComponentAndManager() {
        console.log(
            'Component:',
            this.GetAllComponent(),
            this.GetComponent<Try>((instance) => instance.hasOwnProperty('inputName'))
        );
        console.log(
            'Manager:',
            this.GetAllManager(),
            this.GetManager<AppType>((instance) => instance.hasOwnProperty('selfName'))
        );
    }
}

const AppInstance = new App();

type AppType = App;

export { AppInstance as App, AppType };
