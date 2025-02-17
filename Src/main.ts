import { createApp } from 'vue';

import RootVue from './Root.vue';

import { router } from './Router';

import '@/Plugins/WebSocket';

import '@/Plugins/ServiceWorker';

createApp(RootVue).use(router).mount('#App');
