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
     eventsBasedOffTeam,
     token
    };
  }
};
</script>

<template>
    <body >
        <div class="columns is-flex-direcction-column">
            <div class="column is-one-third">
                <div class="card">
                    <div class="card-content">
                        <form @submit.prevent="deleteLeague">
                            <div class="field">
                            <label for="email" class="label">Choose League</label>
                            <div class="select">
                                <select name="leagues" id="leagues"  v-model="whatToDelete.whatLeague">
                            
                                     <option v-for="league in leagueNames" v-bind:value="league">{{ league }}</option>
                            
                                </select>
                            </div>
                            
                            </div>
                            <button type="submit" class="button">Delete League</button>
                        </form>
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="card">
                    <div class="card-content">
                        <form @submit.prevent="deleteTeam">
                            <div class="field">
                            <label for="email" class="label">Choose team to delete</label>
                            <div class="select">
                                <select name="teams" id="teams"  v-model="whatToDelete.whatTeam">
                            
                                     <option v-for="team in teamNames" v-bind:value="team">{{ team }}</option>
                            
                                </select>
                            </div>
                            
                            </div>
                            <button type="submit" class="button">Delete Team</button>
                        </form>
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="card">
                    <div class="card-content">
                        <form @submit.prevent="deleteEvent">
                            <div class="field">
                            <label for="email" class="label">Choose team for event</label>
                            <div class="select">
                                <select name="teams" id="teams"  v-model="teamSelectForEvent.whatTeam">
                            
                                    <option v-for="team in teamNames" v-bind:value="team">{{ team }}</option>
                            
                                </select>
                            </div>
                            </div>
                            <div class="field">
                                <div v-if="teamSelectForEvent.teamIsSelected">
                                    <label for="email" class="label">Choose Event</label>
                                    <div class="select">
                                        <select name="events" id="events"  v-model="whatToDelete.whatEvent">
                                    
                                            <option v-for="event in eventsBasedOffTeam" v-bind:value="event">{{ event }}</option>
                                    
                                        </select>
                                    </div>
                               
                                 </div>
                            </div>
                            
                                <button type="submit" class="button">Delete Event</button>
                            
                            
                        </form>
                    </div>
                </div>
            </div>
            
        </div>
        



        
    </body>
</template>

<style scoped>

</style>