import { Time } from '@/Utils/Time';
import { EventSystem } from './EventSystem';
import { TEntity } from '@/Decorators/TEntity';
import { TManager } from '@/Decorators/TManager';
import { TComponent } from '@/Decorators/TComponent';
import { TRouter } from '@/Decorators/TRouter';

/**
 * 根 我用来代理一些变量的
 */
@TEntity.Generate()
class Entity extends EventSystem {
    /**
     * 唯一ID
     */
    public unique_Id = Time.GenerateRandomUid();

    /**
     * 用来查找 Component 和 Manager 你自己在 构造函数中赋一个特殊值
     */
    public selfName = '';

    /**
     * 获取当前页面路由
     */
    public GetCurrentRoutePath() {
        return TRouter.currentPath;
    }

    /**
     * 获取上一个路由路由
     */
    public GetLastRoutePath() {
        return TRouter.lastPath;
    }

    /**
     * 获取所有的 Manager
     */
    public GetAllManager() {
        return TManager.Manager;
    }

    /**
     * 根据条件获取 Manager ( 你会觉得明明 Manager 都导出了 可以直接获取 为什么还要这个方法 因为后面我可能加入没导出的 我只需要它做自己的事情 )
     */
    public GetManager<T>(Condition: (manager: T & Record<string, unknown>) => boolean): T | null {
        const current = TManager.Manager;
        for (let c of current) {
            if (Condition(c as any)) {
                return c as T;
            }
        }
        return null;
    }

    /**
     * 获取当前页面所有存活的 Component
     */
    public GetAllComponent() {
        return TComponent.ComponentMap.get(this.GetCurrentRoutePath());
    }

    /**
     * 根据条件获取 Component
     */
    public GetComponent<T>(Condition: (component: T & Record<string, unknown>) => boolean): T | null {
        const current = TComponent.ComponentMap.get(this.GetCurrentRoutePath())!;
        for (let c of current) {
            if (Condition(c as any)) {
                return c as T;
            }
        }
        return null;
    }
}

export { Entity };
