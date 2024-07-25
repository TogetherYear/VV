import { onMounted, onUnmounted } from "vue"
import { AActor } from "@/Libs/AActor"
import { App } from "@/App"
import { TEvent } from "@/Decorators/TEvent"
import { Debug } from "@/Plugins/Debug"
import { Preload } from "@/Preload/Preload"

@TEvent.Listen([
    [App, "Update", "Test"]
])
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

    public Test() {
        Preload.message.success("Hello World!")
    }
}

export { Application }