import { Time } from '@/Utils/Time';
import { isRef, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';

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
                }

                private tTool_Generate_Id = Time.GenerateRandomUid();

                private TTool_Generate_Debounce() {
                    const create = (eval(`this['tTool_Debounce_NeedCreate']`) || []) as Array<{
                        funcName: string;
                        delta: number;
                    }>;
                    for (let e of create) {
                        //@ts-ignore
                        const original = this[`${e.funcName}`].bind(this);
                        //@ts-ignore
                        this[`${e.funcName}`] = function (...args: Array<unknown>) {
                            const key = `${this.tTool_Generate_Id}:${e.funcName}`;
                            let timer = debounceMap.get(key);
                            if (timer) {
                                clearTimeout(timer);
                                timer = setTimeout(() => {
                                    original(...args);
                                    debounceMap.delete(key);
                                }, e.delta);
                            } else {
                                timer = setTimeout(() => {
                                    original(...args);
                                    debounceMap.delete(key);
                                }, e.delta);
                            }
                            debounceMap.set(key, timer);
                        };
                    }
                }

                private TTool_Generate_Throttle() {
                    const create = (eval(`this['tTool_Throttle_NeedCreate']`) || []) as Array<{
                        funcName: string;
                        delta: number;
                    }>;
                    for (let e of create) {
                        //@ts-ignore
                        const original = this[`${e.funcName}`].bind(this);
                        //@ts-ignore
                        this[`${e.funcName}`] = function (...args: Array<unknown>) {
                            const key = `${this.tTool_Generate_Id}:${e.funcName}`;
                            let lastTime = throttleMap.get(key);
                            if (lastTime) {
                                const currentTime = Date.now();
                                if (currentTime - lastTime > e.delta) {
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
            };
        };
    }

    /**
     * 防抖 默认 500 毫秒
     */
    export function Debounce(delta = 500) {
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
    export function Throttle(delta = 500) {
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
     * 缓存页面 参数为字符串 支持 普通类型 对象类型 ref reactive (不支持嵌套) 可以缓存对象单个属性 或者整个对象 比如 Object 或者 Object.pro 不需要写 .value
     */
    export function Cache(...needs: Array<string>) {
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
}
export { TTool };
