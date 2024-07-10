import { onMounted, onUnmounted } from "vue"
import { AActor } from "@/Libs/AActor"

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

    public Test() {
        Message.success("Hello World!")
    }
}

export { Application }