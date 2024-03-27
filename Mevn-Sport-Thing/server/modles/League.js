const mongoose = require('mongoose');

const LeagueSchema = mongoose.Schema({
    name: String,
    id: Number,
    


})

const League = mongoose.model("League", LeagueSchema);

module.exports = League;