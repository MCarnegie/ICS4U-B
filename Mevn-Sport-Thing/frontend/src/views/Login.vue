<template>


    <div class="columns is-centered">
          <div class="column is-one-third">
            <div class="card">
              <div class="card-content">
                  <h1 class="title">Login</h1>
                  <form @submit.prevent="login">
                    <div class="field">
                      <label for="email" class="label">Email:</label>
                      <input type="email" id="email" v-model="email" class="input" required>
                    </div>
                    <div class="field">
                      <label class="label" for="password">Password:</label>
                      <input class="input" type="password" id="password" v-model="password" required>
                    </div>
                    <button type="submit" class="button">Login</button>
                  </form>
                  <br>
                  <h1 v-if="loginError" class="error-message">{{ loginError }}</h1>
                  <h1>No Account? <RouterLink to="/auth/registier">Register</RouterLink></h1>
              </div>
              
            </div>
            
          </div>
    </div>

  </template>
  
  <script>
  import router from '@/router';
import { mapActions } from 'vuex';

  export default {
    data() {
      return {
        email: '',
        password: '',
        loginError: null
      };
    },
    methods: {
      ...mapActions(['loginUser']),
      async login() {
        try {
          
          // await this.loginUser({ email: this.email, password: this.password });
          await this.$store.dispatch('loginUser', { email: this.email, password: this.password });

          // If login successful, redirect to dashboard or desired page
          this.$router.push({ name: 'home' })
          setTimeout(() => {
            location.reload();
          }, 50);

          
          
        } catch (error) {
          console.log(error)
          this.loginError = 'Failed to login. Please check your credentials and try again.';
        }
      },

    }
  };
  </script>
  
  <style scoped>
  /* .login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  input[type="email"],
  input[type="password"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  button {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  */
  .error-message {
    color: red;
  } 
  </style>
  