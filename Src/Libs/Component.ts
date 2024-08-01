import { TEvent } from '@/Decorators/TEvent';
import { TRouter } from '@/Decorators/TRouter';
import { TTool } from '@/Decorators/TTool';
import { EventSystem } from '@/Libs/EventSystem';

/**
 * 临时组件
 */
@TRouter.Register()
@TEvent.Generate(TEvent.Lifecycle.Temporary)
@TTool.Generate()
class Component extends EventSystem {}

export { Component };
