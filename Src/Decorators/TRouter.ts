import { EventSystem } from '@/Libs/EventSystem';
import { onMounted, onUnmounted } from 'vue';
import { onBeforeRouteLeave, useRoute } from 'vue-router';

namespace TRouter {
    /**
     * 上一次路由
     */
    export let lastPath = '';

    /**
     * 当前路由
     */
    export let currentPath = '';

    /**
     * 路由生成
     */
    export function Generate() {
        return function <T extends new (...args: Array<any>) => EventSystem>(C: T) {
            return class extends C {
                constructor(...args: Array<any>) {
                    super(...args);
                    this.TRouter_Generate_Hooks();
                    this.SetDefaultRoute();
                }

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
                    //@ts-ignore
                    const from = (this['tRouter_From_NeedCreate'] || []) as Array<{ funcName: string; from: string | ((instance: Object) => string) }>;
                    for (let f of from) {
                        if (lastPath.indexOf(typeof f.from === 'function' ? f.from(this) : f.from) !== -1) {
                            //@ts-ignore
                            this[`${f.funcName}`]();
                        }
                    }
                }

                private TRouter_Generate_EmitTo() {
                    //@ts-ignore
                    const to = (this['tRouter_To_NeedCreate'] || []) as Array<{ funcName: string; to: string | ((instance: Object) => string) }>;
                    for (let t of to) {
                        if (currentPath.indexOf(typeof t.to === 'function' ? t.to(this) : t.to) !== -1) {
                            //@ts-ignore
                            this[`${t.funcName}`]();
                        }
                    }
                }

                private SetDefaultRoute() {
                    currentPath = useRoute().path;
                }
            };
        };
    }

    /**
     * 给根路由使用 比如在登录页 和 进去后的根页面使用 用来做 Loading 也就是 路由最外面那一层才需要加
     */
    export function Root() {
        return function <T extends new (...args: Array<any>) => EventSystem>(C: T) {
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
     * 如果从 from 路由进来 会触发的函数 我会进行匹配 只要传入参数被包含在路由中 触发函数不支持传参 ( from 为 '/' 即只要进来就会触发)
     */
    export function WhenFrom<T extends EventSystem>(from: string | ((instance: T) => string)) {
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
     * 如果进入 to 路由 会触发的函数 我会进行匹配 只要传入参数被包含在路由中 触发函数不支持传参 ( To 为 '/' 即只要离开就会触发)
     */
    export function WhenTo<T extends EventSystem>(to: string | ((instance: T) => string)) {
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
