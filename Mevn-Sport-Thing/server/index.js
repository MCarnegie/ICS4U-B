const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Event = require('./modles/Event');

const Team = require('./modles/Team');

const League = require('./modles/League')


require('./db');

const app = express();
const PORT  = process.env.PORT || 3000;
app.use(cors());
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.json());

app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`);
})

app.get('/api/league/:leaguename', async (req,res) =>{
    try {
        const teams = await Team.find({whatLeague: req.params['leaguename']})
        let teamNames = [];
        teams.forEach(team => teamNames.push(team.name))
        res.json(teamNames)
    } catch (error) {
        res.status(500).json({error: err.message});
    }
})


app.post('/api/teams',  async (req,res)=>{
    try{
        const team = new Team(req.body)
        await team.save()
        res.json(team)
    }catch (err){
        res.status(500).json({error: err.message});
    }
})


//get and post events based on team
app.get('/api/league/:teamname/events', async (req, res)=>{
    try{
        const events = await Event.find( {whatTeam: req.params['teamname']})
        let eventsArr = []
        events.forEach(a =>{
            eventsArr.push({name: a.name, description: a.description, notes: a.notes})
        })
        res.json(eventsArr)
    }catch (err){
        res.status(500).json({error: err.message});
    }
})


app.post('/api/events', async (req, res) =>{
    try{        
        const event = new Event(req.body);
        await event.save();
        res.json(event)
    }catch (err){
        res.status(500).json({error: err.message});
    }
})
