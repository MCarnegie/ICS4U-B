const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session');
const passport = require('passport');
const bcrypt = require('bcryptjs');

const Event = require('./modles/Event');

const Team = require('./modles/Team');

const League = require('./modles/League');


require('./authentication/passport');
const User = require('./modles/User'); 
const authRoutes = require('./authentication/routes/auth');
const generateSalt = require('./authentication/saltGenerator');


require('./db');

const app = express();
const PORT  = process.env.PORT || 3000;
app.use(cors());
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.json());

app.set('view engine', 'ejs'); // Assuming you're using EJS for templating
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: `${generateSalt()}`, 
  resave: false,
  saveUninitialized: false
}));
// Mount authentication routes
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', authRoutes); // make sure the above two lines are set up before this

//THIS MEANS THAT FOR ANYTHIGN TO DO IN AUTH.JS WE HAVE TO PUT /AUTH BEFORE IT IN POSTMAN OR AXIOS OR WHATEVER

app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`);
})

const isAuthenticated = (req, res, next) => {
    // Passport adds 'req.user' property if user is authenticated
    if (req.isAuthenticated) {
      // User is authenticated, proceed to the next middleware
      console.log("authenticated")
      return next();
    }
    console.log("not authenticated")
    // User is not authenticated, redirect to login page or send error response
    res.send("not authenticated"); // Redirect to login page
  };
  
  // Middleware function to check if user has specific role/permission
  const hasPermission = (requiredRole) => {
    return (req, res, next) => {
      // Check if user has the required role/permission
        
      if (req.body.role === requiredRole) {
        // User has the required role/permission, proceed to the next middleware
        console.log("is admin")
        return next();
      }
      console.log("dosent have permission")
      // User does not have the required role/permission, send error response
      res.status(403).send('Forbidden'); // Send 403 Forbidden status
    };
  };

app.get('/api/league', async (req,res) =>{
    try {
        const league = await Team.find({})
        let whatLeague = [];
        league.forEach(league => whatLeague.push(league.whatLeague));
        whatLeague = [...new Set(whatLeague)]
        res.json(whatLeague)
    } catch (error) {
        res.status(500).json({error: err.message});
    }
})


app.get('/api/league/:leaguename', async (req,res) =>{
    try {
        const teams = await Team.find({whatLeague: req.params['leaguename'].replace(/%20/g, "")})
        let teamNames = [];
        teams.forEach(team => teamNames.push(team.name))
        res.json(teamNames)
    } catch (error) {
        res.status(500).json({error: err.message});
    }
})

app.get('/api/allteams', async (req,res)=>{
    try{
        const teams = await Team.find({})
        let teamNames = []
        teams.forEach((val)=>{
            teamNames.push(val.name)
        })
        res.json(teamNames);
    }catch(err){

    }
})


app.post('/api/teams',isAuthenticated, hasPermission('admin'),  async (req,res)=>{
    try{

        const team = new Team(req.body)
        await team.save()
        console.log("worked2")
        res.json(team)
    }catch (err){
        res.status(500).json({error: err.message});
    }
})


//get and post events based on team
app.get('/api/league/:teamname/events', async (req, res)=>{
    try{
    
        const events = await Event.find( {whatTeam: req.params['teamname']})
        console.log(req.params['teamname'])
        let eventsArr = []
        events.forEach(a =>{
            eventsArr.push({
                name: a.name, 
                description: a.description, 
                time: a.time,
                location: a.location,
                date: a.date,
                teams: a.teams,
                notes: a.notes
            })
        })
        res.json(eventsArr)
    }catch (err){
        res.status(500).json({error: err.message});
    }
})

app.get('/api/specificEvent/:team', async (req, res) =>{

    console.log(req.params['team'])
    // let league =team.slice(req.body.whatTeam.indexOf(" ")+2, team.length-1)
    const events = await Event.find({whatTeam: req.params['team']});
   
    let eventsArr = []
        events.forEach(a =>{
            eventsArr.push(a.name)
        })
        console.log(eventsArr)
    res.json(eventsArr)
})


app.post('/api/events', isAuthenticated, hasPermission('admin'), async (req, res) =>{
    try{    
      console.log("here14")    
        const event = new Event(req.body);
        await event.save();
        res.json(event)
    }catch (err){
        res.status(500).json({error: err.message});
    }
})

app.delete('/api/deleteLeague', isAuthenticated, hasPermission('admin'), async (req,res)=>{
    try {
        await Team.deleteMany({"whatLeague": req.body.whatLeague})
        res.status(200).json({ message: 'League deleted successfully' });
        
    } catch (error) {
        console.error('Error deleting data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

app.delete('/api/deleteTeam', isAuthenticated, hasPermission('admin'), async (req,res)=>{
    try {
        

        await Team.deleteOne({"name": req.body.whatTeam})
        res.status(200).json({ message: 'Team deleted successfully' });
        
    } catch (error) {
        console.error('Error deleting data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

app.delete('/api/deleteEvent', isAuthenticated, hasPermission('admin'), async(req,res)=>{
    try {
        
        console.log("in delete event: " + req.body.whatEvent)
        await Event.deleteOne({"name": req.body.whatEvent})
        res.status(200).json({ message: 'Team deleted successfully' });
        
    } catch (error) {
        console.error('Error deleting data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

  
