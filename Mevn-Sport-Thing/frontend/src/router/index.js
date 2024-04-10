import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/auth/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/league',
      name: 'league',
      component: () => import('../views/LeagueView.vue')
    },
    {
      path: '/auth/registier',
      name: 'registier',
      component: () => import('../views/RegistierView.vue')
    },
    {
      path: '/league/:teamname',
      name: 'teams',
      component: () => import('../views/TeamView.vue')
    },
    {
      path: '/league/:teamname/events',
      name: 'events',
      component: () => import('../views/EventView.vue')
    },
    {
      path: '/create',
      name: 'create',
      component: () => import('../views/CreateView.vue')
    },
    {
      path: '/delete',
      name: 'delete',
      component: () => import('../views/DeleteView.vue')
    },
    
  ]
})

export default router
