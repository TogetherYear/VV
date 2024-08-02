import { TEvent } from '@/Decorators/TEvent';
import { TRouter } from '@/Decorators/TRouter';
import { TTool } from '@/Decorators/TTool';
import { TView } from '@/Decorators/TView';
import { EventSystem } from '@/Libs/EventSystem';

/**
 * 页面组件
 */
@TEvent.Generate(TEvent.Lifecycle.Temporary)
@TTool.Generate()
@TRouter.Generate()
@TView.Generate()
class Component extends EventSystem {}

export { Component };
