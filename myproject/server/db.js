import mongoose from "mongoose";

const connectionString = `mongodb+srv://<dbUser>:<marco123>@<ClusterExample1>.mongodb.net/<ClusterExample1>?retryWrites=true&w=majority`;

//const connectionString = `mongodb+srv://dbUser:<password>@clusterexample1.cvd2h0j.mongodb.net/?retryWrites=true&w=majority&appName=ClusterExample1`;
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(()=> console.log('Database Connected')).catch((err) => console.log(err));


