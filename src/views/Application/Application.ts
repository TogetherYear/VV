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

    @DR.Throttle(1000)
    public Test(a: number, b: string) {
        Message.success(`${a}-${b}`)
    }
}

export { Application }