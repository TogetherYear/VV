import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Default',
        redirect: '/Application'
    },
    {
        path: '/:pathMatch(.*)',
        name: 'Empty',
        redirect: '/404'
    },
    {
        path: '/404',
        name: '404',
        component: () => import('@/Views/Empty/Empty.vue')
    },
    {
        path: '/Application',
        name: 'Application',
        component: () => import('@/Views/Application/Application.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
