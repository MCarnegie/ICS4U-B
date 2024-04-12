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
                    <th>Teams Available</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- Assuming 'leagues' is a Vue.js data property -->
                  <tr v-for="team in teams" :key="team">
                    <td><strong>  <router-link :to="`/league/${team}/events`">{{ team }}</router-link></strong></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="container is-flex is-justify-content-center">
              <router-link :to="'/league'"> Go Back</router-link>
            </div>
            
          </section>
          
        </Suspense>

        
        
 
    </body>

</template>

<style scoped>

</style>