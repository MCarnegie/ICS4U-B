import { createRouter, createWebHistory } from "vue-router"
import Home from "@/views/HomeView.vue"


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    // () => import()  only loads when we are on the page instead of loading everything
    //makes it faster like loading in assets in a game
    
    {
      path:"/destination/:id/:slug",
      name:"destination.show",
      component: ()=>import("@/views/DestinationShow.vue")
    },
  ],

})  

export default router
