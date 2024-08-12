import { onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';

namespace TComponent {
    const ComponentMap = new Map<string, Set<Object>>();

    export function Generate() {
        return function <T extends new (...args: Array<any>) => Object>(C: T) {
            return class extends C {
                constructor(...args: Array<any>) {
                    super(...args);
                    this.TComponent_Generate_Hooks();
                }

                public tComponent_Generate_Route!: string;

                public tComponent_Generate_Query!: Record<string, unknown>;

                private TComponent_Generate_Hooks() {
                    this.TManager_Generate_Page();
                    onMounted(() => {
                        let currentMap = ComponentMap.get(this.tComponent_Generate_Route);
                        if (!currentMap) {
                            currentMap = new Set<Object>();
                            ComponentMap.set(this.tComponent_Generate_Route, currentMap);
                        }
                        currentMap.add(this);
                    });

                    onUnmounted(() => {
                        let currentMap = ComponentMap.get(this.tComponent_Generate_Route);
                        if (currentMap) {
                            currentMap.delete(this);
                        }
                    });
                }

                private TManager_Generate_Page() {
                    const route = useRoute();
                    this.tComponent_Generate_Route = route.path;
                    this.tComponent_Generate_Query = { ...route.query };
                }
            };
        };
    }
}

export { TComponent };
