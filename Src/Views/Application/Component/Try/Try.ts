import { onMounted, onUnmounted, ref } from 'vue';
import { Component } from '@/Libs/Component';
import { Application } from '../../Application';
import { TEvent } from '@/Decorators/TEvent';
import { App } from '@/App/App';
import { ElMessage } from 'element-plus';
import { TTool } from '@/Decorators/TTool';
import { TRouter } from '@/Decorators/TRouter';
import { TTest } from '@/Decorators/TTest';
import router from '@/Router';

class Try extends Component {
    public constructor(parent: Application) {
        super();
        this.parent = parent;
    }

    private parent!: Application;

    public currentCount = ref<number>(0);

    public InitStates() {
        return {};
    }

    public InitHooks() {}

    public Run() {
        onMounted(() => {});

        onUnmounted(() => {
            this.Destroy();
        });
    }

    public Destroy() {}

    @TEvent.Listen(App, 'Update')
    public OnUpdate() {
        this.currentCount.value++;
        ElMessage({
            type: 'error',
            message: `OnUpdate:Try:${this.currentCount.value}`
        });
    }

    @TTool.Throttle(1000)
    public OnBtnClick() {
        console.log('Try:', this.currentCount.value);
    }

    @TRouter.WhenTo('Empty')
    public OnTo() {
        ElMessage({
            type: 'info',
            message: `To:Empty:Try`
        });
    }

    @TTest.Bind('测试:Try', { value: 'TSingleton' }, (instance: Try) => instance.currentCount.value)
    public BindTest(options: { value: string }, count: number) {
        console.log(this, options, count);
        router.push({
            path: '/Empty'
        });
    }
}

export { Try };
