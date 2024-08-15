import { onMounted, onUnmounted } from 'vue';
import { Manager } from '../Libs/Manager';
import { TEvent } from '../Decorators/TEvent';
import { TTest } from '@/Decorators/TTest';
import router from '@/Router';
import { Try } from '@/Views/Application/Component/Try/Try';

@TEvent.Create(['Update'])
class App extends Manager {
    public constructor() {
        super();
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

    @TTest.BindFunction('组件:App')
    public BindTestComponent() {
        console.log(
            'Component:',
            this.GetAllComponent(),
            this.GetComponent<Try>((instance) => instance.hasOwnProperty('inputName'))
        );
    }
}

const AppInstance = new App();

export { AppInstance as App };
