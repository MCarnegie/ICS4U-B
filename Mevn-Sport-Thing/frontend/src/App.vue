
<template>
  <header>
<!-- the things here would just be stuff that goes across all pages (navbar) -->
      <nav> 
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/league">Scheduale</RouterLink>
            <RouterLink to="/auth/login" v-if="!isLoggedIn">Login</RouterLink>
            <button v-if="isLoggedIn" @click="logout">Logout</button>
            
        </nav>
    
  </header>
        
    <RouterView/>
  
</template>
<script>
import { RouterLink, RouterView } from 'vue-router'
import HomeView from './views/HomeView.vue'
import store from './stores'
import { mapActions } from 'vuex';
export default {
    computed: {
      isLoggedIn() {
        
        // Access the isLoggedIn state from Vuex store or local component state
        return this.$store.state.user.isLoggedIn; // Example for Vuex
      },
      username() {
        // Optionally, you can display the username if available
        return this.$store.state.user.username; // Example for Vuex
      },
      
    },
    methods:{
      ...mapActions(['logoutUser']),
      async logout(){
        await this.$store.dispatch('logoutUser')
      }
    }
  };


</script>


<style scoped>



</style>
