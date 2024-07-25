import { EventSystem } from "@/Libs/EventSystem"
import { onMounted, onUnmounted } from "vue"
import { DR } from "./DR"

/**
 * 事件相关
 */
namespace TEvent {
    /**
     * @author Together
     * @param events 创建的事件名称
     * @description 生成事件列表 需要继承 EventSystem
     */
    export function Generate(events: Array<string>) {
        return function <T extends new (...args: Array<any>) => EventSystem>(C: T) {
            return class extends C {
                constructor(...args: Array<any>) {
                    super(...args)
                    this.Hooks()
                }

                private Hooks() {
                    for (let e of events) {
                        this.AddKey(e)
                    }
                }
            }
        }
    }

    /**
     * @author Together
     * @param target 需要监听的目标
     * @param eventName 监听的事件
     * @param emitFunc 触发的函数名称
     * @description 监听事件
     */
    export function Listen(events: Array<[target: EventSystem, eventName: string, emitFunc: string]>) {
        return function <T extends new (...args: Array<any>) => Object>(C: T) {
            return class extends C {
                constructor(...args: Array<any>) {
                    super(...args)
                    this.Hooks()
                }

                private Hooks() {
                    DR.Resolve.then(() => {
                        for (let e of events) {
                            //@ts-ignore
                            e[0].AddListen(e[1], this, this[e[2]])
                        }
                    })
                    onUnmounted(() => {
                        for (let e of events) {
                            //@ts-ignore
                            e[0].RemoveListen(e[1], this, this[e[2]])
                        }
                    })
                }

            }
        }
    }
}

export { TEvent }