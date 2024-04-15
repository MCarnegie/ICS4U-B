
<template>
        <header>
        <section class="section">
          <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
              <h1 class="navbar-item title">Sport Schedule Website</h1>
            </div>
            <div id="navbarBasicExample" class="navbar-menu is-active">
              <div class="navbar-end" >
                <RouterLink to="/" class="navbar-item">Home</RouterLink>
                <RouterLink to="/league" class="navbar-item">Schedule</RouterLink>
                <RouterLink to="/auth/login" v-if="!isLoggedIn" class="navbar-item">Login</RouterLink>
                <RouterLink to="/" @click="logout" v-if="isLoggedIn" class="navbar-item">Logout</RouterLink>
                <div class="navbar-item has-dropdown is-hoverable" v-if="checkRole === 'admin'">
                  <a class="navbar-link">
                    Admin Stuff
                  </a>
                  <div class="navbar-dropdown">
                    <RouterLink to="/create" v-if="checkRole === 'admin'" class="navbar-item">Create New Things</RouterLink>
                    <hr class="navbar-divider">
                    <RouterLink to="/delete" v-if="checkRole === 'admin'" class="navbar-item">Delete Stuff</RouterLink>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </section>
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
          console.log(token.role)
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
