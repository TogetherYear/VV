import { createApp } from 'vue'

import App from './App.vue'

import router from './router'

import naive from './naive'

import pinia from './pinia'

import { AppRequest } from './plugins/AppRequest'
AppRequest.Instance.Run()

createApp(App)
  .use(router)
  .use(naive)
  .use(pinia)
  .mount('#app')
