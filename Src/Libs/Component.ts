import { TEvent } from '@/Decorators/TEvent';
import { EventSystem } from '@/Libs/EventSystem';

@TEvent.Generate(TEvent.Lifecycle.Temporary)
class Component extends EventSystem {}

export { Component };
