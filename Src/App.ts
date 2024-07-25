import { TEvent } from "./Decorators/TEvent"
import { EventSystem } from "./Libs/EventSystem"
import { onMounted, onUnmounted } from "vue"
import { Debug } from "./Plugins/Debug"

@TEvent.Generate(['Update'])
class App extends EventSystem {
    public InitStates() {
        return {}
    }

    public InitHooks() {

    }

    public Run() {
        setInterval(() => {
            this.Emit("Update")
        }, 1000)
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