import { EventSystem } from '@/Libs/EventSystem';
import { onBeforeUnmount, onMounted, onUnmounted } from 'vue';
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
         * 全局管理
         */
        Global,
        /**
         * 页面组件
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
                    //@ts-ignore
                    if (this['tEvent_Create_IsFinish']) {
                        this.TEvent_Generate_CreatEvents();
                    }
                }

                public tEvent_Generate_Type!: Lifecycle;

                public tEvent_Generate_IsFinish = false;

                public TEvent_Generate_CreatEvents() {
                    //@ts-ignore
                    const create = (this['tEvent_Create_NeedCreate'] || []) as Array<string>;
                    for (let e of create) {
                        this.AddKey(e);
                    }
                }

                private TEvent_Generate_ListenEvents() {
                    Resolve.then(() => {
                        //@ts-ignore
                        const listen = (this['tEvent_Listen_NeedListen'] || []) as Array<{
                            listenTarget: Object | ((instance: Object) => Object);
                            eventName: string;
                            funcName: string;
                            once: boolean;
                        }>;
                        for (let e of listen) {
                            if (typeof e.listenTarget === 'function') {
                                const t = e.listenTarget(this);
                                //@ts-ignore
                                t.addEventListener(e.eventName, this[`${e.funcName}`]);
                            } else {
                                if (e.listenTarget.hasOwnProperty('unique_Id')) {
                                    //@ts-ignore
                                    e.listenTarget.AddListen(e.eventName, this, this[`${e.funcName}`], e.once);
                                } else {
                                    //@ts-ignore
                                    e.listenTarget.addEventListener(e.eventName, this[`${e.funcName}`]);
                                }
                            }
                        }
                    });
                }

                private TEvent_Generate_Global_Hooks() {}

                private TEvent_Generate_Temporary_Hooks() {
                    onMounted(() => {});

                    onBeforeUnmount(() => {
                        //@ts-ignore
                        const listen = (this['tEvent_Listen_NeedListen'] || []) as Array<{
                            listenTarget: Object | ((instance: Object) => Object);
                            eventName: string;
                            funcName: string;
                            once: boolean;
                        }>;
                        for (let e of listen) {
                            if (typeof e.listenTarget === 'function') {
                                const t = e.listenTarget(this);
                                //@ts-ignore
                                t.removeEventListener(e.eventName, this[`${e.funcName}`]);
                            } else {
                                if (e.listenTarget.hasOwnProperty('unique_Id')) {
                                    //@ts-ignore
                                    e.listenTarget.RemoveListen(e.eventName, this, this[`${e.funcName}`]);
                                } else {
                                    //@ts-ignore
                                    e.listenTarget.removeEventListener(e.eventName, this[`${e.funcName}`]);
                                }
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
     * @description 生成事件列表
     */
    export function Create(events: Array<string>) {
        return function <T extends new (...args: Array<any>) => EventSystem>(C: T) {
            return class extends C {
                constructor(...args: Array<any>) {
                    super(...args);
                    this.tEvent_Create_NeedCreate = events;
                    this.tEvent_Create_IsFinish = true;
                    //@ts-ignore
                    if (this['tEvent_Generate_IsFinish']) {
                        //@ts-ignore
                        this['TEvent_Generate_CreatEvents']();
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
    export function Listen<T>(es: Object | ((instance: T) => Object), eventName: string, once?: boolean) {
        return function (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
            //@ts-ignore
            if (target['tEvent_Listen_NeedListen']) {
                //@ts-ignore
                target['tEvent_Listen_NeedListen'].push({
                    listenTarget: es,
                    eventName,
                    funcName: propertyKey,
                    once: once || false
                });
            } else {
                //@ts-ignore
                target['tEvent_Listen_NeedListen'] = [{ listenTarget: es, eventName, funcName: propertyKey, once: once || false }];
            }
        };
    }
}

export { TEvent };
