import { Manager } from '@/Libs/Manager';
import { onMounted, onUnmounted, ref, toRaw } from 'vue';

class Test extends Manager {
    private isShow = ref<boolean>(true);

    public InitStates() {
        return {
            isShow: this.isShow
        };
    }

    public InitHooks() {}

    public Run() {
        this.isShow.value = Config.env === 'Local';
        onMounted(() => {});

        onUnmounted(() => {
            this.Destroy();
        });
    }

    public Destroy() {}

    public OnClickTest(e: { label: string; scope: Object; funcName: string; args: Array<unknown> }) {
        const r = toRaw(e);
        eval(`r.scope['${r.funcName}'](...r.args)`);
    }
}

const TestInstance = new Test();

export { TestInstance as Test };
