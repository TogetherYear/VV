import { onUnmounted, ref } from 'vue';
import { TEvent } from './TEvent';

namespace TTest {
    /**
     * 函数列表
     */
    export const testMap = ref<Map<string, { label: string; scope: Object; funcName: string; args: Array<unknown> }>>(new Map());

    /**
     * 测试生成
     */
    export function Generate() {
        return function <T extends new (...args: Array<any>) => Object>(C: T) {
            return class extends C {
                constructor(...args: Array<any>) {
                    super(...args);
                    this.TTest_Generate_Bind();
                    if (eval(`this.tEvent_Generate_Type`) === TEvent.Lifecycle.Temporary) {
                        this.TTest_Generate_Hooks();
                    }
                }

                private TTest_Generate_Bind() {
                    const bind = (eval(`this['tTest_Bind_NeedBind']`) || []) as Array<{
                        label: string;
                        funcName: string;
                        args: Array<unknown>;
                    }>;
                    for (let b of bind) {
                        testMap.value.set(`${eval(`this.unique_Id`)}:${b.funcName}`, {
                            label: b.label,
                            funcName: b.funcName,
                            args: b.args,
                            scope: this
                        });
                    }
                }

                private TTest_Generate_Hooks() {
                    onUnmounted(() => {
                        const bind = (eval(`this['tTest_Bind_NeedBind']`) || []) as Array<{
                            label: string;
                            funcName: string;
                            args: Array<unknown>;
                        }>;
                        for (let b of bind) {
                            testMap.value.delete(`${eval(`this.unique_Id`)}:${b.funcName}`);
                        }
                    });
                }
            };
        };
    }

    /**
     * 绑定测试函数
     */
    export function Bind(label: string, ...args: Array<unknown>) {
        return function (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
            //@ts-ignore
            if (target['tTest_Bind_NeedBind']) {
                //@ts-ignore
                target['tTest_Bind_NeedBind'].push({
                    label,
                    funcName: propertyKey,
                    args
                });
            } else {
                //@ts-ignore
                target['tTest_Bind_NeedBind'] = [
                    {
                        label,
                        funcName: propertyKey,
                        args
                    }
                ];
            }
        };
    }
}
export { TTest };
