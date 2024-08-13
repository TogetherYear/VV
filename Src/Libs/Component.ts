import { TComponent } from '@/Decorators/TComponent';
import { TEvent } from '@/Decorators/TEvent';
import { TRouter } from '@/Decorators/TRouter';
import { TTest } from '@/Decorators/TTest';
import { TTool } from '@/Decorators/TTool';
import { TView } from '@/Decorators/TView';
import { EventSystem } from '@/Libs/EventSystem';
import { Time } from '@/Utils/Time';

/**
 * 页面组件
 */
@TTest.Generate()
@TTool.Generate()
@TRouter.Generate()
@TView.Generate()
@TEvent.Generate(TEvent.Lifecycle.Temporary)
@TComponent.Generate()
class Component extends EventSystem {
    /**
     * 当前页面路由
     */
    public tComponent_Generate_Route!: string;

    /**
     * 当前页面参数
     */
    public tComponent_Generate_Query!: Record<string, unknown>;

    /**
     * 唯一ID
     */
    public unique_Id = Time.GenerateRandomUid();
}

export { Component };
