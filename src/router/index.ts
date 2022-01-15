import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('../views/Home.vue')

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})
