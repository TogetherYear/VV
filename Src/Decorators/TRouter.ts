import { onMounted, onUnmounted } from 'vue';
import { onBeforeRouteLeave, useRoute } from 'vue-router';

namespace TRouter {
    let lastPath = '';
    let currentPath = '';
    /**
     * 路由生成
     */
    export function Generate() {
        return function <T extends new (...args: Array<any>) => Object>(C: T) {
            return class extends C {
                constructor(...args: Array<any>) {
                    super(...args);
                    const route = useRoute();
                    this.tRouter_Generate_Route = route.path;
                    this.TRouter_Generate_Hooks();
                }

                private tRouter_Generate_Route!: string;

                private TRouter_Generate_Hooks() {
                    onMounted(() => {
                        this.TRouter_Generate_EmitFrom();
                    });

                    onUnmounted(() => {
                        this.TRouter_Generate_EmitTo();
                    });

                    onBeforeRouteLeave((to, from, next) => {
                        lastPath = from.path;
                        currentPath = to.path;
                        next();
                    });
                }

                private TRouter_Generate_EmitFrom() {
                    const from = (eval(`this['tRouter_From_NeedCreate']`) || []) as Array<{ funcName: string; from: string }>;
                    for (let f of from) {
                        if (lastPath.indexOf(f.from) !== -1) {
                            //@ts-ignore
                            this[`${f.funcName}`]();
                        }
                    }
                }

                private TRouter_Generate_EmitTo() {
                    const to = (eval(`this['tRouter_To_NeedCreate']`) || []) as Array<{ funcName: string; to: string }>;
                    for (let t of to) {
                        if (currentPath.indexOf(t.to) !== -1) {
                            //@ts-ignore
                            this[`${t.funcName}`]();
                        }
                    }
                }
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

    /**
     * 如果从 from 路由进来 会触发的函数 我会进行匹配 只要传入参数被包含在路由中 不支持传参
     */
    export function From(from: string) {
        return function (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
            //@ts-ignore
            if (target['tRouter_From_NeedCreate']) {
                //@ts-ignore
                target['tRouter_From_NeedCreate'].push({
                    funcName: propertyKey,
                    from
                });
            } else {
                //@ts-ignore
                target['tRouter_From_NeedCreate'] = [
                    {
                        funcName: propertyKey,
                        from
                    }
                ];
            }
        };
    }

    /**
     * 如果进入 to 路由 会触发的函数 我会进行匹配 只要传入参数被包含在路由中 不支持传参
     */
    export function To(to: string) {
        return function (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
            //@ts-ignore
            if (target['tRouter_To_NeedCreate']) {
                //@ts-ignore
                target['tRouter_To_NeedCreate'].push({
                    funcName: propertyKey,
                    to
                });
            } else {
                //@ts-ignore
                target['tRouter_To_NeedCreate'] = [
                    {
                        funcName: propertyKey,
                        to
                    }
                ];
            }
        };
    }
}

export { TRouter };
