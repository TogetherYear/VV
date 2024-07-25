import { EventSystem } from "./Libs/EventSystem"
import { onMounted, onUnmounted } from "vue"

class App extends EventSystem {

    private static instance: App = new App()

    public static get Instance() { return this.instance }

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

}

export { App }