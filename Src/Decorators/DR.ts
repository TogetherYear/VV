import { isRef, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';

namespace DR {
    export function ClassDec() {
        return function <T extends new (...args: Array<any>) => Object>(C: T) {
            return class extends C {
                constructor(...args: Array<any>) {
                    super(...args);
                    this.Hooks();
                }

                private Hooks() {
                    onMounted(() => {});

                    onUnmounted(() => {});
                }
            };
        };
    }

    export function FunctionDec() {
        return function (
            target: Object,
            propertyKey: string | symbol,
            descriptor: PropertyDescriptor
        ) {
            const original = descriptor.value.bind(target);
            descriptor.value = (...args: Array<unknown>) => {
                original(...args);
            };
        };
    }

    export const Resolve = Promise.resolve();

    const debounceMap = new Map<string, NodeJS.Timeout>();

    const throttleMap = new Map<string, number>();

    const cacheMap = new Map<string, Array<{ key: string; value: unknown }>>();

    /**
     * 防抖 默认 500 毫秒
     */
    export function Debounce(delta = 500) {
        return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
            const original = descriptor.value.bind(target);
            descriptor.value = (...args: Array<unknown>) => {
                const key = `${target.constructor.name}:${propertyKey}`;
                let timer = debounceMap.get(key);
                if (timer) {
                    clearTimeout(timer);
                    timer = setTimeout(() => {
                        original(...args);
                        debounceMap.delete(key);
                    }, delta);
                } else {
                    timer = setTimeout(() => {
                        original(...args);
                        debounceMap.delete(key);
                    }, delta);
                }
                debounceMap.set(key, timer);
            };
        };
    }

    /**
     * 节流 默认 500 毫秒
     */
    export function Throttle(delta = 500) {
        return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
            const original = descriptor.value.bind(target);
            descriptor.value = (...args: Array<unknown>) => {
                const key = `${target.constructor.name}:${propertyKey}`;
                let lastTime = throttleMap.get(key);
                if (lastTime) {
                    const currentTime = Date.now();
                    if (currentTime - lastTime > delta) {
                        lastTime = currentTime;
                        original(...args);
                    }
                } else {
                    lastTime = Date.now();
                    original(...args);
                }
                throttleMap.set(key, lastTime);
            };
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
                    this.Hooks();
                }

                private currentUrl = '';

                private needCache: Array<string> = [];

                private Hooks() {
                    this.Get();
                    onUnmounted(() => {
                        this.Set();
                    });
                }

                private Get() {
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

                private Set() {
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
export { DR };
