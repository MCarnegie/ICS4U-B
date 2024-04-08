<template>
    <div class="login-container">
      <h2>Login</h2>
      <form @submit.prevent="registier">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="formData.email" required>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="formData.password" required>
        </div>
        <button type="submit">registier</button>
      </form>

      
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
  .login-container {
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
  
  .error-message {
    color: red;
  }
  </style>
  