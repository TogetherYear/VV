import { EventSystem } from "./Libs/EventSystem"
import { onMounted, onUnmounted } from "vue"

class App extends EventSystem {
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
}

const AppInstance = new App()

export { AppInstance as App }