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
                    this.tEvent_Generate_Type = type;
                    this.tEvent_Generate_IsFinish = true;
                    this.TEvent_Generate_ListenEvents();
                    if (this.tEvent_Generate_Type === Lifecycle.Global) {
                        this.TEvent_Generate_Global_Hooks();
                    } else {
                        this.TEvent_Generate_Temporary_Hooks();
                    }
                    if (eval(`this['tEvent_Create_IsFinish']`)) {
                        this.TEvent_Generate_CreatEvents();
                    }
                }

                public tEvent_Generate_Type!: Lifecycle;

                public tEvent_Generate_IsFinish = false;

                public TEvent_Generate_CreatEvents() {
                    const create = (eval(`this['tEvent_Create_NeedCreate']`) || []) as Array<string>;
                    for (let e of create) {
                        this.AddKey(e);
                    }
                }

                private TEvent_Generate_ListenEvents() {
                    Resolve.then(() => {
                        const listen = (eval(`this['tEvent_Listen_NeedListen']`) || []) as Array<{
                            listenTarget: EventSystem;
                            eventName: string;
                            emitFunc: (e: Record<string, unknown> | unknown | any) => void;
                            once: boolean;
                        }>;
                        for (let e of listen) {
                            e.listenTarget.AddListen(e.eventName, this, e.emitFunc, e.once);
                        }
                    });
                }

                private TEvent_Generate_Global_Hooks() {}

                private TEvent_Generate_Temporary_Hooks() {
                    onMounted(() => {});

                    onUnmounted(() => {
                        const listen = (eval(`this['tEvent_Listen_NeedListen']`) || []) as Array<{
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
                    this.tEvent_Create_NeedCreate = events;
                    this.tEvent_Create_IsFinish = true;
                    if (eval(`this['tEvent_Generate_IsFinish']`)) {
                        eval(`this['TEvent_Generate_CreatEvents']()`);
                    }
                }

                public tEvent_Create_IsFinish = false;

                public tEvent_Create_NeedCreate!: Array<string>;
            };
        };
    }

    /**
     * 监听事件
     */
    export function Listen(es: EventSystem, eventName: string, once?: boolean) {
        return function (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
            //@ts-ignore
            if (target['tEvent_Listen_NeedListen']) {
                //@ts-ignore
                target['tEvent_Listen_NeedListen'].push({
                    listenTarget: es,
                    eventName,
                    emitFunc: descriptor.value,
                    once: once || false
                });
            } else {
                //@ts-ignore
                target['tEvent_Listen_NeedListen'] = [{ listenTarget: es, eventName, emitFunc: descriptor.value, once: once || false }];
            }
        };
    }
}

export { TEvent };
