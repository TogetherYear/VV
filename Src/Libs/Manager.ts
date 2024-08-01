import { TEvent } from '@/Decorators/TEvent';
import { TTool } from '@/Decorators/TTool';
import { EventSystem } from '@/Libs/EventSystem';

/**
 * 全局组件
 */
@TEvent.Generate(TEvent.Lifecycle.Global)
@TTool.Generate()
class Manager extends EventSystem {}

export { Manager };
