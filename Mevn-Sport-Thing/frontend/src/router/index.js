
import { createRouter, createWebHistory } from 'vue-router'
import DecodeStuff from '@/services/Decode'

        // try {
        //   token.value = localStorage.getItem('token')
        //   token.value = AuthService.decodeToken(token.value)
        //   console.log(token.role + " in try")
        // } catch (error) {
          
        //   token.value = {role: "DOSENT DO ANYTHING"}
        //   console.log(token.role + " in catch")
        // }



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
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
      component: () => import('../views/CreateView.vue'),
      beforeEnter(to, from, next){
        console.log(DecodeStuff.getTokenRole())
        if(DecodeStuff.getTokenRole() === 'admin'){
          next()
        }else{
          next('/auth/login')
        }
      }
    },
    {
      path: '/delete',
      name: 'delete',
      component: () => import('../views/DeleteView.vue'),
      beforeEnter(to, from, next){
        console.log(DecodeStuff.getTokenRole())
        if(DecodeStuff.getTokenRole() === 'admin'){
          next()
        }else{
          next('/auth/login')
        }
      }
    },
    
  ]
})


export default router
