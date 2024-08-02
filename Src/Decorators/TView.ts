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

                private observers = new Map<string, IntersectionObserver>();

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
                        dom: string;
                        funcName: string;
                        once: boolean;
                    }>;

                    for (let l of listen) {
                        const element = document.querySelector(l.dom) as Element;
                        const observer = new IntersectionObserver((entries) => {
                            if (entries[0].intersectionRatio <= 0) {
                                //@ts-ignore
                                this[`${l.funcName}`](false);
                            } else {
                                //@ts-ignore
                                this[`${l.funcName}`](true);
                                if (l.once) {
                                    observer.disconnect();
                                    this.observers.delete(l.dom);
                                }
                            }
                        });
                        observer.observe(element);
                        this.observers.set(l.dom, observer);
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
     * Dom 观察 是否在视图可视区域内 传入完整的 比如 .Need 或者 #Need ( 记住要全局唯一 ) 被装饰器修饰的函数需要一个参数 为当前状态
     */
    export function Observer(dom: string, once?: boolean) {
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
