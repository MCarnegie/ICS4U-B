
<template>
  <header>
<!-- the things here would just be stuff that goes across all pages (navbar) -->
      <nav> 
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/league">Scheduale</RouterLink>
            <RouterLink to="/auth/login">Login</RouterLink>
        </nav>
    
  </header>
        
    <RouterView/>
  
</template>
<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HomeView from './views/HomeView.vue'
import store from './stores'

</script>


<style scoped>



</style>
