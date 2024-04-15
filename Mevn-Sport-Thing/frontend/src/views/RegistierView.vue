<template>

    <div class="columns is-centered">
          <div class="column is-one-third">
            <div class="card">
              <div class="card-content">
                  <h1 class="title">Register New Account</h1>
                  <form @submit.prevent="registier">
                    <div class="field">
                      <label class="label" for="email">Email:</label>
                      <input class="input" type="email" id="email" v-model="formData.email" required>
                    </div>
                    <div class="field">
                      <label class="label" for="password">Password:</label>
                      <input class="input" type="text" id="password" v-model="formData.password" required>
                    </div>
                    <button type="submit" class="button">Register</button>
                  </form>
              </div>
              
            </div>
            
          </div>
    </div>

  </template>
  
  <script>
  import axios from 'axios';
import { ref, onMounted } from 'vue';

const API_URL = 'http://localhost:3000';

export default {

  setup() {
    const formData = ref({
      email: '',
      password: ''
    });
    async function registier(){
        const link = `${API_URL}/api/league`;
       
        try {
            await axios.post(`${API_URL}/auth/register`, {
                email: formData.value.email,
                password: formData.value.password,
                role: "admin"
                
            });
            location.reload()
            console.log("idk if it worked")
        } catch (error) {
            console.error('Error fetching data:', error);
        }
      
    }


    return {
      registier,
      formData
    };
  }
};
  </script>
  
  <style scoped>
  
  
  .error-message {
    color: red;
  }
  </style>
  