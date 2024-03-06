
const mongoose = require('mongoose');
const connectionstring =  'mongodb+srv://mcarnegie:marco123@cluster-main.zl8ebrf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-main'


mongoose.connect(connectionstring, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(()=>console.log("database connected :)")).catch((err)=>console.log("THERE WAS A Fricking ERROR: " + err));
