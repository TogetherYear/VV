import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Vessel from '../views/Vessel/Vessel.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/Vessel'
  },
  {
    path: '/Vessel',
    name: 'Vessel',
    component: Vessel
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
