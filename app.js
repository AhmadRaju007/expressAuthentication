const express= require('express');

const app= express();
const mongoose= require('mongoose');
const bodyParser= require('body-parser');
require('dotenv/config');

app.use(bodyParser.json());

//Import Routes
const siteRoute= require('./routes/site');
app.use('/site', siteRoute);

//Connect to DB
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true },
    ()=> console.log('connected to DB!'));


//LISTEN
const port= process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Listening on port ${port}...`))