import { TEvent } from '@/Decorators/TEvent';
import { TRouter } from '@/Decorators/TRouter';
import { TTool } from '@/Decorators/TTool';
import { EventSystem } from '@/Libs/EventSystem';

/**
 * 全局管理 也就是不和组件挂钩的
 */
@TEvent.Generate(TEvent.Lifecycle.Global)
@TTool.Generate()
class Manager extends EventSystem {}

export { Manager };
