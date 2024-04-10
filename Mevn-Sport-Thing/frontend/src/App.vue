
<template>
  <header>
<!-- the things here would just be stuff that goes across all pages (navbar) -->
      <nav> 
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/league">Scheduale</RouterLink>
            <RouterLink to="/auth/login" v-if="!isLoggedIn">Login</RouterLink>
            <button v-if="isLoggedIn" @click="logout">Logout</button>
            <RouterLink to="/create" v-if="checkRole === 'admin'">Create New Things</RouterLink>
            <RouterLink to="/delete" v-if="checkRole === 'admin'">Delete Stuff</RouterLink>
        </nav>
    
  </header>
        
    <RouterView/>
  
</template>
<script>
import { RouterLink, RouterView } from 'vue-router'
import HomeView from './views/HomeView.vue'
import store from './stores'
import { mapActions } from 'vuex';
import AuthService from '@/services/AuthService';
import { onMounted } from 'vue';
import router from './router';

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
      checkRole(){
        
        try {
          let token = localStorage.getItem('token')
          token = AuthService.decodeToken(token)
          return token.role
        } catch (error) {
          return "regular user"
        }
        
      },
      
      
      
    },
    methods:{
      ...mapActions(['logoutUser']),
      async logout(){
        await this.$store.dispatch('logoutUser')
        
        location.reload()
      },
      
    }
  };


</script>


<style scoped>



</style>
