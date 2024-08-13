import { createApp } from 'vue';

import RootVue from './Root.vue';

import router from './Router';

import './Plugins/AppRequest';

createApp(RootVue).use(router).mount('#App');
