import { EventSystem } from "@/Libs/EventSystem"

type ListenActor = {
    Destroy?: () => void
}

/**
 * 事件相关
 */
namespace TEvent {
    /**
     * 创建事件列表
     */
    export function CreateEvents(...events: Array<string>) {
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
     * 监听事件
     */
    export function ListenEvent(es: EventSystem, event: string) {
        return function (target: ListenActor, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
            const original = descriptor.value.bind(target)
            descriptor.value = (...args: Array<unknown>) => {
                original(...args)

            }
        }
    }
}

export { TEvent }