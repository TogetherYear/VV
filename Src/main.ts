import { createApp } from 'vue'

import AppVue from './App.vue'

import router from './Router'

import { naive } from './naive'

import { Debug } from './Plugins/Debug'
Debug.Instance.Run()

import { AppRequest } from './Plugins/AppRequest'
AppRequest.Instance.Run()

import { FieldObserver } from './Plugins/FieldObserver'

FieldObserver.Instance.Run()

createApp(AppVue)
  .use(router)
  .use(naive)
  .mount('#App')
