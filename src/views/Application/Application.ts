import { onMounted, onUnmounted } from "vue"
import { AActor } from "@/libs/AActor"
import { DR } from "@/decorators/DR"

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

    }
}

export { Application }