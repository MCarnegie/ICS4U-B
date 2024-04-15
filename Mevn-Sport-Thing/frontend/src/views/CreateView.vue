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
      leagueNames,
      token
    };
  }
};
</script>

<template>
    <body>
        
    
        <div class="columns">
          <div class="column">
            <div class="card">
              <div class="card-content">
                  <h1 class="title">Create a Team</h1>
                  <form @submit.prevent="createTeam">
                  <div class="field">
                    <label for="email" class="label">Name:</label>
                    <div class="control">
                      <input class="input" type="test" id="email" v-model="teamData.name" required>
                    </div>
                    
                  </div>
                  <div class="field">
                    <label for="email" class="label">Create New League</label>
                    <input type="text"  v-model="teamData.whatLeague" class="input">
                  </div>
                  <div class="field">
                    <label for="email" class="label">Choose Existing League</label>
                    <div class="select">
                      <select name="leagues" id="leagues"  v-model="teamData.whatLeague">
                    
                         <option v-for="league in leagueNames" v-bind:value="league">{{ league }}</option>
                    
                     </select>
                    </div>
                    
                  </div>
                  <button type="submit" class="button">Create Your Team</button>
                  </form>
              </div>
              
            </div>
            
          </div>

          <div class="column">
            <div class="card">
              <div class="card-content">
                <h1 class="title">Create an Event</h1>
                <form @submit.prevent="createEvent">
                  <div class="field">
                    <label class="label">Name:</label>
                    <input type="test" v-model="eventData.name" class="input" required>
                  </div>
                  <div class="field">
                    <label class="label">Description</label>
                    <input type="text"  v-model="eventData.description" class="input" required>
                  </div>
                  <div class="field">
                    <label class="label">Time</label>
                    <input type="text"  v-model="eventData.time" class="input" required>
                  </div>
                  <div class="field">
                    <label class="label">Location</label>
                    <input type="text"  v-model="eventData.location" class="input" required>
                  </div>
                  <div class="field">
                    <label class="label">Date</label>
                    <input type="date"  v-model="eventData.date" class="input" required>
                  </div>
                  <div class="field">
                    <label class="label">teams</label>
                    <input type="text"  v-model="eventData.teams" class="input" required>
                  </div>
                  <div class="field">
                    <label class="label">notes</label>
                    <input type="text"  v-model="eventData.notes" class="input" required>
                  </div>
                  <div class="field">
                    <label class="label">What team is this for And which team is this league in </label>
                    <div class="select">
                      <select name="teams" id="teams"  v-model="eventData.whatTeam">
                    
                        <option v-for="team in teamNames" v-bind:value="team">{{ team }}</option>
                    
                      </select>
                    </div>
                    
                  </div>
                  
                  <button type="submit" class="button">Create Your Event</button>
                </form>
              </div>
            </div>
          </div>
        </div>
          
          

        
        
        
        
 
    </body>

</template>

<style scoped>

</style>