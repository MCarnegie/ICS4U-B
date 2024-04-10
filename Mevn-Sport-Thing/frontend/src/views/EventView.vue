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
    teamName = link.slice(link.lastIndexOf("league/")+7, link.lastIndexOf("/"))
    console.log(teamName)

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
      isthereNoEvents
    };
  }
};
</script>

<template>
    <body>
        <Suspense>
          <li v-for="event in events" :key="event">
            <h1>{{ event.name }}</h1>
            <p>{{ event.description }}</p>
            <p>{{ event.notes }}</p>
          </li>
          
        </Suspense>
        <h1 v-if="isthereNoEvents"> no events</h1>
        
        
 
    </body>

</template>

<style scoped>

</style>