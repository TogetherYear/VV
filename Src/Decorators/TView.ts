import { EventSystem } from '@/Libs/EventSystem';
import { onMounted, onUnmounted } from 'vue';

namespace TView {
    /**
     * 页面生成
     */
    export function Generate() {
        return function <T extends new (...args: Array<any>) => Object>(C: T) {
            return class extends C {
                constructor(...args: Array<any>) {
                    super(...args);
                    this.TView_Generate_Hooks();
                }

                private observers = new Map<HTMLElement, IntersectionObserver>();

                private TView_Generate_Hooks() {
                    onMounted(() => {
                        this.TView_Generate_CreateListen();
                    });

                    onUnmounted(() => {
                        this.TView_Generate_DestroyListen();
                    });
                }

                private TView_Generate_CreateListen() {
                    const listen = (eval(`this['tView_Observer_NeedListen']`) || []) as Array<{
                        dom: HTMLElement | ((instance: Object) => HTMLElement);
                        funcName: string;
                        once: boolean;
                    }>;

                    for (let l of listen) {
                        const element = typeof l.dom === 'function' ? l.dom(this) : l.dom;
                        const observer = new IntersectionObserver((entries) => {
                            if (entries[0].intersectionRatio <= 0) {
                                //@ts-ignore
                                this[`${l.funcName}`](false);
                            } else {
                                //@ts-ignore
                                this[`${l.funcName}`](true);
                                if (l.once) {
                                    observer.disconnect();
                                    this.observers.delete(element);
                                }
                            }
                        });
                        observer.observe(element);
                        this.observers.set(element, observer);
                    }
                }

                private TView_Generate_DestroyListen() {
                    for (let o of this.observers) {
                        o[1].disconnect();
                    }
                    this.observers.clear();
                }
            };
        };
    }

    /**
     * Dom 观察 是否在视图可视区域内 被装饰器修饰的函数需要一个参数 为当前状态
     */
    export function Observer<T extends EventSystem>(dom: HTMLElement | ((instance: T) => HTMLElement), once?: boolean) {
        return function (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
            //@ts-ignore
            if (target['tView_Observer_NeedListen']) {
                //@ts-ignore
                target['tView_Observer_NeedListen'].push({
                    dom,
                    funcName: propertyKey,
                    once: once || false
                });
            } else {
                //@ts-ignore
                target['tView_Observer_NeedListen'] = [{ dom, funcName: propertyKey, once: once || false }];
            }
        };
    }
}

export { TView };
