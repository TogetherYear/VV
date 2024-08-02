import { onMounted, onUnmounted } from 'vue';

namespace TRouter {
    /**
     * 路由生成
     */
    export function Generate() {
        return function <T extends new (...args: Array<any>) => Object>(C: T) {
            return class extends C {
                constructor(...args: Array<any>) {
                    super(...args);
                    this.TRouter_Generate_Hooks();
                }

                private TRouter_Generate_Hooks() {}
            };
        };
    }

    /**
     * 给根路由使用 比如在登录页 和 进去后的根页面使用 用来做 Loading 也就是 路由最外面那一层才需要加
     */
    export function Root() {
        return function <T extends new (...args: Array<any>) => Object>(C: T) {
            return class extends C {
                constructor(...args: Array<any>) {
                    super(...args);
                    this.TRouter_Root_Hooks();
                }

                private TRouter_Root_Hooks() {
                    onMounted(() => {
                        //@ts-ignore
                        window.HideLoading();
                    });

                    onUnmounted(() => {
                        //@ts-ignore
                        window.ShowLoading();
                    });
                }
            };
        };
    }
}

export { TRouter };
