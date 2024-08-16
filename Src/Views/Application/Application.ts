import { onMounted, onUnmounted, reactive, ref } from 'vue';
import { Component } from '@/Libs/Component';
import { TEvent } from '@/Decorators/TEvent';
import { TRouter } from '@/Decorators/TRouter';
import { ElMessageBox } from 'element-plus';
import { TTool } from '@/Decorators/TTool';
import { Try } from './Component/Try/Try';
import { App } from '@/App/App';
import { TTest } from '@/Decorators/TTest';

@TRouter.Root()
@TTool.Cache<Application>(['current'])
class Application extends Component {
    public try = new Try(this);

    private dom = ref<HTMLElement | null>(null);

    @TTest.BindProperty('Application')
    public current = reactive({
        count: 0
    });

    public InitStates() {
        return {
            dom: this.dom,
            current: this.current
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
    public OnUpdate() {
        this.current.count++;
    }

    @TTool.Debounce(1000)
    public OnBtnClick() {
        console.log('Application:', this.current.count);
        return;
        ElMessageBox.confirm('是否关闭?', '提示')
            .then(() => {
                console.log('Tes');
            })
            .catch(() => {
                console.log('No');
            });
    }

    @TRouter.WhenFrom('Empty')
    public OnFrom() {
        console.log(`From:Empty:Application`);
    }

    @TTool.Observer<Application>((instane) => instane.dom.value as HTMLElement)
    public OnNeedState(flag: boolean) {
        console.log(`OnNeedState:${flag}`);
    }

    @TEvent.Listen<Application>((instance) => instance.dom.value as HTMLElement, 'click')
    public OnClickObserver(e: PointerEvent) {
        e.stopPropagation();
        console.warn('ClickObserver', e);
    }
}

export { Application };
