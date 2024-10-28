import { createApp } from 'vue';

import RootVue from './Root.vue';

import { router } from './Router';

import '@/Plugins/WebWorker';

createApp(RootVue).use(router).mount('#App');
