import { TEvent } from '@/Decorators/TEvent';
import { EventSystem } from '@/Libs/EventSystem';

/**
 * 全局组件
 */
@TEvent.Generate(TEvent.Lifecycle.Global)
class Manager extends EventSystem {}

export { Manager };
