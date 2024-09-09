import { onMounted, onUnmounted } from 'vue';
import { Manager } from '../Libs/Manager';
import { TEvent } from '../Decorators/TEvent';
import { TTest } from '@/Decorators/TTest';
import { router } from '@/Router';
import { Try } from '@/Views/Application/Component/Try/Try';
import { I } from '@/Instructions/I';

@TEvent.Create([I.AppEvent.Update])
class App extends Manager {
    public InitStates() {
        return {};
    }

    public selfName = 'App';

    public Run() {
        onMounted(() => {
            setInterval(() => {
                this.Emit(I.AppEvent.Update, { type: 'Update' });
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
            this.GetComponent<Try>((component) => component.hasOwnProperty('inputName'))
        );
    }
}

const AppInstance = new App();

export { AppInstance as App };
