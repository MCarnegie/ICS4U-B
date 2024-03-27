const mongoose = require('mongoose')
//can be used for a game or package
const teamSchema = new mongoose.Schema({
    name: String,
    id: Number,
    whatLeague: String,

})

const team = mongoose.model('Team', teamSchema);

module.exports = team;