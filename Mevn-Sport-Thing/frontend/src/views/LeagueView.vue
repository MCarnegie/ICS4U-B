<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';

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
      link
    };
  }
};
</script>

<template>
    <body>
        <Suspense>
          <li v-for="league in leagues" :key="league">
            <router-link :to="`/league/${league}`">{{ league }}</router-link>
          </li>
          
        </Suspense>
        
        
        
 
    </body>

</template>

<style scoped>

</style>