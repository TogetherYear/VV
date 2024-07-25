import { onMounted, onUnmounted } from "vue"
import { AActor } from "@/Libs/AActor"
import { DR } from "@/Decorators/DR"
import { App } from "@/App"

@DR.CreateEvents("AAA")
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

    protected Destroy() {

    }

    @DR.ListenEvent(App.Instance, 'Update')
    public Test() {
        Message.success("Hello World!")
    }
}

export { Application }