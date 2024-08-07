namespace TManager {
    const ManagerSet = new Set<Object>();

    export function Generate() {
        return function <T extends new (...args: Array<any>) => Object>(C: T) {
            return class extends C {
                constructor(...args: Array<any>) {
                    super(...args);
                    this.TManager_Generate_Hooks();
                }

                private TManager_Generate_Hooks() {
                    ManagerSet.add(this);
                }
            };
        };
    }
}

export { TManager };
