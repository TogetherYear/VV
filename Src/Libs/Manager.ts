import { TEvent } from '@/Decorators/TEvent';
import { EventSystem } from '@/Libs/EventSystem';

/**
 * 全局存在的
 */
@TEvent.Generate(TEvent.Lifecycle.Global)
class Manager extends EventSystem {}

export { Manager };
