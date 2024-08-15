import { TComponent } from '@/Decorators/TComponent';
import { TEvent } from '@/Decorators/TEvent';
import { TRouter } from '@/Decorators/TRouter';
import { TTest } from '@/Decorators/TTest';
import { TTool } from '@/Decorators/TTool';
import { TView } from '@/Decorators/TView';
import { Entity } from './Entity';

/**
 * 页面组件
 */
@TTest.Generate()
@TTool.Generate()
@TRouter.Generate()
@TView.Generate()
@TEvent.Generate(TEvent.Lifecycle.Temporary)
@TComponent.Generate()
class Component<T extends Component<T> | null = null> extends Entity {
    public constructor(parent: T | null = null) {
        super();
        this.parent = parent;
    }

    public parent: T | null = null;

    public get P() {
        return this.parent!;
    }

    /**
     * 当前页面路由
     */
    public tComponent_Generate_Route!: string;

    /**
     * 当前页面参数
     */
    public tComponent_Generate_Query!: Record<string, unknown>;

    /**
     * 获取当前页面所有存活的 COmponent
     */
    public GetAllComponent() {
        return TComponent.ComponentMap.get(this.tComponent_Generate_Route);
    }

    /**
     * 根据条件获取组件
     */
    public GetComponent<K>(Condition: (instance: K & Record<string, unknown>) => boolean): K | null {
        const current = TComponent.ComponentMap.get(this.tComponent_Generate_Route)!;
        for (let c of current) {
            if (Condition(c as any)) {
                return c as K;
            }
        }
        return null;
    }
}

export { Component };
