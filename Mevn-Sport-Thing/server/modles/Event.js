const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    name:{
        type: String,
        
    },
    description: String,
    time:{
        type: Number,
        
    },
    location:{
        type: String,
        
    },
    date:{
        type: Number,
       
    },
    teams:{
        type: String,
       
    },
    notes: String,
    imageUrl: String,
    id: Number,
})

const event = mongoose.model('Event', eventSchema);

module.exports = event;