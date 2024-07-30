import { Component } from '@/Libs/Component';
import { onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';

namespace TRouter {
    /**
     * 给子路由用的
     */
    export function Register() {
        return function <T extends new (...args: Array<any>) => Component>(C: T) {
            return class extends C {
                constructor(...args: Array<any>) {
                    super(...args);
                    const route = useRoute();
                    this.register_Path = route.path;
                    this.Register_Hooks();
                }

                public register_Path!: string;

                private Register_Hooks() {
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
                    this.Root_Hooks();
                }

                private Root_Hooks() {
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
