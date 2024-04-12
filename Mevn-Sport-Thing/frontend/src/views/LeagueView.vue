<script>
import router from '@/router';
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const API_URL = 'http://localhost:3000';

export default {
  //works by having a reactive variable that waits to get teh response for axios 
  //before being retunred since it retunrs immediately
  setup() {
    const leagues = ref(null); 
    const link = `${API_URL}/api/league`;
    onMounted(async () => {
      try {
        const response = await axios.get(`${API_URL}/api/league`);
        leagues.value = response.data; 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    });


    return {
      leagues,
      link,
    };
  }
};
</script>

<template>
    <body>
        <Suspense>
          <section class="section">
            <div class="container is-flex is-justify-content-center">
              <table class="table is-centered is-size-4">
                <thead>
                  <tr>
                    <th>Leagues Available</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- Assuming 'leagues' is a Vue.js data property -->
                  <tr v-for="league in leagues" :key="league">
                    <td><strong> <router-link :to="`/league/${league}`">{{ league }}</router-link></strong></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="container is-flex is-justify-content-center">
              <router-link :to="'/'"> Go Back</router-link>
            </div>
            
          </section>
          
          
        </Suspense>
        
        
        
 
    </body>

</template>

<style scoped>

</style>