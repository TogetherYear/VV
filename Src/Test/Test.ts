import { Manager } from '@/Libs/Manager';
import { isReactive, isRef, onMounted, onUnmounted, toRaw } from 'vue';

class Test extends Manager {
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

    public OnClickTest(e: { label: string; scope: Object; funcName: string; args: Array<unknown> }) {
        const r = toRaw(e);
        eval(`r.scope['${e.funcName}'](...r.args)`);
    }
}

const TestInstance = new Test();

export { TestInstance as Test };
