import { TEvent } from '@/Decorators/TEvent';
import { TRouter } from '@/Decorators/TRouter';
import { EventSystem } from '@/Libs/EventSystem';

/**
 * 临时组件
 */
@TRouter.Register()
@TEvent.Generate(TEvent.Lifecycle.Temporary)
class Component extends EventSystem {}

export { Component };
