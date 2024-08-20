import { Entity } from '@/Libs/Entity';
import { onMounted, onUnmounted, ref } from 'vue';
import { RouteLocationNormalizedGeneric } from 'vue-router';

namespace TRouter {
    /**
     * 上一次路由
     */
    export const lastPath = ref<string>('');

    /**
     * 当前路由
     */
    export const currentPath = ref<string>('');

    /**
     * 路由历史
     */
    export const routeHistory = ref<Array<{ path: string; query: Record<string, string> }>>([]);

    /**
     * 系统资源是否加载完毕可以显示第一个页面
     */
    let isLoad = false;

    export function RefreshRoute(to: RouteLocationNormalizedGeneric, from: RouteLocationNormalizedGeneric) {
        lastPath.value = from.path;
        currentPath.value = to.path;
        const index = routeHistory.value.findIndex((r) => r.path === to.path);
        if (index !== -1) {
            routeHistory.value.splice(index, 1);
        }
        routeHistory.value.push({ path: to.path, query: { ...to.query } as Record<string, string> });
    }

    /**
     * 路由生成
     */
    export function Generate() {
        return function <T extends new (...args: Array<any>) => Entity>(C: T) {
            return class extends C {
                constructor(...args: Array<any>) {
                    super(...args);
                    this.TRouter_Generate_Hooks();
                }

                private TRouter_Generate_Hooks() {
                    onMounted(() => {
                        this.TRouter_Generate_EmitFrom();
                        this.TRouter_Generate_Loading();
                    });

                    onUnmounted(() => {
                        this.TRouter_Generate_EmitTo();
                    });
                }

                private TRouter_Generate_EmitFrom() {
                    //@ts-ignore
                    const from = (this['tRouter_From_NeedCreate'] || []) as Array<{ funcName: string; from: string | ((instance: Object) => string) }>;
                    for (let f of from) {
                        if (lastPath.value.indexOf(typeof f.from === 'function' ? f.from(this) : f.from) !== -1) {
                            //@ts-ignore
                            this[`${f.funcName}`]();
                        }
                    }
                }

                private TRouter_Generate_EmitTo() {
                    //@ts-ignore
                    const to = (this['tRouter_To_NeedCreate'] || []) as Array<{ funcName: string; to: string | ((instance: Object) => string) }>;
                    for (let t of to) {
                        if (currentPath.value.indexOf(typeof t.to === 'function' ? t.to(this) : t.to) !== -1) {
                            //@ts-ignore
                            this[`${t.funcName}`]();
                        }
                    }
                }

                private TRouter_Generate_Loading() {
                    if (!isLoad) {
                        isLoad = true;
                        //@ts-ignore
                        window.HideLoading();
                    }
                }
            };
        };
    }

    /**
     * 如果从 from 路由进来 会触发的函数 我会进行匹配 只要传入参数被包含在路由中 触发函数不支持传参 ( from 为 '/' 即只要进来就会触发)
     */
    export function WhenFrom<T extends Entity>(from: string | ((instance: T) => string)) {
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
    export function WhenTo<T extends Entity>(to: string | ((instance: T) => string)) {
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
