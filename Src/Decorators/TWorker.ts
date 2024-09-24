import * as Work from '@/Worker/index';

import { Entity } from '@/Libs/Entity';
import { onUnmounted } from 'vue';
import { TEvent } from './TEvent';

namespace TWorker {
    export enum Type {
        Color
    }

    export function Generate() {
        return function <T extends new (...args: Array<any>) => Entity>(C: T) {
            return class extends C {
                constructor(...args: Array<any>) {
                    super(...args);
                    this.TWorker_Generate_Await();
                    //@ts-ignore
                    if (this['tEvent_Generate_Type'] === TEvent.Lifecycle.Temporary) {
                        this.TWorker_Generate_Hooks();
                    }
                }

                private tWorker_Generate_Worker: Array<Worker> = [];

                private TWorker_Generate_Hooks() {
                    onUnmounted(() => {
                        for (let w of this.tWorker_Generate_Worker) {
                            w.terminate();
                        }
                    });
                }

                private TWorker_Generate_Await() {
                    //@ts-ignore
                    const awaits = (this['tWorker_Await_Need'] || []) as Array<{
                        worker: Type;
                        propertyKey: string;
                    }>;
                    for (let a of awaits) {
                        //@ts-ignore
                        const original = this[`${a.propertyKey}`].bind(this);
                        //@ts-ignore
                        this[`${a.propertyKey}`] = function (data: Record<string, unknown>) {
                            const target = new (GetWorkerByName(a.worker))();
                            this.tWorker_Generate_Worker.push(target);
                            target.postMessage(data);
                            target.onmessage = (e) => {
                                original(e.data);
                                target.terminate();
                                const index = this.tWorker_Generate_Worker.findIndex((w) => w === target);
                                if (index !== -1) {
                                    this.tWorker_Generate_Worker.splice(index, 1);
                                }
                            };
                        };
                    }
                }
            };
        };
    }

    /**
     * 执行 Worker 并且返回结果 函数有一个参数 为传递给 Worker 的 执行完成后 Worker 会再次给参数赋值 你即可使用
     * ( 真遇到性能问题 再去考虑用这个 Worker 不会复用 每次都是重新生成 )
     */
    export function Await(worker: Type) {
        return function (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
            //@ts-ignore
            if (target['tWorker_Await_Need']) {
                //@ts-ignore
                target['tWorker_Await_Need'].push({ worker, propertyKey });
            } else {
                //@ts-ignore
                target['tWorker_Await_Need'] = [{ worker, propertyKey }];
            }
        };
    }

    function GetWorkerByName(worker: Type) {
        if (worker === Type.Color) {
            return Work.Color;
        } else {
            return Work.Color;
        }
    }
}

export { TWorker };
