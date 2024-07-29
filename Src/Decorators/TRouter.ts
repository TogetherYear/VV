import { Component } from '@/Libs/Component';
import { onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';

namespace TRouter {
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
}

export { TRouter };
