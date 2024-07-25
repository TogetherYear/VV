import { onMounted, onUnmounted } from "vue"
import { AActor } from "@/Libs/AActor"
import { App } from "@/App"
import { TEvent } from "@/Decorators/TEvent"

class Application extends AActor {
    public constructor() { super() }

    public InitStates() {
        return {}
    }

    public InitHooks() {

    }

    public Run() {
        onMounted(() => {

        })
        onUnmounted(() => {
            this.Destroy()
        })
    }

    public Destroy() {

    }

    @TEvent.ListenEvent(App, 'Update')
    public Test() {
        Message.success("Hello World!")
    }
}

export { Application }