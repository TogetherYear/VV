import { Mathf } from '@/Utils/Mathf';
import { isRef, onUnmounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { Resolve } from './index';
import { TEvent } from './TEvent';
import { EventSystem } from '@/Libs/EventSystem';

namespace TTool {
    const debounceMap = new Map<string, number>();

    const throttleMap = new Map<string, number>();

    const cacheMap = new Map<string, Array<{ key: string; value: unknown }>>();

    /**
     * 工具生成
     */
    export function Generate() {
        return function <T extends new (...args: Array<any>) => Object>(C: T) {
            return class extends C {
                constructor(...args: Array<any>) {
                    super(...args);
                    this.TTool_Generate_Debounce();
                    this.TTool_Generate_Throttle();
                    this.TTool_Generate_MountRange();
                    this.TTool_Generate_MountLength();
                    this.TTool_Generate_MountWatch();
                    if (eval(`this.tEvent_Generate_Type`) === TEvent.Lifecycle.Temporary) {
                        this.TTool_Generate_Hooks();
                    }
                }

                private tTool_Generate_Range: Array<() => void> = [];

                private tTool_Generate_Length: Array<() => void> = [];

                private tTool_Generate_Watch: Array<() => void> = [];

                private TTool_Generate_Debounce() {
                    const create = (eval(`this['tTool_Debounce_NeedCreate']`) || []) as Array<{
                        funcName: string;
                        delta: number | ((instance: Object) => number);
                    }>;
                    for (let e of create) {
                        //@ts-ignore
                        const original = this[`${e.funcName}`].bind(this);
                        //@ts-ignore
                        this[`${e.funcName}`] = function (...args: Array<unknown>) {
                            const key = `${eval(`this.unique_Id`)}:${e.funcName}`;
                            let timer = debounceMap.get(key);
                            if (timer) {
                                clearTimeout(timer);
                                timer = setTimeout(
                                    () => {
                                        original(...args);
                                        debounceMap.delete(key);
                                    },
                                    typeof e.delta === 'function' ? e.delta(this) : e.delta
                                );
                            } else {
                                timer = setTimeout(
                                    () => {
                                        original(...args);
                                        debounceMap.delete(key);
                                    },
                                    typeof e.delta === 'function' ? e.delta(this) : e.delta
                                );
                            }
                            debounceMap.set(key, timer);
                        };
                    }
                }

                private TTool_Generate_Throttle() {
                    const create = (eval(`this['tTool_Throttle_NeedCreate']`) || []) as Array<{
                        funcName: string;
                        delta: number | ((instance: Object) => number);
                    }>;
                    for (let e of create) {
                        //@ts-ignore
                        const original = this[`${e.funcName}`].bind(this);
                        //@ts-ignore
                        this[`${e.funcName}`] = function (...args: Array<unknown>) {
                            const key = `${eval(`this.unique_Id`)}:${e.funcName}`;
                            let lastTime = throttleMap.get(key);
                            if (lastTime) {
                                const currentTime = Date.now();
                                if (currentTime - lastTime > (typeof e.delta === 'function' ? e.delta(this) : e.delta)) {
                                    lastTime = currentTime;
                                    original(...args);
                                }
                            } else {
                                lastTime = Date.now();
                                original(...args);
                            }
                            throttleMap.set(key, lastTime);
                        };
                    }
                }

                private TTool_Generate_Hooks() {
                    onUnmounted(() => {
                        this.TTool_Generate_UnMountRange();
                        this.TTool_Generate_UnMountLength();
                        this.TTool_Generate_UnMountWatch();
                    });
                }

                private TTool_Generate_MountRange() {
                    Resolve.then(() => {
                        const range = (eval(`this['tTool_Range_Need']`) || []) as Array<{
                            propertyKey: string;
                            immediate: boolean;
                            min: number | ((instance: Object) => number);
                            max: number | ((instance: Object) => number);
                        }>;
                        for (let r of range) {
                            this.tTool_Generate_Range.push(
                                watch(
                                    eval(`this['${r.propertyKey}']`),
                                    (newValue) => {
                                        //@ts-ignore
                                        this[`${r.propertyKey}`].value = Mathf.Clamp(typeof r.min === 'function' ? r.min(this) : r.min, typeof r.max === 'function' ? r.max(this) : r.max, newValue);
                                    },
                                    { immediate: r.immediate }
                                )
                            );
                        }
                    });
                }

                private TTool_Generate_MountLength() {
                    Resolve.then(() => {
                        const length = (eval(`this['tTool_Length_Need']`) || []) as Array<{ propertyKey: string; immediate: boolean; length: number | ((instance: Object) => number) }>;
                        for (let l of length) {
                            this.tTool_Generate_Length.push(
                                watch(
                                    eval(`this['${l.propertyKey}']`),
                                    (newValue: string) => {
                                        //@ts-ignore
                                        this[`${l.propertyKey}`].value = newValue.slice(0, typeof l.length === 'function' ? l.length(this) : l.length);
                                    },
                                    { immediate: l.immediate }
                                )
                            );
                        }
                    });
                }

                private TTool_Generate_MountWatch() {
                    Resolve.then(() => {
                        const needWatch = (eval(`this['tTool_Watch_Need']`) || []) as Array<{
                            Callback: (instance: Object, newValue: unknown, oldValue: unknown) => void;
                            deep: boolean;
                            propertyKey: string;
                        }>;
                        for (let w of needWatch) {
                            this.tTool_Generate_Watch.push(
                                watch(
                                    eval(`this['${w.propertyKey}']`),
                                    (newValue, oldValue) => {
                                        w.Callback(this, newValue, oldValue);
                                    },
                                    { deep: w.deep }
                                )
                            );
                        }
                    });
                }

                private TTool_Generate_UnMountRange() {
                    for (let StopHandle of this.tTool_Generate_Range) {
                        StopHandle();
                    }
                }

                private TTool_Generate_UnMountLength() {
                    for (let StopHandle of this.tTool_Generate_Length) {
                        StopHandle();
                    }
                }

                private TTool_Generate_UnMountWatch() {
                    for (let StopHandle of this.tTool_Generate_Watch) {
                        StopHandle();
                    }
                }
            };
        };
    }

    /**
     * 防抖 默认 500 毫秒
     */
    export function Debounce<T extends EventSystem>(delta: number | ((instance: T) => number) = 500) {
        return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
            //@ts-ignore
            if (target['tTool_Debounce_NeedCreate']) {
                //@ts-ignore
                target['tTool_Debounce_NeedCreate'].push({
                    funcName: propertyKey,
                    delta
                });
            } else {
                //@ts-ignore
                target['tTool_Debounce_NeedCreate'] = [
                    {
                        funcName: propertyKey,
                        delta
                    }
                ];
            }
        };
    }

    /**
     * 节流 默认 500 毫秒
     */
    export function Throttle<T extends EventSystem>(delta: number | ((instance: T) => number) = 500) {
        return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
            //@ts-ignore
            if (target['tTool_Throttle_NeedCreate']) {
                //@ts-ignore
                target['tTool_Throttle_NeedCreate'].push({
                    funcName: propertyKey,
                    delta
                });
            } else {
                //@ts-ignore
                target['tTool_Throttle_NeedCreate'] = [
                    {
                        funcName: propertyKey,
                        delta
                    }
                ];
            }
        };
    }

    /**
     * 缓存页面 ( 此装饰器需要放在最下面 ) 参数为字符串 支持 普通类型 对象类型 ref reactive (不支持嵌套) 可以缓存对象单个属性 或者整个对象 比如 Object 或者 Object.pro 不需要写 .value
     */
    export function Cache(needs: Array<string>) {
        return function <T extends new (...args: Array<any>) => Object>(C: T) {
            return class extends C {
                constructor(...args: Array<any>) {
                    super(...args);
                    this.needCache = needs;
                    this.Cache_Hooks();
                }

                private currentUrl = '';

                private needCache: Array<string> = [];

                private Cache_Hooks() {
                    this.Cache_Get();
                    onUnmounted(() => {
                        this.Cache_Set();
                    });
                }

                private Cache_Get() {
                    const route = useRoute();
                    this.currentUrl = `${route.path}:${C.name}`;
                    const current = cacheMap.get(this.currentUrl);
                    if (current) {
                        for (let c of current) {
                            const es = `${c.key} = ${typeof c.value == 'string' ? `'${c.value}'` : c.value}`;
                            eval(es);
                        }
                    }
                }

                private Cache_Set() {
                    const cache: Array<{ key: string; value: unknown }> = [];
                    for (let c of this.needCache) {
                        const deep = c.split('.');
                        if (deep.length == 1) {
                            let es = `this['${deep}']`;
                            if (typeof eval(es) == 'object') {
                                if (isRef(eval(es))) {
                                    es += '.value';
                                    const temp = eval(es);
                                    if (typeof temp == 'object') {
                                        if (temp != null) {
                                            const keys = Object.keys(eval(es));
                                            for (let k of keys) {
                                                const c = `${es}['${k}']`;
                                                cache.push({
                                                    key: c,
                                                    value: eval(c)
                                                });
                                            }
                                        }
                                    } else {
                                        cache.push({
                                            key: es,
                                            value: temp
                                        });
                                    }
                                } else {
                                    if (eval(es) != null) {
                                        const keys = Object.keys(eval(es));
                                        for (let k of keys) {
                                            const c = `${es}['${k}']`;
                                            cache.push({
                                                key: c,
                                                value: eval(c)
                                            });
                                        }
                                    }
                                }
                            } else {
                                cache.push({
                                    key: es,
                                    value: eval(es)
                                });
                            }
                        } else {
                            let es = 'this';
                            deep.forEach((d) => {
                                es += `['${d}']`;
                                if (isRef(eval(es))) {
                                    es += `.value`;
                                }
                            });
                            cache.push({
                                key: es,
                                value: eval(es)
                            });
                        }
                    }
                    cacheMap.set(this.currentUrl, cache);
                }
            };
        };
    }

    /**
     * 限制变量范围 只支持 ref 定义的
     */
    export function LimitRange<T extends EventSystem>(min: number | ((instance: T) => number), max: number | ((instance: T) => number), immediate = true) {
        return function (target: Object, propertyKey: string | symbol) {
            //@ts-ignore
            if (target['tTool_Range_Need']) {
                //@ts-ignore
                target['tTool_Range_Need'].push({ propertyKey, min, max, immediate });
            } else {
                //@ts-ignore
                target['tTool_Range_Need'] = [{ propertyKey, min, max, immediate }];
            }
        };
    }

    /**
     * 限制字符串长度 只支持 ref 定义的
     */
    export function LimitLength<T extends EventSystem>(length: number | ((instance: T) => number), immediate = true) {
        return function (target: Object, propertyKey: string | symbol) {
            //@ts-ignore
            if (target['tTool_Length_Need']) {
                //@ts-ignore
                target['tTool_Length_Need'].push({ propertyKey, length, immediate });
            } else {
                //@ts-ignore
                target['tTool_Length_Need'] = [{ propertyKey, length, immediate }];
            }
        };
    }

    /**
     * 监听变量的变化 只接受 ref 和 reactive 定义的 ( T：当前类类型 K：变量类型 deep：是否深度监听 )
     */
    export function Watch<T extends EventSystem, K>(Callback: (instance: T, newValue: K, oldValue: K) => void, deep = false) {
        return function (target: Object, propertyKey: string | symbol) {
            //@ts-ignore
            if (target['tTool_Watch_Need']) {
                //@ts-ignore
                target['tTool_Watch_Need'].push({ Callback, deep, propertyKey });
            } else {
                //@ts-ignore
                target['tTool_Watch_Need'] = [{ Callback, deep, propertyKey }];
            }
        };
    }
}
export { TTool };
