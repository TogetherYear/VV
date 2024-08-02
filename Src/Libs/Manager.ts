import { TEvent } from '@/Decorators/TEvent';
import { TRouter } from '@/Decorators/TRouter';
import { TTool } from '@/Decorators/TTool';
import { EventSystem } from '@/Libs/EventSystem';

/**
 * 全局管理 也就是不和组件挂钩的 但是你会发现 App 继承了它 万事都有特殊 App虽然继承了 但它不是在组件中 new 的 并且也只有在 Run 函数中 才和组件生命周期挂钩 以后如果有类似的也是这种写法
 */
@TEvent.Generate(TEvent.Lifecycle.Global)
@TTool.Generate()
class Manager extends EventSystem {}

export { Manager };
