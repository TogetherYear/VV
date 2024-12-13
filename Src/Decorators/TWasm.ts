import * as Wasm from '@/Wasm/index';

import { Entity } from '@/Libs/Entity';
import { TEvent } from './TEvent';

namespace TWasm {
    export enum Type {
        Color
    }

    export const wasmMap = new Map<Type, Record<string, unknown>>();

    export function Generate() {
        return function <T extends new (...args: Array<any>) => Entity>(C: T) {
            return class extends C {
                constructor(...args: Array<any>) {
                    super(...args);
                    this.TWasm_Generate_Await();

                    //@ts-ignore
                    if (this['tEvent_Generate_Type'] === TEvent.Lifecycle.Temporary) {
                        this.TWasm_Generate_Hooks();
                    }
                }

                private TWasm_Generate_Hooks() {}

                private TWasm_Generate_Await() {
                    //@ts-ignore
                    const awaits = (this['tWasm_Await_Need'] || []) as Array<{
                        wasm: Type;
                        propertyKey: string;
                    }>;
                    for (let a of awaits) {
                        //@ts-ignore
                        const original = this[`${a.propertyKey}`].bind(this);
                        //@ts-ignore
                        this[`${a.propertyKey}`] = async function (data: Record<string, unknown>) {
                            const current = wasmMap.get(a.wasm);
                            if (current) {
                                //@ts-ignore
                                const result = current.Run(data);
                                original({ result });
                            } else {
                                const temp = new Object();
                                const target = GetWasmByName(a.wasm);
                                wasmMap.set(a.wasm, target);
                                await target.init(temp);
                                const result = target.Run(data);
                                original({ result });
                            }
                        };
                    }
                }
            };
        };
    }

    /**
     * 执行 Wasm 并且返回结果 函数有一个参数 为传递给 Wasm 的 执行完成后 Wasm 会再次给参数赋值 你即可使用
     * ( 真遇到性能问题 再去考虑用这个 Wasm 会复用 如果已加载则使用之前的 )
     */
    export function Await<T extends Entity>(wasm: Type) {
        return function (target: T, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
            //@ts-ignore
            if (target['tWasm_Await_Need']) {
                //@ts-ignore
                target['tWasm_Await_Need'].push({ wasm, propertyKey });
            } else {
                //@ts-ignore
                target['tWasm_Await_Need'] = [{ wasm, propertyKey }];
            }
        };
    }

    function GetWasmByName(wasm: Type) {
        if (wasm === Type.Color) {
            return Wasm.Color;
        } else {
            return Wasm.Color;
        }
    }
}

export { TWasm };
