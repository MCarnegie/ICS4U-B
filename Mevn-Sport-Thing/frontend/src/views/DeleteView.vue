<script>
import axios from 'axios';
import { ref, onMounted, watch } from 'vue';
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
    let eventsBasedOffTeam = ref();
    let teamSelectForEvent = ref({
        whatTeam:'',
        teamIsSelected:false
    });
    let whatToDelete = ref({
        whatLeague:'',
        whatTeam:'',
        whatEvent:'',
    })

    watch(async () => teamSelectForEvent.value.whatTeam, async (newVal, oldVal) => {
        if (newVal) {
            teamSelectForEvent.value.teamIsSelected = true;
            eventsBasedOffTeam.value = (await axios.get(`${API_URL}/api/specificEvent/${teamSelectForEvent.value.whatTeam}`)).data;
        } else {
           
        }
    });

    
    async function deleteLeague(){
        try {
            console.log("deleting league")
                const response = await axios.delete(`${API_URL}/api/deleteLeague`, {
                    data:{
                        whatLeague: whatToDelete.value.whatLeague,
                        role: token.role,
                    }
                        
                });
                console.log(response.data)
                location.reload()
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    async function deleteTeam(){
      try {
        console.log("deleteing team...")
                const response = await axios.delete(`${API_URL}/api/deleteTeam`, {
                    data:{
                        whatTeam: whatToDelete.value.whatTeam,
                        role: token.role,
                    }
                        
                });
                console.log(response.data)
                location.reload()
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    async function deleteEvent(){
      try {
        console.log("deleteing event...")
        const response = await axios.delete(`${API_URL}/api/deleteEvent`, {
                    data:{
                        whatEvent: whatToDelete.value.whatEvent,
                        role: token.role,
                    }
                        
                });
                console.log(response.data)
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
     teamNames,
     leagueNames,
     whatToDelete,
     deleteLeague,
     deleteTeam,
     deleteEvent,
     teamSelectForEvent,
     eventsBasedOffTeam
    };
  }
};
</script>

<template>
    <body>
        
        <form @submit.prevent="deleteLeague">
            <div class="form-group">
              <label for="email">Choose League</label>
              <select name="leagues" id="leagues"  v-model="whatToDelete.whatLeague">
               
               <option v-for="league in leagueNames" v-bind:value="league">{{ league }}</option>
               
              </select>
            </div>
            <button type="submit">Delete League</button>
        </form>

        <form @submit.prevent="deleteTeam">
            <div class="form-group">
              <label for="email">Choose team to delete</label>
              <select name="teams" id="teams"  v-model="whatToDelete.whatTeam">
               
               <option v-for="team in teamNames" v-bind:value="team">{{ team }}</option>
               
              </select>
            </div>
            <button type="submit">Delete Team</button>
        </form>

        <form @submit.prevent="deleteEvent">
            <div class="form-group">
              <label for="email">Choose team for event</label>
              <select name="teams" id="teams"  v-model="teamSelectForEvent.whatTeam">
               
               <option v-for="team in teamNames" v-bind:value="team">{{ team }}</option>
               
              </select>
            <div v-if="teamSelectForEvent.teamIsSelected">
                <label for="email">Choose Event</label>
                <select name="events" id="events"  v-model="whatToDelete.whatEvent">
                
                <option v-for="event in eventsBasedOffTeam" v-bind:value="event">{{ event }}</option>
                
                </select>
            </div>
                
            </div>
            <button type="submit">Delete Team</button>
        </form>
    </body>
</template>

<style scoped>

</style>