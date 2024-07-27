import { TEvent } from '@/Decorators/TEvent';
import { EventSystem } from '@/Libs/EventSystem';

/**
 * 临时组件
 */
@TEvent.Generate(TEvent.Lifecycle.Temporary)
class Component extends EventSystem {}

export { Component };
