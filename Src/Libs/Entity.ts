import { Time } from '@/Utils/Time';
import { EventSystem } from './EventSystem';
import { TEntity } from '@/Decorators/TEntity';
import { TComponent } from '@/Decorators/TComponent';
import { TRouter } from '@/Decorators/TRouter';
import { TManager } from '@/Decorators/TManager';

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
     * 获取当前页面所有存活的 Component
     */
    public GetAllComponent() {
        return TComponent.ComponentMap.get(TRouter.currentPath);
    }

    /**
     * 根据条件获取 Component
     */
    public GetComponent<T>(Condition: (instance: T & Record<string, unknown>) => boolean): T | null {
        const current = TComponent.ComponentMap.get(TRouter.currentPath)!;
        for (let c of current) {
            if (Condition(c as any)) {
                return c as T;
            }
        }
        return null;
    }

    /**
     * 获取所有的 Manager
     */
    public GetAllManager() {
        return TManager.Manager;
    }

    /**
     * 根据条件获取 Manager ( 你会觉得明明每一个 Manager 都导出了 为什么还要这个 因为我后面可能会添加不导出的 只用来运行 不需要被被人查看的 )
     */
    public GetManager<T>(Condition: (instance: T & Record<string, unknown>) => boolean): T | null {
        for (let c of TManager.Manager) {
            if (Condition(c as any)) {
                return c as T;
            }
        }
        return null;
    }
}

export { Entity };
