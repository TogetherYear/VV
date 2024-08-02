import { onMounted, onUnmounted, ref } from 'vue';
import { Component } from '@/Libs/Component';
import { Application } from '../../Application';
import { TEvent } from '@/Decorators/TEvent';
import { App } from '@/App';
import { ElMessage } from 'element-plus';
import { TTool } from '@/Decorators/TTool';

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
            type: 'info',
            message: `OnUpdate:Try:${this.currentCount.value}`
        });
    }

    @TTool.Throttle(1000)
    public OnBtnClick() {
        console.log('Try:', this.currentCount.value);
    }
}

export { Try };
