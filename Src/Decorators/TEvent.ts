import { EventSystem } from '@/Libs/EventSystem';
import { onMounted, onUnmounted } from 'vue';
import { Resolve } from './index';

/**
 * 事件相关
 */
namespace TEvent {
    /**
     * 如果类不会销毁用 Global 其余用 Temporary
     */
    export const enum Lifecycle {
        /**
         * 全局 不会触发 onUnmounted 钩子的使用这个
         */
        Global,
        /**
         * 临时
         */
        Temporary
    }

    /**
     * 事件循环生成
     */
    export function Generate(type = Lifecycle.Temporary) {
        return function <T extends new (...args: Array<any>) => EventSystem>(C: T) {
            return class extends C {
                constructor(...args: Array<any>) {
                    super(...args);
                    this.generate_Type = type;
                    this.generate_IsFinish = true;
                    this.Generate_ListenEvents();
                    if (this.generate_Type === Lifecycle.Global) {
                        this.Generate_Global_Hooks();
                    } else {
                        this.Generate_Temporary_Hooks();
                    }
                    if (eval(`this['create_IsFinish']`)) {
                        this.Generate_CreatEvents();
                    }
                }

                public generate_Type!: Lifecycle;

                public generate_IsFinish = false;

                public Generate_CreatEvents() {
                    const create = (eval(`this['create_NeedCreate']`) || []) as Array<string>;
                    for (let e of create) {
                        this.AddKey(e);
                    }
                }

                private Generate_ListenEvents() {
                    Resolve.then(() => {
                        const listen = (eval(`this['listen_NeedListen']`) || []) as Array<{
                            listenTarget: EventSystem;
                            eventName: string;
                            emitFunc: (e: Record<string, unknown> | unknown | any) => void;
                            once: boolean;
                        }>;
                        for (let e of listen) {
                            console.log(e);
                            e.listenTarget.AddListen(e.eventName, this, e.emitFunc, e.once);
                        }
                    });
                }

                private Generate_Global_Hooks() {}

                private Generate_Temporary_Hooks() {
                    onMounted(() => {});

                    onUnmounted(() => {
                        const listen = (eval(`this['listen_NeedListen']`) || []) as Array<{
                            listenTarget: EventSystem;
                            eventName: string;
                            emitFunc: (e: Record<string, unknown> | unknown | any) => void;
                            once: boolean;
                        }>;
                        for (let e of listen) {
                            e.listenTarget.RemoveListen(e.eventName, this, e.emitFunc);
                        }
                    });
                }
            };
        };
    }

    /**
     * @author Together
     * @param events 创建的事件名称
     * @description 生成事件列表
     */
    export function Create(events: Array<string>) {
        return function <T extends new (...args: Array<any>) => EventSystem>(C: T) {
            return class extends C {
                constructor(...args: Array<any>) {
                    super(...args);
                    this.create_NeedCreate = events;
                    this.create_IsFinish = true;
                    if (eval(`this['generate_IsFinish']`)) {
                        eval(`this['Generate_CreatEvents']()`);
                    }
                }

                public create_IsFinish = false;

                public create_NeedCreate!: Array<string>;
            };
        };
    }

    /**
     * 监听事件
     */
    export function Listen(es: EventSystem, eventName: string, once?: boolean) {
        return function (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
            const original = descriptor.value.bind(target);
            function NewFunc(...args: Array<unknown>) {
                original(...args);
            }
            //@ts-ignore
            if (target['listen_NeedListen']) {
                //@ts-ignore
                target['listen_NeedListen'].push({
                    listenTarget: es,
                    eventName,
                    emitFunc: NewFunc.bind(target),
                    once: once || false
                });
            } else {
                //@ts-ignore
                target['listen_NeedListen'] = [{ listenTarget: es, eventName, emitFunc: descriptor.value, once: once || false }];
            }
        };
    }
}

export { TEvent };
