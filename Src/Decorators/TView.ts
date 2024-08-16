import { Entity } from '@/Libs/Entity';
import { onMounted, onUnmounted } from 'vue';

namespace TView {
    /**
     * 页面生成
     */
    export function Generate() {
        return function <T extends new (...args: Array<any>) => Entity>(C: T) {
            return class extends C {
                constructor(...args: Array<any>) {
                    super(...args);
                    this.TView_Generate_Hooks();
                }

                private TView_Generate_Hooks() {
                    onMounted(() => {});

                    onUnmounted(() => {});
                }
            };
        };
    }
}

export { TView };
