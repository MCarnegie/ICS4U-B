<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';

const API_URL = 'http://localhost:3000';


export default {
 
  setup() {
    const events = ref(null); 
    let isthereNoEvents = ref(false);
    const link = document.URL;
    let teamName;
    let goTo = link.slice(link.lastIndexOf("(") + 1, link.indexOf(")"))
    teamName = link.slice(link.lastIndexOf("league/")+7, link.lastIndexOf("/"))
    console.log(teamName)
    console.log(goTo)
    onMounted(async () => {
      try {
        const response = await axios.get(`${API_URL}/api/league/${teamName}/events`);
        events.value = response.data; 
        if(response.data.length === 0)
          isthereNoEvents.value = true
        console.log(response)

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    });
    

    return {
      events,
      link,
      isthereNoEvents,
      goTo
    };
  }
};
</script>

<template>
    <body>
        <Suspense>
          <section class="section" v-if="!isthereNoEvents">
            <div class="container is-flex is-justify-content-center">
              <table class="table is-centered is-size-4">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Time</th>
                    <th>Location</th>
                    <th>Date</th>
                    <th>Teams</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- Assuming 'leagues' is a Vue.js data property -->
                  <tr v-for="event in events" :key="event">
                    <td><strong> {{ event.name }} </strong></td>
                    <td><strong> {{ event.description }} </strong></td>
                    <td><strong> {{ event.time }} </strong></td>
                    <td><strong> {{ event.location }} </strong></td>
                    <td><strong> {{ event.date }} </strong></td>
                    <td><strong> {{ event.teams }} </strong></td>
                    <td><strong> {{ event.notes }} </strong></td>

                  </tr>
                </tbody>
              </table>
            </div>
            <div class="container is-flex is-justify-content-center">
              <router-link :to="`/league/${goTo}`"> Go Back</router-link>
            </div>
          </section>
          
        </Suspense>
        <section class="hero"  v-if="isthereNoEvents">
            <div class="hero-body">
            <div class="container has-text-centered">
                <h1 class="title" >
                No Events Avaliable
                </h1>
                
            </div>
            </div>
        </section>
        
 
    </body>

</template>

<style scoped>

</style>