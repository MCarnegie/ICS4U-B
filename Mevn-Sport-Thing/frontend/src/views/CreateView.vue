<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import store from '@/stores'
import AuthService from '@/services/AuthService';

const API_URL = 'http://localhost:3000';

export default {
  setup() {
    let token = localStorage.getItem('token')
    token = AuthService.decodeToken(token)
    console.log(token.role)
    let teamNames = ref();
    let leagueNames = ref();
    let teamData = ref({
      name: '',
      id: 0,
      whatLeague: '',
    })
    let eventData = ref({
      name:'',
      description: '',
      time:'',
      location:'',
      date: '',
      teams: '',
      notes: '',
      imageUrl: '',
      id: 0,
      whatTeam: '',
    })
    async function createTeam(){
      try {
        console.log("creating team...")
            await axios.post(`${API_URL}/api/teams`, {
                name: teamData.value.name + ` (${teamData.value.whatLeague})`,
                id: teamData.value.id,
                whatLeague: teamData.value.whatLeague,
                role: token.role
                
            });
            location.reload()
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    async function createEvent(){
      try {
        console.log("creating event...")
            await axios.post(`${API_URL}/api/events`, {
                name:eventData.value.name,
                description: eventData.value.description,
                time:eventData.value.time,
                location:eventData.value.location,
                date: eventData.value.date,
                teams: eventData.value.teams,
                notes: eventData.value.notes,
                imageUrl: eventData.value.imageUrl,
                id: '',
                whatTeam: eventData.value.whatTeam,
                role: token.role
                
            });
            location.reload()
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
     onMounted(async ()=>{
      try {
        // const response = await axios.get(`${API_URL}/api/allteams`, {data:{
        //   whatLeague: teamData.whatLeague
        // }});
         const response = await axios.get(`${API_URL}/api/allteams`);
        teamNames.value = response.data; 
        const response2 = await axios.get(`${API_URL}/api/league`);
        leagueNames.value = response2.data; 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    })
    
    return {
      createTeam,
      createEvent,
      teamData,
      eventData,
      teamNames,
      leagueNames
    };
  }
};
</script>

<template>
    <body>
        
          <h1>create page</h1>

          <div>
            <form @submit.prevent="createTeam">
            <div class="form-group">
              <label for="email">Name:</label>
              <input type="test" id="email" v-model="teamData.name" required>
            </div>
            <div class="form-group">
              <label for="email">Create New League</label>
              <input type="text"  v-model="teamData.whatLeague">
            </div>
            <div class="form-group">
              <label for="email">Choose Existing League</label>
              <select name="leagues" id="leagues"  v-model="teamData.whatLeague">
               
               <option v-for="league in leagueNames" v-bind:value="league">{{ league }}</option>
               
              </select>
            </div>
            <button type="submit">Create Your Team</button>
            </form>
          </div>

          <div>
            <form @submit.prevent="createEvent">
            <div class="form-group">
              <label>Name:</label>
              <input type="test" v-model="eventData.name" required>
            </div>
            <div class="form-group">
              <label>Description</label>
              <input type="text"  v-model="eventData.description" required>
            </div>
            <div class="form-group">
              <label>Time</label>
              <input type="text"  v-model="eventData.time" required>
            </div>
            <div class="form-group">
              <label>Location</label>
              <input type="text"  v-model="eventData.location" required>
            </div>
            <div class="form-group">
              <label>Date</label>
              <input type="text"  v-model="eventData.date" required>
            </div>
            <div class="form-group">
              <label>teams</label>
              <input type="text"  v-model="eventData.teams" required>
            </div>
            <div class="form-group">
              <label>notes</label>
              <input type="text"  v-model="eventData.notes" required>
            </div>
            <div class="form-group">
              <label>What team is this for And which team is this league in </label>
              <select name="teams" id="teams"  v-model="eventData.whatTeam">
               
                <option v-for="team in teamNames" v-bind:value="team">{{ team }}</option>
                
              </select>
            </div>
            
            <button type="submit">Create Your Event</button>
            </form>
          </div>
          

        
        
        
        
 
    </body>

</template>

<style scoped>

</style>