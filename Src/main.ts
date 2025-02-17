import { createApp } from 'vue';

import RootVue from './Root.vue';

import { router } from './Router';

import '@/Plugins/WebSocket';

createApp(RootVue).use(router).mount('#App');
