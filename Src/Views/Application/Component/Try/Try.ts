import { onMounted, onUnmounted, ref } from 'vue';
import { Component } from '@/Libs/Component';
import { Application } from '../../Application';
import { TEvent } from '@/Decorators/TEvent';
import { App } from '@/App/App';
import { TTool } from '@/Decorators/TTool';
import { TRouter } from '@/Decorators/TRouter';
import { TTest } from '@/Decorators/TTest';
import router from '@/Router';

@TTool.Cache(['inputName'])
class Try extends Component<Application> {
    public constructor(parent: Application) {
        super(parent);
    }

    @TTool.LimitRange<Try>((instance) => 0, ~~(Math.random() * 10 + 10))
    @TTest.BindProperty('Try')
    public currentCount = ref<number>(0);

    @TTool.LimitLength<Try>((instance) => instance.currentCount.value + 10)
    @TTool.Watch<Try, string>((instance, newValue, oldValue) => {
        console.log(instance, newValue, oldValue);
    })
    public inputName = ref<string>('TSingletonT');

    public InitStates() {
        return {
            currentCount: this.currentCount,
            inputName: this.inputName
        };
    }

    public Run() {
        onMounted(() => {});

        onUnmounted(() => {
            this.Destroy();
        });
    }

    public Destroy() {}

    @TEvent.Listen(App, 'Update')
    public OnUpdate(e: { type: string }) {
        this.currentCount.value++;
    }

    @TEvent.Listen(window, 'click')
    public OnClick(e: PointerEvent) {
        console.log('ClickWindow', e);
    }

    @TTool.Throttle<Try>((instance) => (11 - instance.currentCount.value) * 100)
    public OnBtnClick() {
        console.log('Try:', this.currentCount.value);
        console.log(this.GetAllComponent());
    }

    @TRouter.WhenTo<Try>((instance) => 'Empty')
    public OnTo() {
        console.log(`To:Empty:Try`);
    }

    @TTest.BindFunction('测试:Try', { value: 'TSingleton' }, (instance: Try) => instance.currentCount.value)
    public BindTest(options: { value: string }, count: number) {
        console.log(this, options, count);
        router.push({
            path: '/Empty'
        });
    }
}

export { Try };
