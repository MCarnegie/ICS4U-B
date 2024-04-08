<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';

const API_URL = 'http://localhost:3000';


export default {
 
  setup() {
    const teams = ref(null); 
    const link = document.URL;
    let teamName;
    teamName = link.slice(link.lastIndexOf("/")+1)
    console.log(teamName)

    onMounted(async () => {
      try {
        const response = await axios.get(`${API_URL}/api/league/${teamName}`);
        teams.value = response.data; 
        console.log(response)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    });
    

    return {
      teams,
      link
    };
  }
};
</script>

<template>
    <body>
        <Suspense>
          <li v-for="team in teams" :key="team">
            <router-link :to="`/league/${team}/events`">{{ team }}</router-link>
          </li>
          
        </Suspense>
        
        
        
 
    </body>

</template>

<style scoped>

</style>