import { onMounted, onUnmounted, ref } from 'vue';
import { Component } from '@/Libs/Component';
import { TEvent } from '@/Decorators/TEvent';
import { App } from '@/App';
import { TRouter } from '@/Decorators/TRouter';
import { ElMessage, ElMessageBox } from 'element-plus';
import { TTool } from '@/Decorators/TTool';

@TRouter.Root()
@TTool.Cache('currentCount')
class Application extends Component {
    public constructor() {
        super();
    }

    public InitStates() {
        return {};
    }

    public InitHooks() {}

    public currentCount = ref<number>(0);

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
            message: `OnUpdate:${this.currentCount.value}`
        });
    }

    public OnTest() {
        ElMessageBox.confirm('是否关闭?', '提示')
            .then(() => {
                console.log('Tes');
            })
            .catch(() => {
                console.log('No');
            });
    }
}

export { Application };
