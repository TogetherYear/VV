import { onMounted, onUnmounted, ref } from 'vue';
import { Component } from '@/Libs/Component';
import { TEvent } from '@/Decorators/TEvent';
import { App } from '@/App';
import { TRouter } from '@/Decorators/TRouter';
import { ElMessage, ElMessageBox } from 'element-plus';
import { TTool } from '@/Decorators/TTool';
import { Try } from './Component/Try/Try';

@TRouter.Root()
@TTool.Cache('currentCount')
class Application extends Component {
    public InitStates() {
        return {};
    }

    public InitHooks() {}

    public try = new Try(this);

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
            type: 'success',
            message: `OnUpdate:Application:${this.currentCount.value}`
        });
    }

    @TTool.Debounce(1000)
    public OnBtnClick() {
        console.log('Application:', this.currentCount.value);
        return;
        ElMessageBox.confirm('是否关闭?', '提示')
            .then(() => {
                console.log('Tes');
            })
            .catch(() => {
                console.log('No');
            });
    }

    @TRouter.From('Empty')
    public OnFrom() {
        ElMessage({
            type: 'info',
            message: `From:Empty:Application`
        });
    }
}

export { Application };
