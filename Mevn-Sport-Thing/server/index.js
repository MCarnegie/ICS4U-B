const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Event = require('./modles/Event');

const Team = require('./modles/Team');
const event = require('./modles/Event');

require('./db');

const app = express();
const PORT  = process.env.PORT || 3000;
app.use(cors());
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.json());

app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`);
})

app.get('/api/teams', async (req,res)=>{
    try{
        const teams = await Team.find({})
        res.json(teams)
    }catch (err){
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

app.get('/api/teams/:name/events', async (req, res)=>{
    try{
        const events = await Event.find( {whatTeam: req.params['name']})
        res.json(events)
    }catch (err){
        res.status(500).json({error: err.message});
    }
})



app.get('/api/events/:id', async (req, res) =>{
    try{
    
        const event = await Event.findOneAndUpdate(req.params.id);
        
        res.json(event)
    }catch (err){
        res.status(500).json({error: err.message});
    }
})

app.post('/api/teams/events', async (req, res) =>{
    try{        
        const event = new Event(req.body);
        await event.save();
        res.json(event)
    }catch (err){
        res.status(500).json({error: err.message});
    }
})

app.delete('/api/events/:id', async (req, res)=>{
    const event = await Event.findOneAndDelete(req.params.id);
    if(!event) return res.status(404).send('event not found')
   
})