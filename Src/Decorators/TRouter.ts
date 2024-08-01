import { Component } from '@/Libs/Component';
import { onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';

namespace TRouter {
    /**
     * 给子路由用的 如果你想在调试页面获取当前实例 就添加这个
     */
    export function Register() {
        return function <T extends new (...args: Array<any>) => Component>(C: T) {
            return class extends C {
                constructor(...args: Array<any>) {
                    super(...args);
                    const route = useRoute();
                    this.tRouter_register_Path = route.path;
                    this.TRouter_Register_Hooks();
                }

                public tRouter_register_Path!: string;

                private TRouter_Register_Hooks() {
                    onMounted(() => {
                        //@ts-ignore
                        window.currentComponent = this;
                    });

                    onUnmounted(() => {
                        //@ts-ignore
                        window.currentComponent = null;
                    });
                }
            };
        };
    }

    /**
     * 给根路由使用 比如在登录页 和 进去后的根页面使用
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
