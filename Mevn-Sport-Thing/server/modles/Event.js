const mongoose = require('mongoose')
//can be used for a game or package
const eventSchema = new mongoose.Schema({
    name:String,
    description: String,
    time:String,
    location:String,
    date: String,
    teams: String,
    notes: String,
    imageUrl: String,
    id: String,
    whatTeam: String,
})

const event = mongoose.model('Event', eventSchema);

module.exports = event;