import { EventSystem } from '@/Libs/EventSystem';
import { onMounted, onUnmounted } from 'vue';
import { DR } from './DR';

/**
 * 事件相关
 */
namespace TEvent {
    export const enum Lifecycle {
        Global,
        Temporary
    }
    /**
     * 事件循环体 只要使用的TEvent装饰器的 都要加上这个 放在最上面
     */
    export function Generate(type = Lifecycle.Temporary) {
        return function <T extends new (...args: Array<any>) => EventSystem>(C: T) {
            return class extends C {
                constructor(...args: Array<any>) {
                    super(...args);
                    this.Generate_CreatEvents();
                    this.Generate_ListenEvents();
                    if (type == Lifecycle.Global) {
                        this.Generate_Global_Hooks();
                    } else {
                        this.Generate_Temporary_Hooks();
                    }
                }

                private Generate_CreatEvents() {
                    const create = (eval(`this['create_NeedCreateEvents']`) || []) as Array<string>;
                    for (let e of create) {
                        this.AddKey(e);
                    }
                }

                private Generate_ListenEvents() {
                    DR.Resolve.then(() => {
                        const listen = (eval(`this['needListen']`) || []) as Array<{
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

                private Generate_Global_Hooks() {}

                private Generate_Temporary_Hooks() {
                    onUnmounted(() => {
                        const listen = (eval(`this['needListen']`) || []) as Array<{
                            listenTarget: EventSystem;
                            eventName: string;
                            emitFunc: (e: Record<string, unknown> | unknown | any) => void;
                            once: boolean;
                        }>;
                        for (let e of listen) {
                            if (!e.once) {
                                e.listenTarget.RemoveListen(e.eventName, this, e.emitFunc);
                            }
                        }
                    });
                }
            };
        };
    }

    /**
     * @author Together
     * @param events 创建的事件名称
     * @description 生成事件列表 需要继承 EventSystem
     */
    export function Create(events: Array<string>) {
        return function <T extends new (...args: Array<any>) => EventSystem>(C: T) {
            return class extends C {
                constructor(...args: Array<any>) {
                    super(...args);
                    this.create_NeedCreateEvents = events;
                }

                public create_NeedCreateEvents!: Array<string>;
            };
        };
    }

    /**
     * 监听事件
     */
    export function Listen(es: EventSystem, eventName: string, once?: boolean) {
        return function (
            target: Object,
            propertyKey: string | symbol,
            descriptor: PropertyDescriptor
        ) {
            const original = descriptor.value.bind(target);
            descriptor.value = (...args: Array<unknown>) => {
                original(...args);
            };
            //@ts-ignore
            if (target['needListen']) {
                //@ts-ignore
                target['needListen'].push({
                    listenTarget: es,
                    eventName,
                    emitFunc: descriptor.value,
                    once: once || false
                });
            } else {
                //@ts-ignore
                target['needListen'] = [
                    { listenTarget: es, eventName, emitFunc: descriptor.value, once: once || false }
                ];
            }
        };
    }
}

export { TEvent };
